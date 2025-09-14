import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "frontend"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "frontend/index.html"),
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
      "/ws": {
        target: "ws://localhost:8787",
        ws: true,
      },
    },
  },
});
