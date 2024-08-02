import wasmModule from "esbuild-wasm/esbuild.wasm";
import { build, transpile } from "../../code/src/transpile";

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
    const codeSpace = params.get("codeSpace");

    const origin = params.get("origin");

    if (request.method === "GET") {
      try {
        const text = await build({
          codeSpace,
          origin: origin
            ? `https://${origin}.spike.land`
            : "https://spike.land",
          wasmModule,
        });

        return new Response(
          text,
        ),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Content-Type": "application/javascript",
              "cache-control": "no-cache",
            },
          };
      } catch (e) {
        return new Response(`500 ${e}`);
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
