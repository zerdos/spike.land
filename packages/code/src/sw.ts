const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { __WB_DISABLE_DEV_LOGS: boolean }
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };
sw.__WB_DISABLE_DEV_LOGS = true;

import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

importScripts("/swVersion.js");

const files = new Set(sw.files ? Object.keys(sw.files) : []);

sw.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.open("file-cache-" + sw.swVersion).then(async (cache) => {
      try {
        const cacheNames = await caches.keys();
        const fileCaches = cacheNames.filter((cacheName) => cacheName.startsWith("file-cache-"));
        const currentCache = "file-cache-" + sw.swVersion;

        const otherCaches = fileCaches.filter((cacheName) => cacheName !== currentCache);

        // Ensure sw.files exists before using it
        const filesJson = sw.files || {};
        const addedFiles = new Set(["files.json"]);

        // Copy matching files from old caches to the new cache
        for (const oldCache of otherCaches) {
          const oldCacheInstance = await caches.open(oldCache);
          const oldFileJsonResponse = await oldCacheInstance.match("/files.json");
          if (!oldFileJsonResponse) continue;

          const oldFiles: typeof sw.files = await oldFileJsonResponse.json();

          await Promise.all(
            Object.keys(filesJson).map(async (file) => {
              if (addedFiles.has(file)) return;

              if (oldFiles[file] === filesJson[file]) {
                const oldResponse = await oldCacheInstance.match("/" + file);
                if (oldResponse) {
                  await cache.put("/" + file, oldResponse.clone());
                  addedFiles.add(file);
                }
              }
            }),
          );
        }

        // Determine which files are still missing
        //  const stillMissing = Object.keys(filesJson).filter(file => !addedFiles.has(file));

        // Add all new files to the cache
        // const filesToCache = ['/files.json', ...stillMissing.map(file => '/' + file)];
        const filesToCache = ["/files.json"];

        await cache.addAll(filesToCache);
        await sw.skipWaiting();
        // Delete old caches
        // await Promise.all(otherCaches.map(cacheName => caches.delete(cacheName)));

        return cache;
      } catch (e) {
        console.error("Error in activate event:", e);
      }
    }),
  );
});

// Add error handling to onmessage event
sw.onmessage = async (event) => {
  try {
    if (event.data === "skipWaiting") {
      await sw.skipWaiting();
    }
  } catch (error) {
    console.error("Error in onmessage event:", error);
  }
};

// Add error handling to install event
sw.addEventListener("install", async (event) => {
  try {
    const cacheNames = await caches.keys();
    const fileCaches = cacheNames.filter((cacheName) => cacheName.startsWith("file-cache-"));
    const currentCache = "file-cache-" + sw.swVersion;

    const otherCaches = fileCaches.filter((cacheName) => cacheName !== currentCache);
    await Promise.all(otherCaches.map(cacheName => caches.delete(cacheName)));
  } catch (error) {
    console.error("Error in install event:", error);
  }
});

registerRoute(
  ({ url }) => files.has(url.pathname.slice(1)),
  new CacheFirst({
    cacheName: "file-cache-" + sw.swVersion,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

registerRoute(
  ({ url }) =>
    !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/live/") && !url.pathname.startsWith("/api/")
    && !files.has(url.pathname.slice(1)),
  new CacheFirst({
    cacheName: "esm-cache-124",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
