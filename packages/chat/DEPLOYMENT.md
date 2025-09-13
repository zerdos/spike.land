# Cloudflare Workers Deployment Guide

This document provides comprehensive instructions for deploying the Spike Chat application to Cloudflare Workers using Next.js and @cloudflare/next-on-pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Configuration](#environment-configuration)
- [Database & Storage Setup](#database--storage-setup)
- [Building for Cloudflare](#building-for-cloudflare)
- [Deployment Commands](#deployment-commands)
- [Local Development](#local-development)
- [Monitoring & Debugging](#monitoring--debugging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [Node.js](https://nodejs.org/) v18+ installed
- [Cloudflare account](https://cloudflare.com/) with Workers plan
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed and authenticated
- Access to required external services (Clerk, Stripe, etc.)

### Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

## Initial Setup

### 1. Install Dependencies

```bash
cd packages/chat
npm install
```

### 2. Set up Cloudflare Resources

Create all required Cloudflare resources:

```bash
# Create KV namespaces
npm run kv:create

# Create R2 buckets
npm run r2:create

# Set up D1 database
npm run db:setup

# Complete setup (runs all above commands)
npm run cf:setup
```

### 3. Update wrangler.toml

Replace the placeholder IDs in `wrangler.toml` with your actual resource IDs:

```toml
# Get these IDs from the Cloudflare dashboard or wrangler commands
[[env.production.kv_namespaces]]
binding = "KV_SESSIONS"
id = "your-actual-kv-namespace-id"
preview_id = "your-actual-preview-id"
```

## Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual values:

```env
# Authentication (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_your-actual-key
CLERK_SECRET_KEY=sk_test_your-actual-secret

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_test_your-actual-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-actual-publishable-key

# AI Providers
ANTHROPIC_API_KEY=sk-ant-your-actual-anthropic-key
OPENAI_API_KEY=sk-your-actual-openai-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.your-subdomain.workers.dev
APP_URL=https://your-domain.your-subdomain.workers.dev
```

### 3. Set Wrangler Secrets

For production, use Wrangler secrets instead of .env files:

```bash
# Set secrets for production
wrangler secret put CLERK_SECRET_KEY --env production
wrangler secret put STRIPE_SECRET_KEY --env production
wrangler secret put ANTHROPIC_API_KEY --env production
wrangler secret put OPENAI_API_KEY --env production

# Set secrets for development
wrangler secret put CLERK_SECRET_KEY --env development
wrangler secret put STRIPE_SECRET_KEY --env development
wrangler secret put ANTHROPIC_API_KEY --env development
wrangler secret put OPENAI_API_KEY --env development
```

## Database & Storage Setup

### 1. Initialize Database Schema

```bash
# Apply schema to development database
wrangler d1 execute DATABASE --env development --file=./sql/schema.sql

# Apply schema to production database
wrangler d1 execute DATABASE --env production --file=./sql/schema.sql
```

### 2. Seed Development Data (Optional)

```bash
# Add sample data for development
wrangler d1 execute DATABASE --env development --file=./sql/seed.sql
```

### 3. Run Migrations

```bash
# Apply any pending migrations
npm run db:migrate
```

## Building for Cloudflare

The build process is automated with our custom build script:

```bash
# Build for Cloudflare Workers
npm run build

# Or explicitly
npm run build:cloudflare
```

### Build Process Details

The build script (`scripts/build-for-cloudflare.js`) performs:

1. **Dependency Check**: Installs @cloudflare/next-on-pages if missing
2. **Clean Build**: Removes previous build artifacts
3. **Next.js Build**: Compiles the Next.js application
4. **Cloudflare Transform**: Converts Next.js output for Workers
5. **Worker Optimization**: Adds environment bindings and compatibility layers
6. **Build Manifest**: Generates deployment metadata

### Build Output

After building, you'll find:
- `.vercel/output/static/_worker.js` - Main worker file
- `.vercel/output/static/_compat.js` - Node.js compatibility layer
- `.vercel/output/static/_manifest.json` - Build metadata

## Deployment Commands

### Quick Deployment

```bash
# Deploy to development (default)
npm run deploy

# Deploy to specific environments
npm run deploy:development
npm run deploy:production
npm run deploy:preview
```

### Manual Deployment

```bash
# Build first
npm run build

# Deploy with Wrangler
wrangler deploy --env production
```

### Deployment Verification

After deployment, verify your app:

1. **Health Check**: Visit `https://your-app.workers.dev/api/health`
2. **WebSocket Test**: Check WebSocket connection at `/ws`
3. **Database Test**: Ensure database queries work
4. **Authentication**: Test login/logout flows

## Local Development

### Development Server

```bash
# Start both frontend and backend
npm run dev

# Start only frontend (Next.js)
npm run dev:frontend

# Start only backend (Wrangler)
npm run dev:backend

# Use legacy Vite setup
npm run dev:legacy
```

### Local Development with Miniflare

For full local development with Cloudflare bindings:

```bash
# Preview with local bindings
npm run preview:local
```

### Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8787
- **WebSocket**: ws://localhost:8787/ws

## Monitoring & Debugging

### Cloudflare Dashboard

Monitor your deployment:
1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to Workers & Pages
3. Select your application
4. Check metrics, logs, and errors

### Wrangler Logs

View live logs during development:

```bash
# Tail logs for development
wrangler tail --env development

# Tail logs for production
wrangler tail --env production
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
wrangler secret put DEBUG_ANTHROPIC_PROXY --env development
# Set value to 'true'
```

### Build Diagnostics

Check build output and diagnostics:

```bash
# View build manifest
cat .vercel/output/static/_manifest.json

# Check worker bundle size
ls -lh .vercel/output/static/_worker.js
```

## Troubleshooting

### Common Issues

#### 1. Build Failures

**Issue**: `@cloudflare/next-on-pages` build fails
```bash
# Solution: Clear cache and rebuild
rm -rf .next .vercel node_modules/.cache
npm install
npm run build
```

**Issue**: Module resolution errors
```bash
# Solution: Check next.config.mjs webpack configuration
# Ensure proper fallbacks are set for Node.js modules
```

#### 2. Runtime Errors

**Issue**: Environment variables not available
```bash
# Solution: Check wrangler.toml binding configuration
# Ensure secrets are properly set with wrangler secret put
```

**Issue**: Database connection fails
```bash
# Solution: Verify D1 database binding and ID
wrangler d1 info DATABASE --env production
```

#### 3. WebSocket Issues

**Issue**: WebSocket connections fail
```bash
# Solution: Check Durable Object bindings in wrangler.toml
# Ensure WebSocket upgrade headers are properly set
```

### Performance Optimization

#### 1. Bundle Size Optimization

```javascript
// In next.config.mjs, configure tree shaking
modularizeImports: {
  'lucide-react': {
    transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
  },
}
```

#### 2. Edge Runtime Configuration

```javascript
// Use edge runtime for API routes
export const runtime = 'edge';
```

#### 3. Caching Strategy

Implement proper caching with KV:

```javascript
// Cache responses in KV_CACHE binding
await env.KV_CACHE.put(cacheKey, response, { expirationTtl: 3600 });
```

### Resource Limits

Be aware of Cloudflare Workers limits:

- **CPU Time**: 10ms for free tier, 50ms for paid
- **Memory**: 128MB
- **Request Size**: 100MB
- **Response Size**: 100MB
- **KV Operations**: Rate limited
- **D1 Queries**: Rate limited

### Support & Documentation

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Discord Community](https://discord.cloudflare.com/)

## Security Considerations

### 1. Environment Variables

- Never commit secrets to version control
- Use Wrangler secrets for sensitive data
- Rotate API keys regularly

### 2. CORS Configuration

Configure CORS properly in `next.config.mjs`:

```javascript
headers: [
  {
    key: 'Access-Control-Allow-Origin',
    value: process.env.CORS_ALLOWED_ORIGINS || 'https://your-domain.com',
  },
]
```

### 3. Rate Limiting

Implement rate limiting for API endpoints:

```javascript
// Check rate limit in middleware
const rateLimitResult = await checkRateLimit(env.KV_CACHE, identifier);
if (rateLimitResult.limited) {
  return new Response('Rate limited', { status: 429 });
}
```

## Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Database schema applied
- [ ] KV namespaces created
- [ ] R2 buckets configured
- [ ] Secrets set with Wrangler
- [ ] Build completes successfully
- [ ] Tests pass
- [ ] Performance optimized
- [ ] Security measures in place
- [ ] Monitoring configured
- [ ] Rollback plan ready

## Rollback Procedures

### Quick Rollback

```bash
# Rollback to previous version
wrangler rollback --env production
```

### Manual Rollback

1. Identify the last working version
2. Deploy that specific version:
   ```bash
   git checkout <previous-commit>
   npm run deploy:production
   ```

### Database Rollback

If database changes need rollback:
```bash
# Apply rollback migration
wrangler d1 execute DATABASE --env production --file=./sql/rollback/001_rollback.sql
```