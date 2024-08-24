import react from "@vitejs/plugin-react";
import fs from "fs";
import handler from "serve-handler";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { importMap, importMapReplace } from "./src/modules";

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    tsConfigPaths(),
  ],
  base: "/",
  server: {
    port: 3000,
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
                const processedContent = processContent(body, `http://localhost:3000`);
                res.setHeader("Content-Type", proxyRes.headers["content-type"] || "application/octet-stream");
                res.setHeader("Cache-Control", "no-cache");
                res.end(processedContent);
              }
            });
          });
        },
      },
      "^(?!/live).*": {
        target: PROXY_BASE_URL,
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            const localPath = `${LOCAL_DIR}${req.url}`;
            fs.access(localPath, fs.constants.F_OK, (err) => {
              if (err) {
                // File doesn't exist, continue with proxy
                if (importMapFiles.includes(req.url!)) {
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
                } else {
                  proxyRes.pipe(res);
                }
              } else {
                // File exists, serve it locally
                if (!res.headersSent) {
                  handler(req, res, {
                    public: LOCAL_DIR,
                    headers: [
                      {
                        source: "**/*",
                        headers: [
                          { key: "Cache-Control", value: "no-cache" },
                        ],
                      },
                    ],
                  });
                }
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
  },
});
