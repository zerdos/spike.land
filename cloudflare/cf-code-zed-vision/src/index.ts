//import { version } from "@zedvision/code/package.json";
import CID from "cids";
import { files } from "./files";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";
import { cid } from "./cid";

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
  const { searchParams, pathname } = url;
  const maybeRoute = pathname.slice(1, 9);
  const isKey =
    [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0 &&
    maybeRoute.length === 8;

  const contentPath = isKey ? pathname.slice(9) : pathname;
  // if (isKey) return text(contentPath);
  if (contentPath.slice(0, 6) === "/ipfs/") {
    const cache = caches.default;

    let response = await cache.match(request);

    if (response && response.status == 200) {
      return await alterHeaders(response, pathname);
    }

    // this file belongs to the latest zed.vision deployment
    // so lets search and cache it in CF KV as well
    if (
      contentPath.slice(0, 52) === `/ipfs/${cid}`
    ) {
      const file = contentPath.slice(53) || "index.html";
      //@ts-ignore
      const cid2 = files[file]!;

      response = await cache.match(request);

      if (response && response.status === 200) {
        return await alterHeaders(response, pathname);
      } else {
        let response;

        const content = await IPFSKV.get(cid2);
        if (content !== null) {
          response = new Response(content);
        } else {
          response = await fetch(
            `https://zed-vision.zed-vision.workers.dev/ipfs/${cid2}`,
          );
          const arrBuff = await response.clone().arrayBuffer();
          await IPFSKV.put(cid2, arrBuff);
        }

        const resp = await alterHeaders(response, pathname);
        await cache.put(request, resp.clone());
        return resp;
      }
    }

    // const req = new Request(`https://code.zed.vision${contentPath}`);

    response = await cache.match(request);
    if (response && response.status == 200) {
      return await alterHeaders(response, pathname);
    }

    const random5GatewaysFetch = publicIpfsGW.sort(() => 0.5 - Math.random())
      .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", contentPath))
      .map((x: string) =>
        fetch(x).then((res) =>
          res.status === 200 ? res : (() => {
            res.arrayBuffer();
            throw new Error("Not found");
          })()
        )
      );

    response = await raceToSuccess(random5GatewaysFetch);

    if (response === undefined) return text("error");

    const resp = await alterHeaders(response, pathname);
    await cache.put(request, resp.clone());
    return resp;
  }
  return text(`<!doctype html>
  <html>
  <head>
    <script type="text/javascript">
    window.location = "/ipfs/${cid}/";
    </script>
  </head>
  <body>
    <h1> Code....
    </h1>
  </body>
  </html>`);
}

async function alterHeaders(response: Response, pathname: string) {
  const arrBuff = await response!.clone().arrayBuffer();

  const resp = new Response(arrBuff, response);
  //  const respCID = await getCID(arrBuff);

  resp.headers.set("access-control-allow-origin", "*");
  resp.headers.set(
    "access-control-allow-methods",
    "GET,HEAD,POST,OPTIONS",
  );
  resp.headers.set("access-control-max-age", "86400");
  resp.headers.delete("content-security-policy");
  resp.headers.delete("feature-policy");
  resp.headers.delete("access-control-expose-headers");
  resp.headers.delete("expect-ct");
  resp.headers.delete("report-to");
  resp.headers.delete("nel");

  resp.headers.delete("server");
  resp.headers.delete("strict-transport-security");
  resp.headers.delete("X-Frame-Options");
  resp.headers.delete("x-content-type-options");
  if (pathname.endsWith(".mjs") || pathname.endsWith(".js")) {
    resp.headers.delete("content-type");
    resp.headers.set(
      "content-type",
      "text/javascript;charset=UTF-8",
    );
  } else if (pathname.endsWith(".css")) {
    resp.headers.delete("content-type");
    resp.headers.set(
      "content-type",
      "text/css;charset=UTF-8",
    );
  } else if (pathname.endsWith(".jpg")) {
    resp.headers.delete("content-type");
    resp.headers.set("content-type", "image/jpeg");
  } else if (pathname.indexOf(".") === -1) {
    resp.headers.delete("content-type"),
      resp.headers.set(
        "content-type",
        "text/html;charset=UTF-8",
      );
  }

  return new Response(arrBuff, {
    headers: resp.headers,
  });
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

const getCID = async (buff: ArrayBuffer) => {
  const myDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    buff, // The data you want to hash as an ArrayBuffer
  );

  const uintArr = new Uint8Array(myDigest);

  let cid;
  try {
    cid = new CID("base58btc", "dag-pb", uintArr);
    return cid.toString();
  } catch {
    const fromHexString = (hexString: string) =>
      new Uint8Array(
        (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16)),
      );

    const shaStr = Array.from(uintArr).map((b) =>
      ("00" + b.toString(16)).slice(-2)
    )
      .join("");
    return shaStr;
  }
};
