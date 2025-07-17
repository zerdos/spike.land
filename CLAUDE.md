# Development Guidelines for spike.land

## Build & Test Commands

- Build all: `yarn build:all`
- Build frontend: `yarn build:fe`
- Run dev server: `yarn dev`
- Format code: `yarn fmt`
- Lint all: `yarn eslint` (uses cache for better performance)
- Lint and fix: `yarn eslint:fix`
- Lint specific file: `eslint packages/package-name/src/file.ts`
- Check types: `yarn types:check`
- Run all tests: `yarn test`
- Run single test: `vitest run src/path/to/test.spec.ts`
- Run package tests: `cd packages/package-name && vitest run`

## Code Style Guidelines

- TypeScript with strict types, use type imports with `import type`
- React 19 with JSX components (no React import needed)
- Line width: 100 chars, 2 space indentation, LF line endings
- Double quotes for strings, semicolons required
- Use trailing commas for multi-line lists/objects
- Interfaces preferred over type aliases
- Variable naming: camelCase for variables, PascalCase for components/classes
- Prefix unused variables with underscore (e.g., `_unused`)
- Avoid using `any` type, use more specific types or `unknown`
- Error handling: prefer early returns and detailed error messages

## ESLint Setup

- Single unified ESLint config handles the entire monorepo
- VSCode ESLint extension will show the same errors as CLI commands
- To set up VSCode integration, add to settings.json:
  ```json
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
  ```
- Run `eslint:fix` command to automatically fix many common issues
