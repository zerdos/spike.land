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
    returnStr = replaceAll(returnStr, ` from "${lib}"`, ` from "${uri}"`);
    returnStr = replaceAll(returnStr, ` from "./`, ` from "${origin}/live/`);
    returnStr = replaceAll(returnStr, ` from "/`, ` from "${origin}/`);
  });

  console.log("importmapReplace fn");
  returnStr = returnStr.split(";").map((x) => x.trim()).map((x) => {
    if (x.startsWith("import") && x.indexOf(`"https://`) === -1) {
      return x.replace(`"`, `"${origin}/npm:/*`);
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
function replaceAll(input: string, search: string, replace: string) {
  return input.split(search).join(replace);
}
