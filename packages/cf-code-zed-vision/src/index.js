import { version } from "@zedvision/code/package.json";
import { cid } from "@zedvision/code/ipfs.json";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  if (pathname.slice(0, 6) === "/ipfs/") {
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      //https://ipfs.github.io/public-gateway-checker/gateways.json
      const randpom5GatwawsFetch = publicIpfsGateways.sort(() =>
        0.5 - Math.random()
      ).slice(0, 5).map((gw) => gw.replace("/ipfs/:hash", pathname)).map((x) =>
        fetch(x).then((res) =>
          res.status === 200 ? res : (() => {
            throw new Error("Not found");
          })()
        )
      );

      response = await raceToSuccess(randpom5GatwawsFetch);
      await cache.put(request, response.clone());
    }
    if (response.status > 399) {
      response = new Response(
        response.statusText,
        { status: response.status },
      );
    }
    return response;
  }

  if (pathname.endsWith("sw.js")) {
    return js(
      `// deno-lint-ignore-file
      // @ts-ignore
      importScripts(
        "https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js",
      );
      
      // @ts-ignore
      workbox.loadModule("workbox-strategies");
      
      // @ts-ignore
      workbox.routing.registerRoute(
        /**
         * 
         * @param {{url: {origin: string}}} opts 
         */
        ({ url }) =>
          url.origin === "https://unpkg.com" ||
          url.origin === "https://zed.vision" ||
          url.origin === "https://code.zed.vision" ||
          url.origin === "https://blog.zed.vision",
        // @ts-ignore
        new workbox.strategies.CacheFirst(),
      );
      // @ts-ignore
      self.addEventListener(
        "fetch", /**
       * @param {{ respondWith?: any; request?: any; }} event
       */
        (event) => {
          const { request } = event;
          const { url } = request;
          if (
            !url.endsWith("sw.js") && (
              url.endsWith(".js") || url.endsWith(".json") || url.endsWith(".map") ||
              url.endsWith(".html") || url.endsWith(".woff") ||
              url.endsWith(".jpg") || url.endsWith(".css") ||
              url.endsWith(".png") || url.endsWith(".ts")
            )
          ) {
            console.log("workbox cache!", {url});
            // Using the previously-initialized strategies will work as expected.
            // @ts-ignore
            const cacheFirst = new workbox.strategies.CacheFirst();
            event.respondWith(cacheFirst.handle({ event, request }));
          }
        },
      );
      
      `,
    );
  }

  return text(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="icon" type="image/png" href="https://blog.zed.vision/zed-icon-big.png" />
  <title>Instant React Editor</title>
  </head>
  <body>
    <script type="module">
      import {run} from "https://blog.zed.vision/code/src/codeLoader.js"
      try{
        run("window", window);
      }catch(error){
        fetch("https://zed.vision/error", {method: "POST",  body: JSON.stringify({error})})
      }
    </script>
  </body>
  </html>
`);
}

export function js(resp) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}

function text(resp) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}

/**
 * 
 * @param{Promise<any>[]} promises 
 */
function raceToSuccess(promises) {
  let numRejected = 0;

  return new Promise(
    (resolve, reject) =>
      promises.forEach(
        (promise) =>
          promise
            .then(resolve)
            .catch(
              () => {
                if (++numRejected === promises.length) reject();
              },
            ),
      ),
  );
}

const publicIpfsGateways = [
  "https://ipfs.io/ipfs/:hash",
  "https://dweb.link/ipfs/:hash",
  "https://gateway.ipfs.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ninetailed.ninja/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://jacl.tech/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
