import { getCommonBuildOptions } from "@/lib/esbuild-build-config";
import { environment } from "@/lib/esbuild-make-env";
import { build } from "@/lib/esbuild-operations";
import { copy } from "esbuild-plugin-copy";
import { readdir, readFile, stat, writeFile } from "fs/promises";
export type Environment = "development" | "production";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import path from "path";

const isProduction = environment === "production";

const createEntryPoints = async (dir: string): Promise<string[]> => {
  const files = await readdir(`src/@/${dir}`);
  return files.filter(Boolean).map((file) => `src/@/${dir}/${file}`);
};

const buildWorkerEntryPoint = async (entry: string): Promise<void> => {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: [`monaco-editor/esm/${entry}`],
    bundle: true,
    outExtension: { ".js": ".js" },
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: false,
    treeShaking: true,
    mangleQuoted: true,
    platform: "browser",
    format: "iife",
    outdir: "dist/@/monaco-editor/esm",
    minify: true,
  });
};

export async function buildWorkers(): Promise<void> {
  const workerEntryPoints = [
    "vs/language/json/json.worker.js",
    "vs/language/css/css.worker.js",
    "vs/language/html/html.worker.js",
    "vs/language/typescript/ts.worker.js",
    "vs/editor/editor.worker.js",
  ];

  await Promise.all(workerEntryPoints.map(buildWorkerEntryPoint));
}

export async function buildMainScripts(): Promise<void> {
  const workerFiles = await createEntryPoints("workers");

  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: workerFiles,
    format: "iife",
    outdir: "dist/@/workers",
    minify: true,
    outExtension: { ".js": ".js" },
  });
}

export const buildWasm = async (): Promise<void> => {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/esbuildWASM.ts"],
    format: "esm",
    outdir: "dist",
    minify: true,
  });
};

export async function buildTailwind(): Promise<void> {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/assets/shims.ts"],
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    outdir: "dist",
    minifyIdentifiers: true,
    mangleProps: /_$/,
    mangleQuoted: true,
    legalComments: "none",
    drop: ["console"],
    minifyWhitespace: true,
    target: "es2024",
  });
}

export async function buildServiceWorker(): Promise<void> {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: ["src/sw.ts"],
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,
    target: "es2024",
  });
}

const createAliases = async (dir: string): Promise<Record<string, string>> => {
  const files = await readdir(`src/@/${dir}`);
  return Object.fromEntries(
    files.map((file) => [
      `@/${dir}/${file}`.replace(/\.(ts|tsx)$/, ""),
      `/@/${dir}/${file.replace(/\.(ts|tsx)$/, ".mjs")}`,
    ]),
  );
};

const uiEntryPoints = await createEntryPoints("components/ui");
const libEntryPoints = await createEntryPoints("lib");
const externalEntryPoints = await createEntryPoints("external");
const appEntryPoints = await createEntryPoints("components/app");
const hooksEntryPoints = await createEntryPoints("hooks");

const standaloneEntryPoints = [
  ...uiEntryPoints,
  ...libEntryPoints,
  ...externalEntryPoints,
  ...appEntryPoints,
  ...hooksEntryPoints,
];

const extraAliases = {
  ...await createAliases("components/ui"),
  ...await createAliases("lib"),
  ...await createAliases("external"),
  ...await createAliases("components/app"),
  ...await createAliases("hooks"),
};

export async function buildMainBundle(wasmFile: string): Promise<void> {
  const buildOptions = getCommonBuildOptions(environment);

  await build({
    ...buildOptions,
    format: "esm",
    minifySyntax: isProduction,
    minifyIdentifiers: isProduction,
    minifyWhitespace: false,
    bundle: true,
    treeShaking: isProduction,
    mangleQuoted: false,
    sourcemap: false,
    splitting: false,
    target: "es2024",
    allowOverwrite: true,
    legalComments: "none",
    platform: "node",
    plugins: [
      ...buildOptions.plugins,
      copy({
        resolveFrom: "cwd",
        assets: [
          {
            from: ["./src/assets/*"],
            to: ["./dist/assets"],
          },
          {
            from: "./src/assets/manifest.json",
            to: "./dist",
          },
          {
            from: "./src/index.html",
            to: "./dist",
          },
          {
            from: "./src/assets/favicons/favicon.ico",
            to: "./dist",
          },
          {
            from: "./src/assets/favicons/chunk-chunk-fe2f7da4f9ccc2.png",
            to: "./dist/assets/favicons/chunk-chunk-fe2f7da4f9ccc2.png",
          },
        ],
      }),
    ],
    entryPoints: [
      "src/cf-esbuild.mjs",
      "src/modules.ts",
    ],
    alias: {
      ...buildOptions.alias,
      "@src/swVersion": "/swVersion.mjs",

      "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,

      ...(isProduction ? {} : {
        // "react": "preact/compat",
        // "react-dom": "preact/compat",
      }),
    },
    external: [
      ...(buildOptions.external ?? []),
      "esbuild-wasm",
      "/swVersion.mjs",
      `./${wasmFile}`,
      "esbuild-wasm/esbuild.wasm",
    ],
  });

  await build({
    ...buildOptions,
    splitting: false,
    format: "esm",
    minifySyntax: isProduction,
    minifyIdentifiers: isProduction,
    minifyWhitespace: false,
    bundle: false,
    treeShaking: isProduction,
    sourcemap: false,
    legalComments: "none",
    target: "es2024",
    external: undefined,
    alias: undefined,
    outdir: "dist/@/",
    platform: "browser",
    entryPoints: standaloneEntryPoints,
  });

  // console.log(JSON.stringify(extraAliases, null, 2));

  await build({
    ...buildOptions,
    splitting: true,
    format: "esm",
    minifySyntax: isProduction,
    minifyIdentifiers: isProduction,
    minifyWhitespace: false,
    bundle: true,
    treeShaking: isProduction,
    mangleQuoted: false,
    sourcemap: false,
    outdir: "dist/",
    target: "es2024",
    allowOverwrite: true,
    legalComments: "none",
    platform: "browser",
    plugins: [
      ...buildOptions.plugins,
    ],
    entryPoints: [
      "src/motion.ts",
      "src/emotion.ts",
      "src/reactMod.ts",
      "src/recharts.ts",
      "src/reactDom.ts",
      "src/reactDomClient.ts",
      "src/jsx.ts",
      "src/emotionJsxRuntime.ts",
    ],
    alias: {
      ...buildOptions.alias,
      // ...extraAliases,
      // ...buildOptions.alias,
      // "@src/swVersion": "/swVersion.mjs",
      // ...(isProduction ? {} : {
      // "react": "preact/compat",
      // "react-dom": "preact/compat",
      // }),
    },
    external: [
      ...Object.keys(extraAliases),
      // "/swVersion.mjs",
      // "esbuild-wasm/esbuild.wasm",
    ],
  });

  await build({
    ...buildOptions,
    splitting: false,
    format: "esm",
    minifySyntax: isProduction,
    minifyIdentifiers: isProduction,
    minifyWhitespace: false,
    bundle: true,
    treeShaking: isProduction,
    mangleQuoted: false,
    sourcemap: false,
    outdir: "dist/",
    target: "es2024",
    allowOverwrite: true,
    legalComments: "none",
    platform: "browser",
    mainFields: ["module", "main"],
    banner: {
      js:
        "import { createRequire } from '/module?bundle=true&exports=createRequire'; const require = createRequire(import.meta.url);",
    },

    plugins: [
      ...buildOptions.plugins,
    ],
    entryPoints: [
      "src/start.ts",
    ],
    alias: {
      ...buildOptions.alias,
      ...importMap.imports,
      ...extraAliases,
      // ...buildOptions.alias,
      // "@src/swVersion": "/swVersion.mjs",

      // ...(isProduction ? {} : {
      // "react": "preact/compat",
      // "react-dom": "preact/compat",
      // }),
    },
    external: [
      "/module",
      ...Object.values(importMap.imports),
      ...Object.values(extraAliases),
    ],
  });

  // await build({
  //   ...buildOptions,
  //   format: "esm",
  //   minifySyntax: isProduction,
  //   minifyIdentifiers: isProduction,
  //   minifyWhitespace: false,
  //   bundle: true,
  //   treeShaking: isProduction,
  //   mangleQuoted: false,
  //   sourcemap: false,
  //   splitting: false,
  //   target: "es2024",
  //   allowOverwrite: true,
  //   legalComments: "none",
  //   packages: "external",
  //   platform: "node",
  //   plugins: [
  //     ...buildOptions.plugins,
  //   ],
  //   entryPoints: [
  //     "src/cf-esbuild.mjs",
  //     "src/modules.ts",
  //   ],
  //   alias: {
  //     ...buildOptions.alias,
  //     "@src/swVersion": "/swVersion.mjs",

  //     "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,

  //     ...(isProduction ? {} : {
  //       // "react": "preact/compat",
  //       // "react-dom": "preact/compat",
  //     }),
  //   },
  //   external: [
  //     ...(buildOptions.external ?? []),
  //     "@/",
  //     "esbuild-wasm",
  //     "/swVersion.mjs",
  //     `./${wasmFile}`,
  //     "esbuild-wasm/esbuild.wasm",
  //   ],
  // });

  async function runImportMapReplaceOnAllFilesRecursive(dir: string): Promise<void> {
    try {
      const files = await readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = await stat(filePath);

        if (fileStat.isDirectory()) {
          // If it's a directory, recursively process its contents

          await runImportMapReplaceOnAllFilesRecursive(filePath);
        } else {
          // If it's a file, process it
          if (filePath.includes("worker")) continue;
          const content = await readFile(filePath, "utf8");
          const newContent = importMapReplace(content, "/");
          await writeFile(filePath, newContent);
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }

  runImportMapReplaceOnAllFilesRecursive("./dist/@");
}
