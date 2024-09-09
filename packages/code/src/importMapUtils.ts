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
  // Check if the code has already been processed
  if (code.startsWith("/** importMapReplace */")) {
    return code;
  }

  const importRegex = /^([ \t]*import\s+(?:[\w*{}\n\r\t, ]+)\s+from\s+)["'](.*[@\w_-]+)["']\s*;?\s*(\/\/.*)?\s*$/gm;
  const dynamicImportRegex = /import\((["'`])(.+?)\1\)/g;
  const exportRegex = /^([ \t]*export\s+(?:{\s*[\w\s,]+\s*}\s+from\s+)?)["'](.*[@\w_-]+)["']\s*;?\s*(\/\/.*)?\s*$/gm;

  function replaceImport(match: string, importStatement: string, path: string, inlineComment: string = ""): string {
    let newPath = path;

    if (oo[path]) {
      newPath = `${origin}${oo[path]}`;
    } else if (!path.startsWith("http") && !path.startsWith("./") && !path.startsWith("../")) {
      if (path.startsWith("@/")) {
        newPath = `${origin}/@/${path.slice(2)}`;
      } else {
        newPath = `${origin}/${path}`;
      }
      if (!newPath.includes("?bundle")) {
        newPath += path === "axios" ? "?bundle" : ".mjs";
      }
    } else if (path.startsWith("./") || path.startsWith("../")) {
      newPath = `${origin}/live/${path.replace(/^\.\//, "")}`;
      if (!newPath.endsWith(".js") && !newPath.endsWith(".mjs")) {
        newPath += "/index.js";
      }
    } else {
      return match;
    }

    // Extract specific exports if present
    const exportsMatch = importStatement.match(
      /{\s*([\w\s,]+(?:\s+as\s+[\w]+)?(?:\s*,\s*[\w]+(?:\s+as\s+[\w]+)?)*)\s*}/,
    );
    if (exportsMatch && !oo[path] && !path.startsWith("@/")) {
      const specificExports = exportsMatch[1].replace(/\s+as\s+/g, " as ").trim();
      newPath += newPath.includes("?") ? "&" : "?";
      newPath += `exports=${encodeURIComponent(specificExports)}`;
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
        return `import(${quote}${origin}/@/${path.slice(2)}?bundle${quote})`;
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
        newPath = `${origin}/@/${path.slice(2)}`;
      } else {
        newPath = `${origin}/${path}`;
      }
      newPath += ".mjs";
    } else if (path.startsWith("./") || path.startsWith("../")) {
      newPath = `${origin}/live/${path.replace(/^\.\//, "")}`;
      if (!newPath.endsWith(".js") && !newPath.endsWith(".mjs")) {
        newPath += "/index.js";
      }
    } else {
      return match;
    }

    return `${exportStatement}"${newPath}";${inlineComment ? " " + inlineComment : ""}`;
  }

  code = code.replace(importRegex, replaceImport);
  code = code.replace(dynamicImportRegex, replaceDynamicImport);
  code = code.replace(exportRegex, replaceExport);

  return `/** importMapReplace */\n${code.trim()}`;
}
