import * as yargs from 'yargs';
import {configureEnvVariables} from '@statechannels/devtools';

import app from './app';

const start = {
  command: 'start',

  describe: 'Makes (fake) payments on many channels concurrently',

  builder: (yargs: yargs.Argv): yargs.Argv =>
    yargs
      .option('port', {
        type: 'number',
        default: '65535',
      })
      .example('receiver --port 654321', 'Start a receiver server'),

  handler: async (argv: {[key: string]: any} & yargs.Argv['argv']): Promise<void> => {
    configureEnvVariables();
    const {port} = argv;
    console.log(`[receiver] Starting on port ${port}`);

    const server = app.listen(port, '127.0.0.1', () =>
      console.log(`[receiver] Listening on 127.0.0.1:${port}`)
    );

    process.on('SIGINT', () => {
      server.close();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      server.close();
      process.exit(0);
    });
  },
};

yargs
  .scriptName('receiver server')
  .command(start)
  .demandCommand(1, 'Choose a command from the above list')
  .help().argv;
