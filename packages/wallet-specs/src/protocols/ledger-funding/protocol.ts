import { assign, DoneInvokeEvent, Machine } from 'xstate';
import { CreateNullChannel, DirectFunding, SupportState } from '..';
import { Outcome, Allocation } from '@statechannels/nitro-protocol';
import {
  ensureExists,
  MachineFactory,
  ethAllocationOutcome,
  Store,
  success,
  getEthAllocation,
  FINAL,
} from '../..';

const PROTOCOL = 'ledger-funding';

interface Init {
  targetChannelId: string;
}

/*
My wallet's rule is to have at most one ledger channel open with any given peer.
Therefore, two correct wallets should agree on which existing ledger channel, if any, to use
in order to fund the target channel.

A peer is identified by their participantId.
*/

const assignLedgerChannelId = assign(
  (ctx: Init, event: DoneInvokeEvent<{ channelId: string }>) => ({
    ...ctx,
    ledgerChannelId: event.data.channelId,
  })
);
const lookForExistingChannel = {
  invoke: {
    src: 'findLedgerChannelId',
    onDone: [
      {
        target: 'success',
        cond: 'channelFound',
        actions: assignLedgerChannelId,
      },
      { target: 'determineLedgerChannel' },
    ],
  },
};

const determineLedgerChannel = {
  invoke: {
    src: 'getNullChannelArgs',
    onDone: 'createNewLedger',
  },
};

const createNewLedger = {
  invoke: {
    src: 'createNullChannel',
    data: (_, { data }: DoneInvokeEvent<CreateNullChannel.Init>) => ({
      channel: data.channel,
      outcome: data.outcome,
    }),
    onDone: { target: 'success', actions: assignLedgerChannelId },
    autoForward: true,
  },
};

const waitForChannel = {
  initial: 'lookForExistingChannel',
  states: {
    lookForExistingChannel,
    determineLedgerChannel,
    createNewLedger,
    success,
  },
  onDone: { target: 'fundLedger' },
};

type LedgerExists = Init & { ledgerChannelId: string };
const fundLedger = {
  initial: 'getTargetAllocation',
  states: {
    getTargetAllocation: { invoke: { src: 'getTargetAllocation' }, onDone: 'directFunding' },
    directFunding: {
      invoke: {
        src: 'directFunding',
        data: (
          { ledgerChannelId }: LedgerExists,
          event: DoneInvokeEvent<Allocation>
        ): DirectFunding.Init => ({ channelId: ledgerChannelId, minimalAllocation: event.data }),
        onDone: 'done',
        autoForward: true,
      },
    },
    done: { type: FINAL },
  },
  onDone: 'fundTarget',
};

const fundTarget = {
  initial: 'getTargetOutcome',
  states: {
    getTargetOutcome: {
      invoke: {
        src: 'getTargetOutcome',
        onDone: 'ledgerUpdate',
      },
    },
    ledgerUpdate: {
      invoke: {
        src: 'supportState',
        data: (ctx: LedgerExists, { data }: DoneInvokeEvent<{ outcome: Outcome }>) => ({
          channelId: ctx.ledgerChannelId,
          outcome: data.outcome,
        }),
        autoForward: true,
        onDone: 'success',
      },
    },
    success,
  },
  onDone: 'success',
};

export const config = {
  key: PROTOCOL,
  initial: 'waitForChannel',
  states: {
    waitForChannel,
    fundLedger,
    fundTarget,
    success,
  },
};

type LedgerLookup = { type: 'FOUND'; channelId: string } | { type: 'NOT_FOUND' };
export type Services = {
  findLedgerChannelId(ctx: Init): Promise<LedgerLookup>;
  getNullChannelArgs(ctx: Init): Promise<CreateNullChannel.Init>;
  createNullChannel: any;
  getTargetAllocation(ctx: LedgerExists): Promise<DirectFunding.Init>;
  directFunding: any;
  getTargetOutcome(ctx: LedgerExists): Promise<SupportState.Init>;
  supportState: any;
};

export const guards = {
  channelFound: (_, { data }: DoneInvokeEvent<LedgerLookup>) => data.type === 'FOUND',
};

export const machine: MachineFactory<Init, any> = (store: Store, context: Init) => {
  async function getTargetAllocation(ctx: LedgerExists): Promise<DirectFunding.Init> {
    const minimalAllocation = getEthAllocation(
      store.getEntry(ctx.targetChannelId).latestState.outcome
    );

    return {
      channelId: ctx.ledgerChannelId,
      minimalAllocation,
    };
  }

  async function getNullChannelArgs({ targetChannelId }: Init): Promise<CreateNullChannel.Init> {
    const { channel: targetChannel, latestSupportedState } = store.getEntry(targetChannelId);

    const channel: Channel = {
      ...targetChannel,
      channelNonce: store.getNextNonce(targetChannel.participants),
    };

    // TODO: check that the latest supported state is the last prefund setup state?
    const { outcome } = ensureExists(latestSupportedState);

    return {
      channel,
      outcome,
    };
  }

  async function getTargetOutcome({
    targetChannelId,
    ledgerChannelId,
  }: LedgerExists): Promise<SupportState.Init> {
    // const { latestState: ledgerState } = store.getEntry(ledgerChannelId);
    // const { latestState: targetChannelState } = store.getEntry(targetChannelId);

    /*
    TODO
    1. Match ledger destinations to target channel destinations
    2. Deduct from ledger destination
    3. Allocate total deducted to target
    */

    const allocation: Allocation = [
      {
        destination: targetChannelId,
        // TODO: This needs to account for the existing allocation
        amount: '0x01',
      },
    ];
    return {
      channelId: ledgerChannelId,
      outcome: ethAllocationOutcome(allocation),
    };
  }

  const services: Services = {
    findLedgerChannelId: async () => ({ type: 'NOT_FOUND' }), // TODO
    getNullChannelArgs,
    createNullChannel: CreateNullChannel.machine(store),
    getTargetAllocation,
    directFunding: DirectFunding.machine(store),
    getTargetOutcome,
    supportState: SupportState.machine(store),
  };

  const options = { services, guards };

  return Machine(config).withConfig(options, context);
};
