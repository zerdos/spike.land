importScripts("/swVersion.js");
import { resetCSS } from "./getResetCss";
import HTML from "./index.html";
import { md5 } from "./md5";
import { mkdir, readFile, writeFile } from "./memfs";
import { build, init, transpile } from "./shared";
let started = false;
self.onmessage = async (event) => {
  if (event.data.type === "sharedworker") {
    globalThis.sharedWorker = event.data;
    const port = event.data.sharedWorkerPort;
    port.start();
    init(self.swVersion, port);
    started = true;
  }
};
const putInCache = async (request, response) => {
  const cache = await caches.open(self.swVersion);
  await cache.put(request, response);
};
const cacheFirst = async (request) => {
  if (!request.url.includes("/live/")) {
    const cache = await caches.open(self.swVersion);
    const responseFromCache = await cache.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  }
  const responseFromNetwork = await fetch(request);
  if (responseFromNetwork.ok && responseFromNetwork.status === 200) {
    putInCache(request, responseFromNetwork.clone());
  }
  if (!responseFromNetwork.ok) {
    console.error("Error fetching:", request.url, responseFromNetwork.status, responseFromNetwork.statusText);
  }
  return responseFromNetwork;
};
const fakeBackend = async (request) => {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method === "POST") {
    return fetch(request);
  }
  const paths = url.pathname.split("/");
  if (paths[1] === "live") {
    const codeSpacePath = paths[2];
    const isFile = codeSpacePath.includes(".");
    const codeSpace = isFile ? codeSpacePath.split(".")[0] : codeSpacePath;
    try {
      const session = await fetch(`${url.origin}/live/${codeSpace}/session.json`)
        .then((x) => x.json());
      const { code, css, html, i } = session;
      if (codeSpacePath.endsWith(".mjs")) {
        const resp = await build({ codeSpace, origin: url.origin, format: "esm" });
        return new Response(resp, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Type": "application/javascript; charset=UTF-8",
            content_hash: md5(resp),
          },
        });
      }
      if (["/iframe", "/", "/public", "/dehydrated"].some((suffix) => url.pathname.endsWith(suffix))) {
        const respText = HTML.replace("/**reset*/", resetCSS + css)
          .replace("<script src=\"/swVersion.js\"></script>", `<script>window.swVersion = "${self.swVersion}"</script>`)
          .replace("ASSET_HASH", self.swVersion)
          .replace(
            "<div id=\"root\"></div>",
            `<div id="root" style="height: 100%;"><div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">${html}</div></div>`,
          );
        return new Response(respText, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
            content_hash: md5(respText),
          },
        });
      }
      if (["/bundle"].some((suffix) => url.pathname.endsWith(suffix))) {
        const respText = HTML.replace("/**reset*/", resetCSS + css)
          .replace("<script src=\"/swVersion.js\"></script>", `<script>window.swVersion = "${self.swVersion}"</script>`)
          .replace("ASSET_HASH", self.swVersion)
          .replace(
            "<div id=\"root\"></div>",
            `<div id="root" style="height: 100%;"><div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">${html}</div></div>`,
          );
        return new Response(respText, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cache-Control": "no-cache",
            "Content-Type": "text/html; charset=UTF-8",
            content_hash: md5(respText),
          },
        });
      }
      try {
        if (url.pathname.startsWith(`/live/${codeSpace}/index.js`) && started) {
          const trp = await Promise.race([
            fetch(`${url.origin}/live/${codeSpace}/index.js`).then((x) => x.text()),
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
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
              content_hash: md5(trp),
            },
          });
        }
        if (url.pathname.startsWith(`/live/${codeSpace}/index.mjs`)) {
          const trp = await readFile(`/live/${codeSpace}/index.mjs`).catch(async () =>
            fetch(location.origin + `/live/${codeSpace}/index.mjs`).then((x) => x.text())
          );
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
              content_hash: md5(trp),
            },
          });
        }
      } catch (err) {
        console.error("Error serving file:", err);
      }
    } catch (err) {
      console.error("Error fetching session data:", err);
    }
  }
  return cacheFirst(request);
};
self.addEventListener("fetch", (event) => {
  event.respondWith(fakeBackend(event.request));
});
