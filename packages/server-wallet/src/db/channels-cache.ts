import {ethers} from 'ethers';
import Knex, {Transaction} from 'knex';

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
}

class PaymentChannelAccessAPI {
  static async acquirePaymentChannel(
    group_id: string
  ): Promise<{channelId: string; turnNumber: number; tx: Transaction}> {
    const tx = await knex.transaction();
    const result = (
      await tx.raw(
        `
        SELECT *
        FROM ${TABLE}
        WHERE group_id = ?
        AND turn_number % 2 = 1
        LIMIT 1
        FOR UPDATE;
        `,
        [group_id]
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

async function run(): Promise<void> {
  const newInsert = ethers.Wallet.createRandom().address;
  const group5 = 'group-5';
  await channelCache.delete().where({group_id: group5});

  await ChannelManagementAPI.putChannel(newInsert, group5, 5);

  const channelId = await acquireAndHold(group5, 1);
  await acquireAndHold(group5, 2).catch(reason =>
    console.log(`Expected to fail; failed with ${reason}`)
  );

  console.log(`got ${channelId} for group 5. Expected ${newInsert}`);
}

run()
  .catch(console.error)
  .finally(process.exit);
