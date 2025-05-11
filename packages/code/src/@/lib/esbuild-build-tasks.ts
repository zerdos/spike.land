import { copy } from "esbuild-plugin-copy";
import { readdir, readFile, stat, writeFile } from "fs/promises"; // Assuming these are Node.js fs/promises
import { getCommonBuildOptions } from "./esbuild-build-config.ts";
import { environment } from "./esbuild-make-env.ts";
import { tryCatch } from "./try-catch.ts"; // Added import
import { build } from "./esbuild-operations.ts";
export type Environment = "development" | "production";
import path from "path";
import { importMapReplace } from "./importmap-utils.ts";
// import path from "path";

const isProduction = environment === "production";

const createEntryPoints = async (dir: string): Promise<string[]> => {
  const result: string[] = [];

  async function processDirectory(
    currentDir: string,
    basePath: string,
  ): Promise<void> {
    const { data: items, error: readdirError } = await tryCatch(readdir(path.join(basePath, currentDir)));
    if (readdirError || !items) {
      console.error(`Error reading directory ${path.join(basePath, currentDir)}:`, readdirError);
      return; // Skip this directory if readdir fails
    }

    for (const item of items) {
      const itemPath = path.join(basePath, currentDir, item);
      const { data: itemStat, error: statError } = await tryCatch(stat(itemPath));

      if (statError || !itemStat) {
        console.error(`Error getting stats for ${itemPath}:`, statError);
        continue; // Skip this item if stat fails
      }

      if (itemStat.isDirectory()) {
        await processDirectory(path.join(currentDir, item), basePath);
      } else if (!item.endsWith(".d.ts") && !item.endsWith(".md")) {
        result.push(path.join(basePath, currentDir, item));
      }
    }
  }

  const { error } = await tryCatch(processDirectory(dir, "src/@"));
  if (error) {
    console.error(`Error creating entry points for directory ${dir}:`, error);
    return []; // Return empty if top-level processing fails
  }
  return result;
};

const buildWorkerEntryPoint = async (entry: string): Promise<void> => {
  await build({
    ...getCommonBuildOptions(environment),
    entryPoints: [`monaco-editor/esm/${entry}`],
    bundle: true,
    outExtension: { ".js": ".js" },
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true,
    legalComments: "none",
    sourcemap: false,
    keepNames: false,
    mangleProps: /_$/,
    mangleCache: { "_": false },
    mangleQuoted: true,
    ignoreAnnotations: false,
    platform: "browser",
    target: "es2024",
    format: "iife",
    outdir: "dist/@/workers/monaco",
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
    ...getCommonBuildOptions("production"),
    entryPoints: workerFiles,
    format: "iife",
    outdir: "dist/@/workers",
    bundle: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    treeShaking: true,
    legalComments: "none",
    sourcemap: false,
    loader: {
      ...getCommonBuildOptions("production").loader,
      ".css": "text",
    },
    keepNames: false,
    mangleProps: /_$/,
    mangleCache: { "_": false },
    mangleQuoted: true,
    platform: "browser",
    external: [
      "worker_threads",
    ],
    minify: false,
    ignoreAnnotations: false,

    outExtension: { ".js": ".js" },
  });

  await build({
    ...getCommonBuildOptions("production"),
    entryPoints: workerFiles,
    format: "esm",
    outdir: "dist/@/workers",
    bundle: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    treeShaking: true,
    legalComments: "none",
    sourcemap: false,
    loader: {
      ...getCommonBuildOptions("production").loader,
      ".css": "text",
    },
    keepNames: false,
    mangleProps: /_$/,
    mangleCache: { "_": false },
    mangleQuoted: true,
    platform: "browser",
    external: [
      "worker_threads",
      "react",
      "react-dom",
      "preact",
      "preact/compat",
      "preact/hooks",
      "@emotion/react",
      "@emotion/styled",
    ],
    minify: false,
    ignoreAnnotations: false,

    outExtension: { ".js": ".mjs" },
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

export async function buildServiceWorker(): Promise<void> {
  await build({
    ...getCommonBuildOptions("production"),
    entryPoints: ["src/sw.ts"],
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: false,
    minifyIdentifiers: false,
    bundle: true,
    treeShaking: true,
    external: [
      "worker_threads",
    ],
    minifyWhitespace: false,
    target: "es2024",
  });

  await build({
    ...getCommonBuildOptions("production"),
    entryPoints: ["src/sw-deps.ts"],
    format: "iife",
    outExtension: { ".js": ".js" },
    minifySyntax: true,
    minifyIdentifiers: true,
    treeShaking: true,
    external: [
      "worker_threads",
    ],
    minifyWhitespace: true,
    target: "es2024",
  });
}

const createAliases = async (dir: string): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};

  async function processDirectory(
    currentDir: string,
    basePath: string,
  ): Promise<void> {
    const { data: items, error: readdirError } = await tryCatch(readdir(path.join(basePath, currentDir)));
    if (readdirError || !items) {
      console.error(`Error reading directory ${path.join(basePath, currentDir)} for aliases:`, readdirError);
      return;
    }

    for (const item of items) {
      const itemPath = path.join(basePath, currentDir, item);
      const { data: itemStat, error: statError } = await tryCatch(stat(itemPath));
      if (statError || !itemStat) {
        console.error(`Error getting stats for ${itemPath} for aliases:`, statError);
        continue;
      }

      if (itemStat.isDirectory()) {
        await processDirectory(path.join(currentDir, item), basePath);
      } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
        const relativePath = path.join(currentDir, item);
        const importPath = `@/${relativePath}`.replace(/\.(ts|tsx)$/, "");
        const targetPath = `/@/${relativePath.replace(/\.(ts|tsx)$/, ".mjs")}`;
        result[importPath] = targetPath;
      }
    }
  }

  const { error } = await tryCatch(processDirectory(dir, "src/@"));
  if (error) {
    console.error(`Error creating aliases for directory ${dir}:`, error);
    return {}; // Return empty if top-level processing fails
  }
  return result;
};

const uiEntryPoints = await createEntryPoints("components/ui");

const appEntryPoints = await createEntryPoints("components/app");
const libEntryPoints = await createEntryPoints("lib");
const externalEntryPoints = await createEntryPoints("external");
const hooksEntryPoints = await createEntryPoints("hooks");
// const configEntryPoints = await createEntryPoints("config");
const servicesEntryPoints = await createEntryPoints("services");
// const workflows = await createEntryPoints("workflows");
// const tools   = await createEntryPoints("tools");

const standaloneEntryPoints = [
  ...uiEntryPoints,
  ...libEntryPoints,
  ...externalEntryPoints,
  ...appEntryPoints,
  ...hooksEntryPoints,
  // ...configEntryPoints,
  ...servicesEntryPoints,
  // ...workflows,
  // ...tools,
];

const extraAliases = {
  ...await createAliases("components/ui"),
  ...await createAliases("components/app"),
  ...await createAliases("lib"),
  ...await createAliases("external"),
  ...await createAliases("hooks"),
  ...await createAliases("services"),
  // ...await createAliases("workflows"),
  // ...await createAliases("tools"),
  // ...await createAliases("config"),
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
    plugins: [],
    entryPoints: [
      "src/cf-esbuild.mjs",
      "src/modules.ts",
    ],
    alias: {
      ...buildOptions.alias,
      "@src/swVersion": "/swVersion.mjs",

      "esbuild-wasm/esbuild.wasm": `./${wasmFile}`,
      // ...(isProduction ? {} : {
      "react": "preact/compat",
      "react-dom": "preact/compat",
      // }),
    },
    external: [
      "module",
      "string_decoder",
      "ts-md5",
      "node-html-parser",
      "immutable",
      "fast-diff",
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
    minifySyntax: false,
    minifyIdentifiers: false,
    minifyWhitespace: false,
    bundle: false,
    treeShaking: false,
    sourcemap: false,
    ignoreAnnotations: false,
    legalComments: "none",
    target: "es2024",
    external: undefined,
    alias: undefined,
    outdir: "./dist/@/",
    platform: "browser",
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
            from: "./src/assets/manifest.webmanifest",
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
      "src/emotion.ts",
      "src/emotionStyled.ts",
      "src/reactMod.ts",
      "src/reactDom.ts",
      "src/start.ts",
      "src/reactDomServer.ts",
      "src/reactDomClient.ts",
      "src/jsx.ts",
      "src/emotionJsxRuntime.ts",
    ],
    alias: {
      ...buildOptions.alias,
      ...extraAliases,
      // ;,
      // ...(isProduction ? {} : {
      //   "react": "preact/compat",
      //   "react-dom": "preact/compat",
      // }),
    },
    external: [
      ...Object.values(extraAliases),
    ],
  });

  async function runImportMapReplaceOnAllFilesRecursive(
    dir: string,
  ): Promise<void> {
    const processDir = async () => {
      const { data: files, error: readdirError } = await tryCatch(readdir(dir));
      if (readdirError || !files) {
        console.error(`Error reading directory ${dir} for import map replacement:`, readdirError);
        return;
      }

      for (const file of files) {
        const filePath = path.join(dir, file);
        const { data: fileStat, error: statError } = await tryCatch(stat(filePath));
        if (statError || !fileStat) {
          console.error(`Error getting stats for ${filePath} for import map replacement:`, statError);
          continue;
        }

        if (fileStat.isDirectory()) {
          await runImportMapReplaceOnAllFilesRecursive(filePath); // Recursive call
        } else {
          if (filePath.includes("worker")) continue;
          const { data: content, error: readFileError } = await tryCatch(readFile(filePath, "utf8"));
          if (readFileError || content === null || content === undefined) {
            console.error(`Error reading file ${filePath} for import map replacement:`, readFileError);
            continue;
          }
          const newContent = importMapReplace(content);
          const { error: writeFileError } = await tryCatch(writeFile(filePath, newContent));
          if (writeFileError) {
            console.error(`Error writing file ${filePath} for import map replacement:`, writeFileError);
          }
        }
      }
    };
    const { error } = await tryCatch(processDir());
    if (error) {
      // This top-level error might catch issues from the initial readdir(dir) if not handled inside processDir
      console.error(`Error processing directory ${dir} for import map replacement (outer):`, error);
    }
  }

  runImportMapReplaceOnAllFilesRecursive("./dist/@");
}
