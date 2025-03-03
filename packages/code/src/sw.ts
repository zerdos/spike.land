import { ServiceWorkerHandlers } from "./@/handlers/sw-handlers";
import { CACHE_VERSION } from "./@/tools/utils/cache-utils";
import { CustomServiceWorkerGlobalScope } from "./@/types/service-worker";

// Import service worker script version
importScripts("/swVersion.js");

const sw = self as unknown as CustomServiceWorkerGlobalScope;

// Initialize cache name with version
sw.fileCacheName = `sw-file-cache-${sw.swVersion}-${CACHE_VERSION}`;

// Load required scripts with hash versioning
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

// Initialize handlers
const handlers = new ServiceWorkerHandlers(sw);

// Register event handlers
sw.addEventListener("install", (event) => {
  event.waitUntil(handlers.handleInstall());
});

sw.addEventListener("activate", (event) => {
  event.waitUntil(handlers.handleActivate());
});

sw.addEventListener("fetch", (event) => {
  handlers.handleFetch(event);
});
