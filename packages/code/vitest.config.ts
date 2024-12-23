import react from "@vitejs/plugin-react-swc";

import tsConfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react() as unknown as any, tsConfigPath()],
  test: {
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "./src/setupTests.ts", // if you have a setup file
    ],
  },
});
