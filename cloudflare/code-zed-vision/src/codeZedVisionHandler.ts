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
      if (sha) {
        const content = await response.arrayBuffer();
        const shaContent = sha256(content);
        if (sha !== shaContent) {
          response = undefined;
          cache.delete(cacheKey);
        }
        // await IPFS.put(customCID, content);
      }
      if (response) return await alterHeaders(response, reversePath);
    }

    let content = await IPFS.get(customCID, "arrayBuffer");
    if (content !== null && sha) {
      const file = reverseMap[customCID];
      const contentSHA = await sha256(content);
      //@ts-ignore
      if (shasums[file] === contentSHA) {
        await IPFS.put(customCID, content);
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
      globalThis.shaSums = JSON.parse('${JSON.stringify(shasums)}');
      globalThis.reverseMap = {}; 
      Object.keys(globalThis.files).forEach(k=>globalThis.reverseMap[globalThis.files[k]]=k);`,
    );
  }
  if (pathname === "/check") {
    const res: String[] = [];
    Object.keys(files).map(async (file) => {
      //@ts-ignore
      const kvRes = await IPFS.get(files[file]);
      if (kvRes === null) {
        res.push(file);
      }
    });
    return text(res.join(", "));
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

    //@ts-ignore
    let fileCid = files[pathname.slice(1)];
    if (pathname === "/") {
      fileCid = files["index.html"];
    }

    url.pathname = "/ipfs/" + fileCid;
    const req2 = new Request(url.toString());

    return handleRequest(req2);
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
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}

async function fetchCid(path: string, retry = 3): Promise<Response> {
  const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    0.5 - Math.random()
  )
    .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", path))
    .map((x: string) =>
      fetchWithTimeout(x, { timeout: 5000 }).then((res) => {
        if (!res || res.status !== 200) {
          throw new Error("Not found");
        }
        return res.clone();
      }).catch((e) => console.log({ e }))
    );

  try {
    const res = raceToSuccess(random5GatewaysFetch) as Response;
    return res;
  } catch {
    if (retry > 0) return await fetchCid(path, retry - 1) as Response;
    const res = text("404- cant fetch cid  ") as Response;
    return res;
  }
}

async function fetchWithTimeout(
  resource: string,
  options: { timeout: number },
) {
  const { timeout = 8000 } = options;

  return Promise.race([
    fetch(resource),
    new Promise((_resolve, reject) => {
      setTimeout(() => reject(0), timeout);
    }),
  ]) as unknown as Response;
}
