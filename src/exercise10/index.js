// Write an async function that calculates the n-th decimal of PI.
// Use the pi-generator package and the worker_threads core module
// to offload the processing to a separate thread.
// Check what happens when calling it multiple times in parallel.
const pi = require('pi-generator');

function syncPINthDigit(n) {
  let env;

  for (let i = 0; i < n + 1; i++) {
    const digitEnv = pi.nextDigit(env);
    if (i === n) {
      return digitEnv[0];
    }
    env = digitEnv[1];
  }
}
