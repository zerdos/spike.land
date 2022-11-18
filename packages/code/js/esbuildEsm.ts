import { build, initialize, transform } from "esbuild-wasm";
import wasmFile from "esbuild-wasm/esbuild.wasm";
import { md5 } from "./md5";

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
const initAndBuild: typeof build = async (code, opts) => {
  const initFinished = mod.initialize();

  if (initFinished !== true) await (initFinished);
  const build = await build(opts);
  return build;
};

export { initAndBuild as build };
export { initAndTransform as transform };
