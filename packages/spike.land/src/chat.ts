import { handleAnthropicRequest } from "./anthropicHandler";
import Env from "./env";
import { handleMainFetch } from "./mainFetchHandler";
import { handleGPT4Request } from "./openaiHandler";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.url.includes("anthropic")) {
      return handleAnthropicRequest(request, env, ctx);
    }
    if (request.url.includes("openai")) {
      return handleGPT4Request(request, env, ctx);
    }
    if (request.url.includes(('/my-cms/'))){
      return handleCMSIndexRequest(request, env);
    }

    return handleMainFetch(request, env, ctx);
  },
};

async function handleCMSIndexRequest(request: Request, env: Env) {
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
        //404
        return new Response("File not found", { status: 404 });

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