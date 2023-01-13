import { initialize, transform, version } from "esbuild-wasm";
import { importMapReplace } from "./importMapReplace";

const init = initialize({
  wasmURL: `${location.origin}/esbuild-wasm@${version}/esbuild.wasm`,
  worker: false,
});

export const transpile = (code: string) =>
  init.then(() =>
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
    }).then((x) => importMapReplace(x.code, location.origin, location.origin))
  );

Object.assign(self, { transpile });
