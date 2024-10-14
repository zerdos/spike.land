import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// const newLocal = /^\/api/
import {importMap} from "./src/@/lib/importmap-utils.ts"

// const createProxyServer

const importMapProxy = Object.keys(importMap.imports).reduce((acc, key: string) => {
  acc[`/${key}`] = {
    target: importMap.imports[key],
    changeOrigin: true
  };
  return acc;
}, {} as Record<string, ProxyOptions>);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
  })],

  appType: "spa",

  server: {
   proxy: {
      "/@/": {
        target: "https://testing.spike.land/@/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/@/, ""),
      },
        '^/live/.*/': {
        target: "https://testing.spike.land/live",
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Proxying path:', path);
          return path.replace(/^\/live/, "");
        }
      },
      '/sw.js': {
        target: "https://testing.spike.land/sw.js",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/sw.js/, ""),
      },


      ...importMapProxy 
    },
  },


  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/@"),
    },
  },
})
