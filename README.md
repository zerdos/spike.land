# Real-Time React Page Editor in TypeScript

Easily edit and preview your React pages in real-time using this TypeScript-based page editor.

![Real-Time React Page Editor Screenshot](https://user-images.githubusercontent.com/1433047/152510761-ecd12293-1eaf-425e-ae7b-71238260cc8c.gif)

[Live Demo](https://spike.land)

## Overview

This project provides a real-time collaborative React page editor built with TypeScript and powered by Cloudflare Workers. It enables developers to edit and preview React components in real-time, with built-in collaboration features.

## Documentation

📚 **[View the Documentation Cheatsheet](docs/CHEATSHEET.md)**

### Quick Start
- [Getting Started Guide](docs/development/getting-started.md)
- [Build Process Documentation](docs/development/build-process.md)

### Architecture
- [System Overview](docs/architecture/overview.md)
- [Frontend Architecture](docs/architecture/frontend.md)
- [Workers Architecture](docs/architecture/workers.md)
- [Data Flow](docs/architecture/data-flow.md)
- [State Management](docs/architecture/state-management.md)

## Prerequisites

- Node.js (LTS version)
- Yarn
- Git

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/zerdos/spike.land.git
cd spike.land
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development environment:
```bash
# Start everything (frontend + workers)
yarn dev

# Or start components individually:
yarn dev:fe      # Frontend only
yarn dev:workers # Workers only
```

## Scripts Overview

The project uses a comprehensive build system with the following main commands:

### Development
- `yarn dev` - Start all development servers (frontend + workers)
- `yarn dev:fe` - Start frontend development server only
- `yarn dev:workers` - Start Cloudflare Workers in development mode

### Building
- `yarn build:all` - Build all packages
- `yarn build:fe` - Build frontend only
- `yarn build:workers` - Build workers only

### Deployment
- `yarn deploy:dev` - Deploy to development environment
- `yarn deploy:prod` - Deploy to production environment

### Testing & Utilities
- `yarn test` - Run all tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Run linting
- `yarn fmt` - Format code
- `yarn types:check` - Type check all packages

## Monorepo Structure ![Last Updated](https://img.shields.io/github/last-commit/zerdos/spike.land.svg)

This project is organized as a monorepo with the following structure:

```
/packages
├── code/                 # Frontend React application
│   ├── dev scripts:     # - yarn dev (Vite + TypeScript + Workers)
│   └── build scripts:   # - yarn build (Production build with type checking)
│
├── spike.land/          # Main Cloudflare Worker backend
│   ├── dev scripts:     # - yarn dev (Local) or yarn dev:remote (Remote)
│   └── deploy scripts:  # - yarn deploy:dev/prod (Environment-specific)
│
├── durable-objects/     # Cloudflare Durable Objects for stateful logic
│
├── js.spike.land/       # Transpiler Worker
│   ├── dev scripts:     # - yarn dev (Local development)
│   └── deploy scripts:  # - yarn deploy:dev/prod (Environment-specific)
│
└── spike-land-renderer/ # Page rendering engine
    ├── dev scripts:     # - yarn dev (Local development)
    └── deploy scripts:  # - yarn deploy (Production deployment)
```

## Development Environment

The project includes several development container configurations in the `/devcontainers` directory for consistent development environments:
- bookworm-devcontainer
- jammy-devcontainer
- lunar-devcontainer
- trixie-devcontainer
- node-chrome

### Using Gitpod

You can explore the entire repository using Gitpod:

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/zerdos/spike.land)

After opening in Gitpod, you can access a full Ubuntu + Xfce environment:
```bash
startx  # Launches Xfce desktop environment
# Access the remote desktop on port :6080 in your browser
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on submitting pull requests.

## License

This project is licensed under the terms of the license found in [LICENSE.md](LICENSE.md).

## Security

For security concerns, please see our [Security Policy](SECURITY.md).
