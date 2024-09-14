import { importMap } from "@/lib/importmap-utils";

function addPrefixToImportMap(imap: typeof importMap, prefix: string) {
  const updatedImports: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(imap.imports)) {
    updatedImports[key] = prefix + value;
  }

  return { imports: updatedImports };
}

// Utility function to determine the Content-Type based on the file extension
function getContentType(path: string) {
  const ext = path.split(".").pop()?.toLowerCase();
  const mimeTypes = {
    "html": "text/html",
    "css": "text/css",
    "js": "application/javascript",
    "mjs": "application/javascript",
    "json": "application/json",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
  };

  if (!ext || !Object.hasOwn(mimeTypes, ext)) return "application/octet-stream";

  return mimeTypes[ext as keyof typeof mimeTypes];
}

// Initialize the cache outside of the request handler
let fileCachePromise = caches.open("file-cache-v2");

export const serveWithCache = (ASSET_HASH: string, files: {
  [key: string]: string;
}) => {
  const isAsset = (request: Request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;

    return pathname.startsWith("/" + ASSET_HASH) || !!files[pathname.slice(1)]
      || pathname.slice(ASSET_HASH.length + 2) in files;
  };

  return {
    isAsset,
    serve: async (
      request: Request,
      assetFetcher: (url: string) => Promise<Response>,
      waitUntil: (p: Promise<unknown>) => void,
    ) => {
      if (!isAsset(request)) throw new Error("Not an asset");

      const url = new URL(request.url);
      const pathname = url.pathname;

      // Correctly calculate the file path
      let filePath = pathname.startsWith("/" + ASSET_HASH)
        ? pathname.slice(ASSET_HASH.length + 1)
        : pathname.slice(1);
      if (!(filePath in files)) {
        filePath = pathname.slice(ASSET_HASH.length + 2);
      }

      const fileCache = await fileCachePromise;

      // Construct a unique cache key
      const cacheUrl = filePath === "index.html"
        ? new URL(ASSET_HASH + "/index.html", request.url)
        : new URL(request.url);
      cacheUrl.pathname = filePath;
      const cacheKey = new Request(cacheUrl.toString());

      // Attempt to find the response in the cache
      let resp = await fileCache.match(cacheKey);

      if (resp) return resp;

      // Properly construct the request for getAssetFromKV
      const newUrl = request.url.replace(`/${ASSET_HASH}`, "");
      const req = new Request(newUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: request.redirect,
      });

      let kvResp;
      try {
        kvResp = await assetFetcher(newUrl);
      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }

      if (!kvResp.ok) {
        return kvResp;
      }

      // Clone headers and set appropriate Content-Type
      const headers = new Headers(kvResp.headers);

      const contentType = getContentType(filePath);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }

      // Overwrite the Cache-Control header
      headers.set("Cache-Control", "public, max-age=604800, immutable");

      // Set security and CORS headers
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set("Access-Control-Allow-Origin", "*");

      let response;

      // Modify index.html if necessary
      if (filePath === "index.html") {
        const html = (await kvResp.text()).replace(
          `<base href="/">`,
          `<base href="/${ASSET_HASH}/">`,
        ).replace(
          `<script type="importmap"></script>`,
          `<script type="importmap">
          ${JSON.stringify(addPrefixToImportMap(importMap, `/${ASSET_HASH}`))}
          </script>`,
        );
        response = new Response(html, {
          status: kvResp.status,
          statusText: kvResp.statusText,
          headers,
        });
      } else {
        response = new Response(kvResp.body, {
          status: kvResp.status,
          statusText: kvResp.statusText,
          headers,
        });
      }

      // Cache the response asynchronously
      waitUntil(fileCache.put(cacheKey, response.clone()));

      return response;
    },
  };
};
