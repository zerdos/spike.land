import { build as esbuildBuild, initialize, transform } from "esbuild-wasm";
import wasmFile from "esbuild-wasm/esbuild.wasm";
import localForage from "localforage";
import { fetchPlugin } from "./fetchPlugin";
import { md5 } from "./md5";
import { unpkgPathPlugin } from "./unpkg-path-plugin";

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

export const initAndTransform: typeof transform = async (code, opts) => {
  const initFinished = mod.initialize();

  const cacheKey = md5(code + opts?.format!);

  const item = await transformCache.getItem(cacheKey);
  if (item) return { code: item };

  if (initFinished !== true) await (initFinished);

  const transformed = await transform(code, opts);

  const trp = transformed.code.split(` from '..`).join(` from '${location.origin}/live`).split(` from '.`).join(
    ` from '${location.origin}/live`,
  );

  const res = { ...transformed, code: `/*${md5(code)}*/` + trp };
  await transformCache.setItem(cacheKey, res.code);
  return res;
};
const build = async (rawCode: string) => {
  const initFinished = mod.initialize();

  if (initFinished !== true) await (initFinished);
  const defaultOpts = {
    bundle: true,
    write: false,
    entryPoints: ["index.js"],
    define: {
      "process.env.NODE_ENV": "\"production\"",
      global: "window",
    },
    plugins: [unpkgPathPlugin(rawCode), fetchPlugin(rawCode)],
  };
  const b = await esbuildBuild(defaultOpts);
  return b.outputFiles![0].text;
};

export { build };
export { initAndTransform as transform };
