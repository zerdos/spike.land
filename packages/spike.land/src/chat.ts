import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import wasm from "./esbuild-loader";
// import {join} from "./rtc.mjs"
import { ASSET_MANIFEST, files } from "./staticContent.mjs";

import ASSET_HASH from "./dist.shasum";

// import imap from "@spike.land/code/src/importMap.json";
import { importMap, importMapReplace, md5 } from "../../code/dist/src/session.mjs";

import { CodeEnv } from "./env";
import { initAndTransform } from "./esbuild";
import { handleErrors } from "./handleErrors";

const api: ExportedHandler<CodeEnv> = {
  fetch: async (
    req,
    env,
  ) => {
    let request = new Request(req.url, req);
    if (
      request.cf && request.cf.asOrganization
      && request.cf.asOrganization.startsWith("YANDEX")
    ) {
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
        const newUrl = new URL(path.join("/"), url.origin);
        request = new Request(newUrl, request);

        // if (newUrl.pathname.includes(":z:")) {
        //   const reqHeaders = new Headers(request.headers);
        //   const next = atob(newUrl.pathname.slice(4));
        //   reqHeaders.set("Referer", next);

        //   request = new Request(next, { ...request, headers: reqHeaders });
        //   let resp = await fetch(request);
        //   if (!resp.ok) return resp;

        //   const headers = new Headers(resp.headers);
        //   headers.set("Access-Control-Allow-Origin", "*");
        //   headers.set("Cross-Origin-Embedder-Policy", "require-corp");
        //   resp = new Response(resp.body, { ...resp, headers });

        //   // await cache.put(cacheKey, response.clone());
        //   return resp;
        // }

        const cacheKey = new Request(request.url);
        const cache = await caches.open(ASSET_HASH);

        let response = await cache.match(cacheKey);
        if (response) {
          return response;
        }

        // ) {
        // Referer:
        // https:
        // testing.spike.land/npm:/v102/@emotion/serialize@1.1.1/es2015/serialize.js?bundle&target=es2020&keep-names=true&dev=true

        // if (path[0] && path[0].startsWith("unpkg:")) {
        //   const esmUrl = u.toString().replace(
        //     u.origin + "/unpkg:",
        //     "https://unpkg.com/",
        //   );

        //   request = new Request(esmUrl, { ...request, redirect: "follow" });
        //   let resp = await fetch(request);

        //   if (
        //     resp !== null && !resp.ok || resp.status === 307
        //     || resp.status === 302
        //   ) {
        //     const redirectUrl = resp.headers.get("location");
        //     if (redirectUrl) {
        //       request = new Request(redirectUrl, {
        //         ...request,
        //         redirect: "follow",
        //       });
        //       resp = await fetch(request);
        //     }
        //     if (resp !== null && !resp.ok) return resp;
        //   }

        //   const isText = !!resp?.headers?.get("Content-Type")?.includes(
        //     "charset",
        //   );
        //   const bodyStr = await (isText ? resp.text() : null);
        //   const regex = /https:\/\/unpkg.com\//gm;
        //   const regex2 = / from "\//gm;
        //   if (!bodyStr) throw new Error("empty body");

        //   const responseToCache = new Response(
        //     `
        //       // ${request.url}
        //       `
        //       + bodyStr
        //       ? bodyStr.replaceAll(regex, u.origin + "/unpkg:")
        //         .replaceAll(regex2, " from \"/unpkg:")
        //       : await resp.blob(),
        //     {
        //       status: 200,
        //       headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Cross-Origin-Embedder-Policy": "require-corp",
        //         "Cache-Control": "public, max-age=604800, immutable",
        //         "Content-Type": resp.headers.get("Content-Type")!,
        //       },
        //     },
        //   );
        //   if (responseToCache.ok) {
        //     await cache.put(cacheKey, responseToCache.clone());
        //   }
        //   return responseToCache;
        // }

        // if (path[0] && path[0].startsWith("node_modules")) {
        //   const esmUrl = u.toString().replace(
        //     u.origin + "/node_modules/",
        //     "https://unpkg.com/",
        //   );
        //   request = new Request(esmUrl, { ...request, redirect: "follow" });
        //   let resp = await fetch(request);

        //   if (
        //     resp !== null && !resp.ok || resp.status === 307
        //     || resp.status === 302
        //   ) {
        //     const redirectUrl = resp.headers.get("location");
        //     if (redirectUrl) {
        //       request = new Request(
        //         new URL(redirectUrl, `https://unpkg.com`).toString(),
        //         {
        //           ...request,
        //           redirect: "follow",
        //         },
        //       );
        //       resp = await fetch(request);
        //     }
        //     if (resp !== null && !resp.ok) return resp;
        //   }

        //   const isText = !!resp?.headers?.get("Content-Type")?.includes(
        //     "charset",
        //   );
        //   const bodyStr = await (isText ? resp.text() : null);
        //   const regex = /https:\/\/unpkg.com\//gm;
        //   const regex2 = / from "\//gm;
        //   if (!bodyStr) throw new Error("empty body");

        //   const responseToCache = new Response(
        //     `
        //       // ${request.url}
        //       `
        //       + bodyStr
        //       ? bodyStr.replaceAll(regex, u.origin + "/node_modules/")
        //         .replaceAll(regex2, " from \"/node_modules/")
        //       : await resp.blob(),
        //     {
        //       status: 200,
        //       headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Cross-Origin-Embedder-Policy": "require-corp",
        //         "Cache-Control": "public, max-age=604800, immutable",
        //         "Content-Type": resp.headers.get("Content-Type")!,
        //       },
        //     },
        //   );
        //   if (responseToCache.ok) {
        //     await cache.put(cacheKey, responseToCache.clone());
        //   }
        //   return responseToCache;
        // }

        switch (path[0]) {
          case "ping":
            return new Response("ping" + Math.random(), {
              headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache",
              },
            });
          case "index.bu.js": {
            const trp = await initAndTransform(
              ` export const Box = ({children})=><div>{children}</div>;`,
              {},
              url.origin,
              env,
            );
            return new Response(trp, {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          case "env":
            return new Response(JSON.stringify({ env, accept }), {
              headers: {
                "Content-Type": "text/html;charset=UTF-8",
                "Cache-Control": "no-cache",
              },
            });

          case "websocket": {
            if (request.headers.get("Upgrade") != "websocket") {
              return new Response("expected websocket", { status: 400 });
            }
            //
            //          const paths = [...path.slice(1)];
            //

            // const pair = new WebSocketPair();
            const id = env.CODE.idFromName(ASSET_HASH);
            const roomObject = env.CODE.get(id);
            const newUrl = new URL(`${url.origin}/websocket/${assetHash}`);
            return roomObject.fetch(newUrl);

            // signaller({...pair[1]});

            // return new Response(null, { status: 101, webSocket: pair[0] });
          }
          case "files.json":
            return new Response(JSON.stringify(files), {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Cache-Control": "no-cache",
                ASSET_HASH,
              },
            });
          case "importMap.json":
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

          case "ata":
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
          default: {
            const file = newUrl.pathname.slice(0, 7) === ("/assets/")
              ? newUrl.pathname.slice(8)
              : newUrl.pathname.slice(1);

            if (files[file]) {
              const kvCacheKey = new Request(
                request.url.replace(file, files[file]),
              );
              response = await cache.match(kvCacheKey);
              if (response) return response;

              let kvResp = await getAssetFromKV(
                {
                  request,
                  waitUntil: async (prom) => await prom,
                },
                {
                  // cacheControl: (isChunk(url.href)
                  //   ? {
                  //     browserTTL: 2 * 60 * 60 * 24,
                  //     edgeTTL: 2 * 60 * 60 * 24,
                  //     orbypassCache: false,
                  //   }
                  //   : {
                  //     browserTTL: 0,
                  //     edgeTTL: 0,
                  //     bypassCache: true,
                  //   }),
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST,
                },
              );

              if (!kvResp.ok) return kvResp;

              // const isText = kvResp?.headers?.get("Content-Type")?.includes(
              //   "charset",
              // );

              // const isText = !!kvResp?.headers?.get("Content-Type")?.includes(
              //   "charset",
              // );

              // const kvRespCloned = kvResp.clone();

              kvResp = new Response(kvResp.body, kvResp);
              const headers = new Headers(kvResp.headers);
              kvResp.headers.forEach((v, k) => headers.append(k, v));
              if (isChunk(request.url)) {
                headers.set(
                  "Cache-Control",
                  "public, max-age=604800, immutable",
                );
              }
              headers.set("Cross-Origin-Embedder-Policy", "require-corp");
              kvResp = new Response(kvResp.body, { ...kvResp, headers });
              return kvResp;
            }

            // const referer = request.headers.get("Referer");
            // if (
            //   path[0]
            //   && ((referer && referer.indexOf("npm:/") !== -1) || path[0].startsWith("v9") || path[0].startsWith("v1")
            //     || path[0].startsWith("npm:") || path[0].startsWith("node_modules/"))
            // ) {
            // if (u.toString().includes(".d.ts")) {
            //   const dtsUrl = u.toString().replace(
            //     u.origin + "/npm:",
            //     "https://esm.sh",
            //   );
            //   request = new Request(dtsUrl, { ...request, redirect: "follow" });
            //   response = await fetch(request);
            // let response= new Response(JSON.stringify({ env, accept,path  }), {
            //   headers: {
            //     "Content-Type": "text/html;charset=UTF-8",
            //     "Cache-Control": "no-cache",
            //   },
            // });
            // return response;
            // response = new Response(path[0], response);

            //   if (!response.ok) return response;
            //   response = new Response(
            //     importMapReplace(
            //       (await response.text()).split("esm.sh/").join(u.hostname + "/npm:/"),
            //       u.origin
            //     ),
            //     {
            //       ...response,
            //     },
            //   );

            //   await cache.put(cacheKey, response.clone());
            //   return response;
            // }
            // const isJs = u.toString().includes(".js")
            //   || u.toString().includes(".mjs");

            const isDTS = u.pathname.endsWith(".d.ts");

            const packageName = u.toString().split(
              u.origin,
            ).join(
              "https://esm.sh",
            ).split(
              "/node_modules",
            ).join(
              "",
            ).split(
              "/npm:",
            ).join(
              "",
            ).replace("/index.d.ts", "");

            const esmUrl = packageName;

            request = new Request(esmUrl, { redirect: "follow" });
            response = await fetch(request);
            if (!response.ok) {
              request = new Request(
                new URL(newUrl.pathname, "https://raw.githubusercontent.com/")
                  .toString(),
              );
              response = await fetch(request);

              if (!response.ok) return response;
            }

            // if (response.headers.has("location")) {
            const redirectUrl = response.headers.get("location")
              || response.url;

            // request = new Request(redirectUrl, request);

            const headers = new Headers(response.headers);
            headers.set(
              "location",
              redirectUrl.replace(
                "esm.sh/",
                u.hostname + "/",
              ),
            );
            headers.set("Cross-Origin-Embedder-Policy", "require-corp");

            const xTs = response.headers.get("x-typescript-types") || "NO_DTS";
            if (isDTS) {
              if (xTs === "NO_DTS") {
                return new Response(JSON.stringify({ error: "NO_DTS" }), {
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Cache-Control": "no-cache",
                  },
                });
              }

              const xt = response.headers.get("x-typescript-types");
              response = new Response(
                `
              export * from "${xt}";
              export { default } from "${xt}";
              `,
                {
                  headers: {
                    "content-type": "application/javascript; charset=utf-8",
                    "Cache-Control": "no-cache",
                  },
                },
              );
            }

            // headers.set(
            //   "x-dts",
            //   xTs,
            // );

            // headers.delete("x-typescript-types");

            //   return response;
            // }

            const isText = !!response?.headers?.get("Content-Type")?.includes(
              "charset",
            );
            const bodyStr = isText
              ? importMapReplace(
                await response.text(),
                u.origin,
                isDTS ? xTs : response.url,
              ).split("esm.sh").join(
                url.host,
              )
              : await response.blob();

            response = new Response(
              bodyStr,
              {
                ...response,
                status: 200,
                headers,
              },
            );

            // if (isText && response.url.indexOf(".d.ts") !== -1) {

            // }

            // response = new Response(
            //   bodyStr,
            //   {
            //     status: 200,
            //     headers: {
            //       "Access-Control-Allow-Origin": "*",
            //       "Cross-Origin-Embedder-Policy": "require-corp",
            //       "Cache-Control": "no-cache",
            //       "x-DTS": (response.headers.get("x-typescript-types") || "NO_DTS").replace("esm.sh/", u.host + "/npm:/"),
            //       "Content-Type": response.headers.get("Content-Type")!,
            //     },
            //   },
            // );

            await cache.put(cacheKey, response.clone());
            return response;
            // }
            // }
          }
        }
      };

      return handleFetchApi(path);
    });
  },
};

// async function handleFileEvent(request: Request, ASSET_NAMESPACE: KVNamespace) {
//   try {
//     const ev = { request, waitUntil: async (prom: Promise<void>) => await prom };
//     // Add logic to decide whether to serve an asset or run your original Worker code
//     return await getAssetFromKV(ev, {
//       ASSET_NAMESPACE,
//       ASSET_MANIFEST,
//     });
//   } catch (e) {
//     const pathname = new URL(request.url).pathname;
//     return new Response(
//       `"${pathname}" not found.

//     ASSET_NAMESPACE: ${ASSET_NAMESPACE}
//     ASSET_MANIFEST:
//     ${ASSET_MANIFEST}`,
//       {
//         status: 404,
//         statusText: "not found",
//       },
//     );
//   }
// }
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
          return new Response(id.toString(), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
            },
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
  return link.indexOf("chunk-") !== -1 || chunkRegExp.test(link);
}

export const getImportMapStr = (orig: string) => {
  const importmapImport: { [k: string]: string } = { ...importMap.imports };

  for (const [key, value] of Object.entries(importMap.imports)) {
    importmapImport[key] = orig + "/" + value;
  }

  return JSON.stringify({ imports: importmapImport });
};

export default api;

function signaller(arg0: any) {
  console.count("yay");
}
// function replaceAll(input: string, search: string, replace: string) {
//   return input.split(search).join(replace);
// }

// function removeComments(str: string) {
//   const code = str.split("\n").map(x => x.trim()).filter(x => x.slice(0, 2) !== "//" || x.indexOf("reference") !== -1)
//     .join("\n").split(";").map(x => x.trim()).filter(x => x.slice(0, 2) !== "//" || x.indexOf("reference") !== -1).join(
//       ";/n",
//     );
//   const regex = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;

//   // const regex = /(?<!\/)\/\*((?:(?!\*\/).|\s)*)\*\//g;
//   // /\/\*.*?\*\//gi;
//   // Takes a string of code, not an actual function.
//   return code.replaceAll(regex, ``);
// }
