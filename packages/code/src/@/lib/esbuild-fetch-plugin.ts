import type { Loader, Plugin } from "esbuild-wasm"; // Imported Loader
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

      const { data: response, error: fetchError } = await tryCatch(
        fetch(argsPath),
      );
      if (fetchError || !response) {
        console.error(`Failed to fetch ${argsPath}:`, fetchError);
        return {
          contents: `// Failed to fetch ${argsPath}: ${fetchError}`,
          loader: "js",
        };
      }
      if (!response.ok) {
        console.error(`Failed to fetch ${argsPath}: Status ${response.status}`);
        return {
          contents: `// Failed to fetch ${argsPath}: Status ${response.status}`,
          loader: "js",
        };
      }

      const { data: contents, error: textError } = await tryCatch(
        response.text(),
      );
      if (textError || contents === null) {
        console.error(`Failed to read text from ${argsPath}:`, textError);
        return {
          contents: `// Failed to read text from ${argsPath}: ${textError}`,
          loader: "js",
        };
      }

      const contentType = response.headers.get("content-type") || "";

      let loader: Loader = "text"; // Use esbuild.Loader type

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

/**
 * Processes CSS content to handle `@import` statements and `url()` references.
 * This function recursively fetches imported stylesheets and inlines them.
 * It also converts `url()` paths for resources like fonts into absolute URLs or data URLs.
 *
 * @param css The CSS string to process.
 * @param baseURL The base URL used to resolve relative paths found in `@import` or `url()`.
 *                This is typically the URL of the CSS file currently being processed.
 * @param depth The current recursion depth, to prevent infinite loops from circular imports.
 * @returns A Promise that resolves to the processed CSS string.
 */
async function processCSS(
  css: string,
  baseURL: string,
  depth = 0,
): Promise<string> {
  // Safety net to prevent infinite recursion (e.g., if CSS files import each other).
  if (depth > 5) {
    console.warn(
      `Maximum CSS processing depth reached for baseURL: ${baseURL}. Aborting further recursion for this path.`,
    );
    return css; // Return the CSS as-is to avoid crashing.
  }

  // --- Handle @import statements ---
  // Regex to find @import rules, supporting both url(...) and "..." syntaxes.
  const importRegex = /@import\s+(?:url\(['"]?(.+?)['"]?\)|['"](.+?)['"])/g;
  let match;
  let processedCss = css; // Work on a copy to modify during iteration.

  // Loop through all @import matches. Note: `importRegex.exec` advances its internal pointer.
  // We re-assign `css` to `processedCss` inside the loop if we were to re-run exec on the modified string,
  // but here we run exec on the original `css` and replace in `processedCss`.
  while ((match = importRegex.exec(css)) !== null) {
    const importUrlPath = match[1] || match[2]; // Get the path from either url() or "..."
    // Resolve the import path against the baseURL of the current CSS file.
    // This correctly handles relative paths like "../fonts/font.css".
    const absoluteUrl = new URL(importUrlPath, baseURL).toString();

    // Use cache to avoid re-fetching and re-processing the same CSS file.
    if (urlCache.has(absoluteUrl)) {
      processedCss = processedCss.replace(match[0], urlCache.get(absoluteUrl)!);
      continue;
    }

    // Fetch the imported CSS file.
    const { data: importResponse, error: fetchCssError } = await tryCatch(
      fetch(absoluteUrl),
    );
    if (fetchCssError || !importResponse || !importResponse.ok) {
      console.warn(
        `Failed to fetch imported CSS ${absoluteUrl}:`,
        fetchCssError || importResponse?.status,
      );
      // If fetching fails, the original @import rule remains in `processedCss` (or is replaced with an empty string if we chose to).
      // Here, we choose to skip it, effectively removing the problematic @import.
      processedCss = processedCss.replace(
        match[0],
        `/* Failed to load: ${absoluteUrl} */`,
      );
      continue;
    }

    const { data: importedCSSText, error: textCssError } = await tryCatch(
      importResponse.text(),
    );
    if (textCssError || importedCSSText === null) {
      console.warn(
        `Failed to read text from imported CSS ${absoluteUrl}:`,
        textCssError,
      );
      processedCss = processedCss.replace(
        match[0],
        `/* Failed to read: ${absoluteUrl} */`,
      );
      continue;
    }

    // Recursively process the fetched CSS content. The `baseURL` for this recursive
    // call will be `absoluteUrl` of the imported file.
    const processedImportedCSS = await processCSS(
      importedCSSText,
      absoluteUrl,
      depth + 1,
    );
    urlCache.set(absoluteUrl, processedImportedCSS); // Cache the processed result.
    // Replace the original @import rule in `processedCss` with the inlined, processed content.
    processedCss = processedCss.replace(match[0], processedImportedCSS);
  }
  // After all @import statements in the current `css` string are processed,
  // update `css` to the `processedCss` which now contains inlined imports.
  css = processedCss;

  // --- Handle url() references (e.g., for fonts, images) ---
  // Regex to find url(...) paths.
  const urlRegex = /url\(['"]?(.+?)['"]?\)/g;
  // `css.matchAll` is suitable here as we are not modifying `css` string within this loop
  // in a way that would affect subsequent matches' indices on the original string.
  const urlMatches = Array.from(css.matchAll(urlRegex));

  for (const urlMatch of urlMatches) {
    const fullMatchSyntax = urlMatch[0]; // The full "url(...)" string
    const urlPath = urlMatch[1]; // The path inside url()

    // Skip data URLs as they are already self-contained.
    if (urlPath && !urlPath.startsWith("data:")) {
      // Resolve the URL path against the baseURL of the current CSS file.
      const absoluteUrl = new URL(urlPath, baseURL).toString();

      if (urlCache.has(absoluteUrl)) {
        css = css.replace(fullMatchSyntax, urlCache.get(absoluteUrl)!);
        continue;
      }

      const { data: resourceResponse, error: fetchResourceError } = await tryCatch(
        fetch(absoluteUrl),
      );
      if (fetchResourceError || !resourceResponse || !resourceResponse.ok) {
        console.warn(
          `Failed to fetch resource ${absoluteUrl}:`,
          fetchResourceError || resourceResponse?.status,
        );
        // Replace with a comment indicating failure, or leave as is.
        css = css.replace(
          fullMatchSyntax,
          `url("/* Failed to load: ${absoluteUrl} */")`,
        );
        continue;
      }

      const contentType = resourceResponse.headers.get("content-type") || "";
      let newUrlValue: string;

      // If the resource is a font, convert it to a base64 data URL to inline it.
      // This is beneficial for performance by reducing HTTP requests, especially for critical fonts.
      if (contentType.includes("font/")) {
        const { data: fontContent, error: arrayBufferError } = await tryCatch(
          resourceResponse.arrayBuffer(),
        );
        if (arrayBufferError || !fontContent) {
          console.warn(
            `Failed to read arrayBuffer for font ${absoluteUrl}:`,
            arrayBufferError,
          );
          css = css.replace(
            fullMatchSyntax,
            `url("/* Failed to read font: ${absoluteUrl} */")`,
          );
          continue;
        }
        const fontType = contentType.split("/").pop(); // e.g., "woff2", "ttf"
        // Convert ArrayBuffer to base64 string.
        const base64Font = btoa(
          String.fromCharCode(...new Uint8Array(fontContent)),
        );
        newUrlValue = `url("data:font/${fontType};base64,${base64Font}")`;
      } else {
        // For other resources (e.g., images not being inlined), ensure the URL is absolute.
        // In a build process, these might be copied to an assets folder and paths rewritten.
        // Here, we just ensure they are absolute based on their original location.
        newUrlValue = `url("${absoluteUrl}")`;
      }
      urlCache.set(absoluteUrl, newUrlValue); // Cache the new value (data URL or absolute URL).
      css = css.replace(fullMatchSyntax, newUrlValue);
    }
  }
  return css;
}
