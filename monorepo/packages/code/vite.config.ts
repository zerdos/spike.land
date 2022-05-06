import { defineConfig } from "vite";
import { importMaps } from "vite-plugin-import-maps";
import importmap from "./js/importmap.json";

export default defineConfig({
  plugins: [
    importMaps([
      {
        imports: {
         ...importmap.imports
        },
        scopes: {
          ...importmap.scopes
        }
      },
    ]),
  ],
})