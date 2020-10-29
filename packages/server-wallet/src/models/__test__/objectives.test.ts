import {BulkCreateAndLedgerFund} from '@statechannels/wallet-core';

import {testKnex as knex} from '../../../jest/knex-setup-teardown';
import {seedAlicesSigningWallet} from '../../db/seeds/1_signing_wallet_seeds';
import {Channel} from '../channel';
import {ObjectiveModel, ObjectiveChannelModel} from '../objective';

import {channel} from './fixtures/channel';

const l = channel({channelNonce: 0});
const c1 = channel({channelNonce: 1});
const c2 = channel({channelNonce: 2});
const objective: BulkCreateAndLedgerFund = {
  type: 'BulkCreateAndLedgerFund',
  participants: [],
  data: {
    ledgerId: l.channelId,
    channelIds: [c1.channelId, c2.channelId],
  },
};
beforeEach(async () => {
  await seedAlicesSigningWallet(knex);
});

describe('Objective > insert', () => {
  it('fails to insert / associate an objective when it references a channel that does not exist', async () => {
    await expect(ObjectiveModel.insert({...objective, status: 'pending'}, knex)).rejects.toThrow();

    expect(await ObjectiveModel.query(knex).select()).toMatchObject([]);

    expect(await ObjectiveChannelModel.query(knex).select()).toMatchObject([]);
  });

  it('inserts and associates an objective with all channels that it references (channels exist)', async () => {
    await Promise.all(
      [l, c1, c2].map(c =>
        Channel.query(knex)
          .withGraphFetched('signingWallet')
          .insert(c)
      )
    );

    await ObjectiveModel.insert({...objective, status: 'pending'}, knex);

    expect(await ObjectiveModel.query(knex).select()).toMatchObject([
      {objectiveId: `BulkCreateAndLedgerFund-${l.channelId}`},
    ]);

    expect(await ObjectiveChannelModel.query(knex).select()).toMatchObject([
      {
        objectiveId: `BulkCreateAndLedgerFund-${l.channelId}`,
        channelId: l.channelId,
      },
      {
        objectiveId: `BulkCreateAndLedgerFund-${l.channelId}`,
        channelId: c1.channelId,
      },
      {
        objectiveId: `BulkCreateAndLedgerFund-${l.channelId}`,
        channelId: c2.channelId,
      },
    ]);
  });
});

describe('Objective > forChannelIds', () => {
  it('retrieves objectives associated with a given channelId', async () => {
    await Promise.all(
      [l, c1, c2].map(c =>
        Channel.query(knex)
          .withGraphFetched('signingWallet')
          .insert(c)
      )
    );

    await ObjectiveModel.insert({...objective, status: 'pending'}, knex);

    expect(await ObjectiveModel.forChannelIds([c1.channelId], knex)).toMatchObject([
      {objectiveId: `BulkCreateAndLedgerFund-${l.channelId}`},
    ]);
  });
});
