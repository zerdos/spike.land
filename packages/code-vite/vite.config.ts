import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import path from "path";
import { defineConfig, Plugin } from "vite";

const __dirname = path.resolve();

// import { VitePWA } from 'vite-plugin-pwa'

// Custom plugin to handle hydrate.ts in dev mode

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^/live/.+/$": {
        target: "https://testing.spike.land",
        changeOrigin: true,
        rewrite: (path) => path,
        // autoRewrite: true,
      },
    },
  },
  appType: "spa",
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    //   VitePWA({
    //     registerType: 'autoUpdate',
    //     srcDir: 'src/src',
    //     filename: 'sw.ts',
    //     outDir: '/',
    // injectRegister: 'auto'
    //   })
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        hydrate: path.resolve(__dirname, "src/src/hydrate.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "hydrate" ? "hydrate.mjs" : "[name]-[hash].js";
        },
        chunkFileNames: "[name]-[hash].js",
      },
    },
    outDir: "dist",
  },
});
