import { createWorkflow, serverFetchUrl } from "@spike-land/code";
import { handleAnthropicRequest } from "./anthropicHandler";
import { handleEnhancedFetch } from "./enhancedFetchHandler";
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
      return handleEnhancedFetch(request);
    }

    if (request.url.includes("anthropic")) {
      await logger.log(`Request for ${request.url}`);
      return handleAnthropicRequest(request, env, ctx);
    }

    if (request.url.includes("api/logged_in/")) {
      const { verifyToken } = await import("@clerk/backend");

      const verifyReqJWT = async (req: Request) => {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
          throw new Error("No token provided");
        }

        const options = {}; // Declare the 'options' variable
        const { payload, error } = await verifyToken(token, options);

        if (error) {
          throw new Error("Invalid token");
        }

        return payload;
      };

      const payload = await verifyReqJWT(request);
      return new Response(JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      });
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

    if (request.url.includes("/langChain/")) {
      const searchParams = new URLSearchParams(request.url);
      const q = searchParams.get("q")!;

      const answer: string = await createWorkflow(q);

      return new Response(answer, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    if (request.url.includes("/api/my-turn")) {
      async function generateTURNCredentials() {
        const url =
          "https://rtc.live.cloudflare.com/v1/turn/keys/88ad1e0d43c4cf72414a8541fccd52a0/credentials/generate";

        const headers = {
          "Authorization": "Bearer " + env["CF_REAL_TURN_TOKEN"],
          "Content-Type": "application/json",
        };

        const body = JSON.stringify({
          ttl: 86400,
        });

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Error generating TURN credentials:", error);
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
          : key.endsWith("css")
          ? "text/css; charset=UTF-8"
          : key.endsWith("html")
          ? "text/html; charset=UTF-8"
          : key.endsWith("json")
          ? "application/json; charset=UTF-8"
          : key.endsWith("ttf")
          ? "font/ttf"
          : key.endsWith("woff")
          ? "font/woff"
          : key.endsWith("woff2")
          ? "font/woff2"
          : key.endsWith("eot")
          ? "font/eot"
          : key.endsWith("otf")
          ? "font/otf"
          : key.endsWith("svg")
          ? "image/svg+xml"
          : "text/html; charset=UTF-8",
      );
      return new Response(object.body, { headers });
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}
