// src/importMapUtils.ts

import type { ImportMap } from "@/lib/import-map";
import { importMap as defaultImportMap } from "@/lib/import-map";

export const importMap: ImportMap = defaultImportMap;

// Constants
const EXTERNAL_DEPENDENCIES = [
  "react",
  "react-dom",
  "framer-motion",
  "@emotion/react",
  "@emotion/styled",
];

const EXTERNAL_QUERY = `bundle=true&external=${EXTERNAL_DEPENDENCIES.join(",")}`;

const FILE_EXTENSIONS = {
  KNOWN: /\.(js|mjs|cjs|css|json|svg|wasm|txt)$/,
  WORKER: ".worker",
  MODULE: ".mjs",
  WORKER_BARE: ".js",
};

interface ImportMatch {
  prefix: string;
  packageName: string;
  suffix: string;
  fullMatch: string;
}

// Path manipulation utilities
const PathUtils = {
  splitPathFromQuery(path: string): [string, string] {
    return path.split(/[?#]/, 2) as [string, string];
  },

  formatQueryFragment(query: string): string {
    return query ? (query.startsWith("#") ? "?" + query : query) : "";
  },

  addExtension(path: string, ext: string): string {
    const [basePath, queryAndHash = ""] = PathUtils.splitPathFromQuery(path);
    return `${basePath}${ext}${PathUtils.formatQueryFragment(queryAndHash)}`;
  },

  isDirectory(path: string): boolean {
    return path.endsWith("/");
  },
};

// Import pattern detection
const ImportDetector = {
  isWorkerImport(path: string): boolean {
    return path.includes(FILE_EXTENSIONS.WORKER);
  },

  isBareWorkerImport(importLine: string): boolean {
    const bareImportRegex = /^import\s+(['"`])[^'"`]+\1/;
    return bareImportRegex.test(importLine.trim());
  },

  extractImportedItems(fullMatch: string): string[] | null {
    const importMatch = fullMatch.match(/import\s*{\s*([^}]+)\s*}/);
    if (!importMatch || !importMatch[1]) return null;

    return importMatch[1]
      .split(",")
      .map((item) => item.trim().split(/\s+as\s+/)[0])
      .filter((item): item is string => item !== undefined);
  },

  isAlreadyProcessed(code: string): boolean {
    return code.slice(0, 30).includes("importMapReplace");
  },
};

// Transform functions for different import types
const ImportTransformer = {
  relative(specifier: string, prefix: string, suffix: string): string | null {
    const [basePath, queryAndHash = ""] = PathUtils.splitPathFromQuery(
      specifier,
    );

    if (PathUtils.isDirectory(basePath)) {
      return prefix +
        `"${basePath}index${FILE_EXTENSIONS.MODULE}${
          PathUtils.formatQueryFragment(queryAndHash)
        }"` + suffix;
    }

    const lastPart = basePath.split("/").pop() || "";
    if (FILE_EXTENSIONS.KNOWN.test(lastPart)) {
      return null;
    }

    return prefix +
      `"${PathUtils.addExtension(specifier, FILE_EXTENSIONS.MODULE)}"` + suffix;
  },

  worker(
    packageName: string,
    prefix: string,
    suffix: string,
    origin: string,
    match: string,
  ): string {
    const ext = ImportDetector.isBareWorkerImport(match)
      ? FILE_EXTENSIONS.WORKER_BARE
      : FILE_EXTENSIONS.MODULE;
    return prefix + `"${origin}/${packageName}${ext}"` + suffix;
  },

  http(
    packageName: string,
    prefix: string,
    suffix: string,
    origin: string,
    originalMatch: string,
  ): string {
    if (!packageName.startsWith(origin)) {
      try {
        const url = new URL(packageName);
        const hash = url.hash;
        url.hash = "";
        const path = url.pathname.slice(1);
        const [pkgName, exportsParam] = path.split(`?bundle=true&exports=`);

        if (exportsParam) {
          const newUrl = new URL(`${origin}/${pkgName}`, origin);
          newUrl.searchParams.append("bundle", "true");
          newUrl.searchParams.append(
            "external",
            EXTERNAL_DEPENDENCIES.join(","),
          );
          newUrl.searchParams.append("exports", exportsParam);
          if (hash) newUrl.hash = hash;
          return prefix + `"${newUrl.toString()}"` + suffix;
        }
      } catch {
        // If URL parsing fails, return original
      }
    }
    return originalMatch;
  },

  atPrefix(packageName: string, prefix: string, suffix: string): string {
    return prefix + `"/${packageName}${FILE_EXTENSIONS.MODULE}"` + suffix;
  },

  generic(
    packageName: string,
    prefix: string,
    suffix: string,
    origin: string,
    importedItems?: string[],
  ): string {
    const query = importedItems
      ? `${EXTERNAL_QUERY}&exports=${importedItems.join(",")}`
      : EXTERNAL_QUERY;
    return prefix + `"${origin}/${packageName}?${query}"` + suffix;
  },
};

// Main import processing function
function processImport(
  match: string,
  p1: string,
  p2: string,
  p3char: string,
  origin: string,
  impMap: ImportMap,
): string {
  // Handle imports that are already mapped
  for (const pkg of Object.keys(impMap.imports)) {
    if (match.includes(`"${pkg}"`)) {
      return match;
    }
  }

  // Handle bare imports without a quoted specifier
  if (typeof p2 !== "string") {
    return processBareImport(match, origin);
  }

  const suffix = String(p3char).replace(/[0-9]/g, "");
  if (p2.startsWith("`") && p2.endsWith("`")) {
    return match;
  }

  const packageName = p2.slice(1, -1);
  const importMatch: ImportMatch = {
    prefix: p1,
    packageName,
    suffix,
    fullMatch: match,
  };

  return processPackageImport(importMatch, origin);
}

function processBareImport(match: string, origin: string): string {
  const hasSemicolon = match.trim().endsWith(";");
  const pkg = match.split('"')[1];
  if (!pkg) return match;

  if (
    (pkg.startsWith("@/") || pkg.startsWith("/@/")) &&
    ImportDetector.isWorkerImport(pkg)
  ) {
    return `import "${origin}/${pkg}${
      ImportDetector.isBareWorkerImport(match)
        ? FILE_EXTENSIONS.WORKER_BARE
        : FILE_EXTENSIONS.MODULE
    }"` + (hasSemicolon ? ";" : "");
  }

  if (pkg.startsWith("http") || pkg.startsWith("/") || pkg.startsWith(",")) {
    return match;
  }

  if (pkg.startsWith("./") || pkg.startsWith("../")) {
    return processRelativeBareImport(pkg, hasSemicolon);
  }

  return `import "/${pkg}?${EXTERNAL_QUERY}"` + (hasSemicolon ? ";" : "");
}

function processRelativeBareImport(pkg: string, hasSemicolon: boolean): string {
  const [basePath] = PathUtils.splitPathFromQuery(pkg);
  const hasExtension = basePath.split("/").pop()?.includes(".");

  if (!hasExtension) {
    if (PathUtils.isDirectory(pkg)) {
      return `import "${pkg}index${FILE_EXTENSIONS.MODULE}"` +
        (hasSemicolon ? ";" : "");
    }
    return `import "${PathUtils.addExtension(pkg, FILE_EXTENSIONS.MODULE)}"` +
      (hasSemicolon ? ";" : "");
  }

  return `import "${pkg}"` + (hasSemicolon ? ";" : "");
}

function processPackageImport(
  importMatch: ImportMatch,
  origin: string,
): string {
  const { prefix, packageName, suffix, fullMatch } = importMatch;

  if (packageName.startsWith("data:")) {
    return fullMatch;
  }

  if (packageName.startsWith("./") || packageName.startsWith("../")) {
    const transformed = ImportTransformer.relative(packageName, prefix, suffix);
    return transformed !== null ? transformed : fullMatch;
  }

  if (packageName.startsWith("/")) {
    return prefix + `"${packageName}"` + suffix;
  }

  if (packageName.startsWith("@/")) {
    return ImportDetector.isWorkerImport(packageName)
      ? ImportTransformer.worker(packageName, prefix, suffix, origin, fullMatch)
      : ImportTransformer.atPrefix(packageName, prefix, suffix);
  }

  if (packageName.startsWith("http")) {
    return ImportTransformer.http(
      packageName,
      prefix,
      suffix,
      origin,
      fullMatch,
    );
  }

  if (packageName.startsWith("/live") && !packageName.includes("index.js")) {
    return prefix + `"${packageName}/index.js"` + suffix;
  }

  const importedItems = ImportDetector.extractImportedItems(fullMatch) ||
    undefined;
  return ImportTransformer.generic(
    packageName,
    prefix,
    suffix,
    origin,
    importedItems,
  );
}

// Main export function
export function importMapReplace(
  code: string,
  origin: string,
  impMap: ImportMap = defaultImportMap,
): string {
  if (ImportDetector.isAlreadyProcessed(code)) {
    return code;
  }

  const patterns = {
    topLevelImport:
      /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g,
    topLevelNoFrom: /(?<![."@\w-])import\s*(['"`])(?:(?!\1).)*\1;?/g,
    topLevelExport:
      /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g,
    dynamicImport: /(import\()(['"`][^'`"]+['"`])(\))/g,
    dynamicImportTemplate: /(import\()(`[^`]+`)(\))/g,
  };

  const str = typeof code === "string"
    ? code
    : new TextDecoder().decode(new Uint8Array(code));

  const replaced = [
    [patterns.topLevelImport, str],
    [patterns.topLevelExport],
    [patterns.dynamicImport],
    [patterns.dynamicImportTemplate],
    [patterns.topLevelNoFrom],
  ].reduce(
    (acc, [pattern]) =>
      acc.replace(
        pattern as RegExp,
        (match, p1, p2, p3) => processImport(match, p1, p2, p3, origin, impMap),
      ),
    str,
  );

  const cleanedCode = replaced
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !line.startsWith("//"))
    .join("\n");

  return `/** importMapReplace */\n${cleanedCode}`;
}

export default importMap;
