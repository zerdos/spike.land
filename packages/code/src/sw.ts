import { ServiceWorkerHandlers } from "./@/handlers/sw-handlers";
import type { CustomServiceWorkerGlobalScope } from "./@/types/service-worker";
import { CACHE_VERSION } from "./workflows/tools/utils/cache-utils";

/**
 * Enhanced Service Worker
 *
 * This service worker is responsible for:
 * 1. Caching static assets based on their content hash (from swVersion.js)
 * 2. Serving assets from cache when available
 * 3. Handling version updates by intelligently updating the cache
 */

// Set up self reference with proper type
const sw = self as unknown as CustomServiceWorkerGlobalScope;

// Set default version in case swVersion.js fails to load
sw.swVersion = sw.swVersion || "unknown";
sw.files = sw.files || {};

try {
  // Import service worker version information
  importScripts("/swVersion.js");

  console.warn(`Service Worker initializing with version: ${sw.swVersion}`);
  console.warn(`Found ${Object.keys(sw.files).length} files to manage`);

  // Initialize cache name with version
  sw.fileCacheName = `sw-file-cache-${sw.swVersion}-${CACHE_VERSION}`;

  // Load required dependency scripts with hash versioning
  try {
    // Get hashed filenames for dependencies
    const swDepsInFiles = sw.files["sw-deps.js"]?.split(".") || [];

    // Extract hash portions
    let swDepsHash = "";

    if (swDepsInFiles.length >= 2) {
      swDepsInFiles.pop(); // Remove js extension
      swDepsHash = swDepsInFiles.pop() || ""; // Get hash
    }

    // Import dependencies with cache-busting hashes
    const scripts = [];

    scripts.push("/@/workers/transpile.worker.js");

    if (swDepsHash) {
      scripts.push("/sw-deps.js" + "?hash=" + swDepsHash);
    } else {
      scripts.push("/sw-deps.js");
    }

    importScripts(...scripts);
    console.warn("Successfully loaded dependency scripts");
  } catch (error) {
    console.error("Error loading dependency scripts:", error);
    // Continue anyway - we can still function without these scripts in many cases
  }

  // Initialize handlers
  const handlers = new ServiceWorkerHandlers(sw);

  // Register event handlers
  sw.addEventListener("install", (event) => {
    console.warn("Service Worker install event triggered");
    event.waitUntil(
      handlers.handleInstall()
        .catch((error) => {
          console.error("Error during installation:", error);
          // Re-throw to properly mark installation as failed
          throw error;
        }),
    );
  });

  sw.addEventListener("activate", (event) => {
    console.warn("Service Worker activate event triggered");
    event.waitUntil(
      handlers.handleActivate()
        .catch((error) => {
          console.error("Error during activation:", error);
          throw error;
        }),
    );
  });

  sw.addEventListener("fetch", (event) => {
    handlers.handleFetch(event);
  });

  // Add message handler for communication from the client
  sw.addEventListener("message", (event) => {
    console.warn("Service Worker received message:", event.data);

    if (event.data?.type === "SKIP_WAITING") {
      sw.skipWaiting();
    }
  });

  console.warn("Service Worker initialization complete");
} catch (error) {
  console.error("Critical Service Worker initialization error:", error);

  // Add minimal fallback fetch handler to prevent complete failure
  sw.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
  });
}
