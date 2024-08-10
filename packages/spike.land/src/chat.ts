import { serverFetchUrl } from "@spike-land/code";
import { handleAnthropicRequest } from "./anthropicHandler";
import Env from "./env";
import { KVLogger } from "./Logs";
import { handleMainFetch } from "./mainFetchHandler";
import { handleGPT4Request } from "./openaiHandler";
import { handleReplicateRequest } from "./replicateHandler";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const logger = new KVLogger("myapp", env.KV);

    env.KV.put("lastRequest", request.url);

    const url = new URL(request.url);
    if (url.pathname === serverFetchUrl) {
      return handleServerFetch(request);
    }

    if (request.url.includes("anthropic")) {
      await logger.log(`Request for ${request.url}`);
      return handleAnthropicRequest(request, env, ctx);
    }
    if (request.url.includes("openai")) {
      await logger.log(`Request for ${request.url}`);
      return handleGPT4Request(request, env, ctx);
    }
    if (request.url.includes("remix")) {
      await logger.log(`Request for ${request.url}`);
      // return handleRemixRequest(request, env, ctx);
    }
    if (request.url.includes("replicate")) {
      await logger.log(`Request for ${request.url}`);
      return handleReplicateRequest(request, env, ctx);
    }

    if (request.url.includes("/my-cms/")) {
      return handleCMSIndexRequest(request, env);
    }

    if (request.url.includes("/api/my-turn")) {
      async function generateTURNCredentials() {
        const url = 'https://rtc.live.cloudflare.com/v1/turn/keys/88ad1e0d43c4cf72414a8541fccd52a0/credentials/generate';
        
        const headers = {
          'Authorization': 'Bearer '+env['CF_REAL_TURN_TOKEN'],
          'Content-Type': 'application/json'
        };
        
        const body = JSON.stringify({
          ttl: 86400
        });
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
          });

        } catch (error) {
          console.error('Error generating TURN credentials:', error);
        }
      }
      
      // Call the function
     return generateTURNCredentials();
    }

    await logger.log(`Request for ${request.url}`);
    return handleMainFetch(request, env, ctx);
  },
};

async function handleCMSIndexRequest(request: Request, env: Env) {
  const key = request.url;
  const url = new URL(request.url);
  const path = url.pathname;
  switch (request.method) {
    case "PUT":
      await env.R2.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
    case "DELETE":
      await env.R2.delete(key);
      return new Response(`DEL ${key} successfully!`);
    case "GET":
      const object = await env.R2.get(url.origin + path);

      if (!object) {
        // 404
        return new Response("File not found", { status: 404 });
      }
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("Cache-Control", "public, max-age=31536000");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cross-Origin-Embedder-Policy", "require-corp");
      headers.set(
        "Content-Type",
        key.endsWith("js")
          ? "application/javascript; charset=UTF-8"
          : "text/html; charset=UTF-8",
      );
      return new Response(object.body, { headers });
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}

async function* streamResponse(
  response: Response,
): AsyncGenerator<Uint8Array, void, unknown> {
  const reader = response.body!.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

const serverResponse = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const serverOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      options: {
        ...options,
        headers: options.headers
          ? Object.fromEntries(new Headers(options.headers))
          : undefined,
      },
    }),
  };

  const req = await fetch(serverFetchUrl, serverOptions);

  if (!req.ok) {
    throw new Error(`Server fetch failed: ${req.status} ${req.statusText}`);
  }

  const { readable, writable } = new TransformStream();
  req.body?.pipeTo(writable);

  return new Response(readable, {
    status: req.status,
    statusText: req.statusText,
    headers: req.headers,
  });
};

export const enhancedFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (response.ok) return response;
    console.log("Client-side fetch failed, trying server-side fetch");
    return serverResponse(url, options);
  } catch (error) {
    console.log("Error occurred, trying server-side fetch", error);
    return serverResponse(url, options);
  }
};

async function handleServerFetch(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { url, options } = await request.json<
      { url: string; options: RequestInit }
    >();
    const response = await fetch(url, options);

    const { readable, writable } = new TransformStream();
    response.body?.pipeTo(writable);

    return new Response(readable, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Server-side fetch failed:", error);
    return new Response("Server-side fetch failed", { status: 500 });
  }
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === serverFetchUrl) {
    return handleServerFetch(request);
  }

  // Use enhancedFetch for all other requests
  return enhancedFetch(request.url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}
