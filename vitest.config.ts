import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["hanging-process"],
    globalTeardown: "./vitest.globalTeardown.ts",
    projects: [
      "./packages/spike-land-renderer/vitest.config.ts",
      "./packages/code/vitest.config.ts",
      "./packages/spike.land/vitest.config.ts",
    ],
  },
});
