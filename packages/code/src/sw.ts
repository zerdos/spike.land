import type {
  CodeSessionBC as CsBc,
  importMapReplace as ImportMapReplace,
  serveWithCache as ServeWithCache,
  useCodeSpace as UseCodeSpace,
} from "./sw-deps";

import type { transpile as Trp } from "@/lib/transpile";

importScripts("/swVersion.js");

const sw = self as unknown as ServiceWorkerGlobalScope & {
  swVersion: string;
  cSessions: Record<string, CsBc>;
  files: Record<string, string>;
  fileCacheName: string;
};

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
  serveWithCache,
  CodeSessionBC,
  useCodeSpace,
  importMapReplace,
  transpile,
  HTML,
  importMap,
} = globalThis as unknown as {
  serveWithCache: typeof ServeWithCache;
  CodeSessionBC: typeof CsBc;
  useCodeSpace: typeof UseCodeSpace;
  importMapReplace: typeof ImportMapReplace;
  transpile: typeof Trp;
  HTML: string;
  importMap: Record<string, string>;
};

// Initialize cSessions
sw.cSessions = sw.cSessions || {};

// Function to fetch configuration and update sw.fileCacheName
async function fetchConfig() {
  try {
    const response = await fetch("/sw-config.json");
    const config = (await response.json()) as {
      killSwitch: boolean;
      version: string;
      swVersion: string;
    };
    sw.fileCacheName = `sw-file-cache-${config.version}`;
    return config;
  } catch (error) {
    console.error("Failed to fetch configuration:", error);
    return null;
  }
}

// Fetch the configuration initially
const configPromise = fetchConfig();

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
  event.waitUntil(
    (async () => {
      console.log("Service Worker installing.");
      const config = await configPromise;
      if (config && sw.swVersion === config.swVersion) {
        const cacheName = `sw-file-cache-${config.swVersion}`;
        const keys = await caches.keys();

        if (keys.includes(cacheName)) {
          console.log("Cache already exists. Skipping installation.");
          return;
        }
        await caches.open(cacheName);

        // Uncomment and modify if you need to pre-cache assets
        // try {
        //   const cache = await caches.open(cacheName);
        //   await cache.addAll(Object.values(files).map((file) => "/" + file));
        // } catch (error) {
        //   console.error("Error in cache.addAll", error);
        // }

        await sw.skipWaiting();
      }
    })(),
  );
});

// Updated Activate Event Handler
sw.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      console.log("Service Worker activating.");

      // Ensure the config is fetched
      const config = await configPromise;
      if (!config) {
        console.error("Failed to fetch configuration. Skipping activation.");
        return;
      }

      if (config.killSwitch) {
        // If killSwitch is activated, unregister and delete caches
        console.log("Kill switch activated. Unregistering Service Worker.");
        await sw.registration.unregister();
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
        return;
      }

      const cacheSWName = `sw-file-cache-${config.swVersion}`;
      const myCache = await caches.open(cacheSWName);

      // Put files.json into cache
      await myCache.put(
        "/files.json",
        new Response(JSON.stringify(files), {
          headers: { "Content-Type": "application/json" },
        }),
      );

      // Get list of cache names excluding the current one
      const cacheNames = (await caches.keys()).filter(
        (cacheName) => cacheName !== cacheSWName && cacheName.startsWith("sw-file-cache"),
      );

      const allKeys = new Set(
        Object.keys(filesByCacheKeys).map((fileName) => new URL("/" + fileName, location.origin).toString()),
      );

      const myCacheKeys = await myCache.keys();
      const myKeys = new Set(myCacheKeys.map((request) => request.url));

      const missing = setDifference(allKeys, myKeys);

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
      const stillMissing = setDifference(allKeys, updatedMyKeys);

      for (const url of stillMissing) {
        const { pathname, origin } = new URL(url);
        const request = new Request(
          new URL(filesByCacheKeys[pathname.slice(1)], origin).toString(),
        );
        try {
          const response = await fetch(request);
          if (response.ok) {
            await myCache.put(request, response.clone());
          } else {
            console.error(`Failed to fetch ${url}: ${response.statusText}`);
          }
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
        }
      }

      // Delete old caches
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName)),
      );

      // Take control of all clients immediately
      await sw.clients.claim();
      console.log("Service Worker activated and controlling.");
    })(),
  );
});

// Periodically check for killSwitch
let lastConfigCheck = 0;

sw.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  if (Date.now() - lastConfigCheck > 60 * 60 * 1000) {
    // Check every hour
    lastConfigCheck = Date.now();
    event.waitUntil(
      (async () => {
        const config = await fetchConfig();
        if (config?.killSwitch || config?.swVersion !== sw.swVersion) {
          await sw.registration.unregister();
          const clients = await sw.clients.matchAll();
          clients.forEach((client) => {
            (client as WindowClient).navigate(client.url);
          });
        }
      })(),
    );
  }

  if (isAsset(request)) {
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
  }

  if (request.method === "GET" && request.url.includes("/live/")) {
    event.respondWith(fakeServer(request));
    return;
  }

  async function fakeServer(request: Request) {
    const codeSpace = useCodeSpace(new URL(request.url).pathname);
    console.log("CodeSpace:", codeSpace);

    sw.cSessions[codeSpace] = sw.cSessions[codeSpace]
      || new CodeSessionBC(codeSpace);
    const session = await sw.cSessions[codeSpace].init();

    if (
      request.url.includes("/session.json")
    ) {
      console.log("Session request:", request.url);

      return new Response(JSON.stringify(session), {
        headers: {
          "Content-Type": "application/json",
          ...request.headers,
        },
      });
    } else if (
      request.url.includes("/index.tsx")
    ) {
      console.log("Index request:", request.url);

      return new Response(session.code, {
        headers: {
          "Content-Type": "application/javascript; charset=UTF-8",
          ...request.headers,
        },
      });
    } else if (
      request.url.includes("/index.js")
    ) {
      console.log("Transpiled request:", request.url);

      if (typeof session.transpiled !== "string" || session.transpiled === "") {
        const transpiled = await transpile({
          code: session.code,
          originToUse: location.origin,
        }) as unknown as string;
        session.transpiled = transpiled;
        await sw.cSessions[codeSpace].postMessage({
          ...session,
          transpiled,
          i: session.i + 1,
        });
      }

      return new Response(
        importMapReplace(session.transpiled, location.origin),
        {
          headers: {
            "Content-Type": "application/javascript; charset=UTF-8",
            ...request.headers,
          },
        },
      );
    } else if (
      request.url.includes("/index.css")
    ) {
      console.log("css request:", request.url);

      return new Response(session.css, {
        headers: {
          "Content-Type": "text/css; charset=UTF-8",
          ...request.headers,
        },
      });
    } else if (
      request.url.includes("/hydrated")
      || request.url.includes("/worker")
      || request.url.includes("/dehydrated")
      || request.url.includes("/iframe")
      || request.url.includes("/embed")
      || request.url.includes("/public")
      || request.url.endsWith(`/live/${codeSpace}/xxx`)
    ) {
      const respText = HTML.replace(
        `<script type="importmap"></script>`,
        `<script type="importmap">${JSON.stringify(importMap)}</script>`,
      ).replace(
        `<!-- Inline LINK for initial theme -->`,
        `<style>${session.css}</style>`,
      ).replace(
        "<div id=\"embed\"></div>",
        `<div id="embed">${session.html}</div>`,
      );

      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        "Content-Type": "text/html; charset=UTF-8",
      });

      return new Response(respText, { status: 200, headers });
    } else if (
      request.url.endsWith(`/live/${codeSpace}`)
      || request.url.endsWith(`/live/${codeSpace}/`)
    ) {
      const respText = HTML.replace(
        `<script type="importmap"></script>`,
        `<script type="importmap">${JSON.stringify(importMap)}</script>`,
      ).replace(
        "<div id=\"embed\"></div>",
        "<div id=\"embed\"><iframe height= \"100%\" width= \"100%\" border= \"0\" overflow= \"auto\" src=\"/live/"
          + codeSpace + "/iframe\"></iframe></div>",
      );

      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        "Content-Type": "text/html; charset=UTF-8",
      });

      return new Response(respText, { status: 200, headers });
    } else {
      console.log("Default request:", request.url);

      return fetch(request);
    }
  }

  // For non-asset requests, fetch from the network
  event.respondWith(fetch(request));
});
