# spike-land-renderer

A Cloudflare Worker that provides server-side rendering capabilities for
spike.land using Puppeteer.

## Features

- Server-side rendering of React components
- Puppeteer integration for headless browser rendering
- Screenshot and PDF generation
- Caching mechanisms for improved performance
- Support for different rendering formats

## Dependencies

- `@cloudflare/puppeteer` - For headless browser rendering
- `@cloudflare/workers-types` - TypeScript types for Cloudflare Workers
- Vitest and related packages for testing

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

#### Deployment

- `yarn deploy` - Deploy to production environment

#### Testing

- `yarn test` - Run test suite
- `yarn test:watch` - Run tests in watch mode
- `yarn cf-typegen` - Generate TypeScript types for Cloudflare Workers

### Building

- `yarn build:worker` - This package typically does not require a separate build
  step for the worker code as it's deployed directly. Scripts like `build` might
  handle cleaning or other pre-deployment tasks.
- `yarn clean` - Remove build artifacts and temporary directories.

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
yarn deploy
```

## Configuration

The worker can be configured through `wrangler.toml`:

```toml
name = "spike-land-renderer"
account_id = "your_account_id"
workers_dev = true
```

## API Endpoints

The renderer exposes endpoints for:

- Server-side rendering of React components
- Screenshot generation
- PDF generation
- Static asset serving

For detailed API documentation, refer to the source code comments.

## License

BSD-3-Clause - see [LICENSE.md](../../LICENSE.md) for details.
