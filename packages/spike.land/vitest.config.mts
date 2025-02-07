import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.toml" },
      }
    },
    alias: {
      "@spike-npm-land/code": "./dist/modules.mjs",
    },
    include: ["**/*.{test,spec}.{ts,js}"],
    setupFiles: ["./test-setup.ts"],
    reporters: ["dot"],
    coverage: {
      enabled: false,
    },
  },
});


// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineWorkersConfig({
//   resolve: {
//     alias: {
//       '@spike-npm-land/code': path.resolve(__dirname, '../code/dist/modules.mjs'),
//     },
//   },
//   test: {
//     include: ['**/*.{test,spec}.{ts,js}'],
//     globals: true,
//     environment: 'node',
//     setupFiles: ['./test-setup.ts'],
//     reporters: ['dot'],
//     coverage: {
//       enabled: false,
//     },
//   },
// });
