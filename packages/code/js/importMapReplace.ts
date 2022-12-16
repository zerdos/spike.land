// import { skipImportmapReplaceNames } from "./esbuildEsm";
import imap from "./importmap.json";

const importMapImports = imap.imports;
export function importMapReplace(codeInp: string, origin: string, relativeUrl: string) {
  // if (skipImportmapReplaceNames) {
  //   return codeInp;
  // }

  const items = Object.keys(
    importMapImports,
  ) as (keyof typeof importMapImports)[];
  let returnStr = codeInp;

  const url = relativeUrl || origin;
  const baSe = (new URL(".", url)).toString();
  const parent = (new URL("..", url)).toString();
  const gParent = (new URL("../..", url)).toString();
  const ggParent = (new URL("../../..", url)).toString();

  returnStr = replaceAll(returnStr, `from"`, `from "`);
  returnStr = replaceAll(returnStr, `import"`, `import "`);

  returnStr = replaceAll(returnStr, ` from "../../../`, ` from "${ggParent}`);
  returnStr = replaceAll(returnStr, `import("../../../`, ` import("${ggParent}`);
  returnStr = replaceAll(returnStr, `import("../../`, ` import("${gParent}`);
  returnStr = replaceAll(returnStr, `import("../`, ` import("${parent}`);
  returnStr = replaceAll(returnStr, `import("./`, ` import("${baSe}`);
  returnStr = replaceAll(returnStr, `import "../../../`, ` import "${ggParent}`);
  returnStr = replaceAll(returnStr, `import "../../`, ` import "${gParent}`);
  returnStr = replaceAll(returnStr, `import "../`, ` import "${parent}`);
  returnStr = replaceAll(returnStr, `import "./`, ` import "${baSe}`);
  returnStr = replaceAll(returnStr, ` from "../../`, ` from "${gParent}`);
  returnStr = replaceAll(returnStr, ` from "../`, ` from "${parent}`);
  returnStr = replaceAll(returnStr, ` from "./`, ` from "${baSe}`);
  items.map((lib: keyof typeof importMapImports) => {
    const uri = (new URL(importMapImports[lib], origin)).toString();
    returnStr = replaceAll(returnStr, `from"`, `from "`);
    returnStr = replaceAll(returnStr, ` from "${lib}"`, ` from "${uri}"`);
    returnStr = replaceAll(returnStr, ` from "./`, ` from "${origin}/live/`);
    returnStr = replaceAll(returnStr, ` from "/`, ` from "${origin}/`);
  });

  console.log("importmapReplace fn");
  returnStr = returnStr.split(";").map(x => x.indexOf("import") !== -1 ? x.trim() : x).map((Y) =>
    Y.split("\n").map(x => {
      if (x.length === 0 || x.indexOf("import") === -1) return x;
      if (x.startsWith("import") && x.indexOf(`"`) !== -1 && x.indexOf(`"https://`) === -1) {
        const slices = x.split(`"`);
        slices[1] = origin + "/npm:/*" + slices[1] + "?bundle&target=es2020&keep-names=true&dev=true";
        return slices.join(`"`);
      }
      if (x.indexOf("/node_process.js") !== -1 || x.indexOf("/node_buffer.js") !== -1) {
        const slices = x.split(`"`);
        const oldUrl = new URL(slices[1]);
        slices[1] = origin + "/npm:" + oldUrl.pathname;

        return slices.join(`"`);
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
    }).join("\n")
  ).join(";");

  return returnStr.split("https://esm.sh").join(origin + "/npm:").split("npm:/npm:").join("npm:");
}
function replaceAll(input: string, search: string, replace: string) {
  return input.split(search).join(replace);
}
