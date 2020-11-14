importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts("https://unpkg.com/@zedvision/code@7.1.5/dist/worker-script.js")
// importScripts("../../../dist/umd/comlink.js");

const runner = "browser-sw";
const VERSION = "8";

this.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then((cache) => {
      return cache.addAll([
        "/",
        "/sw.js"
      ]);
    }),
  );
});

this.addEventListener("fetch", function (e) {
  const tryInCachesFirst = caches.open(VERSION).then((cache) => {
    return cache.match(e.request).then((response) => {
      console.log(e);

      if (!response) {
        return handleNoCacheMatch(e);
      }
      // Update cache record in the background
      fetchFromNetworkAndCache(e);
      // Reply with stale data
      return response;
    });
  });
  e.respondWith(tryInCachesFirst);
});

this.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== VERSION) {
          return caches.delete(key);
        }
      }));
    }),
  );
});

function fetchFromNetworkAndCache(e) {
  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.
  // There's probably more going on here, but I'd rather just ignore this problem. :)
  // https://github.com/paulirish/caltrainschedule.io/issues/49
  if (
    e.request.cache === "only-if-cached" && e.request.mode !== "same-origin"
  ) {
    return;
  }

  return fetch(e.request).then((res) => {
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    // if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(VERSION).then((cache) => {
      // TODO: figure out if the content is new and therefore the page needs a reload.
      cache.put(e.request, res.clone());
      return res;
    });
  }).catch((err) => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
  return fetchFromNetworkAndCache(e);
}


const obj = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    Comlink.expose(obj, event.data.port);
    return;
  }
});