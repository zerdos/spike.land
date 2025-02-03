import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { AppType, defineConfig, ProxyOptions } from "vite";
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
    const extension = filename.includes("worker") ? "js" : "mjs";
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
): Record<string, string> =>
  files.reduce<Record<string, string>>((aliases, { file }) => {
    // Remove the extension from the file path
    const aliasKey = file.replace(/\.[^.]+$/, "").replace(/^\/@\//, "@/");
    aliases[aliasKey] = `/${aliasKey}.mjs`;
    if (file.includes("worker")) {
      aliases[aliasKey] = `/${aliasKey}.js`;
    }
    return aliases;
  }, {});

const externalAliases = createExternalAliases(externalFiles);

// Merge importMap aliases into our externalAliases
Object.assign(externalAliases, importMap.imports);

// Rollup external files (values of our alias mapping)
const rollupExternal = [
  ...Object.values(externalAliases),
];

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
export default defineConfig(({ mode }) => {
  const isBuild = mode === "build";

  // Server proxy configuration
  const proxyConfig: Record<string, ProxyOptions> = {
    "^/live/.*/": {
      target: "https://testing.spike.land/live",
      changeOrigin: true,
      rewrite: (url: string) => {
        console.log("Proxying path:", url);
        return url.replace(/^\/live/, "");
      },
    },
    "/sw.js": {
      target: "https://testing.spike.land/sw.js",
      changeOrigin: true,
    },
    "/swVersion.mjs": {
      target: "https://testing.spike.land/swVersion.mjs",
      changeOrigin: true,
      rewrite: (url: string) => url.replace(/^\/swVersion.mjs/, ""),
    },
  };

  // Include additional proxy only when building, if needed
  if (isBuild) {
    proxyConfig["/@"] = {
      target: "https://testing.spike.land/@",
      changeOrigin: true,
      rewrite: (url: string) => url.replace(/^\/@/, ""),
    };
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
