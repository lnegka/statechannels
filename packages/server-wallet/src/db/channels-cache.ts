import {ethers} from 'ethers';
import Knex, {Transaction} from 'knex';
import _ from 'lodash';

import {defaultConfig, extractDBConfigFromServerWalletConfig} from '../config';
const knex = Knex(extractDBConfigFromServerWalletConfig(defaultConfig));
const SCHEMA = 'client_utils';
const TABLE = `${SCHEMA}.payment_channels`;

const channelCache = knex.table(TABLE);

class ChannelManagementAPI {
  static async putChannel(channel_id: string, group_id: string, turn_number = 3): Promise<void> {
    await channelCache.insert({channel_id, group_id, turn_number});
  }

  static async deleteChannel(channel_id: string): Promise<void> {
    await channelCache.delete().where({channel_id});
  }

  static async lockedChannels(): Promise<string[]> {
    const tx = await knex.transaction();
    const result = await tx.raw(
      `
    SELECT channel_id FROM ??
    WHERE updated_at < now() - interval '10 seconds'
    AND turn_number % 2 = 0;
    `,
      [TABLE]
    );

    return result.rows.map((row: {channel_id: string}) => row.channel_id);
  }
}

class PaymentChannelAccessAPI {
  static async acquirePaymentChannel(
    group_id: string
  ): Promise<{channelId: string; turnNumber: number; tx: Transaction}> {
    let key: string;
    const tx = await knex.transaction();

    const result = (
      await tx.raw(
        `
        SELECT * FROM ??
        WHERE group_id = ?
        AND turn_number % 2 = 1
        LIMIT 1 
        FOR UPDATE
        SKIP LOCKED;
        `,
        [TABLE, group_id]
      )
    ).rows[0];

    if (!result) {
      await tx.rollback();
      throw new Error('No channel found');
    }

    const {channel_id: channelId, turn_number: turnNumber} = result;
    return {channelId, turnNumber, tx};
  }

  static async releasePaymentChannel(
    channelId: string,
    turnNum: number,
    tx: Transaction
  ): Promise<void> {
    await tx.raw(
      `
        UPDATE ${TABLE}
        SET turn_number = ?
        WHERE channel_id = ?
    `,
      [turnNum, channelId]
    );
    await tx.commit();
  }
  static async submitReceipt(channelId: string, turnNum: number): Promise<void> {
    return knex.raw(
      `
      UPDATE ${TABLE}
      SET turn_number = ?
      WHERE channel_id = ?
    `,
      [channelId, turnNum]
    );
  }
}

const delay = async (num = 10): Promise<void> => new Promise(resolve => setTimeout(resolve, num)); // 3 sec

async function acquireAndHold(groupId: string, id: number): Promise<string> {
  console.log(`${id}: acquiring`);
  const {channelId, turnNumber, tx} = await PaymentChannelAccessAPI.acquirePaymentChannel(groupId);
  console.log(`${id}: acquired`);

  await delay();

  console.log(`${id}: releasing`);
  await PaymentChannelAccessAPI.releasePaymentChannel(channelId, turnNumber + 1, tx);

  return channelId;
}

async function run1(): Promise<void> {
  const newInsert = ethers.Wallet.createRandom().address;
  const group5 = 'group-5';
  await channelCache.delete().where({group_id: group5});

  await ChannelManagementAPI.putChannel(newInsert, group5, 5);

  let id = 0;
  const channelId = await acquireAndHold(group5, (id += 1));
  await acquireAndHold(group5, (id += 1)).catch(reason =>
    console.log(`Expected to fail; failed with ${reason}`)
  );

  console.log(`got ${channelId} for group 5. Expected ${newInsert}`);

  const group3 = 'group-3';
  const acquiredChannels = await Promise.all(
    _.range(4).map(async () => acquireAndHold(group3, (id += 1)))
  );

  console.log(`acquired ${acquiredChannels} for group 3`);
}

async function run2(): Promise<void> {
  const lockedChannels = await ChannelManagementAPI.lockedChannels();

  console.log(`locked channels: ${lockedChannels}`);
}

async function seed(): Promise<void> {
  const groups = _.range(10).map(i => `group-${i}`);
  const rows = () =>
    _.range(20_000).map(i => ({
      channel_id: `channel-${i}-${_.random(12345678910111213.1).toString()}`,
      group_id: `group-${_.random(0, 1000)}`,
      turn_number: 3,
    }));

  await channelCache.insert(rows());
  await channelCache.insert(rows());
  await channelCache.insert(rows());
  await channelCache.insert(rows());
  await channelCache.insert(rows());
  await channelCache.insert(rows());
}

async function benchmark(): Promise<void> {
  await Promise.all(
    _.range(500).map(async i => {
      const {tx} = await PaymentChannelAccessAPI.acquirePaymentChannel('group-3');
      await tx.commit();
    })
  );

  const NUM_CHANNELs = 10_000;
  console.time(`acquire channel x ${NUM_CHANNELs}`);
  await Promise.all(
    _.range(NUM_CHANNELs).map(async i => {
      let key: string;
      // console.time((key = `${i}  get channel`));
      const {tx} = await PaymentChannelAccessAPI.acquirePaymentChannel('group-3');
      // console.timeEnd(key);

      // console.time((key = `${i}  commit`));
      await tx.commit();
      // console.timeEnd(key);
    })
  );

  console.timeEnd(`acquire channel x ${NUM_CHANNELs}`);
}

const run = benchmark;

run()
  .catch(console.error)
  .finally(process.exit);
