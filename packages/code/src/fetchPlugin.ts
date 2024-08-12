import { Plugin } from "esbuild-wasm";
import { enhancedFetch } from "./enhancedFetch.ts";

export const fetchPlugin = () => ({
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, args => ({
      path: args.path,
      namespace: "http-url",
    }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, args => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.

    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      const response = await fetch(args.path);
      const contents = await response.text();
      const contentType = response.headers.get("content-type") || "";

      let loader: "js" | "css" | "json" | "text" | "base64" | "file" | "dataurl" | "binary" | 'woff' | "woff2" | "ttf" | "eot" | "otf" |  "default" = "text";

      if (contentType.includes("text/css") || args.path.endsWith(".css")) {
        loader = "css";
        // Process @import statements in CSS
        return { contents: await processCSS(contents, args.path), loader };
      } else if (
        contentType.includes("application/javascript") || args.path.endsWith(".js") || args.path.endsWith(".mjs")
      ) {
        loader = "js";
      } else if (contentType.includes("application/json") || args.path.endsWith(".json")) {
        loader = "json";
      } else if (contentType.includes("font/")) {
        loader = "binary";
      }

      return { contents, loader,   };
    });
  },
} as Plugin);

async function processCSS(css: string, baseURL: string): Promise<string> {
  const importRegex = /@import\s+(?:url\(['"]?(.+?)['"]?\)|['"](.+?)['"])/g;
  const imports = Array.from(css.matchAll(importRegex));

  for (const match of imports) {
    const importUrl = match[1] || match[2];
    const absoluteUrl = new URL(importUrl, baseURL).toString();
    const importedCSS = await enhancedFetch(absoluteUrl).then(res => res.text());
    const processedImportedCSS = await processCSS(importedCSS, absoluteUrl);
    css = css.split(match[0]).join(processedImportedCSS);
  }

  // Process url() references
  const urlRegex = /url\(['"]?(.+?)['"]?\)/g;
  const matches = css.match(urlRegex);
  if (matches) {
    for (const match of matches) {
      const url = match.match(/url\(['"]?(.+?)['"]?\)/)?.[1];
      if (url && !url.startsWith("data:")) {
        const absoluteUrl = new URL(url, baseURL).toString();
        const req  = await enhancedFetch(absoluteUrl);
        const contentType = req.headers.get("content-type") || "";
        let content;
         
        if (contentType.includes("font/")) {
          content = await req.arrayBuffer();
          const fontType = contentType.split("/").pop();
          css = css.replace(match, `url("data:font/${fontType};base64,${btoa(String.fromCharCode(...new Uint8Array(content)))}")`);
        } else {
          content = await enhancedFetch(absoluteUrl).then(res => res.text());
          css = css.replace(match, `url("${absoluteUrl}")`);
        }
      }
    }
  }

  return css;
}
