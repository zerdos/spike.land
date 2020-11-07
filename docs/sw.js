importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js",
);
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-expiration");
workbox.loadModule("workbox-routing");

// const { precacheAndRoute } = workbox.precaching
// The plugin will pass the files to cache here
// workbox.precaching.precacheAndRoute([])

workbox.routing.registerRoute(
  ({ url }) => {
    const { pathname } = url;

    return (
      pathname.length - pathname.lastIndexOf("/") > 16 &&
      (pathname.substr(-3) === ".js" || pathname.lastIndexOf(".js?") > 0)
    );
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "hashed js files",
    plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 100 })],
  }),
);

workbox.routing.registerRoute(
  ({ url }) => {
    const { pathname } = url;

    return pathname.includes("page-data.json");
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "page-data",
  }),
);

workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com" ||
    url.origin === "https://storage.googleapis.com",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts",
    cacheableResponse: { statuses: [0, 200] },
  }),
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      } // 30 Days
      ),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
);
