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
    const request = new Request(
      new URL(this.filesByCacheKeys[cacheKey], origin).toString(),
    );

    const parts = cacheKey.split(".");
    parts.pop();
    const hash = parts.pop();

    await this.validateFileHash(url, hash!);

    const cacheRequest = new Request(new URL(cacheKey, origin).toString());

    try {
      const response = await CacheUtils.retry(() =>
        queuedFetch.fetch(request, { cache: "no-store" })
      );

      if (!response.headers.has("x-hash")) {
        throw new Error(`Hash header missing for ${url}`);
      }

      if (response.headers.get("x-hash") !== hash) {
        throw new Error(
          `Hash mismatch for ${url}. Expected: ${hash}, Received: ${
            response.headers.get("x-hash")
          }`,
        );
      }

      if (response.ok) {
        await myCache.put(cacheRequest, response.clone());
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
    const myCacheKeys = await myCache.keys();

    if (!myCacheKeys.length) {
      await myCache.put(
        "/files.json",
        new Response(JSON.stringify(this.sw.files), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    }
  }

  async validateCacheIntegrity(): Promise<void> {
    const myCache = await caches.open(this.sw.fileCacheName);
    const allKeys = this.getAllFileUrls();
    const myCacheKeys = await myCache.keys();
    const myKeys = new Set(myCacheKeys.map((request) => request.url));
    const missing = CacheUtils.setDifference(allKeys, myKeys);

    if (missing.size > 0) {
      throw new Error(
        `Cache integrity check failed. Missing files: ${[...missing].join(", ")}`,
      );
    }
  }
}
