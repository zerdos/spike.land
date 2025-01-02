import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsEslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

export default tsEslint.config(
  {
    ignores: [
      "dist",
      "dts",
      "node_modules",
      "**/*.d.ts",
      "**/*.config.js",
      "**/*.config.ts",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tsEslint.configs.recommended,
      ...tsEslint.configs.stylistic,
    ],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
        ...globals.es2025,
      },
      parser: tsEslint.parser,
      parserOptions: {
        tsconfigRootDir: ".",
        project: true,
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tsEslint.plugin,
      "react": reactPlugin,
    },
    rules: {
      // Console statements - changed to 'error' to make it auto-fixable
      // "no-console": ["error", {
      //   allow: ["warn", "error"],
      // }],

      // React Refresh rules
      "react-hooks/exhaustive-deps": ["off"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Unused variables handling
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Type definition rules
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "always" },
      ],

      // Array type handling
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // Empty function handling
      "@typescript-eslint/no-empty-function": "off",

      // Inferrable type annotations
      "@typescript-eslint/no-inferrable-types": "warn",

      // React hooks rules
      "react-hooks/rules-of-hooks": "error",

      // Additional recommended rules
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
      "@typescript-eslint/prefer-for-of": "error",

      // React-specific rules
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "warn",
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
);
