---
id: version-0.2.0-channel-client.fakechannelprovider
title: FakeChannelProvider class
hide_title: true
original_id: channel-client.fakechannelprovider
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@statechannels/channel-client](./channel-client.md) &gt; [FakeChannelProvider](./channel-client.fakechannelprovider.md)

## FakeChannelProvider class

<b>Signature:</b>

```typescript
export declare class FakeChannelProvider implements ChannelProviderInterface 
```
<b>Implements:</b> [ChannelProviderInterface](./iframe-channel-provider.channelproviderinterface.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [destinationAddress](./channel-client.fakechannelprovider.destinationaddress.md) |  | string |  |
|  [events](./channel-client.fakechannelprovider.events.md) |  | EventEmitter&lt;EventType&gt; |  |
|  [internalAddress](./channel-client.fakechannelprovider.internaladdress.md) |  | string |  |
|  [latestState](./channel-client.fakechannelprovider.lateststate.md) |  | Record&lt;ChannelId, [ChannelResult](./client-api-schema.channelresult.md)<!-- -->&gt; |  |
|  [off](./channel-client.fakechannelprovider.off.md) |  | OffType |  |
|  [on](./channel-client.fakechannelprovider.on.md) |  | OnType |  |
|  [opponentAddress](./channel-client.fakechannelprovider.opponentaddress.md) |  | Record&lt;ChannelId, string&gt; |  |
|  [opponentIndex](./channel-client.fakechannelprovider.opponentindex.md) |  | Record&lt;ChannelId, 0 &#124; 1&gt; |  |
|  [playerIndex](./channel-client.fakechannelprovider.playerindex.md) |  | Record&lt;ChannelId, 0 &#124; 1&gt; |  |
|  [signingAddress](./channel-client.fakechannelprovider.signingaddress.md) |  | string |  |
|  [url](./channel-client.fakechannelprovider.url.md) |  | string |  |
|  [walletVersion](./channel-client.fakechannelprovider.walletversion.md) |  | string |  |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [closeChannel(params)](./channel-client.fakechannelprovider.closechannel.md) |  |  |
|  [createChannel(params)](./channel-client.fakechannelprovider.createchannel.md) |  |  |
|  [findChannel(channelId)](./channel-client.fakechannelprovider.findchannel.md) |  |  |
|  [getAddress()](./channel-client.fakechannelprovider.getaddress.md) |  |  |
|  [getOpponentIndex(channelId)](./channel-client.fakechannelprovider.getopponentindex.md) |  |  |
|  [getPlayerIndex(channelId)](./channel-client.fakechannelprovider.getplayerindex.md) |  |  |
|  [getState({ channelId })](./channel-client.fakechannelprovider.getstate.md) |  |  |
|  [isChannelResult(data)](./channel-client.fakechannelprovider.ischannelresult.md) |  |  |
|  [joinChannel(params)](./channel-client.fakechannelprovider.joinchannel.md) |  |  |
|  [notifyAppBudgetUpdated(data)](./channel-client.fakechannelprovider.notifyappbudgetupdated.md) |  |  |
|  [notifyAppChannelUpdated(data)](./channel-client.fakechannelprovider.notifyappchannelupdated.md) |  |  |
|  [notifyOpponent(data, notificationType)](./channel-client.fakechannelprovider.notifyopponent.md) |  |  |
|  [pushMessage(params)](./channel-client.fakechannelprovider.pushmessage.md) |  |  |
|  [send(method, params)](./channel-client.fakechannelprovider.send.md) |  |  |
|  [setAddress(address)](./channel-client.fakechannelprovider.setaddress.md) |  |  |
|  [setState(state)](./channel-client.fakechannelprovider.setstate.md) |  |  |
|  [subscribe()](./channel-client.fakechannelprovider.subscribe.md) |  |  |
|  [unsubscribe()](./channel-client.fakechannelprovider.unsubscribe.md) |  |  |
|  [updateChannel(params)](./channel-client.fakechannelprovider.updatechannel.md) |  |  |
|  [updatePlayerIndex(channelId, playerIndex)](./channel-client.fakechannelprovider.updateplayerindex.md) |  |  |
|  [verifyTurnNum(channelId, turnNum)](./channel-client.fakechannelprovider.verifyturnnum.md) |  |  |