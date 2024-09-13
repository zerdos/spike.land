import {  transform,initialize } from "esbuild-wasm";
import wasmFile from "./esbuild.wasm";
import { importMapReplace } from "@spike-land/code/src/@/lib/importmap-utils";


Object.assign(globalThis, {
  performance: {
    now: () => Date.now(),
  },
});

const mod = {
  init: false,
  initialize: async (wasmModule: WebAssembly.Module) => {
    if (mod.init === true) return true;
    await initialize({ wasmModule, worker: false });
    return mod.init = true;
  },
};


const initializeModule = async (wasmModule?: WebAssembly.Module, origin?: string) => {
  if (mod.init) return;

  if (wasmModule) {
    await mod.initialize(wasmModule);
  } else if (origin) {
    await initialize({
      wasmURL: new URL(`${origin}/${wasmFile}`).toString(),
      worker: false,
    });

    mod.init = true;
  } else {
    throw new Error("Either wasmModule or origin must be provided");
  }
};

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
): Promise<string | { error: unknown }> => {
    try {
      await initializeModule(wasmModule, origin);

      try {
        const transformedCode = await transform(code, {
          loader: "tsx",
          format: "esm",
          treeShaking: true,
          platform: "browser",
          minify: false,
          charset: "utf8",
          keepNames: true,
          tsconfigRaw: {
            compilerOptions: {
              jsx: "react-jsx",
              jsxFragmentFactory: "Fragment",
              jsxImportSource: "@emotion/react",
            },
          },
          target: "es2024",
        });

        return importMapReplace(transformedCode.code, origin);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error during transpile:", error.message);
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during transpile:", error.message);
      }
      throw error;
    }
};





// const handleGetRequest = async (codeSpace: string, origin: string) => {
//   try {
//     const results = await build({
//       codeSpace,
//       origin,
//       format: "esm",
//       splitting: false,
//       external: ["/*"],
//       wasmModule: wasmFile,
//     });

//     if (!results) {
//       return new Response("No results", { status: 404 });
//     }

//     if (typeof results === "string") {
//       return new Response(results, {
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           "Content-Type": "application/javascript",
//           "cache-control": "no-cache",
//         },
//       });
//     }

//     return new Response(JSON.stringify(results), {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Content-Type": "application/json",
//         "cache-control": "no-cache",
//       },
//     });
//   } catch (e) {
//     const error = e as Error;
//     return new Response(error.message, { status: 500 });
//   }
// };

const handlePostRequest = async (request: Request) => {
  const respText = await transpile(
    await request.text(),
    request.headers.get("TR_ORIGIN") as string,
  );

  if (typeof respText === "string") {
    return new Response(respText, {
      headers: {
        "content-type": "application/javascript",
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
      // return handleGetRequest(codeSpace, origin);
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


