import { build as esmBuild, BuildOptions, initialize, transform } from "esbuild-wasm";
import { makeEnv } from "../helpers";
import { wasmFile } from "./esbuildWASM";
import { fetchPlugin } from "./fetchPlugin";
import { importMapReplace } from "./importMapUtils";

interface ModuleInitializer {
  init: boolean | Promise<boolean>;
  initialize: (wasmModule: WebAssembly.Module) => Promise<boolean> | boolean;
}

declare const self: {
  mod: {
    init: boolean | Promise<boolean>;
    initialize: (
      wasmModule: WebAssembly.Module,
    ) => Promise<boolean> | boolean;
  };
};

const mod: ModuleInitializer = (globalThis as unknown as { mod: ModuleInitializer }).mod =
  (globalThis as unknown as { mod: ModuleInitializer }).mod || {
    init: false,
    initialize: async (wasmModule: WebAssembly.Module) => {
      if (mod.init === true) return true;
      await initialize({ wasmModule, worker: false });
      return mod.init = true;
    },
  };

const initializeModule = async (wasmModule?: WebAssembly.Module, origin?: string) => {
  if (mod.init) return;

  if (wasmModule) {
    await mod.initialize(wasmModule);
  } else if (origin) {
    await initialize({
      wasmURL: new URL(`${origin}/${wasmFile}`).toString(),
      worker: false,
    });
    mod.init = true;
  } else {
    throw new Error("Either wasmModule or origin must be provided");
  }
};

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
): Promise<string | { error: unknown }> => {
  try {
    await initializeModule(wasmModule, origin);

    const jsxImportSource = code.includes("@emotion/") ? "@emotion/react" : "react";

    const transformedCode = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      platform: "browser",
      minify: false,
      charset: "utf8",
      keepNames: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          jsxFragmentFactory: "Fragment",
          jsxImportSource,
        },
      },
      target: "es2024",
    });

    return importMapReplace(transformedCode.code, origin);
  } catch (error) {
    console.error("Error during transpilation:", error);
    return { error };
  }
};

const getDefaultBuildOptions = (
  codeSpace: string,
  origin: string,
  entryPoint?: string,
  external: string[] = [],
  splitting = false,
  format: "esm" | "iife" = "esm",
): BuildOptions => ({
  resolveExtensions: [
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".d.ts",
    ".css",
    ".json",
    ".mjs",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".woff",
    ".woff2",
    ".eot",
    ".otf",
    ".webp",
    ".wasm",
    ".ttf",
  ],
  loader: {
    ".js": "js",
    ".mjs": "js",
    ".json": "json",
    ".tsx": "tsx",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
    ".gif": "dataurl",
    ".svg": "dataurl",
    ".woff": "dataurl",
    ".woff2": "dataurl",
    ".eot": "dataurl",
    ".otf": "dataurl",
    ".ttf": "file",
    ".css": "css",
  },
  write: false,
  target: "esnext",
  outdir: `${origin}/live/${codeSpace}/api/my-cms/`,
  treeShaking: true,
  legalComments: "none",
  bundle: true,
  define: makeEnv("production"),
  keepNames: false,
  minifySyntax: true,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  splitting,
  external,
  format,
  platform: "browser",
  outExtension: { ".js": ".mjs", ".css": ".css" },
  entryPoints: entryPoint ? [entryPoint] : [`${origin}/live/${codeSpace}/wrapper.js`],
  plugins: [fetchPlugin()],
  assetNames: "assets/[name]-[hash]",
  publicPath: "/",
});

export const build = async ({
  codeSpace,
  origin,
  entryPoint,
  external = [],
  splitting = false,
  format = "esm",
  wasmModule,
}: {
  codeSpace: string;
  format: "esm" | "iife";
  origin: string;
  entryPoint?: string;
  external?: string[];
  splitting?: boolean;
  wasmModule?: WebAssembly.Module;
}): Promise<string | import("esbuild-wasm").OutputFile[] | { error: unknown } | undefined> => {
  try {
    await initializeModule(wasmModule, origin);
    const defaultOpts = getDefaultBuildOptions(codeSpace, origin, entryPoint, external, splitting, format);
    const result = await esmBuild(defaultOpts);

    return splitting ? result.outputFiles : result.outputFiles![0].text;
  } catch (error) {
    console.error("Error during build:", error);
    return { error };
  }
};

Object.assign(globalThis, { transpile, build });
