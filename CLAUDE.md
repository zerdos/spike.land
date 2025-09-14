# Development Guidelines for spike.land

## Feature Implementation System Guidelines

### Feature Implementation Priority Rules
- IMMEDIATE EXECUTION: Launch parallel Tasks immediately upon feature requests
- NO CLARIFICATION: Skip asking what type of implementation unless absolutely critical
- PARALLEL BY DEFAULT: Always use 7-parallel-Task method for efficiency

### Parallel Feature Implementation Workflow
1. **Component**: Create main component file
2. **Styles**: Create component styles/CSS
3. **Tests**: Create test files
4. **Types**: Create type definitions
5. **Hooks**: Create custom hooks/utilities
6. **Integration**: Update routing, imports, exports
7. **Remaining**: Update package.json, documentation, configuration files
8. **Review and Validation**: Coordinate integration, run tests, verify build, check for conflicts

### Context Optimization Rules
- Strip out all comments when reading code files for analysis
- Each task handles ONLY specified files or file types
- Task 7 combines small config/doc updates to prevent over-splitting

### Feature Implementation Guidelines
- **CRITICAL**: Make MINIMAL CHANGES to existing patterns and structures
- **CRITICAL**: Preserve existing naming conventions and file organization
- Follow project's established architecture and component patterns
- Use existing utility functions and avoid duplicating functionality



## Documentation Resources

**IMPORTANT: Always consult official documentation before implementing features**

When working with external libraries, frameworks, or tools, use the Ref MCP server to look up:
- API signatures and parameters
- Best practices and recommended patterns
- Configuration options
- Example implementations
- Breaking changes or version-specific features

Priority documentation sources:
- React 19 - Latest hooks, concurrent features, and component patterns
- TypeScript - Type utilities, configuration, and advanced patterns
- Vite - Build configuration, plugins, and optimization
- Monaco Editor - Editor API, language services, and themes
- Cloudflare Workers - Runtime APIs, Durable Objects, R2 storage
- Vitest - Testing patterns, mocks, and assertions
- MDN for web APIs and JavaScript features
- Official npm package documentation

## Development Workflow

Before implementing features:
1. **Check documentation first** - Use the Ref MCP server to verify API usage, especially for:
   - Methods you haven't used recently
   - Complex configuration options
   - Third-party library integrations
   - Platform-specific APIs

2. **Verify assumptions** - Don't rely on memory for:
   - Exact method signatures
   - Parameter ordering
   - Return types
   - Available options in configuration objects

3. **Look for best practices** - Check docs for:
   - Recommended patterns
   - Performance considerations
   - Security guidelines
   - Deprecation warnings

## When to Consult Documentation

Always use Ref MCP when:
- Using a library method for the first time in this project
- Implementing error handling for external services
- Setting up configuration files
- Working with version-specific features
- Integrating new dependencies
- Debugging unexpected behavior
- Working with Cloudflare Workers APIs (KV, Durable Objects, R2)
- Configuring Monaco Editor features
- Setting up WebSocket handlers

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
- `packages/chat`: AI chat application with real-time messaging
  - Deployed at: https://spike-chat-dev.spikeland.workers.dev
  - Features: Conversation management, WebSocket support, subscription tiers
  - Testing: Cucumber tests with Playwright for E2E testing

## Build & Test Commands

### General Commands
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

### Chat Package Specific Commands
- Run dev server: `cd packages/chat && yarn dev`
- Deploy to development: `cd packages/chat && yarn deploy --env development`
- Deploy to production: `cd packages/chat && yarn deploy --env production`
- Run Cucumber tests: `cd packages/chat && yarn test:cucumber`
- Run smoke tests: `cd packages/chat && yarn test:cucumber:smoke`

## Code Style Guidelines

### TypeScript Requirements
- **NEVER use `any` type** - ESLint will fail the build
  - Use specific types, generics, or `unknown` instead
  - For external libraries without types, create proper type definitions
  - For dynamic objects, use `Record<string, unknown>` or define interfaces
- TypeScript with strict types, use type imports with `import type`
- Interfaces preferred over type aliases

### React & JavaScript Standards
- React 19 with JSX components (no React import needed)
- Line width: 100 chars, 2 space indentation, LF line endings
- Double quotes for strings, semicolons required
- Use trailing commas for multi-line lists/objects
- Variable naming: camelCase for variables, PascalCase for components/classes
- Prefix unused variables with underscore (e.g., `_unused`)
- Error handling: prefer early returns and detailed error messages

### Testing Standards
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

## Library-Specific Documentation Guidelines

### React 19
- Version: 19.x
- Check docs for: Concurrent features, Suspense boundaries, Server Components
- Common pitfalls: useEffect cleanup, StrictMode double-rendering
- Preferred patterns: Custom hooks for shared logic, component composition

### TypeScript
- Version: 5.x
- Check docs for: Utility types, conditional types, mapped types
- Common pitfalls: Type inference limitations, module resolution
- Preferred patterns: Strict mode, explicit return types, type-only imports

### Vite
- Version: 5.x
- Check docs for: Plugin configuration, build optimization, HMR setup
- Common pitfalls: ESM compatibility, environment variables
- Preferred patterns: Use defineConfig, explicit imports

### Monaco Editor
- Check docs for: Language services, themes, editor options
- Common pitfalls: Worker setup, language registration
- Preferred patterns: Lazy loading, custom language definitions

### Cloudflare Workers
- Check docs for: Durable Objects API, R2 bindings, WebSocket handling
- Common pitfalls: CPU limits, subrequest limits, global state
- Preferred patterns: Request context, environment bindings

### Vitest
- Check docs for: Mock functions, test hooks, coverage configuration
- Common pitfalls: Timer mocks, module mocks, async testing
- Preferred patterns: vi.mock at module level, proper cleanup

## Frequently Referenced Documentation

Use Ref MCP to check these common areas:
- Authentication patterns for Clerk (packages/chat)
- WebSocket message protocols for real-time collaboration
- Monaco Editor API for code highlighting and IntelliSense
- Cloudflare Workers Durable Objects for state management
- React 19 Suspense and Error Boundaries
- TypeScript generics and type constraints
- Vitest mocking strategies for Workers

## Known Issues & Solutions

- **Memory leak warnings during tests**: Already mitigated with proper cleanup and --no-warnings flag
- **"Tests closed successfully but something prevents main process from exiting"**: Expected behavior with vitest worker pools, not an actual issue
- **WebSocket mock cleanup**: Ensure all WebSocket sessions are properly closed in afterEach hooks
- **AI SDK v4 tool compatibility with Claude Sonnet 4**: The AI SDK v4 has a known issue where the `tool()` helper generates incorrect schema format for Claude. See https://github.com/vercel/ai/issues/7333
  - **Workaround**: Set `DISABLE_AI_TOOLS=true` in your environment variables to disable tools temporarily
  - **Alternative**: Use direct JSON schema format instead of the AI SDK's `tool()` helper
  - **Debug Mode**: Set `DEBUG_ANTHROPIC_PROXY=true` to enable debug logging for Anthropic proxy requests
- **ES Module configuration for Chat Package**: The chat package uses ES modules with TypeScript
  - Cucumber tests run with `npx tsx` for proper TypeScript support
  - Configuration in `cucumber.json` uses `import` instead of `require`
  - Node v20+ requires `--import` flag instead of deprecated `--loader`
