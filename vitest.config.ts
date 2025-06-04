import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      "./packages/spike-land-renderer/vitest.config.ts",
      "./packages/code/vitest.config.ts",
      "./packages/spike.land/vitest.config.ts",
      "./packages/durable-objects/vitest.config.ts"
    ]
  }
})
