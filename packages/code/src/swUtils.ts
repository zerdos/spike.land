async function testRegistration() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.warn("SW registered:", registration);

      await new Promise<void>((resolve) => {
        if (registration.installing) {
          registration.installing.addEventListener("statechange", (e) => {
            if (e.target && (e.target as ServiceWorker).state === "activated") {
              console.warn("SW activated");
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    } catch (error) {
      console.error("SW registration failed:", error);
    }
  }
}

// 2. Caching Behavior
async function testCaching(swVersion: string) {
  const cacheName = "file-cache-" + swVersion;
  const cache = await caches.open(cacheName);
  const cachedResponses = await cache.matchAll();
  console.warn("Cached resources:", cachedResponses.map((r) => r.url));

  // Test offline functionality
  await new Promise<void>((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.src = "/some-cached-page";
    iframe.onload = () => {
      console.warn("Page loaded from cache while offline");
      document.body.removeChild(iframe);
      resolve();
    };
    document.body.appendChild(iframe);
  });
}

// 3. Update Mechanism
async function testUpdate() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.addEventListener("updatefound", () => {
      console.warn("New SW version found");
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", (e: Event) => {
          const target = e.target as ServiceWorker;
          if (target.state === "installed") {
            console.warn("New SW installed and will activate on next load");
          }
        });
      }
    });

    // Trigger an update check
    await registration.update();
  }
}

// 4. Performance Monitoring
async function testPerformance() {
  const cachedUrl = "/some-cached-resource";
  const uncachedUrl = "/some-uncached-resource";

  async function timeRequest(url: string) {
    const start = Date.now();
    await fetch(url);
    return Date.now() - start;
  }

  const cachedTime = await timeRequest(cachedUrl);
  const uncachedTime = await timeRequest(uncachedUrl);

  console.warn(`Cached resource load time: ${cachedTime}ms`);
  console.warn(`Uncached resource load time: ${uncachedTime}ms`);
}

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

          console.warn("All caches have been cleared.");
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

      console.warn("All Service Workers have been unregistered.");

      console.warn(
        "Service Worker cleanup complete. You may need to reload the page or close all tabs of this site for changes to take full effect.",
      );
    } catch (error) {
      console.error("Error during Service Worker cleanup:", error);
    }
  } else {
    console.warn("Service Workers are not supported in this browser.");
  }
}

export async function runTests(swVersion: string) {
  await testRegistration();
  await testCaching(swVersion);
  await testUpdate();
  await testPerformance();
}
