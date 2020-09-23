import {Worker} from 'worker_threads';
import path from 'path';

import {Pool} from 'tarn';
import {State, StateWithHash} from '@statechannels/wallet-core';
import {UpdateChannelParams} from '@statechannels/client-api-schema';
import {Either} from 'fp-ts/lib/Either';
import {isLeft} from 'fp-ts/lib/These';
import _ from 'lodash';

import {MultipleChannelResult, SingleChannelResult} from '../../wallet';
import {ServerWalletConfig} from '../../config';
import {logger} from '../../logger';

import {StateChannelWorkerData} from './worker-data';
const ONE_DAY = 86400000;
export class WorkerManager {
  private pool?: Pool<Worker>;
  private threadAmount: number;

  constructor(walletConfig: ServerWalletConfig) {
    // throw new Error('gimme dat stack');
    console.log('manager created');
    this.threadAmount = walletConfig.workerThreadAmount;
    if (walletConfig.workerThreadAmount > 0) {
      this.pool = new Pool({
        create: (): Worker => {
          const worker = new Worker(path.resolve(__dirname, './loader.js'), {
            workerData: walletConfig,
          });
          console.log('worker created');
          worker.stdout.on('data', data => logger.info(data.toString()));
          worker.stderr.on('data', data => logger.error(data.toString()));
          worker.on('error', err => {
            throw err;
          });
          return worker;
        },
        destroy: (worker: Worker): Promise<number> => worker.terminate(),
        min: walletConfig.workerThreadAmount,
        max: walletConfig.workerThreadAmount,
        reapIntervalMillis: ONE_DAY,
        idleTimeoutMillis: ONE_DAY,
      });
    }
  }

  public async warmupThreads(): Promise<void[]> {
    // warm up all the threads by acquiring then releasing them
    // This will force them to load the worker scripts
    const promises = _.range(this.threadAmount).map(
      async () =>
        new Promise<void>(resolve =>
          this.pool?.acquire().promise.then(w => {
            this.pool?.release(w);
            resolve();
          })
        )
    );
    return Promise.all(promises);
  }
  public async concurrentSignState(
    state: StateWithHash,
    privateKey: string
  ): Promise<{state: State; signature: string}> {
    if (!this.pool) throw new Error(`Worker threads are disabled`);
    const worker = await this.pool.acquire().promise;
    const data: StateChannelWorkerData = {operation: 'SignState', state, privateKey};
    const resultPromise = new Promise<{state: State; signature: string}>((resolve, reject) =>
      worker.once('message', (response: Either<Error, {state: State; signature: string}>) => {
        this.pool?.release(worker);
        if (isLeft(response)) {
          reject(response.left);
        } else {
          resolve(response.right);
        }
      })
    );

    worker.postMessage(data);
    return resultPromise;
  }

  public async pushMessage(args: unknown): Promise<MultipleChannelResult> {
    if (!this.pool) throw new Error(`Worker threads are disabled`);
    const worker = await this.pool.acquire().promise;
    const data: StateChannelWorkerData = {operation: 'PushMessage', args};
    const resultPromise = new Promise<any>((resolve, reject) =>
      worker.once('message', (response: Either<Error, MultipleChannelResult>) => {
        this.pool?.release(worker);
        if (isLeft(response)) {
          reject(response.left);
        } else {
          resolve(response.right);
        }
      })
    );

    worker.postMessage(data);
    return resultPromise;
  }

  public async updateChannel(args: UpdateChannelParams): Promise<SingleChannelResult> {
    if (!this.pool) throw new Error(`Worker threads are disabled`);
    const worker = await this.pool.acquire().promise;
    const data: StateChannelWorkerData = {operation: 'UpdateChannel', args};
    const resultPromise = new Promise<any>((resolve, reject) =>
      worker.once('message', (response: Either<Error, SingleChannelResult>) => {
        this.pool?.release(worker);
        if (isLeft(response)) {
          logger.error(response);
          reject(response.left);
        } else {
          resolve(response.right);
        }
      })
    );

    worker.postMessage(data);
    return resultPromise;
  }

  public async destroy(): Promise<void> {
    await this.pool?.destroy();
  }
}
