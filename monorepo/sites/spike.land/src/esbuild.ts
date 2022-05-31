
import esbuild from "esbuild";


const regex1 = / from \"\.\./ig;

const regex2 = / from \"\./ig;

export async function transform(code: string) {
  //const startTime = performance.now();



    //

    let result = await esbuild.transform(
      `/** @jsx jsX */
    import {jsx as jsX} from "@emotion/react";
    ` +
        code,
      {
        loader: "tsx",
        target: "esnext",
      },
    );
    
    return result.code.replaceAll(regex1, ' from "https://spike.land/live')
      .replaceAll(regex2, ' from "https://spike.land/live');
  

  // const endTime = performance.now();

  // console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
}
