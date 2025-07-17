# Getting Started

This guide will help you set up and start developing with the spike.land
codebase. It covers both local development and understanding the key components.

## Quick Start

1. **Clone and Install**

```bash
# Clone the repository
git clone https://github.com/zerdos/spike.land.git
cd spike.land

# Install dependencies
yarn install
```

2. **Configure Environment**

```bash
# Create development variables for Cloudflare Workers
cat > .dev.vars << EOL
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
CLERK_SECRET_KEY=your_clerk_secret
EOL
```

3. **Start Development Environment**

```bash
# Start everything (frontend + workers)
yarn dev

# Or start components individually:
yarn dev:fe      # Frontend only
yarn dev:workers # Workers only
```

## Project Structure

```
spike.land/
├── packages/
│   ├── code/                 # Frontend React application
│   ├── spike.land/          # Main Cloudflare Worker
│   ├── js.spike.land/       # Transpiler Worker
│   ├── spike-land-renderer/ # Renderer Worker
│   └── durable-objects/     # Durable Objects implementations
├── docs/                    # Documentation
└── devcontainers/          # Development containers
```

## Key Components

### Frontend Application (`packages/code`)

- React 19-based UI
- Real-time collaboration features
- Monaco Editor integration
- Service Worker capabilities

### Main Worker (`packages/spike.land`)

- Authentication and authorization
- Real-time collaboration backend
- Asset serving
- AI service integration

### Transpiler Worker (`packages/js.spike.land`)

- Code transpilation service
- ESBuild integration
- Module bundling

### Renderer Worker (`packages/spike-land-renderer`)

- Server-side rendering
- Screenshot/PDF generation
- Puppeteer integration

### Durable Objects (`packages/durable-objects`)

- Manages stateful logic (e.g., for collaboration)
- Interacts with the Main Worker

## Development Workflow

### 1. Local Development

```bash
# Start development servers
yarn dev

# Watch terminal output for:
- Vite development server
- Worker development output
- TypeScript compilation
```

### 2. Code Changes

- Frontend changes hot reload automatically
- Worker changes trigger automatic restart
- TypeScript errors show in real-time

### 3. Testing Changes

```bash
# Run tests
yarn test             # All tests
yarn test:e2e        # End-to-end tests
yarn workspace @spike-npm-land/code test  # Frontend tests
```

### 4. Building

```bash
# Build everything
yarn build:all

# Build specific components
yarn build:fe      # Frontend only
yarn build:workers # Workers only
```

### 5. Deployment

```bash
# Deploy to development
yarn deploy:dev

# Deploy to production
yarn deploy:prod
```

## Configuration Files

### Frontend (`packages/code`)

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Workers

- `wrangler.toml` - Cloudflare Worker configuration
- `tsconfig.json` - TypeScript configuration

## Development Tools

### Required Tools

- Node.js (v22.11.0 - see .nvmrc)
- Yarn
- Git
- Wrangler CLI (ensure Wrangler CLI is installed - see official Cloudflare
  documentation)

### Recommended VS Code Extensions

- ESLint
- Prettier
- TypeScript and JavaScript
- Tailwind CSS IntelliSense
- Cloudflare Workers

## Common Tasks

### 1. Adding a New Feature

1. Create feature branch

```bash
git checkout -b feature/new-feature
```

2. Make changes following the architecture patterns
3. Add tests
4. Update documentation
5. Create pull request

### 2. Updating Dependencies

```bash
# Update all dependencies
yarn up

# Update specific package
yarn up package-name
```

### 3. Running Type Checks

```bash
# Check all packages
yarn types:check

# Watch mode for development
yarn workspace @spike-npm-land/code types:watch
```

### 4. Formatting Code

```bash
# Format all files
yarn fmt

# Lint check
yarn lint
```

## Troubleshooting

### Common Issues

1. **Worker Development Issues**
   - Ensure Wrangler is installed and authenticated
   - Check `.dev.vars` configuration
   - Verify worker permissions in Cloudflare dashboard

2. **Frontend Development Issues**
   - Clear Vite cache: `rm -rf node_modules/.vite`
   - Check for TypeScript errors: `yarn types:check`
   - Verify module resolution: `yarn clean && yarn install`

3. **Build Issues**
   - Clear build artifacts: `yarn clean`
   - Verify all dependencies: `yarn install`
   - Check for TypeScript errors: `yarn types:check`

### Getting Help

1. Check documentation:
   - [Frontend Architecture](../architecture/frontend.md)
   - [Workers Architecture](../architecture/workers.md)
   - [Data Flow](../architecture/data-flow.md)
   - [State Management](../architecture/state-management.md)

2. Use development tools:
   - Chrome DevTools for frontend debugging
   - Wrangler logs for worker issues
   - TypeScript compiler output

3. Review common patterns:
   - Component patterns in `packages/code/src/@/components`
   - Worker patterns in `packages/spike.land/src`
   - Test patterns in respective `__tests__` directories

## Next Steps

1. Review the [Architecture Overview](../architecture/overview.md)
2. Explore the [Frontend Architecture](../architecture/frontend.md)
3. Understand the [Workers Architecture](../architecture/workers.md)
4. Learn about [Data Flow](../architecture/data-flow.md)
5. Study the [State Management](../architecture/state-management.md)

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on:

- Code style and standards
- Pull request process
- Testing requirements
- Documentation updates
