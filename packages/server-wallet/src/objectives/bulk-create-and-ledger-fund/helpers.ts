import {CreateChannelParams} from '@statechannels/client-api-schema';
import {Destination, Outcome, Uint256} from '@statechannels/wallet-core';
import {BigNumber, constants} from 'ethers';

import {Channel} from '../../models/channel';

export function constructCreateLedgerChannelParams(
  appChannelArgs: CreateChannelParams,
  count: number
): CreateChannelParams {
  return {
    ...appChannelArgs,
    appDefinition: constants.AddressZero,
    appData: '0x00',
    fundingStrategy: 'Unfunded',
    allocations: appChannelArgs.allocations.map(allocation => ({
      token: allocation.token,
      allocationItems: allocation.allocationItems.map(allocationItem => ({
        destination: allocationItem.destination,
        amount: BigNumber.from(allocationItem.amount)
          .mul(count)
          .toString(),
      })),
    })),
  };
}

export function constructLedgerOutcome(
  type: Outcome['type'],
  assetHolderAddress: string,
  applicationChannels: Channel[]
): Outcome {
  if (type != 'SimpleAllocation') throw Error('Unimplemented');
  return {
    type: 'SimpleAllocation',
    assetHolderAddress,
    allocationItems: applicationChannels.map(c => ({
      destination: c.channelId as Destination,
      amount: c.totalAllocated as Uint256,
    })),
  };
}
