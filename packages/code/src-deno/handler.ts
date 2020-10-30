import { inject } from "./html.js";

const shaStore = SHATEST;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === "GET") {
    const url = new URL(request.url);

    const hash = url.searchParams.get("h");
    // const urlStr = url.toString();

    let starterCode: null | string = null;

    if (hash !== null && hash.length > 5) {
      const json = await shaStore.get(hash);

      if (json !== null) {
        starterCode = JSON.parse(json).code;
      }
    }

    return new Response(inject(hash, starterCode), {
      headers: {
        "content-type": "text/html",
      },
    });
  } else if (request.method === "POST") {
    const data = (await request.json());

    const myBuffer = new TextEncoder().encode(JSON.stringify(data));

    const myDigest = await crypto.subtle.digest(
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
    const smallerKey = hash.substring(0, 7);
    shaStore.put(smallerKey, myBuffer);

    const resp = new Response(`{"hash":"${smallerKey}"}`);

    resp.headers.append("Access-Control-Allow-Origin", "*");
    resp.headers.append(
      "Access-Control-Allow-Methods",
      "GET,HEAD,POST,OPTIONS",
    );
    resp.headers.append("Access-Control-Max-Age", "86400");
    return resp;
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
