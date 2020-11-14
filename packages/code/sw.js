importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts("https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js");
importScripts("https://unpkg.com/@zedvision/code@VERSION/dist/worker-script.js");

const dbPromise = openDB('local-keyval-store', 1, {
  upgrade(db) {
    db.createObjectStore('codeStore');
  },
});

const SHATEST = {
  async get(key) {
    return (await dbPromise).get('keyval', key);
  },
  async put(key, val) {
    return (await dbPromise).put('keyval', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('keyval', key);
  },
  async clear() {
    return (await dbPromise).clear('keyval');
  },
  async keys() {
    return (await dbPromise).getAllKeys('keyval');
  },
};

// importScripts("../../../dist/umd/comlink.js");


var cacheKey = "VERSION";

this.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheKey).then((cache) => {
      return cache.addAll([
        "/",
        "/sw.js",
      ]);
    }),
  );
});

let dbRequest = indexedDB.open("bookstore");
dbRequest.onsuccess = (event) => {
  let db = event.target.result;

this.addEventListener("fetch", function (e) {
  self.runner = "browser-sw";


  db.onclose = (event) => {
    alert("the database: " + db.name + "was closed outside the script!");
  };
};


  const tryInCachesFirst = caches.open(cacheKey).then((cache) => {
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
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    // if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(cacheKey).then((cache) => {
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
  put(key, val){return SHATEST.put(key, val)}
  get(key){return SHATEST.get(key)}
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
