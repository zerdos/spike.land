import { enhancedFetch } from "./enhancedFetch";

import type {
  fakeServer as FakeServer,
  QueuedFetch as Qf,
  serveWithCache as ServeWithCache,
} from "./sw-deps";

// Extend ServiceWorkerGlobalScope with custom properties
interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  swVersion: string;
  files: Record<string, string>;
  fileCacheName: string;
}

const sw = self as unknown as CustomServiceWorkerGlobalScope;

// Configuration type with strict types
interface Config {
  killSwitch: boolean;
  version: string;
  swVersion: string;
  validUntil: number;
}

// Cache configuration
const CACHE_VERSION = "v1";
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second
const MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
const CDN_CACHE_NAME = "jsdelivr-cache-v1";
const CDN_DOMAIN = "data.jsdelivr.com";

// Initialize cache name with version
sw.fileCacheName = `sw-file-cache-${sw.swVersion}-${CACHE_VERSION}`;

// Load required scripts
importScripts("/swVersion.js");

const swDepsInFiles = sw.files["sw-deps.js"].split(".");
swDepsInFiles.pop(); // js
const hash = swDepsInFiles.pop(); // hash

const transpileWorker = sw.files["@/workers/transpile.worker.js"].split(".");
transpileWorker.pop(); // js
const transpileWorkerHash = transpileWorker.pop(); // hash

importScripts(
  "/@/workers/transpile.worker.js" + "?hash=" + transpileWorkerHash,
  "/sw-deps.js" + "?hash=" + hash,
);

// Global declarations
declare const globalThis: {
  fakeServer: typeof FakeServer;
  QueuedFetch: typeof Qf;
  serveWithCache: typeof ServeWithCache;
  importMap: Record<string, string>;
};

const {
  fakeServer,
  serveWithCache,
  QueuedFetch,
} = globalThis;

// Utility functions
class CacheUtils {
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

  static async cleanOldCaches(): Promise<void> {
    const cacheNames = await caches.keys();
    const currentTime = Date.now();

    await Promise.all(
      cacheNames
        .filter((name) => name !== sw.fileCacheName && name !== CDN_CACHE_NAME)
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
      if (response.ok) {
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
}

// Configuration management
class ConfigManager {
  private static instance: ConfigManager;
  private currentConfig: Config | null = null;
  private configPromise: Promise<Config> | null = null;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async getConfig(): Promise<Config> {
    if (this.currentConfig && Date.now() <= this.currentConfig.validUntil) {
      return this.currentConfig;
    }

    if (!this.configPromise) {
      this.configPromise = this.fetchConfig();
    }

    this.currentConfig = await this.configPromise;
    this.configPromise = null;
    return this.currentConfig;
  }

  private async fetchConfig(): Promise<Config> {
    try {
      const response = await CacheUtils.retry(async () => {
        const res = await fetch("/sw-config.json");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res;
      });

      const config = await response.json() as Config;
      return config;
    } catch (error) {
      console.error("Failed to fetch configuration:", error);
      return {
        killSwitch: true,
        version: "",
        swVersion: "",
        validUntil: 0,
      };
    }
  }
}

// Cache management
const filesByCacheKeys = Object.entries(sw.files).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

const { isAsset, serve } = serveWithCache(
  sw.files,
  async () => await caches.open(sw.fileCacheName),
);

// File management
async function getMissingFiles(
  missing: Set<string>,
  cacheNames: string[],
  myCache: Cache,
): Promise<Set<string>> {
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

// Event Handlers
sw.addEventListener("install", (event) => {
  const queuedFetch = new QueuedFetch(4);

  event.waitUntil((async () => {
    console.log("Service Worker installing.");

    try {
      const config = await ConfigManager.getInstance().getConfig();

      if (sw.swVersion === config.swVersion) {
        console.log("SwVersion matches. Fetching files.");

        const myCache = await caches.open(sw.fileCacheName);
        const myCacheKeys = await myCache.keys();
        const myKeys = new Set(myCacheKeys.map((request) => request.url));

        if (!myCacheKeys.length) {
          await myCache.put(
            "/files.json",
            new Response(JSON.stringify(sw.files), {
              headers: { "Content-Type": "application/json" },
            }),
          );
        }

        const cacheNames = (await caches.keys())
          .filter((cacheName) => cacheName !== sw.fileCacheName);

        const allKeys = new Set(
          Object.keys(filesByCacheKeys)
            .map((fileName) => new URL("/" + fileName, location.origin).toString()),
        );

        const missing = CacheUtils.setDifference(allKeys, myKeys);
        const stillMissing = await getMissingFiles(
          missing,
          cacheNames,
          myCache,
        );

        await Promise.allSettled([...stillMissing].map(async (url) => {
          const { pathname, origin } = new URL(url);
          const cacheKey = pathname.slice(1);
          const request = new Request(
            new URL(filesByCacheKeys[cacheKey], origin).toString(),
          );

          const parts = cacheKey.split(".");
          parts.pop();
          const hash = parts.pop();

          if (!hash || (hash.length !== 10 && hash.length !== 8)) {
            throw new Error(`Invalid hash for ${url}`);
          }

          const cacheRequest = new Request(
            new URL(cacheKey, origin).toString(),
          );

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
        }));

        // Final integrity check
        const finalCacheKeys = await myCache.keys();
        const finalKeys = new Set(finalCacheKeys.map((request) => request.url));
        const remainingMissing = CacheUtils.setDifference(allKeys, finalKeys);

        if (remainingMissing.size > 0) {
          throw new Error(
            `Failed to fetch files: ${[...remainingMissing].join(", ")}`,
          );
        }

        await sw.skipWaiting();
        console.log("Service Worker installed successfully.");
      }
    } catch (error) {
      console.error("Service Worker installation failed:", error);
      throw error;
    }
  })());
});

sw.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      console.log("Service Worker activating.");

      // Perform integrity check
      const myCache = await caches.open(sw.fileCacheName);
      const allKeys = new Set(
        Object.keys(filesByCacheKeys)
          .map((fileName) => new URL("/" + fileName, location.origin).toString()),
      );

      const myCacheKeys = await myCache.keys();
      const myKeys = new Set(myCacheKeys.map((request) => request.url));
      const missing = CacheUtils.setDifference(allKeys, myKeys);

      if (missing.size > 0) {
        throw new Error(
          `Cache integrity check failed. Missing files: ${[...missing].join(", ")}`,
        );
      }

      // Clean up old caches
      await CacheUtils.cleanOldCaches();

      // Take control of all clients
      await sw.clients.claim();

      console.log("Service Worker activated and controlling.");
    } catch (error) {
      console.error("Service Worker activation failed:", error);
      throw error;
    }
  })());
});

sw.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle jsdelivr.com requests
  if (url.hostname === CDN_DOMAIN) {
    event.respondWith(CacheUtils.handleCDNRequest(request));
    return;
  }

  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  const path = url.pathname.slice(1).split("/");

  const [preRoute, codeSpace] = path;

  const isEditorPath = request.method === "GET" && preRoute === "live" &&
    url.pathname === `/live/${codeSpace}`;

  if (isEditorPath) {
    console.log("Serving editor:", request.url);
    const editorRequest = new Request(
      new URL("/index.html", url.origin).toString(),
      request,
    );

    event.respondWith(
      serve(
        editorRequest,
        (req: Request) => {
          const url = new URL(req.url);
          const file = url.pathname.slice(1);
          const cacheFile = filesByCacheKeys[file];
          const newUrl = cacheFile ? req.url.replace(file, cacheFile) : req.url;
          return CacheUtils.retry(() => fetch(newUrl));
        },
        event.waitUntil.bind(event),
      ).catch((error) => {
        console.error("Error serving asset:", error);
        return fetch(request);
      }),
    );
    return;

    // return serve(
    //   editorRequest,
    //   assetFetcher,
    //   (p: Promise<unknown>) => event.waitUntil(p),
    // );
  } else if (isAsset(request)) {
    event.respondWith(
      serve(
        request,
        (req: Request) => {
          const url = new URL(req.url);
          const file = url.pathname.slice(1);
          const cacheFile = filesByCacheKeys[file];
          const newUrl = cacheFile ? req.url.replace(file, cacheFile) : req.url;
          return CacheUtils.retry(() => fetch(newUrl));
        },
        event.waitUntil.bind(event),
      ).catch((error) => {
        console.error("Error serving asset:", error);
        return fetch(request);
      }),
    );
    return;
  }

  if (request.method === "GET" && url.pathname.includes("/live/")) {
    event.respondWith(
      fakeServer(request).catch((error) => {
        console.error("Error in fakeServer:", error);
        return fetch(request);
      }),
    );
    return;
  }

  event.respondWith(
    CacheUtils.retry(() => fetch(request))
      .catch(() =>
        enhancedFetch(request).catch((error) => {
          console.error("Error in enhancedFetch:", error);
          return new Response("Network error", { status: 503 });
        })
      ),
  );
  return;
});
