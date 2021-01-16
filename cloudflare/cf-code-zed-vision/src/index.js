//import { version } from "@zedvision/code/package.json";
import { cid } from "./ipfs.json";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";

//@ts-ignore
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const publicIpfsGW = [...publicIpfsGateways];
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  if (pathname.slice(0, 6) === "/ipfs/") {
    //@ts-ignore
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      //https://ipfs.github.io/public-gateway-checker/gateways.json
      const random5GatewaysFetch = publicIpfsGateways.sort(() =>
        0.5 - Math.random()
      ).slice(0, 5).map((gw) => gw.replace("/ipfs/:hash", pathname)).map((
        x,
      ) =>
        fetch(x).then((res) =>
          res.status === 200 ? res : (() => {
            throw new Error("Not found");
          })()
        )
      );

      response = await raceToSuccess(random5GatewaysFetch);
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
  const maybeRoute = pathname.substr(1);
  const isKey =
    [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0 &&
    maybeRoute.length === 8;

  //@ts-ignore
  const cache = caches.default;
  let response = await cache.match(request);

  if (!response) {
    //https://ipfs.github.io/public-gateway-checker/gateways.json
    const random5GatewaysFetch = publicIpfsGW.sort(() => 0.5 - Math.random())
      .slice(0, 5).map((gw) =>
        gw.replace(
          "/ipfs/:hash",
          `/ipfs/${cid}/code${isKey ? pathname.slice(9) : pathname}`,
        )
      ).map((
        x,
      ) =>
        fetch(x).then((res) =>
          res.status === 200 ? res : (() => {
            throw new Error("Not found");
          })()
        )
      );

    response = await raceToSuccess(random5GatewaysFetch);
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

/**
 * @param {string} resp
 */
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

/**
 * @param {string } resp
 */
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
