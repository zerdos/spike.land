const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

importScripts("/swVersion.js");

import { serveWithCache } from "@/lib/serve-with-cache";
// Now, self.swVersion and self.files are available

const ASSET_HASH = sw.swVersion;
const files = sw.files;
sw.fileCacheName = `file-cache-v12`;

// Instantiate serveWithCache
const { isAsset, serve } = serveWithCache(ASSET_HASH, files, () => caches.open(sw.fileCacheName));

// Event listeners for the service worker lifecycle

// Install event

self.addEventListener("install", () => {
  // Activate the new service worker immediately
  sw.skipWaiting();
});

// Activate event
sw.onactivate = (event) => {
  // Claim clients so the service worker takes control immediately
  event.waitUntil(sw.clients.claim());
};

sw.onactivate = (event) => {
  event.waitUntil(sw.clients.claim());
};

// Fetch event
sw.addEventListener("fetch", (event) => {
  const request = event.request;

  if (isAsset(request)) {
    event.respondWith(
      (async () => {
        return serve(
          request,
          (url) => fetch(url),
          (p) => event.waitUntil(p),
        );
      })(),
    );
  } else {
    // For non-asset requests, you can implement other strategies or fetch from the network
    event.respondWith(fetch(request));
  }
});
