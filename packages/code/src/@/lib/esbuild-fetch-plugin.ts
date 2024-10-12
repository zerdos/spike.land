import { importMap } from "@/lib/importmap-utils";
import type { Plugin } from "esbuild-wasm";

const urlCache = new Map<string, string>();

// import { oo } from "./importMap";
// import { enhancedFetch } from "./enhancedFetch.ts";
// import { enhancedFetch } from "./enhancedFetch.ts";

export const fetchPlugin = (origin: string) => ({
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => {
      let path = new URL(args.path, args.importer).toString();

      if (importMap.imports[args.path as keyof typeof importMap.imports]) {
        path = origin
          + importMap.imports[args.path as keyof typeof importMap.imports];
      }

      return {
        path,
        namespace: "http-url",
      };
    });

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.

    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let argsPath = args.path;
      Object.keys(importMap.imports).map((pkg) => {
        if (argsPath.startsWith(pkg)) {
          args.path = args.path.replace(pkg, importMap.imports[pkg as keyof typeof importMap.imports]);
        }
      });

      if (
        argsPath.startsWith(origin)
        && !(argsPath.endsWith(".mjs") || argsPath.endsWith(".js") || argsPath.endsWith(".json")
          || argsPath.endsWith(".css") || argsPath.endsWith(".tsx") || argsPath.endsWith(".ts"))
      ) {
        argsPath = argsPath + ".mjs";
      }

      if (argsPath === args.path) {
        argsPath = `${origin}/*${args.path}?bundle=true&external=react,react/jsx-runtime,framer-motion`;
      }

      const response = await fetch(argsPath);
      const contents = await response.text();

      const contentType = response.headers.get("content-type") || "";

      let loader:
        | "js"
        | "css"
        | "json"
        | "text"
        | "base64"
        | "file"
        | "dataurl"
        | "binary"
        | "woff"
        | "woff2"
        | "ttf"
        | "eot"
        | "otf"
        | "default" = "text";

      if (contentType.includes("text/css") || args.path.endsWith(".css")) {
        loader = "css";

        // Process @import statements in CSS
        return { contents: await processCSS(contents, args.path), loader };
      } else if (
        contentType.includes("application/javascript")
        || args.path.endsWith(".js") || args.path.endsWith(".mjs")
      ) {
        loader = "js";
      } else if (
        contentType.includes("application/json") || args.path.endsWith(".json")
      ) {
        loader = "json";
      } else if (contentType.includes("font/")) {
        loader = "binary";
      }

      return { contents, loader };
    });
  },
} as Plugin);

async function processCSS(
  css: string,
  baseURL: string,
  depth: number = 0,
): Promise<string> {
  if (depth > 5) {
    console.warn("Maximum CSS processing depth reached");
    return css;
  }

  try {
    // Handle @import statements
    const importRegex = /@import\s+(?:url\(['"]?(.+?)['"]?\)|['"](.+?)['"])/g;
    const imports = Array.from(css.matchAll(importRegex));

    const processedImports = await Promise.all(imports.map(async (match) => {
      const importUrl = match[1] || match[2];
      const absoluteUrl = new URL(importUrl, baseURL).toString();

      if (urlCache.has(absoluteUrl)) {
        return urlCache.get(absoluteUrl);
      }

      const importedCSS = await fetch(absoluteUrl).then((res) => res.text());
      const processedImportedCSS = await processCSS(
        importedCSS,
        absoluteUrl,
        depth + 1,
      );
      urlCache.set(absoluteUrl, processedImportedCSS);
      return processedImportedCSS;
    }));

    css = css.replace(importRegex, () => processedImports.shift() || "");

    // Handle url() references
    const urlRegex = /url\(['"]?(.+?)['"]?\)/g;
    const matches = css.match(urlRegex);

    if (matches) {
      const urlPromises = matches.map(async (match) => {
        const url = match.match(/url\(['"]?(.+?)['"]?\)/)?.[1];
        if (url && !url.startsWith("data:")) {
          const absoluteUrl = new URL(url, baseURL).toString();

          if (urlCache.has(absoluteUrl)) {
            return { match, newValue: urlCache.get(absoluteUrl)! };
          }

          const req = await fetch(absoluteUrl);
          const contentType = req.headers.get("content-type") || "";

          let newUrlValue: string;
          if (contentType.includes("font/")) {
            const content = await req.arrayBuffer();
            const fontType = contentType.split("/").pop();
            newUrlValue = `url("data:font/${fontType};base64,${
              btoa(String.fromCharCode(...new Uint8Array(content)))
            }")`;
          } else {
            newUrlValue = `url("${absoluteUrl}")`;
          }

          urlCache.set(absoluteUrl, newUrlValue);
          return { match, newValue: newUrlValue };
        }
        return { match, newValue: match };
      });

      const results = await Promise.all(urlPromises);
      results.forEach(({ match, newValue }) => {
        css = css.replace(match, newValue);
      });
    }

    return css;
  } catch (error) {
    console.error("Error processing CSS:", error);
    return css; // Return original CSS if processing fails
  }
}

//   return css;
// }
