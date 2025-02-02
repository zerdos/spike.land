/**
 * Serves assets with caching using the Cache API
 * @param url The URL of the asset to serve
 * @returns A Promise that resolves to a Response
 */
export async function serveWithCache(url: string): Promise<Response> {
  const cache = await caches.open("asset-cache");

  try {
    // Try to get from cache first
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch and cache
    try {
      const fetchedResponse = await fetch(url);
      const responseToCache = fetchedResponse.clone();

      try {
        await cache.put(url, responseToCache);
      } catch (error) {
        console.error("Cache put error:", error);
        throw error;
      }

      return fetchedResponse;
    } catch (error) {
      console.error("Asset fetch error:", error);
      throw error;
    }
  } catch (error) {
    console.error("Cache match error:", error);
    throw error;
  }
}
