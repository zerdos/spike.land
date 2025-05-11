import type { Plugin } from "esbuild-wasm";
import { importMap } from "./importmap-utils.ts";
import { tryCatch } from "./try-catch.ts";

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
        path = origin +
          importMap.imports[args.path as keyof typeof importMap.imports];
      }

      return {
        path,
        namespace: "http-url",
      };
    });

    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let argsPath = args.path;
      Object.keys(importMap.imports).map((pkg) => {
        if (argsPath.startsWith(pkg)) {
          args.path = args.path.replace(
            pkg,
            importMap.imports[pkg as keyof typeof importMap.imports],
          );
        }
      });

      if (
        argsPath.startsWith(origin) &&
        !(argsPath.endsWith(".mjs") || argsPath.endsWith(".js") ||
          argsPath.endsWith(".json") ||
          argsPath.endsWith(".css") || argsPath.endsWith(".tsx") ||
          argsPath.endsWith(".ts"))
      ) {
        argsPath = argsPath + ".mjs";
      }

      if (argsPath === args.path && !args.path.includes(origin)) {
        argsPath = `/*${args.path}?bundle=true&external=react,react/jsx-runtime,framer-motion`;
      }

      const { data: response, error: fetchError } = await tryCatch(fetch(argsPath));
      if (fetchError || !response) {
        console.error(`Failed to fetch ${argsPath}:`, fetchError);
        return { contents: `// Failed to fetch ${argsPath}: ${fetchError}`, loader: "js" };
      }
      if (!response.ok) {
        console.error(`Failed to fetch ${argsPath}: Status ${response.status}`);
        return { contents: `// Failed to fetch ${argsPath}: Status ${response.status}`, loader: "js" };
      }

      const { data: contents, error: textError } = await tryCatch(response.text());
      if (textError || contents === null) {
        console.error(`Failed to read text from ${argsPath}:`, textError);
        return { contents: `// Failed to read text from ${argsPath}: ${textError}`, loader: "js" };
      }

      const contentType = response.headers.get("content-type") || "";

      let loader:
        | "js"
        | "css"
        | "json"
        | "text"
        | "base64"
        | "file"
        | "tsx"
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
        contentType.includes("application/javascript") ||
        args.path.endsWith(".js") || args.path.endsWith(".mjs")
      ) {
        loader = "js";
      } else if (
        contentType.includes("application/json") || args.path.endsWith(".json")
      ) {
        loader = "json";
      } else if (contentType.includes("font/")) {
        loader = "binary";
      } else if (args.path.endsWith(".tsx")) {
        loader = "tsx";
      }

      return { contents, loader };
    });
  },
} as Plugin);

async function processCSS(
  css: string,
  baseURL: string,
  depth = 0,
): Promise<string> {
  if (depth > 5) {
    console.warn("Maximum CSS processing depth reached");
    return css;
  }

  // Handle @import statements
  const importRegex = /@import\s+(?:url\(['"]?(.+?)['"]?\)|['"](.+?)['"])/g;
  let match;
  let processedCss = css;

  while ((match = importRegex.exec(css)) !== null) {
    const importUrl = match[1] || match[2];
    const absoluteUrl = new URL(importUrl, baseURL).toString();

    if (urlCache.has(absoluteUrl)) {
      processedCss = processedCss.replace(match[0], urlCache.get(absoluteUrl)!);
      continue;
    }

    const { data: importResponse, error: fetchCssError } = await tryCatch(fetch(absoluteUrl));
    if (fetchCssError || !importResponse || !importResponse.ok) {
      console.warn(`Failed to fetch imported CSS ${absoluteUrl}:`, fetchCssError || importResponse?.status);
      continue; // Skip this import if fetching fails
    }

    const { data: importedCSSText, error: textCssError } = await tryCatch(importResponse.text());
    if (textCssError || importedCSSText === null) {
      console.warn(`Failed to read text from imported CSS ${absoluteUrl}:`, textCssError);
      continue; // Skip if text reading fails
    }

    const processedImportedCSS = await processCSS(importedCSSText, absoluteUrl, depth + 1);
    urlCache.set(absoluteUrl, processedImportedCSS);
    processedCss = processedCss.replace(match[0], processedImportedCSS);
  }
  css = processedCss; // Update css with processed imports

  // Handle url() references
  const urlRegex = /url\(['"]?(.+?)['"]?\)/g;
  const urlMatches = Array.from(css.matchAll(urlRegex));

  for (const urlMatch of urlMatches) {
    const fullMatch = urlMatch[0];
    const urlPath = urlMatch[1];

    if (urlPath && !urlPath.startsWith("data:")) {
      const absoluteUrl = new URL(urlPath, baseURL).toString();
      if (urlCache.has(absoluteUrl)) {
        css = css.replace(fullMatch, urlCache.get(absoluteUrl)!);
        continue;
      }

      const { data: resourceResponse, error: fetchResourceError } = await tryCatch(fetch(absoluteUrl));
      if (fetchResourceError || !resourceResponse || !resourceResponse.ok) {
        console.warn(`Failed to fetch resource ${absoluteUrl}:`, fetchResourceError || resourceResponse?.status);
        continue; // Skip if fetching fails
      }

      const contentType = resourceResponse.headers.get("content-type") || "";
      let newUrlValue: string;

      if (contentType.includes("font/")) {
        const { data: fontContent, error: arrayBufferError } = await tryCatch(resourceResponse.arrayBuffer());
        if (arrayBufferError || !fontContent) {
          console.warn(`Failed to read arrayBuffer for font ${absoluteUrl}:`, arrayBufferError);
          continue;
        }
        const fontType = contentType.split("/").pop();
        newUrlValue = `url("data:font/${fontType};base64,${btoa(String.fromCharCode(...new Uint8Array(fontContent)))}")`;
      } else {
        newUrlValue = `url("${absoluteUrl}")`;
      }
      urlCache.set(absoluteUrl, newUrlValue);
      css = css.replace(fullMatch, newUrlValue);
    }
  }
  return css;
}

//   return css;
// }
