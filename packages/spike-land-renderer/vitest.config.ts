import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import path from "path";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.toml",
        },
      },
    },
  },
  resolve: {
    alias: {
      // Mock Node.js built-in modules
      'node:tls': path.resolve(__dirname, '__mocks__/tls.js'),
      'node:net': path.resolve(__dirname, '__mocks__/net.js'),
      'node:stream': path.resolve(__dirname, '__mocks__/stream.js'),
      'node:util': path.resolve(__dirname, '__mocks__/util.js'),
      'node:events': path.resolve(__dirname, '__mocks__/events.js'),
      'ws': path.resolve(__dirname, '__mocks__/ws.js'),
    },
  },
});