import { build, initialize, transform } from "esbuild-wasm";
import wasmFile from "esbuild-wasm/esbuild.wasm";
import { fetchPlugin } from "./fetchPlugin";
import { md5 } from "./md5";
import { unpkgPathPlugin } from "./unpkg-path-plugin";

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

  if (initFinished !== true) await (initFinished);

  globalThis.transformed = globalThis.transformed + 1 || 1;

  const transformed = await transform(code, opts);

  const regex1 = / from '\.\./gi;

  const regex2 = / from '\./gi;

  // 0123456

  const trp = transformed.code.replaceAll(
    regex1,
    ` from '${location.origin}/live/`,
  )
    .replaceAll(regex2, ` from '${location.origin}/live/`);

  return { ...transformed, code: `/*${md5(code)}*/` + trp };
};
const initAndBuild: typeof build = async (rawCode, opts) => {
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
  Object.assign(defaultOpts, opts);
  const b = await build(defaultOpts);
  return b.outputFiles![0].text;
};

export { initAndBuild as build };
export { initAndTransform as transform };
