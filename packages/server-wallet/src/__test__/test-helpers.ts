import {ChannelResult} from '@statechannels/client-api-schema';
import {Payload, SignedState} from '@statechannels/wire-format';
import {Objective} from '@statechannels/wallet-core';

import {MultipleChannelOutput} from '../wallet';
import {ObjectiveStoredInDB} from '../wallet/store';

import {Outgoing} from '..';

export function getPayloadFor(participantId: string, outbox: Outgoing[]): unknown {
  const filteredOutbox = outbox.filter(outboxItem => outboxItem.params.recipient === participantId);
  if (filteredOutbox.length != 1)
    throw Error(`Expected exactly one message in outbox: found ${filteredOutbox.length}`);
  return filteredOutbox[0].params.data;
}

export function getChannelResultFor(
  channelId: string,
  channelResults: ChannelResult[]
): ChannelResult {
  const filteredChannelResults = channelResults.filter(
    channelResult => channelResult.channelId === channelId
  );
  if (filteredChannelResults.length != 1)
    throw Error(`Expected exactly one channel result: found ${filteredChannelResults.length}`);
  return filteredChannelResults[0];
}

export function getSignedStateFor(channelId: string, outbox: Outgoing[]): SignedState {
  // eslint-disable-next-line
  const filteredSignedStates = (outbox[0]!.params.data as Payload).signedStates!.filter(
    ss => ss.channelId === channelId
  );
  if (filteredSignedStates.length != 1)
    throw Error(`Expected exactly one channel result: found ${filteredSignedStates.length}`);
  return filteredSignedStates[0];
}

export function getObjectiveToApprove(output: MultipleChannelOutput): ObjectiveStoredInDB {
  if (output.objectivesToApprove === undefined) throw Error('No objective in outbox');
  if (output.objectivesToApprove.length != 1)
    throw Error(`Expected exactly one objective, found ${output.objectivesToApprove.length}`);
  return output.objectivesToApprove[0];
}
