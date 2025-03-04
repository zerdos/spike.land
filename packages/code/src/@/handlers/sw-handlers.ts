import { enhancedFetch } from "../../enhancedFetch";
import { CacheUtils, CDN_DOMAIN } from "../../tools/utils/cache-utils";
import { ConfigManager } from "../../tools/utils/config-manager";
import { FileCacheManager } from "../../tools/utils/file-cache";
import { CustomServiceWorkerGlobalScope } from "../types/service-worker";

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
    const queuedFetch = new QueuedFetch(4);

    try {
      const config = await this.configManager.getConfig();

      if (this.sw.swVersion === config.swVersion) {
        console.log("SwVersion matches. Fetching files.");

        await this.fileCacheManager.initializeFilesCache();

        const myCache = await caches.open(this.sw.fileCacheName);
        const cacheNames = (await caches.keys())
          .filter((cacheName) => cacheName !== this.sw.fileCacheName);

        const allKeys = this.fileCacheManager.getAllFileUrls();
        const myCacheKeys = await myCache.keys();
        const myKeys = new Set(myCacheKeys.map((request) => request.url));
        const missing = CacheUtils.setDifference(allKeys, myKeys);

        const stillMissing = await CacheUtils.getMissingFiles(
          missing,
          cacheNames,
          myCache,
        );
        // console.log("Still missing files:", [...stillMissing].join(", "));

        // await Promise.allSettled(
        //   [...stillMissing].map(async (url) =>
        //     this.fileCacheManager.fetchAndCacheFile(url, queuedFetch, myCache)
        //   ),
        // );

        // await this.fileCacheManager.validateCacheIntegrity();
        await this.sw.skipWaiting();

        await CacheUtils.cleanOldCaches(this.sw.fileCacheName);

        console.log("Service Worker installed successfully.");
      }
    } catch (error) {
      console.error("Service Worker installation failed:", error);
      throw error;
    }
  }

  async handleActivate(): Promise<void> {
    try {
      console.log("Service Worker activating.");

      // await this.fileCacheManager.validateCacheIntegrity();
      await CacheUtils.cleanOldCaches(this.sw.fileCacheName);
      await this.sw.clients.claim();

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
        // const newUrl = cacheFile ? req.url.replace(file, cacheFile) : req.url;
        return CacheUtils.retry(() => fetch(file));
      },
      event.waitUntil.bind(event),
    ).catch((error) => {
      console.error("Error serving asset:", error);
      return fetch(request);
    });
  }
}
