/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/@'),
    }
  },
  
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/setupTests.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    alias: {
      "@": resolve(__dirname, "./src/@"),
    },
    
    // threads: false // Disable threading to handle WASM imports
  },
});
