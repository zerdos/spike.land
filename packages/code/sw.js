importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts("https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js");

// importScripts(
//   "https://unpkg.com/@zedvision/code@VERSION/dist/html.js",
// );

const dbPromise = idb.openDB("localZedCodeStore", 1, {
  upgrade(db) {
    db.createObjectStore("codeStore");
  },
});

const SHATEST = {
  async get(key) {
    return (await dbPromise).get("codeStore", key);
  },
  async put(key, val) {
    return (await dbPromise).put("codeStore", val, key);
  },
  async delete(key) {
    return (await dbPromise).delete("codeStore", key);
  },
  async clear() {
    return (await dbPromise).clear("codeStore");
  },
  async keys() {
    return (await dbPromise).getAllKeys("codeStore");
  },
};

var cacheKey = "VERSION";

this.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheKey).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
      ]);
    }),
  );
});

self.addEventListener("fetch", function (e) {
  self.runner = "browser-sw";

  const tryInCachesFirst = caches.open(cacheKey).then((cache) => {
    return cache.match(e.request).then((response) => {
      if (!response) {
        console.log("NO CACHE MATCH");
        return handleNoCacheMatch(e);
      }

      fetchFromNetworkAndCache(e);

      return response;
    });
  });

  e.respondWith(tryInCachesFirst);
});

this.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== cacheKey) {
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
    console.log(res);
    if (
      res.type === "opaque" || new URL(res.url) !== location.origin ||
      location.search !== ""
    ) {
      return res;
    }

    return caches.open(cacheKey).then((cache) => {
      // TODO: figure out if the content is new and therefore the page needs a reload.

      if (e.request.method !== "POST") {
        cache.put(e.request, res.clone());
      }
      return res;
    });
  }).catch((err) => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
  return fetchFromNetworkAndCache(e);
}

const obj = {
  counter: 0,
  put(key, val) {
    return SHATEST.put(key, val);
  },
  get(key) {
    return SHATEST.get(key);
  },
  inc() {
    this.counter++;
  },
};

self.addEventListener("message", (event) => {
  if (event.data.comlinkInit) {
    Comlink.expose(obj, event.data.port);
  }
});
