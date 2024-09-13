importScripts("/swVersion.js");

const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

import * as navigationPreload from "workbox-navigation-preload";
import { precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute, Route } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

// Precache the manifest
precacheAndRoute(sw.files);

// Enable navigation preload
navigationPreload.enable();

// Create a new navigation route that uses the Network-first, falling back to
// cache strategy for navigation requests with its own cache. This route will be
// handled by navigation preload. The NetworkOnly strategy will work as well.
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
  }),
);

// Register the navigation route
registerRoute(navigationRoute);

// Create a route for image, script, or style requests that use a
// stale-while-revalidate strategy. This route will be unaffected
// by navigation preload.
const staticAssetsRoute = new Route(
  ({ request }) => {
    return ["image", "script", "style"].includes(request.destination);
  },
  new StaleWhileRevalidate({
    cacheName: "static-assets",
  }),
);

// Register the route handling static assets
registerRoute(staticAssetsRoute);

// import { CacheableResponsePlugin } from "workbox-cacheable-response";
// import { registerRoute } from "workbox-routing";
// import { StaleWhileRevalidate } from "workbox-strategies";

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

const cacheFirstStrategy = new StaleWhileRevalidate({
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
    const origin = url.origin;
    return !origin.includes("clerk") && (hashedToOriginal.has(pathname) || hashPattern.test(pathname));
  },
  cacheFirstStrategy,
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
    && !url.origin.includes("clerk")
    && !url.pathname.startsWith("/live/")
    && !hashedToOriginal.has(url.pathname.slice(1))
    && !hashPattern.test(url.pathname.slice(1)),
  esmCacheStrategy,
);
