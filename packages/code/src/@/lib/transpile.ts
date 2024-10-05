import { fetchPlugin } from "@/lib/esbuild-fetch-plugin";
import { makeEnv } from "@/lib/esbuild-make-env";
import importMap from "@/lib/importmap-utils";
import { wasmFile } from "@src/esbuildWASM";
import { Mutex } from "async-mutex";
import type { BuildOptions } from "esbuild-wasm";
import { build as esmBuild, initialize, transform } from "esbuild-wasm";

export { wasmFile };

interface ModuleInitializer {
  init: boolean | Promise<boolean>;
  initialize: (wasmModule: WebAssembly.Module) => Promise<boolean> | boolean;
}

const mod: ModuleInitializer = {
  init: false,
  initialize: async (wasmModule: WebAssembly.Module) => {
    if (mod.init === true) return true;
    await initialize({ wasmModule, worker: false });
    return mod.init = true;
  },
};

const mutex = new Mutex();

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
  { code, originToUse, wasmModule }: { code: string; originToUse: string; wasmModule?: WebAssembly.Module },
): Promise<string | { error: unknown }> => {
  return mutex.runExclusive(async () => {
    try {
      await initializeModule(wasmModule, originToUse);

      try {
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
              jsxImportSource: "@emotion/react",
            },
          },
          target: "es2024",
        });

        return transformedCode.code;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error during transpile:", error.message);
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during transpile:", error.message);
      }
      throw error;
    }
  });
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
    ".webp": "dataurl",
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
  plugins: [fetchPlugin(origin)],
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
}) => {
  return mutex.runExclusive(async () => {
    try {
      await initializeModule(wasmModule, origin);
      const defaultOpts = getDefaultBuildOptions(codeSpace, origin, entryPoint, external, splitting, format);
      const result = await esmBuild({
        ...defaultOpts,
        external: [
          ...Object.keys(importMap.imports),
        ],
      });

      return splitting ? result.outputFiles : result.outputFiles![0].text;
    } catch (error) {
      console.error("Error during build:", error);
      return { error };
    }
  });
};

Object.assign(globalThis, { transpile, build });
