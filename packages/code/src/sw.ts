importScripts("/swVersion.js");

import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

const sw = self as unknown as
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };

const files = new Set(Object.keys(sw.files));

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
    !url.pathname.startsWith("/live/") && !files.has(url.pathname.slice(1)),
  new CacheFirst({
    cacheName: "esm-cache-124",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);


sw.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.open('file-cache-'+sw.swVersion).then(async (cache) => {
      const cacheNames = await caches.keys();
      const fileCaches = cacheNames.filter((cacheName) => cacheName.startsWith("file-cache-"));
      const currentCache = "file-cache-" + sw.swVersion;
      
      const otherCaches = fileCaches.filter(cacheName => cacheName !== currentCache);
      
      // Use the files from sw.files
      const filesJson = sw.files;
      const addedFiles = new Set(["files.json"]);
      
      // Copy matching files from old caches to the new cache
      for (const oldCache of otherCaches) {
        const oldCacheInstance = await caches.open(oldCache);
        const oldFileJsonResponse = await oldCacheInstance.match('/files.json');
        if (!oldFileJsonResponse) continue;
        
        const oldFiles: typeof sw.files = await oldFileJsonResponse.json();
        
        await Promise.all(Object.keys(filesJson).map(async (file) => {
          if (addedFiles.has(file)) return;
          
          if (oldFiles[file] === filesJson[file]) {
            const oldResponse = await oldCacheInstance.match('/' + file);
            if (oldResponse) {
              await cache.put("/" + file, oldResponse.clone());
              addedFiles.add(file);
            }
          }
        }));
      }

      // Determine which files are still missing
    //  const stillMissing = Object.keys(filesJson).filter(file => !addedFiles.has(file));
      
      // Add all new files to the cache
      //const filesToCache = ['/files.json', ...stillMissing.map(file => '/' + file)];
      const filesToCache = ['/files.json'];
      
      await cache.addAll(filesToCache);
      await sw.skipWaiting();
      // Delete old caches
     // await Promise.all(otherCaches.map(cacheName => caches.delete(cacheName)));
      
      return cache;
    }),
  );
});

sw.onmessage = async (event) => {
  if (event.data === "skipWaiting") {
    await sw.skipWaiting();
  }
}

sw.addEventListener("install", async() => {
  const cacheNames = await caches.keys();
  const fileCaches = cacheNames.filter((cacheName) => cacheName.startsWith("file-cache-"));
  const currentCache = "file-cache-" + sw.swVersion;
  
  const otherCaches = fileCaches.filter(cacheName => cacheName !== currentCache);
  otherCaches.forEach(cacheName => caches.delete(cacheName));

});