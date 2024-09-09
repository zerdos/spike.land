export const oo: { [key: string]: string } = {
  "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
  "react/jsx-runtime": "/jsx.mjs",
  "react-dom/server": "/reactDomServer.mjs",
  "react-dom/client": "/reactDomClient.mjs",
  "@emotion/react": "/emotion.mjs",
  "react": "/reactMod.mjs",
  "framer-motion": "/motion.mjs",
  "react-dom": "/reactDom.mjs",
  "foo-bar": "/fooBar.mjs",
  "recharts": "/recharts.mjs",
};

export const importMap = { imports: oo };

export function importMapReplace(code: string, origin: string): string {
  if (code.startsWith("/** importMapReplace */")) {
    return code;
  }

  const importRegex = /^([ \t]*import\s+(?:[\w*{}\n\r\t, ]+)\s+from\s+)["'](.*[@\w_-]+)["']\s*;?\s*(\/\/.*)?\s*$/gm;
  const dynamicImportRegex = /import\((["'`])(.+?)\1\)/g;
  const exportRegex = /^([ \t]*export\s+(?:{\s*[\w\s,]+\s*}\s+from\s+)?)["'](.*[@\w_-]+)["']\s*;?\s*(\/\/.*)?\s*$/gm;
  const simpleImportRegex = /^([ \t]*import\s*)["'](.*[@\w_-]+)["']\s*;?\s*(\/\/.*)?\s*$/gm;

  function replaceImport(match: string, importStatement: string, path: string, inlineComment: string = ""): string {
    let newPath = path;

    if (oo[path]) {
      newPath = `${origin}${oo[path]}`;
    } else if (path.startsWith(origin)) {
      newPath = path;
    } else if (path.startsWith("/")) {
      newPath = path;
    } else if (!path.startsWith("http") && !path.startsWith("./") && !path.startsWith("../")) {
      if (path.startsWith("@/")) {
        newPath = `${origin}${path}`;
      } else if (path === "d3-time" || path === "react/jsx-runtime" || path === "react") {
        newPath = path;
      } else {
        newPath = `${origin}/*${path}`;
      }
    } else {
      return match;
    }

    const exportsMatch = importStatement.match(
      /{\s*([\w\s,]+(?:\s+as\s+[\w]+)?(?:\s*,\s*[\w]+(?:\s+as\s+[\w]+)?)*)\s*}/,
    );
    if (
      exportsMatch && !oo[path] && !path.startsWith("@/") && !["d3-time", "react/jsx-runtime", "react"].includes(path)
    ) {
      const specificExports = exportsMatch[1].split(",").map(e => e.trim().split(/\s+as\s+/)[0]).join(",");
      newPath += `?bundle=true&exports=${specificExports}`;
    } else if (
      !newPath.includes("?bundle") && !oo[path] && !path.startsWith("@/")
      && !["d3-time", "react/jsx-runtime", "react"].includes(path)
    ) {
      newPath += "?bundle";
    }

    return `${importStatement}"${newPath}";${inlineComment ? " " + inlineComment : ""}`;
  }

  function replaceDynamicImport(match: string, quote: string, path: string): string {
    if (path.includes("${")) {
      return match;
    }
    if (oo[path]) {
      return `import(${quote}${origin}${oo[path]}${quote})`;
    }
    if (!path.startsWith("http") && !path.startsWith("./") && !path.startsWith("../")) {
      if (path.startsWith("@/")) {
        return `import(${quote}${origin}/${path}?bundle${quote})`;
      }
      return `import(${quote}${origin}/${path.includes("*") ? path : "*" + path + "?bundle"}${quote})`;
    }
    return match;
  }

  function replaceExport(match: string, exportStatement: string, path: string, inlineComment: string = ""): string {
    let newPath = path;

    if (oo[path]) {
      newPath = `${origin}${oo[path]}`;
    } else if (!path.startsWith("http") && !path.startsWith("./") && !path.startsWith("../")) {
      if (path.startsWith("@/")) {
        newPath = `${origin}/${path}`;
      } else {
        newPath = `${origin}/*${path}?bundle`;
      }
    } else {
      return match;
    }

    return `${exportStatement}"${newPath}";${inlineComment ? " " + inlineComment : ""}`;
  }

  function replaceSimpleImport(
    match: string,
    importStatement: string,
    path: string,
    inlineComment: string = "",
  ): string {
    if (path === "react/jsx-runtime" || path === "react") {
      return match;
    }
    return replaceImport(match, importStatement, path, inlineComment);
  }

  code = code.replace(importRegex, replaceImport);
  code = code.replace(dynamicImportRegex, replaceDynamicImport);
  code = code.replace(exportRegex, replaceExport);
  code = code.replace(simpleImportRegex, replaceSimpleImport);

  return `/** importMapReplace */\n${code}`;
}
