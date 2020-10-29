import {ChannelResult, CreateChannelParams} from '@statechannels/client-api-schema';
import {
  Outcome,
  serializeMessage,
  SignedState,
  Objective as ObjectiveType,
  SimpleAllocation,
  StateVariables,
} from '@statechannels/wallet-core';
import {Transaction} from 'objection';

import {Channel} from '../../models/channel';
import {Funding} from '../../models/funding';
import {DBObjective, ObjectiveModel} from '../../models/objective';
import {Outgoing} from '../../protocols/actions';
import {mergeChannelResults, mergeOutgoing} from '../../utilities/messaging';
import {MultipleChannelOutput} from '../../wallet';
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
  ): Promise<{
    ledgerId: string;
    channelIds: string[];
    outbox: Outgoing[];
    channelResults: ChannelResult[];
  }> {
    return this.store.knex.transaction(async trx => {
      const channelIds: string[] = [];
      const outgoings: Outgoing[] = [];
      const channelResults: ChannelResult[] = [];

      // LEDGER CHANNEL

      const ledgerChannelArgs = constructCreateLedgerChannelParams(appChannelArgs, count);
      const {
        channel: {channelId: ledgerId, myIndex, channelResult: ledgerChannelResult},
        signedState: ledgerSignedState,
      } = await this.store.createChannelWithoutObjective(ledgerChannelArgs, trx);

      const notMe = (_p: any, i: number): boolean => i !== myIndex;
      const participants = appChannelArgs.participants;

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

      channelResults.push(ledgerChannelResult);

      // count APPLICATION CHANNELS
      for (let i = 0; i < count; i++) {
        const {
          channel: {channelId, myIndex, channelResult},
          signedState,
        } = await this.store.createChannelWithoutObjective(appChannelArgs, trx);
        channelIds.push(channelId);
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
        channelResults.push(channelResult);
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

      return {ledgerId, channelIds, outbox: mergeOutgoing(outgoings), channelResults};
    });
  }

  async approve(objective: DBObjective, tx: Transaction): Promise<MultipleChannelOutput> {
    if (objective.type !== 'BulkCreateAndLedgerFund') {
      throw Error(`BulkCreateAndLedgerFundManager passed ${objective.type} objective to approve`);
    }

    // sign state 1 in ledger and application channels
    const ledgerChannel = await Channel.forId(objective.data.ledgerId, tx);
    const applicationChannels = await Promise.all(
      objective.data.channelIds.map(channelId => Channel.forId(channelId, tx))
    );

    const participants = ledgerChannel.participants;
    const myIndex = participants.map(p => p.signingAddress).indexOf(ledgerChannel.myAddress);
    const notMe = (_p: any, i: number): boolean => i !== myIndex;
    const outgoings: Outgoing[] = [];
    const channelResults: ChannelResult[] = []; // TODO populate these

    // LEDGER CHANNEL
    const {signedState: newLedgerState, channel} = await this.store.signState(
      ledgerChannel.channelId,
      {...ledgerChannel.latest, turnNum: 1},
      tx
    );
    channelResults.push(channel.channelResult);

    outgoings.push(
      ...participants.filter(notMe).map(({participantId: recipient}) => ({
        method: 'MessageQueued' as const,
        params: serializeMessage(
          {signedStates: [newLedgerState]},
          recipient,
          participants[myIndex].participantId
        ),
      }))
    );

    // APPLICATION CHANNELS
    const newApplicationStatesAndChannels = await Promise.all(
      applicationChannels.map(async channel =>
        this.store.signState(
          channel.channelId,
          {...channel.latest, turnNum: channel.latest.turnNum + 1},
          tx
        )
      )
    );

    channelResults.push(...newApplicationStatesAndChannels.map(o => o.channel.channelResult));

    outgoings.push(
      ...participants.filter(notMe).map(({participantId: recipient}) => ({
        method: 'MessageQueued' as const,
        params: serializeMessage(
          {signedStates: newApplicationStatesAndChannels.map(o => o.signedState)},
          recipient,
          participants[myIndex].participantId
        ),
      }))
    );

    return {channelResults, outbox: mergeOutgoing(outgoings)};
  }

  async crank(objectiveId: string): Promise<MultipleChannelOutput> {
    return this.store.knex.transaction(async trx => {
      const newStates: SignedState[] = [];
      const channelResults: ChannelResult[] = [];

      // GET data
      const objective = await ObjectiveModel.forId(objectiveId, trx);
      if (objective.type !== 'BulkCreateAndLedgerFund') throw Error;

      let ledgerChannel = await Channel.forId(objective.data.ledgerId, trx);
      let applicationChannels = await Promise.all(
        objective.data.channelIds.map(async channelId => Channel.forId(channelId, trx))
      );

      const participants = ledgerChannel.participants;
      const myIndex = participants.map(p => p.signingAddress).indexOf(ledgerChannel.myAddress);
      const notMe = (_p: any, i: number): boolean => i !== myIndex;

      function ensureSimpleAllocation(outcome: Outcome): SimpleAllocation {
        if (outcome.type !== 'SimpleAllocation') throw Error;
        return outcome;
      }

      const assetHolderAddress = ensureSimpleAllocation(ledgerChannel.latest.outcome)
        .assetHolderAddress;

      if (!ledgerChannel.isFullyDirectlyFunded && ledgerChannel.hasPreFundSetup) {
        console.log(` ${this.store.knex.client.config.connection.database} 🟥 -> 🔴`);
        // 🟥 -> 🔴
        await Funding.updateFunding(
          trx,
          ledgerChannel.channelId,
          ledgerChannel.totalAllocated,
          assetHolderAddress
        ); // TODO replace with deposit(ledgerChannel.myBalance) and await ledgerChannel.fullyFunded
        ledgerChannel = await Channel.forId(objective.data.ledgerId, trx); // Refresh this since we changed the funding
      }

      if (
        ledgerChannel.isFullyDirectlyFunded &&
        !ledgerChannel.hasFinishedSetup &&
        ledgerChannel.myTurn
      ) {
        const newStateVariables: StateVariables = {
          ...ledgerChannel.latest,
          turnNum: 2 + myIndex,
        };

        const {signedState, channel: newLedgerChannel} = await this.store.signState(
          ledgerChannel.channelId,
          newStateVariables,
          trx
        );

        ledgerChannel = newLedgerChannel;

        newStates.push(signedState);
        channelResults.push(newLedgerChannel.channelResult);
      }

      if (
        ledgerChannel.hasFinishedSetup &&
        ledgerChannel.latestSignedByMe?.turnNum &&
        ledgerChannel.latestSignedByMe.turnNum < 4
      ) {
        if (ledgerChannel.myTurn && applicationChannels.every(c => c.isAtFundingPoint)) {
          console.log(`${this.store.knex.client.config.connection.database} 🔴 -> 🔵🔵🔵`);
          // 🔴 -> 🔵🔵🔵
          const newState = {
            ...ledgerChannel.latest,
            outcome: constructLedgerOutcome(
              'SimpleAllocation',
              assetHolderAddress,
              applicationChannels
            ),
            turnNum: 4, // Both participants are signing the same turn number (nullApp)
          };

          const {signedState, channel: newLedgerChannel} = await this.store.signState(
            ledgerChannel.channelId,
            newState,
            trx
          );
          newStates.push(signedState);
          channelResults.push(newLedgerChannel.channelResult);
        }
      }

      if (ledgerChannel.supported?.turnNum === 4) {
        console.log(
          ` ${this.store.knex.client.config.connection.database} Finish setup in the application channels...`
        );

        await Promise.all(
          applicationChannels.map(async c => {
            if (!c.hasFinishedSetup && c.myTurn) {
              const {signedState, channel: newChannel} = await this.store.signState(
                c.channelId,
                {...c.latest, turnNum: myIndex + 2},
                trx
              );
              newStates.push(signedState);
              channelResults.push(newChannel.channelResult);
            }
          })
        );

        applicationChannels = await Promise.all(
          objective.data.channelIds.map(async channelId => Channel.forId(channelId, trx))
        ); // refresh applicationChannels

        const allApplicationChannelsRunning: boolean = applicationChannels.every(
          c => c.hasFinishedSetup
        );

        if (allApplicationChannelsRunning) await ObjectiveModel.succeed(objectiveId, trx);
      }

      const outgoings = [
        ...participants.filter(notMe).map(({participantId: recipient}) => ({
          method: 'MessageQueued' as const,
          params: serializeMessage(
            {signedStates: newStates},
            recipient,
            participants[myIndex].participantId
          ),
        })),
      ];
      return {
        channelResults: mergeChannelResults(channelResults),
        outbox: mergeOutgoing(outgoings),
      };
    });
  }
}
