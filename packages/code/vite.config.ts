import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import type { AppType, ProxyOptions } from "vite";
import { defineConfig } from "vite";
import { importMap } from "./src/@/lib/importmap-utils";

/* ========================================================
   Utility: Get external files with proper extension
   */
const getExternalFiles = (dir: string) => {
  const directoryPath = path.resolve(__dirname, `./src/${dir}`);
  return fs.readdirSync(directoryPath).map((filename) => {
    // Use path.parse for clearer filename handling
    const { name } = path.parse(filename);
    // If the filename includes "worker", use .js; otherwise, .mjs
    const extension = "mjs"; // filename.includes("worker") ? "js" : "mjs";
    return { type: "external", file: `/${dir}/${name}.${extension}` };
  });
};

/* ========================================================
   Build external file list and alias mappings
   ======================================================== */
const externalDirs = ["@/workers", "@/external"];
const externalFiles = externalDirs.map(getExternalFiles).flat();

const createExternalAliases = (
  files: Array<{ file: string; }>,
  isBuild = true,
): Record<string, string> =>
  files.reduce<Record<string, string>>((aliases, { file }) => {
    // Remove the extension from the file path
    const aliasKey = file.replace(/\.[^.]+$/, "").replace(/^\/@\//, "@/");
    if (isBuild) {
      aliases[aliasKey] = `/${aliasKey}.mjs`;
      // if (file.includes("worker")) {
      //   aliases[aliasKey] = `/${aliasKey}.js`;
      // }
    }
    return aliases;
  }, {});

/* ========================================================
   (Optional) Utility: Create proxy config from importMap
   ======================================================== */
// const createImportMapProxy = (imports: Record<string, string>): Record<string, ProxyOptions> => {
//   const proxy: Record<string, ProxyOptions> = {};
//   for (const [key, value] of Object.entries(imports)) {
//     proxy[key] = {
//       target: `https://testing.spike.land${value}`,
//       changeOrigin: true,
//       rewrite: (url: string) => url.replace(key, ""),
//     };
//   }
//   return proxy;
// };
// const importMapProxy = createImportMapProxy(importMap.imports);

/* ========================================================
   Vite Configuration
   ======================================================== */
export default defineConfig((config) => {
  const isBuild = config.command === "build";
  console.log("Building:", { config, isBuild });

  const externalAliases = createExternalAliases(externalFiles, isBuild);

  // Merge importMap aliases into our externalAliases
  if (isBuild) Object.assign(externalAliases, importMap.imports);

  // Rollup external files (values of our alias mapping)
  const rollupExternal = isBuild
    ? [
      ...Object.values(externalAliases),
    ]
    : [];

  // Server proxy configuration
  const proxyConfig: Record<string, ProxyOptions> = {
    // Proxy /live/*/filename requests to the local worker server
    // But NOT /live/username (without trailing slash or filename)
    "^/live/[^/]+/.+": {
      target: "http://localhost:8787",
      changeOrigin: true,
      rewrite: (url: string) => {
        console.log("Proxying path:", url);
        return url; // Keep the full path including /live/
      },
    },
    "/reactMod.mjs": {
      target: "http://localhost:8787/reactMod.mjs",
      changeOrigin: true,
      rewrite: (url: string) => url.replace(/^\/reactMod.mjs/, ""),
    },
    "/chunk-[a-z0-9]+.mjs": {
      target: "http://localhost:8787",
      changeOrigin: true,
      rewrite: (url: string) => {
        console.log("Proxying chunk:", url);
        return url; // Keep the full path including /chunk-*
      },
    },
    "/sw.js": {
      target: "http://localhost:8787/sw.js",
      changeOrigin: true,
    },
    "/swVersion.js": {
      target: "http://localhost:8787/swVersion.js",
      changeOrigin: true,
    },
    "/swVersion.mjs": {
      target: "http://localhost:8787/swVersion.mjs",
      changeOrigin: true,
      rewrite: (url: string) => url.replace(/^\/swVersion.mjs/, ""),
    },
  };

  // Include additional proxy only when building, if needed
  if (!isBuild) {
    // Commented out during development to allow Vite internals to work
    // proxyConfig["/@"] = {
    //   target: "https://testing.spike.land/@",
    //   changeOrigin: true,
    //   rewrite: (url: string) => url.replace(/^\/@/, ""),
    // };
  }

  return {
    plugins: [
      TanStackRouterVite(),
      // Uncomment the visualizer if you need bundle analysis:
      // visualizer({
      //   open: true,
      //   filename: "dist/stats.html",
      // }),
      tailwindcss(),
      react({ jsxImportSource: "@emotion/react" }),
    ],
    experimental: {
      skipSsrTransform: true,
    },
    build: {
      rollupOptions: {
        external: rollupExternal,
      },
      outDir: "dist-vite",
    },
    appType: "spa" as AppType,
    assetsInclude: [],
    server: {
      proxy: proxyConfig,
    },
    resolve: {
      alias: {
        ...externalAliases,
        "@": path.resolve(__dirname, "./src/@"),
      },
    },
  };
});
