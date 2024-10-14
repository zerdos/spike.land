import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
  })],

  appType: "spa",
  proxy: {
    "/@/": {
      target: "https://testing.spike.land/@/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
    "/live/": {
      target: "https://testing.spike.land/live/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/@"),
    },
  },
})
