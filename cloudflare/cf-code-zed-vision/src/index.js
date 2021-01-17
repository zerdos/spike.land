//import { version } from "@zedvision/code/package.json";
import { cid } from "./ipfs.json";
import { CID } from "@zedvision/ipfs/dist/ipfs.client.js";
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
  const maybeRoute = pathname.slice(1, 9);
  const isKey =
    [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0 &&
    maybeRoute.length === 8;

  const contentPath = isKey ? pathname.slice(9) : pathname;

  if (contentPath.slice(0, 6) === "/ipfs/") {
    //@ts-ignore
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      //https://ipfs.github.io/public-gateway-checker/gateways.json
      const random5GatewaysFetch = publicIpfsGateways.sort(() =>
        0.5 - Math.random()
      ).slice(0, 5).map((gw) => gw.replace("/ipfs/:hash", contentPath)).map((
        x,
      ) =>
        fetch(x).then((res) =>
          res.status === 200 ? res : (() => {
            res.arrayBuffer();
            throw new Error("Not found");
          })()
        )
      );

      response = await raceToSuccess(random5GatewaysFetch);
      await cache.put(request, response.clone());
    }
    // const resp = new Response(response.body, response);
    const arrBuff = await response.clone().arrayBuffer();
    const resp = new Response(arrBuff, response);
    const respCID = await getCID(arrBuff);

    resp.headers.set("access-control-allow-origin", "*");
    resp.headers.set(
      "access-control-allow-methods",
      "GET,HEAD,POST,OPTIONS",
    );
    resp.headers.set("access-control-max-age", "86400");
    resp.headers.delete("content-security-policy");
    resp.headers.delete("feature-policy");
    resp.headers.set("x-cid", respCID);
    return resp;
  }
  return Response.redirect(`https://code.zed.vision/ipfs/${cid}/`, 302);
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

/**
 * @param {ArrayBuffer | Uint8Array | Int8Array | Int16Array | Int32Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView} buff
 */
const getCID = async (buff) => {
  const myDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    buff, // The data you want to hash as an ArrayBuffer
  );

  const uintArr = new Uint8Array(myDigest);

  let cid;
  try {
    cid = new CID(0, 112, uintArr);
  } catch {
    cid = "exception";
  }

  return cid;
};
