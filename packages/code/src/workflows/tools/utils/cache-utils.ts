// Cache utility constants and functions
export const CACHE_VERSION = "v1";
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second
export const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
export const CDN_CACHE_NAME = "jsdelivr-cache-v1";
export const CDN_DOMAIN = "data.jsdelivr.com";
import { tryCatch } from "@/lib/try-catch";

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
        return this.retry(operation, retries - 1, delay * 1.5); // Exponential backoff
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
    const doClean = async () => {
      const cacheNames = await caches.keys();
      const cachesToDelete = cacheNames.filter(
        (name) =>
          name !== currentCacheName &&
          name !== CDN_CACHE_NAME &&
          (name.startsWith("sw-file-cache-") ||
            name.startsWith("static-cache-")),
      );

      if (cachesToDelete.length > 0) {
        console.log(`Cleaning up ${cachesToDelete.length} old caches`);
      }

      await Promise.all(
        cachesToDelete.map(async (name) => {
          await caches.delete(name);
          console.log(`Deleted old cache: ${name}`);
        }),
      );
    };
    const { error } = await tryCatch(doClean());
    if (error) {
      console.error("Error during cache cleanup:", error);
    }
  }

  /**
   * Checks if a response is stale based on cache time
   */
  static isResponseStale(response: Response, maxAge = MAX_CACHE_AGE): boolean {
    const dateHeader = response.headers.get("date");
    if (!dateHeader) return true;

    const cacheDate = new Date(dateHeader).getTime();
    return Date.now() - cacheDate > maxAge;
  }

  /**
   * Gets cached response metadata
   */
  static getResponseMetadata(response: Response): Record<string, string> {
    const metadata: Record<string, string> = {};

    // Extract all x-* headers as metadata
    response.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("x-")) {
        metadata[key] = value;
      }
    });

    return metadata;
  }

  static async handleCDNRequest(request: Request): Promise<Response> {
    const cache = await caches.open(CDN_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Check if cache is still valid
      // if (!this.isResponseStale(cachedResponse)) {
      return cachedResponse;
      // }
      // console.log(`Stale cache for CDN request: ${request.url}`);
    }

    // If no cache or cache is old, fetch from network
    const fetchAndCache = async () => {
      const response = await this.retry(() => fetch(request.clone()));

      if (response.ok && response.status === 200) {
        const responseToCache = new Response(await response.clone().blob(), {
          status: response.status,
          statusText: response.statusText,
          headers: new Headers(response.headers),
        });
        responseToCache.headers.set("x-cached-at", new Date().toISOString());
        responseToCache.headers.set("x-cache-source", "CDN");
        await cache.put(request, responseToCache);
        console.log(`Cached CDN response for: ${request.url}`);
        return response;
      }
      // If network request fails but we have a cached response, return it
      if (cachedResponse) {
        console.log("Serving stale cache for:", request.url);
        return cachedResponse;
      }
      return response; // Return non-ok response if not cached
    };

    const { data: networkResponse, error } = await tryCatch(fetchAndCache());

    if (error) {
      console.error(`Error fetching from CDN: ${request.url}`, error);
      if (cachedResponse) {
        console.log("Serving stale cache after error for:", request.url);
        return cachedResponse;
      }
      throw error;
    }
    return networkResponse!; // networkResponse will be defined if error is null
  }

  static async getMissingFiles(
    missing: Set<string>,
    cacheNames: string[],
    myCache: Cache,
  ): Promise<Set<string>> {
    if (missing.size === 0) {
      return missing;
    }

    console.log(`Attempting to recover ${missing.size} files from old caches`);

    // Copy missing items from old caches
    let recoveredCount = 0;

    for (const cacheName of cacheNames) {
      const oldCache = await caches.open(cacheName);
      const oldCacheKeys = await oldCache.keys();
      const oldKeys = new Set(oldCacheKeys.map((request) => request.url));

      const oldCacheHasItems = CacheUtils.setIntersection(oldKeys, missing);

      if (oldCacheHasItems.size > 0) {
        console.log(
          `Found ${oldCacheHasItems.size} files in cache: ${cacheName}`,
        );

        await Promise.all([...oldCacheHasItems].map(async (url) => {
          const request = new Request(url);
          const response = await oldCache.match(request);
          if (response) {
            // Add metadata about source cache
            const responseToCache = new Response(
              await response.clone().blob(),
              {
                status: response.status,
                statusText: response.statusText,
                headers: new Headers(response.headers),
              },
            );

            // Add cache metadata
            responseToCache.headers.set("x-copied-from-cache", cacheName);
            responseToCache.headers.set(
              "x-copied-at",
              new Date().toISOString(),
            );

            await myCache.put(request, responseToCache);
            recoveredCount++;
          }
        }));
      }
    }

    console.log(`Recovered ${recoveredCount} files from old caches`);

    // Check what's still missing
    const updatedMyCacheKeys = await myCache.keys();
    const updatedMyKeys = new Set(
      updatedMyCacheKeys.map((request) => request.url),
    );
    const stillMissing = CacheUtils.setDifference(missing, updatedMyKeys);

    if (stillMissing.size > 0) {
      console.log(`Still missing ${stillMissing.size} files after recovery`);
    }

    return stillMissing;
  }
}
