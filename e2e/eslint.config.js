/* eslint-env node */
import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import rootConfig from '../eslint.config.js';
import tsEslintParser from '@typescript-eslint/parser';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...rootConfig,
  {
    // Note: there should be no other properties in this object
    ignores: ['eslint.config.js'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
];
