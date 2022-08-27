// import "core-js/proposals/string-replace-all-stage-4";

import {initialize, transform, TransformOptions} from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";

const esbuild= {
  initialize,
  transform: async(code: string, options: TransformOptions)=>{
    if (options?.format==="esm")  return transform(code, options);
    return {
      code
  }
}
}
// import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false

export const init = async () => {
  try{
  if (initFinished === true) return esbuild;

  initFinished = initFinished || new Promise<boolean>(resolve => {

    esbuild.initialize(
      {
        wasmURL: wasmURL as unknown as string,  
      },
    ).then(()=>resolve(true))
  
  }) ;

  if (await initFinished === true) return esbuild;
  throw new Error("esbuild couldn't initialize");
  }catch{

  throw new Error("esbuild couldn't initialize");
  }finally{
    if (await initFinished === true) return esbuild
    throw new Error("esbuild couldn't initialize");
  }
};
