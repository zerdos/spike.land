import { initialize, transform, version } from "esbuild-wasm";
import { importMapReplace } from "./importMapReplace";

const mod = {
  init: false as (boolean | Promise<void>),
  initialize: (wasmModule: WebAssembly.Module) =>
    mod.init || initialize({
      wasmModule,
      worker: false,
    }).then(() => mod.init = true) as Promise<void>,
};

export const transpile = (code: string, origin: string, wasmModule?: WebAssembly.Module) =>
  (wasmModule
    ? (async () => {
      const initFinished = mod.initialize(wasmModule);

      if (initFinished !== true) await (initFinished);
    })()
    : (async () => {
      return mod.init = mod.init || initialize({
        wasmURL: `/esbuild-wasm@${version}/esbuild.wasm`,
        worker: false,
      }).then(() => mod.init = true) as Promise<void>;
    })()).then(() =>
      transform(code, {
        loader: "tsx",
        format: "esm",
        treeShaking: true,
        platform: "browser",
        minify: false,
        //   globalName: md5(code),
        keepNames: true,
        tsconfigRaw: {
          compilerOptions: {
            jsx: "react-jsx",
            useDefineForClassFields: false,
            jsxFragmentFactory: "Fragment",
            jsxImportSource: "@emotion/react",
          },
        },
        target: "es2022",
      }).then((x) => importMapReplace(x.code, origin))
    );

Object.assign(self, { transpile });
