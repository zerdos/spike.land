import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ["tests/**/*.{test,spec}.{ts,js}", "src/**/*.{test,spec}.{ts,js}"],
    setupFiles: ["test-setup.ts"],
    reporters: ["dot"]
  },
  esbuild: {
    target: 'esnext',
  }
});
