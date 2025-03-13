import { fetchPlugin } from "./esbuild-fetch-plugin";
import { makeEnv } from "./esbuild-make-env";
import { importMap } from "@/lib/importmap-utils";
import { Mutex } from "async-mutex";
import type { BuildOptions } from "esbuild-wasm";
import { build as esmBuild, initialize, transform } from "esbuild-wasm";
import { wasmFile } from "../../esbuildWASM";

export { wasmFile };

export type MyBuildOptions = BuildOptions & {
  codeSpace: string;
  origin: string;
  wasmModule?: WebAssembly.Module;
};

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

const initializeModule = async (
  wasmModule?: WebAssembly.Module,
  origin?: string,
) => {
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
  { code, originToUse, wasmModule }: {
    code: string;
    originToUse: string;
    wasmModule?: WebAssembly.Module;
  },
): Promise<string | { error: unknown; }> => {
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

const getDefaultBuildOptions = ({
  metafile = false,
  entryPoints,
  external,
  origin,
  codeSpace,
  splitting,
  format,
}: MyBuildOptions) => ({
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
    ".js": "jsx" as const,
    ".jsx": "jsx" as const,

    ".mjs": "js" as const,
    ".json": "json" as const,
    ".tsx": "tsx" as const,
    ".png": "dataurl" as const,
    ".jpg": "dataurl" as const,
    ".jpeg": "dataurl" as const,
    ".gif": "dataurl" as const,
    ".svg": "dataurl" as const,
    ".woff": "dataurl" as const,
    ".webp": "dataurl" as const,
    ".woff2": "dataurl" as const,
    ".eot": "dataurl" as const,
    ".otf": "dataurl" as const,
    ".ttf": "file" as const,
    ".css": "css" as const,
  },
  write: false,
  target: "es2024",
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
  metafile,
  tsconfigRaw: {
    compilerOptions: {
      jsx: "react-jsx",
      jsxFragmentFactory: "Fragment",
      jsxImportSource: "@emotion/react",
    },
  },
  format,
  platform: "browser",
  outExtension: { ".js": ".mjs", ".css": ".css" },
  entryPoints: entryPoints
    ? [entryPoints]
    : [`${origin}/live/${codeSpace}/wrapper.js`],
  plugins: [fetchPlugin(origin)],
  assetNames: "assets/[name]-[hash]",
  publicPath: "/",
});

export const build = async ({
  codeSpace,
  origin,
  entryPoints,
  external = [],
  splitting = false,
  wasmModule = undefined,
  metafile = false,
  format = "esm",
}: MyBuildOptions) => {
  return mutex.runExclusive(async () => {
    try {
      await initializeModule(wasmModule, origin);
      const defaultOpts = getDefaultBuildOptions(
        {
          codeSpace,
          origin,
          entryPoints,
          external,
          metafile,
          splitting,
          format,
        },
      );

      const buildOptions = {
        ...defaultOpts,
        external: [
          ...Object.keys(importMap.imports),
        ],
        entryPoints: entryPoints
          ? entryPoints
          : [`${origin}/live/${codeSpace}/index.tsx`], // Ensure this matches the expected type
        // ... other properties
      } as BuildOptions;

      const result = await esmBuild(buildOptions);

      return splitting ? result.outputFiles : result.outputFiles![0].text;
    } catch (error) {
      console.error("Error during build:", error);
      return { error };
    }
  });
};

Object.assign(globalThis, { transpile, build });
