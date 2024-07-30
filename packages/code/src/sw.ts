// Purpose: Service worker to cache files and update cache when ASSET_HASH changes
// Remove the duplicate declaration of 'self'
const sw = self as unknown as ServiceWorkerGlobalScope
& { swVersion: string }
& { files: { [key: string]: string }; fileCacheName: string } ;

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

async function fetchAssetHash(): Promise<string> {
  try {
    const response = await fetch("/assetHash.json", { cache: "no-store" });
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
  const assetHashReq = new Request(ASSET_HASH_KEY);
  const currentAssetHash = await cache.match(assetHashReq).then((response) => response?.text());

  if (currentAssetHash !== newAssetHash) {
    console.log("ASSET_HASH changed. Updating cache...");
    await updateCache(newAssetHash);
    await cache.put(assetHashReq, new Response(newAssetHash));
    sw.swVersion = newAssetHash;
    // Force clients to use the new service worker
  }
}

// Update cache with new version
async function updateCache(newAssetHash: string) {
  if (newAssetHash === sw.swVersion) return;

  const oldFileCacheName = FILE_CACHE_NAME + sw.swVersion;
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
  return pathname.slice(1) in sw.files;
};
// Put the response in the appropriate cache
// Put the response in the appropriate cache
// Removed unused function

const cacheFirst = async (request: Request): Promise<Response> => {
  if (!request.url.includes("/live/")) {
    const url = new URL(request.url);
    const generalCache = await caches.open(GENERAL_CACHE_NAME);
    const currentAssetHash = await generalCache.match(ASSET_HASH_KEY).then((response) => response?.text());
    const cacheName = isFileInList(url.pathname)
      ? FILE_CACHE_NAME + currentAssetHash
      : GENERAL_CACHE_NAME;
    const cache = await caches.open(cacheName);
    const responseFromCache = await cache.match(request);
    if (responseFromCache && responseFromCache.ok) {
      // Return cached response, but fetch and update cache in background
      // cacheAndFetch(request);
      return responseFromCache;
    }
    const response = await fetch(request);
    if (response.ok && request.method === "GET") {
      await cache.put(request, response.clone());
    }
    return response;
  }

  return fetch(request);
};

const createErrorResponse = (message: string, status: number): Response => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

// Handle fetch events
sw.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        const response = await cacheFirst(event.request);
        if (response) {
          return response;
        }
        return fetch(event.request);
      } catch (error) {
        console.error("Error handling fetch:", error);
        return new Response("An error occurred", { status: 500 });
      }
    })(),
  );
});

sw.addEventListener("install", (event) => {
  event.waitUntil(
    checkAssetHash().then(() => sw.skipWaiting()),
  );
});

// Clear old caches
sw.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith(FILE_CACHE_NAME)
            && cacheName !== FILE_CACHE_NAME + sw.swVersion
          ) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        }),
      );
    }).then(() => sw.clients.claim()),
  );
});
