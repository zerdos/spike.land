// Import necessary scripts and functions
import { resetCSS } from "./getResetCss";
import HTML from "./index.html";
import { ICodeSession } from "./makeSess";
import { md5 } from "./md5";
import { mkdir, readFile, stat, writeFile } from "./memfs";
import { build, init, transpile } from "./shared";

declare const self:
  & ServiceWorkerGlobalScope
  & { swVersion: string }
  & { files: { [key: string]: string }; fileCacheName: string };

let started = false;

// Initialize the shared worker when receiving a message of type "sharedworker"
self.onmessage = async (event) => {
  if (event.data.type === "sharedworker") {
    globalThis.sharedWorker = event.data;
    const port = event.data.sharedWorkerPort;
    port.start();

    init(self.swVersion, port);
    started = true;
  }
};

// Put the response in cache
const putInCache = async (request: Request, response: Response): Promise<void> => {
  const cache = await caches.open(self.swVersion);
  await cache.put(request, response);
};

// Serve the cached response first, if available
const cacheFirst = async (request: Request): Promise<Response> => {
  if (!request.url.includes("/live/")) {
    const cache = await caches.open(self.swVersion);
    const responseFromCache = await cache.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  }
  try {
    const responseFromNetwork = await fetch(request);
    if (responseFromNetwork.ok && responseFromNetwork.status === 200) {
      await putInCache(request, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  } catch (error) {
    console.error(`Failed to fetch ${request.url}:`, error);
    throw error;
  }
};

// Handle requests to the "live" path
const fakeBackend = async (request: Request): Promise<Response> => {
  try {
    const url = new URL(request.url);

    if (request.method === "POST") {
      return fetch(request);
    }

    const pathName = url.pathname;
    const fileStat = await stat(pathName);
    if (fileStat !== null) {
      const resp = await readFile(pathName);
      return createResponse(resp, 'application/javascript');
    }

    const paths = url.pathname.split("/");
    if (paths[1] === "live") {
      const codeSpacePath = paths[2];
      const isFile = codeSpacePath.includes(".");
      const codeSpace = isFile ? codeSpacePath.split(".")[0] : codeSpacePath;

      // Fetch the session data for the codeSpace
      const session = await fetchSession(url.origin, codeSpace);
      if (!session) {
        return createErrorResponse('Failed to fetch session data', 500);
      }

      const { code, css, html, i } = session;

      // Serve the built JavaScript file
      if (codeSpacePath.endsWith(".mjs")) {
        const resp = await build({ codeSpace, origin: url.origin, format: "esm" });
        return createResponse(resp, 'application/javascript');
      }

      if (["/bundle"].some((suffix) => url.pathname.endsWith(suffix))) {
        const respText = createBundleResponse(HTML, css, codeSpace, i, html);
        return createResponse(respText, 'text/html');
      }

      // Handle transpiling and serving the JavaScript file
      if (url.pathname.startsWith(`/live/${codeSpace}/index.js`) && started) {
        const trp = await transpileAndServe(url.origin, codeSpace, code);
        return createResponse(trp, 'application/javascript');
      }

      if (url.pathname.startsWith(`/live/${codeSpace}/index.mjs`)) {
        const trp = await readFile(`/live/${codeSpace}/index.mjs`).catch(
          async () => fetch(`${url.origin}/live/${codeSpace}/index.mjs`).then((x) => x.text())
        );
        return createResponse(trp, 'application/javascript');
      }
    }

    return cacheFirst(request);
  } catch (err) {
    console.error("Error handling request:", err);
    return createErrorResponse('Internal server error', 500);
  }
};

const fetchSession = async (origin: string, codeSpace: string): Promise<ICodeSession | null> => {
  try {
    const response = await fetch(`${origin}/live/${codeSpace}/session.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as ICodeSession;
  } catch (error) {
    console.error("Error fetching session data:", error);
    return null;
  }
};

const createResponse = (body: string, contentType: string): Response => {
  return new Response(body, {
    headers: {
      "Access-Control-Allow-Origin": location.origin, // Restrict CORS to same origin
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cache-Control": "no-cache",
      "Content-Type": `${contentType}; charset=UTF-8`,
      "content_hash": md5(body),
    },
  });
};

const createErrorResponse = (message: string, status: number): Response => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

const createBundleResponse = (HTML: string, css: string, codeSpace: string, i: number, html: string): string => {
  return HTML.replace("/**reset*/", resetCSS + css)
    .replace(
      "<script src=\"/swVersion.js\"></script>",
      `<script>window.swVersion = "${self.swVersion}"</script>`
    )
    .replace("ASSET_HASH", self.swVersion)
    .replace(
      "<div id=\"root\"></div>",
      `<div id="root" style="height: 100%;"><div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">${html}</div></div>`
    );
};

const transpileAndServe = async (origin: string, codeSpace: string, code: string): Promise<string> => {
  try {
    const trp = await Promise.race([
      fetch(`${origin}/live/${codeSpace}/index.js`).then((x) => x.text()),
      (async () => {
        const trp = await transpile({
          code,
          originToUse: location.origin,
        });
        await mkdir(`/live/${codeSpace}`);
        await writeFile(`/live/${codeSpace}/index.js`, trp);
        return trp;
      })(),
    ]);
    return trp;
  } catch (error) {
    console.error("Error transpiling and serving:", error);
    throw error;
  }
};

// Handle fetch events
self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(fakeBackend(event.request));
});

// Clear old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== self.swVersion) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});