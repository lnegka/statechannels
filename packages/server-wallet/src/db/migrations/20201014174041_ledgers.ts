import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table('channels', function(table) {
    table.string('asset_holder_address');
    table.string('funding_ledger_channel_id');
  });
}

export async function down(_knex: Knex): Promise<any> {
  return;
}
