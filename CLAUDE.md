# Development Guidelines for spike.land

## Project Overview

spike.land is a real-time collaborative code playground built with:
- **Frontend**: React 19, TypeScript, Vite, Monaco Editor
- **Backend**: Cloudflare Workers, Durable Objects, R2 storage
- **Real-time**: WebSocket connections for live collaboration
- **Architecture**: Monorepo with Yarn workspaces

### Key Packages
- `packages/code`: Frontend React application with Monaco editor
- `packages/spike.land`: Backend Cloudflare Workers with WebSocket handling
- `packages/spike-land-renderer`: Frontend renderer components
- `packages/code-worker`: Web Worker for code execution
- `packages/transpile`: TypeScript/JSX transpilation service

## Build & Test Commands

- Build all: `yarn build:all`
- Build frontend: `yarn build:fe`
- Run dev server: `yarn dev`
- Format code: `yarn fmt`
- Lint all: `yarn eslint` (uses cache for better performance)
- Lint and fix: `yarn eslint:fix`
- Lint specific file: `eslint packages/package-name/src/file.ts`
- Check types: `yarn types:check`
- Run all tests: `yarn test` (includes --no-warnings to suppress EventEmitter warnings)
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
- Mock imports in tests using vi.mock() at module level
- Clean up timers and event listeners in test afterEach hooks

## ESLint Setup

- Single unified ESLint config handles the entire monorepo
- VSCode ESLint extension will show the same errors as CLI commands
- To set up VSCode integration, add to settings.json:
  ```json
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
  ```
- Run `eslint:fix` command to automatically fix many common issues

## Testing Guidelines

- Tests use Vitest with Cloudflare Workers pool for backend tests
- Mock WebSocket connections and timers properly in tests
- Always clean up intervals/timeouts with `vi.clearAllTimers()`
- Use `vi.waitFor()` instead of setTimeout for async test operations
- Global test setup increases max listeners to prevent warnings
- Tests may show "close timed out" message - this is expected with worker pools

## Important Task Completion Guidelines

When completing any development task:

1. **Always run validation commands before considering the task complete:**
   - Run `yarn types:check` to ensure no TypeScript errors
   - Run `yarn test` to ensure all tests pass
   - Run `yarn eslint` to check for linting issues

2. **Update documentation after making changes:**
   - Update this CLAUDE.md file with any new patterns or guidelines discovered
   - Update relevant README files if functionality changes
   - Add JSDoc comments for new functions/classes
   - Document any new environment variables or configuration options
   - Update package.json scripts documentation if new scripts are added

3. **Documentation areas to consider updating:**
   - API endpoints and their request/response formats
   - WebSocket message types and protocols
   - Environment variables and configuration
   - Testing patterns and mock strategies
   - Build and deployment processes
   - Troubleshooting guides for common issues

## Known Issues & Solutions

- **Memory leak warnings during tests**: Already mitigated with proper cleanup and --no-warnings flag
- **"Tests closed successfully but something prevents main process from exiting"**: Expected behavior with vitest worker pools, not an actual issue
- **WebSocket mock cleanup**: Ensure all WebSocket sessions are properly closed in afterEach hooks
