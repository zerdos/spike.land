import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { injectHtml } from 'vite-plugin-html';
import importMap from './src/importmap.json'

console.log();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(),
  injectHtml({
    injectData:
    {
      injectScript: `
        <script async src="https://unpkg.com/es-module-shims@0.12.1/dist/es-module-shims.js"></script>
        
        <script type="importmap">
${JSON.stringify(importMap)}
</script>`
    },
  })
  ,],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['js/examples/rca.tsx']
    }
  }
})
