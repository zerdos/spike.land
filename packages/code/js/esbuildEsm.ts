import { Mutex } from "async-mutex";
;


// import "core-js/proposals/string-replace-all-stage-4";

import {initialize, transform, TransformOptions} from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";
const mutex = new Mutex();

const esbuild= {
  initialize,
  transform: async(code: string, options: TransformOptions)=>await mutex.runExclusive(async () => {
      try{
      console.info(`esbuld start`);


    // if (options?.format==="esm") {
      const transformObj = await transform(code, options);
      console.info(`esbuld transpile done`)
    return transformObj
}catch{
 console.error ("Ebuild transform errror: ", {code, name}) 
 return {
  code: `console.error("ESBULD TRANSFORM ERROR")`
 }
}})}
// import type { transform } from "esbuild/lib/main";

let initFinished: Promise<boolean> | boolean = false

export const init = async () => {
  try{
  if (initFinished === true) return esbuild;

  initFinished = initFinished || new Promise<boolean>(resolve => {

    esbuild.initialize(
      {
        wasmURL: new URL(wasmURL, import.meta.url).toString()
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
