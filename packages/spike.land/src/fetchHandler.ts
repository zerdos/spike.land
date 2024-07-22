import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { importMapReplace, importMap } from "@spike-land/code";
import { handleApiRequest } from "./apiHandler";
import Env from "./env";
import { ASSET_MANIFEST, files, ASSET_HASH } from "./staticContent.mjs";
import { handleCORS } from "./utils";
import { isChunk, isUrlFile } from "./utils";

export async function handleFetchApi(
  path: string[],
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const u = new URL(request.url);
  const newUrl = new URL(path.join("/"), u.origin);

  if (request.method === "OPTIONS") {
    return handleCORS(request);
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
      const pair = new WebSocketPair();
      (pair[1] as unknown as { accept: () => void }).accept();
      pair[1].addEventListener("open", () => {
        pair[1].send("hello");
      });
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
    case "swVersion.mjs":
    case "swVersion.js":
      return handleSwVersionResponse(path[0], ASSET_HASH, files);
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
    case "ata":
      return handleApiRequest(path.slice(1), request, env);
    case "ipns":
    case "ipfs":
      return handleIpfsRequest(request);
    case "live":
      return handleLiveRequest(path, request, env);
    default:
      return handleDefaultCase(path, request, env, ctx, u, newUrl);
  }
}

function handleSwVersionResponse(type: string, ASSET_HASH: string, files: any) {
  const content = type === "swVersion.mjs"
    ? `export const swVersion = "${ASSET_HASH}";`
    : `self.swVersion = "${ASSET_HASH}"; self.files=${JSON.stringify(files)};`;

  return new Response(content, {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache",
      "Content-Encoding": "gzip",
    },
  });
}

async function handleIpfsRequest(request: Request) {
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

async function handleLiveRequest(path: string[], request: Request, env: Env) {
  if (request.url.endsWith("index.mjs")) {
    return handleLiveIndexRequest(request, env);
  }
  const paths = [...path.slice(1)];
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

async function handleLiveIndexRequest(request: Request, env: Env) {
  const key = request.url;
  switch (request.method) {
    case "PUT":
      await env.R2.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
    case "DELETE":
      await env.R2.delete(key);
      return new Response(`DEL ${key} successfully!`);
    case "GET":
      const object = await env.R2.get(key);
      if (!object) {
        const paths = key.split("/").slice(-2).map((p) => p.replace(/\.mjs$/, ".js"));
        return handleApiRequest(["room", ...paths], request, env);
      }
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("Cache-Control", "public, max-age=31536000");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set("Content-Type", "application/javascript; charset=UTF-8");
      return new Response(object.body, { headers });
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}

async function handleDefaultCase(
  path: string[],
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  u: URL,
  newUrl: URL,
) {
  if (!isUrlFile(path.join("/"))) {
    const esmWorker = (await import("./esm.worker")).default;
    const resp = await esmWorker.fetch(request, env, ctx);
    if (!resp.ok) return resp;

    const headers = new Headers(resp.headers);
    if (request.url.indexOf(".wasm") !== -1) {
      headers.append("Content-Type", "application/wasm");
    }

    headers.append("Cross-Origin-Embedder-Policy", "require-corp");
    const contentType = headers.get("Content-type");

    if (
      request.url.indexOf(".wasm") === -1
      && !request.url.endsWith(".map")
      && !request.url.endsWith(".ts")
      && request.url.indexOf(".worker") === -1
      && (contentType && contentType.indexOf("charset"))
    ) {
      try {
        return new Response(
          importMapReplace(await resp.text(), u.origin),
          {
            ...resp,
            headers,
          },
        );
      } catch {
        return new Response(resp.body, { ...resp, headers });
      }
    }
    return new Response(resp.body, { ...resp, headers });
  }

  const file = newUrl.pathname.slice(0, 7) === ("/assets/")
    ? newUrl.pathname.slice(8)
    : newUrl.pathname.slice(1);

  if (files[file]) {
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
      return kvResp;
    }

    const headers = new Headers(kvResp.headers);
    kvResp.headers.forEach((v, k) => headers.append(k, v));
    if (isChunk(request.url)) {
      headers.append(
        "Cache-Control",
        "public, max-age=604800, immutable",
      );
    }
    headers.append("Cross-Origin-Embedder-Policy", "require-corp");
    headers.append("Access-Control-Allow-Origin", "*");

    kvResp = new Response(kvResp.body, { ...kvResp, headers });

    return kvResp;
  }

  return new Response("not found :((( ", { status: 404 });
}
