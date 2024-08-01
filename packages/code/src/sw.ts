// Purpose: Service worker to cache files and update cache when ASSET_HASH changes
// Remove the duplicate declaration of 'self'

importScripts("/swVersion.js");

import * as workbox from "workbox-sw";

const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };

const { routing, strategies, expiration, backgroundSync, precaching } = workbox;

// Your asset hash checking logic
const ASSET_HASH_KEY: string = self.swVersion;

async function fetchAssetHash() {
  try {
    const response = await fetch("/assetHash.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.ASSET_HASH;
  } catch (error) {
    console.error("Failed to fetch ASSET_HASH:", error);
    return "";
  }
}

async function checkAssetHash() {
  const newAssetHash = await fetchAssetHash();
  const cache = await caches.open(workbox.core.cacheNames.runtime);
  const currentAssetHash = await cache.match(ASSET_HASH_KEY).then(response => response?.text());

  if (currentAssetHash !== newAssetHash) {
    console.log("ASSET_HASH changed. Updating cache...");
    await updateCache(newAssetHash);
    await cache.put(ASSET_HASH_KEY, new Response(newAssetHash));
  }
}

async function updateCache(newAssetHash) {
  // Implement your cache update logic here
  // This might involve clearing old caches and precaching new files
  console.log("Updating cache with new asset hash:", newAssetHash);
}

// Periodic background sync
const backgroundSyncPlugin = new backgroundSync.BackgroundSyncPlugin("periodic-sync", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

// Register route for files in files.json
routing.registerRoute(
  ({ url }) => url.pathname in self.files,
  new strategies.CacheFirst({
    cacheName: "files-cache",
    plugins: [
      new expiration.ExpirationPlugin({
        maxEntries: 250, // Adjust based on your needs
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      }),
      backgroundSyncPlugin,
    ],
  }),
);

// Default cache-first strategy for other routes
routing.setDefaultHandler(
  new strategies.CacheFirst({
    cacheName: "default-cache",
    plugins: [
      new expiration.ExpirationPlugin({
        maxEntries: 100, // Adjust based on your needs
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  }),
);

// Periodic cache refresh
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "refresh-files") {
    event.waitUntil(checkAssetHash());
  }
});

// Initial installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    checkAssetHash().then(() => self.skipWaiting()),
  );
});

// Activate new service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
