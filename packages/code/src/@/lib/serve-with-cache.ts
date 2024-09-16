import { importMap } from "@/lib/importmap-utils";
import { lookup } from "mime-types";
import { parse } from "node-html-parser";

// Adjusted addPrefixToImportMap function
function addPrefixToImportMap(imap: typeof importMap, prefix: string) {
  const updatedImports: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(imap.imports)) {
    // Ensure correct path concatenation
    const updatedValue = new URL(value.slice(1), "http://example.com" + prefix)
      .pathname;
    updatedImports[key] = updatedValue;
  }

  return { imports: updatedImports };
}

// Simplified getContentType function
function getContentType(path: string) {
  return lookup(path) || "application/octet-stream";
}

export const serveWithCache = (
  ASSET_HASH: string,
  files: { [key: string]: string },
  cacheToUse: () => Promise<Cache>
) => {
  let _fileCache: Cache | null | undefined;
  const fileCachePromise = cacheToUse()
    .then((cache) => {
      _fileCache = cache;
      return cache;
    })
    .catch((error) => {
      console.error("Cache creation failed:", error);
      _fileCache = null; // Indicate that cache is unavailable
    });

  const isAsset = (request: Request) => {
    const url = new URL(request.url);
    const pathname = url.pathname.startsWith("/")
      ? url.pathname.slice(1)
      : url.pathname;

    const assetPath = pathname.startsWith(ASSET_HASH + "/")
      ? pathname.slice(ASSET_HASH.length + 1)
      : pathname;

    return assetPath in files;
  };

  // Instance-specific in-flight requests map
  const inFlightRequests = new Map<string, Promise<Response>>();

  return {
    isAsset,
    serve: async (
      request: Request,
      assetFetcher: (
        req: Request,
        waitUntil: (p: Promise<unknown>) => void
      ) => Promise<Response>,
      waitUntil: (p: Promise<unknown>) => void
    ) => {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      if (!isAsset(request)) throw new Error("Not an asset");

      const url = new URL(request.url);
      const pathname = url.pathname.startsWith("/")
        ? url.pathname.slice(1)
        : url.pathname;

      const filePath = pathname.startsWith(ASSET_HASH + "/")
        ? pathname.slice(ASSET_HASH.length + 1)
        : pathname;

      if (!(filePath in files)) {
        return new Response("Not Found", { status: 404 });
      }

      if (_fileCache === undefined) {
        await fileCachePromise;
      }

      const cacheUrl = new URL(request.url);
      cacheUrl.pathname = "/" + files[filePath];
      const cacheKey = new Request(cacheUrl.toString());
      const cacheKeyString = cacheUrl.toString();

      let resp: Response | undefined;
      if (_fileCache) {
        // Attempt to find the response in the cache
        resp = await _fileCache.match(cacheKey);
        if (resp) return resp.clone();
      }

      if (inFlightRequests.has(cacheKeyString)) {
        // Wait for the in-flight fetch to complete
        const inFlightResponse = await inFlightRequests.get(cacheKeyString)!;
        return inFlightResponse.clone();
      }

      // Construct the new URL based on the files mapping
      const newUrl = new URL(request.url);
      newUrl.pathname = "/" + files[filePath];
      const req = new Request(newUrl.toString(), {
        method: request.method,
        headers: request.headers,
        redirect: request.redirect,
      });

      // Create a promise to represent the in-flight fetch
      const inFlightPromise = (async () => {
        let kvResp: Response;
        try {
          kvResp = await assetFetcher(req, waitUntil);
        } catch (error) {
          console.error("Asset fetch error:", error);
          inFlightRequests.delete(cacheKeyString);
          return new Response("Internal Server Error", { status: 500 });
        }

        if (!kvResp.ok) {
          inFlightRequests.delete(cacheKeyString);
          return kvResp;
        }

        // Clone headers and set appropriate Content-Type
        const headers = new Headers(kvResp.headers);
        const contentType = getContentType(filePath);
        headers.set("Content-Type", contentType);

        // Overwrite the Cache-Control header
        headers.set("Cache-Control", "public, max-age=604800, immutable");

        // Set security and CORS headers (review necessity)
        headers.set("Cross-Origin-Embedder-Policy", "require-corp");
        // headers.set("Access-Control-Allow-Origin", "*"); // Consider removing or adjusting

        let response: Response;

        // Modify index.html if necessary
        if (filePath === "index.html") {
          const htmlContent = await kvResp.text();
          const root = parse(htmlContent);

          // Update <base> tag
          const baseTag = root.querySelector('base[href="/"]');
          if (baseTag) {
            baseTag.setAttribute("href", `/${ASSET_HASH}/`);
          }

          // Update import map
          const scriptTag = root.querySelector('script[type="importmap"]');
          if (scriptTag) {
            scriptTag.set_content(
              JSON.stringify(addPrefixToImportMap(importMap, `/${ASSET_HASH}/`))
            );
          }

          const modifiedHtml = root.toString();

          response = new Response(modifiedHtml, {
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

        // Cache the response asynchronously if cache is available
        if (_fileCache) {
          waitUntil(
            _fileCache.put(cacheKey, response.clone()).catch((error) => {
              console.error("Cache put error:", error);
            })
          );
        }

        // Remove the in-flight request from the map
        inFlightRequests.delete(cacheKeyString);

        return response;
      })();

      // Store the in-flight promise
      inFlightRequests.set(cacheKeyString, inFlightPromise);

      // Await the in-flight fetch and clone the response before returning
      const response = await inFlightPromise;

      return response.clone();
    },
  };
};