// import { createJsBlob } from "starter";
// import {comlink} from "comlink"
// import { hashCode } from "session";
// import comlinkUmd from "comlink/dist/umd/comlink.js"
import { TransformOptions } from "esbuild-wasm";
import { md5 } from "md5";
// import { m } from "framer-motion";

const mod = {
  hashMap: {} as unknown as { [key: string]: string },
  data: {} as unknown as {
    [key: string]: {
      code: string;
      deps: string[];
    };
  },
}


export const toUmd = async (source: string, name: string) => {
  const esbuild = await (await import("./esbuildEsm")).init();

  const hash = md5(source);
  mod.hashMap = { ...mod.hashMap, [hash]: name, [name]: hash };

  if (!mod.data[hash]) {
    const transformed = await esbuild.transform(source, {...opts,loader: name.includes(".tsx")?"tsx": name.includes(".ts")?"ts":name.includes(".jsx")?"jsx":"js",globalName: hash.replace(/[^a-f]/g, '')});
    mod.data = {
      ...mod.data,
      [hash]: {
        ...transformed,
        deps: findDeps(transformed.code),
      },
    };

    await Promise.all(mod.data[hash].deps.map(async (dep) => {
      if (mod.hashMap[dep]) return;

      const url = await import.meta.resolve!(dep, name);
      const urlHash = md5(url);
      if (mod.hashMap[urlHash]) return;
      mod.hashMap[urlHash] = url;
      const source = await (await fetch(url)).text();
      await toUmd(source, dep);
    }));
  }

  return mod;
};

// `importScripts("${comlinkUmd}");

// const mod = {
//   data: [];
// }
// };

// Comlink.expose(mod);

// var example = example || {};
// example.versions = example.versions || {};
// example.versions["1.0"] = (() => {
//   ...
//   var require_stdin = __commonJS((exports, module) => {
//     module.exports = "test";
//   });
//   return require_stdin();
// })();

// export function createJsBlob(code: string) {
//   const file = new File([code], "worker.js", {
//     type: "application/javascript",
//   });
//   const blobUrl = URL.createObjectURL(file);
//   return blobUrl;

//   new Worker(blobUrl)
// createJsBlob(

const opts = {
  loader: "tsx";
  format: "iife",
  globalName: "myAppp",
  treeShaking: true,
  tsconfigRaw: {
    "compilerOptions": {
      "jsx": "react-jsx",
      "jsxImportSource": "@emotion/react",
    },
  },
  target: "es2021",
} as unknown as TransformOptions;

const findDeps = (code: string) => {
  // Alternative syntax using RegExp constructor
  const regex = /require\(\"(.+?)\"\)/mg

  let m;
  const deps: string[] = [];

  while ((m = regex.exec(code)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {

     if (groupIndex==1) deps.push(match);
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
  return deps;
};
