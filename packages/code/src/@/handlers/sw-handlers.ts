import { serveWithCache } from "@/lib/serve-with-cache";
import { enhancedFetch } from "../../enhancedFetch";
import { fakeServer } from "../../sw-local-fake-server";
import { CacheUtils, CDN_DOMAIN } from "../../workflows/tools/utils/cache-utils";
import { ConfigManager } from "../../workflows/tools/utils/config-manager";
import { FileCacheManager } from "../../workflows/tools/utils/file-cache";
import type { CustomServiceWorkerGlobalScope } from "../types/service-worker";

export class ServiceWorkerHandlers {
  private readonly sw: CustomServiceWorkerGlobalScope;
  private readonly fileCacheManager: FileCacheManager;
  private readonly configManager: ConfigManager;

  constructor(sw: CustomServiceWorkerGlobalScope) {
    this.sw = sw;
    this.fileCacheManager = new FileCacheManager(sw);
    this.configManager = ConfigManager.getInstance();
  }

  async handleInstall(): Promise<void> {
    console.log("Service Worker installing.");
    try {
      const config = await this.configManager.getConfig();

      console.log(
        `Current SW version: ${this.sw.swVersion}, Config version: ${config.swVersion}`,
      );

      // Initialize file cache regardless of version
      await this.fileCacheManager.initializeFilesCache();

      // Open cache for this version
      const myCache = await caches.open(this.sw.fileCacheName);

      // Get all previous cache names
      const cacheNames = (await caches.keys())
        .filter((cacheName) => cacheName !== this.sw.fileCacheName);

      // Get all file URLs that should be cached
      const allKeys = this.fileCacheManager.getAllFileUrls();

      // Check what's already in our cache
      const myCacheKeys = await myCache.keys();
      const myKeys = new Set(myCacheKeys.map((request) => request.url));

      // Find what's missing
      const missing = CacheUtils.setDifference(allKeys, myKeys);
      console.log(`Found ${missing.size} files to cache`);

      // Try to copy from old caches first to avoid unnecessary network requests
      const stillMissing = await CacheUtils.getMissingFiles(
        missing,
        cacheNames,
        myCache,
      );

      console.log(`Still need to fetch ${stillMissing.size} files`);

      // Create a simple fetch wrapper for caching
      const queuedFetch = {
        fetch: (request: Request, init?: RequestInit) => fetch(request, init),
      };

      // Fetch and cache remaining files
      if (stillMissing.size > 0) {
        await Promise.allSettled(
          [...stillMissing].map(async (url) =>
            this.fileCacheManager.fetchAndCacheFile(url, queuedFetch, myCache)
          ),
        );
      }

      // Validate cache integrity
      await this.fileCacheManager.validateCacheIntegrity();

      // Skip waiting to activate immediately
      await this.sw.skipWaiting();

      // Clean up old caches
      await CacheUtils.cleanOldCaches(this.sw.fileCacheName);

      console.log("Service Worker installed successfully.");
    } catch (error) {
      console.error("Service Worker installation failed:", error);
      throw error;
    }
  }

  async handleActivate(): Promise<void> {
    try {
      console.log("Service Worker activating.");

      // Do a final validation of cache integrity
      await this.fileCacheManager.validateCacheIntegrity();

      // Clean up old caches again (just to be safe)
      await CacheUtils.cleanOldCaches(this.sw.fileCacheName);

      // Take control of all clients
      await this.sw.clients.claim();

      // Notify clients to reload if needed
      const clients = await this.sw.clients.matchAll({ type: "window" });
      for (const client of clients) {
        client.postMessage({
          type: "CACHE_UPDATED",
          message: "New service worker activated with updated cache",
        });
      }

      console.log("Service Worker activated and controlling.");
    } catch (error) {
      console.error("Service Worker activation failed:", error);
      throw error;
    }
  }

  handleFetch(event: FetchEvent): void {
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

    // Check if this is a request for a file that we know about from swVersion.js
    const filePath = url.pathname.slice(1); // Remove leading slash
    const hashedFile = this.sw.files[filePath];

    if (hashedFile) {
      event.respondWith(this.serveFromCache(filePath, hashedFile, event));
      return;
    }

    const path = url.pathname.slice(1).split("/");
    const [preRoute, codeSpace] = path;

    const isEditorPath = request.method === "GET" &&
      preRoute === "live" &&
      url.pathname === `/live/${codeSpace}`;

    const { isAsset, serve } = serveWithCache(
      this.sw.files,
      async () => await caches.open(this.sw.fileCacheName),
    );

    if (isEditorPath) {
      console.log("Serving editor:", request.url);
      const editorRequest = new Request(
        new URL("/index.html", url.origin).toString(),
      );

      event.respondWith(this.handleServeRequest(editorRequest, serve, event));
      return;
    } else if (isAsset(request)) {
      event.respondWith(this.handleServeRequest(request, serve, event));
      return;
    }

    if (request.method === "GET" && url.pathname.includes("/live/")) {
      event.respondWith(
        fakeServer(request).catch((error: Error) => {
          console.error("Error in fakeServer:", error);
          return fetch(request);
        }),
      );
      return;
    }

    // For all other requests, try network first with fallback to enhanced fetch
    event.respondWith(
      CacheUtils.retry(() => fetch(request))
        .catch(() =>
          enhancedFetch(request).catch((error) => {
            console.error("Error in enhancedFetch:", error);
            return new Response("Network error", { status: 503 });
          })
        ),
    );
  }

  private async serveFromCache(
    filePath: string,
    hashedFile: string,
    event: FetchEvent,
  ): Promise<Response> {
    try {
      // Open our cache
      const cache = await caches.open(this.sw.fileCacheName);

      // Try to get the file from cache using the hashed filename
      const cacheKey = new Request(
        new URL("/" + hashedFile, location.origin).toString(),
      );
      const cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        // If we have it in cache, return it immediately
        return cachedResponse;
      }

      // If not in cache, fetch it from network
      console.log(`Cache miss for ${filePath}, fetching from network`);
      const response = await fetch(cacheKey);

      // Cache the response for next time
      if (response.ok) {
        event.waitUntil(cache.put(cacheKey, response.clone()));
      }

      return response;
    } catch (error) {
      console.error(`Error serving ${filePath} from cache:`, error);
      // Fall back to normal fetch if there's an error
      return fetch(new URL("/" + filePath, location.origin).toString());
    }
  }

  private handleServeRequest(
    request: Request,
    serve: (
      request: Request,
      fetcher: (request: Request) => Promise<Response>,
      waitUntil: (promise: Promise<unknown>) => void,
    ) => Promise<Response>,
    event: FetchEvent,
  ): Promise<Response> {
    return serve(
      request,
      (req: Request) => {
        const url = new URL(req.url);
        const file = url.pathname.slice(1);
        const cacheFile = this.sw.files[file];

        if (cacheFile) {
          // If we have a hashed version, use that
          const newUrl = new URL("/" + cacheFile, url.origin).toString();
          return CacheUtils.retry(() => fetch(newUrl));
        }

        // Otherwise fetch the original file
        return CacheUtils.retry(() => fetch(file));
      },
      event.waitUntil.bind(event),
    ).catch((error) => {
      console.error("Error serving asset:", error);
      return fetch(request);
    });
  }
}
