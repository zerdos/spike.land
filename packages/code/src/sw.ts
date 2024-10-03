import { useCodeSpace } from "@/hooks/use-code-space";
import type { CodeSessionBC as CsBc, serveWithCache as ServeWithCache } from "./sw-deps";

importScripts("/swVersion.js");
importScripts("/sw-deps.js");

const { serveWithCache, CodeSessionBC } = globalThis as unknown as {
  serveWithCache: typeof ServeWithCache;
  CodeSessionBC: typeof CsBc;
};

const sw = self as unknown as ServiceWorkerGlobalScope & {
  swVersion: string;
  cSessions: Record<string, CsBc>;
  files: Record<string, string>;
  fileCacheName: string;
};

// Initialize cSessions
sw.cSessions = sw.cSessions || {};

// Function to fetch configuration and update sw.fileCacheName
async function fetchConfig() {
  try {
    const response = await fetch("/sw-config.json");
    const config = (await response.json()) as { killSwitch: boolean; version: string; swVersion: string };
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
      // Proceed with installation
      console.log("Service Worker installing.");
      const config = await configPromise;
      if (config && swVersion === config.swVersion) {
        const cacheName = `sw-file-cache-${config.swVersion}`;
        const keys = await caches.keys();

        if (keys.includes(cacheName)) {
          console.log("Cache already exists. Skipping installation.");
          return;
        }
        await caches.open(cacheName);
        // try {
        //   await cache.addAll(
        //     Object.values(files).map((file) => "/" + file),
        //   );
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

      if (config?.killSwitch) {
        // If killSwitch is activated, unregister and delete caches
        console.log("Kill switch activated. unRegistering Service Worker.");
        await sw.registration.unregister();
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
        return;
      }

      const cacheSWName = `sw-file-cache-${config.swVersion}`;
      // Delete old caches except the current one
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== sw.fileCacheName && cacheName !== cacheSWName)
          .map((cacheName) => caches.delete(cacheName)),
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
  if (Date.now() - lastConfigCheck > 60 * 60 * 1000) {
    // Check every hour
    lastConfigCheck = Date.now();
    event.waitUntil(
      (async () => {
        const config = await fetchConfig();
        if (config?.killSwitch) {
          await sw.registration.unregister();
          const clients = await sw.clients.matchAll();
          clients.forEach((client) => {
            (client as WindowClient).navigate(client.url);
          });
        }
        if (config?.swVersion !== swVersion) {
          await sw.registration.unregister();
          const clients = await sw.clients.matchAll();
          clients.forEach((client) => {
            (client as WindowClient).navigate(client.url);
          });
        }
      })(),
    );
  }
  const request = event.request;

  if (isAsset(request)) {
    return event.respondWith(
      serve(
        request,
        (request: Request) => {
          const url = new URL(request.url);
          const file = url.pathname.slice(1);
          const respPromise = (file in filesByCacheKeys)
            ? fetch(new Request(request.url.replace(file, filesByCacheKeys[file])))
            : fetch(request);

          event.waitUntil(respPromise);

          return respPromise;
        },
        event.waitUntil.bind(event),
      ).catch((error) => {
        console.error("Error in serve", error);
        return fetch(request);
      }),
    );
  }
  if (request.url.includes("/live/") && request.url.includes("/session")) {
    console.log("session request", request.url);

    const codeSpace = useCodeSpace(new URL(request.url).pathname);
    console.log("codeSpace", codeSpace);

    sw.cSessions[codeSpace] = sw.cSessions[codeSpace] || new CodeSessionBC(codeSpace);

    return event.respondWith(
      sw.cSessions[codeSpace].init().then((session) =>
        new Response(JSON.stringify(session), {
          ...request,
          headers: { "Content-Type": "application/json", ...request.headers },
        })
      ),
    );
  }
  // For non-asset requests, fetch from the network
  event.respondWith(fetch(request));
});
