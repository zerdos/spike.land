# Next.js 15 Setup for Cloudflare Workers

This document outlines the Next.js 15 setup configured for Cloudflare Workers compatibility.

## 🚀 Setup Overview

The packages/chat directory has been configured with:

- **Next.js 15** with App Router
- **TypeScript** configuration optimized for Next.js
- **Edge Runtime** compatibility for Cloudflare Workers
- **Tailwind CSS** for styling
- **Middleware** for security headers and CORS
- **Build pipeline** with @cloudflare/next-on-pages

## 📁 Directory Structure

```
packages/chat/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page component
│   └── api/                     # API routes
│       └── hello/
│           └── route.ts         # Example API route
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── middleware.ts                # Edge runtime middleware
├── next.config.mjs              # Next.js configuration
├── next-env.d.ts                # Next.js type definitions
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.mjs           # PostCSS configuration
```

## 🔧 Configuration Files

### next.config.mjs

- Edge runtime compatibility
- Cloudflare Workers optimizations
- Webpack fallbacks for Node.js modules
- Image optimization disabled for static export

### middleware.ts

- Security headers (CSP, XSS protection)
- CORS handling for API routes
- Cache headers for static assets
- Edge runtime configured

### tsconfig.json

- Next.js optimized TypeScript config
- App Router and API routes support
- Cloudflare Workers types included

## 🛠 Available Scripts

```bash
# Development
yarn dev:frontend              # Next.js dev server
yarn dev                      # Next.js + Wrangler dev

# Building
yarn build:frontend           # Next.js build
yarn build                    # Full Cloudflare build
yarn build:cloudflare         # Cloudflare-optimized build

# Deployment
yarn deploy                   # Deploy to Cloudflare Workers
yarn deploy:production        # Production deployment
yarn deploy:development       # Development deployment

# Quality checks
yarn types:check              # TypeScript validation
yarn lint                     # ESLint check
yarn test                     # Run tests
```

## 🌐 API Routes

Example API route at `/app/api/hello/route.ts`:

- Edge runtime compatible
- TypeScript typed
- Handles GET and POST requests
- JSON response formatting

## 📦 Dependencies Added

### Production Dependencies

- `next@15` - Next.js framework
- `@cloudflare/next-on-pages` - Cloudflare Workers adapter

### Development Dependencies

- `tailwindcss` - CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS prefixing

## 🚀 Deployment to Cloudflare Workers

1. **Build**: `yarn build:cloudflare`
   - Builds Next.js app
   - Optimizes for Cloudflare Workers
   - Generates static assets in `.vercel/output/static`

2. **Deploy**: `yarn deploy`
   - Uses Wrangler to deploy to Cloudflare Workers
   - Serves static assets from R2/KV

## 🔍 Key Features

### Edge Runtime Compatibility

- All routes use `experimental-edge` runtime
- Node.js modules properly fallback configured
- WebAssembly and streaming support

### Security & Performance

- CSP headers configured
- CORS handling for API routes
- Image optimization disabled for static export
- Tree-shaking and code splitting

### Development Experience

- Hot module replacement
- TypeScript strict mode
- ESLint and Prettier integration
- Source maps in development

## 🐛 Common Issues

### Runtime Warnings

- Edge runtime is experimental - warnings expected
- Middleware requires `experimental-edge` runtime
- Static export disables some Next.js features

### TypeScript Errors

- Existing codebase may have unrelated TypeScript errors
- Focus on new Next.js files for validation

## 📚 Next Steps

1. **Migrate existing components** to App Router structure
2. **Set up authentication** with Clerk integration
3. **Configure WebSocket** handling for real-time chat
4. **Add database integration** with D1/KV bindings
5. **Implement AI chat features** using existing chat logic

The setup provides a solid foundation for the Spike Chat application with Next.js 15 and Cloudflare Workers compatibility.
