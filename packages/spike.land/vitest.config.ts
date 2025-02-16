import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import path from "path";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: {
          configPath: "./wrangler.toml"
        }
      }
    }
  },
  resolve: {
    alias: {
      replicate: path.resolve(__dirname, '__mocks__/replicate.js'),
      'snakecase-keys': path.resolve(__dirname, 'node_modules/snakecase-keys/index.js')
    }
  }
});
