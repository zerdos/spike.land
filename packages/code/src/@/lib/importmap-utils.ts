// src/importMapUtils.ts

export const oo = {
  "/@/": "/@/",
  "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
  "@emotion/react/jsx-dev-runtime": "/emotionJsxRuntime.mjs",
  "@emotion/styled": "/emotionStyled.mjs",
  "react/jsx-runtime": "/jsx.mjs",
  "react-dom/server": "/reactDomServer.mjs",
  "react-dom/client": "/reactDomClient.mjs",
  "@emotion/react": "/emotion.mjs",
  "react": "/reactMod.mjs",
  "framer-motion": "/@/workers/framer-motion.mjs",
  "react-dom": "/reactDom.mjs",
};

export const importMap = { imports: oo };

const externalString =
  "bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled";

export function importMapReplace(code: string, origin: string): string {
  // Return early if the code already contains "importMapReplace" to avoid double processing
  if (code.slice(0, 30).includes("importMapReplace")) {
    return code;
  }

  // Define regex patterns for different types of imports
  const topLevelImportPattern =
    /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const topLevelNoFromPattern = /(?<![."@\w-])import\s*(['"`])(?:(?!\1).)*\1;?/g;
  const topLevelExportPattern =
    /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`])(\))/g;
  const dynamicImportTemplatePattern = /(import\()(`[^`]+`)(\))/g;

  const addExtension = (path: string, ext: string): string => {
    const [basePath, queryAndHash = ''] = path.split(/[?#]/, 2);
    return `${basePath}${ext}${queryAndHash ? `${queryAndHash.startsWith('#') ? '?' : ''}${queryAndHash}` : ''}`;
  };

  const isWorkerImport = (path: string): boolean => {
    return path.includes(".worker");
  };

  const isBareWorkerImport = (match: string): boolean => {
    // Check if it's just "import 'worker'" without any assignments or imports
    const bareImportRegex = /^import\s+(['"`])[^'"`]+\1/;
    return bareImportRegex.test(match.trim());
  };

  // Define a replacer function to modify the import paths
  const replacer = (match: string, p1: string, p2: string, p3char: string) => {
    let isModule = false;
    Object.keys(oo).forEach((pkg) => {
      if (match.includes(`"${pkg}"`)) {
        isModule = true;
      }
    });
    if (isModule) {
      return match;
    }

    const p3 = String(p3char).replace(/[0-9]/g, ""); // Remove numeric characters from p3

    if (typeof p2 !== "string") {
      const hasSemicolon = match.trim().endsWith(";");
      const pkg = match.split('"')[1];
      if (!pkg) return match;

      // Check for worker files
      if ((pkg.startsWith("@/") || pkg.startsWith("/@/")) && isWorkerImport(pkg)) {
        const ext = isBareWorkerImport(match) ? ".js" : ".mjs";
        return `import "${origin}/${pkg}${ext}"` + (hasSemicolon ? ";" : "");
      }
      if (pkg.startsWith("http")) return match;
      if (pkg.startsWith("/")) return match;
      if (pkg.startsWith("./") || pkg.startsWith("../")) {
        const [basePath] = pkg.split(/[?#]/);
        const hasExtension = basePath.split("/").pop()?.includes(".");
        if (!hasExtension) {
          // Handle directory imports
          if (pkg.endsWith("/")) {
            return `import "${pkg}index.mjs"` + (hasSemicolon ? ";" : "");
          }
          return `import "${addExtension(pkg, '.mjs')}"` + (hasSemicolon ? ";" : "");
        }
        return match;
      }
      if (pkg.startsWith(",")) return match;
      return `import "/${pkg}?${externalString}"` + (hasSemicolon ? ";" : "");
    }

    if (p2?.startsWith("`") && p2.endsWith("`")) {
      // This is a template literal, we should keep it as is
      return match;
    }

    const packageName = p2.slice(1, -1); // Remove quotes from package name

    // Preserve data URLs
    if (packageName?.startsWith("data:")) {
      return match;
    }

    // Handle directory imports and existing extensions
    if (packageName?.startsWith("./") || packageName?.startsWith("../")) {
      const [basePath, queryAndHash = ''] = packageName.split(/[?#]/, 2);
      const parts = basePath.split("/");
      const lastPart = parts[parts.length - 1];
      
      // Directory import (ends with /)
      if (basePath.endsWith("/")) {
        return p1 + `"${basePath}index.mjs${queryAndHash ? `${queryAndHash.startsWith('#') ? '?' : ''}${queryAndHash}` : ''}"` + p3;
      }
      
      // Has existing extension
      if (lastPart && /\.(js|mjs|cjs|css|json|svg|wasm|txt)$/.test(lastPart)) {
        return match;
      }
      
      // No extension
      return p1 + `"${addExtension(packageName, '.mjs')}"` + p3;
    }

    if (packageName?.startsWith("/")) {
      return p1 + `"${packageName}"` + p3;
    }

    // Handle worker files
    if (packageName?.startsWith("@/") && isWorkerImport(packageName)) {
      const ext = isBareWorkerImport(match) ? ".js" : ".mjs";
      return p1 + `"${origin}/${packageName}${ext}"` + p3;
    } else if (packageName?.startsWith("@/")) {
      return p1 + `"/${packageName}.mjs"` + p3;
    }

    // Handle URLs with proper fragment handling
    if (packageName?.startsWith("http")) {
      if (!packageName?.startsWith(origin)) {
        try {
          const url = new URL(packageName);
          const hash = url.hash;
          url.hash = ''; // Clear hash temporarily
          
          const [pkgName, exports] = url.pathname.slice(1).split(
            "?bundle=true&exports=",
          );
          
          if (exports) {
            // Properly order query params and hash
            const newUrl = new URL(`${origin}/${pkgName}`, origin);
            newUrl.searchParams.append('bundle', 'true');
            newUrl.searchParams.append('external', 'react,react-dom,framer-motion,@emotion/react,@emotion/styled');
            newUrl.searchParams.append('exports', exports);
            if (hash) {
              newUrl.hash = hash;
            }
            return p1 + `"${newUrl.toString()}"` + p3;
          }
          return match; // Keep external URLs as they are
        } catch {
          return match; // Invalid URL
        }
      }
      return match;
    }

    if (packageName?.startsWith("/live") && !packageName.includes("index.js")) {
      return p1 + `"${packageName}/index.js"` + p3;
    }

    if (packageName.includes(".")) {
      const extension = packageName.split(".").pop()!;
      if (["js", "mjs", "ts", "tsx"].includes(extension)) {
        return p1 + `"${origin}/${packageName}"` + p3;
      }
    }

    // Handle specific exports
    if (packageName.includes(`?${externalString}&exports=`)) {
      const [pkgName, exports] = packageName.split(`?${externalString}&exports=`);
      return p1 + `"${origin}/${pkgName}?${externalString}&exports=${exports}"` + p3;
    }

    // Handle clever top-level exports
    const importMatch = match.match(/import\s*{\s*([^}]+)\s*}/);
    if (importMatch) {
      const importedItems = importMatch[1].split(",").map((item) => {
        const [originalName] = item.trim().split(/\s+as\s+/);
        return originalName.trim();
      });
      return p1 + `"${origin}/${packageName}?${externalString}&exports=${importedItems.join(",")}"` + p3;
    }

    return p1 + `"${origin}/${packageName}?${externalString}"` + p3;
  };

  // Convert code to string if it's not already a string
  const str = typeof code === "string"
    ? code
    : new TextDecoder().decode(new Uint8Array(code));

  // Replace import paths using the replacer function
  let replaced = str
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer)
    .replace(dynamicImportTemplatePattern, replacer)
    .replace(topLevelNoFromPattern, replacer);

  replaced = replaced
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !line.startsWith("//"))
    .join("\n");

  return `/** importMapReplace */
${replaced}`;
}

export default importMap;
