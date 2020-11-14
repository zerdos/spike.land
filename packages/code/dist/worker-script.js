const html = `<!DOCTYPE html>\n<html>\n\n<head>\n  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">\n  <meta content="utf-8" http-equiv="encoding">\n\n  <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n  <script crossorigin src="https://unpkg.com/@emotion/react@11.0.0/dist/emotion-react.umd.min.js"></script>\n  <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n  <!-- <script crossorigin src="https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js"></script> -->\n  <script crossorigin src="https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js"></script>\n\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"\n    crossorigin="anonymous" />\n\n  <style>\n    #container {\n      background-color: #1e1e1e;\n      width: 100vw;\n      height: 100vh;\n    }\n\n    /* body {\n      overflow: hidden;\n      width: 100%;\n      height: 100vh\n    } */\n\n    /* @keyframes opening {\n      from {\n        width: 10%;\n        height: 20vh;\n      }\n\n      66% {\n        width: 100%;\n        height: 20vh;\n      }\n\n      to {\n        width: 100%;\n        height: 100vh;\n      }\n    } */\n\n\n    #error {\n      display: none;\n      background-color: red;\n      opacity: 0.7;\n    }\n\n\n    #ace {\n      display: none;\n    }\n\n\n  \n\n    #ace {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n    }\n\n\n    .almosthidden {\n      opacity: 0.5;\n    }\n\n    button {\n      font-size: large;\n    }\n  </style>\n</head>\n\n<body>\n  <div id="error" class="draggable"></div>\n  <div id="root"></div>\n  \n  <div id="container"></div>\n\n  <div id="ace"></div>\n\n<script type="module">\n  import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";\n\n  async function initComlink() {\n    \n    const { port1, port2 } = new MessageChannel();\n    const msg = {\n      comlinkInit: true,\n      port: port1,\n    };\n\n    navigator.serviceWorker.controller.postMessage(msg, [port1]);\n\n    const swProxy = Comlink.wrap(port2);\n    console.log(await swProxy.counter);\n    await swProxy.inc();\n    console.log(await swProxy.counter);\n  }\n\n  if (navigator.serviceWorker.controller) {\n    initComlink();\n  }\n\n  navigator.serviceWorker.addEventListener("controllerchange", initComlink);\n  navigator.serviceWorker.register("sw.js");\n\n// bling.js\n    var $ = window.$ = document.querySelector.bind(document);\n    var $$ = window.$$ = document.querySelectorAll.bind(document);\n    Node.prototype.on = window.on = function (name, fn) {\n      this.addEventListener(name, fn);\n    }\n    NodeList.prototype.__proto__ = Array.prototype;\n    NodeList.prototype.on = NodeList.prototype.addEventListener = (function (name, fn) {\n      this.forEach(function (elem) {\n        elem.on(name, fn);\n      });\n   });\n\n\n  </script>\n\n  <script>\n    window["motion"] = window["Motion"].motion;\n    window["css"] = window["emotionReact"].css;\n    window["jsx"] = window["emotionReact"].jsx;\n\n    window["styled"] = window["emotionStyled"];\n\n    //inject\n\n    //inject\n\n    async function restartCode(transpileCode) {\n\n    const regex2 = /styled.div/gi;\n\n    const replaced = transpileCode.replaceAll(regex2, "styled(motion.div)");\n    console.log(replaced);\n    const restart = new Function(\n      "replaced",\n      \`return function() {  \n        \${replaced}\n      }\`,\n    )()\n    restart();\n  }\n\n    \n\n  </script>\n\n  <script type="module">\n\n    const runner = async () => {\n      const version = "7.1.8";\n      const cdnAddress = "https://unpkg.com/@zedvision/code@";\n      const script = "/dist/_cBundle.js.min.js";\n\n\n      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost")) {\n        const { run } = await import("./dist/_cBundle.js")\n        run();\n      } else {\n        const { run } = await import(cdnAddress + version + script)\n         run();\n      }\n\n\n    }\n\n\n    runner();\n  </script>\n</body>\n\n</html>`;
const sw = `importScripts("https://unpkg.com/comlink@4.3.0/dist/umd/comlink.min.js");\nimportScripts("https://unpkg.com/@zedvision/code@7.1.5/dist/worker-script.js")\n// importScripts("../../../dist/umd/comlink.js");\n\nconst runner = "browser-sw";\nconst VERSION = "7";\n\nthis.addEventListener("install", function (e) {\n  e.waitUntil(\n    caches.open(VERSION).then((cache) => {\n      return cache.addAll([\n        "/",\n        "/sw.js"\n      ]);\n    }),\n  );\n});\n\nthis.addEventListener("fetch", function (e) {\n  const tryInCachesFirst = caches.open(VERSION).then((cache) => {\n    return cache.match(e.request).then((response) => {\n      console.log(e);\n\n      if (!response) {\n        return handleNoCacheMatch(e);\n      }\n      // Update cache record in the background\n      fetchFromNetworkAndCache(e);\n      // Reply with stale data\n      return response;\n    });\n  });\n  e.respondWith(tryInCachesFirst);\n});\n\nthis.addEventListener("activate", function (e) {\n  e.waitUntil(\n    caches.keys().then((keys) => {\n      return Promise.all(keys.map((key) => {\n        if (key !== VERSION) {\n          return caches.delete(key);\n        }\n      }));\n    }),\n  );\n});\n\nfunction fetchFromNetworkAndCache(e) {\n  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.\n  // There's probably more going on here, but I'd rather just ignore this problem. :)\n  // https://github.com/paulirish/caltrainschedule.io/issues/49\n  if (\n    e.request.cache === "only-if-cached" && e.request.mode !== "same-origin"\n  ) {\n    return;\n  }\n\n  return fetch(e.request).then((res) => {\n    // foreign requests may be res.type === 'opaque' and missing a url\n    if (!res.url) return res;\n    // regardless, we don't want to cache other origin's assets\n    // if (new URL(res.url).origin !== location.origin) return res;\n\n    return caches.open(VERSION).then((cache) => {\n      // TODO: figure out if the content is new and therefore the page needs a reload.\n      cache.put(e.request, res.clone());\n      return res;\n    });\n  }).catch((err) => console.error(e.request.url, err));\n}\n\nfunction handleNoCacheMatch(e) {\n  return fetchFromNetworkAndCache(e);\n}\n\n\nconst obj = {\n  counter: 0,\n  inc() {\n    this.counter++;\n  },\n};\n\nself.addEventListener("message", (event) => {\n  if (event.data.comlinkInit) {\n    Comlink.expose(obj, event.data.port);\n    return;\n  }\n});`;
function inject(html1, startKey, code, codeTranspiled) {
    const res = html1.split("//inject");
    return [
        res[0],
        `localStorage.setItem("${startKey}", unescape("${escape(code)}"));`,
        `restartCode(\n      unescape("${escape(codeTranspiled)}")\n      );`,
        res[2], 
    ].join("\n");
}
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
async function handleCloudRequest(request) {
    if (request.method === "GET") {
        const url = new URL(request.url);
        if (request.url.endsWith("sw.js")) {
            return new Response(sw, {
                headers: {
                    "content-type": "text/javascript"
                }
            });
        }
        if (request.url.includes("?hash=")) {
            const hash = url.searchParams.get("hash");
            if (hash !== null) {
                const json = await SHATEST.get(hash, "stream");
                if (json !== null) {
                    return new Response(json, {
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                }
            }
        }
        const hash = url.searchParams.get("h");
        let code = null;
        let codeTranspiled = null;
        if (hash !== null && hash.length > 5) {
            const json = await SHATEST.get(hash);
            if (json !== null) {
                const parsed = JSON.parse(json);
                code = parsed.code;
                codeTranspiled = parsed.codeTranspiled;
            }
        }
        return new Response(hash !== null ? inject(html, hash, code, codeTranspiled) : html, {
            headers: {
                "content-type": "text/html"
            }
        });
    } else if (request.method === "POST") {
        const data = await request.json();
        const myBuffer = new TextEncoder().encode(JSON.stringify(data));
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 7);
        await SHATEST.put(smallerKey, myBuffer);
        const resp = new Response(`{"hash":"${smallerKey}"}`);
        resp.headers.append("Access-Control-Allow-Origin", "*");
        resp.headers.append("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
        resp.headers.append("Access-Control-Max-Age", "86400");
        return resp;
    }
    return handleOptions(request);
}
function handleOptions(request) {
    const headers = request.headers;
    let respHeaders;
    return new Response(request.body, {
        headers: {
            ...headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
addEventListener("fetch", (event)=>{
    if ("worker-cf" !== "worker-cf") return;
    event.respondWith(handleCloudRequest(event.request));
});
