import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./packages/spike-land-renderer/vitest.config.ts",
  "./packages/spike-land-renderer/vitest.config.mts",
  "./packages/code/vitest.config.ts",
  "./packages/spike.land/vitest.config.ts",
  "./packages/durable-objects/vitest.config.ts"
])
