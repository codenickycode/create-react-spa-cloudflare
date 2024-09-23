#!/usr/bin/env node

/* eslint-env node, commonjs */

// modified from:
// https://www.youtube.com/watch?v=UxdSoefSxrA&t=1s&ab_channel=bonsaiilabs
// thx bonsaiilabs!

import { spawnSync } from 'child_process';

const runCommand = (command) => {
  console.log(`Executing command: ${command}`);
  const [cmd, ...args] = command.split(' ');
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: true,
  });

  if (result.status === 0) {
    console.log(`Command executed successfully: ${command}`);
    return true;
  } else {
    console.error(`Command failed with exit code ${result.status}: ${command}`);
    if (result.error) {
      console.error('Error details:', result.error);
    }
    return false;
  }
};

const repoName = process.argv[2];
if (!repoName) {
  console.error('');
  console.error('');
  console.error('You must supply a name for your repo');
  console.error('eg: pnpm create create-react-spa-cloudflare my-repo-name');
  process.exit(1);
}

console.log('');
console.log('');
console.log(`⚙️ Creating dir ${repoName} and cloning starter project...`);
console.log('');
console.log('');

const cloned = runCommand(
  `git clone --depth 1 https://github.com/codenickycode/create-react-spa-cloudflare.git ${repoName}`,
);
if (!cloned) {
  process.exit(1);
}

console.log('');
console.log('');
console.log(`✅ Starter project cloned successfully!`);
console.log(`⚙️ Installing dependencies with pnpm...`);
console.log('');
console.log('');

const installed = runCommand(`cd ${repoName} && pnpm i`);
if (!installed) {
  process.exit(1);
}

console.log('');
console.log('');
console.log(`✅ Dependencies installed successfully!`);
console.log('⚙️ Removing starter command files...');
console.log('');
console.log('');

const cleanup = runCommand(
  `rm -rf ${repoName}/bin && mv ${repoName}/README.project.md ${repoName}/README.md`,
);
if (!cleanup) {
  console.warn('⚠️ WARN: Failed to cleanup starter command files');
}

console.log('');
console.log('');
console.log(`✅ Project successfully initialized! To start:`);
console.log(`cd ${repoName} && pnpm run dev`);
