import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    pool: "workers",
    workers: {
      wrangler: {
        configPath: "./wrangler.toml",
      },
    },
  },
});
