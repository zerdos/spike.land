import { build as esbuildBuild, type BuildOptions, initialize, transform, type TransformOptions } from "esbuild-wasm";
import wasmFile from "esbuild-wasm/esbuild.wasm";
import { fetchPlugin } from "./fetchPlugin";
import { imports as importMapImports } from "./importmap.json";
import { md5 } from "./md5";
import { unpkgPathPlugin } from "./unpkg-path-plugin";

import localForage from "localforage";
const transformCache = localForage.createInstance({
  name: "transformCache",
});

const mod = {
  init: false as (boolean | Promise<void>),
  initialize: () => {
    if (mod.init !== false) return mod.init;
    const wasmURL = new URL(wasmFile, location.origin).toString();
    mod.init = initialize({
      wasmURL,
    }).then(() => mod.init = true) as Promise<void>;
    return mod.init;
  },
};

export const initAndTransform = async (code: string, opts: TransformOptions) => {
  const initFinished = mod.initialize();

  const cacheKey = md5(code + opts?.format!);

  const item = await transformCache.getItem<string>(cacheKey);
  if (item) return { code: item };

  if (initFinished !== true) await (initFinished);

  const transformed = await transform(code, { ...opts, define: { ...define, ...(opts?.define ? opts.define : {}) } });

  const trp = importMapReplace(transformed.code); // .split("dataset").join("attributes");

  const res = { code: `/*${md5(code)}*/` + trp };
  await transformCache.setItem(cacheKey, res.code);
  return res;
};

const define = {
  "process.env.NODE_ENV": `"production"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": "\"1.1.1\"",
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  // "libFileMap": JSON.stringify({}),
  process: JSON.stringify({
    env: {
      NODE_ENV: `production`,
      browser: true,
      NODE_DEBUG: false,
      DEBUG: false,
      isBrowser: true,
    },
    browser: true,
  }),
};
const build = async (codeSpace: string, i: number) => {
  const initFinished = mod.initialize();
  // const rawCode = await fetch(`${location.origin}/live/${codeSpace}/index.js`).then(x => x.text());

  if (initFinished !== true) await (initFinished);
  const defaultOpts: BuildOptions = {
    bundle: true,
    write: false,
    format: "iife",
    entryPoints: [`./live/${codeSpace}/render.tsx/${i}`],
    define,
    tsconfig: "./tsconfig.json",
    plugins: [unpkgPathPlugin, fetchPlugin],
  };
  const b = await esbuildBuild(defaultOpts);
  return b.outputFiles![0].text;
};

export { build };
export { initAndTransform as transform };

function importMapReplace(codeInp: string) {
  const items = Object.keys(importMapImports) as (keyof typeof importMapImports)[];
  let returnStr = codeInp;

  items.map((lib: keyof typeof importMapImports) => {
    const uri = (new URL(importMapImports[lib], location.origin)).toString();
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      ` from "${uri}"`,
    ).replaceAll(
      ` from './`,
      ` from 'https://${location.host}/live/`,
    );
  });

  return returnStr;
}
