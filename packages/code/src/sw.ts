// Import necessary scripts and functions
import { resetCSS } from "./getResetCss";
import HTML from "./index.html";
import { ICodeSession } from "./makeSess";
import { md5 } from "./md5";
import { mkdir, readFile, stat, writeFile } from "./memfs";
import { build, init, transpile } from "./shared";

declare const self:
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };

importScripts("/swVersion.js");

let started = false;

// Constants for cache names
const FILE_CACHE_NAME = "file-cache-";
const GENERAL_CACHE_NAME = "general-cache";

// Initialize the shared worker when receiving a message of type "sharedworker"
self.onmessage = async (event: ExtendableMessageEvent) => {
  if (event.data.type === "sharedworker") {
    globalThis.sharedWorker = event.data;
    const port = event.data.sharedWorkerPort;
    port.start();

    init(self.swVersion, port);
    started = true;

    // Start periodic check
    setInterval(checkAssetHash, 10 * 60 * 1000); // Check every 10 minutes
  }
};

async function fetchAssetHash(): Promise<string> {
  try {
    const response = await fetch("/files.json");
    const data = await response.json<{ ASSET_HASH: string }>();
    return data.ASSET_HASH;
  } catch (error) {
    console.error("Failed to fetch ASSET_HASH:", error);
    return "";
  }
}

// Check if ASSET_HASH has changed and update cache if necessary
async function checkAssetHash() {
  const newAssetHash = await fetchAssetHash();
  if (self.swVersion !== newAssetHash) {
    console.log("ASSET_HASH changed. Updating cache...");
    await updateCache(newAssetHash);
    self.swVersion = newAssetHash;
  }
}

// Update cache with new version
async function updateCache(newAssetHash: string) {
  const oldFileCacheName = FILE_CACHE_NAME + self.swVersion;
  const newFileCacheName = FILE_CACHE_NAME + newAssetHash;

  // Open both old and new file caches
  const [oldFileCache, newFileCache] = await Promise.all([
    caches.open(oldFileCacheName),
    caches.open(newFileCacheName),
  ]);

  // Copy all files from old cache to new cache
  const oldKeys = await oldFileCache.keys();
  await Promise.all(
    oldKeys.map(async (request) => {
      const response = await oldFileCache.match(request);
      if (response) {
        await newFileCache.put(request, response);
      }
    }),
  );

  // Delete the old file cache
  await caches.delete(oldFileCacheName);

  console.log("File cache updated successfully");
}

const isFileInList = (pathname: string): boolean => {
  return pathname.slice(1) in self.files;
};
// Put the response in the appropriate cache
// Put the response in the appropriate cache
const putInCache = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const url = new URL(request.url);
  const cacheName = isFileInList(url.pathname)
    ? FILE_CACHE_NAME + self.swVersion
    : GENERAL_CACHE_NAME;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async (request: Request): Promise<Response> => {
  if (!request.url.includes("/live/")) {
    const url = new URL(request.url);
    const cacheName = isFileInList(url.pathname)
      ? FILE_CACHE_NAME + self.swVersion
      : GENERAL_CACHE_NAME;
    const cache = await caches.open(cacheName);
    const responseFromCache = await cache.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  }
  try {
    const responseFromNetwork = await fetch(request);
    if (responseFromNetwork.ok && responseFromNetwork.status === 200) {
      await putInCache(request, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  } catch (error) {
    console.error(`Failed to fetch ${request.url}:`, error);
    return createErrorResponse("Failed to fetch resource", 500);
  }
};

// Handle requests to the "live" path
const fakeBackend = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    if (request.method === "POST") {
      return fetch(request);
    }

    const pathName = url.pathname;
    const fileStat = await stat(pathName);
    if (fileStat !== null) {
      const resp = await readFile(pathName);
      return createResponse(resp, "application/javascript");
    }

    const paths = url.pathname.split("/");
    if (paths[1] === "live") {
      const codeSpacePath = paths[2];
      const isFile = codeSpacePath.includes(".");
      const codeSpace = isFile ? codeSpacePath.split(".")[0] : codeSpacePath;

      // Fetch the session data for the codeSpace
      const session = await fetchSession(url.origin, codeSpace);
      if (!session) {
        return createErrorResponse("Failed to fetch session data", 500);
      }

      const { code, css, html, i } = session;

      // Serve the built JavaScript file
      if (codeSpacePath.endsWith(".mjs")) {
        const resp = await build({
          codeSpace,
          origin: url.origin,
          format: "esm",
        });
        return createResponse(resp, "application/javascript");
      }

      if (["/bundle"].some((suffix) => url.pathname.endsWith(suffix))) {
        const respText = createBundleResponse(
          HTML,
          css,
          codeSpace,
          i.toString(),
          html,
        );
        return createResponse(respText, "text/html");
      }

      // Handle transpiling and serving the JavaScript file
      if (url.pathname.startsWith(`/live/${codeSpace}/index.js`) && started) {
        const trp = await transpileAndServe(url.origin, codeSpace, code);
        return createResponse(trp, "application/javascript");
      }

      if (url.pathname.startsWith(`/live/${codeSpace}/index.mjs`)) {
        const trp = await readFile(`/live/${codeSpace}/index.mjs`).catch(
          async () => fetch(`${url.origin}/live/${codeSpace}/index.mjs`).then((x) => x.text()),
        );
        return createResponse(trp, "application/javascript");
      }
    }

    return cacheFirst(request);
  } catch (err) {
    console.error("Error handling request:", err);
  }
  return fetch(request);
};

const fetchSession = async (
  origin: string,
  codeSpace: string,
): Promise<ICodeSession | null> => {
  try {
    const response = await fetch(`${origin}/live/${codeSpace}/session.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as ICodeSession;
  } catch (error) {
    console.error("Error fetching session data:", error);
    return null;
  }
};

const createResponse = (body: string, contentType: string): Response => {
  return new Response(body, {
    headers: {
      "Access-Control-Allow-Origin": location.origin, // Restrict CORS to same origin
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cache-Control": "no-cache",
      "Content-Type": `${contentType}; charset=UTF-8`,
      "content_hash": md5(body),
    },
  });
};

const createErrorResponse = (message: string, status: number): Response => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

const createBundleResponse = (
  HTML: string,
  css: string,
  codeSpace: string,
  i: string,
  html: string,
): string => {
  return HTML.replace("/**reset*/", resetCSS + css)
    .replace(
      "<script src=\"/swVersion.js\"></script>",
      `<script>window.swVersion = "${self.swVersion}"</script>`,
    )
    .replace("ASSET_HASH", self.swVersion)
    .replace(
      "<div id=\"root\"></div>",
      `<div id="root" style="height: 100%;"><div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">${html}</div></div>`,
    );
};

const transpileAndServe = async (
  origin: string,
  codeSpace: string,
  code: string,
): Promise<string> => {
  try {
    const trp = await Promise.race([
      fetch(`${origin}/live/${codeSpace}/index.js`).then((x) => x.text()),
      (async () => {
        const trp = await transpile({
          code,
          originToUse: location.origin,
        });
        await mkdir(`/live/${codeSpace}`);
        await writeFile(`/live/${codeSpace}/index.js`, trp);
        return trp;
      })(),
    ]);
    return trp;
  } catch (error) {
    console.error("Error transpiling and serving:", error);
    return createErrorResponse("Failed to transpile and serve", 500).text();
  }
};

// Handle fetch events
self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fakeBackend(event.request));
});

// Clear old caches
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith(FILE_CACHE_NAME)
            && cacheName !== FILE_CACHE_NAME + self.swVersion
          ) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        }),
      );
    }),
  );
});
