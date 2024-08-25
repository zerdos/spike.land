import { build, transpile } from "@spike-land/code";
import wasmModule from "esbuild-wasm";

Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

const initAndTransform = (
  code,
  origin,
) => transpile(code, origin, wasmModule);

export default {
  async fetch(request) {
    const params = new URL(request.url).searchParams;
    const codeSpace = params.get("codeSpace") || "empty";

    const codeEnv = params.get("origin");

    const origin = (codeEnv && codeEnv === "testing")
      ? "https://testing.spike.land"
      : "https://spike.land";

    if (request.method === "GET") {
      try {
        const results = await build({
          codeSpace,
          origin,
          format: "esm",
          splitting: true,
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
        // if (results && Object.hasOwn(results, "error")) {
        //   return new Response(results.error, { status: 500 });
        // }

        // check of results is an array:
        if (!Array.isArray(results)) {
          const error = results.error as Error;

          return new Response(error.message || "unknown error in results", {
            status: 404,
          });
        }

        const resText = results.map((result) =>
          "------+--path: "
          + result.path + "\n"
          + result.text
        ).join("\n");

        return new Response(
          resText,
        ),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "text/plain",
              "cache-control": "no-cache",
            },
          };
      } catch (e) {
        return new Response(e.message, { status: 500 });
      }
    }

    if (request.method === "POST") {
      return new Response(
        await initAndTransform(
          await request.text(),
          request.headers.get("TR_ORIGIN"),
        ).catch(() => ""),
        {
          ...request,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        },
      );
    }
    if (request.method === "GET") {
      const params = new URL(request.url).searchParams;
      const { codeSpace, origin } = Object.fromEntries(params.entries());

      if (codeSpace && origin) {
        return new Response(
          await build(
            codeSpace,
            origin,
          ),
        ),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/javascript",
              "cache-control": "no-cache",
            },
          };
      }
      return new Response("404", { status: 404 });
    }
    return new Response("try to POST", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  },
};
