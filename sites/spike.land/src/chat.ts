import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
// import {join} from "./rtc.mjs"
// import  {  join } from "@spike.land/code/js/rtc.ts";

// import imap from "@spike.land/code/js/importmap.json";

import { handleErrors } from "./handleErrors";
import { CodeEnv } from "./env";

const imap = {
  "imports": {
    // ...imap,
    "framer-motion": "/framer-motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "react": "/react.mjs",
    "react-dom": "/react.mjs",
    "react-dom/client": "/react.mjs",
    "react-dom/server": "/react.mjs",
    "react/jsx-runtime": "/react.mjs",
    // "preact": "https://ga.jspm.io/npm:preact@10.8.2/dist/preact.module.js",
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
    return handleErrors(request, async () => {
      console.log(`handling request: ${request.url}`);
      // We have received an HTTP request! Parse the URL and route the request.

      const u = new URL(request.url);
      let url = u;

      const accept = request.headers.get("accept");

      const serveJs = !(accept && accept.includes("html"));

      if (
        serveJs && u.pathname.endsWith(".tsx") &&
        !u.pathname.endsWith(".index.tsx")
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
          `<meta http-equiv="refresh" content="0; URL=${
            u.protocol + "//" + u.hostname + ":" + u.port
          }/live/coder/" />`,
          {
            headers: {
              "Location": `${u.protocol}//${u.hostname}:${u.port}/live/coder`,
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no- cache",
            },
          },
        );
      }

      const handleFetchApi = async (path: string[]): Promise<Response> => {
        const newUrl = new URL(path.join("/"), url.origin).toString();
        const _request = new Request(newUrl, { ...request, url: newUrl });

      


        return (async (request) => {

          if(path[0].startsWith("npm:")){

            const url = new URL(newUrl);


            return  fetch(new URL(url.pathname.slice(4), "https://esm.sh"));
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
              return new Response(manifestJSON, {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                  "Cache-Control": "no-cache",
                },
              });
            case "importmap.json":
              return new Response(JSON.stringify(imap), {
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

              return Promise.any([
                handleApiRequest(
                  ["room", ...paths, "public"],
                  request,
                  env,
                ),

                path.length > 2
                  ? handleFetchApi([...path.slice(2)])
                  : Promise.reject(),
              ]).catch(() => new Response("Error"));

            default:
              return getAssetFromKV(
                {
                  request,
                  waitUntil(promise) {
                    return ctx.waitUntil(promise);
                  },
                },
                {
                  // cacheControl: (u.includes("chunk-")? {
                  //   browserTTL:  2 * 60 * 60 * 24,
                  //   edgeTTL: 2 * 60 * 60 * 24,
                  //   bypassCache: false
                  // }: {
                  //   browserTTL: null,
                  //   edgeTTL: null,
                  //   bypassCache: true
                  // }),
                  ASSET_NAMESPACE: env.__STATIC_CONTENT,
                  ASSET_MANIFEST: manifestJSON,
                },
              );
          }
        })(_request);
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

async function getHTMLResp(env: CodeEnv, room: string) {
  const id = env.CODE.idFromName(room);
  const roomObject = env.CODE.get(id);

  return roomObject.fetch("public?room=" + room);
}
