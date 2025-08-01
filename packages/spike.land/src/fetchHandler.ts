import { importMap } from "@spike-npm-land/code";
import { handleApiRequest } from "./apiHandler";
import type Env from "./env";
import { handleEsmRequest } from "./handleEsmRequest";
import { handleCORS } from "./utils";
export async function handleFetchApi(
  path: string[],
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  if (request.method === "OPTIONS") {
    return handleCORS(request);
  }
  if (path.length === 0 || path[0] === "") {
    const html = "<html><body>Default HTML response</body></html>";
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  const handlers: Record<string, () => Promise<Response>> = {
    ping: async () => handlePing(),
    websocket: async () => handleWebSocket(request),
    "node_modules": async () => handleUnpkg(path),

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
Sitemap: ${new URL(request.url).origin}/sitemap.xml
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

  const firstPath = path[0];
  if (!firstPath) {
    return handleEsmRequest(path, request, env, ctx);
  }
  const handler = handlers[firstPath];
  return handler ? handler() : handleEsmRequest(path, request, env, ctx);
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
  // Check if it's a WebSocket upgrade request
  const upgradeHeader = request.headers.get("Upgrade");
  const connectionHeader = request.headers.get("Connection");

  if (
    upgradeHeader?.toLowerCase() !== "websocket" ||
    connectionHeader?.toLowerCase() !== "upgrade"
  ) {
    return new Response("expected websocket", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const pair = new WebSocketPair();
  const client = pair[1];
  const server = pair[0];

  // Cloudflare Workers specific WebSocket handling
  server.accept();

  // Create a mock Response object with status 200
  const response = new Response(null, {
    status: 200,
    headers: {
      "Upgrade": "websocket",
      "Connection": "Upgrade",
    },
  });

  // Add webSocket property
  Object.defineProperty(response, "webSocket", {
    value: client,
    writable: false,
    enumerable: true,
    configurable: true,
  });

  // Override status to 101 after creation
  Object.defineProperty(response, "status", {
    value: 101,
    writable: false,
    enumerable: true,
    configurable: true,
  });

  return response;
}

const handleUnpkg = (path: string[]): Promise<Response> =>
  fetch(
    path.join("/"),
  );

function handleImportMapJson(): Response {
  return new Response(JSON.stringify(importMap), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
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
    return resp;
  }

  const new2 = new URL(u.pathname, "https://ipfs.io");
  const resp2 = await fetch(new2.toString());
  return resp2;
}

async function handleLiveRequest(path: string[], request: Request, env: Env) {
  const [, codeSpace, ...remainingPath] = path;

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
  ).catch((e: Error) =>
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
    case "GET": {
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
    }
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
    case "GET": {
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
    }
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}
