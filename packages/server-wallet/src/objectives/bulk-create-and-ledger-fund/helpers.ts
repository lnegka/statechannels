import {CreateChannelParams} from '@statechannels/client-api-schema';
import {BigNumber, constants} from 'ethers';

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
