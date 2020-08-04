import * as childProcess from 'child_process';

import {Participant} from '@statechannels/client-api-schema';

import {alice, bob} from '../src/wallet/__test__/fixtures/signing-wallets';
import {alice as aliceP, bob as bobP} from '../src/wallet/__test__/fixtures/participants';
import {Channel} from '../src/models/channel';
import {withSupportedState} from '../src/models/__test__/fixtures/channel';
import {SigningWallet} from '../src/models/signing-wallet';
import {truncate} from '../src/db-admin/db-admin-connection';
import knexPing from '../src/db/connection';
import {logger} from '../src/logger';

import PingClient from './ping/client';
import {killServer, startPongServer, waitForServerToStart, PongServer, knexPong} from './e2e-utils';

jest.setTimeout(10_000); // Starting up Pong server can take ~5 seconds

let ChannelPing: typeof Channel;
let ChannelPong: typeof Channel;
let SWPing: typeof SigningWallet;
let SWPong: typeof SigningWallet;

let pongServer: PongServer;
beforeAll(async () => {
  pongServer = startPongServer();
  await waitForServerToStart(pongServer);

  [ChannelPing, ChannelPong] = [knexPing, knexPong].map(knex => Channel.bindKnex(knex));
  [SWPing, SWPong] = [knexPing, knexPong].map(knex => SigningWallet.bindKnex(knex));
});

beforeEach(async () => {
  await Promise.all([knexPing, knexPong].map(db => truncate(db)));
  // Adds Alice to Ping's Database
  await SWPing.query().insert(alice());

  // Adds Bob to Pong's Database
  await SWPong.query().insert(bob());
});

afterAll(async () => {
  await killServer(pongServer);
});

describe('e2e', () => {
  let pingClient: PingClient;

  let ping: Participant;
  let pong: Participant;

  beforeAll(async () => {
    // Create actors
    pingClient = new PingClient(alice().privateKey, `http://127.0.0.1:65535`);

    // Gets participant info for testing convenience
    ping = pingClient.me;
    pong = await pingClient.getPongsParticipantInfo();
  });

  it('can do a simple end-to-end flow with no signed states', async () => {
    const ret = await pingClient.emptyMessage();
    expect(ret.sender).toBe('pong');
    expect(ret.recipient).toBe('ping');
    expect(ret.data.signedStates?.length).toBe(0);
    expect(ret.data.objectives?.length).toBe(0);
  });

  it('can create a channel, send signed state via http', async () => {
    const channel = await pingClient.createPingChannel(pong);

    // TODO: Currently the PongController does not join the channel
    // so these tests only confirm that the channel was created
    // within Ping's wallet, that's it. Next up will be for Pong
    // to join the channel and then these tests should check for
    // 'running' status, turnNum 1, etc.

    expect(channel.participants).toStrictEqual([ping, pong]);
    expect(channel.status).toBe('opening');
    expect(channel.turnNum).toBe(0);
  });
});

describe('pinging', () => {
  let channelId: string;

  beforeEach(async () => {
    const [ping, pong] = [aliceP(), bobP()];
    const seed = withSupportedState(
      {turnNum: 3},
      {
        channelNonce: 123456789, // something unique for this test
        participants: [ping, pong],
      }
    )();

    await ChannelPing.query().insert([seed]); // Fixture uses alice() default
    await ChannelPong.query().insert([{...seed, signingAddress: pong.signingAddress}]);

    channelId = seed.channelId;
  });

  const expectSupportedState = async (C: typeof Channel, turnNum: number): Promise<any> =>
    expect(C.forId(channelId, undefined).then(c => c.protocolState)).resolves.toMatchObject({
      latest: {turnNum},
    });

  it('can update pre-existing channel, send signed state via http', async () => {
    await expectSupportedState(ChannelPing, 3);
    await expectSupportedState(ChannelPong, 3);

    // SCRIPT
    const pingScript = childProcess.spawn(`yarn`, [
      'ts-node',
      'e2e-test/scripts/ping.ts',
      '--database',
      'ping',
      '--channels',
      channelId,
    ]);

    pingScript.on('error', logger.error);

    await new Promise(resolve => {
      pingScript.on('exit', _data => resolve());

      // FIXME: I would expect `.on('exit', resolve)` to work, but it does not,
      // jest warns 'Jest did not exit one second after the test run has completed.'
      // This indicates to me that the spawned process does not exit, even after logging 'DONE'
      pingScript.stdout.on('data', data => data.toString() === 'DONE\n' && resolve());
    });

    await pingScript.kill();

    // END SCRIPT

    // EFFECTS
    await expectSupportedState(ChannelPing, 5);
    await expectSupportedState(ChannelPong, 5);
    // END EFFECTS
  });

  it('can update pre-existing channels multiple times', async () => {
    await expectSupportedState(ChannelPing, 3);
    await expectSupportedState(ChannelPong, 3);
    // END SETUP

    // SCRIPT
    const numPings = 5;
    const pingScript = childProcess.spawn('yarn', [
      'ts-node',
      'e2e-test/scripts/ping.ts',
      '--database',
      'ping',
      '--channels',
      channelId,
      `--numPings`,
      `${numPings}`,
    ]);

    pingScript.stdout.on('data', data => logger.info({data: data?.toString()}, 'DATA'));
    pingScript.on('error', err => logger.error(err.toString()));

    await new Promise(resolve => {
      pingScript.on('exit', _data => resolve());

      // FIXME: I would expect `.on('exit', resolve)` to work, but it does not,
      // jest warns 'Jest did not exit one second after the test run has completed.'
      // This indicates to me that the spawned process does not exit, even after logging 'DONE'
      pingScript.stdout.on('data', data => data.toString() === 'DONE\n' && resolve());
    });

    await pingScript.kill();

    // END SCRIPT

    // EFFECTS
    await expectSupportedState(ChannelPing, 3 + 2 * numPings);
    await expectSupportedState(ChannelPong, 3 + 2 * numPings);
    // END EFFECTS
  });
});
