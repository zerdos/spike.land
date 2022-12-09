import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
// import {join} from "./rtc.mjs"
import packages from "@spike.land/code/package.json";
import { ASSET_HASH, ASSET_MANIFEST, files } from "./staticContent.mjs";

// import imap from "@spike.land/code/js/importmap.json";

import importMap from "@spike.land/code/js/importmap.json";
import { md5 } from "@spike.land/code/js/session";
import { CodeEnv } from "./env";
import { handleErrors } from "./handleErrors";

const esbuildExternal = [
  ...Object.keys(importMap.imports),
  "monaco-editor",
  "react",
  "react-dom",
  // "react/jsx-runtime",
  // "react/jsx-dev-runtime",
  // "@mui/material",
  // "framer-motion",
];
const mods: { [key: string]: string } = {};
esbuildExternal.map((packageName) => mods[packageName] = `npm:/${packageName}`);

const api: ExportedHandler<CodeEnv> = {
  fetch: async (
    req,
    env,
  ) => {
    let request = new Request(req.url, req);
    if (request.cf?.asOrganization?.startsWith("YANDEX")) {
      return new Response(null, { status: 401, statusText: "no robots" });
    }

    return handleErrors(request, async () => {
      console.log(`handling request: ${request.url}`);
      // We have received an HTTP request! Parse the URL and route the request.

      const u = new URL(request.url);
      const url = u;

      const accept = request.headers.get("accept");

      // const serveJs = !(accept && accept.includes("html"));

      // if (
      //   serveJs && u.pathname.endsWith(".tsx")
      //   && !u.pathname.endsWith("index.tsx")
      // ) {
      //   url = new URL(request.url.replace(".tsx", "/index.tsx"));
      // }

      // if (serveJs && !url.pathname.includes(".")) {
      //   url = new URL(request.url + "/index.js");
      // }

      const path = url.pathname.slice(1).split("/");

      if (!path[0]) {
        const utcSecs = Math.floor(Math.floor(Date.now() / 1000 / 7200));
        console.log({ asOrganization: request.cf?.asOrganization });
        const start = md5(
          (request.cf?.asOrganization || "default") + utcSecs + `
        and reset every 2 hours
        time`,
        );
        // Serve our HTML at the root path.
        return new Response(
          `<meta http-equiv="refresh" content="0; URL=${u.origin}/live/${start}" />`,
          {
            status: 307,
            headers: {
              "Location": `${u.origin}/live/${start}/`,
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache",
              ASSET_HASH: ASSET_HASH,
            },
          },
        );
      }

      const handleFetchApi = async (path: string[]): Promise<Response> => {
        const newUrl = new URL(path.join("/"), url.origin).toString();
        request = new Request(newUrl, request);

        const cacheKey = new Request(request.url);
        const cache = caches.default;

        let response = await cache.match(cacheKey);
        if (response) {
          return response;
        }

        if (newUrl.includes(":z:")) {
          const reqHeaders = new Headers(request.headers);
          const newUrl = atob(url.href.slice(3));
          reqHeaders.set("Referer", newUrl);

          request = new Request(newUrl, { ...request, headers: reqHeaders });
          response = await fetch(request);
          if (!response.ok) return response;

          const headers = new Headers(response.headers);
          headers.set("Access-Control-Allow-Origin", "*");
          response = new Response(response.body, { ...response, headers });

          await cache.put(cacheKey, response.clone());
          return response;
        }
        // ) {

        if (
          path[0].startsWith("npm:") || path[0].startsWith("node_modules/")
        ) {
          const isJs = u.toString().includes(".js")
            || u.toString().includes(".mjs");

          const packageName = u.toString().replace(
            u.origin + "/npm:",
            "",
          ).replace(
            u.origin + "/node_modules",
            "",
          );
          const searchParams = (isJs
            ? `?bundle&external=${esbuildExternal.filter((p) => p !== packageName).join(",")} `
            : "");
          const esmUrl = "https://esm.sh/" + packageName + searchParams;

          request = new Request(esmUrl, { ...request, redirect: "follow" });
          response = await fetch(request);
          if (!response.ok) {
            return response;
          }

          if (response?.status === 307 || response.headers.has("location")) {
            const redirectUrl = response.headers.get("location")!;

            request = new Request(redirectUrl, request);

            const headers = new Headers(response.headers);
            headers.set(
              "location",
              redirectUrl.replace(
                "esm.sh/",
                u.hostname + "/npm:/",
              ),
            );

            response = new Response(
              (await response.text()).replace("esm.sh/", u.hostname + "/npm:/"),
              {
                ...response,
                headers,
              },
            );

            await cache.put(cacheKey, response.clone());
            return response;
          }

          const xTs = response.headers.get("x-typescript-types") || "NO_DTS";

          const isText = !!response?.headers?.get("Content-Type")?.includes(
            "charset",
          );
          const bodyStr = await (isText ? response.text() : null);
          if (!bodyStr) {
            throw new Error("empty body");
          }

          const regex = /https:\/\/esm.sh\//gm;
          const regex2 = / from "\//gm;
          const regex3 = /import "\//gm;

          const regex4 = /from"\//gm;
          const regex5 = /import"\//gm;

          response = new Response(
            isText
              ? bodyStr.replaceAll(regex, u.origin + "/npm:/")
                .replaceAll(regex2, " from \"/npm:/")
                .replaceAll(regex3, "import \"/npm:/")
                .replaceAll(regex4, " from \"/npm:/")
                .replaceAll(regex5, "import \"/npm:/")
              : await response.blob(),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=604800, immutable",
                "x-DTS": xTs.replace("esm.sh/", u.host + "/npm:/"),
                "Content-Type": response.headers.get("Content-Type")!,
              },
            },
          );

          await cache.put(cacheKey, response.clone());
          return response;
        }

        if (path[0].startsWith("unpkg:")) {
          const esmUrl = u.toString().replace(
            u.origin + "/unpkg:",
            "https://unpkg.com/",
          );

          request = new Request(esmUrl, { ...request, redirect: "follow" });
          let resp = await fetch(request);

          if (resp !== null && !resp.ok || resp.status === 307) {
            const redirectUrl = resp.headers.get("location");
            if (redirectUrl) {
              request = new Request(redirectUrl, {
                ...request,
                redirect: "follow",
              });
              resp = await fetch(request);
            }
            if (resp !== null && !resp.ok) return resp;
          }

          const isText = !!resp?.headers?.get("Content-Type")?.includes(
            "charset",
          );
          const bodyStr = await (isText ? resp.text() : null);
          const regex = /https:\/\/unpkg.com\//gm;
          const regex2 = / from "\//gm;
          if (!bodyStr) throw new Error("empty body");

          const responseToCache = new Response(
            `
              // ${request.url}
              `
              + bodyStr
              ? bodyStr.replaceAll(regex, u.origin + "/unpkg:")
                .replaceAll(regex2, " from \"/unpkg:")
              : await resp.blob(),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=604800, immutable",
                "Content-Type": resp.headers.get("Content-Type")!,
              },
            },
          );
          if (responseToCache.ok) {
            await cache.put(cacheKey, responseToCache.clone());
          }
          return responseToCache;
        }

        if (path[0].startsWith("node_modules")) {
          const esmUrl = u.toString().replace(
            u.origin + "/node_modules/",
            "https://unpkg.com/",
          );
          request = new Request(esmUrl, { ...request, redirect: "follow" });
          let resp = await fetch(request);

          if (resp !== null && !resp.ok || resp.status === 307) {
            const redirectUrl = resp.headers.get("location");
            if (redirectUrl) {
              request = new Request(
                new URL(redirectUrl, `https://unpkg.com`).toString(),
                {
                  ...request,
                  redirect: "follow",
                },
              );
              resp = await fetch(request);
            }
            if (resp !== null && !resp.ok) return resp;
          }

          const isText = !!resp?.headers?.get("Content-Type")?.includes(
            "charset",
          );
          const bodyStr = await (isText ? resp.text() : null);
          const regex = /https:\/\/unpkg.com\//gm;
          const regex2 = / from "\//gm;
          if (!bodyStr) throw new Error("empty body");

          const responseToCache = new Response(
            `
              // ${request.url}
              `
              + bodyStr
              ? bodyStr.replaceAll(regex, u.origin + "/node_modules/")
                .replaceAll(regex2, " from \"/node_modules/")
              : await resp.blob(),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=604800, immutable",
                "Content-Type": resp.headers.get("Content-Type")!,
              },
            },
          );
          if (responseToCache.ok) {
            await cache.put(cacheKey, responseToCache.clone());
          }
          return responseToCache;
        }

        switch (path[0]) {
          case "ping":
            return new Response("ping" + Math.random(), {
              headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache",
              },
            });
          case "env":
            return new Response(JSON.stringify({ env, accept }), {
              headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache",
              },
            });
          case "files.json":
            return new Response(JSON.stringify(files), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH,
              },
            });
          case "packages.json":
            return new Response(JSON.stringify(packages), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
              },
            });
          case "importmap.json":
            return new Response(JSON.stringify(importMap), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH,
              },
            });
          case "api":
            // This is a request for `/api/...`, call the API handler.
            return handleApiRequest(path.slice(1), request, env);

          case "ipns":
          case "ipfs": {
            const u = new URL(request.url, "https://cloudflare-ipfs.com");
            const new1 = new URL(u.pathname, "https://cloudflare-ipfs.com");
            const resp = await fetch(new1.toString());
            if (!resp.ok) return resp;

            const new2 = new URL(u.pathname, "https://ipfs.io");
            const resp2 = await fetch(new2.toString());
            return resp2;
          }
          case "live": {
            const paths = [...path.slice(1)];

            // const newUrl =  new URL(paths.join("/"), url.origin);

            // const assets: typeof assetManifest = {}
            // Object.keys(assetManifest).map(x=>{assets[`/live/${paths[0]}/${x}`]=assetManifest[x]})

            return handleApiRequest(
              ["room", ...paths],
              request,
              env,
            ).catch((e) =>
              new Response("Error," + e?.message, {
                status: 500,
                statusText: e?.message,
              })
            );
          }
          default:
            try {
              return await getAssetFromKV(
                {
                  request,
                  waitUntil: async (prom) => await prom,
                },
                {
                  cacheControl: (isChunk(url.href)
                    ? {
                      browserTTL: 2 * 60 * 60 * 24,
                      edgeTTL: 2 * 60 * 60 * 24,
                      bypassCache: false,
                    }
                    : {
                      browserTTL: 0,
                      edgeTTL: 0,
                      bypassCache: true,
                    }),
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST,
                },
              );
            } catch {
              const req = new Request(`${u.origin}/npm:${u.pathname}`, request);
              response = await fetch(req);
              if (!response.ok) return response;

              const newHeaders = new Headers(response.headers);

              newHeaders.append(`Location`, req.url),
                response = new Response(response.body, {
                  ...response,
                  status: 307,

                  headers: newHeaders,
                });
              const cache = caches.default;
              await cache.put(cacheKey, response.clone());
              return response;
            }
        }
      };

      return handleFetchApi(path);
    });
  },
};

async function handleFileEvent(request: Request, ASSET_NAMESPACE: KVNamespace) {
  try {
    const ev = { request, waitUntil: async (prom: Promise<void>) => await prom };
    // Add logic to decide whether to serve an asset or run your original Worker code
    return await getAssetFromKV(ev, {
      ASSET_NAMESPACE,
      ASSET_MANIFEST,
    });
  } catch (e) {
    let pathname = new URL(request.url).pathname;
    return new Response(
      `"${pathname}" not found. 
    
    ASSET_NAMESPACE: ${ASSET_NAMESPACE}
    ASSET_MANIFEST: 
    ${ASSET_MANIFEST}`,
      {
        status: 404,
        statusText: "not found",
      },
    );
  }
}
async function handleApiRequest(
  path: string[],
  request: Request,
  env: CodeEnv,
) {
  // We've received at API request. Route the request based on the path.

  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          const id = env.CODE.newUniqueId();
          return new Response(id.toString(), {
            headers: { "Access-Control-Allow-Origin": "*" },
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      const name = path[1].replace(".tsx", "");

      let id;
      if (name.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }

      const roomObject = env.CODE.get(id);
      const newUrl = new URL(request.url);

      newUrl.pathname = "/" + path.slice(2).join("/");
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(new Request(newUrl.toString(), request));
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}

// async function getHTMLResp(env: CodeEnv, room: string) {
//   const id = env.CODE.idFromName(room);
//   const roomObject = env.CODE.get(id);

//   return roomObject.fetch("public?room=" + room);
// }

function isChunk(link: string) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.includes("chunk-") || chunkRegExp.test(link);
}

export const getImportMapStr = (orig: string) => {
  const importmapImport: { [k: string]: string } = { ...importMap.imports };

  for (const [key, value] of Object.entries(importMap.imports)) {
    importmapImport[key] = orig + "/" + value;
  }

  return JSON.stringify({ imports: importmapImport });
};

export default api;
