// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a flat compat instance for legacy configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

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
    ],
  },

  // TypeScript files
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ),

  // Common config for JS and TS
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    rules: {
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-uses-react": "off",
      "react/no-unknown-property": "off",

      // TypeScript rules
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
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        "process": "readonly",
        "console": "readonly",
        "__dirname": "readonly",
        "__filename": "readonly",
        "fetch": "readonly",
        "WebSocket": "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
    languageOptions: {
      globals: {
        "process": "readonly",
        "console": "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-expressions": "off",
    },
  },
];
