const urlCache = new Map<string, string>();

async function processCSS(
  css: string,
  baseURL: string,
  depth = 0,
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
      const importUrl = match[1]! || match[2]!;
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

export default processCSS;
