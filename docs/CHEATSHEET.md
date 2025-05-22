# spike.land Documentation Cheatsheet

## Quick Links by Task

### I want to...

#### Set up & Develop
- 🚀 **Get Started**: [getting-started.md](development/getting-started.md)
  - Project setup, prerequisites, quick start guide
  - Development workflow and common tasks
  - VS Code setup and extensions

- 🏗️ **Understand Build Process**: [build-process.md](development/build-process.md)
  - Build system architecture
  - Package-specific builds
  - Environment configurations

#### Understand Architecture
- 📋 **Full System Overview**: [overview.md](architecture/overview.md)
  - System components and interactions
  - High-level architecture
  - Core technologies

- 🖥️ **Frontend (React + Vite)**: [frontend.md](architecture/frontend.md)
  - React application structure
  - Component architecture
  - Development patterns

- ⚡ **Workers (Cloudflare)**: [workers.md](architecture/workers.md)
  - Worker roles and responsibilities
  - Inter-worker communication
  - Deployment and management

- 🔄 **Data Flow**: [data-flow.md](architecture/data-flow.md)
  - Real-time collaboration flow
  - Asset management
  - API interactions

- 💾 **State Management**: [state-management.md](architecture/state-management.md)
  - Frontend state architecture
  - Durable Object state
  - Distributed state coordination

#### Key Areas by Component

##### Frontend (`packages/code`)
- React 19 + TypeScript setup → [frontend.md](architecture/frontend.md)
  - Component architecture
  - Monaco Editor integration
  - Real-time features

- Build configuration → [build-process.md](development/build-process.md)#frontend
  - Vite setup
  - TypeScript compilation
  - Asset processing

- State management → [state-management.md](architecture/state-management.md)#frontend
  - React hooks and context
  - Real-time state sync
  - Local state handling

##### Main Worker (`packages/spike.land`)
- Authentication & Real-time → [workers.md](architecture/workers.md)#main-worker
  - WebSocket handling
  - Authorization flow
  - Asset serving

- Durable Objects → [state-management.md](architecture/state-management.md)#durable-objects
  - State persistence
  - Real-time coordination
  - Rate limiting

- AI Integration → [workers.md](architecture/workers.md)#ai-integration
  - OpenAI/Anthropic integration
  - Request handling
  - Response processing

##### Durable Objects (`packages/durable-objects`)
- Stateful logic & coordination → [state-management.md](architecture/state-management.md)#durable-objects
  - Real-time features support
  - Data persistence strategies

##### Transpiler (`packages/js.spike.land`)
- ESBuild integration → [workers.md](architecture/workers.md)#transpiler-worker
  - Configuration
  - Plugin system
  - Build optimization

- Code processing → [data-flow.md](architecture/data-flow.md)#code-processing-flow
  - Transpilation flow
  - Module resolution
  - Source maps

##### Renderer (`packages/spike-land-renderer`)
- SSR & Screenshots → [workers.md](architecture/workers.md)#renderer-worker
  - Rendering pipeline
  - Asset generation
  - Caching strategy

- Puppeteer usage → [workers.md](architecture/workers.md)#puppeteer-integration
  - Browser control
  - Page rendering
  - PDF generation

#### Common Tasks Reference

##### Development
```bash
# Start development
yarn dev              # Start everything
yarn dev:fe          # Frontend only
yarn dev:workers     # Workers only

# Type checking
yarn types:check     # Check types
yarn types:watch     # Watch mode
```

##### Building
```bash
# Build packages
yarn build:all       # Build everything
yarn build:fe        # Frontend only
yarn build:workers   # Workers only

# Clean builds
yarn clean          # Remove artifacts
```

##### Deployment
```bash
# Deploy
yarn deploy:dev      # Development
yarn deploy:prod     # Production

# Testing
yarn test           # Run all tests
yarn test:e2e       # E2E tests
```

#### Common Files Reference

##### Configuration Files
- `package.json` - Root package configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint configuration
- `wrangler.toml` - Worker configuration (located in the root directory, packages/js.spike.land, packages/spike-land-renderer, and packages/durable-objects)

##### Key Directories
- `packages/code/src/@/` - Core frontend utilities
- `packages/code/src/components/` - React components
- `packages/spike.land/src/` - Main worker code
- `packages/js.spike.land/src/` - Transpiler code
- `docs/` - Documentation files
