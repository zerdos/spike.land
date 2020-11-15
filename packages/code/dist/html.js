export const version = `7.1.35`; export const html = `<!DOCTYPE html>
<html>

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">
  <meta content="utf-8" http-equiv="encoding">

  <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/react@11.0.0/dist/emotion-react.umd.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>



  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
  <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABFFBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/Bwf/ZGT/l5f/lpb/WFj/AwP/Li7/6ur/////3d3/Hx//Nzf/8vL/5+f/Jyf/zMz/9/f/9vb/9fX/+fn/39//IiL/QED/Pj7/Vlb/1dX/n5//Bgb/FRX/pKT//f3/ubn/ICD/Fxf/qan//v7/trb/GBj/qqr/srL/HR3/GRn/q6v/rq7/Gxv/Ghr/ra3/r6//paX/Fhb/sLD/oaH/FBT/HBz/sbH/nZ3/EhL//Pz/mJj/EBD/+vr/kZH/DQ3/g4P/vb3/QUH/MzP/NTX/ysr/9PT/7+//8fH/8PD/ycn/1tb/PT3/ERH/zc3/AQH/U1P/o6P/oqL/dHT/CwsnXuIzAAAAB3RSTlMRie2K+ev+okjQYAAAAAFiS0dEEJWyDSwAAAAHdElNRQfkCw8HNStlcP8AAAABA0lEQVQ4y42T11ICQRBFhziIoLiiSBCVjEjOIqCikiSoRP3//7Cma6mix+odz+s9s1vdt5oxk5mTmE2MWazcAKuF2bghNmY3FuyMK/iv4DhwHmJcbiQcHXskTjQknHpl4ewcCZrvwq8TCIIQwl/gl2Gdq+sbECJRYopYPCHyZIoYM32bEfndLpeFbA7yfIFYVLEE/y9XiE1WayLO5LLEqqt1yBtNoovKvcgTrQeirHYH8u4j0WY7L/Kn5x5Rdxrev7y+EXXzPsw3GI7GOgUs9N5BmExnc2Dm/Ughofkp1z35QsJiKQvTMRJW69Zmu8/m+0cacyVBtPkX9eEoT095vKrz/wWYHD/qOZ0BPQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0xNVQwNzo1Mzo0MyswMTowMKnrqaIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMTVUMDc6NTM6NDMrMDE6MDDYthEeAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC" />
  <style>
    #container {
      background-color: #1e1e1e;
      width: 100vw;
      height: 100vh;
    }


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




    async function initComlink() {
      const { port1, port2 } = new MessageChannel();
      const msg = {
        comlinkInit: true,
        port: port1,
      };

      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage(msg, [port1]);
      });


      const swProxy = Comlink.wrap(port2);
      console.log(await swProxy.counter);

      window["SHATEST"] = {
        get: async (key) => await swProxy.get(key),
        put: async (key, value) => await swProxy.put(key, value)
      }

      await swProxy.inc();
      console.log(await swProxy.counter);
    }

    navigator.serviceWorker.addEventListener("controllerchange", initComlink);

    if (navigator.serviceWorker) {
      navigator.serviceWorker.register("sw.js");
      initComlink()
    }


// navigator.serviceWorker.getRegistrations().then(function (registrations) {
//     for (let registration of registrations) {
//       registration.unregister();
//     }
//   });

  </script>

  <script type="module">
    // window["motion"] = window["Motion"].motion;
    window["css"] = window["emotionReact"].css;
    window["jsx"] = window["emotionReact"].jsx;

    window["styled"] = window["emotionStyled"];

    //inject
    //inject



    async function restartCode(transpileCode) {

      //  console.log(replaced);
      const restart = new Function(
        "transpileCode",
        \`return function() {  
        \${transpileCode}
      }\`,
      )()
      restart();
    }


  </script>
  <script type="module">

    const runner = async () => {
      const cdnAddress = "https://unpkg.com/@zedvision/code";
      const script = "/dist/_cBundle.js.min.js";


      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost")) {
        const { run } = await import("./dist/_cBundle.js")
        run();
      } else {
        const version = "@7.1.35";
        const { run } = await import(cdnAddress   +  version
          + script)
        run();
      }


    }


    runner();
  </script>
</body>

</html>`; export const sw = `importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");
importScripts("https://unpkg.com/idb@5.0.7/build/iife/with-async-ittr-min.js");

// importScripts(
//   "https://unpkg.com/@zedvision/code@7.1.35/dist/html.js",
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

var cacheKey = "7.1.35";

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
    e.request.cache === "only-if-cached"// && e.request.mode !== "same-origin"
  ) {
    console.log("NO CACHE!", e)
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
`; 
    export function inject(
      html,
      startKey,
      code,
      codeTranspiled,
    ) {
      const res = html.split("//inject");
      return [
        res[0],
        `localStorage.setItem("${startKey}", unescape("${escape(code)}"));`,
        `restartCode(
          unescape("${escape(codeTranspiled)}")
          );`,
        res[2],
      ].join("\n");
    }
  