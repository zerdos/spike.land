import type Env from "./env";
import { makeResponse } from "./makeResponse";

interface ResponseLike {
  text: () => Promise<string>;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

export async function handleEsmRequest(
  _path: string[],
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  const url = new URL(request.url);

  try {
    const key = url.pathname + url.search;

    const response = await env.R2.get(key);

    if (response) {
      const responseLike: ResponseLike = {
        text: () => response.text(),
        arrayBuffer: () => response.arrayBuffer(),
      };
      const headers = makeResponse(response, key).headers;
      return esmResponse(responseLike, url, headers);
    }

    const esmWorker = (await import("./esm.worker")).default;
    const resp = await esmWorker.fetch(request, env, ctx);

    if (!resp.ok) {
      return resp;
    }

    const arrayBuffer = await resp.arrayBuffer();

    // Cache responses in R2 with correct metadata
    const headerEntries: Array<[string, string]> = [];
    resp.headers.forEach((value, key) => headerEntries.push([key, value]));

    ctx.waitUntil(env.R2.put(key, arrayBuffer, {
      httpMetadata: Object.fromEntries(headerEntries),
    }));

    const responseLike: ResponseLike = {
      text: () => Promise.resolve(new TextDecoder("utf-8").decode(arrayBuffer)),
      arrayBuffer: () => Promise.resolve(arrayBuffer),
    };

    const headers = makeResponse(undefined, key).headers;
    return await esmResponse(responseLike, url, headers);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in handleEsmRequest: ${error.message}`);
      return new Response(`Internal Server Error: ${error.message}`, {
        status: 500,
      });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function esmResponse(
  { arrayBuffer, text }: ResponseLike,
  url: URL,
  headersInit?: HeadersInit,
) {
  const { pathname } = url;
  const headers = new Headers(headersInit);

  const contentType = headers.get("Content-Type") || "";
  const isText = contentType.includes("utf-8") ||
    contentType.startsWith("text/");
  const isJavascript = pathname.endsWith(".js") || pathname.endsWith(".mjs") ||
    contentType.includes("javascript");

  let respBody: string | ArrayBuffer;

  try {
    if (isJavascript) {
      // Read as text and apply import map replacement
      const textContent = await text();
      respBody = textContent;
    } else if (isText) {
      // Read as text
      respBody = await text();
    } else {
      // Read as ArrayBuffer
      respBody = await arrayBuffer();
    }
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Error processing response: ${error.message}`, {
        status: 500,
      });
    } else {
      return new Response("Error processing response", { status: 500 });
    }
  }

  // Check for specific error patterns in JavaScript content
  if (
    typeof respBody === "string" && respBody.includes(`/* esm.sh - error */`)
  ) {
    return new Response("O-o, error :(( " + respBody, { status: 500 });
  }

  return new Response(respBody, { headers });
}
