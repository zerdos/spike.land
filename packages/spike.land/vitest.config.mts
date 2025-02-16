import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersProject({
  test: {
    globals: true,
    environmentOptions: {
      modules: true,
      scriptPath: "src/cf-workers.ts",
      wranglerConfigPath: "wrangler.toml",
      wranglerConfigEnv: "testing",
      bindings: {
        ESM_ORIGIN: "https://esm.sh",
        NPM_REGISTRY: "https://registry.npmjs.org/",
        OPENAI_API_KEY: "test-key",
        REPLICATE_API_TOKEN: "test-token",
        ANTHROPIC_API_KEY: "test-key",
        CLERK_SECRET_KEY: "test-key",
        CF_REAL_TURN_TOKEN: "test-token",
        NPM_TOKEN: "test-token",
      },
      durableObjects: {
        CODE: 'Code',
        LIMITERS: 'CodeRateLimiter'
      },
    },
    include: ["tests/**/*.{test,spec}.{ts,js}", "src/**/*.{test,spec}.{ts,js}"],
    setupFiles: ["test-setup.ts"],
    poolOptions: {
      workers: {
        singleWorker: true,
        wrangler: {
          configPath: "./wrangler.toml",
        },
      },
    },
  },
});
