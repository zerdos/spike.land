// import "core-js/proposals/string-replace-all-stage-4";

import esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";
import { resolve } from "path";
import { bool } from "prop-types";

// import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false
const mod = {
  initFinished: false,
  // build: esbuild.build,
  
};

let res: (Promise<boolean>)

export const init = async () => {
  if (initFinished === true) return esbuild;

  initFinished = initFinished || new Promise<boolean>(resolve => {

    esbuild.initialize(
      {
        wasmURL: wasmURL as unknown as string,  
      },
    ).then(()=>resolve(true))
  



  }) ;
  
  if (await initFinished === true) return esbuild;
};
