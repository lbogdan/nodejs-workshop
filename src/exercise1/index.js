// Reimplement the `md5sum` command in node.
// Use the `fs` module to synchronously read files and
// the `crypto.Hash` class to compute the MD5 hash.
// See "Example: Using the hash.update() and hash.digest()
// methods" section.
// Pay attention to error handling and exit codes
// Make it support a single file, for now.
const fs = require('fs');
const crypto = require('crypto');

function md5Hash(filename) {
  const hash = crypto.createHash('md5');
  const data = fs.readFileSync(filename);
  return hash.update(data).digest('hex');
}

if (process.argv.length !== 3) {
  console.error('Error: Invalid number of arguments');
  console.log('Usage: node index.js FILE');
  process.exit(1);
}

const filename = process.argv[2];

// console.log('running folder:', process.cwd());

try {
  const hash = md5Hash(filename);
  console.log(`${hash}  ${filename}`);
} catch (err) {
  console.error(`node index.js: ${filename}: ${err.message}`);
  // console.error('error stacktrace:', err.stack);
  process.exit(1);
}
