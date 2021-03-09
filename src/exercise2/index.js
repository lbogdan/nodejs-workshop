// Same as exercise 1, but use the asynchronous `readFile()` method.
// Also add support for multiple files.
const fs = require('fs');
const crypto = require('crypto');

function md5Hash(filename, cb) {
  const hash = crypto.createHash('md5');
  fs.readFile(filename, (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, hash.update(data).digest('hex'));
  });
}

function processFiles(files, cb) {
  const localFiles = [...files]; // .splice();
  let error = null;
  function processNext(files) {
    if (files.length === 0) {
      cb(error);
      return;
    }

    const filename = files.shift();
    // console.log('processing', filename);
    md5Hash(filename, (err, hash) => {
      if (err) {
        console.error(`node index.js: ${filename}: ${err.message}`);
        error = true;
        // console.error('error stacktrace:', err.stack);
      } else {
        console.log(`${hash}  ${filename}`);
      }
      processNext(files);
    });
  }
  processNext(localFiles);
}

if (process.argv.length < 3) {
  console.error('Error: Invalid number of arguments');
  console.log('Usage: node index.js FILE ...');
  process.exit(1);
}

const files = process.argv.slice(2);

processFiles(files, (err) => {
  // console.log('done.');
  console.log(files);
  if (err) {
    process.exit(1);
  }
});

// const filename = process.argv[2];

// console.log('running folder:', process.cwd());

// md5Hash(filename, (err, hash) => {
//   if (err) {
//     console.error(`node index.js: ${filename}: ${err.message}`);
//     // console.error('error stacktrace:', err.stack);
//     process.exit(1);
//   } else {
//     console.log(`${hash}  ${filename}`);
//   }
// });

// try {
//   const hash = md5Hash(filename);
//   console.log(`${hash}  ${filename}`);
// } catch (err) {
//   console.error(`node index.js: ${filename}: ${err.message}`);
//   // console.error('error stacktrace:', err.stack);
//   process.exit(1);
// }
