import type { Plugin } from "esbuild-wasm";
import { Loader } from "esbuild-wasm";
import { esmTransform } from "./esbuildEsm";
// import { readFile } from "./fs";
import { importMapReplace } from "./importMapReplace";

// let fetchCache: Cache = {
//   match: (req: Request) =>
//     caches.open("fetchCache").then((fc) => {
//       fetchCache = fc;
//       return fc.match(req);
//     }),
// } as unknown as Cache;

// const codeSpace = location.pathname.slice(1).split("/")[1];
// import type * as esbuild from "esbuild-wasm";

export const fetchPlugin: (
  origin: string,
) => Plugin = () => ({
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    // build.onResolve({ filter: /^https?:\/\// }, args => ({
    //   path: args.path,
    //   namespace: "http-url",
    // }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));
    build.onResolve({ filter: /\.ttf*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "ttf",
    }));

    build.onLoad({ filter: /.*/ }, async (args) => {
      // importShim.resolve(args.path, args.importer)

      const req = new Request(args.path);
      let response = await getRequest(req);

      if (args.namespace === "ttf") {
        let contents = await response.arrayBuffer();
        response = new Response(contents, response);

        const z = new Uint8Array(contents, 1, 4);

        return {
          contents: z,
          loader: "dataurl" as Loader,
        };
      }

      const code = await importMapReplace(
        await response.text(),
        origin,
      );

      if (args.path.indexOf(".tsx") !== -1) {
        return {
          contents: await esmTransform(code, origin),
        };
      }

      // let contents = await response.text();
      // response = new Response(contents, response);

      return { contents: code };
    });
  },
});

async function getRequest(req: Request) {
  console.log({ getReq: req });
  // let response = await fetchCache.match(req);
  // if (response) return response;

  let response = await fetch(req);
  if (!response || !response.ok) return response;
  response = new Response(response.body, response);

  // await fetchCache.put(req, response.clone());
  return response;
}
