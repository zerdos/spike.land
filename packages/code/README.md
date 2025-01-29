# @spike-npm-land/code

The frontend React application for spike.land - a real-time collaborative React page editor with TypeScript support.

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

## Development

### Prerequisites

- Node.js (LTS version)
- Yarn

### Installation

```bash
yarn install
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn test` - Run test suite
- `yarn lint` - Run ESLint
- `yarn types` - Run TypeScript type checking
- `yarn preview` - Preview production build locally
- `yarn fmt` - Format code using dprint
- `yarn clean` - Clean build artifacts

### Development Server

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

BSD-3-Clause - see [LICENSE.md](../../LICENSE.md) for details.
