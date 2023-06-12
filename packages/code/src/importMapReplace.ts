import { oo } from "./importMap";
// import type { PackageJson } from 'type-fest'

// const debts: {
//   [pkg: string]: Promise<{ packageName: string; entry: string }>;
// } = {};
export async function importMapReplace(code: string, origin: string): Promise<string> {
  const topLevelImportPattern = /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const topLevelExportPattern = /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`])(\))/g;

  const replacer = (match: string, p1: string, p2: string, p3: string) => {
    const packageName = p2.slice(1, -1); // Remove quotes
    if (packageName.startsWith(".") || packageName.startsWith("http") || packageName.startsWith("/")) {
      // Ignore relative and absolute URLs
      return match;
    }
    return p1 + "\"" + `${origin}/*${packageName}?bundle` + "\"" + String(p3).replace(/[0-9]/g, "");
  };

  let str = code;
  if (typeof code !== "string") {
    var uint8array = new TextEncoder().encode(code);
    str = new TextDecoder().decode(uint8array);
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

  // const debtEntries = await Promise.all(Object.values(debts));
  // for (const {packageName, entry} of debtEntries) {
  //   if (entry && entry.length) {
  //     replaced = replaced.split(`${origin}/*${packageName}?bundle`).join(`${origin}/*${packageName}/${entry}?bundle`);
  //   }
  // }

  return replaced;
}
