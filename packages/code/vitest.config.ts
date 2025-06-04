/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/@"),
      "lib": resolve(__dirname, "./src/@/lib"),
      "components": resolve(__dirname, "./src/components"),
      "hooks": resolve(__dirname, "./src/hooks"),
      "services": resolve(__dirname, "./src/services"),
      "types": resolve(__dirname, "./src/types"),
      "utils": resolve(__dirname, "./src/utils"),
      "workers": resolve(__dirname, "./src/@/workers"),
      "routes": resolve(__dirname, "./src/routes"),
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["src/**/*.d.ts"],
    alias: {
      "@": resolve(__dirname, "./src/@"),
      "lib": resolve(__dirname, "./src/@/lib"),
      "components": resolve(__dirname, "./src/components"),
      "hooks": resolve(__dirname, "./src/hooks"),
      "services": resolve(__dirname, "./src/services"),
      "types": resolve(__dirname, "./src/types"),
      "utils": resolve(__dirname, "./src/utils"),
      "workers": resolve(__dirname, "./src/@/workers"),
      "routes": resolve(__dirname, "./src/routes"),
    },
    silent: false,
    reporters: [["default", { summary: false }]],
  },
});
