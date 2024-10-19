import { importMapReplace } from "@spike-npm-land/code";
import type Env from "./env";

interface ResponseLike {
    text: () => Promise<string>;
    arrayBuffer: () => Promise<ArrayBuffer>;
  }
  
export  async function handleEsmRequest(
    path: string[],
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ) {
    const url = new URL(request.url);
  
    try {
      // Attempt to retrieve the resource from R2 storage
      const response = await env.R2.get(url.pathname);
      if (response) {
        const responseLike: ResponseLike = {
          text: () => response.text(),
          arrayBuffer: () => response.arrayBuffer(),
        };
        const headers = makeHeaders(response, url.pathname);
        return await esmResponse(responseLike, url, headers);
      }
  
      // If not found in R2, fetch via esm.worker
      const esmWorker = (await import("./esm.worker")).default;
      const resp = await esmWorker.fetch(request, env, ctx);
  
      // If the response is not OK, return it as is
      if (!resp.ok) {
        return resp;
      }
  
      // Read the response body once
      const arrayBuffer = await resp.arrayBuffer();
  
      // Cache JavaScript responses in R2
      const contentType = resp.headers.get("Content-Type") || '';
      if (contentType.includes("javascript")) {
        ctx.waitUntil(env.R2.put(url.pathname, arrayBuffer));
      }
  
      // Create ResponseLike from the arrayBuffer
      const responseLike: ResponseLike = {
        text: () => Promise.resolve(new TextDecoder("utf-8").decode(arrayBuffer)),
        arrayBuffer: () => Promise.resolve(arrayBuffer),
      };
  
      const headers = new Headers(resp.headers);
  
      return await esmResponse(responseLike, url, headers);
    } catch (error) {
      // Handle any unexpected errors
      if (error instanceof Error) {
        return new Response(`Internal Server Error: ${error.message}`, { status: 500 });
        }
        else {
        return new Response("Internal Server Error", { status: 500 });
      }
    }
  }
  
  async function esmResponse(
    { arrayBuffer, text }: ResponseLike,
    url: URL,
    headersInit?: HeadersInit
  ) {
    const { pathname, origin } = url;
    const headers = new Headers(headersInit);
  
    // Ensure Content-Type is set
    if (!headers.has("Content-Type")) {
      const defaultContentType = getContentType(pathname);
      headers.set("Content-Type", defaultContentType);
    }
  
    const contentType = headers.get("Content-Type") || '';
    const isText = contentType.includes("utf-8") || contentType.startsWith("text/");
    const isJavascript = pathname.endsWith(".js") || pathname.endsWith(".mjs") || contentType.includes("javascript");
  
    let respBody: string | ArrayBuffer;
  
    try {
      if (isJavascript) {
        // Read as text and apply import map replacement
        const textContent = await text();
        respBody = importMapReplace(textContent, origin);
      } else if (isText) {
        // Read as text
        respBody = await text();
      } else {
        // Read as ArrayBuffer
        respBody = await arrayBuffer();
      }
    } catch (error) {
        if (error instanceof Error) {
      return new Response(`Error processing response: ${error.message}`, { status: 500 });
        }else {
        return new Response("Error processing response", { status: 500 });
        }
    }
  
    // Check for specific error patterns in JavaScript content
    if (typeof respBody === "string" && respBody.includes(`/* esm.sh - error */`)) {
      return new Response("O-o, error :(( " + respBody, { status: 500 });
    }
  
    return new Response(respBody, { headers });
  }
  
  function makeHeaders(object: R2ObjectBody | undefined, key: string): Headers {
    const headers = new Headers();
  
    if (object && object.writeHttpMetadata) {
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
    }
  
    headers.set("Cache-Control", "public, max-age=31536000");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  
    const contentType = getContentType(key);
    headers.set('Content-Type', contentType);
  
    return headers;
  }
  
  function getContentType(key: string): string {
    const mimeTypes: { [extension: string]: string } = {
      '.js': 'application/javascript; charset=UTF-8',
      '.mjs': 'application/javascript; charset=UTF-8',
      '.css': 'text/css; charset=UTF-8',
      '.html': 'text/html; charset=UTF-8',
      '.json': 'application/json; charset=UTF-8',
      '.ttf': 'font/ttf',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'font/otf',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.wmv': 'video/x-ms-wmv',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.flac': 'audio/flac',
      '.aac': 'audio/aac',
    };
  
    const extension = key.slice(key.lastIndexOf('.')).toLowerCase();
    return mimeTypes[extension] || 'application/octet-stream';
  }