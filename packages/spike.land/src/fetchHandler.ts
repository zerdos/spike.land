import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { importMap, importMapReplace} from "@spike-land/code";
import { handleApiRequest } from "./apiHandler";
import Env from "./env";
import { ASSET_HASH, ASSET_MANIFEST, files } from "./staticContent.mjs";
import { handleCORS, isUrlFile } from "./utils";

export const HTML = async (env: Env) =>
(await (await getAssetFromKV(
    {
      request: new Request("/index.html", { headers: { "accept": "text/html" } }),
      async waitUntil(promise) {
        await promise;
      },
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST,
    },
  )).text())

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

  const handlers: Record<string, () => Promise<Response>> = {
    ping: async () => handlePing(),
    websocket: async () => handleWebSocket(request),
    "files.json": async () => handleFilesJson(),
    "assetHash.json": async () => handleFilesJson(false),
    "swVersion.mjs": async () => handleSwVersionResponse(path[0], ASSET_HASH, undefined),
    "node_modules": async () => handleUnpkg(path),
    "swVersion.js": async () => handleSwVersionResponse(path[0], ASSET_HASH, files),
    "importMap.json": async () => handleImportMapJson(),
    "robots.txt": async () => {
      const cont = `
User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
Disallow: /cgi-bin/

# Block access to specific file types
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$

# Allow search engine crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap
Sitemap: ${u.origin}/sitemap.xml
      `;
      return new Response(cont, {
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          "Cache-Control": "no-cache",
          "Content-Encoding": "gzip",
        },
      });
    },
    api: async () => handleApiRequest(path.slice(1), request, env),
    ata: async () => handleApiRequest(path.slice(1), request, env),
    ipns: async () => handleIpfsRequest(request),
    ipfs: async () => handleIpfsRequest(request),
    live: async () => handleLiveRequest(path, request, env),
  };

  const handler = handlers[path[0]];
  return handler
    ? handler()
    : handleDefaultCase(path, request, env, ctx, u, newUrl);
}

function handlePing(): Response {
  return new Response("ping" + Math.random(), {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Content-Encoding": "gzip",
      "Cache-Control": "no-cache",
    },
  });
}

function handleWebSocket(request: Request): Response {
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("expected websocket", { status: 400 });
  }
  const pair = new WebSocketPair();
  (pair[1] as unknown as { accept: () => void }).accept();
  pair[1].addEventListener("open", () => {
    pair[1].send("hello");
  });
  return new Response(null, { status: 101, webSocket: pair[0] });
}

function handleFilesJson(withFiles = true): Response {
  const f = withFiles ? files : [];
  return new Response(JSON.stringify(files), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Content-Encoding": "gzip",
      "Cache-Control": "no-cache"
    },
  });
}

const handleUnpkg = (path: string[]) =>
  fetch(
    new URL(path.slice(1).join("/"), "https://unpkg.com").toString(),
  ) as unknown as Response;

function handleImportMapJson(): Response {
  return new Response(JSON.stringify(importMap), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "no-cache",
      "Content-Encoding": "gzip",
      ASSET_HASH,
    },
  });
}

function handleSwVersionResponse(
  type: string,
  ASSET_HASH: string,
  files: unknown,
) {
  const content = files === undefined
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

async function handleIpfsRequest(request: Request): Promise<Response> {
  const u = new URL(request.url, "https://cloudflare-ipfs.com");
  const new1 = new URL(u.pathname, "https://cloudflare-ipfs.com");
  const resp = await fetch(new1.toString());
  if (!resp.ok) {
    return resp as unknown as Response;
  }

  const new2 = new URL(u.pathname, "https://ipfs.io");
  const resp2 = await fetch(new2.toString());
  return resp2 as unknown as Response;
}

async function handleLiveRequest(path: string[], request: Request, env: Env) {
  const [_, codeSpace, ...remainingPath] = path;

  if (!codeSpace) {
    return new Response("Invalid codeSpace", { status: 400 });
  }

  if (remainingPath[0] === "public") {
    return handlePublicRequest(codeSpace, remainingPath.slice(1), request, env);
  }

  if (request.url.endsWith("index.mjs")) {
    return handleLiveIndexRequest(request, env);
  }

  return handleApiRequest(
    ["room", codeSpace, ...remainingPath],
    request,
    env,
  ).catch((e) =>
    new Response("Error: " + e?.message, {
      status: 500,
      statusText: e?.message,
    })
  );
}

async function handlePublicRequest(
  codeSpace: string,
  path: string[],
  request: Request,
  env: Env,
) {
  const key = `live/${codeSpace}/${path.join("/")}`;

  switch (request.method) {
    case "GET":
      const object = await env.R2.get(key);
      if (!object) {
        return new Response("File not found", { status: 404 });
      }
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
      headers.set("Access-Control-Allow-Origin", "*");
      return new Response(object.body, { headers });

    case "PUT":
      if (!request.body) {
        return new Response("Missing request body", { status: 400 });
      }
      await env.R2.put(key, request.body);
      return new Response(`File ${key} uploaded successfully`, { status: 200 });

    case "DELETE":
      await env.R2.delete(key);
      return new Response(`File ${key} deleted successfully`, { status: 200 });

    default:
      return new Response("Method not allowed", { status: 405 });
  }
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
    const esmCache = await caches.open("esm125");
    const cacheKey = new Request(request.url.toString());

    let response = await esmCache.match(cacheKey);
    if (response) { 
      return response;;
    }

    const esmWorker = (await import("./esm.worker")).default;
  

    const resp = await esmWorker.fetch(request, env, ctx);

    if (!resp.ok) return resp;

    if (resp.headers.get("Content-Type") === "application/json") {
      const text = await resp.text();
      const importMapReplaced = importMapReplace(text, u.origin);
      

      let response2 = new Response(text, { ...resp, headers: new Headers(resp.headers) });

      ctx.waitUntil(esmCache.put(cacheKey, response2.clone()));
  
      return response2;

    }
    


    ctx.waitUntil(esmCache.put(cacheKey, resp.clone()));

    return resp

       
       
    


  }

  const file = newUrl.pathname.slice(0, 7) === ("/assets/")
    ? newUrl.pathname.slice(8)
    : newUrl.pathname.slice(1);

    return new Response("not found :((( ", { status: 404 });
}
