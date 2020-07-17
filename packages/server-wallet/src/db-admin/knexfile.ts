// Populate env vars as knexfile is used directly in yarn scripts
import '../env';

import * as path from 'path';
import { Config } from 'knex';
import { dbCofig } from '../db-config';

const BASE_PATH = path.join(__dirname, '..', 'db');
const extensions = [path.extname(__filename)];

let knexConfig: Config = {
  ...dbCofig,
  debug: process.env.DEBUG_KNEX === 'TRUE',
  migrations: {
    directory: path.join(BASE_PATH, 'migrations'),
    loadExtensions: extensions,
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
    loadExtensions: extensions,
  },
  /**
   * SEE: db-admin-connection.ts
   * To safely run migrations, we cannot use knexSnakeCaseMappers in the knex config
   * https://github.com/Vincit/objection.js/issues/1144
   * So, in our admin knex config, which is used for running migrations, we
   * overwrite the two config options set by knexSnakeCaseMappers
   */
  postProcessResponse: undefined,
  wrapIdentifier: undefined,
};

if (process.env.NODE_ENV === 'development') {
  knexConfig = { ...knexConfig, pool: { min: 0, max: 1 } };
}

export const {
  client,
  connection,
  debug,
  migrations,
  seeds,
  pool,
} = knexConfig;
