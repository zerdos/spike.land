# Cloudflare Edge Chat Demo

[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](../../LICENSE.md)

A Cloudflare Workers-based backend that powers spike.land's real-time collaborative code editor with various API endpoints and services.

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

1. Install dependencies:
```bash
yarn install
```

2. Start local development:
```bash
yarn dev
```

3. Test your changes:
```bash
yarn test
```

4. Deploy to Cloudflare Workers:
```bash
yarn deploy
```

### Prerequisites

- Cloudflare Workers account
- Wrangler CLI installed
- Durable Objects enabled
- KV namespace created

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
