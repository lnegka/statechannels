const path = require('path');
const fs = require('fs');

const TS_WORKER_PATH = path.resolve(__dirname, './worker.ts');
const JS_WORKER_PATH = path.resolve(__dirname, './worker.js');
const JS_BUILD_WORKER_PATH = path.resolve(
  __dirname,
  '../../../lib/src/utilities/workers/worker.js'
);
console.log('sanity');
if (fs.existsSync(JS_WORKER_PATH)) {
  console.log('js worker');
  require(JS_WORKER_PATH);
} else if (fs.existsSync(JS_BUILD_WORKER_PATH)) {
  console.log('buildt js worker');
  require(JS_BUILD_WORKER_PATH);
} else if (fs.existsSync(TS_WORKER_PATH)) {
  console.warn('Using ts-node to load the script');
  require('ts-node').register({typeCheck: false});
  require(TS_WORKER_PATH);
} else {
  throw new Error('Could not find worker.ts or worker.js');
}
