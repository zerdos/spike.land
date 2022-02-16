import  { defineConfig } from 'vite';
import { importMaps } from 'vite-plugin-import-maps';
import imaps from "./js/importmap.json"
module.exports = defineConfig({
  plugins: [
    importMaps([{...imaps}]),
  ],
})