import { build, transpile } from "@spike-land/code/src/transpile";
import wasmModule from "esbuild-wasm/esbuild.wasm";

Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

const initAndTransform = (code: string, origin: string) => transpile(code, origin, wasmModule);

const handleGetRequest = async (codeSpace: string, origin: string) => {
  try {
    const results = await build({
      codeSpace,
      origin,
      format: "esm",
      splitting: false,
      external: ["/*"],
      wasmModule,
    });

    if (!results) {
      return new Response("No results", { status: 404 });
    }

    if (typeof results === "string") {
      return new Response(results, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/javascript",
          "cache-control": "no-cache",
        },
      });
    }

    if (!Array.isArray(results)) {
      const error = results.error as Error;
      return new Response(error.message || "unknown error in results", { status: 404 });
    }

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head profile="http://www.w3.org/2005/10/profile">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, interactive-widget=resizes-content">
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
      <base href="/">
      <title>CodeSpace archive for ${codeSpace} </title>
      <style>
  ${results.find((result) => result.path.endsWith(".css"))?.text}
      </style>
    </head>
    <body>
      <div id="embed"></div>
      <script type="module">
  ${results.find((result) => result.path.endsWith(".mjs"))?.text}
      </script>
    </body>
    </html>`

    return new Response(html, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "text/html",
        "cache-control": "no-cache",
      },
    });
  } catch (e) {
    const error = e as Error;
    return new Response(error.message, { status: 500 });
  }
};

const handlePostRequest = async (request: Request) => {
  const respText = await initAndTransform(
    await request.text(),
    request.headers.get("TR_ORIGIN") as string,
  );

  if (typeof respText === "string") {
    return new Response(respText, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const error = respText.error as Error;
  return new Response(error.message || "Unknown error", { status: 500 });
};

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const params = url.searchParams;
    const codeSpace = params.get("codeSpace") || "empty";
    const codeEnv = params.get("origin");
    const origin = codeEnv === "testing"
      ? "https://testing.spike.land"
      : "https://spike.land";

    if (request.method === "GET") {
      return handleGetRequest(codeSpace, origin);
    }

    if (request.method === "POST") {
      return handlePostRequest(request);
    }

    return new Response("Method not allowed. Try POST or GET.", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  },
};
