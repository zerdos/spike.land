import type { fakeServer as FakeServer, QueuedFetch as Qf, serveWithCache as ServeWithCache } from "./sw-deps";

import { routes } from "@/lib/routes";
import type { transpile as Trp } from "@/lib/transpile";

importScripts("/swVersion.js");

const sw = self as unknown as ServiceWorkerGlobalScope & {
  swVersion: string;
  files: Record<string, string>;
  fileCacheName: string;
};
sw.fileCacheName = `sw-file-cache-${sw.swVersion}`;

const swDepsInFiles = sw.files["sw-deps.js"].split(".");
swDepsInFiles.pop(); // js
const hash = swDepsInFiles.pop(); // hash

const transpileWorker = sw.files["@/workers/transpile.worker.js"].split(".");
transpileWorker.pop(); // js
const transpileWorkerHash = transpileWorker.pop(); // hash
importScripts(
  "/@/workers/transpile.worker.js" + "?hash=" + transpileWorkerHash,
);

importScripts("/sw-deps.js" + "?hash=" + hash); // sw-deps.js

const {
  fakeServer,
  serveWithCache,
  QueuedFetch,
} = globalThis as unknown as {
  fakeServer: typeof FakeServer;
  QueuedFetch: typeof Qf;
  serveWithCache: typeof ServeWithCache;

  transpile: typeof Trp;
  HTML: string;
  importMap: Record<string, string>;
};

// Initialize cSessions

type Config = {
  killSwitch: boolean;
  version: string;
  swVersion: string;
  validUntil: number;
};

// Function to fetch configuration and update sw.fileCacheName
async function fetchConfig() {
  try {
    const response = await fetch("/sw-config.json");
    const config = (await response.json()) as Config;

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

// Fetch the configuration initially
let configPromise: Promise<Config> | Config;
const config = async () => {
  let cf = await (fetchConfig().then((config) => configPromise = config));
  if (!cf || Date.now() > cf.validUntil) {
    cf = await fetchConfig();
    configPromise = cf;
    return cf;
  }

  return cf;
};

// Access the files from sw.files
const files = sw.files;

const filesByCacheKeys = Object.entries(files).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

// Utility functions for set operations
function setDifference<T>(setA: Set<T>, setB: Set<T>) {
  return new Set([...setA].filter((x) => !setB.has(x)));
}

function setIntersection<T>(setA: Set<T>, setB: Set<T>) {
  return new Set([...setA].filter((x) => setB.has(x)));
}

// Instantiate serveWithCache with dynamic cache name
const { isAsset, serve } = serveWithCache(
  files,
  async () => {
    await configPromise; // Ensure the config is fetched
    return await caches.open(sw.fileCacheName);
  },
);

// Updated Install Event Handler
sw.addEventListener("install", (event) => {
  const queuedFetch = new QueuedFetch(4);

  event.waitUntil(
    (async () => {
      console.log("Service Worker installing.");

      if (sw.swVersion === (await config())!.swVersion) {
        console.log("SwVersion matches. Fetching files.");

        // const keys = await caches.keys();

        const myCache = await caches.open(sw.fileCacheName);
        const myCacheKeys = await myCache.keys();
        const myKeys = new Set(myCacheKeys.map((request) => request.url));

        console.log({ myKeys });

        if (!myCacheKeys.length) {
          await myCache.put(
            "/files.json",
            new Response(JSON.stringify(files), {
              headers: { "Content-Type": "application/json" },
            }),
          );
        }

        // Get list of cache names excluding the current one
        const cacheNames = (await caches.keys()).filter(
          (cacheName) => cacheName !== sw.fileCacheName,
        );

        console.log({ cacheNames });

        const allKeys = new Set(
          Object.keys(filesByCacheKeys).map((fileName) => new URL("/" + fileName, location.origin).toString()),
        );

        const missing = setDifference(allKeys, myKeys);
        console.log({ missing });

        const stillMissing = await getMissingFiles(
          missing,
          cacheNames,
          myCache,
        );
        console.log({ stillMissing });

        await Promise.allSettled([...stillMissing].map(async (url) => {
          const { pathname, origin } = new URL(url);
          const cacheKey = pathname.slice(1);
          const request = new Request(
            new URL(filesByCacheKeys[cacheKey], origin).toString(),
          );
          const parts = cacheKey.split(".");
          parts.pop();
          const hash = parts.pop();
          if (hash?.length !== 10 && hash?.length !== 8) {
            console.error(`Invalid hash for ${url}`);
            console.error(`Expected: 8- 10 characters`);
            console.error(`Received: ${hash}`);
            throw new Error(`Invalid hash for ${url}`);
          }
          const cacheRequest = new Request(
            new URL(cacheKey, origin).toString(),
          );
          try {
            const response = await queuedFetch.fetch(request, {
              cache: "no-store",
            });

            if (!response.headers.has("x-hash")) {
              throw new Error(`Hash header missing for ${url}`);
            }
            if (response.headers.get("x-hash") !== hash) {
              console.error(`Hash mismatch for ${url}`);
              console.error(`Expected: ${hash}`);
              console.error(`Received: ${response.headers.get("x-hash")}`);

              throw new Error(`Hash mismatch for ${url}`);
            }
            if (response.ok) {
              await myCache.put(cacheRequest, response.clone());
            } else {
              console.error(`Failed to fetch ${url}: ${response.statusText}`);
            }
          } catch (error) {
            console.error(`Error fetching ${url}:`, error);
          }
        }));

        // integrity check
        const updatedMyCacheKeys2 = await myCache.keys();
        const updatedMyKeys2 = new Set(
          updatedMyCacheKeys2.map((request) => request.url),
        );
        const stillMissing2 = setDifference(allKeys, updatedMyKeys2);
        if (stillMissing2.size) {
          console.error("Failed to fetch the following files:", [
            ...stillMissing2,
          ]);
          // sw.registration.unregister();
          return;
        }

        await sw.skipWaiting();
        console.log("Service Worker installed.");
      }
      console.log("Service Worker installed."); // Ensure the config is fetched
    })(),
  );
});

// Updated Activate Event Handler
sw.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // integrity check
      const myCache = await caches.open(sw.fileCacheName);
      const allKeys = new Set(
        Object.keys(filesByCacheKeys).map((fileName) => new URL("/" + fileName, location.origin).toString()),
      );

      // const myCacheKeys = await myCache.keys();
      // const myKeys = new Set(myCacheKeys.map((request) => request.url));

      const updatedMyCacheKeys2 = await myCache.keys();
      const updatedMyKeys2 = new Set(
        updatedMyCacheKeys2.map((request) => request.url),
      );
      const stillMissing2 = setDifference(allKeys, updatedMyKeys2);
      if (stillMissing2.size) {
        console.error("Failed to fetch the following files:", [
          ...stillMissing2,
        ]);
        // sw.registration.unregister();
        return;
      }

      console.log("Service Worker activating."); // Ensure the config is fetched

      const cacheNames = (await caches.keys()).filter((x) => x !== sw.fileCacheName);
      // Delete old caches
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)),
      );

      // Take control of all clients immediately
      sw.clients.claim();
      // sw.clients.matchAll().then((clients) => {
      //   clients.forEach((client) => {
      //     client.postMessage("reload");
      //   });
      // });

      console.log("Service Worker activated and controlling.");
    })(),
  );
});

sw.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  } else if (isAsset(request)) {
    event.respondWith(
      serve(
        request,
        (req: Request) => {
          const url = new URL(req.url);
          const file = url.pathname.slice(1);
          const cacheFile = filesByCacheKeys[file];
          const newUrl = cacheFile ? req.url.replace(file, cacheFile) : req.url;
          return fetch(newUrl);
        },
        event.waitUntil.bind(event),
      ).catch((error) => {
        console.error("Error in serve", error);
        return fetch(request);
      }),
    );
    return;
  } else if (request.method === "GET" && (request.url.includes("/live/") || pathname in Object.keys(routes))) {
    event.respondWith(fakeServer(request));
    return;
  }

  // For non-asset requests, fetch from the network
  event.respondWith(fetch(request));
});

async function getMissingFiles(
  missing: Set<string>,
  cacheNames: string[],
  myCache: Cache,
) {
  // Copy missing items from old caches
  for (const cacheName of cacheNames) {
    const oldCache = await caches.open(cacheName);
    const oldCacheKeys = await oldCache.keys();
    const oldKeys = new Set(oldCacheKeys.map((request) => request.url));

    const oldCacheHasItems = setIntersection(oldKeys, missing);

    for (const url of oldCacheHasItems) {
      const request = new Request(url);
      const response = await oldCache.match(request);
      if (response) {
        await myCache.put(request, response);
      }
    }
  }

  // Fetch any remaining missing files from the network
  const updatedMyCacheKeys = await myCache.keys();
  const updatedMyKeys = new Set(
    updatedMyCacheKeys.map((request) => request.url),
  );
  const stillMissing = setDifference(missing, updatedMyKeys);
  return stillMissing;
}
