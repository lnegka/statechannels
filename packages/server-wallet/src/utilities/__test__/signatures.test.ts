import {Wallet, ethers} from 'ethers';
import {
  State,
  simpleEthAllocation,
  signState,
  getSignerAddress,
  toNitroState,
} from '@statechannels/wallet-core';
import _ from 'lodash';

import {participant} from '../../wallet/__test__/fixtures/participants';
import {recoverAddress, signState as wasmSignState} from '../signatures';
import {logger} from '../../logger';
import {addHash} from '../../state-utils';

it('sign vs wasmSign', async () => {
  _.range(5).map(async channelNonce => {
    const {address, privateKey} = Wallet.createRandom();
    const state: State = {
      chainId: '0x1',
      channelNonce,
      participants: [participant({signingAddress: address})],
      outcome: simpleEthAllocation([]),
      turnNum: 1,
      isFinal: false,
      appData: '0x00',
      appDefinition: ethers.constants.AddressZero,
      challengeDuration: 0x5,
    };

    const signedState = signState(state, privateKey);
    const wasmSignedState = wasmSignState(addHash(state), privateKey);
    try {
      expect(signedState).toEqual((await wasmSignedState).signature);
    } catch (error) {
      logger.info({error, state, privateKey});
      throw error;
    }
  });
});

it('getSignerAddress vs fastRecover', async () => {
  _.range(5).map(async channelNonce => {
    const {address, privateKey} = Wallet.createRandom();
    const state: State = {
      chainId: '0x1',
      channelNonce,
      participants: [participant({signingAddress: address})],
      outcome: simpleEthAllocation([]),
      turnNum: 1,
      isFinal: false,
      appData: '0x00',
      appDefinition: ethers.constants.AddressZero,
      challengeDuration: 0x5,
    };

    const signedState = await wasmSignState(addHash(state), privateKey);
    try {
      const recovered = getSignerAddress(signedState.state, signedState.signature);
      const wasmRecovered = recoverAddress(signedState.signature, toNitroState(signedState.state));
      expect(recovered).toEqual(wasmRecovered);
    } catch (error) {
      logger.info({error, state, privateKey});
      throw error;
    }
  });
});
