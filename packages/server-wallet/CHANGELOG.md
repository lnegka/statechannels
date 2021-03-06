# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.10.1](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.10.0...@statechannels/server-wallet@1.10.1) (2020-11-07)


### Bug Fixes

* add workaround for noisy log message ([ebe31e3](https://github.com/statechannels/statechannels/commit/ebe31e32afebbe89f6a6a9375768c0d9f2b5904d))





# [1.10.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.7.0...@statechannels/server-wallet@1.10.0) (2020-11-06)


### Bug Fixes

* add jsonSchema to the Funding table ([8910f6e](https://github.com/statechannels/statechannels/commit/8910f6e162ba1167b3c2b00d73ac33f9a0b5e997))
* change transferred out to snake case ([70448d3](https://github.com/statechannels/statechannels/commit/70448d3647ef599c6197b53aa9c6a601fb99ceda))
* directly-funded-channel test passing ([2737502](https://github.com/statechannels/statechannels/commit/2737502f3edd3b70aac43e2625c6e2a16419eb94))
* do not block runloop on chain service transaction submission ([a23d494](https://github.com/statechannels/statechannels/commit/a23d494dce0fcd548c7c473eebd0d69614c8f435))
* ignore older states when validating ([7993a5b](https://github.com/statechannels/statechannels/commit/7993a5ba2ff67474517559ceff4b53f5bdbe49fe))
* only crank channels related to those in the arguments to crankUntilIdle ([593fe68](https://github.com/statechannels/statechannels/commit/593fe68923a6a7cae767c3514a9a40bd03c4e213))
* shouldValidate should not be async ([c5b614e](https://github.com/statechannels/statechannels/commit/c5b614ebcaf6b45e51d0163eab5516b21a84cfd2))
* successfulWithdraw is no longer hardcoded to true ([e76383a](https://github.com/statechannels/statechannels/commit/e76383a4c0e7855a5c6f83349fdfb7ac4b8c38c7))
* successfulWithdraw returns true for non directly funded channels ([ff79d83](https://github.com/statechannels/statechannels/commit/ff79d83f1726fc7bfbef89d7d11f2b17c2cb2ce0))
* typo ([675ceb5](https://github.com/statechannels/statechannels/commit/675ceb54fb566295c7036be0b9e360e7ffbe7328))
* use class logger in crankUntilIdle ([3009b96](https://github.com/statechannels/statechannels/commit/3009b966f0300503b200ee55911d03db2bed0ae3))
* use isLedger from channel ([b232ec9](https://github.com/statechannels/statechannels/commit/b232ec948a84eb06e071c560e66c5f45fb610c44))
* use toLowerCase instead of toLocaleLowerCase ([24f0e1d](https://github.com/statechannels/statechannels/commit/24f0e1dc3064981be6bad58229f3d8aa8333a399))


### Features

* add asset transferred record keeping to the funding table ([8f5ada6](https://github.com/statechannels/statechannels/commit/8f5ada645981b9f1a5627965b3735ed4aafbbdd6))
* add syncChannels API method handler on server-wallet ([ff875f9](https://github.com/statechannels/statechannels/commit/ff875f99e04ff4b8fdb08736b240dee237418eb8))
* add walletVersion to Message type ([16c205c](https://github.com/statechannels/statechannels/commit/16c205c72483a7b9b3445163065c74ff88fa55f5))
* emit channelUpdate event ([a36c1e8](https://github.com/statechannels/statechannels/commit/a36c1e811622cac3173b31ed39d27b74ee2414f9))
* errors during pushMessage have version ([dc23ac1](https://github.com/statechannels/statechannels/commit/dc23ac17e1a60399f1f46cf798708e53856f6034))
* wallets own their own child logger ([73e6bfe](https://github.com/statechannels/statechannels/commit/73e6bfede7cebfa407eed1026fa42d7f60c3ee1e))





# [1.9.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.7.0...@statechannels/server-wallet@1.9.0) (2020-11-03)


### Bug Fixes

* add jsonSchema to the Funding table ([8910f6e](https://github.com/statechannels/statechannels/commit/8910f6e162ba1167b3c2b00d73ac33f9a0b5e997))
* change transferred out to snake case ([70448d3](https://github.com/statechannels/statechannels/commit/70448d3647ef599c6197b53aa9c6a601fb99ceda))
* directly-funded-channel test passing ([2737502](https://github.com/statechannels/statechannels/commit/2737502f3edd3b70aac43e2625c6e2a16419eb94))
* do not block runloop on chain service transaction submission ([a23d494](https://github.com/statechannels/statechannels/commit/a23d494dce0fcd548c7c473eebd0d69614c8f435))
* ignore older states when validating ([7993a5b](https://github.com/statechannels/statechannels/commit/7993a5ba2ff67474517559ceff4b53f5bdbe49fe))
* only crank channels related to those in the arguments to crankUntilIdle ([593fe68](https://github.com/statechannels/statechannels/commit/593fe68923a6a7cae767c3514a9a40bd03c4e213))
* shouldValidate should not be async ([c5b614e](https://github.com/statechannels/statechannels/commit/c5b614ebcaf6b45e51d0163eab5516b21a84cfd2))
* successfulWithdraw is no longer hardcoded to true ([e76383a](https://github.com/statechannels/statechannels/commit/e76383a4c0e7855a5c6f83349fdfb7ac4b8c38c7))
* successfulWithdraw returns true for non directly funded channels ([ff79d83](https://github.com/statechannels/statechannels/commit/ff79d83f1726fc7bfbef89d7d11f2b17c2cb2ce0))
* typo ([675ceb5](https://github.com/statechannels/statechannels/commit/675ceb54fb566295c7036be0b9e360e7ffbe7328))
* use class logger in crankUntilIdle ([3009b96](https://github.com/statechannels/statechannels/commit/3009b966f0300503b200ee55911d03db2bed0ae3))
* use isLedger from channel ([b232ec9](https://github.com/statechannels/statechannels/commit/b232ec948a84eb06e071c560e66c5f45fb610c44))
* use toLowerCase instead of toLocaleLowerCase ([24f0e1d](https://github.com/statechannels/statechannels/commit/24f0e1dc3064981be6bad58229f3d8aa8333a399))


### Features

* add asset transferred record keeping to the funding table ([8f5ada6](https://github.com/statechannels/statechannels/commit/8f5ada645981b9f1a5627965b3735ed4aafbbdd6))
* add walletVersion to Message type ([16c205c](https://github.com/statechannels/statechannels/commit/16c205c72483a7b9b3445163065c74ff88fa55f5))
* emit channelUpdate event ([a36c1e8](https://github.com/statechannels/statechannels/commit/a36c1e811622cac3173b31ed39d27b74ee2414f9))
* errors during pushMessage have version ([dc23ac1](https://github.com/statechannels/statechannels/commit/dc23ac17e1a60399f1f46cf798708e53856f6034))
* wallets own their own child logger ([73e6bfe](https://github.com/statechannels/statechannels/commit/73e6bfede7cebfa407eed1026fa42d7f60c3ee1e))





# [1.8.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.7.0...@statechannels/server-wallet@1.8.0) (2020-11-03)


### Bug Fixes

* ignore older states when validating ([7993a5b](https://github.com/statechannels/statechannels/commit/7993a5ba2ff67474517559ceff4b53f5bdbe49fe))
* shouldValidate should not be async ([c5b614e](https://github.com/statechannels/statechannels/commit/c5b614ebcaf6b45e51d0163eab5516b21a84cfd2))
* typo ([675ceb5](https://github.com/statechannels/statechannels/commit/675ceb54fb566295c7036be0b9e360e7ffbe7328))
* use isLedger from channel ([b232ec9](https://github.com/statechannels/statechannels/commit/b232ec948a84eb06e071c560e66c5f45fb610c44))


### Features

* add walletVersion to Message type ([16c205c](https://github.com/statechannels/statechannels/commit/16c205c72483a7b9b3445163065c74ff88fa55f5))
* errors during pushMessage have version ([dc23ac1](https://github.com/statechannels/statechannels/commit/dc23ac17e1a60399f1f46cf798708e53856f6034))
* wallets own their own child logger ([73e6bfe](https://github.com/statechannels/statechannels/commit/73e6bfede7cebfa407eed1026fa42d7f60c3ee1e))





# [1.7.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.5.1...@statechannels/server-wallet@1.7.0) (2020-11-03)


### Bug Fixes

* add simple check for re-use of previous signed outcome ([96f102d](https://github.com/statechannels/statechannels/commit/96f102dc6bbb3832f6df50fc458b029f2518a74c))
* avoid turn number checking for null app channels ([2c7d9e7](https://github.com/statechannels/statechannels/commit/2c7d9e7c84ca2a0a8931105a03d6d8ce692c4dae))
* change status of unsupported postfund to 'opening' ([31ff797](https://github.com/statechannels/statechannels/commit/31ff79775376044f3fa95f312f40f763b5328267))
* ensure pushMessage returns latest channelResults ([146e295](https://github.com/statechannels/statechannels/commit/146e295ae23f67d45c6f6aaddeab71772f9bb2d4))
* fix broken query on ledger channels in DB ([8e81d4c](https://github.com/statechannels/statechannels/commit/8e81d4ce94f7fc03def09d0a417dee67a0dc1e70))
* pull request review comment changes ([355e967](https://github.com/statechannels/statechannels/commit/355e967d9ae36640fe31e9fa0b4f3c26225d0de5))
* remove forced turn taking requirment on post-fund setup state ([fd87502](https://github.com/statechannels/statechannels/commit/fd87502296d4e159ba455784d3d08e21d7597f66))
* remove subtely introduced additional JS ecrecover call (via deserialization fn) ([9fd9e26](https://github.com/statechannels/statechannels/commit/9fd9e26a9d75abfebe7b1b37f9f1690a5c8c57f5))
* use client-api-schema Participant for public API method ([02ed25e](https://github.com/statechannels/statechannels/commit/02ed25e17586f3c52d4561efd6f28fa1af6646f8))


### Features

* add closeChannels API to server wallet ([c996dbb](https://github.com/statechannels/statechannels/commit/c996dbbcb4beb7a03528f454ce484cae3b655918))
* add register byte code method ([ce6e5b7](https://github.com/statechannels/statechannels/commit/ce6e5b72d4bf1f6791ae906912a3f812db78e4dd))





# [1.6.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.5.1...@statechannels/server-wallet@1.6.0) (2020-11-02)


### Bug Fixes

* add simple check for re-use of previous signed outcome ([96f102d](https://github.com/statechannels/statechannels/commit/96f102dc6bbb3832f6df50fc458b029f2518a74c))
* avoid turn number checking for null app channels ([2c7d9e7](https://github.com/statechannels/statechannels/commit/2c7d9e7c84ca2a0a8931105a03d6d8ce692c4dae))
* change status of unsupported postfund to 'opening' ([31ff797](https://github.com/statechannels/statechannels/commit/31ff79775376044f3fa95f312f40f763b5328267))
* fix broken query on ledger channels in DB ([8e81d4c](https://github.com/statechannels/statechannels/commit/8e81d4ce94f7fc03def09d0a417dee67a0dc1e70))
* pull request review comment changes ([355e967](https://github.com/statechannels/statechannels/commit/355e967d9ae36640fe31e9fa0b4f3c26225d0de5))
* remove forced turn taking requirment on post-fund setup state ([fd87502](https://github.com/statechannels/statechannels/commit/fd87502296d4e159ba455784d3d08e21d7597f66))
* remove subtely introduced additional JS ecrecover call (via deserialization fn) ([9fd9e26](https://github.com/statechannels/statechannels/commit/9fd9e26a9d75abfebe7b1b37f9f1690a5c8c57f5))
* use client-api-schema Participant for public API method ([02ed25e](https://github.com/statechannels/statechannels/commit/02ed25e17586f3c52d4561efd6f28fa1af6646f8))


### Features

* add closeChannels API to server wallet ([c996dbb](https://github.com/statechannels/statechannels/commit/c996dbbcb4beb7a03528f454ce484cae3b655918))





## [1.5.1](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.5.0...@statechannels/server-wallet@1.5.1) (2020-10-30)


### Bug Fixes

* perform same alreadyhavestate check ([c2d24d9](https://github.com/statechannels/statechannels/commit/c2d24d910b7b41ba70466a502be3f4f319a5d6a6))





# [1.5.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.3.0...@statechannels/server-wallet@1.5.0) (2020-10-30)


### Bug Fixes

* add missing tx objects in db queries ([00f9a60](https://github.com/statechannels/statechannels/commit/00f9a604f786061c93491467736d4b2a0c4fea2a))
* allow funding strategy optional param on createLedgerChannel ([2fbb0e8](https://github.com/statechannels/statechannels/commit/2fbb0e8436518b71151bdd40b88a2a21a4392c0c))
* check funding amount is correct in ledger outcome for funded app ([5142f00](https://github.com/statechannels/statechannels/commit/5142f007306c74464759726cd7d6f034affcd0ff))
* disable validTransition check for ledger channels ([c3aba79](https://github.com/statechannels/statechannels/commit/c3aba7948686acb4de973076579b66a91c7d18b5))
* do not evm validate final states ([8e0feb9](https://github.com/statechannels/statechannels/commit/8e0feb9ed97075f9d7dd19bfbec4497f511727c1))
* do nothing for ledger if it is not 'running' yet ([dca98f4](https://github.com/statechannels/statechannels/commit/dca98f473deae56c6d2efc6568f45b391cf66d2c))
* ensure channel is fully finalized before requesting defunding ([c66c485](https://github.com/statechannels/statechannels/commit/c66c48571d508eb039bef8c4d5f9c4ca0edc8e97))
* ensure ledger is funded before continuing with open channel protocol ([f0ec55e](https://github.com/statechannels/statechannels/commit/f0ec55ebd8c29b15d83c8b9efe746e2c6d42cb7a))
* ensure received states are processed in order of channelNonce ([4561e3b](https://github.com/statechannels/statechannels/commit/4561e3b5ee9b6af859be7ab91e0ccb33d04f26fa))
* enter run loop once for joinChannels API call ([a7ce919](https://github.com/statechannels/statechannels/commit/a7ce9198cda85e6781ce441d4678643310eb609a))
* fetchBytecode rejects when bytecode is missing ([fe76cbb](https://github.com/statechannels/statechannels/commit/fe76cbb913f1612824a6b3326e8749ee25fad42b))
* typo ([465e9db](https://github.com/statechannels/statechannels/commit/465e9dbcebe8dd572ff294dc4c61d9f86fe332c8))
* use connext version of pure evm ([754570f](https://github.com/statechannels/statechannels/commit/754570f93686a401066f986f2851bd46ea8725db))


### Features

* add defunding of channel funded via ledger upon close ([4edd44a](https://github.com/statechannels/statechannels/commit/4edd44a5361034b8d310feab536832ebdade9d70))
* add getLedgerChannels API ([c1d7dc7](https://github.com/statechannels/statechannels/commit/c1d7dc783f5befa8d8dd1be726c805893e01e389))
* enhanced getLedgerChannels API with assetHolder and participants query args ([e7030dc](https://github.com/statechannels/statechannels/commit/e7030dc9f494bb4092e5e9315ad34c71785d67dd))





# [1.4.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.3.0...@statechannels/server-wallet@1.4.0) (2020-10-29)


### Bug Fixes

* add missing tx objects in db queries ([00f9a60](https://github.com/statechannels/statechannels/commit/00f9a604f786061c93491467736d4b2a0c4fea2a))
* allow funding strategy optional param on createLedgerChannel ([2fbb0e8](https://github.com/statechannels/statechannels/commit/2fbb0e8436518b71151bdd40b88a2a21a4392c0c))
* check funding amount is correct in ledger outcome for funded app ([5142f00](https://github.com/statechannels/statechannels/commit/5142f007306c74464759726cd7d6f034affcd0ff))
* disable validTransition check for ledger channels ([c3aba79](https://github.com/statechannels/statechannels/commit/c3aba7948686acb4de973076579b66a91c7d18b5))
* do nothing for ledger if it is not 'running' yet ([dca98f4](https://github.com/statechannels/statechannels/commit/dca98f473deae56c6d2efc6568f45b391cf66d2c))
* ensure channel is fully finalized before requesting defunding ([c66c485](https://github.com/statechannels/statechannels/commit/c66c48571d508eb039bef8c4d5f9c4ca0edc8e97))
* ensure ledger is funded before continuing with open channel protocol ([f0ec55e](https://github.com/statechannels/statechannels/commit/f0ec55ebd8c29b15d83c8b9efe746e2c6d42cb7a))
* ensure received states are processed in order of channelNonce ([4561e3b](https://github.com/statechannels/statechannels/commit/4561e3b5ee9b6af859be7ab91e0ccb33d04f26fa))
* enter run loop once for joinChannels API call ([a7ce919](https://github.com/statechannels/statechannels/commit/a7ce9198cda85e6781ce441d4678643310eb609a))
* fetchBytecode rejects when bytecode is missing ([fe76cbb](https://github.com/statechannels/statechannels/commit/fe76cbb913f1612824a6b3326e8749ee25fad42b))
* typo ([465e9db](https://github.com/statechannels/statechannels/commit/465e9dbcebe8dd572ff294dc4c61d9f86fe332c8))
* use connext version of pure evm ([754570f](https://github.com/statechannels/statechannels/commit/754570f93686a401066f986f2851bd46ea8725db))


### Features

* add defunding of channel funded via ledger upon close ([4edd44a](https://github.com/statechannels/statechannels/commit/4edd44a5361034b8d310feab536832ebdade9d70))
* add getLedgerChannels API ([c1d7dc7](https://github.com/statechannels/statechannels/commit/c1d7dc783f5befa8d8dd1be726c805893e01e389))
* enhanced getLedgerChannels API with assetHolder and participants query args ([e7030dc](https://github.com/statechannels/statechannels/commit/e7030dc9f494bb4092e5e9315ad34c71785d67dd))





# [1.3.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.2.1...@statechannels/server-wallet@1.3.0) (2020-10-29)


### Bug Fixes

* Add non-null assertion for app.supported ([e4c78c4](https://github.com/statechannels/statechannels/commit/e4c78c4750f759692fbcfe0accdb72950654f0b5))
* add withdraw as a valid chain requests column value ([a1431d1](https://github.com/statechannels/statechannels/commit/a1431d1535dc0f4737c577b440bd614507f2f0af))
* all participants attempt to submit a conclude and withdraw transacton ([6085fc4](https://github.com/statechannels/statechannels/commit/6085fc4811c5c60e9216e977c5e4a05aa43335f4))
* await chain service api calls that return a transaction response ([0ae8b84](https://github.com/statechannels/statechannels/commit/0ae8b84cf538b6c461bdf2788f12b754a9f682b2))
* capture expected errors on concludeAndWithdraw ([7d5bebc](https://github.com/statechannels/statechannels/commit/7d5bebc5b90d52bcd430eb754813f9afeb5fe8e2))
* chain service constraint down migration fully reverses up migration ([1d8e6f7](https://github.com/statechannels/statechannels/commit/1d8e6f7b81c5a1b5bc76bd0fb325e91605c41cf4))
* do not modify chain service migration ([d07c5ab](https://github.com/statechannels/statechannels/commit/d07c5ab608221aef04b123148b6f08dca8a23473))
* during runloop, do not wait for chain service network requests ([3c470ab](https://github.com/statechannels/statechannels/commit/3c470ab58e89c7c5f14d36c6bed880c91da541cc))
* eliminate infinite loop in the close channels protocol ([a0fdff0](https://github.com/statechannels/statechannels/commit/a0fdff008ca59ea91b8c73ea0a0d0353a73ade7e))
* ensure prefund setup is signed if turnNum < participants.length ([7b19ae3](https://github.com/statechannels/statechannels/commit/7b19ae3ae4f898cca34c2b8cdd0fb08cdfa54aca))
* Fix  https://github.com/statechannels/statechannels/issues/2748 ([79261cd](https://github.com/statechannels/statechannels/commit/79261cd148da26591d71ebb0861484663b4025c7))
* only the first participant submits the withdraw transaction ([f4b487d](https://github.com/statechannels/statechannels/commit/f4b487ddcb0a804ed39c483c6e7e14411a4c5133))
* only validate new states ([aca257b](https://github.com/statechannels/statechannels/commit/aca257b25cbed261efa3ca309ce9bdb2ed3a9a15))
* remove unused import ([4863611](https://github.com/statechannels/statechannels/commit/48636117383dcd3de3a23c50c99ecbddd57752ed))


### Features

* wallet requests the chain service to withdraw once final conclude state is signed ([53b387d](https://github.com/statechannels/statechannels/commit/53b387dbc76b1bbf4439c96531c5a93c17c99b17))





## [1.2.1](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.2.0...@statechannels/server-wallet@1.2.1) (2020-10-24)


### Bug Fixes

* completeOpenChannel uses turn number ([d573e5a](https://github.com/statechannels/statechannels/commit/d573e5abfcce077e4ae81a0b85eac485e00e2e09))
* type error ([2e12698](https://github.com/statechannels/statechannels/commit/2e12698ea7c2cf645e55853593b296f7155a2699))





# [1.2.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.1.0...@statechannels/server-wallet@1.2.0) (2020-10-23)


### Bug Fixes

* call evm validation with correct states ([1638834](https://github.com/statechannels/statechannels/commit/16388343273bfaf9a4fd992e023ad0bddce0b14a))
* clean up garbled text ([32734a7](https://github.com/statechannels/statechannels/commit/32734a79920aa805926d94d397e63bdbb46d24af))
* db-admin truncates all tables by default ([aee8e1e](https://github.com/statechannels/statechannels/commit/aee8e1e5d9b98827b5cc6cae6d4122c8811482d3))
* log correctly ([16ccc8b](https://github.com/statechannels/statechannels/commit/16ccc8b2fd18a8ad16f7dcf3de6b935ce5b78308))
* log error on invalid state transition of received state instead of throwing ([e69aaee](https://github.com/statechannels/statechannels/commit/e69aaeedf843f45b265639780bbd231f4b724592))
* only use evm for non funding states ([4c33fa0](https://github.com/statechannels/statechannels/commit/4c33fa00e93299da7f9533f0382c2d45eecc5fb8))
* only validate transition when not same state ([4487d3f](https://github.com/statechannels/statechannels/commit/4487d3f20f77a3a908d0f0668831e5e25f5bbb4c))
* pr feedback ([0662633](https://github.com/statechannels/statechannels/commit/0662633c553aed4bb83ea52d73242ac7f0450b0f))
* throw error when invalid not valid ([e055a30](https://github.com/statechannels/statechannels/commit/e055a307808dd367579176c861b27363c43171dc))
* use isequal for comparison ([388ae94](https://github.com/statechannels/statechannels/commit/388ae941f314874222a4be43e46de3c688fdcf69))


### Features

* validate force move rules in typescript ([b463eb7](https://github.com/statechannels/statechannels/commit/b463eb7ceb6b251900ab500d0c378d236ed0a8bb))





# [1.1.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@1.0.0...@statechannels/server-wallet@1.1.0) (2020-10-22)


### Bug Fixes

* add missing CloseChannel objective outbound from wallet ([be8bb9a](https://github.com/statechannels/statechannels/commit/be8bb9acf5bcd2fbb7c4be8cb9ffb277ceda397f))
* add missing property ([08a6ff0](https://github.com/statechannels/statechannels/commit/08a6ff0937df773a04547fddd8a6d03b0aefbb75))
* add Objectives table to truncate() ([b77e04c](https://github.com/statechannels/statechannels/commit/b77e04c5a0ef6ad3d27db10fe4d1e909770a9ec1))
* assertion on turn number ([60b3b0a](https://github.com/statechannels/statechannels/commit/60b3b0a0e831055f6ca6f69dfaa9a0f2f6dc7de9))
* bandaid solution to push maximum nonce upwards on receipt of a new channel ([c3ee0ee](https://github.com/statechannels/statechannels/commit/c3ee0ee0deb1fe8868410d019912b30aa576de00))
* check objective type before approving ([236448e](https://github.com/statechannels/statechannels/commit/236448e7bc40ed515cbf1328e0f53c00f9898fbf))
* commit objective and associations in a db trx ([f1c05a2](https://github.com/statechannels/statechannels/commit/f1c05a2d4556d62034394c5af1d1bf379253c0f2))
* don't run the run loop for pending objectives ([dfde5b5](https://github.com/statechannels/statechannels/commit/dfde5b5c8a6e32f6b12f286a373e288490c73140))
* ensure Nonce gets bumped on reception of new signed states ([9d5bf6a](https://github.com/statechannels/statechannels/commit/9d5bf6ab457544a8b44b21f8df2845865a4c8dfa))
* ensure received states are processed in order of channelNonce ([171284b](https://github.com/statechannels/statechannels/commit/171284b4893859512f9c7cf7ea9ee640feaca136))
* enter run loop once for joinChannels API call ([dba768f](https://github.com/statechannels/statechannels/commit/dba768f1606d0963d0d66b247155271df82f6d15))
* extract first objective from array ([b5b4e8e](https://github.com/statechannels/statechannels/commit/b5b4e8e66945e3c276a63d965d5cf5b336e0d1e0))
* fix relation mappings to get e2e test to pass ([b364ec7](https://github.com/statechannels/statechannels/commit/b364ec792d973c26db73530ea22e6ab6a98f7efc))
* improved inference of referenced channels ([9a453b8](https://github.com/statechannels/statechannels/commit/9a453b8c263c210ce3801337f02cdb7ff2b8637f))
* join all channels ([fbb4e29](https://github.com/statechannels/statechannels/commit/fbb4e29e154ae167ddf0faef953d2766b0adae2d))
* prevent require loop ([e1ad490](https://github.com/statechannels/statechannels/commit/e1ad490aba699a0eff8003c67bd8382c340958f4))
* sign prefund setup regardless of previously signed states ([55d2aee](https://github.com/statechannels/statechannels/commit/55d2aeedac85faf7fd7bed77db845bd1bc210291))
* typo ([39d1805](https://github.com/statechannels/statechannels/commit/39d1805325113731489bc9e6467bc20cddde0275))
* typo ([2848deb](https://github.com/statechannels/statechannels/commit/2848deb0f070ac83a6e77a423d92aeb3ecff23c7))
* typos ([cc1443a](https://github.com/statechannels/statechannels/commit/cc1443a48ba2f4d19211e9395098760d096b9ac8))
* typos ([7e6a749](https://github.com/statechannels/statechannels/commit/7e6a749211a0fef0a2c0240f15e79fd832f2726e))
* use defaultTestConfig in test ([0296b50](https://github.com/statechannels/statechannels/commit/0296b5052df38abd8fe571e6a7c3e7fcbb469ada))
* use placeholder in fundingStrategy (for now) ([f7556fd](https://github.com/statechannels/statechannels/commit/f7556fd1fa0bac20cf872796c132ec8d83b30cfd))
* use symbol import instead of path ([12a4774](https://github.com/statechannels/statechannels/commit/12a4774cd7acdfc13b552b392cea26355b9baae9))
* use two queries ([2fa6617](https://github.com/statechannels/statechannels/commit/2fa6617182e1f624874c0993a5a63924fbc500a7))


### Features

* add stored objectives and approveObjective API method ([37ed94c](https://github.com/statechannels/statechannels/commit/37ed94c85ce984fdf583eef92e1250625c591565))
* some objective columns are foreign keys ([c8af6ef](https://github.com/statechannels/statechannels/commit/c8af6ef45578560c7077fe6225c9afc3b377d82e))


### Reverts

* Revert "refactor: add participants column" ([b456aee](https://github.com/statechannels/statechannels/commit/b456aeeedea10cc70a3212b639cbd7109948fa82))





# [1.0.0](https://github.com/statechannels/statechannels/compare/@statechannels/server-wallet@0.4.0...@statechannels/server-wallet@1.0.0) (2020-10-20)


### Bug Fixes

* add knex configuration to migrateDB ([4af7ade](https://github.com/statechannels/statechannels/commit/4af7ade2591a502db0d35a392485f817f20ed87f))
* add skipEvm check ([f86e365](https://github.com/statechannels/statechannels/commit/f86e3659df613a1afea9b180c08dc0521269a8ae))
* add support for 'Unfunded' funding strategy ([528e776](https://github.com/statechannels/statechannels/commit/528e77600ec54496f214f47406bdd6c22be4f82e))
* bind registerAppDefintion ([348f321](https://github.com/statechannels/statechannels/commit/348f321cb33402bfc4a8478b323d1f43aa5a4338))
* fix function name change ([69600bc](https://github.com/statechannels/statechannels/commit/69600bc0574c77cf78e4512eddb8a012beb69dd7))
* get test passing ([cbf70f5](https://github.com/statechannels/statechannels/commit/cbf70f5b23dd5aebd41ad75b560b49f52c808996))
* remove redundant destroy ([d7b0249](https://github.com/statechannels/statechannels/commit/d7b024957f3c72502f8d9e01dd1fdbe50da71f29))
* remove unnecessary import of built javascript code ([0a42993](https://github.com/statechannels/statechannels/commit/0a42993dfb736b5e6f0a4d7a0f703d740f4d549c))
* switch e2e to use test config ([02c0f28](https://github.com/statechannels/statechannels/commit/02c0f28b7cea392cda34f4995b5ad354d51146d2))
* switch insert to upsert ([8f4db93](https://github.com/statechannels/statechannels/commit/8f4db931395a5a8d6c899b431d61c8866b793787))
* update test to check for false ([8f28d32](https://github.com/statechannels/statechannels/commit/8f28d32f9aed6b1f940d6f3a9ea03cfb17c3ac32))
* update test to use default test config ([b592c01](https://github.com/statechannels/statechannels/commit/b592c01d01f9a9c0422474f6b9dcf1e1a034ea8b))
* use default test config in start.ts ([9034f49](https://github.com/statechannels/statechannels/commit/9034f49382b1d4d243f6f55d9a6f3af767577c71))


### Code Refactoring

* remove db-admin-connection.ts ([a4074a9](https://github.com/statechannels/statechannels/commit/a4074a984822ece0f8c6bca5184786a895888c07))


### Features

* Add Register App Definition ([18c34e0](https://github.com/statechannels/statechannels/commit/18c34e0a73a278226bca5e4b2ee371b9baea5a1f))
* fail validation if no bytecode ([eb14b13](https://github.com/statechannels/statechannels/commit/eb14b13fc4dbb0caa41049977d166c5c62ff04f7))
* increasing turn number for postfund setup ([9225c61](https://github.com/statechannels/statechannels/commit/9225c617ca83d99047a0f3d2ac8f77ec9f6a57dc)), closes [/www.notion.so/Server-wallet-application-Bob-Alice-communication-c0127c3196694e14bd0cf4858955fa96#032978ba91394e87a9774c94fb1222a0](https://github.com//www.notion.so/Server-wallet-application-Bob-Alice-communication-c0127c3196694e14bd0cf4858955fa96/issues/032978ba91394e87a9774c94fb1222a0)
* prefund setup for b is now turn 1 ([660cce1](https://github.com/statechannels/statechannels/commit/660cce17d7794a913775dc3052d7ff868debb0ef))
* unregisterChannel chain service api ([0b9b38d](https://github.com/statechannels/statechannels/commit/0b9b38d38e267610b7294419c549b8809068deb3))


### BREAKING CHANGES

* - Replicate node_env check in DBAdmin.truncateDB()
- Use this ^ fn instead of truncate()
- No longer use a separate "adminKnex"





# 0.4.0 (2020-10-13)


### Bug Fixes

* decrement nonce on sendTransaction failure ([8ea443a](https://github.com/statechannels/statechannels/commit/8ea443a98caace69958bc48583b5be0ec2893fe0))
* Pin and normalize jest and ts-jest dependencies ([e9ca399](https://github.com/statechannels/statechannels/commit/e9ca3997119645fdb9f558a921361171c20d66a0))


### Features

* add AssetTransferred event to chain service ([530f31c](https://github.com/statechannels/statechannels/commit/530f31c473f48c6d00b26798e0f51005e86d2b66))
* add chain service concludeAndWithdraw ([ab5b543](https://github.com/statechannels/statechannels/commit/ab5b5433d5ff01addc50e1b3f22bbc0934b4db47))
* add create/drop/truncate db to the DBAdmin ([7ff5b85](https://github.com/statechannels/statechannels/commit/7ff5b85b878e5d179998454cecc7f9d6939e5edb))
* add dbAdmin class to Wallet ([a347c68](https://github.com/statechannels/statechannels/commit/a347c68262315269eb98eb19c3889c7a35f593c8))
* chain service fundChannel optionally calls increaseAllowance ([14b3eb6](https://github.com/statechannels/statechannels/commit/14b3eb64c848e30851e2402221b544fc042a14fd)), closes [/github.com/statechannels/statechannels/pull/2645#discussion_r499715014](https://github.com//github.com/statechannels/statechannels/pull/2645/issues/discussion_r499715014)
* send a single transaction at a time. ([a0e788d](https://github.com/statechannels/statechannels/commit/a0e788de18882a394b908c67296ae05f9f0e06c4))



## 0.3.10 (2020-10-05)


### Bug Fixes

* progress toward launching chain service tests through vs code ([5afb544](https://github.com/statechannels/statechannels/commit/5afb544a01fd579dde4aa2cbfb8851d2d57c54bf))


### Features

* add erc20 funding to the chain service ([1cadcdf](https://github.com/statechannels/statechannels/commit/1cadcdfe0aeb992efd0afa75f5a6cc4ef3bf9cc0))



## 0.3.10-alpha.1 (2020-10-02)



## 0.3.10-alpha.0 (2020-10-02)


### Bug Fixes

* add channel id filtering to registerChannel ([4a47cbc](https://github.com/statechannels/statechannels/commit/4a47cbc9d976d394a952da4af555e3ba0175e6c9))
* contract listener receives an array of arguments, not an object ([4a0346e](https://github.com/statechannels/statechannels/commit/4a0346e891c893912994a2cfb3aedea15639a186))
* filter on channelId after adding the observable to addressToObservable ([d128ab1](https://github.com/statechannels/statechannels/commit/d128ab1fa5625665ea056b2bba3e69dee3c84d2f))
* properly fire the initial holdings value ([77b4eb3](https://github.com/statechannels/statechannels/commit/77b4eb374a1dd8fac836ff09fd07d9d46787edb0))


### Features

* add chain-service destructor ([c9b323b](https://github.com/statechannels/statechannels/commit/c9b323ba6575a586b6dd0b1035b39c6ca636b413))
* add ChainObserver registerChannel ([2c844da](https://github.com/statechannels/statechannels/commit/2c844da919319d63d4b5d2bde78e216d381743c9))
* add ChainService ([83e02dd](https://github.com/statechannels/statechannels/commit/83e02dd72c30e778dbdeae2b5f5384c306914c5c))
* send initial funding value to observers ([404167d](https://github.com/statechannels/statechannels/commit/404167dabbf81aa70fbd01be44b4a07241533246))
* **server-wallet:** respond to setFunding call from ChainService ([cc2c684](https://github.com/statechannels/statechannels/commit/cc2c68436d4008a87e8c1ecb959cd41b79ba670d))
* **server-wallet:** wire up wallet for funding events ([a8ed826](https://github.com/statechannels/statechannels/commit/a8ed8262b805cd4ec31e2f31c323fd101b4ad59a))



## 0.3.9 (2020-09-30)


### Performance Improvements

* modest getChannel speed up ([12bff99](https://github.com/statechannels/statechannels/commit/12bff99f7238001b4cda3bb3d8200932d99bc604))



## 0.3.9-alpha.0 (2020-09-30)


### Bug Fixes

* Replace build command with prepare command ([401087d](https://github.com/statechannels/statechannels/commit/401087db33113b401520b1c6368665c8f2ccbf27))


### Features

* Add default value to chainServiceRequests to allow migrations with existing rows ([34f8264](https://github.com/statechannels/statechannels/commit/34f82649056d88c505911277b93accc995057134))



## 0.3.8-alpha.0 (2020-09-24)


### Bug Fixes

* **server-wallet:** Insist on Store construction with Knex provided ([112011b](https://github.com/statechannels/statechannels/commit/112011bdf717c92aa8bfde4f3f8634e46fc34976))
* **server-wallet:** Rename closeDatabaseConnection to destroy ([702ab67](https://github.com/statechannels/statechannels/commit/702ab67140e9afeeda188b048858232694f6e35e))
* **server-wallet:** Restore knex as mutable property of Wallet ([e375c0c](https://github.com/statechannels/statechannels/commit/e375c0c278c2c9d75773fb596b1c70f123993156))
* **server-wallet:** Restrict outbox object type to MessageQueuedNotification ([2417953](https://github.com/statechannels/statechannels/commit/24179539643e00a277d65fd674dc5f68337afa94))


### Features

* Remove CreateChannel objective ([d87d3b6](https://github.com/statechannels/statechannels/commit/d87d3b68e9a84945b105c7883aaf130176264a42))
* Send OpenChannel objective instead of CreateChannel objective ([1f198b8](https://github.com/statechannels/statechannels/commit/1f198b857e4a1463c890f5d40041d7e0d6bf1dbc))
* stores addSignedState creates channel if one does not exist ([7389704](https://github.com/statechannels/statechannels/commit/73897047e8b03ecdff96a3a5857602c6df01481e))



## 0.3.7 (2020-09-23)


### Bug Fixes

* **server-wallet:** Destroy Knex connection in Jest tests ([af48635](https://github.com/statechannels/statechannels/commit/af486352e0933e68a393cc262986d2443f0d68d8))
* **server-wallet:** Don't re-export from client-api-schema ([2081704](https://github.com/statechannels/statechannels/commit/208170486df69eef87dc8348cb8c9bd77cc528ee))
* **server-wallet:** Use more correct up-to-date types for server wallet ([3cf3377](https://github.com/statechannels/statechannels/commit/3cf337790265a7abb9273d9e8d9b2a95bc3afe79))
* add CreateChannel objective everywhere objectives are defined ([17f5518](https://github.com/statechannels/statechannels/commit/17f5518c1d396d3d552573794422b7e6ce5c7097))
* Remove Unfunded from FundingStrategy in wire-format and client-api-schema ([1dceeff](https://github.com/statechannels/statechannels/commit/1dceeff362ea3b371c9b2bac8167acecb8b52949))
* sort out problems with serializing/deserializing CreateChannel objective ([2147a41](https://github.com/statechannels/statechannels/commit/2147a41e5a8190d185a300722d3b61203793f26b))
* switch to unknown in wallet interface too ([e02d05f](https://github.com/statechannels/statechannels/commit/e02d05fb1daac1aa0c6169dfdec3413bcf5f767f))
* **server-wallet:** remove copy/pasted comment ([5930670](https://github.com/statechannels/statechannels/commit/59306706f3e003173f10841130c13b8c4ee074be))


### Features

* **server-wallet:** add chain service requests to database ([0586a3b](https://github.com/statechannels/statechannels/commit/0586a3bc20968485f9aeef335feb07fc04ead992))
* **server-wallet:** Add closeDatabaseConnections method to Store ([4c3b51d](https://github.com/statechannels/statechannels/commit/4c3b51dcdda3de398be556daf9bca66f3667e414))
* **server-wallet:** add CreateChannel objective ([cacd9b7](https://github.com/statechannels/statechannels/commit/cacd9b7cf55c958168e3d521ad40b80e475f2705))
* **server-wallet:** Add funding strategy ([01ac241](https://github.com/statechannels/statechannels/commit/01ac241ceac7701fa525d0322496969463728ad4))
* **server-wallet:** add fundingStrategy as a required column of the Channel model ([281e9e5](https://github.com/statechannels/statechannels/commit/281e9e5341e035744afc636c0aca8bc03fe16a3b))
* **server-wallet:** chainServiceRequests column is not nullable ([96d2ada](https://github.com/statechannels/statechannels/commit/96d2ada7bcbbb10edc35f3517064eb381774df9e))
* **server-wallet:** default to Unknown funding strategy in channels table ([2938053](https://github.com/statechannels/statechannels/commit/29380531f20c385583bd2fa86bf2122bb968ec38))
* **server-wallet:** migrate from submit transaction to fundChannel ([361ed42](https://github.com/statechannels/statechannels/commit/361ed42381c101db3918e289de53df7d84e184df))
* **server-wallet:** validate chain_service_requests database constraint ([8e91764](https://github.com/statechannels/statechannels/commit/8e917646eed3d2bdda05b0011058c0b682228803)), closes [/github.com/statechannels/statechannels/pull/2561#discussion_r491507854](https://github.com//github.com/statechannels/statechannels/pull/2561/issues/discussion_r491507854)
* server-wallet uses (and validates) correct wire-format ([1039c3f](https://github.com/statechannels/statechannels/commit/1039c3f1493237ca085a531da1c6a8d84802b6bd))
* **server-wallet:** record chain service funding request in the database ([ad6c734](https://github.com/statechannels/statechannels/commit/ad6c7345ff818eef5e362408fd8b1711a43b323e))
* **server-wallet:** send CreateChannel objective on channel creation ([e1b5f77](https://github.com/statechannels/statechannels/commit/e1b5f7726058c83b060ef71c7f7aa755f277feae))
* **server-wallet:** Trigger direct funding in application protocol ([c8b7046](https://github.com/statechannels/statechannels/commit/c8b704624e45c986e2c82e2971feda4ab93b499f))



## 0.3.6 (2020-09-09)



## 0.3.5 (2020-09-04)



## 0.3.4 (2020-08-25)



# 0.3.0 (2020-08-18)



# 0.2.0 (2020-08-05)
