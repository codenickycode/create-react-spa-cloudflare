#!/usr/bin/env node

/* eslint-env node, commonjs */

// modified from:
// https://www.youtube.com/watch?v=UxdSoefSxrA&t=1s&ab_channel=bonsaiilabs
// thx bonsaiilabs and claude.ai!

import { execSync } from 'child_process';
import { updateJson } from './update-json.js';
import process from 'process';

const runCommand = (command) => {
  console.log(`Executing command: ${command}`);
  try {
    execSync(command, {
      stdio: 'inherit',
    });
    return true;
  } catch (error) {
    console.error(`Command failed with error: ${error}`);
    return false;
  }
};

const repoName = process.argv[2];
if (!repoName) {
  console.error('');
  console.error('You must supply a name for your repo');
  console.error('eg: pnpm create react-spa-cloudflare my-repo-name');
  process.exit(1);
}

console.log('');
console.log(`⚙️ Creating dir ${repoName} and cloning starter project...`);
console.log('');

const cloned = runCommand(
  `git clone --depth 1 https://github.com/codenickycode/create-react-spa-cloudflare.git ${repoName}`,
);
if (!cloned) {
  process.exit(1);
}

// Change directory to the new project folder
process.chdir(repoName);

console.log('');
console.log(`✔️ Starter project cloned successfully!`);
console.log('');
console.log(`⚙️ Installing dependencies with pnpm...`);
console.log('');

const installed = runCommand('pnpm i');
if (!installed) {
  console.warn('⚠️ Failed to install dependencies!');
}

console.log('');
console.log(`✔️ Dependencies installed successfully!`);
console.log('');
console.log('⚙️ Renaming packages...');
console.log('');

const initPackageJsonProps = {
  version: '0.0.0',
  description: '',
  bin: '[[DELETE]]',
  keywords: [],
  license: '',
  author: '',
  repository: '[[DELETE]]',
};

const updatedRootPackage = updateJson('package.json', {
  ...initPackageJsonProps,
  name: repoName,
});
const updatedClientPackage = updateJson('client/package.json', {
  ...initPackageJsonProps,
  name: `@${repoName}/client`,
});
const updatedServerPackage = updateJson('server/package.json', {
  ...initPackageJsonProps,
  name: `@${repoName}/server`,
});
console.log('');
if (!(updatedRootPackage && updatedClientPackage && updatedServerPackage)) {
  console.warn('⚠️ Failed to update package manifests!');
} else {
  console.log(`✔️ Packages updated successfully!`);
}

console.log('');
console.log('⚙️ Removing starter command files...');
console.log('');

const cleanup = runCommand(
  `rm -rf bin .git && \
   mv README.project.md README.md && \
   mv .env-template .env && \
   mv client/.env-template client/.env`,
);
if (!cleanup) {
  console.warn('⚠️ Failed to cleanup starter command files!');
}

console.log('');
console.log(`✔️ Starter command files cleaned up successfully!`);
console.log('');
console.log('⚙️ Initializing git repository...');
console.log('');

const gitInit = runCommand('git init');
if (!gitInit) {
  console.warn('⚠️ Failed to initialize git repository!');
}

console.log('');
console.log(
  `✅ Project initialized! To start, run: cd ${repoName} && pnpm run dev`,
);
