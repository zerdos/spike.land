export const version = `7.1.14`; export const html = `<!DOCTYPE html>
<html>

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">
  <meta content="utf-8" http-equiv="encoding">

  <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/react@11.0.0/dist/emotion-react.umd.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
  <!-- <script crossorigin src="https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js"></script> -->
  <script crossorigin src="https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    crossorigin="anonymous" />

  <style>
    #container {
      background-color: #1e1e1e;
      width: 100vw;
      height: 100vh;
    }

    /* body {
      overflow: hidden;
      width: 100%;
      height: 100vh
    } */

    /* @keyframes opening {
      from {
        width: 10%;
        height: 20vh;
      }

      66% {
        width: 100%;
        height: 20vh;
      }

      to {
        width: 100%;
        height: 100vh;
      }
    } */


    #error {
      display: none;
      background-color: red;
      opacity: 0.7;
    }


    #ace {
      display: none;
    }


  

    #ace {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }


    .almosthidden {
      opacity: 0.5;
    }

    button {
      font-size: large;
    }
  </style>
</head>

<body>
  <div id="error" class="draggable"></div>
  <div id="root"></div>
  
  <div id="container"></div>

  <div id="ace"></div>

<script type="module">
import * as Comlink from "https://unpkg.com/comlink@4.3.0/dist/esm/comlink.mjs";

const SHATEST = {}

async function initComlink() {
  const { port1, port2 } = new MessageChannel();
  const msg = {
    comlinkInit: true,
    port: port1,
  };

  navigator.serviceWorker.controller.postMessage(msg, [port1]);

  const swProxy = Comlink.wrap(port2);
  SHATEST.get = (key) => swProxy.get(key);
  shaTEST.put = (key, value) => swProxy.put(key, value);
  console.log(await swProxy.counter);
  await swProxy.inc();
  console.log(await swProxy.counter);
}

if (navigator.serviceWorker.controller) {
  initComlink();
}

navigator.serviceWorker.addEventListener("controllerchange", initComlink);
navigator.serviceWorker.register("sw.js");

// navigator.serviceWorker.getRegistrations().then(function (registrations) {
//     for (let registration of registrations) {
//       registration.unregister();
//     }
//   });

// bling.js
const $ = window.$ = document.querySelector.bind(document);
const $$ = window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};
NodeList.prototype.__proto__ = Array.prototype;
NodeList.prototype.on = NodeList.prototype.addEventListener =
  (function (name, fn) {
    this.forEach(function (elem) {
      elem.on(name, fn);
    });
  });
 
</script>

  <script>
    window["motion"] = window["Motion"].motion;
    window["css"] = window["emotionReact"].css;
    window["jsx"] = window["emotionReact"].jsx;

    window["styled"] = window["emotionStyled"];

    //inject

    //inject

    async function restartCode(transpileCode) {

    const regex2 = /styled.div/gi;

    const replaced = transpileCode.replaceAll(regex2, "styled(motion.div)");
  //  console.log(replaced);
    const restart = new Function(
      "replaced",
      \`return function() {  
        \${replaced}
      }\`,
    )()
    restart();
  }

    

  </script>

  <script type="module">

    const runner = async () => {
      const version = "7.1.14";
      const cdnAddress = "https://unpkg.com/@zedvision/code@";
      const script = "/dist/_cBundle.js.min.js";


      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost")) {
        const { run } = await import("./dist/_cBundle.js")
        run();
      } else {
        const { run } = await import(cdnAddress + version + script)
         run();
      }


    }


    runner();
  </script>
</body>

</html>`; export const sw = `importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts("https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js");
importScripts(
  "https://unpkg.com/@zedvision/code@7.1.14/dist/worker-script.js",
);

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

var cacheKey = "7.1.14";

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

self.addEventListener("fetch", function (e) {
  self.runner = "browser-sw";

  const tryInCachesFirst = caches.open(cacheKey).then((cache) => {
    return cache.match(e.request).then((response) => {
      if (!response) {
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
`;