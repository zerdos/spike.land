# @spike-npm-land/code

The frontend React application for spike.land - a real-time collaborative React
page editor with TypeScript support.

## Features

- Real-time collaborative editing
- Monaco Editor integration
- React components live preview
- TypeScript support
- Modern UI with Radix UI and Tailwind CSS
- Internationalization support
- WebRTC capabilities
- Service Worker for offline functionality
- Comprehensive testing suite

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Radix UI Components
- Framer Motion
- WebRTC
- Service Workers
- i18next

## UI Component Guidelines

This project is transitioning towards a standardized UI component library built
with [Tailwind CSS](https://tailwindcss.com/) and custom components located in
`src/@/components/ui`. These components are designed to ensure consistency,
reusability, accessibility, and performance across the application.

For detailed information on creating and using these UI components, please refer
to the [UI Component Guidelines](./UI_GUIDELINES.md).

## Development

### Prerequisites

- Node.js (LTS version)
- Yarn

### Installation

```bash
yarn install
```

### Available Scripts

#### Development

- `yarn dev` - Start all development processes concurrently (Vite, TypeScript,
  Workers)
- `yarn dev:vite` - Start Vite development server only
- `yarn dev:workers` - Start worker development processes

#### Building

- `yarn build` - Clean and run full build process
- `yarn build:all` - Build all components concurrently
- `yarn build:vite` - Build Vite application
- `yarn build:workers` - Build worker files
- `yarn build:types` - Build TypeScript declarations

#### Types

- `yarn types:check` - Type check without emitting files
- `yarn types:build` - Build TypeScript declarations
- `yarn types:watch` - Watch mode for TypeScript compilation

#### Testing

- `yarn test` - Run test suite
- `yarn test:full` - Run full test suite with type checking and linting

#### Utils

- `yarn clean` - Clean all build artifacts
- `yarn lint` - Run ESLint
- `yarn fmt` - Format code using dprint
- `yarn preview` - Preview production build locally

### Development Server

```bash
# Start all development processes
yarn dev

# Or start individual components:
yarn dev:vite    # Just the Vite dev server
yarn dev:workers # Just the worker processes
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building

```bash
# Full production build
yarn build

# Or individual build steps:
yarn build:vite    # Build Vite application
yarn build:workers # Build worker files
yarn build:types   # Build TypeScript declarations
```

Build artifacts will be stored in:

- `dist/` - Main application build
- `dist-vite/` - Vite build output
- `dts/` - TypeScript declarations

## Architecture

### Key Components

- Monaco Editor integration for code editing
- Real-time collaboration using SharedWorker
- React components live preview
- Service Worker for offline capabilities
- WebRTC for peer-to-peer communication

### Directory Structure

```
src/
├── @/              # Core utilities and components
├── components/     # React components
├── hooks/         # Custom React hooks
├── i18n/          # Internationalization
├── pages/         # Page components
├── styles/        # Global styles and Tailwind config
└── workers/       # Service and Shared workers
```

## Testing

The project uses Vitest for testing. Run the test suite with:

```bash
yarn test
```

For development, you can run tests in watch mode:

```bash
yarn vitest
```

## Contributing

When contributing to the UI, please make sure to follow the
[UI Component Guidelines](./UI_GUIDELINES.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

BSD-3-Clause - see [LICENSE.md](../../LICENSE.md) for details.
