import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/live/zoli/session': {
        target: 'https://testing.spike.land',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
    },
  },
  appType: 'spa',
  plugins: [react({
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
})
