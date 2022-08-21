
import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import tsConfigRaw from "./tsconfig.json"
// import importmap from "./js/importmap.json";

export default defineConfig({
  esbuild: {
    jsxImportSource: "@emotion/react",
    jsxInject: "import {jsx} from \"@emotion/react\"",
    jsxFactory: 'jsx',
  },
  plugins: [react()],
  resolve: {
     alias:  {
      // "stream": "stream-browserify",
      // "path": new URL("./path/index.js", import.meta.url).toString(),
      // "react/jsx-runtime":  "./preact/jsx-runtime.mjs",
      // "react-dom/client":  "./preact/compat.mjs",
      // "react":   "./preact/compat.mjs",
      // "react-dom":  "./preact/compat.mjs",
    }
  },
  // server: {
  //   proxy: {
  //     // string shorthand
  //     '/': 'http://localhost:4567',
  //     // with options
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     },
  //     // with RegEx
  //     '^/fallback/.*': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/fallback/, '')
  //     },
  //     // Using the proxy instance
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       configure: (proxy, options) => {
  //         // proxy will be an instance of 'http-proxy'
  //       }
  //     },
  //     // Proxying websockets or socket.io
  //     '/socket.io': {
  //       target: 'ws://localhost:5173',
  //       ws: true
  //     }
  //   }
  // },
  plugins: [
  ],
});
