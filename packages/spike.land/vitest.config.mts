import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        miniflare: {
          configPath: 'wrangler.toml',
          compatibilityDate: '2024-10-31',
        },
      },
    },
  },
});
