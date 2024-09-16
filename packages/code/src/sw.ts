// Updated Service Worker Code

const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

importScripts("/swVersion.js");

import { serveWithCache } from "@/lib/serve-with-cache";

// Now, self.swVersion and self.files are available
const files = sw.files;
sw.fileCacheName = `sw-file-cache-v13`; // Updated cache name to avoid conflicts

// Instantiate serveWithCache
const { isAsset, serve } = serveWithCache(files, () => caches.open(sw.fileCacheName));

// Install event
self.addEventListener("install", (event) => {
  // Activate the new service worker immediately
  sw.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete old caches if any
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== sw.fileCacheName)
          .map((cacheName) => caches.delete(cacheName)),
      );
      // Claim clients so the service worker takes control immediately
      await sw.clients.claim();
    })(),
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (isAsset(request)) {
    event.respondWith(
      serve(
        request,
        (req, waitUntil) => {
          const respPromise = fetch(req);
          waitUntil(respPromise);
          return respPromise;
        },
        event.waitUntil.bind(event),
      ),
    );
  } else {
    // For non-asset requests, fetch from the network
    event.respondWith(fetch(request));
  }
});
