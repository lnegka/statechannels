import {Guid} from 'guid-typescript';
import * as marky from 'marky';

import walletConfig from './config';

// TODO: We should return a sync and an async timer
export const timerFactory = (prefix: string) => async <T>(
  label: string,
  cb: () => Promise<T>
): Promise<T> => time(`${prefix}: ${label}`, cb);

export const syncTimerFactory = (prefix: string) => <T>(label: string, cb: () => T): T =>
  timeSync(`${prefix}: ${label}`, cb);

async function time<T>(label: string, cb: () => Promise<T>): Promise<T> {
  const uniqueLabel = `${Guid.create().toString()}-${label}`;
  if (walletConfig.timingMetrics) {
    marky.mark(uniqueLabel);
    const result = await cb();
    marky.stop(uniqueLabel);
    return result;
  } else {
    return await cb();
  }
}

function timeSync<T>(label: string, cb: () => T): T {
  if (walletConfig.timingMetrics) {
    console.time(label);
    const result = cb();
    console.timeEnd(label);
    return result;
  } else {
    return cb();
  }
}
