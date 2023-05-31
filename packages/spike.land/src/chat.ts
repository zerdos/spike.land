import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import type { Request as WRequest } from "@cloudflare/workers-types";
import { importMap } from "../../code/src/importMap";
import { importMapReplace } from "../../code/src/importMapReplace";
import { md5 } from "../../code/src/md5";
import ASSET_HASH from "./dist.shasum";
import { CodeEnv } from "./env";
import { handleErrors } from "./handleErrors";
import { ASSET_MANIFEST, files } from "./staticContent.mjs";

// Helper function to check if a link is a chunk
function isChunk(link: string) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.indexOf("chunk-") !== -1 || chunkRegExp.test(link);
}

// Function to handle API requests
async function handleApiRequest(
  path: string[],
  request: WRequest<unknown, CfProperties<unknown>>,
  env: CodeEnv,
) {
  // Logic for handling API requests
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          const id = env.CODE.newUniqueId();
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
      return roomObject.fetch(new Request(newUrl.toString()));
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}

async function handleFetchApi(
  path: string[],
  request: WRequest,
  env: CodeEnv,
  ctx: ExecutionContext,
): Promise<Response> {
  const u = new URL(request.url);
  const newUrl = new URL(path.join("/"), u.origin);

  const cacheKey = new Request(request.url);
  const cache = await caches.open(ASSET_HASH);

  let response = await cache.match(cacheKey);
  if (response && response.ok && response.status === 200) {
    return response;
  }

  switch (path[0]) {
    case "ping":
      return new Response("ping" + Math.random(), {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Content-Encoding": "gzip",
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
      const pair = new WebSocketPair();
      (pair[1] as unknown as { accept: () => void }).accept();
      return new Response(null, { status: 101, webSocket: pair[0] });
    }
    case "files.json":
      return new Response(JSON.stringify({ ...files, ASSET_HASH }), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Content-Encoding": "gzip",
          "Cache-Control": "no-cache",
          ASSET_HASH,
        },
      });
    case "swVersion.mjs": {
      return new Response(
        `export const swVersion = "${ASSET_HASH}";`,
        {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip",
          },
        },
      );
    }
    case "swVersion.js": {
      return new Response(
        `self.swVersion = "${ASSET_HASH}"; self.files=${JSON.stringify(files)}; `,
        {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip",
          },
        },
      );
    }
    case "importMap.json":
      return new Response(JSON.stringify(importMap), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "no-cache",
          "Content-Encoding": "gzip",
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
      if (!resp.ok) {
        return resp;
      }

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
          request.url,
        );
        response = await cache.match(kvCacheKey);
        if (response && response.ok && response.status === 200) {
          return response;
        }

        let kvResp = await getAssetFromKV(
          {
            request,
            waitUntil(promise) {
              return ctx.waitUntil(promise);
            },
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST,
          },
        );

        if (!kvResp.ok) {
          return new Response(`its a 404: ${await kvResp.text()}`, {
            status: 404,
            statusText: "not found",
          });
        }

        kvResp = new Response(kvResp.body, kvResp);
        const headers = new Headers(kvResp.headers);
        kvResp.headers.forEach((v, k) => headers.append(k, v));
        if (isChunk(request.url)) {
          headers.append(
            "Cache-Control",
            "public, max-age=604800, immutable",
          );
        }
        headers.append("Cross-Origin-Embedder-Policy", "require-corp");
        headers.append("Content-Encoding", "gzip");
        kvResp = new Response(kvResp.body, { ...kvResp, headers });
        if (kvResp && kvResp.ok && kvResp.status === 200) {
          await cache.put(kvCacheKey, kvResp.clone());
        }
        return kvResp;
      }

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

        if (!response.ok) {
          return response;
        }
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
              "Content-Encoding": "gzip",
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
              "Content-Encoding": "gzip",
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
        ).split("esm.sh").join(
          u.host,
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
      await cache.put(cacheKey, response.clone());
      return response;
    }
  }
}

const api: ExportedHandler<CodeEnv> = {};

export default api;

// Function to handle unauthorized requests
function handleUnauthorizedRequest(): Response {
  return new Response(null, { status: 401, statusText: "no robots" });
}

// Function to handle redirect response for empty path
function handleRedirectResponse(url: URL, start: string): Response {
  return new Response(
    `<meta http-equiv="refresh" content="0; URL=${url.origin}/live/${start}" />`,
    {
      status: 307,
      headers: {
        "Location": `${url.origin}/live/${start}`,
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        ASSET_HASH: ASSET_HASH,
      },
    },
  );
}

// Function to handle the main fetch logic
async function handleMainFetch(
  request: WRequest<unknown, CfProperties<unknown>>,
  env: CodeEnv,
  ctx: ExecutionContext,
): Promise<Response> {
  if (
    request.cf && request.cf.asOrganization
    && (request.cf.asOrganization as unknown as string).startsWith("YANDEX")
  ) {
    return handleUnauthorizedRequest();
  }

  const url = new URL(request.url);
  if (url.pathname.endsWith(".d.ts")) {
    const apiurl = new URL(`https://esm.sh${url.pathname}`);

    const response = await fetch(new Request(apiurl, request));
    let body = await response.text();

    // Replace esm.sh with the original origin
    body = body.replace(/esm\.sh/g, url.origin);

    return new Response(body, response);
  }

  return handleErrors(request, async () => {
    console.log(`handling request: ${request.url}`);

    const url = new URL(request.url);
    const path = url.pathname.slice(1).split("/");

    if (!path[0]) {
      const utcSecs = Math.floor(Math.floor(Date.now() / 1000) / 7200);
      console.log({ asOrganization: request.cf?.asOrganization });
      const start = md5(
        ((request.cf?.asOrganization as unknown as string) || "default")
          + utcSecs + `
      and reset every 2 hours
      time`,
      );
      return handleRedirectResponse(url, start);
    }

    return handleFetchApi(path, request, env, ctx);
  });
}

api.fetch = handleMainFetch;
