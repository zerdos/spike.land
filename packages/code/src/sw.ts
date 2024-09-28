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
  cSessions: { [key: string]: CsBc };
  files: { [key: string]: string };
  fileCacheName: string;
};

// Initialize cSessions
sw.cSessions = sw.cSessions || {};

// Function to fetch configuration and update sw.fileCacheName
async function fetchConfig() {
  try {
    const response = await fetch("/sw-config.json");
    const config = (await response.json()) as { killSwitch: boolean; version: string };
    sw.fileCacheName = `sw-file-cache-${config.version}`;
    return config;
  } catch (error) {
    console.error("Failed to fetch configuration:", error);
    return null;
  }
}

// Fetch the configuration initially
let configPromise = fetchConfig();

// Access the files from sw.files
const files = sw.files;

const filesByCacheKeys = Object.entries(files).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as { [key: string]: string });

// Instantiate serveWithCache with dynamic cache name
const { isAsset, serve } = serveWithCache(
  files,
  async () => {
    await configPromise; // Ensure the config is fetched
    return await caches.open(sw.fileCacheName);
  },
);

// Service Worker Installation
sw.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const config = await configPromise;
      if (config?.killSwitch) {
        // If killSwitch is activated, unregister and delete caches
        await sw.registration.unregister();
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
      } else {
        // Proceed with installation
        sw.skipWaiting();
      }
    })(),
  );
});

// Service Worker Activation
sw.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await configPromise; // Ensure the config is fetched
      // Delete old caches except the current one
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== sw.fileCacheName)
          .map((cacheName) => caches.delete(cacheName)),
      );
      // Take control of all clients immediately
      // await sw.clients.claim();
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
      })(),
    );
  }
  const request = event.request;
  const assetFetcher = (request: Request) => {
    const url = new URL(request.url);
    const file = url.pathname.slice(1);
    const respPromise = (file in filesByCacheKeys)
      ? fetch(new Request(request.url.replace(file, filesByCacheKeys[file])))
      : fetch(request);

    event.waitUntil(respPromise);

    return respPromise;
  };

  if (isAsset(request)) {
    event.respondWith(
      serve(
        request,
        assetFetcher,
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

    event.respondWith(
      sw.cSessions[codeSpace].init().then((session) =>
        new Response(JSON.stringify(session), {
          ...request,
          headers: { "Content-Type": "application/json", ...request.headers },
        })
      ),
    );
    return;
  }
  // For non-asset requests, fetch from the network
  event.respondWith(fetch(request));
});
