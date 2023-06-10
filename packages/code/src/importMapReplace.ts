import { oo } from "./importMap"

self.impTest = code => console.log(importMapReplace(code));

export function importMapReplace(code: string): string {
  const topLevelImportPattern = /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  
  // Matches top-level exports: export ... from "package"
  const topLevelExportPattern = /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  
  // Matches dynamic imports: import("package")
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`]\))/g;

  // Replace function for all patterns
  const replacer = (match: string, p1: string, p2: string) => {
    const packageName = p2.slice(1, -1); // Remove quotes
    if (packageName.startsWith('.') || packageName.startsWith('http')) {
      // Ignore relative and absolute URLs
      return match;
    }
    if (packageName.startsWith('/')) {
      // Ignore relative and absolute URLs
      return `${p1}'origin${packageName}'`;
    }
    return `${p1}'origin/*${packageName}?bundle'`;
  };

  // Apply all replacements
  code = code
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer);


  // Apply custom mappings
  Object.keys(oo).forEach((pkg) => {
    code = code.split(`origin/*${pkg}?bundle`).join(oo[pkg]);
  });

  return code;
}
