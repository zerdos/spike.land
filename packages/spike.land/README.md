# spike.land Backend Worker

[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](../../LICENSE.md)

This is the main backend for spike.land, a Cloudflare Workers-based application. It provides real-time collaboration features, a comprehensive suite of API services including AI integrations, and robust static asset hosting.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Overview

## Features

- Real-time collaboration using Durable Objects
- Static file serving with KV storage
- Authentication with Clerk
- AI integrations (OpenAI, Anthropic, Whisper)
- WebRTC TURN server
- CMS functionality
- Asset versioning and caching

## Architecture

### Static File Handling

- Cloudflare KV storage for static files
- `getAssetFromKV` for efficient asset retrieval
- Custom `serveWithCache` implementation
- Asset versioning with `ASSET_MANIFEST` and `ASSET_HASH`
- Content-Type header management

## NPM File Management

While the provided code doesn't directly show npm file management, it does use
several npm packages:

1. `@cloudflare/workers-types` for TypeScript types related to Cloudflare
   Workers.
2. `@cloudflare/kv-asset-handler` for handling static assets stored in KV.
3. `@spike-npm-land/code` for various utility functions and types.
4. `@clerk/backend` for authentication-related functionality.

The project likely uses a build step to bundle these npm dependencies into the
worker script.

## API Reference

### Service Worker Endpoints

- `GET /swVersion.mjs` - Current service worker version
- `GET /swVersion.js` - Service worker version and files info
- `GET /sw-config.json` - Service worker configuration
- `GET /ASSET_MANIFEST` - Asset manifest

### AI Integration Endpoints

- `POST /transpile` - Code transpilation using esbuild
- `POST /anthropic` - Anthropic AI requests
- `GET /ai-logs` - Recent AI logs
- `POST /openai` - OpenAI GPT-4 requests
- `POST /whisper` - Audio transcription
- `POST /summarize` - Text summarization
- `POST /replicate` - Replicate AI requests

### Authentication & WebRTC

- `GET /api/logged_in` - JWT token verification
- `GET /api/my-turn` - WebRTC TURN credentials

### CMS Operations

- `/my-cms/` - Personal CMS operations (GET, PUT, DELETE)
- `/live-cms/` - Live CMS operations (GET, PUT, DELETE)

## Environment Variables

Required environment variables:

```bash
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
CLERK_SECRET_KEY=your_clerk_secret
```

For local development, create a `.dev.vars` file with these variables.

## Development

### Prerequisites

- Cloudflare Workers account
- Wrangler CLI installed
- Durable Objects enabled
- KV namespace created

### Available Scripts

#### Development

- `yarn dev` - Start local development server
- `yarn dev:remote` - Start development server with remote connections

#### Building

- `yarn build` - Clean and prepare for deployment
- `yarn build:worker` - Build worker-specific code

#### Deployment

- `yarn deploy:dev` - Deploy to development environment (testing)
- `yarn deploy:prod` - Deploy to production environment

#### Testing

- `yarn test` - Run test suite
- `yarn test:watch` - Run tests in watch mode

#### Types & Utils

- `yarn types:check` - Type check without emitting files
- `yarn clean` - Clean build artifacts

### Local Development

1. Set up environment variables in `.dev.vars`:

```bash
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
CLERK_SECRET_KEY=your_clerk_secret
```

2. Start local development server:

```bash
# For local development
yarn dev

# For remote development
yarn dev:remote
```

3. Test your changes:

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch
```

4. Deploy:

```bash
# Deploy to development environment
yarn deploy:dev

# Deploy to production
yarn deploy:prod
```

## Troubleshooting

Common issues and solutions:

1. **Durable Objects not working:**
   - Verify Durable Objects are enabled in your account
   - Check wrangler.toml configuration

2. **KV access issues:**
   - Ensure KV namespace is properly bound
   - Verify KV access permissions

3. **Authentication errors:**
   - Check Clerk configuration
   - Verify JWT token format

4. **Deployment failures:**
   - Run `wrangler whoami` to verify authentication
   - Check for syntax errors with `yarn lint`

For more detailed information on each endpoint and its functionality, please
refer to the source code in `packages/spike.land/src/chat.ts`,
`packages/spike.land/src/chatRoom.ts`, and other relevant files in the project.
