import { initialize, transform, version } from "esbuild-wasm";
import { importMapReplace } from "./importMapReplace";

declare const self:
  & ServiceWorkerGlobalScope
  & {
    mod: {
      init: boolean | NodeJS.Timeout;
      initialize: (wasmModule: WebAssembly.Module) => Promise<boolean> | boolean;
    };
  };

const mod = self.mod = self.mod
  || {
    init: false as (boolean | Promise<void> | NodeJS.Timeout),
    initialize: (wasmModule: WebAssembly.Module) =>
      (self.mod.init as boolean) || initialize({
        wasmModule,
        worker: false,
      }).then(() => self.mod.init = true) as Promise<boolean> | NodeJS.Timeout,
  };

export const transpile = async (code: string, origin: string, wasmModule?: WebAssembly.Module, codeShaSum = "") => {
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await (initFinished);
  } else {
    mod.init = mod.init || setTimeout(() => {
      initialize({
        wasmURL: `/esbuild-wasm@${version}/esbuild.wasm`,
        worker: false,
      }).then(() => {
        mod.init = true;
      });
    }, 5000);

    const offLoadToServer = (code: string) =>
      fetch(`https://js.spike.land?v=${swVersion}`, {
        method: "POST",
        body: code,
        headers: { TR_ORIGIN: origin },
      }).then(resp => resp.text());

    if (mod.init !== true) return offLoadToServer(code);
  }

  return transform(code, {
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
  }).then((x) => importMapReplace(x.code, origin, codeShaSum));
};

Object.assign(self, { transpile });
