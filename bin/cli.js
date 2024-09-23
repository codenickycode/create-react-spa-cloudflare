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
    return false;
  }
  return true;
};

const repoName = process.argv[2];
if (!repoName) {
  console.error('You must supply a name for your repo');
  console.error('eg: pnpm create create-react-spa-cloudflare my-repo-name');
  process.exit(1);
}

const gitCloneCommand = `git clone --depth 1 https://github.com/codenickycode/create-react-spa-cloudflare.git ${repoName}`;

console.log(`Creating dir ${repoName} and cloning starter project`);

const cloned = runCommand(gitCloneCommand);
if (!cloned) {
  process.exit(1);
}

const installed = `cd ${repoName} && pnpm i`;
if (!installed) {
  process.exit(1);
}

console.log('Removing starter command files...');

const cleanup = `rm -rf ${repoName}/bin && mv ${repoName}/README.project.md ${repoName}/README.md`;
if (!cleanup) {
  console.warn('Failed to cleanup starter command files');
}

console.log(`Successfully installed! To start:`);
console.log(`cd ${repoName} && pnpm run dev`);
