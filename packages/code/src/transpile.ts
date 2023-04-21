import { initialize, transform } from "esbuild-wasm";
import { wasmFile } from "./esbuildWASM";
import { wait } from "./wait";

declare const self:
  & ServiceWorkerGlobalScope
  & {
    mod: {
      init: boolean | Promise<boolean>;
      initialize: (
        wasmModule: WebAssembly.Module,
      ) => Promise<boolean> | boolean;
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

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
) => {
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await (initFinished);
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => {
      return mod.init = true;
    });

    const offLoadToServer = (code: string) =>
      fetch(`https://js.spike.land?v=${swVersion}`, {
        method: "POST",
        body: code,
        headers: { TR_ORIGIN: origin },
      }).then((resp) => resp.text());
    if (mod.init !== true) await wait(1000);
    if (mod.init !== true) return offLoadToServer(code);
  }

  return transform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
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
    target: "chrome88",
  }).then((x) => x.code);
};

Object.assign(self, { transpile });
