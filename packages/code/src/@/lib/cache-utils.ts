export const CDN_DOMAIN = "cdn.jsdelivr.net";

export const CACHE_VERSION = "1.0.0";

export class CacheUtils {
  static async cleanOldCaches(currentCacheName: string): Promise<void> {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name !== currentCacheName)
        .map(name => caches.delete(name)),
    );
  }

  static setDifference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const difference = new Set<T>();
    for (const elem of setA) {
      if (!setB.has(elem)) {
        difference.add(elem);
      }
    }
    return difference;
  }

  static async getMissingFiles(
    missing: Set<string>,
    cacheNames: string[],
    targetCache: Cache,
  ): Promise<Set<string>> {
    const stillMissing = new Set<string>(missing);

    for (const cacheName of cacheNames) {
      if (stillMissing.size === 0) break;

      const cache = await caches.open(cacheName);
      for (const url of stillMissing) {
        const response = await cache.match(url);
        if (response) {
          await targetCache.put(url, response);
          stillMissing.delete(url);
        }
      }
    }

    return stillMissing;
  }

  static async handleCDNRequest(request: Request): Promise<Response> {
    const cache = await caches.open("cdn-cache");
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  }

  static async retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }

    throw lastError;
  }
}
