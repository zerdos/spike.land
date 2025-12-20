import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

import path from "path";

export default defineWorkersConfig({
  test: {
    reporters: ["hanging-process", "dot"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    pool: "workers",
    workers: {
      wrangler: {
        configPath: "./wrangler.toml",
      },
    },
  },

  resolve: {
    alias: {
      replicate: path.resolve(__dirname, "__mocks__/replicate.js"),
      "snakecase-keys": path.resolve(__dirname, "__mocks__/snakecase-keys.js"),
      cookie: path.resolve(__dirname, "__mocks__/cookie.js"),
    },
  },
});
