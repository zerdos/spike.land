import type { Plugin } from "esbuild-wasm";
import { esmTransform } from "runner";
// import localForage from "localforage";
import { mST } from "./session";
const fetchCache = await caches.open("fetchcache");
const codeSpace = location.pathname.slice(1).split("/")[1];
// import type * as esbuild from "esbuild-wasm";

export const fetchPlugin: Plugin = {
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
      path: importShim.resolve(args.path, args.importer),
      namespace: "http-url",
    }));
    build.onResolve({ filter: /\.ttf*/, namespace: "http-url" }, (args) => ({
      path: importShim.resolve(args.path, args.importer),
      namespace: "ttf",
    }));

    // build.onResolve({ filter: /^.*/, namespace: "http-url" }, args => ({
    //   path: new URL(args.path, location.origin + "/npm:/").toString(),
    //   namespace: "http-url",
    // }));
    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /.*.tsx.*/ }, async (args) => {
      if (args.path.indexOf("render.tsx") !== -1) {
        const contents = await esmTransform(`
      import {createRoot} from "react-dom/client"
      import { CacheProvider } from "@emotion/react";
      import createCache from "@emotion/cache";
      import { ErrorBoundary } from "react-error-boundary";
      import App from "${location.origin}/live/${codeSpace}/index.tsx/${mST().i}"
      
      document.body.innerHTML = '<div id="root"></div>';

  let rootEl = document.getElementById("root");

  rootEl.innerHTML="";
   
  const root = createRoot(rootEl);
  
    const cache = createCache({
      key: "z",
      container: rootEl,
      speedy: false
    });
  
   cache.compat = undefined;
  
  root.render(<ErrorBoundary
    fallbackRender={({ error }) => (
      <div role="alert">
        <div>Oh no</div>
        <pre>{error.message}</pre>
      </div>
    )}>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
    </ErrorBoundary>);

      `);
        return {
          contents,
        };
      }
    });

    build.onLoad({ filter: /.*/ }, async (args) => {
      // importShim.resolve(args.path, args.importer)

      const getRequest = async (req: Request) => {
        let response = await fetchCache.match(req);
        if (response) return response;

        response = await fetch(req);
        if (!response || !response.ok) return response;
        response = new Response(response.body, response);

        await fetchCache.put(req, response.clone());
        return response;
      };

      const req = new Request(args.path);
      let response = await getRequest(req);

      if (args.namespace === "ttf") {
        let contents = response.blob();

        return {
          contents: contents,
          loader: "dataurl",
        };
      }

      let contents = await response.text();

      return { contents };
    });
  },
};
