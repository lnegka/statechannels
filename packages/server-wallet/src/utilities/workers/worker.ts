import { parentPort, isMainThread, threadId } from 'worker_threads';

import { hashState } from '@statechannels/wallet-core';

import { fastRecoverAddress, fastSignState } from '../signatures';

import { isStateChannelWorkerData } from './worker-message';
import { logger } from '../../logger';

parentPort?.on('message', async (message: any) => {
  if (isMainThread) {
    throw new Error('Attempting to execute worker thread script on the main thread');
  }

  if (!isStateChannelWorkerData(message)) {
    throw new Error('Incorrect worker data');
  }
  switch (message.operation) {
    case 'HashState ':
      parentPort?.postMessage(await hashState(message.state));
      break;
    case 'RecoverAddress':
      parentPort?.postMessage(
        await fastRecoverAddress(message.state, message.signature, message.state.stateHash)
      );
      break;
    case 'SignState':
      logger.info({ nonce: message.state.channelNonce, threadId });
      parentPort?.postMessage(await fastSignState(message.state, message.privateKey));
  }
});
