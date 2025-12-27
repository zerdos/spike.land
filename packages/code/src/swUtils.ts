export async function deleteAllServiceWorkers() {
  if ("serviceWorker" in navigator) {
    try {
      const cacheNames = await caches.keys();
      const fileCaches = cacheNames.filter((cacheName) => cacheName.startsWith("file-cache-"));
      const currentCache = "file-cache-" + swVersion;
      const isCurrentFilesInCache = fileCaches.includes(currentCache);
      if (isCurrentFilesInCache) {
        try {
          const deleteCachePromises = fileCaches.filter((cacheName) => cacheName !== currentCache)
            .map(
              (cacheName) => caches.delete(cacheName),
            );

          // Wait for all cache delete operations to complete
          await Promise.allSettled(deleteCachePromises);
        } catch (error) {
          console.error("Error during cache cleanup:", error);
        }
      }

      // Get all service worker registrations
      const registrations = await navigator.serviceWorker.getRegistrations();

      // Unregister each service worker
      const unregisterPromises = registrations.map((registration) => {
        if (registration.active && !isCurrentFilesInCache) {
          registration.unregister();
        }

        if (registration.waiting && isCurrentFilesInCache) {
          return registration.waiting.postMessage("skipWaiting");
        }
      });

      // Wait for all unregister operations to complete
      await Promise.all(unregisterPromises);
    } catch (error) {
      console.error("Error during Service Worker cleanup:", error);
    }
  } else {
    console.warn("Service Workers are not supported in this browser.");
  }
}
