importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts(
  "https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js",
);

// importScripts(
//   "https://unpkg.com/@zedvision/code@VERSION/dist/htmlNoModule.js",
// );

(({ Comlink, idb, location, caches, addEventListener }) => {
  const dbPromise = idb.openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  const SHATEST = {
    async get(key, format = "text") {
      const data = (await dbPromise).get("codeStore", key);
      if (!data) return null;
      if (format === "text") {
        const allData = await data;
        const decoder = new TextDecoder();
        const text = decoder.decode(allData);
        return text;
      }
      return data;
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

  var cacheKey = "VERSION-1";

  addEventListener("install", function (e) {
    e.waitUntil(
      caches.open(cacheKey).then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
        ]);
      }),
    );
  });

  addEventListener("fetch", function (e) {
    self.runner = "browser-sw";

    if (e.request.method === "POST") {
      e.respondWith(
        (async () => {
          const data = (await e.request.text());
          const request = new Request(
            "https://code.zed.vision",
            {
              body: data,
              method: "POST",
              headers: { "content-type": "text/html;charset=UTF-8" },
            },
          );

          fetch(request)
            .then((response) => response.json())
            .then((data) => console.log("SERVER HASH: " + JSON.stringify(data)))
            .catch(function failureCallback(error) {
              console.error("Error generating audio file: " + error);
            });

          const myBuffer = new TextEncoder().encode(JSON.stringify(data));

          const myDigest = await crypto.subtle.digest(
            {
              name: "SHA-256",
            },
            myBuffer,
          );

          const hashArray = Array.from(new Uint8Array(myDigest));

          // convert bytes to hex string
          const hash = hashArray.map((b) => ("00" + b.toString(16)).slice(-2))
            .join(
              "",
            );
          const smallerKey = hash.substring(0, 8);
          await SHATEST.put(smallerKey, myBuffer);

          return new Response(JSON.stringify({ hash: smallerKey }), {
            headers: { "Content-Type": "application/json" },
          });
        })(),
      );
      return;

      // e.res

      // const resp = new Response();
      // return
    }
    // if (e.request.url==="code.zed.vision" && req)

    const tryInCachesFirst = caches.open(cacheKey).then((cache) => {
      return cache.match(e.request).then((response) => {
        if (!response) {
          // console.log("NO CACHE MATCH");
          return handleNoCacheMatch(e);
        }

        fetchFromNetworkAndCache(e);

        return response;
      });
    });

    e.respondWith(tryInCachesFirst);
  });

  addEventListener("activate", function (e) {
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
      e.request.cache === "only-if-cached" // && e.request.mode !== "same-origin"
    ) {
      console.log("NO CACHE!", e);
      return;
    }

    return fetch(e.request).then((res) => {
      console.log(res);
      if (
        res.type === "opaque" || //new URL(res.url) !== location.origin ||
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
})(self);
