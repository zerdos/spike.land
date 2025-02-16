import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    reporters: ["dot"],
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.toml"
        }
      }
    }
  }
});
