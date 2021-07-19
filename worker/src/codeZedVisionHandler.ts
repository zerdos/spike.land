//@ts-ignore

import { files } from "./files.ts";
import { handleCloudRequest } from "./handler";
import Hash from "ipfs-only-hash";
import { js, json, text } from "@responds";
import { log } from "./handler";

//@ts-ignore
import { shasums } from "./shasums.ts";
import { publicIpfsGateways, raceToSuccess } from "@zedvision/ipfs";
//@ts-ignore
import { cid } from "./cid.ts";
//@ts-ignore
import { alterHeaders, sha256, sha256UArray } from "./alterHeaders.ts";

export type KV = { [key: string]: string };

const reverseMap: KV = {};
const reverseSHAKV: KV = {};
const filteredFiles: KV = {};

export const shasumsKV: KV = shasums;
export const fileKV: KV = files;

Object.keys(fileKV).forEach((k) => {
  if (shasumsKV[k]) {
    filteredFiles[k] = fileKV[k];

    reverseMap[fileKV[k]] = k;
    reverseSHAKV[shasumsKV[k]] = k;
  } else {
    delete fileKV[k];
  }
});

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request}
 */
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname.slice(0, 6) === `/ipfs/`) {
    let customCID = pathname.slice(6);
    const reversePath = reverseMap[customCID] ||
      (pathname.slice(0, 52) === `/ipfs/${cid}` && (pathname.slice(53) ||
        "index.html")) ||
      pathname;

    const sha = reversePath && shasumsKV[reversePath];

    if (
      pathname.slice(0, 52) === `/ipfs/${cid}`
    ) {
      const path = pathname.slice(53);
      customCID = fileKV[path];
    }

    if (reversePath) url.pathname = `/ipfs/${cid}/${reversePath}`;

    const cacheKey = new Request(url.toString());
    const cache = caches.default;

    let response = null;
    try {
      response = await cache.match(cacheKey);
    } catch {
      return await text("unreliable cache, should be reported to CF");
    }

    if (response && response.status == 200) {
      if (sha) {
        const content = await response.arrayBuffer();
        const shaContent = await sha256(content);

        if (sha == shaContent) {
          return await alterHeaders(new Response(content), reversePath);
        }

        response = undefined;
        cache.delete(cacheKey);
      }
    }

    let content = await IPFS.get(customCID, "arrayBuffer");
    if (content !== null && sha) {
      const file = reverseMap[customCID];
      const contentSHA = await sha256(content);

      if (shasumsKV[file] === contentSHA) {
        await IPFS.put(customCID, content);
      } else {
        await IPFS.delete(customCID);
        content = null;
      }
    }

    if (content) {
      response = new Response(content);
    } else {
      try {
        response = await fetchCid("/ipfs/" + customCID, 5);
      } catch (e) {
        return await text("Error: " + Object.toString.call(e));
      }

      const contentToSave = await response.clone().arrayBuffer();
      if (sha) {
        const check = await sha256(contentToSave);
        if (check !== sha) {
          const textContent = new TextDecoder().decode(contentToSave);

          return await text(`
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

  if (pathname === "/hash") {
    try {
      const Hash = await import("ipfs-only-hash");
      const data = "hello world!";
      const hash = await Hash.of(data);
      return await text(hash);
    } catch (e) {
      return await text(Object.toString.call(e));
    }
  }

  if (pathname === `/cid.json`) {
    return await json({ cid });
  }
  if (pathname === `/${cid}.js`) {
    return await js(`export const files = ${JSON.stringify(files)}`);
  }
  if (pathname === `/ipfs.js`) {
    return await js(
      getGlobalThis(),
    );
  }

  if (pathname === "/generated-sw.js") {
    return js(
      `self.importScripts("./sw.js");
      ${getGlobalThis()}
      globalThis.register();
      `,
    );
  }
  if (pathname === "/check") {
    const { check } = await import("./spike.land/check");
    return await check(filteredFiles);
  }
  if (pathname === "/logs") {
    const { logs } = await import("./spike.land/logs");
    return await logs();
  }
  if (pathname.startsWith("/save/")) {
    const maybeCID = pathname.slice(6);
    const content = await request.text();
    const calculatedCID = await Hash.of(content);

    if (maybeCID === calculatedCID) {
      const uuid = request.headers.get("UID");
      if (!uuid) return await text("UID is empty");

      const user: Object | null = await USERS.get(uuid, "json");
      if (!user) return await text("USER not found");
      await IPFS.put(calculatedCID, content);
      await USERS.put(uuid, JSON.stringify({ ...user, latest: calculatedCID }));
      await log("SAVE");
      return await text("CID saved");
    }

    return await text("test");
  }

  if (pathname.startsWith("/add/")) {
    const deploySHA = await sha256(JSON.stringify(filteredFiles));

    const res = await SHAKV.get(deploySHA);

    if (res) {
      const resJson = JSON.parse(res);
      if (resJson.missing.length === 0) {
        //
        // save it to a special place
        //

        return await text("nothing missing!");
      }

      const maybeCID = pathname.slice(5);
      if (resJson.missing.indexOf(maybeCID) !== -1) {
        const content = await request.text();
        const calculatedCID = await Hash.of(content);
        const contentSHA = await sha256(content);
        const fileName = reverseSHAKV[contentSHA];
        if (fileName) {
          const cid = files[fileName];
          if (cid === maybeCID) {
            await IPFS.put(cid, content);
            return await text("Thanks :)" + calculatedCID);
          }

          return await text(fileName);
        }
        return await text(`content sha not found: ${contentSHA}`);
      }

      return await text(`this content is not missing: ${maybeCID}`);
    }
    return await text("Nah:(");
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

  if (fileKV[pathname.slice(1)] || pathname === "/") {
    url.pathname = "/ipfs/" + cid + pathname === "/" ? "/index.html" : pathname;

    let fileCid = fileKV[pathname.slice(1)];
    if (pathname === "/") {
      fileCid = files["index.html"];
    }

    url.pathname = "/ipfs/" + fileCid;
    const req2 = new Request(url.toString());
    return await handleRequest(req2) as unknown as Response;
  }
  return handleCloudRequest(request);
}

async function fetchCid(path: string, retry = 3): Promise<Response> {
  const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    0.5 - Math.random()
  )
    .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", path))
    .map((x: string) =>
      fetch(x).then((res) => {
        if (!res || res.status !== 200) {
          throw new Error("Not found");
        }
        return res.clone();
      }).catch((e) => console.log({ e }))
    );

  let res;

  try {
    res = await raceToSuccess(random5GatewaysFetch) as Response;
    if (res) return res.clone();
  } catch {
    if (retry > 0) return await fetchCid(path, retry - 1) as Response;
    throw new Error("500 - some error - :(");
  }
  if (retry > 0) return await fetchCid(path, retry - 1) as Response;
  throw new Error("500 - some error");
}

function getGlobalThis() {
  return `globalThis.cid = "${cid}";
  globalThis.files=JSON.parse('${JSON.stringify(filteredFiles)}'); 
  globalThis.shaSums = JSON.parse('${JSON.stringify(shasums)}');
  globalThis.reverseMap = {}; 
  Object.keys(globalThis.files).forEach(k=>globalThis.reverseMap[globalThis.files[k]]=k);`;
}
