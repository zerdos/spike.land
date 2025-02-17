import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  test: {
    globals: true,
    testTimeout: 10000,
    poolOptions: {
      workers: {
        // Provide any Miniflare options here if needed.
        miniflare: {},
        wrangler: {
          configPath: './wrangler.toml'
        }
      }
    }
  }
});
