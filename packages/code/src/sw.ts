// Import necessary scripts and functions

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
const ASSET_HASH_KEY = "current-asset-hash";
const MY_CACHE_NAME = "my-cache";

// Open 'my-cache'
caches.open(MY_CACHE_NAME).then(() => {
  console.log("My cache opened successfully");
});

const BC = new BroadcastChannel("sw-channel");
BC.onmessage = () => {
  checkAssetHash();
};

// Initialize the shared worker when receiving a message of type "sharedworker"
self.onmessage = async (event: ExtendableMessageEvent) => {
  if (event.data.type === "sharedworker") {
    globalThis.sharedWorker = event.data;
    const port = event.data.sharedWorkerPort;
    port.start();

    await checkAssetHash();
    init(self.swVersion, port);
    started = true;

    // Start periodic check
    setInterval(checkAssetHash, 5 * 60 * 1000); // Check every 5 minutes
  }
};

async function fetchAssetHash(): Promise<string> {
  try {
    const response = await fetch("/files.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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
  const cache = await caches.open(GENERAL_CACHE_NAME);
  const currentAssetHash = await cache.match(ASSET_HASH_KEY).then(response => response?.text()) || self.swVersion;

  if (currentAssetHash !== newAssetHash) {
    console.log("ASSET_HASH changed. Updating cache...");
    await updateCache(newAssetHash);
    await cache.put(ASSET_HASH_KEY, new Response(newAssetHash));
    self.swVersion = newAssetHash;
    self.clients.claim(); // Force clients to use the new service worker
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
        const newResponse = new Response(response.body, {
          headers: {
            ...response.headers,
            "Cache-Control": "no-cache", // Ensure the browser always revalidates
          },
        });
        await newFileCache.put(request, newResponse);
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
// Removed unused function

const cacheFirst = async (request: Request): Promise<Response> => {
  if (!request.url.includes("/live/")) {
    const url = new URL(request.url);
    const generalCache = await caches.open(GENERAL_CACHE_NAME);
    const currentAssetHash = await generalCache.match(ASSET_HASH_KEY).then(response => response?.text())
      || self.swVersion;
    const cacheName = isFileInList(url.pathname)
      ? FILE_CACHE_NAME + currentAssetHash
      : GENERAL_CACHE_NAME;
    const cache = await caches.open(cacheName);
    const responseFromCache = await cache.match(request);
    if (responseFromCache) {
      // Return cached response, but fetch and update cache in background
      cacheAndFetch(request);
      return responseFromCache;
    }
  }
  const response = await cacheAndFetch(request);
  return response;
};

const cacheAndFetch = async (request: Request): Promise<Response> => {
  try {
    // Fetch the resource from the network
    const networkResponse = await fetch(request);

    // Only cache GET requests
    if (request.method === "GET") {
      // Open the 'my-cache' cache
      const cache = await caches.open(MY_CACHE_NAME);

      // Add the fetched resource to the 'my-cache' cache
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // If the network fetch fails, try to get the resource from the 'my-cache' cache
    if (request.method === "GET") {
      const cache = await caches.open(MY_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    throw error;
  }
};

// Removed unused function

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

      const { code, css, html } = session;

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
  html: string,
): string => {
  return HTML.replace("/**reset*/", css).replace(
    `<div id="root"></div>`,
    `<div id="root">${html}</div>
    <script type="module">
      import('/live/${codeSpace}/index.js').then(m=>m.renderApp());
    </script>`,
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
self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      try {
        const response = await cacheFirst(event.request);
        if (response) {
          return response;
        }
        return await fakeBackend(event.request);
      } catch (error) {
        console.error("Error handling fetch:", error);
        return new Response("An error occurred", { status: 500 });
      }
    })(),
  );
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
