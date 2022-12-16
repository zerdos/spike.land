// import { skipImportmapReplaceNames } from "./esbuildEsm";
import imap from "./importmap.json";

const importMapImports = imap.imports;
export function importMapReplace(codeInp: string, origin: string) {
  // if (skipImportmapReplaceNames) {
  //   return codeInp;
  // }
  const items = Object.keys(
    importMapImports,
  ) as (keyof typeof importMapImports)[];
  let returnStr = codeInp;

  items.map((lib: keyof typeof importMapImports) => {
    const uri = (new URL(importMapImports[lib], origin)).toString();
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      ` from "${uri}"`,
    ).replaceAll(
      ` from "./`,
      ` from "${origin}/live/`,
    ).replaceAll(
      ` from "/`,
      ` from "${origin}/`,
    );
  });

  console.g("importmapReplace fn");
  returnStr = returnStr.split(";\n").map((x) => x.trim()).map((x) => {
    if (x.startsWith("import") && x.indexOf(`"https://`) === -1) {
      return x.replace(` "`, ` "${origin}/npm:/*`);
    }
    if (
      x.indexOf("/npm:/") === -1 && x.startsWith("import")
      && x.indexOf(origin) !== -1
    ) {
      let u = new URL(x.split(`"`)[1]);
      if (u && u.pathname.indexOf(".") === -1) {
        return x.slice(0, -1) + `/index.js"`;
      }
    }
    return x;
  }).join(";\n");

  return returnStr;
}
