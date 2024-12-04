// eslint.config.cjs

const eslint = require("@eslint/js");
const tsEslint = require("typescript-eslint");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: [
      "dist/**/*",
      "dts/**/*",
      "tw-chunk**",
      "node_modules/**/*",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
      "react": reactPlugin,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/display-name": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
      // Add any other project-specific rules here
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["eslint.config.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2022,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
