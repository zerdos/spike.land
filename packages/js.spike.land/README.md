# @spike-npm-land/transpile

A Cloudflare Worker that provides transpilation services using esbuild for spike.land's real-time collaborative code editor.

## Features

- On-demand TypeScript/JavaScript transpilation
- ESBuild integration
- Efficient caching mechanisms
- Support for various module formats

## Dependencies

- `esbuild-wasm` - For code transpilation
- `@spike-npm-land/code` - Core package dependencies
- `@cloudflare/workers-types` - TypeScript types for Cloudflare Workers

## Development

### Prerequisites

- Node.js (LTS version)
- Yarn
- Wrangler CLI
- Cloudflare Workers account

### Available Scripts

#### Development

- `yarn dev` - Start local development server
- `yarn dev:remote` - Start development server with remote connections

#### Building

- `yarn build:worker` - Build worker-specific code

#### Deployment

- `yarn deploy:prod` - Deploy to production environment

#### Testing & Utils

- `yarn test` - Run test suite
- `yarn test:watch` - Run tests in watch mode
- `yarn types:check` - Type check without emitting files
- `yarn clean` - Clean build artifacts

### Local Development

1. Install dependencies:

```bash
yarn install
```

2. Start local development:

```bash
# For local development
yarn dev

# For remote development
yarn dev:remote
```

3. Deploy:

```bash
# Deploy to production
yarn deploy:prod
```

## Configuration

The worker can be configured through `wrangler.toml`:

```toml
name = "js-spike-land"
account_id = "your_account_id"
workers_dev = true
```

## API Endpoints

The worker exposes transpilation endpoints that accept JavaScript/TypeScript code and return the transpiled output.

For detailed API documentation, see the source code comments in `src/index.ts`.

## License

BSD-3-Clause - see [LICENSE.md](LICENSE.md) for details.
