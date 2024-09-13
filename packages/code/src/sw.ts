// sw.js

// Import Workbox from CDN
importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");

// Disable Workbox logging in production
workbox.setConfig({ debug: false });

// Import swVersion.js to get swVersion and sw.files
importScripts("/swVersion.js");

// Precache hashed assets using sw.files
const precacheManifest = Object.values(sw.files).map((hashed) => ({ url: `/${hashed}` }));
workbox.precaching.precacheAndRoute(precacheManifest);

// Cache-first strategy for images, styles, and fonts
workbox.routing.registerRoute(
  ({ request }) => ["style", "image", "font"].includes(request.destination),
  new workbox.strategies.CacheFirst({
    cacheName: "static-resources",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  }),
);

// Network-first strategy for API requests
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Stale-while-revalidate strategy for scripts (e.g., ESM modules)
workbox.routing.registerRoute(
  ({ request }) => request.destination === "script",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "esm-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Handle 'skipWaiting' message
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
