import {configureEnvVariables} from '@statechannels/devtools';

export const RECEIVER_PORT = 65535;
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});

configureEnvVariables();

import app from './app';

const server = app.listen(RECEIVER_PORT, '127.0.0.1');

app.on('listening', () => {
  console.info(`[receiver] Listening on 127.0.0.1:${RECEIVER_PORT}`);
});
