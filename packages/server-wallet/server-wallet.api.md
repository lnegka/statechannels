## API Report File for "@statechannels/server-wallet"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Address } from '@statechannels/client-api-schema';
import { ChannelConstants } from '@statechannels/wallet-core';
import { ChannelId } from '@statechannels/client-api-schema';
import { ChannelResult } from '@statechannels/client-api-schema';
import { CloseChannel } from '@statechannels/wallet-core';
import { CloseChannelParams } from '@statechannels/client-api-schema';
import { CreateChannelParams } from '@statechannels/client-api-schema';
import EventEmitter from 'eventemitter3';
import { FundingStrategy } from '@statechannels/client-api-schema';
import { GetStateParams } from '@statechannels/client-api-schema';
import { JoinChannelParams } from '@statechannels/client-api-schema';
import { JSONSchema } from 'objection';
import Knex from 'knex';
import { Logger } from 'pino';
import { Payload as Message } from '@statechannels/wallet-core';
import { MessageQueuedNotification } from '@statechannels/client-api-schema';
import { Model } from 'objection';
import { ModelOptions } from 'objection';
import { Objective } from '@statechannels/wallet-core';
import { OpenChannel } from '@statechannels/wallet-core';
import { Outcome } from '@statechannels/wallet-core';
import { Participant } from '@statechannels/wallet-core';
import { Participant as Participant_2 } from '@statechannels/client-api-schema';
import { Payload } from '@statechannels/wire-format';
import * as pino from 'pino';
import { Pojo } from 'objection';
import { providers } from 'ethers';
import { QueryContext } from 'objection';
import { SignatureEntry } from '@statechannels/wallet-core';
import { SignedState } from '@statechannels/wallet-core';
import { SignedState as SignedState_2 } from '@statechannels/wire-format';
import { SignedStateVarsWithHash } from '@statechannels/wallet-core';
import { SignedStateWithHash } from '@statechannels/wallet-core';
import { State } from '@statechannels/wallet-core';
import { StateVariables } from '@statechannels/wallet-core';
import { StateWithHash } from '@statechannels/wallet-core';
import { SyncChannelParams } from '@statechannels/client-api-schema';
import { Transaction } from 'objection';
import { TransactionOrKnex } from 'objection';
import { Uint256 as Uint256_2 } from '@statechannels/wallet-core';
import { UpdateChannelParams } from '@statechannels/client-api-schema';

export { Message }

// Warning: (ae-forgotten-export) The symbol "Notice" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export type Outgoing = Notice;

// @public (undocumented)
export interface ServerWalletConfig {
    // (undocumented)
    chainNetworkID: string;
    // (undocumented)
    debugKnex?: string;
    // (undocumented)
    erc20Address?: string;
    // (undocumented)
    erc20AssetHolderAddress?: string;
    // (undocumented)
    ethAssetHolderAddress?: string;
    // (undocumented)
    logDestination?: string;
    // (undocumented)
    logLevel: pino.Level;
    // (undocumented)
    metricsOutputFile?: string;
    // (undocumented)
    nodeEnv?: 'test' | 'development' | 'production';
    // (undocumented)
    postgresDatabaseUrl?: string;
    // (undocumented)
    postgresDBName?: string;
    // (undocumented)
    postgresDBPassword?: string;
    // (undocumented)
    postgresDBUser?: string;
    // (undocumented)
    postgresHost?: string;
    // (undocumented)
    postgresPoolSize?: {
        max: number;
        min: number;
    };
    // (undocumented)
    postgresPort?: string;
    // (undocumented)
    rpcEndpoint?: string;
    // (undocumented)
    serverPrivateKey: string;
    // (undocumented)
    serverSignerPrivateKey: string;
    // (undocumented)
    skipEvmValidation: boolean;
    // (undocumented)
    timingMetrics: boolean;
    // (undocumented)
    workerThreadAmount: number;
}

// @public (undocumented)
export type SingleChannelOutput = {
    outbox: Outgoing[];
    channelResult: ChannelResult;
    objectivesToApprove?: Omit<DBObjective, 'status'>[];
};

// Warning: (ae-forgotten-export) The symbol "SingleThreadedWallet" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "MultiThreadedWallet" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export type Wallet = SingleThreadedWallet | MultiThreadedWallet;

// @public (undocumented)
export const Wallet: {
    create(walletConfig?: ServerWalletConfig | undefined): Wallet;
};


// Warnings were encountered during analysis:
//
// src/wallet/wallet.ts:71:3 - (ae-forgotten-export) The symbol "DBObjective" needs to be exported by the entry point index.d.ts

// (No @packageDocumentation comment for this package)

```
