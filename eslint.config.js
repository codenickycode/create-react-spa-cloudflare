/* eslint-env node */
import path from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsEslintParser from '@typescript-eslint/parser';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    // Note: there should be no other properties in this object
    ignores: ['dist', 'eslint.config.js'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'default-case': 'error',
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        { allowShortCircuit: true },
      ],
    },
    settings: {
      'max-warnings': 0,
    },
  },
];
