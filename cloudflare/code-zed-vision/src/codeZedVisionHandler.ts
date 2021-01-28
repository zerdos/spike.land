//import { version } from "@zedvision/code/package.json";
import { files } from "./files";
import { shasums } from "./shasums";
import {
  publicIpfsGateways,
  raceToSuccess,
} from "@zedvision/ipfs/src/gateways.js";
import { cid } from "./cid";
import { alterHeaders, sha256 } from "./alterHeaders";

const reverseMap: { [key: string]: string } = {};
//@ts-ignore
Object.keys(files).forEach((k) => reverseMap[files[k]] = k);

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request}
 */
async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname.slice(0, 6) === `/ipfs/`) {
    let customCID = pathname.slice(6);
    const reversePath = reverseMap[customCID] ||
      (pathname.slice(0, 52) === `/ipfs/${cid}` && (pathname.slice(53) ||
        "index.html")) ||
      pathname;
    //@ts-ignore
    const sha = reversePath && shasums[reversePath];

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
      const resp = response.clone();
      if (sha) {
        const content = await response.arrayBuffer();
        const shaContent = sha256(content);
        if (sha !== shaContent) {
          response = undefined;
        }
        cache.delete(cacheKey);
      }
      if (response) return await alterHeaders(response, reversePath);
    }

    let content = await IPFS.get(customCID, "arrayBuffer");
    if (content !== null && sha) {
      const file = reverseMap[customCID];
      const contentSHA = await sha256(content);
      //@ts-ignore
      if (shasums[file] === contentSHA) {
        // await IPFS.put(customCID, content);
      } else {
        await IPFS.delete(customCID);
        content = null;
      }
    }

    if (content) response = new Response(content);
    else {
      response = await fetchCid("/ipfs/" + customCID);

      if (!response) {
        return text("Error, 404");
      }

      const contentToSave = await response.clone().arrayBuffer();
      if (sha) {
        const check = await sha256(contentToSave);
        if (check !== sha) {
          const textContent = new TextDecoder().decode(contentToSave);

          return text(`
        path: ${reversePath} 
        sha: ${sha}  
        sha-check: ${check}
        cid: /ipfs/${customCID}
        
        content: ${textContent}
        `);
        }
      }
      await IPFS.put(customCID, contentToSave);
    }

    await cache.put(request, response.clone());

    return await alterHeaders(response, reversePath);
  }

  if (pathname === `/cid.json`) {
    return json({ cid });
  }
  if (pathname === `/${cid}.js`) {
    return js(`export const files = ${JSON.stringify(files)}`);
  }
  if (pathname === `/ipfs.js`) {
    return js(
      `globalThis.cid = "${cid}";globalThis.files=JSON.parse('${
        JSON.stringify(files)
      }'); 
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
  if (pathname === `/cid.umd.js`) {
    return new Response(`globalThis.cid = "${cid}"`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/javascript;charset=UTF-8",
      },
    });
  }
  //@ts-ignore
  if (files[pathname.slice(1)] || pathname === "/") {
    url.pathname = "/ipfs/" + cid + pathname === "/" ? "/index.html" : pathname;

    const req1 = new Request(url.toString());

    //@ts-ignore
    let fileCid = files[pathname.slice(1)];
    if (pathname === "/") {
      fileCid = files["index.html"];
    }

    url.pathname = "/ipfs/" + fileCid;
    const req2 = new Request(url.toString());

    const resp: Response = await raceToSuccess([
      handleRequest(req2),
      handleRequest(req2),
    ]);

    resp.headers.delete("cache-control");
    return resp;
  }
  return text("Error: nop");
}

export function js(resp: string) {
  return new Response(resp, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}

export function json(obj: Object) {
  return new Response(JSON.stringify(obj), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "application/json;charset=UTF-8",
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
