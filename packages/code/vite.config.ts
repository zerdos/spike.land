import react from "@vitejs/plugin-react";
import fs from "fs";
import handler from "serve-handler";
import { defineConfig } from "vite";
import { Connect } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { importMap, importMapReplace } from "./src/importMapUtils";

const PORT = 3000;
const PROXY_BASE_URL = "https://testing.spike.land";
const LOCAL_DIR = "./dist";

const importMapFiles = Object.values(importMap.imports);
const importMapLibs = Object.keys(importMap.imports);

const needsReplacement = (content: string): boolean => importMapLibs.some(lib => content.includes(lib));

const processContent = (content: string, baseUrl: string): string => {
  const withoutBaseUrl = content.split(PROXY_BASE_URL + "/").join("/");
  if (withoutBaseUrl.startsWith("{")) return withoutBaseUrl;
  return needsReplacement(content) ? importMapReplace(withoutBaseUrl, baseUrl) : withoutBaseUrl;
};

// const customMiddleware: Connect.NextHandleFunction = async (req, res, next) => {
//   const url = req.url!;
//   const localPath = `${LOCAL_DIR}${url}`;
//   const spaRoutes = ["/start", "/live"];

//   if (importMapFiles.includes(url)) {
//     try {
//       const proxyUrl = new URL(url, PROXY_BASE_URL);
//       const response = await fetch(proxyUrl);
//       const content = await response.text();
//       const processedContent = processContent(content, `http://localhost:${PORT}`);

//       res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
//       res.setHeader("Cache-Control", "no-cache");
//       res.end(processedContent);
//     } catch (error) {
//       console.error("Error in proxy handler:", error);
//       res.statusCode = 500;
//       res.end("Internal Server Error");
//     }
//     return;
//   }

//   try {
//     await fs.promises.access(localPath);
//     if (localPath.endsWith(".mjs") && !localPath.includes("chunk") && !localPath.includes("worker")) {
//       const content = await fs.promises.readFile(localPath, "utf-8");
//       let processedContent = processContent(content, `http://localhost:${PORT}`);
//       res.setHeader("Content-Type", "application/javascript; charset=utf-8");
//       res.setHeader("Cache-Control", "no-cache");
//       if (url.startsWith("/@/")) {
//         processedContent = importMapReplace(processedContent, `http://localhost:${PORT}`);
//       }
//       res.end(processedContent);
//     } else {
//       await handler(req, res, {
//         public: LOCAL_DIR,
//         headers: [
//           {
//             source: "**/*",
//             headers: [
//               { key: "Cache-Control", value: "no-cache" },
//             ],
//           },
//         ],
//       });
//     }
//   } catch {
//     if (spaRoutes.some(route => url.startsWith(route)) && !url.includes(".")) {
//       await handler(req, res, {
//         public: LOCAL_DIR,
//         rewrites: [{ source: "**", destination: "/index.html" }],
//       });
//     } else {
//       next();
//     }
//   }
// };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsConfigPaths({}),
  ],
  base: "/",
  assetsInclude: ["**/*.html"],
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  server: {
    port: PORT,
    // middleware: [customMiddleware],
    proxy: {
      "/api": {
        target: PROXY_BASE_URL,
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("proxyRes", (proxyRes, _req, res) => {
            let body = "";
            proxyRes.on("data", (chunk) => {
              body += chunk;
            });
            proxyRes.on("end", () => {
              if (!res.headersSent) {
                const processedContent = processContent(body, `http://localhost:${PORT}`);
                res.setHeader("Content-Type", proxyRes.headers["content-type"] || "application/octet-stream");
                res.setHeader("Cache-Control", "no-cache");
                res.end(processedContent);
              }
            });
          });
        },
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
      },
    },
  },
});
