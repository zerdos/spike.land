import { promises as fs } from "fs";
import http from "http";
import handler from "serve-handler";
import { importMap, importMapReplace } from "./dist/modules.mjs";

const importMapFiles = Object.values(importMap.imports);
const importMapLibs = Object.keys(importMap.imports);
console.log(importMapFiles);

const proxyHandler = async (request, response) => {
  const proxyUrl = new URL(request.url, "https://testing.spike.land");
  console.log("Proxying request to testing.spike.land:", proxyUrl);

  // Fetch the resource from the proxy server
  const proxyResponse = await fetch(proxyUrl);

  const conte = await proxyResponse.text();

  let needReplace = false;
  importMapLibs.forEach((lib) => {
    if (conte.includes(lib)) {
      needReplace = true;
    }
  });
  const rep1 = conte.split("https://testing.spike.land/").join("/");
  const content = needReplace ? importMapReplace(rep1, "http://localhost:3000") : rep1;
  const textEncoder = new TextEncoder();
  const arrayBu = textEncoder.encode(content);

  // Set the response headers from the proxy response
  for (const [key, value] of proxyResponse.headers.entries()) {
    if (key.includes("content-type")) {
      response.setHeader(key, value);
    }
  }
  response.setHeader("cache-control", "no-cache");

  // Set the status code from the proxy response
  response.statusCode = proxyResponse.status;

  // Convert the blob to a buffer and send it
  const buffer = Buffer.from(arrayBu);
  response.end(buffer);
};

const server = http.createServer(async (request, response) => {
  console.log("Incoming request:", request.url);

  if (importMapFiles.includes(request.url)) {
    console.log("IMPORTMAP");
    return await proxyHandler(request, response);
  }

  const localPath = "./dist" + request.url;
  const spaRoutes = ["/start", "/live"];

  // Check if it's an SPA route
  // Conditions:
  // 1. URL doesn't include 'swVersion'
  // 2. URL starts with one of the SPA routes
  // 3. URL doesn't include a file extension (i.e., no '.')

  try {
    // Check if the file exists locally
    console.log("chaek if it is local");
    await fs.access(localPath);
    console.log("trying to serve locally");
    if (localPath.endsWith(".mjs") && localPath.indexOf("chunk") === -1 && localPath.indexOf("worker") === -1) {
      const textfile = await fs.readFile(localPath);
      const str = await textfile.toString();

      let needReplace = false;
      importMapLibs.forEach((lib) => {
        if (content.includes(lib)) {
          needReplace = true;
        }
      });

      const imapped = needReplace ? importMapReplace(str, "http://localhost:3000") : str;
      const arrBuff = new TextEncoder().encode(imapped);
      const buffer = Buffer.from(arrBuff);

      response.setHeader("content-type", "application/javascript; charset=utf-8");
      response.setHeader("cache-control", "no-cache");

      // Set the status code from the proxy response
      response.statusCode = 200;
      return response.end(buffer);
    }

    console.log("File found locally:", localPath);
    return await handler(request, response, { public: "./dist" });
    console.log("Served local file:", request.url);
  } catch {
    // If the file doesn't exist locally, throw an error to trigger the proxy
    return await proxyHandler(request, response);
  }

  if (
    spaRoutes.some(route => request.url.startsWith(route))
    && !request.url.includes(".")
  ) {
    console.log("Handling SPA route:", request.url);
    // Serve index.html for SPA routes
    return handler(request, response, {
      public: "./dist",
      rewrites: [{ source: "**", destination: "/index.html" }],
    });
  }

  try {
    // Attempt to serve from local ./dist/ folder

    // Serve the local file
  } catch (error) {
    // If file not found locally, proxy to https://testing.spike.land/
    await proxyHandler(request, response);

    // Forward the proxy server's response
    // response.writeHead(proxyResponse.status, proxyResponse.headers);
    // proxyResponse.body.pipe(response);
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
