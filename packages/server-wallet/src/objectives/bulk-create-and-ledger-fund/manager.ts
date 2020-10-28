import {CreateChannelParams} from '@statechannels/client-api-schema';
import {
  Outcome,
  serializeMessage,
  SignedState,
  Objective as ObjectiveType,
  SimpleAllocation,
} from '@statechannels/wallet-core';

import {Channel} from '../../models/channel';
import {Funding} from '../../models/funding';
import {Objective as ObjectiveModel} from '../../models/objective';
import {Outgoing} from '../../protocols/actions';
import {mergeOutgoing} from '../../utilities/messaging';
import {Store} from '../../wallet/store';

import {constructCreateLedgerChannelParams, constructLedgerOutcome} from './helpers';

export class BulkCreateAndLedgerFundManager {
  store: Store;

  private constructor(store: Store) {
    this.store = store;
  }

  static attach(store: Store): BulkCreateAndLedgerFundManager {
    return new BulkCreateAndLedgerFundManager(store);
  }

  async commence(
    appChannelArgs: CreateChannelParams,
    count: number
  ): Promise<{ledgerId: string; channelIds: string[]; outbox: Outgoing[]}> {
    return this.store.knex.transaction(async trx => {
      const channelIds: string[] = [];
      const signedStates: SignedState[] = [];
      const outgoings: Outgoing[] = [];

      // LEDGER CHANNEL
      const notMe = (_p: any, i: number): boolean => i !== myIndex;
      const ledgerChannelArgs = constructCreateLedgerChannelParams(appChannelArgs, count);
      const {
        channelId: ledgerId,
        signedState: ledgerSignedState,
        myIndex,
      } = await this.store.createChannelWithoutObjective(ledgerChannelArgs, trx);

      const participants = appChannelArgs.participants;

      signedStates.push(ledgerSignedState);
      outgoings.push(
        ...ledgerChannelArgs.participants.filter(notMe).map(({participantId: recipient}) => ({
          method: 'MessageQueued' as const,
          params: serializeMessage(
            {signedStates: [ledgerSignedState]},
            recipient,
            participants[myIndex].participantId,
            ledgerId
          ),
        }))
      );

      // count APPLICATION CHANNELS
      for (let i = 0; i < count; i++) {
        const {channelId, signedState} = await this.store.createChannelWithoutObjective(
          appChannelArgs,
          trx
        );
        channelIds.push(channelId);
        signedStates.push(signedState);
        outgoings.push(
          ...appChannelArgs.participants.filter(notMe).map(({participantId: recipient}) => ({
            method: 'MessageQueued' as const,
            params: serializeMessage(
              {signedStates: [signedState]},
              recipient,
              participants[myIndex].participantId,
              channelId
            ),
          }))
        );
      }

      // OBJECTIVE
      const objective: ObjectiveType = {
        type: 'BulkCreateAndLedgerFund',
        data: {ledgerId, channelIds},
        participants: [],
      };

      outgoings.push(
        ...appChannelArgs.participants.filter(notMe).map(({participantId: recipient}) => ({
          method: 'MessageQueued' as const,
          params: serializeMessage(
            {objectives: [objective]},
            recipient,
            participants[myIndex].participantId
          ),
        }))
      );

      await ObjectiveModel.insert({...objective, status: 'approved'}, trx);

      return {ledgerId, channelIds, outbox: mergeOutgoing(outgoings)};
    });
  }

  async crank(objectiveId: string): Promise<void> {
    return this.store.knex.transaction(async trx => {
      // GET data
      const objective = await ObjectiveModel.forId(objectiveId, trx);
      if (objective.type !== 'BulkCreateAndLedgerFund') throw Error;

      const ledgerChannel = await Channel.forId(objective.data.ledgerId, trx);
      const applicationChannels = await Promise.all(
        objective.data.channelIds.map(channelId => Channel.forId(channelId, trx))
      );
      const allApplicationsFunded = applicationChannels.every(c => c.isFullyFunded);

      function ensureSimpleAllocation(outcome: Outcome): SimpleAllocation {
        if (outcome.type !== 'SimpleAllocation') throw Error;
        return outcome;
      }

      const assetHolderAddress = ensureSimpleAllocation(ledgerChannel.latest.outcome)
        .assetHolderAddress;

      if (!ledgerChannel.isFullyFunded && ledgerChannel.isAtFundingPoint) {
        // 🟥 -> 🔴
        Funding.updateFunding(
          trx,
          ledgerChannel.channelId,
          ledgerChannel.totalAllocated,
          assetHolderAddress
        ); // TODO replace with deposit(ledgerChannel.myBalance) and await ledgerChannel.fullyFunded
      }

      if (ledgerChannel.hasFinishedSetup && !allApplicationsFunded) {
        if (ledgerChannel.myTurn && applicationChannels.every(c => c.isAtFundingPoint)) {
          // 🔴 -> 🔵🔵🔵
          const newState = {
            ...ledgerChannel.latest,
            outcome: constructLedgerOutcome(
              'SimpleAllocation',
              assetHolderAddress,
              applicationChannels
            ),
          };
          await this.store.signState(ledgerChannel.channelId, newState, trx);
        }
        if (
          !ledgerChannel.myTurn &&
          allApplicationsFunded &&
          applicationChannels.every(c => c.isAtFundingPoint)
        ) {
          await this.store.signState(ledgerChannel.channelId, ledgerChannel.latest, trx);
        }
      }

      if (ledgerChannel.hasFinishedSetup && allApplicationsFunded) {
        const allApplicationChannelsRunning: boolean = applicationChannels
          .map<Promise<boolean>>(async c => {
            if (!c.hasFinishedSetup && c.myTurn) {
              await this.store.signState(c.channelId, c.latest, trx);
            }
            return c.hasFinishedSetup;
          })
          .every(x => !!x);
        if (allApplicationChannelsRunning) await ObjectiveModel.succeed(objectiveId, trx);
      }
    });
  }
}
