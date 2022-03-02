import { defineConfig } from "vite";
import { importMaps } from "vite-plugin-import-maps";
import importmap from "./js/importmap.json";
module.exports = defineConfig({
  
  plugins: [
    importMaps([importmap]),
  ],
  
});
