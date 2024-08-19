import { promises as fs } from "fs";
import http from "http";
import handler from "serve-handler";
import { importMap, importMapReplace } from "./dist/modules.mjs";

const PORT = 3000;
const PROXY_BASE_URL = "https://testing.spike.land";
const LOCAL_DIR = "./dist";

const importMapFiles = Object.values(importMap.imports);
const importMapLibs = Object.keys(importMap.imports);

// Helper function to check if content needs replacement
const needsReplacement = (content) => importMapLibs.some(lib => content.includes(lib));

// Helper function to process content
const processContent = (content, baseUrl) => {
  const withoutBaseUrl = content.split(PROXY_BASE_URL + "/").join("/");
  if (withoutBaseUrl.startsWith("{")) return withoutBaseUrl;
  return needsReplacement(content) ? importMapReplace(withoutBaseUrl, baseUrl) : withoutBaseUrl;
};

// Proxy handler function
async function proxyHandler(request, response) {
  const proxyUrl = new URL(request.url, PROXY_BASE_URL);
  console.log("Proxying request to testing.spike.land:", proxyUrl);

  try {
    const proxyResponse = await fetch(proxyUrl);
    const content = await proxyResponse.text();
    const processedContent = processContent(content, `http://localhost:${PORT}`);

    // Set headers and status code
    for (const [key, value] of proxyResponse.headers.entries()) {
      if (key.includes("content-type")) {
        response.setHeader(key, value);
      }
    }
    response.setHeader("cache-control", "no-cache");
    response.statusCode = proxyResponse.status;

    // Send the response
    const buffer = Buffer.from(new TextEncoder().encode(processedContent));
    response.end(buffer);
  } catch (error) {
    console.error("Error in proxy handler:", error);
    response.statusCode = 500;
    response.end("Internal Server Error");
  }
}

// Local file handler function
async function localFileHandler(request, response, localPath) {
  if (localPath.endsWith(".mjs") && !localPath.includes("chunk") && !localPath.includes("worker")) {
    try {
      const content = await fs.readFile(localPath, "utf-8");
      let processedContent = processContent(content, `http://localhost:${PORT}`);
      response.setHeader("content-type", "application/javascript; charset=utf-8");
      response.setHeader("cache-control", "no-cache");
      response.statusCode = 200;
      if (request.url.startsWith("/@/")) {
        processedContent = importMapReplace(processedContent, `http://localhost:${PORT}`);
      }
      response.end(Buffer.from(new TextEncoder().encode(processedContent)));
    } catch (error) {
      console.error("Error handling local MJS file:", error);
      response.statusCode = 500;
      response.end("Internal Server Error");
    }
  } else {
    await handler(request, response, { public: LOCAL_DIR });
  }
}

// Main request handler
async function handleRequest(request, response) {
  console.log("Incoming request:", request.url);

  const localPath = `${LOCAL_DIR}${request.url}`;
  const spaRoutes = ["/start", "/live"];

  if (importMapFiles.includes(request.url)) {
    return proxyHandler(request, response);
  }

  try {
    await fs.access(localPath);
    return localFileHandler(request, response, localPath);
  } catch {
    if (spaRoutes.some(route => request.url.startsWith(route)) && !request.url.includes(".")) {
      return handler(request, response, {
        public: LOCAL_DIR,
        rewrites: [{ source: "**", destination: "/index.html" }],
      });
    }
    return proxyHandler(request, response);
  }
}

// Create and start the server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
