// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      ".yarn/**/*",
      ".pnp.cjs",
      "**/.wrangler/**/*",
      "**/build/**/*",
      "**/dist/**/*",
      "**/dts/**/*",
      "**/node_modules/**/*",
      "**/*.d.ts",
      "**/dist-vite/**/*",
      "**/test-mocks/**/*",
      "**/tests/**/*",
      "**/.next/**/*",
      "**/.open-next/**/*",
      "**/out/**/*",
      "**/.nuxt/**/*",
      "**/.svelte-kit/**/*",
      "**/public/assets/**/*",
      "**/public/js/**/*",
      "packages/chat/public/assets/**/*",
      "packages/chat/public/js/**/*",
      // Coverage reports
      "**/coverage/**/*",
      // Development containers
      "devcontainers/**/*",
      // Temporary files
      ".tmp/**/*",
      "temp/**/*",
      // Storybook build outputs
      "storybook-static/**/*",
      // Playwright
      "test-results/**/*",
      "playwright-report/**/*",
      "playwright/.cache/**/*",
    ],
  },

  // TypeScript and React configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        "process": "readonly",
        "console": "readonly",
        "__dirname": "readonly",
        "__filename": "readonly",
        "fetch": "readonly",
        "WebSocket": "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": react,
      "react-hooks": reactHooks,
    },
    rules: {
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,
      // React recommended rules
      ...react.configs.recommended.rules,
      // React hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // React rules overrides
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "off",

      // TypeScript rules overrides
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          "prefer": "type-imports",
          "disallowTypeAnnotations": true,
          "fixStyle": "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General rules
      "prefer-const": "error",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
  },

  // JavaScript files configuration
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        "process": "readonly",
        "console": "readonly",
        "__dirname": "readonly",
        "__filename": "readonly",
        "fetch": "readonly",
        "WebSocket": "readonly",
      },
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
    },
    rules: {
      // React recommended rules
      ...react.configs.recommended.rules,
      // React hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // React rules overrides
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "off",

      // General rules
      "prefer-const": "error",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
  },

  // .mjs specific rules
  {
    files: ["**/*.mjs"],
    rules: {
      "no-unused-expressions": "off",
    },
  },

  // .cjs specific rules - CommonJS files
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "script", // Use script mode for CommonJS
      globals: {
        "process": "readonly",
        "console": "readonly",
        "__dirname": "readonly",
        "__filename": "readonly",
        "require": "readonly",
        "module": "readonly",
        "exports": "readonly",
      },
    },
  },
];
