import {expose} from 'threads/worker';

import {fastSignData} from '../signatures';

expose(async function sign(stateHash: string, privateKey: string) {
  return fastSignData(stateHash, privateKey);
});
