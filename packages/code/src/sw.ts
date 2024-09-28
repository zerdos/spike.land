// sw.ts

const sw = self as unknown as ServiceWorkerGlobalScope & {
  swVersion: string;
  cSessions: { [key: string]: CodeSessionBC };
  files: { [key: string]: string };
  fileCacheName: string;
};

importScripts("/swVersion.js");

import { serveWithCache } from "@/lib/serve-with-cache";
import { CodeSessionBC } from "./services/CodeSessionBc";

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
      await sw.clients.claim();
    })(),
  );
});

// Message Handler
sw.addEventListener("message", (event) => {
  const { data } = event;
  if (data && data.type === "SKIP_WAITING") {
    sw.skipWaiting();
  }
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

  if (isAsset(request)) {
    event.respondWith(
      serve(
        request,
        (req, waitUntil) => {
          const respPromise = fetch(req, { redirect: "follow" });
          waitUntil(respPromise);
          return respPromise;
        },
        event.waitUntil.bind(event),
      ).catch((error) => {
        console.error("Error in serve", error);
        sw.skipWaiting();
        return fetch(request);
      }),
    );
  } else {
    // For non-asset requests, fetch from the network
    event.respondWith(fetch(request));
  }
});
