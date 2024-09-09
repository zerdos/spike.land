const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { registerRoute } from "workbox-routing";
import { CacheOnly, StaleWhileRevalidate } from "workbox-strategies";

importScripts("/swVersion.js");

const CURRENT_CACHE_NAME = `file-cache-${sw.swVersion}`;
const ESM_CACHE_NAME = "esm-cache-124";

// Create a reverse mapping of hashed filenames to their original names
const hashedToOriginal = new Map(
  Object.entries(sw.files).map(([original, hashed]) => [hashed, original]),
);

// Regular expression to match filenames with hash-like patterns
const hashPattern = /\.[a-f0-9]{8,}\.(?:js|css|mjs|ts|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i;

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(cacheName =>
    (cacheName.startsWith("file-cache-") && cacheName !== CURRENT_CACHE_NAME)
    || (cacheName.startsWith("esm-cache-") && cacheName !== ESM_CACHE_NAME)
  );
  return Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));
}

async function copyMatchingFiles(oldCache: Cache, newCache: Cache) {
  const oldFileJsonResponse = await oldCache.match("/files.json");
  if (!oldFileJsonResponse) return;

  const oldFiles: typeof sw.files = await oldFileJsonResponse.json();
  const addedFiles = new Set(["files.json"]);

  await Promise.all(
    Object.entries(sw.files).map(async ([original, hashed]) => {
      if (addedFiles.has(hashed)) return;

      const oldHashed = oldFiles[original];
      if (oldHashed === hashed) {
        const oldResponse = await oldCache.match(`/${oldHashed}`);
        if (oldResponse) {
          await newCache.put(`/${hashed}`, oldResponse.clone());
          addedFiles.add(hashed);
        }
      }
    }),
  );
}

sw.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CURRENT_CACHE_NAME);
      const cacheNames = await caches.keys();
      const fileCaches = cacheNames.filter(cacheName =>
        cacheName.startsWith("file-cache-") && cacheName !== CURRENT_CACHE_NAME
      );

      for (const oldCacheName of fileCaches) {
        const oldCache = await caches.open(oldCacheName);
        await copyMatchingFiles(oldCache, cache);
      }

      await cache.put("/files.json", new Response(JSON.stringify(sw.files)));
      await sw.clients.claim();
      await cleanupOldCaches();

      return cache;
    } catch (e) {
      console.error("Error in activate event:", e);
      return null;
    }
  })());
});

sw.addEventListener("message", async (event) => {
  if (event.data === "skipWaiting") {
    await sw.skipWaiting();
  }
});

sw.addEventListener("install", (event) => {
  event.waitUntil(cleanupOldCaches());
});

const cacheOnlyStrategy = new CacheOnly({
  cacheName: CURRENT_CACHE_NAME,
});

const filesCacheStrategy = new StaleWhileRevalidate({
  cacheName: CURRENT_CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

registerRoute(
  ({ url }) => {
    const pathname = url.pathname.slice(1);
    return hashedToOriginal.has(pathname) || hashPattern.test(pathname);
  },
  ({ request, url }) => {
    return caches.match(request).then(response => {
      if (response) {
        // If the file is in the cache, serve it directly
        return response;
      } else {
        // If not in cache, fetch it and cache for future use
        return fetch(request).then(newResponse => {
          if (newResponse.ok) {
            const clonedResponse = newResponse.clone();
            caches.open(CURRENT_CACHE_NAME).then(cache => {
              cache.put(request, clonedResponse);
            });
          }
          return newResponse;
        });
      }
    });
  },
);

const esmCacheStrategy = new StaleWhileRevalidate({
  cacheName: ESM_CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

registerRoute(
  ({ url }) =>
    !url.pathname.startsWith("/api/")
    && !url.pathname.startsWith("/live/")
    && !url.origin.includes("clerk")
    && !hashedToOriginal.has(url.pathname.slice(1))
    && !hashPattern.test(url.pathname.slice(1)),
  esmCacheStrategy,
);
