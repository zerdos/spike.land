// eslint.config.mjs

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    ignores: [
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      "dist/**",
      "dts/**",
      "tw-chunk**",
      'node_modules/**',
      '_old_tailwind.config.js',
      '.eslintrc.cjs'
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },
];