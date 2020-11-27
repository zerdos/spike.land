var SHATEST: KVNamespace;
var API_KEY: string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://zed.vision",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export async function handleCloudRequest(request: Request): Promise<Response> {
  const psk = String(request.headers.get("API_KEY") || "");
  const url = new URL(request.url);

  if (request.method === "GET" && psk && psk === API_KEY) {
    const { searchParams, pathname } = url;
    if (pathname === "/keys/") {
      const prefix = searchParams.get("prefix")!;
      const value = await SHATEST.list({ prefix });

      return new Response(JSON.stringify(value), {
        headers: {
          ...corsHeaders,
          "content-type": "application/json;charset=UTF-8",
        },
      });
    }

    if (pathname === "/keys/delete/") {
      const hash = searchParams.get("hash")!;
      const value = await SHATEST.delete(hash)!;

      return new Response(JSON.stringify(value), {
        headers: {
          ...corsHeaders,
          "content-type": "application/json;charset=UTF-8",
        },
      });
    }

    // if (loginHash) {
    //   await SHATEST.put("LOGIN", loginHash);
    // }

    // return new Response(JSON.stringify(value), {
    //   headers: {
    //     ...corsHeaders,
    //     "content-type": "application/json;charset=UTF-8",
    //   },
    // });
  }
  if (request.method === "GET") {
    const hash = url.searchParams.get("h")!;
    const pageHash = url.searchParams.get("r");

    if (hash) {
      const jsonStream = await SHATEST.get(hash, "stream")!;
      if (jsonStream === null) {
        return new Response(
          JSON.stringify({
            error: "Not found",
          }),
          {
            headers: {
              ...corsHeaders,
              "content-type": "application/json;charset=UTF-8",
            },
          },
        );
      }

      return new Response(jsonStream, {
        headers: {
          ...corsHeaders,
          "content-type": "application/json;charset=UTF-8",
        },
      });
    }

    if (pageHash) {
      const jsonStream = await SHATEST.get(pageHash, "stream");
      if (jsonStream !== null) {
        return new Response(jsonStream, {
          headers: {
            ...corsHeaders,
            "Content-Type": "text/html; charset=UTF-8",
          },
        });
      }
    }

    const maybeRoute = url.pathname.substr(1);
    if (maybeRoute) {
      const jsonStream = await SHATEST.get(maybeRoute, "stream");
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

    const myDigest = await crypto!.subtle.digest(
      {
        name: "SHA-256",
      },
      myBuffer,
    );

    const hashArray = Array.from(new Uint8Array(myDigest));

    // convert bytes to hex string
    const hash = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
      "",
    );
    const smallerKey = hash.substring(0, 8);
    await SHATEST.put(smallerKey, myBuffer);

    return new Response(JSON.stringify({ hash: smallerKey }), {
      headers: {
        ...corsHeaders,
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }

  return handleOptions(request);
}

function handleOptions(request: Request): Response {
  const headers = request.headers;

  let respHeaders = {
    ...headers,
    ...corsHeaders,
    "Access-Control-Allow-Headers": request.headers.get(
      "Access-Control-Request-Headers",
    ),
  };

  return new Response(request.body, {
    headers: respHeaders as any,
  });
}
