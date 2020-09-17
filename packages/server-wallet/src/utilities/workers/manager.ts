import {Pool, spawn, Worker} from 'threads';
import {State, StateWithHash} from '@statechannels/wallet-core';

export class WorkerManager {
  private pool = Pool(() => spawn(new Worker('./worker')));

  public async concurrentSignState(
    state: StateWithHash,
    privateKey: string
  ): Promise<{state: State; signature: string}> {
    const signature = await this.pool.queue(async sign => sign(state.stateHash, privateKey));
    return {state, signature};
  }

  public async destroy(): Promise<void> {
    await this.pool.terminate();
  }
}
