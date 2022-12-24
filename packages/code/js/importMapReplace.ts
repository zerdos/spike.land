// import { skipImportmapReplaceNames } from "./esbuildEsm";
import imap from "./importmap.json";

const importMapImports = imap.imports;
export function importMapReplace(
  codeInp: string,
  origin: string,
  relativeUrl: string,
  importmapRep = true,
) {
  // if (skipImportmapReplaceNames) {
  //   return codeInp;
  // }

  let returnStr = replaceAll(codeInp, `from"`, `from "`);

  const items = Object.keys(
    importMapImports,
  ) as (keyof typeof importMapImports)[];

  items.map((lib: keyof typeof importMapImports) => {
    const uri = (new URL(importMapImports[lib], origin)).toString();
    if (importmapRep) {
      returnStr = replaceAll(returnStr, ` from "${lib}"`, ` from "${uri}"`);
    }
    returnStr = replaceAll(returnStr, ` from "/`, ` from "${origin}/`);
  });

  returnStr.split("/::").join(origin);
  if (!returnStr) return returnStr;
  const url = relativeUrl || origin;
  const baSe = (new URL(".", url)).toString();
  const parent = (new URL("..", url)).toString();
  const gParent = (new URL("../..", url)).toString();
  const ggParent = (new URL("../../..", url)).toString();

  // returnStr = replaceAll(returnStr, `from"`, `from "}`);
  returnStr = replaceAll(
    returnStr,
    `reference path="./`,
    `reference path="${baSe}`,
  );
  returnStr = replaceAll(returnStr, `import"`, `import "`);

  returnStr = replaceAll(returnStr, ` from "../../../`, ` from "${ggParent}`);
  returnStr = replaceAll(
    returnStr,
    `import("../../../`,
    ` import("${ggParent}`,
  );
  returnStr = replaceAll(returnStr, `import("../../`, ` import("${gParent}`);
  returnStr = replaceAll(returnStr, `import("../`, ` import("${parent}`);
  returnStr = replaceAll(returnStr, `import("./`, ` import("${baSe}`);
  returnStr = replaceAll(
    returnStr,
    `import "../../../`,
    ` import "${ggParent}`,
  );
  returnStr = replaceAll(returnStr, `import "../../`, ` import "${gParent}`);
  returnStr = replaceAll(returnStr, `import "../`, ` import "${parent}`);
  returnStr = replaceAll(returnStr, `import "./`, ` import "${baSe}`);
  returnStr = replaceAll(returnStr, ` from "../../`, ` from "${gParent}`);
  returnStr = replaceAll(returnStr, ` from "../`, ` from "${parent}`);
  returnStr = replaceAll(returnStr, ` from "./`, ` from "${baSe}`);

  let oldUrl: URL;
  returnStr = returnStr.split(";").map((x) => x.indexOf("import") !== -1 ? x.trim() : x).map((Y) =>
    Y.split("\n").map((x) => {
      if (x.length === 0 || x.indexOf("import") === -1) return x;
      if (
        x.startsWith("import") && x.indexOf(`"`) !== -1
        && x.indexOf(`https://`) === -1 && x.indexOf(origin) === -1
      ) {
        const slices = x.split(`"`);
        slices[1] = origin + "/" + slices[1] + "?dev&format=es2022";
        return slices.join(`"`);
      }
      if (
        x.indexOf("/node_process.js") !== -1
        || x.indexOf("/node_buffer.js") !== -1
        || x.indexOf("@babel/runtime") !== -1
      ) {
        const slices = x.split(`"`);
        try {
          oldUrl = new URL(slices[1]);
          slices[1] = origin + "/npm:" + oldUrl.pathname;
        } catch {
          console.error("URL ERR", slices[1]);
        }

        return slices.join(`"`);
      }
      if (
        x.indexOf("/npm:/") === -1 && x.startsWith("import")
        && x.indexOf(origin) === -1
      ) {
        const slices = x.split(`"`);
        try {
          oldUrl = new URL(slices[1]);
          if (oldUrl && oldUrl.pathname.indexOf(".") === -1) {
            slices[1] += `/index.js"`;
          }
        } catch {
          console.error("URL ERR", slices[1]);
        }

        return slices.join(`"`);
      }
      return x;
    }).join("\n")
  ).join(";");

  returnStr = returnStr.split("/npm:/npm:").join("/npm:");

  return returnStr;
}
function replaceAll(inp: string, search: string, replace: string) {
  if (!inp) return inp;
  return inp.split(search).join(replace);
}
