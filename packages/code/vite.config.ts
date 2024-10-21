import path from "path"
import { defineConfig, ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react-swc'
// const newLocal = /^\/api/
import {importMap} from "./src/@/lib/importmap-utils"

// const createProxyServer

const importMapProxy = Object.values(importMap.imports).reduce((acc, key: string) => {
  acc[key] = {
    target: 'https://testing.spike.land'+ key,
    changeOrigin: true,
    rewrite: (path) => path.replace(key, ""),
  };
  return acc;
}, {} as Record<string, ProxyOptions>);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
  })],
 
  build: {
    
    rollupOptions: {
        
        external: ["/start.mjs", "/swVersion.mjs"],
      
      
    },
    outDir: "dist-vite",
  },

  appType: "spa",
  
  assetsInclude: [

    "src/index.html",
    // "src/assets/app.css",
  ],

  server: {
   proxy: {
      "/@/": {
        target: "https://testing.spike.land/@",
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
      '/start.mjs': {
        target: "https://testing.spike.land/start.mjs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/start.mjs/, ""),
      },
      '/swVersion.mjs': {
        target: "https://testing.spike.land/swVersion.mjs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/swVersion.mjs/, ""),
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
