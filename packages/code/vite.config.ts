import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import type { AppType, ProxyOptions } from "vite";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";
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
      // Bundle analyzer - only in analyze mode
      ...(config.mode === "analyze" ? [visualizer({
        open: true,
        filename: "dist/bundle-analysis.html",
        gzipSize: true,
        brotliSize: true,
      })] : []),
      // Compression plugins
      compression({
        algorithm: "gzip",
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: false,
      }),
      compression({
        algorithm: "brotliCompress",
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: false,
      }),
      // Image optimization
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        jpg: {
          quality: 80,
        },
        webp: {
          lossless: false,
          quality: 80,
        },
      }),
      tailwindcss(),
      react({ jsxImportSource: "@emotion/react" }),
    ],
    build: {
      // Enable minification
      minify: "terser",
      // Enable source maps for production debugging (optional)
      sourcemap: false,
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: rollupExternal,
        output: {
          // Manual chunk splitting for optimal caching
          manualChunks: (id) => {
            // Split Monaco Editor into its own chunk
            if (id.includes("monaco-editor")) {
              return "monaco-editor";
            }
            // Split React and related libraries
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            // Split UI libraries (Radix UI, MUI, etc.)
            if (id.includes("@radix-ui") || id.includes("@mui")) {
              return "ui-vendor";
            }
            // Split Emotion CSS-in-JS
            if (id.includes("@emotion")) {
              return "emotion-vendor";
            }
            // Split AI/Assistant libraries
            if (id.includes("@ai-sdk") || id.includes("@assistant-ui") || id.includes("ai")) {
              return "ai-vendor";
            }
            // Split utility libraries
            if (id.includes("lodash") || id.includes("date-fns") || id.includes("clsx") || id.includes("tailwind")) {
              return "utils-vendor";
            }
            // Split heavy visualization/charting libraries
            if (id.includes("recharts") || id.includes("d3") || id.includes("framer-motion")) {
              return "visualization-vendor";
            }
            return undefined;
          },
          // Asset file naming for better caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split(".");
            const extType = info?.[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || "")) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (extType === "css") {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      // Increase the limit for inlining assets
      assetsInlineLimit: 4096,
      outDir: "dist-vite",
    },
    // Optimize dependencies pre-bundling
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@tanstack/react-router",
        "@emotion/react",
        "@emotion/styled",
      ],
      exclude: ["@vite/client", "@vite/env"],
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
