import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      '@spike-npm-land/code': path.resolve(__dirname, '../code/dist/modules.mjs'),
    },
  },
  test: {
    include: ['**/*.{test,spec}.{ts,js}'],
    globals: true,
    environment: 'node',
    setupFiles: ['./test-setup.ts'],
    reporters: ['dot'],
    coverage: {
      enabled: false,
    },
  },
});
