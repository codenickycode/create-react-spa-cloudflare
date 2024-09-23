#!/usr/bin/env node

/* eslint-env node, commonjs */

// mostly copied from:
// https://www.youtube.com/watch?v=UxdSoefSxrA&t=1s&ab_channel=bonsaiilabs
// thx bonsaiilabs!

import { execSync } from 'child_process';

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
  }
};

const repoName = process.argv[2];
if (!repoName) {
  console.error('You must supply a name for your repo');
  console.error('eg: pnpm create create-react-spa-cloudflare my-repo-name');
  process.exit(1);
}

const gitCheckoutCommand = `git clone --depth 1 https://github.com/codenickycode/create-react-spa-cloudflare.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && pnpm i`;

console.log(`Creating dir: ${repoName} and cloning starter project`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) {
  process.exit(1);
}

console.log(`Installing dependencies...`);

const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) {
  process.exit(1);
}

console.log(`Successfully installed! To start:`);
console.log(`cd ${repoName} && pnpm run dev`);
