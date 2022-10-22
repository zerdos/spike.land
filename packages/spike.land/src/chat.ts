import { getAssetFromKV,  } from "@cloudflare/kv-asset-handler";
// import {join} from "./rtc.mjs"
import {a, ASSET_MANIFEST} from "./staticContent.mjs";

// import imap from "@spike.land/code/js/importmap.json";

import { handleErrors } from "./handleErrors";
import { CodeEnv } from "./env";


// const ws = a["ws.mjs"];
const preact ="/reactMod.mjs";
const babel = "/babel.mjs";
const emotionReact = "/emotion.mjs";
const emotionJsxRuntime = "/emotionJsxRuntime.mjs";
const emotionCache = "/emotionCache.mjs";

const emotionStyled = "/emotionStyled.mjs";

const motion = "/motion.mjs";

const esbuildExternal = [
  "monaco-editor",
  // "react/jsx-runtime",
  // "react/jsx-dev-runtime",
  "@mui/material",
  "framer-motion",
  "tslib",
];
const externals = esbuildExternal.join(",");
const mods: { [key: string]: string } = {};
esbuildExternal.map((packageName) => mods[packageName] = `npm:/${packageName}`);
export const imap = {
  "imports": {
    ...mods,
    "@emotion/react": emotionReact,
    "@emotion/react/jsx-runtime": emotionJsxRuntime,
    // "@emotion/styled": emotionStyled,
  //  "@emotion/cache": emotionCache,
    // "live/": "live/",
    "react": preact,
    //"react/jsx-runtime": "/jsx.mjs",
    "react-dom": preact,
    "react-dom/client": preact,
    "@babel/runtime/helpers/extends": babel,
    // "react-dom/server": preact,








    
    "framer-motion": motion,
    // "ws.mjs": ws,
    // "preact": "https://ga.jspm.io/npm:preact@10.8.2/dist/preact.module.jchs",
    // "preact-render-to-string": "https://ga.jspm.io/npm:preact-render-to-string@5.2.0/dist/index.mjs",
    // "preact/compat": "https://ga.jspm.io/npm:preact@10.8.2/compat/dist/compat.module.js",
    // "preact/jsx-runtime": "https://ga.jspm.io/npm:preact@10.8.2/jsx-runtime/dist/jsxRuntime.module.js"
  },
};

export default {
  async fetch(
    request: Request,
    env: CodeEnv,
    ctx: ExecutionContext,
  ) {
    console.log(JSON.stringify({...request.cf}, null, 2));
    return handleErrors(request, async () => {
      console.log(`handling request: ${request.url}`);
      // We have received an HTTP request! Parse the URL and route the request.

      const u = new URL(request.url);
      let url = u
      
      const accept = request.headers.get("accept");

      const serveJs = !(accept && accept.includes("html"));

      if (
        serveJs && u.pathname.endsWith(".tsx") &&
        !u.pathname.endsWith("index.tsx")
      ) {
        url = new URL(request.url.replace(".tsx", "/index.tsx"));
      }

      if (serveJs && !url.pathname.includes(".")) {
        url = new URL(request.url + "/index.js");
      }

      const path = url.pathname.slice(1).split("/");

      if (!path[0]) {
        // Serve our HTML at the root path.
        return new Response(
          `<meta http-equiv="refresh" content="0; URL=${u.origin}/live/coder" />`,
          {
            headers: {
              "Location": `${u.origin}/live/coder`,
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache",
            },
          },
        );
      }

      const handleFetchApi = async (path: string[]): Promise<Response> => {
        const newUrl = new URL(path.join("/"), url.origin).toString();
        const _request = new Request(newUrl, { ...request, url: newUrl });

        let cacheKey = new Request(_request.url);
        const cache = caches.default;

        // if(url.pathname.includes('ws.mjs') || url.pathname.includes("/live")){
        //   cacheKey = new Request(_request.url+ Date.now());
        // }

        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse && cachedResponse.ok) {
          return cachedResponse;
        }

        const cachedResponse2 = await (async (request) => {
          const cacheKey = new Request(request.url);

          const cache = caches.default;

          // Check whether the value is already available in the cache
          // if not, you will need to fetch it from origin, and store it in the cache
          // for future access
          const cachedResponse = await cache.match(cacheKey);
          if (cachedResponse?.ok) {
            return cachedResponse;
          }

          if (
            path[0].startsWith("npm:") || path[0].startsWith("node_modules/")
          ) {
            const isJs = u.toString().includes(".js") ||
              u.toString().includes(".mjs");

            const packageName = u.toString().replace(
              u.origin + "/npm:",
              "",
            ).replace(
              u.origin + "/node_modules",
              "",
            );
            const searchParams = (isJs
              ? `?bundle&external=${
                esbuildExternal.filter((p) => p !== packageName).join(",")
              } `
              : "");
            const esmUrl = "https://esm.sh/" + packageName + searchParams;

            let resp = await fetch(esmUrl, { ...request, url: esmUrl });

            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(redirectUrl, {
                  ...request,
                  url: redirectUrl,
                });
              }
              if (resp !== null && !resp.ok) {
                return resp;
              }
            }

            const isText = !!resp?.headers?.get("Content-Type")?.includes(
              "charset",
            );
            const bodyStr = await (isText ? resp.text() : null);
            if (!bodyStr) {
              throw new Error("empty body");
            }

            const regex = /https:\/\/esm.sh\//gm;
            const regex2 = / from "\//gm;
            const regex3 = /import "\//gm;

            const regex4 = /from"\//gm;
            const regex5 = /import"\//gm;

            const responseToCache = new Response(
              isText
                ? bodyStr.replaceAll(regex, u.origin + "/npm:/")
                  .replaceAll(regex2, ' from "/npm:/')
                  .replaceAll(regex3, 'import "/npm:/')
                  .replaceAll(regex4, ' from "/npm:/')
                  .replaceAll(regex5, 'import "/npm:/')
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
            if (responseToCache.ok)

            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }

          if (path[0].startsWith("unpkg:")) {
            const esmUrl = u.toString().replace(
              u.origin + "/unpkg:",
              "https://unpkg.com/",
            );

            let resp = await fetch(esmUrl, { ...request, url: esmUrl });

            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(redirectUrl, {
                  ...request,
                  url: redirectUrl,
                });
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
              ` +
                bodyStr
                ? bodyStr.replaceAll(regex, u.origin + "/unpkg:")
                  .replaceAll(regex2, ' from "/unpkg:')
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
            if(responseToCache.ok)
            await cache.put(cacheKey, responseToCache.clone());
            return responseToCache;
          }

          if (path[0].startsWith("node_modules")) {
            const esmUrl = u.toString().replace(
              u.origin + "/node_modules/",
              "https://unpkg.com/",
            );

            let resp = await fetch(esmUrl, { ...request, url: esmUrl });

            if (resp !== null && !resp.ok || resp.status === 307) {
              const redirectUrl = resp.headers.get("location");
              if (redirectUrl) {
                resp = await fetch(
                  new URL(redirectUrl, `https://unpkg.com`).toString(),
                  {
                    ...request,
                    url: redirectUrl,
                  },
                );
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
              ` +
                bodyStr
                ? bodyStr.replaceAll(regex, u.origin + "/node_modules/")
                  .replaceAll(regex2, ' from "/node_modules/')
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
            if (responseToCache.ok)
            await cache.put(cacheKey, responseToCache.clone());
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
              return new Response(ASSET_MANIFEST, {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache",
                },
              });

            case "importmap.json":
              return new Response(getImportMapStr(url.origin), {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache",
                },
              });
            case "api":
              // This is a request for `/api/...`, call the API handler.
              return handleApiRequest(path.slice(1), request, env);

            case "ipns":
            case "ipfs":
              const u = new URL(request.url, "https://cloudflare-ipfs.com");
              const new1 = new URL(u.pathname, "https://cloudflare-ipfs.com");
              const resp = await fetch(new1.toString());
              if (resp.ok) return resp;

              const new2 = new URL(u.pathname, "https://ipfs.io");
              const resp2 = await fetch(new2.toString());
              return resp2;
            case "live":
              const paths = [...path.slice(1)];

              // const newUrl =  new URL(paths.join("/"), url.origin);

              // const assets: typeof assetManifest = {}
              // Object.keys(assetManifest).map(x=>{assets[`/live/${paths[0]}/${x}`]=assetManifest[x]})

              return handleApiRequest(
                  ["room", ...paths, "public"],
                  request,
                  env
              ).catch(() => new Response("Error"));

            default:
              try{
              let kvResp = await getAssetFromKV(
                {
                  request,
                  waitUntil(promise) {
                    return ctx.waitUntil(promise);
                  },
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
                    ASSET_NAMESPACE:env.__STATIC_CONTENT,
                      ASSET_MANIFEST,
                },
              );
              
              if (!kvResp.ok) throw new Error("no kv, try something else")
                return kvResp.clone();
              }catch{
                const resp = await fetch(new URL(url.pathname.slice(1), url.origin +  '/node_modules/').toString())
                if (resp.ok) return resp;

              }
          }
       
        })(_request);
        if (!cachedResponse2) throw new Error("!cached response")

        if(cachedResponse2?.ok) await cache.put(cacheKey, cachedResponse2.clone());

        return cachedResponse2;
      };

      return handleFetchApi(path);
    });
  },
};

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
      return roomObject.fetch(newUrl.toString(), request);
    }

    case "rtc": {
      const room = path[1];
      const user = path[2];

      // return join(room, user, (message: object )=>{

      //   console.log({message})
      // });
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
  const importmapImport: { [k: string]: string } = { ...imap.imports };

  for (const [key, value] of Object.entries(imap.imports)) {
    importmapImport[key] = orig + "/" + value;
  }

  return JSON.stringify({ imports: importmapImport });
};
