import react from "@vitejs/plugin-react";
import tsConfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsConfigPath()],
  test: {
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "./src/setupTests.ts", // if you have a setup file
    ],
    testTimeout: 1000    
  },
});
