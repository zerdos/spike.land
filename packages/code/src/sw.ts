const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

importScripts("/swVersion.js");

const files = new Set(sw.files ? Object.keys(sw.files) : []);
const CURRENT_CACHE_NAME = `file-cache-${sw.swVersion}`;
const ESM_CACHE_NAME = "esm-cache-124";

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(cacheName =>
    (cacheName.startsWith("file-cache-") && cacheName !== CURRENT_CACHE_NAME) ||
    (cacheName.startsWith("esm-cache-") && cacheName !== ESM_CACHE_NAME)
  );
  return Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));
}

async function copyMatchingFiles(oldCache: Cache, newCache: Cache, filesJson: typeof sw.files) {
  const oldFileJsonResponse = await oldCache.match("/files.json");
  if (!oldFileJsonResponse) return new Set<string>();

  const oldFiles: typeof sw.files = await oldFileJsonResponse.json();
  const addedFiles = new Set(["files.json"]);

  await Promise.all(
    Object.entries(filesJson).map(async ([file, hash]) => {
      if (addedFiles.has(file) || oldFiles[file] !== hash) return;

      const oldResponse = await oldCache.match(`/${file}`);
      if (oldResponse) {
        await newCache.put(`/${file}`, oldResponse.clone());
        addedFiles.add(file);
      }
    }),
  );

  return addedFiles;
}

sw.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CURRENT_CACHE_NAME);
      const filesJson = sw.files || {};
      const cacheNames = await caches.keys();
      const fileCaches = cacheNames.filter(cacheName =>
        cacheName.startsWith("file-cache-") && cacheName !== CURRENT_CACHE_NAME
      );

      for (const oldCacheName of fileCaches) {
        const oldCache = await caches.open(oldCacheName);
        await copyMatchingFiles(oldCache, cache, filesJson);
      }

      await cache.add("/files.json");
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

const filesCacheStrategy = new StaleWhileRevalidate({
  cacheName: CURRENT_CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

registerRoute(
  ({ url }) => files.has(url.pathname.slice(1)),
  filesCacheStrategy,
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
    !url.pathname.startsWith("/api/") &&
    (url.origin === location.origin || url.origin === "https://cdn.jsdelivr.net") &&
    !url.pathname.startsWith("/live/") &&
    !files.has(url.pathname.slice(1)),
  esmCacheStrategy,
);