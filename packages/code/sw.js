importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts(
  "https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js",
);

const getUrl = () => {
  if (location.href.includes("zed.dev")) {
    return "https://code.zed.dev";
  }
  return "https://code.zed.vision";
};

let needToSave = false;

(({ Comlink, idb, location, caches, addEventListener }) => {
  const dbPromise = idb.openDB("localZedCodeStore", 1, {
    upgrade(db) {
      db.createObjectStore("codeStore");
    },
  });

  const codeDB = {
    async get(key, format = "string") {
      const data = (await dbPromise).get("codeStore", key);
      if (!data) return null;
      if (format === "string") {
        const allData = await data;
        if (typeof allData === format) return allData;

        const decoder = new TextDecoder();
        const text = decoder.decode(allData);
        return text;
      }
      return data;
    },
    async put(key, val) {
      let str = val;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      }

      return (await dbPromise).put("codeStore", str, key);
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

  addEventListener("fetch", async function (e) {
    self.runner = "browser-sw";
    if (e.request.headers.get("API_KEY")) {
      e.respondWith(fetch(e.request));
    }
    if (
      e.request.method === "GET" && e.request.url.includes("zed.") &&
      (e.request.url.includes("?h") || e.request.url.includes("?r"))
    ) {
      const url = new URL(e.request.url);

      if (url.searchParams.get("h")) {
        const hash = url.searchParams.get("h");
        const val = await codeDB.get(hash);

        if (val) {
          e.respondWith(val);
        }
      }
    }

    const share = e.request.headers.get("SHARE");
    if (!share && e.request.method === "POST") {
      e.respondWith(
        (async () => {
          const share = e.request.headers.get("SHARE");
          const data = (await e.request.arrayBuffer());

          if (needToSave && location.origin.includes("zed.")) {
            const request = new Request(
              getUrl(),
              {
                body: data,
                method: "POST",
                headers: { "content-type": "text/html;charset=UTF-8" },
              },
            );

            await fetch(request)
              .then((response) => response.json())
              .then((data) =>
                console.log("SERVER HASH: " + JSON.stringify(data))
              )
              .catch(function failureCallback(error) {
                console.error("Error" + error);
              });
          }

          const myDigest = await crypto.subtle.digest(
            {
              name: "SHA-256",
            },
            data,
          );

          const hashArray = Array.from(new Uint8Array(myDigest));

          // convert bytes to hex string
          const hash = hashArray.map((b) => ("00" + b.toString(16)).slice(-2))
            .join(
              "",
            );
          const smallerKey = hash.substring(0, 8);
          await codeDB.put(smallerKey, data);

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
      return codeDB.put(key, val);
    },
    get(key) {
      return codeDB.get(key);
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
