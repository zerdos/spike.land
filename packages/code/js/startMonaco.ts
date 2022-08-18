import {version} from "monaco-editor/package.json"
import type monaco from "monaco-editor";
import pMap from "p-map";

//@ts-ignore
//@ts-ignore

// import { MonacoJsxSyntaxHighlight } from "monaco-jsx-syntax-highlight";


// import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";
// import MonacoJSXHighlighter from "monaco-jsx-highlighter";
// import Buffer from "buffer";

// globalThis.Buffer = Buffer;


let started = false;

const monacoContribution = async (
  typescript:  monaco.languages.typescript,
  editor:  monaco.editor,
  Uri: monaco.Uri,
  code: string,
) => {
  // const {typescript} = languages;
  typescript.typescriptDefaults
    .setDiagnosticsOptions({
      noSuggestionDiagnostics: true,
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

  typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: location.origin + "/live/",
    target: typescript.ScriptTarget.ESNext,
    lib: [
      "dom",
      "dom.iterable",
      "esnext",
    ],
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
    moduleResolution: typescript.ModuleResolutionKind.NodeJs,
    declaration: false,
    module: typescript.ModuleKind.ESNext,
    noEmitOnError: true,
    maxNodeModuleJsDepth: 10,

    jsxImportSource: "@emotion/react",
    jsx: typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: true,
  });

  const regex1 = / from \'\.\./ig;

  const regex2 = / from \'\./ig;

  const search = new RegExp(` from '${origin}/live/[a-zA-Z]+`, "gm");
  const replaced = code.replaceAll(regex1, ` from '${location.origin}/live`)
    .replaceAll(regex2, ` from '${location.origin}/live`);

  const models = replaced.matchAll(search);
  // console.log("load more models", replaced, models);

  for (const match of models) {
    console.log("***** EXTRA MODELS *****");

    const extraModel = match[0].slice(7) + ".tsx";
    console.log(extraModel);
    editor.createModel(
      await fetch(extraModel).then((res) => res.text()),
      "typescript",
      Uri.parse(extraModel),
    );
  }

  (async () => {
    const { dtsFiles } = await import("./types.mjs");
    const {
      reactDts,
      // jsxDevRuntimeDts,
      jsxRuntimeDts,
      // reactExpDts,
      // globalDts,
      propTypesDts,
      cssTypeDts,
      framerDts,
      emotionStyled,
      emotionStyleBase,
      emotionCache,
      emotionJSXNameSpaceDTS,
      emotionJSXRuntimeDTS,
      emotionReactDts,
      emotionReactCssPropDts,
      emotionReactHelperDts,
      emotionThemingDts,
      emotionSerializeDts,
      emotionUtilsDts,
    } = dtsFiles;
    const importHelper = [
      {
        name: "react",
        url: reactDts,
        depend: ["global", "csstype", "prop-types"],
      },
      {
        name: "react/jsx-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"],
      },
      {
        name: "react/jsx-dev-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"],
      },
      // {
      // name: "react-exp",
      // url: reactExpDts,
      // depend: [],
      // },
      // {
      // name: "global",
      // url: globalDts,
      // depend: [],
      // },
      {
        name: "prop-types",
        url: propTypesDts,
        depend: [],
      },
      {
        name: "csstype",
        url: cssTypeDts,
        depend: [],
      },
      {
        name: "@emotion/base",
        url: emotionStyleBase,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/styled",
        url: emotionStyled,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react",
        ],
      },
      {
        name: "@emotion/cache",
        url: emotionCache,
        depend: ["@emotion/utils"],
      },
      {
        name: "@emotion/react",
        url: emotionReactDts,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-dev-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"],
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: emotionJSXNameSpaceDTS,
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/theming",
        url: emotionThemingDts,
        depend: ["@emotion/utils", "type"],
      },
      {
        name: "@emotion/react/css-prop",
        url: emotionReactCssPropDts,
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/react/helper",
        url: emotionReactHelperDts,
        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/serialize",
        url: emotionSerializeDts,

        depend: ["@emotion/utils", "csstype"],
      },
      {
        name: "@emotion/utils",
        url: emotionUtilsDts,
        depend: [],
      },
      {
        name: "framer-motion",
        url: framerDts,
        depend: ["popmotion"],
      },
    ];

    try{

    const mapper= async ({ name, url }: {name: string, url: string}) => typescript.typescriptDefaults.addExtraLib(
        await (await fetch(
          url,
        )).text(),
        location.origin + `/live/${name}.d.ts`);
    



    await pMap(importHelper, mapper, { concurrency: 2 });
    } catch{
      console.error("Error in loading d.td")
    }
    typescript.typescriptDefaults.setEagerModelSync(true);
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  })();
};

window.MonacoEnvironment = {

  getWorker: async function (_workerId: string, label: string) {




    if (label === "typescript" || label === "javascript") {

      globalThis.twWorker =   globalThis.twWorker ||  ((await import(`/npm:monaco-editor@${version}/esm/vs/language/typescript/ts.worker?worker&target=es2021`)).default)();


        return twWorker;
      }

      globalThis .ediWorker = (   globalThis .ediWorker  || (await import(`/npm:monaco-editor@${version}/esm/vs/editor/editor.worker?worker&target=es2021`)).default)();


    // const worker = await 
    // const {TypeScriptWorker}=  await import("monaco-editor/esm/vs/language/typescript/ts.worker")
    return ediWorker;
  },
};


export const startMonaco = async (
  { code, container, name }: {
    code: string;
    container: HTMLDivElement;
    name: string;
  },
) => {

  const  {languages, editor, Uri}  = await import(`/npm:monaco-editor@${version}?target=es2021`) as unknown as monaco; 
  


const returnModules = {
  editor: {} as unknown as ReturnType<monaco.editor.create>,
  monaco: {editor,languages, Uri},
};



  console.log("monaco-editor");
  if (!started) started = true;
  else return returnModules;
  const shadowRoot = container.attachShadow({
    mode: "open",
  });
  const innerContainer = document.createElement("div");
  shadowRoot.appendChild(innerContainer);
  innerContainer.style.width = "100%";
  innerContainer.style.height = "100%";

  const outerStyle = document.createElement("style");
  outerStyle.innerText = ` @font-face {
     font-family: codicon;
     font-display: block;
      src: url(/npm:monaco-editor@${version}/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf) format("truetype");

}`;
  document.head.appendChild(outerStyle);

  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import url(/npm:monaco-editor@${version}/?css);
//   @font-face {
//     font-family: codicon;
//     font-display: block;
//     src: url(/npm:monaco-editor@${version}/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf) format("truetype");
// }
  
  `;
  shadowRoot.appendChild(innerStyle);

  await monacoContribution(languages.typescript, editor, Uri, code);

  returnModules.editor = editor.create(innerContainer, {
    model: editor.createModel(
      code,
      "typescript",
      Uri.parse(location.origin + "/live/" + name + ".tsx"),
    ),
    language:   "typescript",

  scrollbar: {
    scrollByPage: false,
    alwaysConsumeMouseWheel: false,
  },
  scrollBeyondLastLine: false,
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
    filterGraceful: true,
    /**
     * Prevent quick suggestions when a snippet is active. Defaults to true.
     */
    snippetsPreventQuickSuggestions: true,
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
    showStatusBar: false,
    /**
     * Enable or disable the rendering of the suggestion preview.
     */
    preview: true,
    /**
     * Configures the mode of the preview.
     */
    previewMode: "prefix",
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
  definitionLinkOpensInPeek: true,

  theme: "vs-dark",

  autoClosingBrackets: "beforeWhitespace"
  });




  return returnModules;
};
