import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { importMap } from "../../code/src/importMap";
import { importMapReplace } from "../../code/src/importMapReplace";
import { md5 } from "../../code/src/md5";
import { handleAiFetchApi } from "./ai";
import ASSET_HASH from "./dist.shasum";
import Env from "./env";

import { handleErrors } from "./handleErrors";
import { ASSET_MANIFEST, files } from "./staticContent.mjs";
import Anthropic from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources/messages";


// Helper function to check if a link is a chunk
function isChunk(link: string) {
  const chunkRegExp = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return link.indexOf("chunk-") !== -1 || chunkRegExp.test(link);
}

// Function to handle API ChatCompletionRequestMessage
async function handleApiRequest(
  path: string[],
  request: Request,
  env: Env,
) {

  // Logic for handling API requests
  switch (path[0]) {
    case "generate":
    case "chat": {
      return handleAiFetchApi(path, request, env);
    }
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
      if (request.headers.get("Sec-Fetch-Dest") === "script") {
        newUrl.pathname += "/index.js";
      }
      newUrl.searchParams.append("room", name);

      return roomObject.fetch(new Request(newUrl.toString(), request));
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}

function isUrlFile(pathname: string) {
  const url = new URL(`/${pathname}`, "https://example.com").pathname.slice(1);

  const parts = url.split("/");
  const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
  if (!lastSegment || (lastSegment && !lastSegment.includes("."))) {
    return false;
  }

  if (files[url]) return true;

  return false;
}

async function handleFetchApi(
  path: string[],
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const u = new URL(request.url);
  const newUrl = new URL(path.join("/"), u.origin);

  if (request.method === 'OPTIONS') {
    return handleCORS(request);
  }

  // const cacheKey = new Request(request.url);
  // const cache = await caches.open(ASSET_HASH);

  // const response = await cache.match(cacheKey);
  // if (
  //   response && response.ok && !response.bodyUsed && response.status === 200
  // ) {
  //   return response;
  // }

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
      if (request.url.endsWith("index.mjs")) {
        if (request.method === "PUT") {
          const key = request.url;

          await env.R2.put(key, request.body);
          return new Response(`Put ${key} successfully!`);
        }  if (request.method === "DELETE") {
          const key = request.url;

          await env.R2.delete(key);
          return new Response(`DEL ${key} successfully!`);
        } else if (request.method === "GET") {
          const key = request.url;

          const object = await env.R2.get(key);
          if (!object) {
            const paths = [...path.slice(1)].map((p) => p.replace(/\.mjs$/, ".js"));

            return handleApiRequest(
              ["room", ...paths],
              request,
              env,
            );
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set("etag", object.httpEtag);
          headers.set("Cache-Control", "public, max-age=31536000");
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Content-Type", "application/javascript; charset=UTF-8");

          return new Response(object.body, {
            headers,
          });
        }
      }
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
    default:
      {
        if (!isUrlFile(path.join("/"))// || path.includes('.d.ts')
        ) {
          // const paths = [...path.slice(1)];
          // const lastPath = paths.pop() || "";
          // const withVersion = paths.pop()?.split("@")[0];
          // paths.push(withVersion!);

          // const isUnpFile = await fetch(
          //   ["https://unpkg.com", ...path].join("/"),
          // );
          // const isUnpFileDts = await fetch(
          //   ["https://unpkg.com", ...path].join("/") + ".d.ts",
          // );
          // if (isUnpFile.ok) {
          //   return new Response(await isUnpFile.blob(), {
          //     headers: isUnpFile.headers, 
          //   });
          // }
          // if (isUnpFileDts.ok) {
          //   return new Response(await isUnpFileDts.blob(), {
          //     headers: isUnpFileDts.headers,
          //   });
          // }

          // if (lastPath === "index.d.ts") {
          //   try {
          //     const packageJsonReq = await fetch(
          //       ["https://unpkg.com", path.join('/').replace('index.d.ts', 'package.json')].join("/"),
          //     );
          //     if (packageJsonReq.ok) {
          //       const pck = await packageJsonReq.json<{ typings: string; types: string }>();

          //       const types = pck.types || pck.typings;

          //       if(types) {

          //       return new Response(
          //         `
          //               import mod from "${cleanPath([ path[0], ...paths].join('/') + '/' +types)}";
          //                export * from "${cleanPath([ path[0], ...paths].join('/') + '/' +types)}";
          //               export default mod;
          //               `,
          //         {
          //           headers: {
          //             "content-type": "application/javascript; charset=utf-8",
          //             "Cache-Control": "no-cache",
          //             "Content-Encoding": "gzip",
          //           },
          //         },
          //       );
          //     }

            
        
              

          //       const defTyped =await handleMainFetch(new Request( [u.origin,'@types', ...path].join('/')), env,ctx);
          //       if (defTyped.ok) {

          //         const txt = await defTyped.text();
          //         if (!txt.includes('throw new Error')){
          //           return new Response(
          //             `
          //                    import mod from "${['@types', ...path].join('/')}";
          //                    export * from "${['@types', ...path].join('/')}";
          //                   export default mod;
          //                   `,
          //             {
          //               headers: {
          //                 "content-type": "application/javascript; charset=utf-8",
          //                 "Cache-Control": "no-cache",
          //                 "Content-Encoding": "gzip",
          //               },
          //             },
          //           );
          //         }
          //       }



          //     }
            
          //   } catch (e) {
              
          //     console.log(e);
          //   }
          // }

          const esmWorker = (await import ("./esm.worker")).default;
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

          // return esmPackage;

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

          headers.append("Access-Control-Allow-Origin", "*");

          kvResp = new Response(kvResp.body, { ...kvResp, headers });

          return kvResp;
        }

        // const isDTS = u.pathname.endsWith(".d.ts");

        // const packageName = u.toString().split(
        //   u.origin,
        // ).join(
        //   "https://esm.sh",
        // ).split(
        //   "/node_modules",
        // ).join(
        //   "",
        // ).split(
        //   "/npm:",
        // ).join(
        //   "",
        // ).replace("/index.d.ts", "");

        // const esmUrl = packageName;

        // request = new Request(esmUrl, { redirect: "follow" });
        // response = await fetch(request);
        // if (!response.ok) {
        //   request = new Request(
        //     new URL(newUrl.pathname, "https://raw.githubusercontent.com/")
        //       .toString(),
        //   );
        //   response = await fetch(request);

        //   if (!response.ok) {
        //     return response;
        //   }
        // }

        // // if (response.headers.has("location")) {
        // const redirectUrl = response.headers.get("location")
        //   || response.url;

        // // request = new Request(redirectUrl, request);
        // const headers = new Headers(response.headers);
        // headers.set(
        //   "location",
        //   redirectUrl.replace(
        //     "esm.sh/",
        //     u.hostname + "/",
        //   ),
        // );
        // headers.set("Cross-Origin-Embedder-Policy", "require-corp");

        // const xTs = response.headers.get("x-typescript-types") || "NO_DTS";
        // if (isDTS) {
        //   if (xTs === "NO_DTS") {
        //     return new Response(JSON.stringify({ error: "NO_DTS" }), {
        //       headers: {
        //         "Content-Type": "application/json;charset=UTF-8",
        //         "Content-Encoding": "gzip",
        //         "Cache-Control": "no-cache",
        //       },
        //     });
        //   }

        //   const xt = response.headers.get("x-typescript-types");
        //   response = new Response(
        //     `
        //   export * from "${xt}";
        //   export { default } from "${xt}";
        //   `,
        //     {
        //       headers: {
        //         "content-type": "application/javascript; charset=utf-8",
        //         "Content-Encoding": "gzip",
        //         "Cache-Control": "no-cache",
        //       },
        //     },
        //   );
        // }

        // // headers.set(
        // //   "x-dts",
        // //   xTs,
        // // );
        // // headers.delete("x-typescript-types");
        // //   return response;
        // // }
        // const isText = !!response?.headers?.get("Content-Type")?.includes(
        //   "charset",
        // );
        // const bodyStr = isText
        //   ? importMapReplace(
        //     await response.text(),
        //     u.origin,
        //     ASSET_HASH,
        //   ).split("esm.sh").join(
        //     u.host,
        //   )
        //   : await response.blob();

        // response = new Response(
        //   bodyStr,
        //   {
        //     ...response,
        //     status: 200,
        //     headers,
        //   },
        // );
        // await cache.put(cacheKey, response.clone());
        // return response;
      }

      return new Response("not found :((( ", { status: 404 });

      /// done
  }
}

export default {
  async fetch( request: Request,
    env: Env,
    ctx: ExecutionContext) {

if(request.url.includes('anthropic')) {
  handleCORS(request)

          const body = JSON.parse(await readRequestBody(request)) as { messages: MessageParam[] };
      
          const anthropic = new Anthropic({
            apiKey: env.ANTHROPIC_API_KEY
          });
      
 
    // Create a TransformStream to handle streaming data
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    ctx.waitUntil((async () => {
      try {
        const stream = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          temperature: 0,
          messages: body.messages,
          stream: true,
        });

        // Loop over the data as it is streamed and write to the writable
        for await (const part of stream) {
          if (part.type === 'content_block_start' || part.type === 'content_block_delta') {
            writer.write(textEncoder.encode(part.delta?.text || ''));
          }
        }
      } catch (error) {
        console.error("Error:", error);
        writer.write(textEncoder.encode("An error occurred while processing your request."));
      } finally {
        await writer.close();
      }
    })());

    // Send the readable back to the browser
    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
    });
}

    return handleMainFetch(request, env, ctx);
  }
}

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
  
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const { cf } = request as unknown as { cf?: { asOrganization?: string } };
  if (
    cf?.asOrganization?.startsWith("YANDEX")
  ) {
    return handleUnauthorizedRequest();
  }
  
  return handleErrors(request, async () => {
    console.log(`handling request: ${request.url}`);

    const url = new URL(request.url);
    const path = url.pathname.slice(1).split("/");

    if (!path[0]) {
      const utcSecs = Math.floor(Math.floor(Date.now() / 1000) / 7200);
      const { cf } = request as unknown as { cf?: { asOrganization?: string } };

      const start = md5(
        ((cf?.asOrganization) || "default")
          + utcSecs + `
      and reset every 2 hours
      time`,
      );
      return handleRedirectResponse(url, start);
    }

    return handleFetchApi(path, request, env, ctx);
  });
}

// api.fetch = handleMainFetch;


// function cleanPath(path: string) {
//   path = path.replace(/\/{2,}/g, '/');
//   path = path.replace(/\/\.+\/\.+\/+/g, '/');
  
//   return path;
// }
function handleCORS(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check the requested method + headers
    // you can do that here.
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "POST, OPTIONS",
      },
    })
  }
}

async function readRequestBody(request: Request) {
  const contentType = request.headers.get("content-type");
  if (contentType!.includes("application/json")) {
    return JSON.stringify(await request.json());
  } else if (contentType!.includes("application/text")) {
    return request.text();
  } else if (contentType!.includes("text/html")) {
    return request.text();
  } else if (contentType!.includes("form")) {
    const formData = await request.formData();
    const body: { [key: string]: unknown } = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return "a file";
  }
}

