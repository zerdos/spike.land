//import { version } from "@zedvision/code/package.json";
import { files } from "./files";
import { shasums } from "./shasums";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";
import { cid } from "./cid";
import { alterHeaders } from "./alterHeaders";

const reverseMap: { [key: string]: string } = {};
//@ts-ignore
Object.keys(files).forEach((k) => reverseMap[files[k]] = k);

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request: Request) {
  const publicIpfsGW = [...publicIpfsGateways];
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname.slice(0, 6) === `/ipfs/`) {
    let customCID = pathname.slice(6);
    const reversePath = reverseMap[customCID] || pathname;

    if (
      pathname.slice(0, 52) === `/ipfs/${cid}`
    ) {
      const path = pathname.slice(53);
      //@ts-ignore
      customCID = files[path];
    }

    if (reversePath) url.pathname = `/ipfs/${cid}/${reversePath}`;

    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;

    let response = await cache.match(cacheKey);

    if (response && response.status == 200) {
      return await alterHeaders(response, reversePath);
    }

    const content = await IPFSKV.get(pathname);

    if (content) response = new Response(content);
    else {
      response = await fetchCid("/ipfs/" + customCID);

      if (!response) {
        return text("Error, 404");
      }

      const contentToSave = await response.clone().text();
      await IPFSKV.put(customCID, contentToSave);
    }

    await cache.put(request, response.clone());

    return await alterHeaders(response, reversePath);
  }

  if (pathname === `/${cid}.js`) {
    return js(`export const files = ${JSON.stringify(files)}`);
  }
  if (pathname === `/ipfs.js`) {
    return js(
      `globalThis.cid = "${cid}"; 
      globalThis.files = ${JSON.stringify(files)}; 
      globalThis.reverseMap = {}; 
      Object.keys(globalThis.files).forEach(k=>globalThis.reverseMap[globalThis.files[k]]=k);`,
    );
  }
  if (pathname === `/cid.js`) {
    return new Response(`export const cid = "${cid}"`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/javascript;charset=UTF-8",
      },
    });
  }

  if (pathname === `/sw.js`) {
    return new Response(
      `importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
      importScripts("https://code.zed.vision/ipfs.js");
      
      workbox.loadModule("workbox-precaching");
      
      const { files, cid, reverseMap } = globalThis;
      
      workbox.precaching.addRoute(
          Object.keys(files).filter(x => x.length).map(x => ({ url: x, revision: files[x] })),
          {
              urlManipulation: ({ url }) => {
      
                  const { pathname } = url;
                  const urls = [];
      
                  if (pathname.indexOf("/ipfs/") === -1 && reverseMap[pathname]) {
                      urls.push(new URL("https://code.zed.vision/ipfs/" + reverseMap[pathname]))
                      urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + pathname));
                  }
      
                  if (pathname.indexOf("/ipfs/")) {
                      const start = pathname.indexOf("/ipfs/");
                      const reverseCID = pathname.slice(start + 6, start + 52);
              
                      if (reverseMap[cid]) {
                          urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + reverseMap[reverseCID]))
                      }
                  }
                  return urls;
              }
          }
      )
      `,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "application/javascript;charset=UTF-8",
        },
      },
    );
  }
  if (pathname === `/sw.html`) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" type="image/png" href="/ipfs/${cid}/assets/zed-icon-big.png" />
        <link rel="stylesheet" href="/ipfs/${cid}/assets/app.css" />
        <link rel="stylesheet" href="/ipfs/${cid}/assets/roboto.css" />
        <link rel="stylesheet" href="/ipfs/${cid}/assets/normalize.min.css" />
      <title>Instant React Editor</title>
      </head>
      <body>
      <script type="module">
      workBox();
  
      
      async function workBox() {
        if ("serviceWorker" in window.navigator) {
          const { Workbox } = await import(
            "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs"
          );
          const {navigator, location} = window;
      
          // navigator.serviceWorker &&
          //   navigator.serviceWorker.controller &&
          //   navigator.serviceWorker.controller.unregister();
      
          const wb = new Workbox("/sw.js");
      
      
      //    navigator.serviceWorker.controller && startApp();
      
          wb.addEventListener('activated', async (event) => {

            console.log("it is activated")
  
  
      
            if (!event.isUpdate || !window.monaco) {
              window.location.reload()
              
         
            }
          });
        }
      }
      
        </script>
      </body>
      </html>`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "text/html;charset=UTF-8",
        },
      },
    );
  }
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="icon" type="image/png" href="/ipfs/${cid}/assets/zed-icon-big.png" />
      <link rel="stylesheet" href="/ipfs/${cid}/assets/app.css" />
      <link rel="stylesheet" href="/ipfs/${cid}/assets/roboto.css" />
      <link rel="stylesheet" href="/ipfs/${cid}/assets/normalize.min.css" />
    <title>Instant React Editor</title>
    </head>
    <body>
    <script type="module">
    workBox();

    
    async function workBox() {
      if ("serviceWorker" in window.navigator) {
        const { Workbox } = await import(
          "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs"
        );
        const {navigator, location} = window;
    
        // navigator.serviceWorker &&
        //   navigator.serviceWorker.controller &&
        //   navigator.serviceWorker.controller.unregister();
    
        const wb = new Workbox("/sw.js");
        window.location.href="/ipfs/${cid}/"
    
    
    //    navigator.serviceWorker.controller && startApp();
    
        wb.addEventListener('activated', async (event) => {


    
          if (!event.isUpdate || !window.monaco) {
            window.location.reload()
            
       
          }
        });
      }
    }
    
      </script>
    </body>
    </html>`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "text/html;charset=UTF-8",
      },
    },
  );
}

export function js(resp: string) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}

function text(resp: string) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}

const sha256 = async (x: ArrayBuffer) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");

async function fetchCid(path: string) {
  const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    0.5 - Math.random()
  )
    .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", path))
    .map((x: string) =>
      fetch(x).then((res) =>
        res.status === 200 ? res : (() => {
          res.arrayBuffer();
          throw new Error("Not found");
        })()
      )
    );

  return raceToSuccess(random5GatewaysFetch);
}
