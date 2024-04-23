import { oo } from "./importMap";

export function importMapReplace(code: string, origin: string): string {
  if (code.includes("importMapReplace")) {
    return code;
  }

  const topLevelImportPattern =
    /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const topLevelExportPattern =
    /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`])(\))/g;

  const replacer = (match: string, p1: string, p2: string, p3char: string) => {
    const p3 = String(p3char).replace(/[0-9]/g, "");
    const packageName = p2.slice(1, -1); // Remove quotes

    if (packageName.startsWith(origin + "/live") && !packageName.includes("index.js")) {
      return p1 + "\"" + `${packageName}/index.js` + "\"" + p3;
    }

    if (packageName.startsWith("/")) {
      return p1 + "\"" + `${origin}${packageName}` + "\"" + p3;
    }

    if (packageName.startsWith(".") || packageName.startsWith("http")) {
      if (packageName.startsWith("http") && !packageName.startsWith(origin)) {
        const oldUrl = new URL(packageName);
        const newPackageName = new URL(oldUrl.pathname, origin);
        return p1 + "\"" + newPackageName.toString() + "\"" + p3;
      }
      return match;
    }

    if (packageName.startsWith("/live")) {
      return p1 + "\"" + `${origin}${packageName}/index.js` + "\"" + p3;
    }

    return p1 + "\"" + `${origin}/*${packageName}?bundle` + "\"" + p3;
  };

  const str = typeof code === "string" ? code : new TextDecoder().decode(new Uint8Array(code));

  let replaced = str
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer);

  Object.keys(oo).forEach((pkg) => {
    replaced = replaced.split(`${origin}/*${pkg}?bundle`).join(origin + oo[pkg as keyof typeof oo]);
  });

  return replaced;
}
