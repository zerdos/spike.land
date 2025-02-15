import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'miniflare',
    globals: true,
    environmentOptions: {
      bindings: {
        CODE: { class: 'Code' },
        LIMITERS: { class: 'CodeRateLimiter' },
        KV: {},
        R2: {},
        X9: {},
        AI: {},
        ESBUILD: {}
      },
      modules: true,
      wranglerConfigPath: './wrangler.toml',
      scriptPath: './src/cf-workers.ts'
    },
    include: ["tests/**/*.{test,spec}.{ts,js}", "src/**/*.{test,spec}.{ts,js}"],
    setupFiles: ["test-setup.ts"],
    reporters: ["dot"]
  },
  resolve: {
    alias: {
      '@cloudflare/workers-types': 'node_modules/@cloudflare/workers-types/index.d.ts'
    }
  },
  esbuild: {
    target: 'esnext',
  }
});
