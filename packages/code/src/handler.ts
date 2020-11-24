var OLD_SHATEST: KVNamespace;
var API_KEY: string;

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://zed.vision",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export async function handleCloudRequest(request: Request): Promise<Response> {
  if (request.method === "GET") {
    const url = new URL(request.url);

    if (request.url.includes("?h")) {
      const hash = url.searchParams.get("h");
      if (hash !== null) {
        const jsonStream = await OLD_SHATEST.get(hash, "stream");
        if (jsonStream !== null) {
          return new Response(jsonStream, {
            headers: {
              ...corsHeaders,
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }
      }
    }

    if (request.url.includes("?r")) {
      const hash = url.searchParams.get("r");
      if (hash !== null) {
        const jsonStream = await OLD_SHATEST.get(hash, "stream");
        if (jsonStream !== null) {
          return new Response(jsonStream, {
            headers: {
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }
      }
    }

    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const psk = request.headers.get("API_KEY");

    if (psk) {
      if (psk !== API_KEY) {
        return new Response("Sorry, you have supplied an invalid key.", {
          status: 403,
        });
      }

      const value = await OLD_SHATEST.list({ limit: 100 });

      return new Response("NOT implemented yet." + JSON.stringify(value.keys), {
        status: 404,
      });
    }

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
    await OLD_SHATEST.put(smallerKey, myBuffer);

    return new Response(JSON.stringify({ hash: smallerKey }), {
      headers: {
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
