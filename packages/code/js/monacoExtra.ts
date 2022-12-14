import "core-js/stable/string/replace-all";
import type { languages, Uri } from "monaco-editor";

export function extraStuff(
  code: string,
  uri: Uri,
  typescript: typeof languages.typescript,
) {
  const getTsWorker = () => typescript.getTypeScriptWorker();
  const addExtraLib = (content: string, filePath: string) =>
    typescript.typescriptDefaults.addExtraLib(content, filePath);
  const setExtraLibs = (libs: {
    content: string;
    filePath?: string | undefined;
  }[]) => typescript.typescriptDefaults.setExtraLibs(libs);
  const extraModelCache: { [key: string]: string } = {};
  const extraModels: { [key: string]: string[] } = {};

  Object.assign(globalThis, { extraModels, extraModelCache });

  const addExtraModels = async (code: string, url: string) => {
    try {
      if (extraModels[url]) return;
      extraModels[url] = [];

      // languages.typescript.typescriptDefaults.addExtraLib(
      //   url,
      //   code,
      // );

      const baSe = (new URL(".", url)).toString();
      const parent = (new URL("..", url)).toString();
      const gParent = (new URL("../..", url)).toString();
      const ggParent = (new URL("../../..", url)).toString();

      let replaced = removeComments(code);
      replaced = replaceAll(replaced, ` from '../../`, ` from '${ggParent}`);
      replaced = replaceAll(replaced, ` from "../../`, ` from "${ggParent}`);
      replaced = replaceAll(replaced, ` from '../../`, ` from '${gParent}`);
      replaced = replaceAll(replaced, ` from "../../`, ` from "${gParent}`);
      replaced = replaceAll(replaced, ` from '../`, ` from '${parent}`);
      replaced = replaceAll(replaced, ` from './`, ` from '${baSe}`);
      replaced = replaceAll(replaced, ` from "../`, ` from "${parent}`);
      replaced = replaceAll(replaced, ` from "./`, ` from "${baSe}`);
      extraModelCache[url] = replaced;

      const regex = /((https:\/\/)+[^\s.]+\.[\w][^\s]+)/gm;

      const models = replaced.matchAll(regex);
      // Console.log("load more models", replaced, models);

      for (const match of models) {
        //    console.log("***** EXTRA MODELS *****");

        //    console.log("***** EXTRA MODELS *****");
        try {
          const dts = match[0].indexOf(".d.ts");
          if (!match[0].includes("spike.land")) continue;
          if (dts === -1) continue;

          const extraModel = match[0].slice(0, dts + 5); // (new URL(match[0].slice(7).slice(0, -1)))
          //            .toString();
          if (extraModels[url].includes(extraModel)) continue;

          extraModels[url].push(extraModel);

          if (extraModels[extraModel]) continue;

          if (extraModelCache[extraModel]) continue;

          let extraModelUrl = (new URL(extraModel, location.origin)).toString();

          const extraModelContent = await fetch(extraModelUrl).then((resp) =>
            resp.status === 307 ? fetch(resp.headers.get("location")!) : resp
          ).then((res) => {
            extraModelUrl = res.url;
            return res.text();
          });

          if (extraModelUrl !== extraModel) {
            extraModelCache[url] = replaceAll(
              extraModelCache[url],
              extraModel,
              extraModelUrl,
            );
          }
          extraModelCache[extraModelUrl] = extraModelContent;

          await addExtraModels(extraModelCache[extraModelUrl], extraModelUrl);
        } catch (err) {
          console.error("Error in add extra models", code, url, { err });
        }
      }
    } catch (err) {
      console.log("error in extra lib  mining", url, { err });
      return;
    }
  };
  const replaceMaps: { [key: string]: string } = {};
  const ATA = async () => {
    console.log("ATA");
    const mappings = (await Promise.all(
      (await (await (await getTsWorker())(uri)).getSemanticDiagnostics(
        uri.toString(),
      )).map((x) => {
        //   console.log(x.messageText);
        return x.messageText;
      }).filter((x) =>
        typeof x === "string"
        && x.includes(" or its corresponding type declarations.")
      )
        .map((x) => typeof x === "string" && x.split!("'")[1]).map(
          async (mod) => {
            const retMod = { url: "", mod: mod, content: "" };
            if (mod && mod.startsWith("https://")) {
              return retMod;
            }

            retMod.content = (await fetch("/npm:/" + mod).then((resp) =>
              resp.status === 307
                ? fetch(resp.headers.get("location")!)
                : resp
            ).then((x) => {
              retMod.url = x.headers.get("x-dts")!;
              console.log(retMod.url);

              return retMod.url === "NO_DTS"
                ? ""
                : fetch(retMod.url).then((resp) =>
                  resp.status === 307 || resp.redirected
                    ? fetch(retMod.url = resp.url)
                    : resp
                ).then((resp) => resp.text());
            }).catch(() => "")) || "";

            return retMod;
          },
        ),
    )).filter((m) => m.mod && m.content).map(async (m) => {
      console.log(`Aga-Insert: ${m.mod}`);

      await addExtraModels(
        m.content.split("/npm:/").join("/node_modules/"),
        m.url.split("/npm:/").join("/node_modules/"),
      );

      return {
        [location.origin + `/node_modules/${m.mod}/index.d.ts`]: m.url,
      };
    });

    const maps = await Promise.all(mappings);
    maps.forEach((m) => Object.assign(replaceMaps, m));

    console.log({ replaceMaps });

    const extraLib = xxxsetExtraLibs();
    extraLib.map((lib) => {
      addExtraLib(
        lib.content.split("/npm:/").join("/node_modules/"),
        lib.filePath.split("/npm:/").join("/node_modules/"),
      );
    });

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

  const xxxsetExtraLibs = () => {
    // replaceMaps["/node_modules/"] = "/npm:/v99/";

    const versionNumbers = /@\d+.\d+.\d+/gm;

    const types = /\/types\//gm;

    const extraLibs = Object.keys(extraModelCache).map((filePath) => {
      const url = replaceMappings(filePath, replaceMaps).replaceAll(
        versionNumbers,
        ``,
      ).replaceAll(types, `/`);

      const fileDir = (new URL(".", url)).toString();

      const content = replaceMappings(extraModelCache[filePath], replaceMaps)
        .replaceAll(versionNumbers, ``).replaceAll(types, `/`);

      const fileDirRemoved = replaceAll(content, fileDir, "./");
      const linksRemoved = replaceAll(
        fileDirRemoved,
        location.origin + "/node_modules/",
        "",
      );
      const indexDtsRemoved = replaceAll(linksRemoved, "/index.d.ts", "");
      const dtsRemoved = replaceAll(indexDtsRemoved, ".d.ts", "");

      return {
        filePath: url,
        content: dtsRemoved,
      };
    });
    console.log({ extraLibs });

    setExtraLibs(
      extraLibs,
    );
    return extraLibs;
  };

  const extraLib = xxxsetExtraLibs();
  extraLib.map((lib) => {
    addExtraLib(
      lib.content.split("/npm:/").join("/node_modules/"),
      lib.filePath.split("/npm:/").join("/node_modules/"),
    );
  });

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

function removeComments(str: string) {
  const regex = /\/\*.*?\*\//gi;

  // const regex = /(?<!\/)\/\*((?:(?!\*\/).|\s)*)\*\//g;
  /\/\*.*?\*\//gi;
  // Takes a string of code, not an actual function.
  return str.replaceAll(regex, ``).split(`\n`).filter((x) =>
    x && x.trim() && (!x.trim().startsWith("//") || x.includes("reference"))
  ).join(`\n`);
}
