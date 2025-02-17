import { defineConfig } from 'vitest/config';
import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
  test: {
    pool: '@cloudflare/vitest-pool-workers',
    globals: true,
    testTimeout: 10000,
    poolOptions: {
      workers: {
        wrangler: {
          configPath: './wrangler.toml'
        }
      }
    }
  }
});
