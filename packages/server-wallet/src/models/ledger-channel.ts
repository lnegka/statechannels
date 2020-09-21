import {Model} from 'objection';

import {Bytes32} from '../type-aliases';

import {Channel} from './channel';

export class LedgerChannel extends Model {
  readonly id!: number;

  ledgerChannelId!: Bytes32;

  static tableName = 'ledger-channels';

  static relationMappings = {
    ledgerChannelId: {
      relation: Model.BelongsToOneRelation,
      modelClass: Channel,
      join: {
        from: 'ledger-channels.ledgerChannelId',
        to: 'channels.channelId',
      },
    },
  };
}
