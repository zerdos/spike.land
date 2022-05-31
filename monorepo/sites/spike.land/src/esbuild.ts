
import esbuild from "esbuild";


const regex1 = / from \"\.\./ig;

const regex2 = / from \"\./ig;

export function transform(code: string) {


    esbuild.transformSync(
    `/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";


    ${code}
    ` ,
      {
        loader: "tsx",
        target: "esnext",
      },
    ).replaceAll(regex1, ' from "https://spike.land/live').replaceAll(regex2, ' from "https://spike.land/live') + '/** BOO */' ;
  

  // const endTime = performance.now();

  // console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
}
