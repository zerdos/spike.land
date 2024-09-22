// import { importMap } from "@/lib/importmap-utils";
import { md5 } from "@/lib/md5";
import { routes } from "@/lib/routes";

import { lookup } from "mime-types";

// Simplified getContentType function
function getContentType(path: string) {
  return lookup(path) || "application/octet-stream";
}

export const serveWithCache = (
  files: { [key: string]: string },
  cacheToUse: () => Promise<Cache>,
) => {
  const ASSET_HASH = files["ASSET_HASH"] || md5(JSON.stringify(files));

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
    // without search params
    const url = new URL(request.url);

    const pathname = url.pathname.startsWith("/")
      ? url.pathname.slice(1)
      : url.pathname;

    const assetPath = pathname.startsWith(ASSET_HASH + "/")
      ? pathname.slice(ASSET_HASH.length + 1)
      : pathname;

    return assetPath in files || assetPath in Object.values(files) || pathname in files
      || pathname in Object.values(files);
  };

  // Instance-specific in-flight requests map
  const inFlightRequests = new Map<string, Promise<Response>>();

  return {
    isAsset,
    shouldBeCached: (request: Request) => {
      if (isAsset(request)) {
        return true;
      }

      if (request.url.includes("/live/") || request.url.includes("/my-cms/") || request.url.includes("/api/")) {
        return false;
      }

      const pathname = new URL(request.url).pathname;
      if (Object.hasOwn(routes, pathname)) {
        return false;
      }

      return true;
    },

    serve: async (
      request: Request,
      assetFetcher: (
        req: Request,
        waitUntil: (p: Promise<unknown>) => void,
      ) => Promise<Response>,
      waitUntil: (p: Promise<unknown>) => void,
    ) => {
      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      if (!isAsset(request)) {
        return new Response("Not Found", { status: 404 });
      }

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
      cacheUrl.pathname = files[filePath] || filePath;
      cacheUrl.search = "";
      cacheUrl.hash = "";

      const cacheKey = new Request(cacheUrl.toString());

      let resp: Response | undefined;
      if (_fileCache) {
        // Attempt to find the response in the cache
        resp = await _fileCache.match(cacheKey);
        if (resp) return resp.clone();
      }

      if (inFlightRequests.has(request.url)) {
        // Wait for the in-flight fetch to complete
        const inFlightResponse = await inFlightRequests.get(request.url)!;
        return inFlightResponse.clone();
      }

      // Construct the new URL based on the files mapping
      const newUrl = new URL(request.url);

      newUrl.pathname = "/" + (files[filePath] ? filePath : pathname);
      newUrl.pathname = newUrl.pathname.replace(ASSET_HASH + "/", "");

      const req = new Request(newUrl.toString(), {
        method: request.method,
        headers: request.headers,
        redirect: request.redirect,
      });

      // Create a promise to represent the in-flight fetch
      const inFlightPromise = (async (req: Request) => {
        let kvResp: Response;
        try {
          kvResp = await assetFetcher(req, waitUntil);
        } catch (error) {
          console.error("Asset fetch error:", error);
          inFlightRequests.delete(request.url);
          return new Response("Internal Server Error", { status: 500 });
        }

        if (!kvResp.ok) {
          inFlightRequests.delete(request.url);
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

        response = new Response(kvResp.body, {
          status: kvResp.status,
          statusText: kvResp.statusText,
          headers,
        });

        if (response.status !== 200) {
          inFlightRequests.delete(request.url);

          return response;
        }

        // Cache the response asynchronously if cache is available
        if (_fileCache && response.status === 200) {
          waitUntil(
            _fileCache.put(cacheKey, response.clone()).catch((error) => {
              console.error("Cache put error:", error);
            }),
          );
        }

        // Remove the in-flight request from the map
        inFlightRequests.delete(request.url);

        return response;
      })(req);

      // Store the in-flight promise
      inFlightRequests.set(request.url, inFlightPromise);

      // Await the in-flight fetch and clone the response before returning
      const response = await inFlightPromise;

      return response.clone();
    },
  };
};
