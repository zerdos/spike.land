// Cache utility constants and functions
export const CACHE_VERSION = "v1";
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second
export const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
export const CDN_CACHE_NAME = "jsdelivr-cache-v1";
export const CDN_DOMAIN = "data.jsdelivr.com";

export class CacheUtils {
  static async retry<T>(
    operation: () => Promise<T>,
    retries = MAX_RETRY_ATTEMPTS,
    delay = RETRY_DELAY,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retry(operation, retries - 1, delay);
      }
      throw error;
    }
  }

  static setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA].filter((x) => !setB.has(x)));
  }

  static setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA].filter((x) => setB.has(x)));
  }

  static async cleanOldCaches(currentCacheName: string): Promise<void> {
    const cacheNames = await caches.keys();
    const currentTime = Date.now();

    await Promise.all(
      cacheNames
        .filter((name) => name !== currentCacheName && name !== CDN_CACHE_NAME)
        .map(async (cacheName) => {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();

          // Check if cache is older than MAX_CACHE_AGE
          if (keys.length > 0) {
            const response = await cache.match(keys[0]);
            if (response && response.headers.get("date")) {
              const cacheDate = new Date(response.headers.get("date")!)
                .getTime();
              if (currentTime - cacheDate > MAX_CACHE_AGE) {
                return caches.delete(cacheName);
              }
            }
          }
        }),
    );
  }

  static async handleCDNRequest(request: Request): Promise<Response> {
    const cache = await caches.open(CDN_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Check if cache is still valid (less than a week old)
      const dateHeader = cachedResponse.headers.get("date");
      if (dateHeader) {
        const cacheDate = new Date(dateHeader).getTime();
        if (Date.now() - cacheDate < MAX_CACHE_AGE) {
          return cachedResponse;
        }
      }
    }

    // If no cache or cache is old, fetch from network
    try {
      const response = await fetch(request);
      if (response.ok && response.status === 200) {
        // Clone the response before caching it
        await cache.put(request, response.clone());
        return response;
      }
      // If network request fails but we have a cached response, return it
      if (cachedResponse) {
        console.log("Serving stale cache for:", request.url);
        return cachedResponse;
      }
      return response;
    } catch (error) {
      // If network request fails and we have a cached response, return it
      if (cachedResponse) {
        console.log("Serving stale cache after error for:", request.url);
        return cachedResponse;
      }
      throw error;
    }
  }

  static async getMissingFiles(
    missing: Set<string>,
    cacheNames: string[],
    myCache: Cache,
  ): Promise<Set<string>> {
    console.log("Missing files:", [...missing].join(", "));
    // Copy missing items from old caches
    for (const cacheName of cacheNames) {
      const oldCache = await caches.open(cacheName);
      const oldCacheKeys = await oldCache.keys();
      const oldKeys = new Set(oldCacheKeys.map((request) => request.url));

      const oldCacheHasItems = CacheUtils.setIntersection(oldKeys, missing);

      await Promise.all([...oldCacheHasItems].map(async (url) => {
        const request = new Request(url);
        const response = await oldCache.match(request);
        if (response) {
          await myCache.put(request, response.clone());
        }
      }));
    }

    const updatedMyCacheKeys = await myCache.keys();
    const updatedMyKeys = new Set(
      updatedMyCacheKeys.map((request) => request.url),
    );
    return CacheUtils.setDifference(missing, updatedMyKeys);
  }
}
