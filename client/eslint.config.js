/* eslint-env node */
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import rootConfig from '../eslint.config.js';
import tsEslintParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...rootConfig,
  {
    // Note: there should be no other properties in this object
    ignores: ['src/server-types.d.ts', 'eslint.config.js', 'postcss.config.js'],
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
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@sentry/react',
              message: '@sentry/react should only be lazy imported',
            },
          ],
        },
      ],
    },
  },
];
