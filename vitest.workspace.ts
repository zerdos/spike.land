import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./packages/durable-objects/vitest.config.ts",
  "./packages/code/vitest.config.ts",
  "./packages/hello-ai/vitest.config.mts",
  "./packages/spike-land-renderer/vitest.config.mts",
  // "./packages/spike.land/vitest.config.mts", // Removed incorrect entry
  "./packages/spike.land/vitest.config.ts"
])
