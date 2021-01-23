//import { version } from "@zedvision/code/package.json";
import { files } from "./files";
import { shasums } from "./shasums";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";
import { cid } from "./cid";
import { alterHeaders } from "./alterHeaders";

const reverseMap = {};
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

  if (
    pathname.slice(0, 52) === `/ipfs/${cid}`
  ) {
    const file = pathname.slice(53) || "index.html";
    //@ts-ignore
    const cid2 = files[file]!;

    const cache = caches.default;
    let response = await cache.match(request);

    if (response && response.status === 200) {
      //@ts-ignore
      return await alterHeaders(response, reverseMap[cid] || pathname);
    } else {
      // text(`${file}  ${cid2}`);
      let response;

      const content = await IPFSKV.get(cid2, "arrayBuffer");
      if (content !== null) {
        response = new Response(content);
      } else {
        const random5GatewaysFetch = publicIpfsGW.sort(() =>
          0.5 - Math.random()
        )
          .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", pathname))
          .map((x: string) =>
            fetch(x).then((res) =>
              res.status === 200 ? res : (() => {
                res.arrayBuffer();
                throw new Error("Not found");
              })()
            )
          );

        response = await raceToSuccess(random5GatewaysFetch);
        const arrBuff = await response.clone().arrayBuffer();
        const shaSum = await sha256(arrBuff);
        //@ts-ignore
        if (shaSum === shasums[file]!) {
          await IPFSKV.put(cid2, arrBuff);
        } else {
          return text(
            `its 2021, but transferring and getting a file its still difficult. Please try again... received content: ${
              new TextDecoder().decode(arrBuff)
            }`,
          );
        }
      }

      //@ts-ignore
      const resp = await alterHeaders(response, reverseMap[cid2] || pathname);
      await cache.put(request, resp.clone());
      return resp;
    }
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
      
      workbox.precaching.precacheAndRoute(
        Object.keys(files).filter(x=>x.length).map(x=>({url: x, revision: files[x]})),
       { urlManipulation: ({url}) => {
      
        console.log(url);
      
        const {pathname} = url;
        const urls =  [ new URL("https://code.zed.vision/ipfs/" + cid + "/" + url)];
      
        if (pathname.indexOf("/ipfs/")) {
          const start = pathname.indexOf("/ipfs/");
          const reverseCID = pathname.slice(start+6, start +52);
          if (reverseMap[cid]) {
            urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/"  + reverseMap[reverseCID]))
          }
        } 
        return urls;
        }}
      )`,
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

    window.location.href="/ipfs/${cid}/"
    // workBox();
    
    // async function workBox() {
    //   if ("serviceWorker" in window.navigator) {
    //     const { Workbox } = await import(
    //       "https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-window.prod.mjs"
    //     );
    //     const {navigator, location} = window;
    
    //     // navigator.serviceWorker &&
    //     //   navigator.serviceWorker.controller &&
    //     //   navigator.serviceWorker.controller.unregister();
    
    //     const wb = new Workbox("/sw.js");
    
    
    // //    navigator.serviceWorker.controller && startApp();
    
    //     wb.addEventListener('activated', async (event) => {
    
    //       if (!event.isUpdate || !window.monaco) {
    //         location.reload()
    //           // startApp();
       
    //       }
    //     });
    
    //     wb.register();
    //   }
    //   try{
    //     startApp();
    //   } catch(e) {
    //     console.log({e});
    //   }
    // }
    
    // async function startApp(){
    //   try{
    //   const {run} = await import ("./src/codeLoader.js")
    //   run("window", window);
    //   } catch(e) {
    //     console.log("some error", {e});
    //   }
    // }
    
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
