import type * as monaco from "monaco-editor";

let replaceMaps: { [key: string]: string } = {};

let extraModelCache: { [key: string]: string } = {};
let extraModels: { [key: string]: string[] } = {};

export const initAta = () => {
  replaceMaps = {};

  extraModelCache = {};
  extraModels = {};
};
export const addExtraModels = async (code: string, url: string) => {
  if (extraModels[url]) return;
  extraModels[url] = [];

  extraModelCache[url] = code;

  const regex = /((https:\/\/)+[^\s.]+\.[\w][^\s]+)/gm;

  const models = code.matchAll(regex);

  const arr = [...Array.from(models)];
  const ret = Promise.all(arr.map(async (match) => {
    const dts = match[0].indexOf(".d.ts");
    // if (!match[0].includes("spike.land")) return;
    if (dts === -1) return;
    let extraModel = match[0].slice(0, dts + 5); // (new URL(match[0].slice(7).slice(0, -1)))
    //            .toString();
    if (extraModels[url].includes(extraModel)) return;

    extraModels[url].push(extraModel);

    if (extraModels[extraModel]) return;

    if (extraModelCache[extraModel]) return;

    // let extraModelUrl = (new URL(extraModel, url)).toString();
    // if (!extraModelUrl.endsWith(".d.ts")) {
    // extraModelUrl += "/index.d.ts";
    // }
    let extraModelUrl = extraModel;
    if (extraModel.indexOf("spike.land") === -1 && extraModel.indexOf("esm.sh") === -1) return;
    return fetch(extraModel, { redirect: "follow" }).then(resp => {
      extraModelUrl = resp.url;
      return resp.text().then(async (co) => {
        if (extraModelUrl !== extraModel) {
          extraModelCache[url] = replaceAll(
            extraModelCache[url],
            extraModel,
            extraModelUrl,
          );
        }
        extraModelCache[extraModelUrl] = co;
        return await addExtraModels(extraModelCache[extraModelUrl], extraModelUrl);
      });
    });
  })) as unknown as Promise<void>;

  return ret;
};

export const dealWithMissing = async (mod: string, origin: string) =>
  (async (url: string) => ({
    url: origin + "/node_modules/" + mod + "/index.d.ts",
    mod,
    content: await fetch("https://esm.sh/" + mod, { redirect: "follow" }).then(
      (resp) => {
        const xt = resp.headers.get("x-typescript-types");
        const res = `
        export * from "${xt}";
        export { default } from "${xt}";
        `;

        return res;
        // const extraModelCache[url] =
      },
    ),
  }))(`${origin}/${mod}`);

export const xxxsetExtraLibs = (maps: {
  [x: string]: string;
}[], origin: string) => {
  maps.forEach((m) => Object.assign(replaceMaps, m));

  console.log({ replaceMaps });
  // replaceMaps["/node_modules/"] = "/npm:/v99/";

  // const versionNumbers = /@(\^)?\d+.\d+.\d+/gm;

  // const types = /\/types\//gm;

  const extraLibs = Object.keys(extraModelCache).map((filePath) => {
    // let url = replaceMappings(filePath, replaceMaps).replaceAll(
    // versionNumbers,
    // ``,
    // ).replaceAll(types, `/`);
    // url = url.replace("@types/", "");

    // const fileDir = (new URL(".", url)).toString();

    const content = replaceMappings(extraModelCache[filePath], replaceMaps);
    // .replaceAll(versionNumbers, ``).replaceAll(types, `/`);

    // const fileDirRemoved = replaceAll(content, fileDir, "./");
    // const linksRemoved = replaceAll(
    //   content,
    //   origin + "/mode_modules/",
    //   "/xxx/xxx/",
    // );

    //  const indexDtsRemoved = replaceAll(otherLinksRemoved, "/index.d.ts", "");
    // let dtsRemoved = replaceAll(linksRemoved, ".d.ts", "");
    // dtsRemoved = replaceAll(dtsRemoved, "@types/", "");
    // dtsRemoved = replaceAll(dtsRemoved, "/index", "");
    // url = replaceAll(
    //   url,
    //   origin + "/node_modules/",
    //   "/xxx/xxx/",
    // );

    // const paths =  new URL(url, origin).pathname.split("/")
    // const [__, _np, _v99, ...rest] = paths;

    // const newURl = new URL("/node_modules/" + rest.join("/"), origin);
    // const newURl = new URL("/node_modules/" + rest.join("/"), dtsRemoved);

    // let urlString = replaceAll(newURl.toString(), "@types/", "");
    // urlString = urlString.indexOf("@")===-1? urlString:
    // urlString = urlString.replace("/index", "");
    // urlString = urlString.replace(location.origin, "");
    // urlString = replaceAll(urlString, "/index", "");

    // const newnewURl = replaceAll(newURl.toString(), "/index.d.ts", ".d.ts");
    // const dtsRemovedURL = replaceAll(newnewURl, ".d.ts", "");
    return {
      filePath: filePath,
      content: content,
    };
  }).filter(x => x.content.length).map(x => ({
    filePath: x.filePath,
    content: x.content.split(`declare module "${origin}/npm:/`).join(`declare module "`),
  }));

  return extraLibs;
};

export function extraStuff(
  code: string,
  uri: monaco.Uri,
  typescript: typeof monaco.languages.typescript,
) {
  const getTsWorker = () => typescript.getTypeScriptWorker();

  const setExtraLibs = (libs: {
    content: string;
    filePath?: string | undefined;
  }[]) => typescript.typescriptDefaults.setExtraLibs(libs);

  Object.assign(globalThis, { extraModels, extraModelCache });

  const ATA = async () => {
    console.log("ATA");
    const mappings = (await Promise.all(
      (await (await (await getTsWorker())(uri)).getSemanticDiagnostics(
        uri.toString(),
      )).map(x => {
        //   console.log(x.messageText);
        return x.messageText;
      }).filter((x) =>
        typeof x === "string"
        && x.includes(" or its corresponding type declarations.")
      )
        .map((x) => typeof x === "string" && x.split!("\"")[1]).filter(x => typeof x === "string").map(x => x as string)
        .map((mod: string) => dealWithMissing(mod, location.origin)),
    )).filter(m => m.content && m.content.trim().length > 1).map(async (m) => {
      console.log(`Aga-Insert: ${m.url}`);

      return addExtraModels(
        m.content,
        m.url,
      ).then(() => ({
        [m.url]: m.url,
      }));
    });

    const maps = await Promise.all(mappings);

    const extraLib = xxxsetExtraLibs(maps, location.origin);
    console.log({ extraLib });
    setExtraLibs(extraLib);

    typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

    //   const libs = languages.typescript.typescriptDefaults.getExtraLibs();

    //   const extraLibsForSave = Object.keys(libs).map((lib) => ({
    //     filePath: lib,
    //     content: libs[lib].content,
    //   }));

    // localStorage
    //   && localStorage.setItem(codeSpace, JSON.stringify(extraLibsForSave));
  };

  // const extraLib = xxxsetExtraLibs();
  // extraLib.map((lib) => {
  //   addExtraLib(
  //     lib.content,
  //     lib.filePath,
  //   );
  // });

  const mod = {
    //   editor,
    ATA,
    //   languages,
    silent: false,
    code,
    //   tsWorker: (await getTsWorker()(uri) .catch((e) => ({
    //       getSemanticDiagnostics: async () => [{ messageText: JSON.stringify({ e }) }],
    //     })),
  };

  setTimeout(() => mod.ATA(), 2000);
}

function replaceAll(input: string, search: string, replace: string) {
  return input.split(search).join(replace);
}

function replaceMappings(input: string, maps: { [key: string]: string }) {
  let result = input;
  Object.keys(maps).map((x) => result = replaceAll(result, maps[x], x));
  return result;
}
