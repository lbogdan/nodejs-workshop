## Agenda

- 10-18, 10m breaks every 1h30m, 1h lunch break
- instructor and participants introductions
- day 1: general recap, modules, core modules, packages
- day 2: APIs, Express, database packages, testing

## Introductions

- main role
- experience with JavaScript
- experience with Node.js
- experience with APIs
- expectations

## What Is Node.js?

- asynchronous, event-driven runtime to run JavaScript on the server-side
- uses Google's [V8](https://v8.dev/) JavaScript engine and [libuv](https://github.com/libuv/libuv) asynchronous I/O library
- cross-platform
- single threaded, with core modules for parallel processing
- [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

## Installation

- [download](https://nodejs.org/en/download/releases/) and install a specific version
- use [Node Version Manager](https://github.com/nvm-sh/nvm)

## Hello World!

```js
// index.js
console.log('hello, world!');
```

- REPL (read-eval-print-loop)

## Globals

- console
- __filename
- __dirname
- process
- Buffer
- setImmediate(), setInterval(), setTimeout(), clear*()
- [documentation](https://nodejs.org/docs/latest-v14.x/api/globals.html)

## Node.js TypeScript Types

```sh
# create a package.json
npm init -y
# install @types/node package
npm install @types/node
```

## process

- process.version - Node.js version
- process.env - environment variables
- process.exit() - exit code
- process.on() - events and signals

## Buffer

- fixed-length sequence of bytes, extends [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- used by node APIs to pass (binary) data
- [documentation](https://nodejs.org/docs/latest-v14.x/api/buffer.html)

## Modules

- every `.js` file is a module
- all declarations are local to the module
- you can export things from a module using `module.exports`
- you can import things from a module using `require('module_name')`
- when required, modules are [cached](https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_caching)

## Modules - cont.

```js
// config.js
const config = {
  port: 8080,
}

module.exports = {
  get() {
    return config;
  }
}
```

```js
// index.js
const config = require('./config');
// const { get: getConfig } = require('./config');

const port = config.get().port;
```

## Module Resolution

- `require('fs')` - core module
- `require('./config.js')` - `config.js` in the same folder
- `require('./config')` - tries `config.js`, `config.json`, `config/index.js` in the same folder
- `require('axios')` - `axios` module from `node_modules`
- https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_all_together

## Core Modules

- list: `require('module').builtinModules`
- source: https://github.com/nodejs/node/tree/master/lib

## fs Module - Synchronous Methods

- block until the file operation is done

```js
// index.js
const fs = require('fs');

// returns a Buffer
const data = fs.readFileSync('test.txt');
// returns a string
const data = fs.readFileSync('test.txt', { encoding: 'utf8' });
```

- [documentation](https://nodejs.org/docs/latest-v14.x/api/fs.html)

## Exercise 1

Reimplement the `md5sum` command in node. Use the `fs` module to synchronously read files and the [`crypto.Hash` class](https://nodejs.org/docs/latest-v14.x/api/crypto.html#crypto_class_hash) to compute the MD5 hash.
See "Example: Using the hash.update() and hash.digest() methods" section. Pay attention to error handling and exit codes. Make it support a single file, for now.

## Callback Pattern

```js
function asyncFunc(arg1, arg2, cb) {
  // do stuff
  // success
  cb(null, returnValue);
  // error
  cb(new Error('system error'));
}

// use
asyncStuff(1, 2, (err, value) => {
  if (err) {
    console.error('error:', err.message);
  } else {
    console.log('value:', value);
  }
});
```

## fs Module - Asynchronous Methods

```js
// index.js
const fs = require('fs');

fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('error reading file:', err.message);
  } else {
    console.log('file contents:', data);
  }
});
```

## Exercise 2

Same as exercise 1, but use the asynchronous callback `readFile()` method. Also add support for multiple files.

## Promises, util.promisify, async / await

```js
// index.js
const fs = require('fs');
const util = require('util');

// returns a function returning a Promise
const readFilePromise = util.promisify(fs.readFile);

const data = await readFilePromise('data.txt', 'utf8');
```

## Exercise 3

Same as exercise 2, but use [`util.promisify()`](https://nodejs.org/docs/latest-v14.x/api/util.html#util_util_promisify_original) to transform the callback method `readFile()` into returning a Promise. Use `async` / `await`, and an IIFE to work around the non-supported top-level `await`. Bonus points for reading the files in parallel.

Bonus hint: [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).


## fs Module - Promise Methods

```js
// index.js
const fs = require('fs').promises;

const data = await readFilePromise('data.txt', 'utf8');
```

- [documentation](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_promises_api)

## Exercise 4

Same as exercise 3, but use [`fs.promises`](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_promises_api).

## npm & Community Package Registry

- [`package.json`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- `dependencies` vs. `devDependencies`
- npm install
- lock file - `package-lock.json`
- package versions, [semver](https://semver.org/)
- version ranges - `~`, `^`
- scoped packages, version tags: `latest`, `next`
- [npmjs.com](https://www.npmjs.com/), [yarnpkg.com](https://yarnpkg.com/), [unpkg.com](https://unpkg.com/)

## Exercise 4.5

Create a `package.json` in an empty folder, install one of `axios` or `node-fetch` packages, and use it to get your public IP address using https://api.ipify.org/ .

## event Module

- implements the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern

```js
// index.js
const EventEmitter = require('event');

const eventBus = new EventEmitter();

eventBus.on('user:created', (user) => {
  console.log('user created:', user);
});

eventBus.emit('event', { firstName: 'John', lastName: 'Doe' });
```

- [documentation](https://nodejs.org/docs/latest-v14.x/api/events.html)

## Exercise 5

Write an [`EventEmitter`](https://nodejs.org/docs/latest-v14.x/api/events.html#events_class_eventemitter) publisher that emits random events at random time intervals between 1 and 10 seconds, having a random value between 1 and 100 as payload, and a few subscribers that listen for those events.

## Streams

- asynchronous, sequential, composable data handling
- types:
  - Writable: streams to which data can be written - `fs.createWriteStream()`
  - Readable: streams from which data can be read - `fs.createReadStream()`
  - Duplex: streams that are both Readable and Writable - `net.Socket`
  - Transform: Duplex streams that can modify or transform the data as it is written and read - `zlib.createDeflate()`
- [documentation](https://nodejs.org/docs/latest-v14.x/api/stream.html)
- article: [Understanding Streams in Node.js](https://nodesource.com/blog/understanding-streams-in-nodejs/)

## Streams - example

```js
// index.js
const zlib = require('zlib');
const fs = require('fs');

const gzip = zlib.createGzip();
const source = fs.createReadStream('input.txt');
const destination = fs.createWriteStream('input.txt.gz');

source.pipe(gzip).pipe(destination);

destination.on('end', () => console.log('done'));
```

## Exercise 6

Refactor exercise 4 to use streams. Make it also support reading from `stdin` when ran with no files.

## Exercise 7

Process a large text file line by line, using either the [core `readline` module](https://nodejs.org/docs/latest-v14.x/api/readline.html) or a line transform stream module.

## Exercise 7.5

Source code exploration: What does the `options` argument in https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_createreadstream_path_options mean when it is a string?

## child_process Module

- spawn subprocesses

```js
// index.js
const { exec } = require('child_process');

exec('ls -al /', (err, stdout) => {
  if (err) {
    console.error('error:', err.message);
  } else {
    // returns Buffer, use options.encoding for string
    console.log('command output:', stdout);
  }
});
```

- [documentation](https://nodejs.org/docs/latest-v14.x/api/child_process.html)

## Exercise 8

Write an async function that returns if an IP address is reachable or not by using the `ping` command.

## HTTP, http Module

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_flow

```js
// index.js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end('{"status":"ok"}');
});

server.listen(8000, '0.0.0.0', () => {
  console.log('listening on http://localhost:8000/ ...');
});
```

## Exercise 9

Write a simple http server that serves files from a folder. Use `fs.stat()` to check if the file exists and set the `Content-Length` header, and a MIME package to properly set the `Content-Type` response header.

## worker_threads Module

- offload CPU intensive computation to threads
- [documentation](https://nodejs.org/docs/latest-v14.x/api/worker_threads.html#worker_threads_worker_threads), see example

## Exercise 10

Write an async function that calculates the n-th decimal of PI. Use the [`pi-generator` package](https://www.npmjs.com/package/pi-decimals) and the `worker_threads` core module to offload the processing to a separate thread. Check what happens when calling it multiple times in parallel.

## Exercise 11

Using the function from exercise 10, write a simple http server that returns the n-th decimal of PI on the `/api/pi/:n` endpoint. Compare how it works vs. a synchronous function, in case of parallel requests.
