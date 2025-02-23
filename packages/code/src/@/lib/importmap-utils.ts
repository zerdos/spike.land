// src/importMapUtils.ts

import { importMap as defaultImportMap, ImportMap } from "@/lib/import-map";

export const importMap: ImportMap = defaultImportMap


const externalString =
  "bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled";

// Helpers

function addExtension(path: string, ext: string): string {
  const [basePath, queryAndHash = ''] = path.split(/[?#]/, 2);
  return `${basePath}${ext}${queryAndHash ? (queryAndHash.startsWith('#') ? '?' : '') + queryAndHash : ''}`;
}

function isWorkerImport(path: string): boolean {
  return path.includes(".worker");
}

function isBareWorkerImport(importLine: string): boolean {
  const bareImportRegex = /^import\s+(['"`])[^'"`]+\1/;
  return bareImportRegex.test(importLine.trim());
}

function formatQueryAndHash(q: string): string {
  return q ? (q.startsWith('#') ? '?' + q : q) : "";
}

function transformRelativeImport(
  specifier: string,
  prefix: string,
  suffix: string,
  _origin: string
): string | null {
  const [basePath, queryAndHash = ''] = specifier.split(/[?#]/, 2);
  if (basePath.endsWith("/")) {
    return prefix + `"${basePath}index.mjs${formatQueryAndHash(queryAndHash)}"` + suffix;
  }
  const lastPart = basePath.split("/").pop() || "";
  if (/\.(js|mjs|cjs|css|json|svg|wasm|txt)$/.test(lastPart)) {
    return null;
  }
  return prefix + `"${addExtension(specifier, '.mjs')}"` + suffix;
}

function transformHttpImport(
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string,
  originalMatch: string
): string {
  if (!packageName.startsWith(origin)) {
    try {
      const url = new URL(packageName);
      const hash = url.hash;
      url.hash = '';
      const path = url.pathname.slice(1);
      const [pkgName, exportsParam] = path.split(`?bundle=true&exports=`);
      if (exportsParam) {
        const newUrl = new URL(`${origin}/${pkgName}`, origin);
        newUrl.searchParams.append('bundle', 'true');
        newUrl.searchParams.append('external', externalString);
        newUrl.searchParams.append('exports', exportsParam);
        if (hash) newUrl.hash = hash;
        return prefix + `"${newUrl.toString()}"` + suffix;
      }
      return originalMatch;
    } catch {
      return originalMatch;
    }
  }
  return originalMatch;
}

function transformWorkerImport(
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string,
  match: string
): string {
  const ext = isBareWorkerImport(match) ? ".js" : ".mjs";
  return prefix + `"${origin}/${packageName}${ext}"` + suffix;
}

function transformAtImport(
  packageName: string,
  prefix: string,
  suffix: string,
  _origin: string
): string {
  return prefix + `"/${packageName}.mjs"` + suffix;
}

function transformGenericImport(
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string,
  importedItems?: string[]
): string {
  if (importedItems) {
    return prefix + `"${origin}/${packageName}?${externalString}&exports=${importedItems.join(",")}"` + suffix;
  }
  return prefix + `"${origin}/${packageName}?${externalString}"` + suffix;
}

function transformExtensionImport(
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string
): string {
  return prefix + `"${origin}/${packageName}"` + suffix;
}

function transformExportsImport(
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string
): string {
  const [pkgName, exportsPart] = packageName.split(`?${externalString}&exports=`);
  return prefix + `"${origin}/${pkgName}?${externalString}&exports=${exportsPart}"` + suffix;
}

function transformCleverExport(
  fullMatch: string,
  packageName: string,
  prefix: string,
  suffix: string,
  origin: string
): string | null {
  const importMatch = fullMatch.match(/import\s*{\s*([^}]+)\s*}/);
  if (importMatch) {
    const importedItems = importMatch[1]
      .split(",")
      .map((item) => item.trim().split(/\s+as\s+/)[0]);
    return prefix + `"${origin}/${packageName}?${externalString}&exports=${importedItems.join(",")}"` + suffix;
  }
  return null;
}

// Main function

export function importMapReplace(code: string, origin: string, impMap: ImportMap = defaultImportMap): string {
  // Avoid double processing
  if (code.slice(0, 30).includes("importMapReplace")) {
    return code;
  }

  // Regex patterns
  const topLevelImportPattern =
    /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const topLevelNoFromPattern = /(?<![."@\w-])import\s*(['"`])(?:(?!\1).)*\1;?/g;
  const topLevelExportPattern =
    /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`])(\))/g;
  const dynamicImportTemplatePattern = /(import\()(`[^`]+`)(\))/g;

  // The replacer closes over origin
  function replacer(match: string, p1: string, p2: string, p3char: string): string {
    // Do not touch already-mapped modules
    for (const pkg of Object.keys(impMap.imports)) {
      if (match.includes(`"${pkg}"`)) {
        return match;
      }
    }
    const suffix = String(p3char).replace(/[0-9]/g, "");

    // Handle bare imports (without a second capture group)
    if (typeof p2 !== "string") {
      const hasSemicolon = match.trim().endsWith(";");
      const pkg = match.split('"')[1];
      if (!pkg) return match;
      if ((pkg.startsWith("@/") || pkg.startsWith("/@/")) && isWorkerImport(pkg)) {
        return `import "${origin}/${pkg}${isBareWorkerImport(match) ? ".js" : ".mjs"}"` + (hasSemicolon ? ";" : "");
      }
      if (pkg.startsWith("http")) return match;
      if (pkg.startsWith("/")) return match;
      if (pkg.startsWith("./") || pkg.startsWith("../")) {
        const [basePath] = pkg.split(/[?#]/);
        const hasExtension = basePath.split("/").pop()?.includes(".");
        if (!hasExtension) {
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

    // For standard imports with a quoted specifier
    if (p2.startsWith("`") && p2.endsWith("`")) {
      return match;
    }
    const packageName = p2.slice(1, -1);

    if (packageName.startsWith("data:")) return match;

    if (packageName.startsWith("./") || packageName.startsWith("../")) {
      const transformed = transformRelativeImport(packageName, p1, suffix, origin);
      return transformed !== null ? transformed : match;
    }

    if (packageName.startsWith("/")) {
      return p1 + `"${packageName}"` + suffix;
    }

    if (packageName.startsWith("@/")) {
      if (isWorkerImport(packageName)) {
        return transformWorkerImport(packageName, p1, suffix, origin, match);
      }
      return transformAtImport(packageName, p1, suffix, origin);
    }

    if (packageName.startsWith("http")) {
      return transformHttpImport(packageName, p1, suffix, origin, match);
    }

    if (packageName.startsWith("/live") && !packageName.includes("index.js")) {
      return p1 + `"${packageName}/index.js"` + suffix;
    }

    if (
      packageName.includes(".") &&
      ((() => {
        const parts = packageName.split(".");
        const ext = parts[parts.length - 1];
        return ["js", "mjs", "ts", "tsx"].includes(ext);
      })())
    ) {
      return transformExtensionImport(packageName, p1, suffix, origin);
    }

    if (packageName.includes(`?${externalString}&exports=`)) {
      return transformExportsImport(packageName, p1, suffix, origin);
    }

    const clever = transformCleverExport(match, packageName, p1, suffix, origin);
    if (clever) return clever;

    return transformGenericImport(packageName, p1, suffix, origin);
  }

  // Convert input to string if needed
  const str =
    typeof code === "string"
      ? code
      : new TextDecoder().decode(new Uint8Array(code));

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

  return `/** importMapReplace */\n${replaced}`;
}

export default importMap;
