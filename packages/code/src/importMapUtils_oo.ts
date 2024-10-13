// src/importMapUtils_oo.ts

export const importMap = {
  imports: {
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/server": "/reactDomServer.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "@emotion/react": "/emotion.mjs",
    "react": "/reactMod.mjs",
    "framer-motion": "/motion.mjs",
    "react-dom": "/reactDom.mjs",
    "foo-bar": "/fooBar.mjs",
  },
} as { imports: Record<string, string>; };

export function importMapReplace(
  code: string | ArrayBuffer,
  origin: string,
): string {
  // Return early if the code already contains "importMapReplace" to avoid double processing
  if (
    typeof code === "string" && code.slice(0, 30).includes("importMapReplace")
  ) {
    return code;
  }
  if (code instanceof ArrayBuffer) {
    const view = new Uint8Array(code);
    const prefix = view.slice(0, 30);
    const decoder = new TextDecoder();
    if (decoder.decode(prefix).includes("importMapReplace")) {
      return decoder.decode(code);
    }
  }

  // Convert code to string if it's not already a string
  const codeStr = typeof code === "string"
    ? code
    : new TextDecoder().decode(new Uint8Array(code));

  // Define regex patterns for different types of imports
  const importPatterns = [
    {
      // Static imports
      pattern: /(import\s*(?:[\w{},*\s]+)\s*from\s*)(['"`][^'"`]+['"`])/g,
      processor: processStaticImport,
    },
    {
      // Dynamic imports
      pattern: /(import\()\s*(['"`][^'"`]+['"`])\s*(\))/g,
      processor: processDynamicImport,
    },
    {
      // Export from
      pattern: /(export\s*(?:[\w{},*\s]+)\s*from\s*)(['"`][^'"`]+['"`])/g,
      processor: processExportFrom,
    },
    {
      // Import without from
      pattern: /(?<![."@\w-])(import\s*)(['"`][^'"`]+['"`])/g,
      processor: processBareImport,
    },
  ];

  let replacedCode = codeStr;

  for (const { pattern, processor } of importPatterns) {
    replacedCode = replacedCode.replace(
      pattern,
      (...args: [string, ...string[]]) => {
        const relevantArgs = args.slice(0, -2);
        relevantArgs.push(origin);
        return processor(
          relevantArgs[0],
          relevantArgs[1],
          relevantArgs[2],
          relevantArgs[3],
        );
      },
    );
  }

  // Remove comments and trim lines
  replacedCode = replacedCode
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !line.startsWith("//"))
    .join("\n");

  // Replace specific package paths based on the import map
  Object.entries(importMap.imports).forEach(([pkg, path]) => {
    const fullPath = `${origin}${path}`;
    const escapedPkg = pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`"${escapedPkg}"`, "g");
    replacedCode = replacedCode.replace(regex, `"${fullPath}"`);
  });

  return `
/** importMapReplace${!origin ? new Date().toISOString() : ""} */\n${replacedCode}`;
}

function resolveModuleSpecifier(
  moduleName: string,
  origin: string,
  importedItems?: string,
): string {
  if (moduleName in importMap.imports) {
    return `${origin}${importMap.imports[moduleName]}`;
  }

  // Handle external URLs
  if (moduleName.startsWith("http")) {
    if (!moduleName.startsWith(origin)) {
      const url = new URL(moduleName);
      const queryParams = url.searchParams;
      if (queryParams.get("bundle") === "true" && queryParams.has("exports")) {
        const pkgName = url.pathname.slice(1); // Remove leading '/'
        const exports = queryParams.get("exports");
        return `${origin}/*${pkgName}?bundle=true&exports=${exports}`;
      }
      return moduleName; // Keep external URLs as they are
    }
  }

  // Do not change relative paths
  if (moduleName.startsWith(".") || moduleName.startsWith("/")) {
    return moduleName;
  }

  // Handle data URIs
  if (moduleName.startsWith("data:text")) {
    return `${moduleName}/index.js`;
  }

  // Handle specific origin-based paths
  if (
    moduleName.startsWith(`${origin}/live`) && !moduleName.includes("index.js")
  ) {
    return `${moduleName}/index.js`;
  }

  if (moduleName.startsWith("./") && !moduleName.slice(2).includes(".")) {
    return `${origin}/live/${moduleName.slice(2)}/index.js`;
  }

  if (moduleName.startsWith("/live")) {
    return `${origin}${moduleName}/index.js`;
  }

  if (moduleName.startsWith("@/")) {
    return `${origin}/${moduleName}.mjs`;
  }

  // Handle file extensions
  const extension = moduleName.split(".").pop()!;
  if (["js", "mjs", "ts", "tsx"].includes(extension)) {
    return `${origin}/${moduleName}`;
  }

  // Handle specific exports
  if (importedItems) {
    return `${origin}/*${moduleName}?bundle=true&exports=${importedItems}`;
  }

  // Default case
  return `${origin}/*${moduleName}?bundle`;
}

function processStaticImport(
  p1: string,
  p2: string,
  origin: string,
): string {
  const moduleName = p2.slice(1, -1);

  // Extract imported items
  const importItemsMatch = p1.match(/import\s*{\s*([^}]+)\s*}/);
  let importedItems = "";

  if (importItemsMatch) {
    importedItems = importItemsMatch[1]
      .split(",")
      .map((item) => item.trim().split(/\s+as\s+/)[0].trim())
      .join(",");
  }

  const newModuleSpecifier = resolveModuleSpecifier(
    moduleName,
    origin,
    importedItems,
  );
  return `${p1}"${newModuleSpecifier}"`;
}

function processDynamicImport(
  p1: string,
  p2: string,
  p3: string,
  origin: string,
): string {
  const moduleName = p2.slice(1, -1);
  const newModuleSpecifier = resolveModuleSpecifier(moduleName, origin);
  return `${p1}"${newModuleSpecifier}"${p3}`;
}

function processExportFrom(
  p1: string,
  p2: string,
  origin: string,
): string {
  const moduleName = p2.slice(1, -1);

  // Extract exported items
  const exportItemsMatch = p1.match(/export\s*{\s*([^}]+)\s*}/);
  let exportedItems = "";

  if (exportItemsMatch) {
    exportedItems = exportItemsMatch[1]
      .split(",")
      .map((item) => item.trim().split(/\s+as\s+/)[0].trim())
      .join(",");
  }

  const newModuleSpecifier = resolveModuleSpecifier(
    moduleName,
    origin,
    exportedItems,
  );
  return `${p1}"${newModuleSpecifier}"`;
}

function processBareImport(
  p1: string,
  p2: string,
  origin: string,
): string {
  const moduleName = p2.slice(1, -1);
  const newModuleSpecifier = resolveModuleSpecifier(moduleName, origin);
  return `${p1}"${newModuleSpecifier}"`;
}

export default importMap;
