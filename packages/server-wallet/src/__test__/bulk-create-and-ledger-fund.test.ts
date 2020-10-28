import {CreateChannelParams, Participant, Allocation} from '@statechannels/client-api-schema';
import {makeDestination} from '@statechannels/wallet-core';
import {BigNumber, ethers} from 'ethers';

import {defaultTestConfig} from '../config';
import {Wallet} from '../wallet';

import {getObjectiveToApprove, getPayloadFor} from './test-helpers';

jest.setTimeout(10_000);

const NUMBER_OF_APPLICATION_CHANNELS = 10; // We want to do more than this, but may be constrained by the number of db connections and the test timeout
const a = new Wallet({...defaultTestConfig, postgresDBName: 'TEST_A'});
const b = new Wallet({...defaultTestConfig, postgresDBName: 'TEST_B'});

let participantA: Participant;
let participantB: Participant;

beforeAll(async () => {
  await a.dbAdmin().createDB();
  await b.dbAdmin().createDB();
  await Promise.all([a.dbAdmin().migrateDB(), b.dbAdmin().migrateDB()]);

  console.log(await a.getSigningAddress());
  console.log(await b.getSigningAddress());
  participantA = {
    signingAddress: await a.getSigningAddress(),
    participantId: 'a',
    destination: makeDestination(
      '0xaaaa000000000000000000000000000000000000000000000000000000000001'
    ),
  };
  participantB = {
    signingAddress: await b.getSigningAddress(),
    participantId: 'b',
    destination: makeDestination(
      '0xbbbb000000000000000000000000000000000000000000000000000000000002'
    ),
  };
});
afterAll(async () => {
  await Promise.all([a.destroy(), b.destroy()]);
  await a.dbAdmin().dropDB();
  await b.dbAdmin().dropDB();
});

it(`Creates ${NUMBER_OF_APPLICATION_CHANNELS} channels between 2 wallets and ledger funds them `, async () => {
  const allocation: Allocation = {
    allocationItems: [
      {
        destination: participantA.destination,
        amount: BigNumber.from(1).toHexString(),
      },
      {
        destination: participantB.destination,
        amount: BigNumber.from(1).toHexString(),
      },
    ],
    token: '0x00', // must be even length
  };

  const createChannelParams: CreateChannelParams = {
    participants: [participantA, participantB],
    allocations: [allocation],
    appDefinition: ethers.constants.AddressZero,
    appData: '0x00', // must be even length
    fundingStrategy: 'Ledger',
  };

  const resultA0 = await a.bulkCreateAndLedgerFund(
    createChannelParams,
    NUMBER_OF_APPLICATION_CHANNELS
  );

  expect(resultA0).toMatchObject({
    ledgerId: expect.stringMatching(/^0x/),
    channelIds: Array(NUMBER_OF_APPLICATION_CHANNELS).fill(expect.stringMatching(/^0x/)),
  });

  // A sends to B, B pushes
  const bPushOutput = await b.pushMessage(
    getPayloadFor(participantB.participantId, resultA0.outbox)
  );

  expect(bPushOutput).toMatchObject({
    channelResults: Array(NUMBER_OF_APPLICATION_CHANNELS + 1).fill(
      expect.objectContaining({status: 'proposed'})
    ),
  });

  const objective = getObjectiveToApprove(bPushOutput);
  expect(objective.type).toEqual('BulkCreateAndLedgerFund');
  expect(objective.objectiveId).toEqual(expect.stringMatching(/^BulkCreateAndLedgerFund-0x/));

  expect((objective.data as any).channelIds).toMatchObject(
    Array(NUMBER_OF_APPLICATION_CHANNELS).fill(expect.stringMatching(/^0x/))
  );

  // B approves
  const bApproveOutput = await b.approveObjective(objective.objectiveId);

  const aPushOutput2 = await a.pushMessage(
    getPayloadFor(participantA.participantId, bApproveOutput.outbox)
  );

  expect(aPushOutput2).toMatchObject({
    channelResults: Array(NUMBER_OF_APPLICATION_CHANNELS + 1).fill(
      expect.objectContaining({status: 'opening'})
    ),
  });

  const bPushOutput2 = await b.pushMessage(
    getPayloadFor(participantB.participantId, aPushOutput2.outbox)
  );

  // Is the Ledger channel now running?
  expect(bPushOutput2).toMatchObject({
    channelResults: Array(1).fill(expect.objectContaining({status: 'running'})),
  });
});
