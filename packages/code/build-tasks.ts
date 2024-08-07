// build-tasks.mjs
import { getCommonBuildOptions } from "./build-config.ts";
import { build } from "./buildOperations.ts";
// import {ReactCompilerEsbuildPlugin} from "./src/ReactCompilerPlugin.mjs";

const environment: "development" | "production" = "development";
const isProduction = environment as string === "production";

export async function buildWorkers() {
  const workerEntryPoints = [
    "vs/language/json/json.worker.js",
    "vs/language/css/css.worker.js",
    "vs/language/html/html.worker.js",
    "vs/language/typescript/ts.worker.js",
    "vs/editor/editor.worker.js",
  ];

  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: workerEntryPoints.map((entry) => `monaco-editor/esm/${entry}`),
    bundle: true,

    format: "iife",
    outdir: "dist",
    minify: true,
  });
}

export async function buildMainScripts() {
  const entryPoints = [
    "src/prettierEsm.ts",
    "src/memfs.ts",
    "src/ata.ts",
    "src/dts.ts",
    "src/ataWorker.ts",
  ];

  await build({
    ...getCommonBuildOptions(environment),
    entryPoints,
    format: "iife",
    outdir: "dist/workerScripts",
    minify: true,
    outExtension: { ".js": ".js" },
  });
}

export async function buildTranspileScript() {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/transpile.ts"],
    outExtension: { ".js": ".js" },
    format: "iife",
    outdir: "dist/workerScripts",
    minify: false,
    treeShaking: false,
  });
}

export const buildWasm = async () => {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/esbuildWASM.ts"],
    format: "esm",
    outdir: "dist",
    minify: true,
  });
};

export async function buildServiceWorker() {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/sw.ts"],
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    target: "es2024",
  });
}

export async function buildMainBundle(wasmFile) {
  const buildOptions = getCommonBuildOptions(environment);

  const components = [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "avatar",
    "badge",
    "breadcrumb",
    "button",
    "calendar",
    "card",
    "carousel",
    "chart",
    "checkbox",
    "collapsible",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "form",
    "hover-card",
    "input",
    "input-otp",
    "label",
    "menubar",
    "navigation-menu",
    "pagination",
    "popover",
    "progress",
    "radio-group",
    "resizable",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "skeleton",
    "slider",
    "sonner",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toast",
    "toggle",
    "toggle-group",
    "tooltip",
  ];

  await build({
    ...buildOptions,
    splitting: true,
    format: "esm",
    minifySyntax: isProduction,
    minifyIdentifiers: isProduction,
    minifyWhitespace: isProduction,
    bundle: true,
    treeShaking: isProduction,
    mangleQuoted: isProduction,
    sourcemap: false,
    legalComments: "none",
    platform: "browser",
    ignoreAnnotations: true,
    // plugins: [
    //   ReactCompilerEsbuildPlugin({
    //   filter: /\.(jsx|tsx|mjs|ts)$/,
    //   sourceMaps: true,
    //   runtimeModulePath: "/Users/z/github.com/zerdos/spike.land/node_modules/react/compiler-runtime.js"
    // })
    // ],
    entryPoints: [
      ...components.filter((x) => x).map((component) => `src/@/components/ui/${component}.tsx`),
      "src/@/lib/utils.ts",
      "src/modules.ts",
      "src/motion.ts",
      "src/monacoEditor.ts",
      "src/start.ts",
      "src/emotion.ts",
      "src/cf-esbuild.mjs",
      "src/reactMod.ts",
      "src/reactDom.ts",
      "src/reactDomClient.ts",
      "src/reactDomClient.ts",
      "src/jsx.mjs",
      "src/shared.ts",

      "src/Wrapper.tsx",
    ],
    alias: {
      ...buildOptions.alias,
      // Must be below test-utils
      "@src/swVersion": "/swVersion.mjs",
      "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,
      // "react": "../dist/reactMod.mjs",
      //  "react/jsx-runtime": "/jsx.mjs",
      //  "react-dom/client": "/reactDomClient.mjs",
      //  "react-dom": "/reactDom.mjs", // Must be below test-utils
    },

    external: [
      ...(buildOptions.external?.length ? buildOptions.external : []),
      "/swVersion.mjs",

      `./${wasmFile}`,
      "esbuild-wasm/esbuild.wasm",
    ],
  });
}
