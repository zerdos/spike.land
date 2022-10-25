// Import {  } from 'monaco-editor/main/src/language/typescript/lib/lib.index'
import "monaco-editor/esm/vs/editor/editor.all";
import { editor, languages, Uri } from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution";

// import "monaco-editor/min/vs/basic-languages/typescript/typescript";
// import "monaco-editor/min/vs/language/typescript/tsMode";
import { setupTypeAcquisition } from "@typescript/ata";
// import pMap from "p-map";

import { getWorkerUrl } from "./monacoWorkers.mjs";
// Import {  createModel } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor'
// import { languages, Uri, editor} from 'monaco-editor/esm/vs/editor/editor.api'
// const {createModel} = editor
const create = editor.create;
// const languages = monaco.languages;
const createModel = editor.createModel;
// const Uri = monaco.Uri;

const originToUse = location.origin.includes("spike")
  ? location.origin
  : "https://testing.spike.land/";

Object.assign(globalThis, { setupTypeAcquisition });
const lib = [
  "dom",
  "dom.iterable",
  "es2015.collection",
  "es2015.core",
  "es2015",
  "es2015.generator",
  "es2015.iterable",
  "es2015.promise",
  "es2015.proxy",
  "es2015.reflect",
  "es2015.symbol",
  "es2015.symbol.wellknown",
  "es2016.array.include",
  "es2016",
  "es2016.full",
  "es2017",
  "es2017.full",
  "es2017.intl",
  "es2017.object",
  "es2017.sharedmemory",
  "es2017.string",
  "es2017.typedarrays",
  "es2018.asyncgenerator",
  "es2018.asynciterator",
  "es2018",
  "es2018.full",
  "es2018.intl",
  "es2018.promise",
  "es2018.regexp",
  "es2019.array",
  "es2019",
  "es2019.full",
  "es2019.object",
  "es2019.string",
  "es2019.symbol",
  "es2020.bigint",
  "es2020",
  "es2020.full",
  "es2020.intl",
  "es2020.promise",
  "es2020.sharedmemory",
  "es2020.string",
  "es2020.symbol.wellknown",
  "es2021",
  "es2021.full",
  "es2021.intl",
  "es2021.promise",
  "es2021.string",
  "es2021.weakref",
  "es5",
  "es6",
  "esnext",
  "esnext.full",
  "esnext.intl",
  "esnext.promise",
  "esnext.string",
  "esnext.weakref",
  "scripthost",
  "webworker",
  "webworker.importscripts",
  "webworker.iterable",
];

const monacoContribution = async (
  code: string,
) => {
  // Const {typescript} = languages;
  languages.typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse + "/",
    target: languages.typescript.ScriptTarget.ESNext,

    importHelpers: false,

    lib,
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    allowNonTsExtensions: true,
    traceResolution: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    moduleSpecifierCompletion: 2,
    declaration: true,
    module: languages.typescript.ModuleKind.CommonJS,
    noEmitOnError: true,
    sourceMap: true,
    mapRoot: originToUse + "/src/sourcemaps",
    maxNodeModuleJsDepth: 10,
    rootDir: originToUse + "/live",
    paths: {
      [originToUse + "/live/node_modules/"]: [originToUse + "/*"],
      [originToUse + "/live/*"]: [originToUse + "/live/*"],
      [originToUse + "*"]: [originToUse + "/*"],
      [originToUse + "/node_modules/*"]: [originToUse + "/*"],
      [originToUse + "node_modules/*"]: [originToUse + "/*"],
      [originToUse + "/*"]: [originToUse + "/*"],
      [originToUse + "^/*"]: [originToUse + "/*"],
    },
    typeRoots: [
      originToUse + "/@types/",
      originToUse + "/unpkg/@types/",
      originToUse + "/",
      originToUse + "/unpkg:/",
    ],

    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [originToUse + "/node_modules"],
  });

  const regex1 = / from '\.\./gi;

  const regex2 = / from '\./gi;

  const search = new RegExp(
    ` from '(${originToUse}/)?live/[a-zA-Z]+`,
    "gm",
  );

  // 0123456
  const replaced = code.replaceAll(regex1, ` from '${originToUse}/live`)
    .replaceAll(regex2, ` from '${originToUse}/live`);

  const models = replaced.matchAll(search);
  // Console.log("load more models", replaced, models);

  for (const match of models) {
    //    console.log("***** EXTRA MODELS *****");

    const extraModel = new URL(match[0].slice(7) + ".tsx", originToUse)
      .toString();
    //   console.log(extraModel);
    languages.typescript.typescriptDefaults.addExtraLib(
      extraModel,
      await fetch(extraModel).then(async (res) => res.text()),
    );
    // Editor.createModel(await  fetch("/npm:/framer-motion").then(res=>res.text()), "javascript", Uri.parse(originToUse+"/node_modules/framer-motion/index.js"));
    // editor.createModel(await  fetch("/npm:/framer-motion").then(res=>res.text()), "javascript", Uri.parse(originToUse+"/node_modules/framer-motion/index.js"));
  }

  // (async () => {
  //   // const { dtsFiles } = await import("./types.mjs");
  //   // const {
  //   //   reactDts,
  //   //   // JsxDevRuntimeDts,
  //   //   jsxRuntimeDts,
  //   //   // ReactExpDts,
  //   //   // globalDts,
  //   //   propTypesDts,
  //   //   cssTypeDts,
  //   //   emotionStyled,
  //   //   emotionStyleBase,
  //   //   emotionCache,
  //   //   emotionJSXNameSpaceDTS,
  //   //   emotionJSXRuntimeDTS,
  //   //   emotionThemingDts,
  //   // } = dtsFiles;
  //   const importHelper = [
  //     {
  //       name: "react",
  //       url: reactDts,
  //       depend: ["global", "csstype", "prop-types"],
  //     },
  //     {
  //       name: "react/jsx-runtime",
  //       url: jsxRuntimeDts,
  //       depend: ["global", "csstype", "prop-types"],
  //     },
  //     {
  //       name: "react/jsx-dev-runtime",
  //       url: jsxRuntimeDts,
  //       depend: ["global", "csstype", "prop-types"],
  //     },
  //     // {
  //     // name: "react-exp",
  //     // url: reactExpDts,
  //     // depend: [],
  //     // },
  //     // {
  //     // name: "global",
  //     // url: globalDts,
  //     // depend: [],
  //     // },
  //     {
  //       name: "prop-types",
  //       url: propTypesDts,
  //       depend: [],
  //     },
  //     {
  //       name: "csstype",
  //       url: cssTypeDts,
  //       depend: [],
  //     },
  //     {
  //       name: "@emotion/base",
  //       url: emotionStyleBase,
  //       depend: [
  //         "@emotion/react",
  //         "@emotion/serialize",
  //         "react",
  //       ],
  //     },
  //     {
  //       name: "@emotion/styled",
  //       url: emotionStyled,
  //       depend: [
  //         "@emotion/react",
  //         "@emotion/serialize",
  //         "react",
  //       ],
  //     },
  //     {
  //       name: "@emotion/cache",
  //       url: emotionCache,

  //       depend: ["@emotion/utils"],
  //     },
  //     {
  //       name: "@emotion/react",
  //       force: true,
  //       url: "/node_modules/@emotion/react/types/index.d.ts",
  //       depend: ["@emotion/cache"],
  //     },
  //     {
  //       name: "@emotion/react/jsx-runtime",
  //       force: true,
  //       url: emotionJSXRuntimeDTS,
  //       depend: ["@emotion/cache"],
  //     },
  //     {
  //       name: "@emotion/react/jsx-dev-runtime",
  //       url: emotionJSXRuntimeDTS,
  //       force: true,
  //       depend: ["@emotion/cache"],
  //     },
  //     {
  //       name: "@emotion/react/jsx-namespace",
  //       url: emotionJSXNameSpaceDTS,
  //       force: true,
  //       depend: ["@emotion/utils", "type"],
  //     },
  //     {
  //       name: "@emotion/react/theming",
  //       url: emotionThemingDts,
  //       depend: ["@emotion/utils", "type"],
  //     },
  //     {
  //       name: "@emotion/react/css-prop",
  //       force: true,
  //       url: "/node_modules/@emotion/react/types/css-prop.d.ts",
  //       depend: ["@emotion/utils", "csstype"],
  //     },
  //     {
  //       name: "@use-gesture/react",
  //       url:
  //         "/node_modules/@use-gesture/react/dist/declarations/src/index.d.ts",
  //       depend: ["@emotion/utils", "csstype"],
  //     },
  //     {
  //       name: "@emotion/react/helper",
  //       url: "/node_modules/@emotion/react/types/helper.d.ts",
  //       depend: ["@emotion/utils", "csstype"],
  //     },
  //     {
  //       name: "@emotion/serialize",
  //       force: true,
  //       url:
  //         "/node_modules/@emotion/serialize/dist/declarations/types/index.d.ts",

  //       depend: ["@emotion/utils", "csstype"],
  //     },
  //     {
  //       name: "@emotion/utils",
  //       force: true,
  //       url: "/node_modules/@emotion/utils/dist/declarations/types/index.d.ts",
  //       depend: [],
  //     },
  //     // {
  //     //   name: "framer-motion",
  //     //   url: framerDts,
  //     //   depend: ["popmotion"],
  //     // },
  //   ];

  //   // Typescript.typescriptDefaults.addExtraLib(
  //   //   await (await fetch(
  //   //   '/node_modules/framer-motion/package.json',
  //   //   )).text(),
  //   //   originToUse + `/node_modules/framer-motion/package.json`);

  //   try {
  //     const mapper = async (
  //       { name, url, force }: { name: string; url: string; force?: boolean },
  //     ) =>
  //       (code.indexOf(name) !== -1 || force) &&
  //       languages.typescript.typescriptDefaults.addExtraLib(
  //         await (await fetch(
  //           url,
  //         )).text(),
  //         originToUse + `/node_modules/${name}/index.d.ts`,
  //       );

  //     await pMap(importHelper, mapper, { concurrency: 2 });
  //   } catch {
  //     console.error("Error in loading d.ts");
  //   }

  //   languages.typescript.typescriptDefaults.setEagerModelSync(true);
  // })();

  // languages.typescript.getTypeScriptWorker().then(ts=>setupTypeAcquisition({
  //   typescript: ts
  // })(code));

  return code;
};

self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl,
};

const mod: Record<string, Record<string, unknown>> = {};

export const startMonaco = async (
  { code, container, name, onChange }: {
    code: string;
    container: HTMLDivElement;
    name: string;
    onChange: (_code: string) => void;
  },
) => {
  //  console.log({code, container, name});
  if (mod[name]) {
    return mod[name] as unknown as typeof returnValue;
  }

  const returnValue = await startMonacoPristine({ code, container, name });
  mod[name] = returnValue;
  return returnValue;

  async function startMonacoPristine(
    { code, container, name }: {
      code: string;
      container: HTMLDivElement;
      name: string;
    },
  ) {
    // If (mod[name]) return mod[name];
    const codeSpace = name;

    // Const innerStyle = document.createElement("style");
    // monacoCss
    // innerStyle.innerText = `@import url(${originToUse}/npm:/monaco-editor@${version}/?css);`;
    // container.appendChild(innerStyle);

    const replaced = await monacoContribution(
      code,
    );

    // Editor.createModel(JSON.stringify(packageJson) , "json", Uri.parse(`${originToUse}/package.json`))
    // languages.typescript.typescriptDefaults.inlayHintsOptions

    const model = createModel(
      replaced,
      "typescript",
      Uri.parse(`${originToUse}/live/${codeSpace}.tsx`),
    );

    // const shadowRoot = container.attachShadow({
    //   mode: "closed",
    // });

    // const innerContainer = document.createElement("div");
    // shadowRoot.appendChild(innerContainer);
    // innerContainer.style.width = "100%";
    // innerContainer.style.height = "100%";

    // const innerStyle = document.createElement("style");
    // innerStyle.innerText =
    //   `@import "${location.origin}/node_modules/monaco-editor@${version}/min/vs/editor/editor.main.css";`;
    // shadowRoot.appendChild(innerStyle);

    const innerContainer = container;

    const editor = create(innerContainer, {
      model,
      scrollbar: {
        scrollByPage: false,
        alwaysConsumeMouseWheel: false,
      },
      scrollBeyondLastLine: true,
      scrollPredominantAxis: false,

      smoothScrolling: true,
      suggest: {
        /**
         * Overwrite word ends on accept. Default to false.
         */
        insertMode: "replace",
        /**
         * Enable graceful matching. Defaults to true.
         */
        filterGraceful: false,
        /**
         * Prevent quick suggestions when a snippet is active. Defaults to true.
         */
        snippetsPreventQuickSuggestions: false,
        /**
         * Favors words that appear close to the cursor.
         */
        localityBonus: true,
        /**
         * Enable using global storage for remembering suggestions.
         */
        shareSuggestSelections: true,
        /**
         * Enable or disable icons in suggestions. Defaults to true.
         */
        showIcons: true,
        /**
         * Enable or disable the suggest status bar.
         */
        showStatusBar: true,
        /**
         * Enable or disable the rendering of the suggestion preview.
         */
        preview: true,
        /**
         * Configures the mode of the preview.
         */
        previewMode: "subwordSmart",
        /**
         * Show details inline with the label. Defaults to true.
         */
        showInlineDetails: true,

        /**
         * Show method-suggestions.
         */
        showMethods: true,
        /**
         * Show function-suggestions.
         */
        showFunctions: true,
        /**
         * Show constructor-suggestions.
         */
        showConstructors: true,
        /**
         * Show deprecated-suggestions.
         */

        /**
         * Show field-suggestions.
         */
        showFields: true,

        /**
         * Show color-suggestions.
         */
        showColors: true,
        /**
         * Show file-suggestions.
         */
        showFiles: true,
        /**
         * Show reference-suggestions.
         */
        showReferences: true,
        /**
         * Show folder-suggestions.
         */
        showFolders: true,
        /**
         * Show typeParameter-suggestions.
         */
        showTypeParameters: true,
        /**
         * Show issue-suggestions.
         */
        showIssues: true,
        /**
         * Show user-suggestions.
         */
        showUsers: true,
        /**
         * Show snippet-suggestions.
         */
        showSnippets: true,
      },

      automaticLayout: true,

      useShadowDOM: false,
      experimental: {
        stickyScroll: {
          enabled: true,
        },
      },
      roundedSelection: true,
      linkedEditing: true,
      bracketPairColorization: {
        independentColorPoolPerBracketType: true,
        enabled: true,
      },
      // bracketPairGuides: {
      //   bracketPairs: true,
      //   bracketPairsHorizontal : true,
      //   highlightActiveBracketPair: true,
      //   indentation: true,
      //   highlightActiveIndentation:  'always'
      // },
      codeLens: true,
      "semanticHighlighting.enabled": true,
      dragAndDrop: true,
      codeActionsOnSaveTimeout: 300,
      dropIntoEditor: { enabled: true },
      // GotoLocation: true,]]
      mouseStyle: "default",
      definitionLinkOpensInPeek: true,
      theme: "vs-dark",
      autoClosingBrackets: "beforeWhitespace",
    });

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    const addExtraModels = async (code: string, url: string) => {
      if (extraModels[url]) return;
      extraModels[url] = [];
      if (true) {
        const regex1 = / from '\.\./gi;

        const regex2 = / from '\./gi;

        const search = new RegExp(
          ` from \'[a-zA-Z\-\.\_\/\:]+\'`,
          "gm",
        );

        const baSe = (new URL(".", url)).toString();

        const replaced = code.replaceAll(regex1, ` from '${baSe}`)
          .replaceAll(regex2, ` from '${baSe}`);

        const models = replaced.matchAll(search);
        // Console.log("load more models", replaced, models);

        for (const match of models) {
          //    console.log("***** EXTRA MODELS *****");

          const extraModel = new URL(match[0].slice(7).slice(0, -1))
            .toString();
          //   console.log(extraModel);
          extraModels[url].push(extraModel);

          languages.typescript.typescriptDefaults.addExtraLib(
            extraModel,
            await fetch(extraModel).then(async (res) => res.text()),
          );
        }
      }
      const regex1 = / from "\.\./gi;

      const regex2 = / from "\./gi;

      const search = new RegExp(
        ` from \"[a-zA-Z\-\.\_\/\:]+\"`,
        "gm",
      );

      const baSe = (new URL(".", url)).toString();

      const replaced = code.replaceAll(regex1, ` from "${baSe}`)
        .replaceAll(regex2, ` from "${baSe}`);

      const models = replaced.matchAll(search);
      // Console.log("load more models", replaced, models);

      for (const match of models) {
        //    console.log("***** EXTRA MODELS *****");

        const extraModel = new URL(match[0].slice(7).slice(0, -1))
          .toString();
        //   console.log(extraModel);
        extraModels[url].push(extraModel);
        languages.typescript.typescriptDefaults.addExtraLib(
          extraModel,
          await fetch(extraModel).then(async (res) => res.text()),
        );
      }
    };
    const extraModels = {};
    Object.assign(globalThis, { extraModels });
    const ATA = () =>
      (async () => {
        try {
          console.log("ATA");
          (await Promise.all(
            (await (await (await languages.typescript.getTypeScriptWorker())(
              model.uri,
            )).getSemanticDiagnostics(
              model.uri.toString(),
            ))
              .map((x) => {
                //   console.log(x.messageText);
                return x.messageText;
              }).filter((x) =>
                typeof x === "string" &&
                x.includes(" or its corresponding type declarations.")
              )
              .map((x) => typeof x === "string" && x.split!("'")[1]).map(
                async (mod) => {
                  const retMod = { url: "", mod: mod, content: "" };
                  retMod.content = (await fetch("/npm:/" + mod).then((resp) =>
                    resp.status === 307
                      ? fetch(resp.headers.get("location")!)
                      : resp
                  ).then((x) => {
                    retMod.url = x.headers.get("x-dts")!;
                    console.log(retMod.url);
                    return fetch(retMod.url).then((resp) =>
                      resp.status === 307 || resp.redirected
                        ? fetch(resp.url)
                        : resp
                    ).then((resp) => resp.text());
                  }).catch(() =>
                    ""
                  )) || "";

                  return retMod;
                },
              ),
          )).filter((m) => m.mod && m.content).map((m) => {
            console.log(`Aga-Insert: ${m.mod}`);
            languages.typescript.typescriptDefaults.addExtraLib(
              `
              export * from "${m.url}";
              export {default} from "${m.url}";
              `,
              originToUse + `/node_modules/${m.mod}/index.d.ts`,
            );
            languages.typescript.typescriptDefaults.addExtraLib(
              m.content,
              m.url,
            );
            addExtraModels(m.content, m.url);
          });
        } catch {
          console.log("Error while ATA");
        } finally {
          console.log("ATA is done");
        }
      })();

    const mod = {
      editor,
      ATA,
      languages,
      silent: false,
      code,
      tsWorker: languages.typescript.getTypeScriptWorker().then((ts) =>
        ts(model.uri)
      ).catch((e) => {
        console.log("ts error, will retry", e);
      }),
    };

    Object.assign(globalThis, { monaco: mod });
    setTimeout(() => mod.ATA(), 2000);

    model.onDidChangeContent(() => {
      if (mod.silent) return;
      const code = model.getValue();
      if (mod.code === code) return;
      mod.code = code;
      onChange(code);
    });

    return {
      getValue: () => mod.code,

      getErrors: () => {
        return mod.tsWorker.then((ts) =>
          ts?.getSemanticDiagnostics(
            originToUse + "/live/" + codeSpace + ".tsx",
          ).then((diag) => diag.map((d) => d.messageText.toString()))
        );
      },
      setValue: (code: string) => {
        mod.silent = true;
        let state = null;
        try {
          state = editor.saveViewState();
        } catch {
          console.error("error while saving the state");
        }

        model.setValue(code);

        if (state) {
          editor.restoreViewState(state);
        }
        mod.silent = false;
      },
    };
  }
};
