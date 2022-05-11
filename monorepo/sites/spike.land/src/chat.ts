import {  getAssetFromKV } from '@cloudflare/kv-asset-handler'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'
const assetManifest = JSON.parse(manifestJSON)



import { handleErrors } from "./handleErrors";
import { CodeEnv } from "./env";

export default {
  async fetch(request: Request, env: CodeEnv, ctx) {
    return handleErrors(request, async () => {

      console.log("handling request");
      // We have received an HTTP request! Parse the URL and route the request.

      const u = new URL(request.url);
      let url = u;

      const accept = request.headers.get('accept');

      const serveJs = !(accept && accept.includes("html"));


      if (serveJs && u.pathname.endsWith(".tsx") && !u.pathname.endsWith(".index.tsx")) url=new URL(request.url.replace(".tsx","/index.tsx"));
      else if (u.pathname.endsWith(".js") && !u.pathname.endsWith(".index.js")) url=new URL(request.url.replace(".js","/index.js"));

      if (serveJs && !url.pathname.includes(".")) url = new URL(request.url+"/index.js");

      const path = url.pathname.slice(1).split("/");

      if (!path[0]) {
        // Serve our HTML at the root path.
        return new Response(`<http><head>
        <meta http-equiv="refresh" content="0; URL=https://spike.land/live/coder" />
      </head></http>`, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            "Cache-Control": "no-cache",
          },
        });
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
            return new Response(JSON.stringify({env, accept}), {
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
        case "api":
          // This is a request for `/api/...`, call the API handler.
          return handleApiRequest(path.slice(1), request, env);

        case "live":
          const newPath = [ 'room', ...path.slice(1), 'public'];
          return handleApiRequest(newPath, request, env);

        default:
          return getAssetFromKV(
            {
              request,
              waitUntil(promise) {
                return ctx.waitUntil(promise)
              },
            }
            // },
            // {
            //   ASSET_NAMESPACE: env.__STATIC_CONTENT,
            //   ASSET_MANIFEST: assetManifest
            // },
          )
      }
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
      roomObject.room = name;
      return roomObject.fetch(newUrl.toString(), request);
    }

    default:
      return new Response("Not found", { status: 404 });
  }
}

async function getHTMLResp(env: CodeEnv, room: string) {
  const id = env.CODE.idFromName(room);
  const roomObject = env.CODE.get(id);

  return roomObject.fetch("public?room="+room);
}
