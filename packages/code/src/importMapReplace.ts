import { oo } from "./importMap";
// import type { PackageJson } from 'type-fest'

// const debts: {
//   [pkg: string]: Promise<{ packageName: string; entry: string }>;
// } = {};
export function importMapReplace(code: string, origin: string): string {
  const topLevelImportPattern =
    /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const topLevelExportPattern =
    /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`])(\))/g;

  const replacer = (match: string, p1: string, p2: string, p3: string) => {
    const packageName = p2.slice(1, -1); // Remove quotes

    if (packageName.startsWith(origin + "/live") && packageName.indexOf("index.js") === -1) {
      // Ignore relative and absolute URLs

      return p1 + "\"" + `${packageName}/index.js` + "\"" + String(p3).replace(/[0-9]/g, "");
    }

    if (packageName.startsWith(".") || packageName.startsWith("http")) {
      // Ignore relative and absolute URLs

      return match;
    }

    if (packageName.startsWith("/live")) {
      // Ignore relative and absolute URLs

      return p1 + "\"" + `${origin}${packageName}/index.js` + "\"" + String(p3).replace(/[0-9]/g, "");
    }

    return p1 + "\"" + `${origin}/*${packageName}?bundle` + "\"" + String(p3).replace(/[0-9]/g, "");
  };

  let str = code;
  if (typeof code !== "string") {
    const arr = new Uint8Array(code);
    str = new TextDecoder().decode(arr);
  }

  // Apply all replacements
  let replaced = str
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer);

  // Apply custom mappings
  Object.keys(oo).forEach((pkg) => {
    replaced = replaced.split(`${origin}/*${pkg}?bundle`).join(origin + oo[pkg as keyof typeof oo]);
  });

  return replaced;
}
