import {ChildProcess, fork} from 'child_process';
import {join} from 'path';

import kill = require('tree-kill');
import axios from 'axios';
import Knex from 'knex';
import _ from 'lodash';
import {Participant, makeDestination} from '@statechannels/wallet-core';
import {Wallet} from 'ethers';

import {dbConfig} from '../src/db/config';
import {withSupportedState} from '../src/models/__test__/fixtures/channel';
import {SigningWallet} from '../src/models/signing-wallet';
import {stateVars} from '../src/wallet/__test__/fixtures/state-vars';
import {Channel} from '../src/models/channel';

import {PerformanceTimer} from './payer/timers';

export type ReceiverServer = {
  url: string;
  server: ChildProcess;
  db: Knex;
};

export const triggerPayments = async (
  channelIds: string[],
  numPayments?: number
): Promise<void> => {
  let args = ['start', '--database', 'payer', '--channels', ...channelIds];

  if (numPayments) args = args.concat(['--numPayments', numPayments.toString()]);

  const payerScript = fork(join(__dirname, './payer/index.ts'), args, {
    execArgv: ['-r', 'ts-node/register'],
  });

  payerScript.on('message', message =>
    console.log(PerformanceTimer.formatResults(JSON.parse(message as any)))
  );
  await new Promise(resolve => payerScript.on('exit', resolve));
};

/**
 * Starts the Receiver Express server in a separate process. Needs to be
 * a separate process because it relies on process.env variables which
 * should not be shared between Payer and Receiver -- particularly SERVER_DB_NAME
 * which indicates that Payer and Receiver use separate databases, despite
 * conveniently re-using the same PostgreSQL instance.
 */
export const startReceiverServer = (
  opts: Partial<{dbName: string; port: number}> = {}
): ReceiverServer => {
  const defaults = {dbName: 'receiver', port: 65535};
  const {dbName, port} = _.merge(defaults, opts);

  const server = fork(
    join(__dirname, './receiver/server.ts'),
    ['start', '--port', port.toString()],
    {
      execArgv: ['-r', 'ts-node/register'],
      env: {
        // eslint-disable-next-line
            ...process.env,
        SERVER_DB_NAME: dbName,
      },
    }
  );

  server.on('error', data => console.error(data.toString()));
  server.on('data', data => console.log(data.toString()));

  const db = knexConnector(dbName);

  return {
    server,
    url: `http://127.0.0.1:65535`,
    db,
  };
};

/**
 * Payers the server at /reset until the API responds with OK;
 * simultaneously ensures that the server is listening and cleans
 * the database of any stale data from previous test runs.
 */
export const waitForServerToStart = (
  receiverServer: ReceiverServer,
  pingInterval = 1500
): Promise<void> =>
  new Promise(resolve => {
    const interval = setInterval(async () => {
      try {
        await axios.get<'OK'>(`${receiverServer.url}/status`);
        clearInterval(interval);
        resolve();
      } catch {
        return;
      }
    }, pingInterval);
  });

export const knexConnector = (database: string): Knex =>
  Knex({
    ...dbConfig,
    connection: {
      ...(dbConfig.connection as Knex.StaticConnectionConfig),
      database,
    },
  });

export const killServer = async ({server, db}: ReceiverServer): Promise<void> => {
  kill(server.pid);

  await db.destroy();
};

export async function seedTestChannels(
  payer: Participant,
  payerPrivateKey: string,
  receiver: Participant,
  receiverPrivateKey: string,
  numOfChannels: number,
  knexPayer: Knex,
  knexReceiver: Knex
): Promise<string[]> {
  const channelIds: string[] = [];
  for (let i = 0; i < numOfChannels; i++) {
    const seed = withSupportedState([
      SigningWallet.fromJson({privateKey: payerPrivateKey}),
      SigningWallet.fromJson({privateKey: receiverPrivateKey}),
    ])({
      vars: [stateVars({turnNum: 3})],
      channelNonce: i,
      participants: [payer, receiver],
    });
    await Channel.bindKnex(knexPayer)
      .query()
      .insert([{...seed, signingAddress: payer.signingAddress}]); // Fixture uses alice() default
    await Channel.bindKnex(knexReceiver)
      .query()
      .insert([{...seed, signingAddress: receiver.signingAddress}]);
    channelIds.push(seed.channelId);
  }
  return channelIds;
}

export function getParticipant(participantId: string, privateKey: string): Participant {
  const signingAddress = new Wallet(privateKey).address;
  return {
    signingAddress,
    participantId,
    destination: makeDestination(signingAddress),
  };
}
