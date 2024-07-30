const fs = require('fs');
const path = require('path');

const BGred = '\x1b[41m';
const reset = '\x1b[0m';
const green = '\x1b[32m';
const magenta = '\x1b[35m';

const Example = '1. [FIX]: Some text';
const Example1 = '2. [FEAT]: Some text';
const Example2 = '3. [REFACTOR]: Some text';

function main() {
  const rootDir = process.cwd();
  const commitFilePath = path.join(rootDir, '.git', 'COMMIT_EDITMSG');
  const commitMessage = fs.readFileSync(commitFilePath, 'utf8')

  const regExp = /^\[(FIX|FEAT|REFACTOR)\]:?\s*/;

  const valid = regExp.test(commitMessage);

  if (!valid) {
    console.log(
      BGred,
      'Коммит отменен: Начало коммита не соответствует требованиям!',
      reset
    );
    console.log(
      green,
      '\n Example: \n',
      Example,
      '\n',
      Example1,
      '\n',
      Example2,
      reset
    );
    process.exitCode = 1;
  } else {
    console.log(magenta, 'Your commit message is valid. 🚀🚀🚀 ', reset);
  }
}

main();
