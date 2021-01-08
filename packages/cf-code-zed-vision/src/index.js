import { version } from "@zedvision/code/package.json";
import { cid } from "@zedvision/code/ipfs.json";
import gateways from "https://ipfs.github.io/public-gateway-checker/gateways.json";

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
        fetch(x)
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
      `// deno-lint-ignore ban-ts-comment
      //@ts-ignore
      // deno-lint-ignore no-undef
      importScripts(
        "https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js",
      );
      
      // This will trigger the importScripts() for workbox.strategies and its dependencies:
      // deno-lint-ignore ban-ts-comment
      //@ts-ignore
      // deno-lint-ignore no-undef
      const { strategies, routing } = workbox;
      
      routing.registerRoute(
        /**
         * 
         * @param {{url: {origin: string}}} opts 
         */
        ({ url }) =>
          url.origin === "https://unpkg.com" ||
          url.origin === "https://blog.zed.vision",
      );
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      self.addEventListener(
        "fetch", /**
       * @param {{ respondWith?: any; request?: any; }} event
       */
        (event) => {
          const { request } = event;
          const { url } = request;
          if (
            !url.endsWith("sw.js") &&
            (url.endsWith(".js") && url.endsWith(".html") || url.endsWith(".woff") ||
              url.endsWith(".jpg") ||
              url.endsWith(".png") || url.endsWith(".ts"))
          ) {
            // Using the previously-initialized strategies will work as expected.
            const cacheFirst = new strategies.StaleWhileRevalidate();
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
  "https://ipfs.globalupload.io/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://gateway.blocksec.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://ipns.co/ipfs/:hash",
  "https://ipfs.mrh.io/ipfs/:hash",
  "https://gateway.originprotocol.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.doolta.com/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.busy.org/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://gateway.serph.network/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.fooock.com/ipfs/:hash",
  "https://cdn.cwinfo.net/ipfs/:hash",
  "https://ipfs.privacytools.io/ipfs/:hash",
  "https://permaweb.io/ipfs/:hash",
  "https://ipfs.stibarc.com/ipfs/:hash",
  "https://ipfs.best-practice.se/ipfs/:hash",
  "https://2read.net/ipfs/:hash",
  "https://ipfs.2read.net/ipfs/:hash",
  "https://storjipfs-gateway.com/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://apac.trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.lc/ipfs/:hash",
  "https://ipfs.leiyun.org/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://ipfs.jes.xxx/ipfs/:hash",
  "https://ipfs.oceanprotocol.com/ipfs/:hash",
  "https://d26g9c7mfuzstv.cloudfront.net/ipfs/:hash",
  "https://ipfsgateway.makersplace.com/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.funnychain.co/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://ipfs.yt/ipfs/:hash",
  "https://jacl.tech/ipfs/:hash",
  "https://hashnews.k1ic.com/ipfs/:hash",
  "https://ipfs.vip/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.kavin.rocks/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
