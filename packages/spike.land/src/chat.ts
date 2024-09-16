import {  serverFetchUrl } from "@spike-land/code";
import { handleAnthropicRequest } from "./anthropicHandler";
import { KVLogger } from "./Logs";
import { handleMainFetch } from "./mainFetchHandler";
import { handleGPT4Request } from "./openaiHandler";
import { handleReplicateRequest } from "./replicateHandler";

import Env from "./env";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { serveWithCache } from "@spike-land/code";
import { ASSET_MANIFEST, files } from "./staticContent.mjs";


export default {
 
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

  
    const kvServer = serveWithCache(files, () => caches.open("file-cache-v20"));

    if (kvServer.isAsset(request)) {
      const assetFetcher  = (req: Request, waitUntil:  (p: Promise<unknown>) =>void) => getAssetFromKV(
        { request: req, waitUntil },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST,
        }
      );
      return kvServer.serve(request, assetFetcher, (p: Promise<unknown>) => ctx.waitUntil(p));
    }

    //   "files.json": async () => handleFilesJson(),


    const url = new URL(request.url);

  
    const logger = new KVLogger("myapp", env.KV);

    env.KV.put("lastRequest", request.url);


    if (url.pathname === serverFetchUrl) {

      // export const handleEnhancedFetch = async (request: Request) => {
        // try {
           const optionsParam = await request.json() as RequestInit & { url: string };
       
           // Perform the fetch
           // const res = await fetch(optionsParam.url, optionsParam);
       
           // // Clone the response
           // const response = res.clone();
           // const body = await res.blob();
           return fetch(optionsParam.url, optionsParam) as unknown as Response;
      // return handleEnhancedFetch(request);
    }


    if (request.url.includes("anthropic")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      return handleAnthropicRequest(request, env, ctx);
    }
    if (request.url.includes("ai-logs")) {
     
      function createArray(n: number) {
        return Array.from({ length: n }, (_, index) => index + 1);
      }

      const counter= Number(await env.KV.get("ai:counter"));  

      const logs = createArray(counter).slice(-20).map(async (i) => {
        const log = await env.KV.get(`ai:${i}`);
        if (log !== null) {
        return JSON.parse(log);
      }});
  
      const resolvedLogs = await Promise.all(logs);


      

      return new Response(JSON.stringify(resolvedLogs), {
        headers: {
          "Content-Type": "application/json",
        },
      });
     
    
    
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
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      return handleGPT4Request(request, env, ctx);
    }
    if (request.url.includes("remix")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      // return handleRemixRequest(request, env, ctx);
    }
    if (request.url.includes("replicate")) {
      ctx.waitUntil(logger.log(`Request for ${request.url}`));
      return handleReplicateRequest(request, env, ctx);
    }

    if (request.url.includes("/my-cms/")) {
      return handleCMSIndexRequest(request, env);
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

    // ctx.waitUntil(logger.log(`Request for ${request.url}`));

    // const cache = caches.default;

    // const mightAsset = url.pathname.slice(1);
    // const cacheKey = new Request(new URL(files[mightAsset] || mightAsset, url.origin).toString(), request.clone());
    // const cachedResponse = await cache.match(cacheKey);
    // if (cachedResponse) {
    //   return makeResponse(cachedResponse as any, mightAsset);
    // }
   
    // const resp =await handleMainFetch(request, env, ctx);
    // if (resp && resp.status === 200 && resp.headers.get('cache-control')?.includes('public')) {
    //   ctx.waitUntil(cache.put(cacheKey,  new Response(resp.clone().body, resp)))
    // }

    return handleMainFetch(request, env, ctx);;
  },
};

export async function handleCMSIndexRequest(request: Request, env: Env) {
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
      let object = await env.R2.get(url.origin + path);
      if (!object) {
        object = await env.R2.get(url.origin + path + ".html");
      }

      if (!object) {
        // 404
        return new Response("File not found", { status: 404 });
      }
      return makeResponse(object, key); 
    default:
      return new Response("Method not allowed", { status: 405 });
  }
}


function makeResponse(object: R2ObjectBody, key: string) {

  const headers = new Headers();
  if (object.writeHttpMetadata) object.writeHttpMetadata(headers);

  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  headers.set(
    "Content-Type",
    (key.endsWith("js") || key.endsWith("mjs")) 
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
      : key.endsWith("png")
      ? "image/png"
      : key.endsWith("pdf")
      ? "application/pdf"
      : key.endsWith("gif")
      ? "image/gif"
      : key.endsWith("webp")
      ? "image/webp"
      : key.endsWith("jpg")
      ? "image/jpeg"
      : key.endsWith("jpeg")
      ? "image/jpeg"
      : key.endsWith("svg")
      ? "image/svg+xml"
      : key.endsWith("mp4")
      ? "video/mp4"
      : key.endsWith("webm")
      ? "video/webm"
      : key.endsWith("mov")
      ? "video/quicktime"
      : key.endsWith("avi")
      ? "video/x-msvideo"
      : key.endsWith("wmv")
      ? "video/x-ms-wmv"
      : key.endsWith("mp3")
      ? "audio/mpeg"
      : key.endsWith("wav")
      ? "audio/wav"
      : key.endsWith("ogg")
      ? "audio/ogg"
      : key.endsWith("flac")
      ? "audio/flac"
      : key.endsWith("aac")
      ? "audio/aac"
      : "text/html; charset=UTF-8",
  );
  return new Response(object.body, { headers });
}