import { arrBuffSha256, sha256 } from "../../code/src/sha256.js";
import { KVNamespace, v4 } from "./dec.ts";

var SHAKV: KVNamespace;
var USERS: KVNamespace;
var API_KEY: string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://zed.vision",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export async function handleCloudRequest(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    // Handle CORS preflight requests
    return handleOptions(request);
  }
  
  const psk = String(request.headers.get("API_KEY") || "");
  const url = new URL(request.url);
  const { searchParams, pathname } = url;

  if (request.method === "GET" && psk && psk === API_KEY) {
    if (pathname === "/keys/") {
      const prefix = searchParams.get("prefix")!;
      const value = await SHAKV.list({ prefix });

      return new Response(JSON.stringify(value), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    }

    if (pathname === "/keys/delete/") {
      const hash = searchParams.get("hash")!;
      const value = await SHAKV.delete(hash)!;

      return new Response(JSON.stringify(value), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    }

    // if (loginHash) {
    //   await SHAKV.put("LOGIN", loginHash);
    // }

    // return new Response(JSON.stringify(value), {
    //   headers: {
    //     ...corsHeaders,
    //     "Content-Type": "application/json;charset=UTF-8",
    //   },
    // });
  }
  if (request.method === "GET") {
    const hash = searchParams.get("h");

    if (pathname === "/robots.txt") {
      return new Response("User-agent: * Disallow: /", {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html;charset=UTF-8",
        },
      });
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
      return new Response(
        JSON.stringify({
          uuid: key,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
    }

    if (pathname === "/check") {
      const uuid = searchParams.get("uuid");

      const waitForChange = async () => {
        const data = await SHAKV.get(
          uuid,
          "json",
        );
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data = await SHAKV.get(
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

      return new Response(
        JSON.stringify({ expired: data === null }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
    }

    if (pathname === "/register") {
      const uuid = v4();
      await USERS.put(
        uuid,
        JSON.stringify({ uuid, registered: Date.now(), cf: request.cf }),
      );
      return new Response(
        JSON.stringify({
          uuid,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
    }

    if (hash) {
      const jsonStream = await SHAKV.get(hash, "stream")!;
      if (jsonStream === null) {
        return new Response(
          JSON.stringify({
            error: "Not found",
          }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json;charset=UTF-8",
            },
          },
        );
      }

      return new Response(jsonStream, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    }

    const pageHash = url.searchParams.get("r");
    if (pageHash) {
      const jsonStream = await SHAKV.get(pageHash, "stream");
      if (jsonStream !== null) {
        return new Response(jsonStream, {
          headers: {
            ...corsHeaders,
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      }
    }

    const maybeRoute = pathname.substr(1);
    if (maybeRoute) {
      const jsonStream = await SHAKV.get(maybeRoute, "stream");
      if (jsonStream !== null) {
        return new Response(jsonStream, {
          headers: {
            ...corsHeaders,
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const myBuffer = await request.arrayBuffer();

    const hash = await arrBuffSha256(myBuffer);

    const smallerKey = hash.substring(0, 8);
    await SHAKV.put(smallerKey, myBuffer);

    return new Response(JSON.stringify({ hash: smallerKey }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }

  return new Response("404");
}

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ){
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    const respHeaders = {
      ...corsHeaders,
    // Allow all future content Request headers to go back to browser
    // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")!,
    }

    return new Response(null, {
      headers: respHeaders,
    })
  }
  else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    })
  }
}