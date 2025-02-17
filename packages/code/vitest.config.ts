/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    alias: {
      "@": resolve(__dirname, "./src/@"),
    },
  },
});
