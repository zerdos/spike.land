//import { version } from "@zedvision/code/package.json";
import { files } from "./files";
import { shasums } from "./shasums";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";
import { cid } from "./cid";
import { alterHeaders } from "./alterHeaders";

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
        text(`${file}      ${cid2}`);
        let response;

        const content = await IPFSKV.get(cid2, "arrayBuffer");
        if (content !== null) {
          response = new Response(content);
        } else {
          const random5GatewaysFetch = publicIpfsGW.sort(() =>
            0.5 - Math.random()
          )
            .slice(0, 5).map((gw: string) =>
              gw.replace("/ipfs/:hash", contentPath)
            )
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
  if (pathname === "/clear") {
    return new Response(
      `<!doctype html>
    <html>
    <head>
    </head>
    <script type="text/javascript">
    window.location = "/ipfs/${cid}/";
    </script>
    </html>`,
      {
        headers: {
          "Clear-Site-Data": "*",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
          "Access-Control-Max-Age": "86400",
          "Content-Type": "text/html;charset=UTF-8",
        },
      },
    );
  }
  if (pathname === `/${cid}.js`) {
    return js(`export const files = ${JSON.stringify(files)}`);
  }
  if (pathname === `/ipfs.js`) {
    return js(`globalThis.files = ${JSON.stringify(files)}`);
  }
  if (pathname === `/cid.js`) {
    return js(`export const cid = "${cid}"`);
  }
  if (pathname === `/cid.umd.js`) {
    return js(`globalThis.cid = "${cid}"`);
  }
  return new Response(
    `<!doctype html>
  <html>
  <head>
  </head>
  <script type="text/javascript">
  window.location = "/ipfs/${cid}/";
  </script>
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
