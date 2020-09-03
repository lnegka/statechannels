/* eslint-disable no-process-env */
import {GanacheServer} from '@statechannels/devtools';
import {utils} from 'ethers';

import config from '../src/config';
import {deploy} from '../deployment/deploy';

export default async function setup(): Promise<void> {
  const account = {privateKey: config.serverPrivateKey, amount: utils.parseEther('100').toString()};
  const ganacheServer = new GanacheServer(8545, 1337, [account]);
  await ganacheServer.ready();

  const deployedArtifacts = await deploy();

  // TODO: is this the best way to add these addresses?
  process.env.ETH_ASSET_HOLDER_ADDRESS = deployedArtifacts.ethAssetHolder;
  process.env.ERC20_ADDRESS = deployedArtifacts.token;
  process.env.ERC20_ASSET_HOLDER_ADDRESS = deployedArtifacts.tokenAssetHolder;

  (global as any).__ARTIFACTS__ = deployedArtifacts;
  (global as any).__GANACHE_SERVER__ = ganacheServer;
}
