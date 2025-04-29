import { QueuedFetch } from "@/lib/queued-fetch";
import type { CustomServiceWorkerGlobalScope } from "@/types/service-worker";
import { CacheUtils } from "./cache-utils";

export class FileCacheManager {
  private readonly sw: CustomServiceWorkerGlobalScope;
  private readonly filesByCacheKeys: Record<string, string>;

  constructor(sw: CustomServiceWorkerGlobalScope) {
    this.sw = sw;
    this.filesByCacheKeys = Object.entries(sw.files).reduce(
      (acc, [key, value]) => {
        acc[value] = key;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  getAllFileUrls(): Set<string> {
    return new Set(
      Object.keys(this.filesByCacheKeys)
        .map((fileName) => new URL("/" + fileName, location.origin).toString()),
    );
  }

  async validateFileHash(url: string, hash: string): Promise<void> {
    if (!hash || (hash.length !== 10 && hash.length !== 8)) {
      throw new Error(`Invalid hash for ${url}`);
    }
  }

  async fetchAndCacheFile(
    url: string,
    queuedFetch: {
      fetch: (request: Request, init?: RequestInit) => Promise<Response>;
    },
    myCache: Cache,
  ): Promise<void> {
    const { pathname, origin } = new URL(url);
    const cacheKey = pathname.slice(1);

    // Get original file path from cache key
    const originalPath = this.filesByCacheKeys[cacheKey];
    if (!originalPath) {
      console.warn(`No original path found for cache key: ${cacheKey}`);
      return;
    }

    // Create request for the original file
    const request = new Request(
      new URL("/" + originalPath, origin).toString(),
    );

    // Extract hash from the cache key
    const parts = cacheKey.split(".");
    parts.pop(); // Remove file extension
    const hash = parts.pop(); // Get hash

    try {
      await this.validateFileHash(url, hash!);

      // Create a proper cache request for storing
      const cacheRequest = new Request(
        new URL("/" + cacheKey, origin).toString(),
      );

      // First check if another worker already cached this file
      const existingResponse = await myCache.match(cacheRequest);
      if (existingResponse) {
        console.log(`File ${url} already cached, skipping fetch`);
        return;
      }

      // Fetch file from network with no-store to ensure fresh content
      const response = await CacheUtils.retry(() => queuedFetch.fetch(request));

      // Validate hash if header is present (optional validation)
      if (
        response.headers.has("x-hash") &&
        response.headers.get("x-hash") !== hash
      ) {
        console.warn(
          `Hash mismatch for ${url}. Expected: ${hash}, Received: ${
            response.headers.get("x-hash")
          }. Using file anyway.`,
        );
      }

      if (response.ok) {
        // Store in cache with the hashed filename as the key
        const responseToCache = new Response(await response.clone().blob(), {
          status: response.status,
          statusText: response.statusText,
          headers: new Headers(response.headers),
        });

        // Add cache metadata
        responseToCache.headers.set("x-cached-at", new Date().toISOString());
        responseToCache.headers.set("x-original-path", originalPath);

        await myCache.put(cacheRequest, responseToCache);
        console.log(`Cached file ${url} successfully`);
      } else {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  async initializeFilesCache(): Promise<void> {
    const myCache = await caches.open(this.sw.fileCacheName);

    // Always update the files.json in cache to ensure it's current
    await myCache.put(
      "/files.json",
      new Response(JSON.stringify(this.sw.files), {
        headers: {
          "Content-Type": "application/json",
          "x-cache-version": this.sw.swVersion,
          "x-cached-at": new Date().toISOString(),
        },
      }),
    );

    // Store the swVersion as well for easy reference
    await myCache.put(
      "/swVersion.json",
      new Response(
        JSON.stringify({
          version: this.sw.swVersion,
          timestamp: new Date().toISOString(),
          fileCount: Object.keys(this.sw.files).length,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      ),
    );
  }

  async validateCacheIntegrity(): Promise<void> {
    const myCache = await caches.open(this.sw.fileCacheName);
    const allKeys = this.getAllFileUrls();
    const myCacheKeys = await myCache.keys();
    const myKeys = new Set(myCacheKeys.map((request) => request.url));
    const missing = CacheUtils.setDifference(allKeys, myKeys);

    // Remove system files from the missing list
    const systemFiles = ["/files.json", "/swVersion.json"].map(
      (file) => new URL(file, location.origin).toString(),
    );

    systemFiles.forEach((file) => missing.delete(file));

    if (missing.size > 0) {
      console.warn(
        `Cache integrity check: Missing ${missing.size} files: ${
          [...missing].slice(0, 5).join(", ")
        }${missing.size > 5 ? "..." : ""}`,
      );

      // Don't throw an error, just log a warning - we can still function with a partial cache
      // Instead, consider refetching the missing files
      const queuedFetch = new QueuedFetch(4, 1000, 100);

      await Promise.allSettled(
        [...missing].map(async (url) => this.fetchAndCacheFile(url, queuedFetch, myCache)),
      );
      console.log(`Refetched ${missing.size} missing files.`);
    } else {
      console.log("Cache integrity check passed: All files present");
    }
  }
}
