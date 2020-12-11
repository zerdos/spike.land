import { arrBuffSha256, sha256 } from "../../code/src/sha256.js";
import { handleOptions, handleTextResponse, handleJsonResponse } from "./utils/handleOptions.ts";
import {v4 } from "./dec.ts"

var SHAKV: KVNamespace;
var USERS: KVNamespace;

var API_KEY: string;


export async function handleCloudRequest(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }
  
  const psk = String(request.headers.get("API_KEY") || "");
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  if (request.method === "GET" && psk && psk === API_KEY) {
    if (pathname === "/keys/") {
      const prefix = searchParams.get("prefix")!;
      const value = await SHAKV.list({ prefix });

      return handleJsonResponse(value);
    }

    if (pathname === "/keys/delete/") {
      const hash = searchParams.get("hash")!;
      const value = await SHAKV.delete(hash)!;

      return handleJsonResponse(value);
    }

  }
  if (request.method === "GET") {
    if (pathname === "/robots.txt") {
      return handleTextResponse("User-agent: * Disallow: /");
    }

    if (pathname === "/connect") {
      const uuid = searchParams.get("uuid") || v4();
      const key = await sha256(uuid);
      await SHAKV.put(
        key,
        JSON.stringify(
          {
            uuid,
            connected: searchParams.get("uuid"),
          },
        ),
        { expirationTtl: 60 },
      );
      return handleJsonResponse({uuid: key});
    }

    if (pathname === "/check") {
      const uuid = searchParams.get("uuid");

      if (uuid === null) return new Response("500");

      const waitForChange = async () => {
        const data = await SHAKV.get<{connected: boolean}>(
          uuid,
          "json",
        );
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data = await SHAKV.get<{connected: boolean}>(
              uuid,
              "json",
            );
            if (!data || data.connected) {
              clearInterval(clear);
              resolve(data);
            }
          }, 1000);
        });
      };

      const data = await waitForChange();

      return handleJsonResponse({ expired: data === null });
    }

    if (pathname === "/register") {
      const uuid = v4();
      await USERS.put(
        uuid,
        JSON.stringify({ uuid, registered: Date.now(), cf: request.cf }),
      );
      return handleJsonResponse({uuid});
    }

    const maybeRoute = pathname.substr(1);
    if (maybeRoute) {
      const jsonStream = await SHAKV.get(maybeRoute, "stream");
      if (jsonStream !== null) {
        return handleTextResponse(jsonStream);
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const myBuffer = await request.arrayBuffer();

    const hash = await arrBuffSha256(myBuffer);

    const smallerKey = hash.substring(0, 8);
    await SHAKV.put(smallerKey, myBuffer);

    return handleJsonResponse({
      hash: smallerKey
    }) 
  }

  return new Response("404");
}