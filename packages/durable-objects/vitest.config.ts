import { defineConfig } from "vitest/config";
import { WorkersPoolOptions } from "@cloudflare/vitest-pool-workers/config";

export default defineConfig({
  test: {
    globals: true,
    pool: '@cloudflare/vitest-pool-workers',
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.toml"
        },
        durableObjects: {
          COUNTER: "Counter",
          SQL: "SQLiteDurableObject"
        }
      } as WorkersPoolOptions
    }
  }
});
