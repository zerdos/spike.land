import path from "path";
import { defineConfig, ProxyOptions, AppType } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { importMap } from "./src/@/lib/importmap-utils";
import fs from "fs";
// import preactPackageJson from "preact/package.json" assert { type: "json" };

const externalFiles =  fs.readdirSync(path.resolve(__dirname, "./src/@/external"));

const externalRollup = externalFiles.map((file) => {
  return {
    type: "external",
    file: "/@/external/" + file,
  };
}).map((file) => {
  // replace .ts/tsx with .mjs
  const fileParts = file.file.split(".");
  fileParts.pop();
  fileParts.push("mjs");
  file.file = fileParts.join(".");
  return file;
}
);

// const preactCompat = `/preact@${preactPackageJson.version}/compat`;

//***


// {
//   "@/external/monaco-editor": "/@/external/monaco-editor.mjs",
// "@/external/CodeBlock": "/@/external/CodeBlock.mjs",
// "@/external/Markdown": "/@/external/Markdown.mjs",
// "@/external/icons": "/@/external/icons.mjs",
// "@/external/lucideReact": "/@/external/lucideReact.mjs",
// "@/external/reactSyntaxHighlighter": "/@/external/reactSyntaxHighlighter.mjs",
// "@/external/reactSyntaxHighlighterPrism": "/@/external/reactSyntaxHighlighterPrism.mjs",
// "@/external/start-ace": "/@/external/start-ace.mjs",
// "@/external/use-local-storage": "/@/external/use-local-storage.mjs",
// "@/external/worker-mock": "/@/external/worker-mock.mjs",
// "@/external/record-rtc": "/@/external/record-rtc.mjs"
// }

const externalAliases = externalRollup.reduce((acc: Record<string, string>, file) => {

  //without extension and slash at the beginning

  const fileParts = file.file.split(".");
  fileParts.pop();
  file.file = fileParts.join(".");
  file.file = file.file.replace("/@/external/", "@/external/");
  acc[file.file] = '/'+file.file+".mjs";


//  acc[file.file] = file.file;
  return acc;
}
, {});


const rollupExternal = Object.values(externalAliases);

// Create proxy configuration from import map
const importMapProxy: Record<string, ProxyOptions> = {};
Object.entries(importMap.imports).forEach(([key, value]) => {
  importMapProxy[key] = {
    target: 'https://testing.spike.land' + value,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(key, ""),
  };
});

// https://vitejs.dev/config/
const config = defineConfig({ 
  plugins: [react({
    jsxImportSource: "@emotion/react",
  })],
 
  build: {
    rollupOptions: {

        external: [
          "/start.mjs",
          "/swVersion.mjs",
          ...Object.keys(importMap.imports),  
         ...rollupExternal,
        ],
    },
    outDir: "dist-vite",
  },

  appType: "spa" as AppType,
  
  assetsInclude: [
    "src/index.html",
  ],

  server: {
   proxy: {
      "/@": {
        target: "https://testing.spike.land/@",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/@/, ""),
      },
      '^/live/.*/': {
        target: "https://testing.spike.land/live",
        changeOrigin: true,
        rewrite: (path: string) => {
          console.log('Proxying path:', path);
          return path.replace(/^\/live/, "");
        },
      },
      '/sw.js': {
        target: "https://testing.spike.land/sw.js",
        changeOrigin: true,
      },
      '/start.mjs': {
        target: "https://testing.spike.land/start.mjs",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/start.mjs/, ""),
      },
      '/swVersion.mjs': {
        target: "https://testing.spike.land/swVersion.mjs",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/swVersion.mjs/, ""),
      },
      // ...importMapProxy,
    },
  },

  resolve: {
    alias: {
  ...externalAliases,
      "@": path.resolve(__dirname, "./src/@"),
      // ...importMap.imports
    },
  },
});


console.log("Vite config:", JSON.stringify(config, null, 2));
// console.log("Import map proxy:", JSON.stringify(importMapProxy, null, 2));
console.log("Rollup external:", JSON.stringify(rollupExternal, null, 2));
console.log("External aliases:", JSON.stringify(externalAliases, null, 2)); 

export default config;  

// defineConfig(config); 