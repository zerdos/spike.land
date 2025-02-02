import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsEslint from "typescript-eslint";

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
        ...globals.es2024,
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
      // Addressing specific linting issues
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
        },
      ],
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

      // Existing rules from previous configuration
      "react-hooks/exhaustive-deps": ["off"],
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "always" },
      ],
      "@typescript-eslint/no-empty-function": "off",
      "react-hooks/rules-of-hooks": "error",
      "prefer-const": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "warn",
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
);
