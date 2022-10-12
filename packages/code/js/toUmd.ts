// Import { createJsBlob } from "starter";
// import {comlink} from "comlink"
// import { hashCode } from "session";
// import comlinkUmd from "comlink/dist/umd/comlink.js"
// Import { string } from "prop-types";
import { md5 } from "./md5.js";
import "es-module-shims"
// Import { m } from "framer-motion";

const mod = {
  toJs(name: string): string {
    
    const debts = "var modZ =  {"+ Object.keys(mod.data).map(k=>[`"${mod.hashMap[k]}"`, k.replace(/[^a-f]/g, ""),]).map(x=>x[0] + ": "+ x[1]).join(", \n ") + "}";



    let js =   Object.keys(mod.data).map(key=>mod.data[key].code).join( "\n") + debts + `
    
    function require(name) {
      return modZ[name]()
     }
  
     require("${name}");
    
    `;

    console.log({js});
    return js;
    
    // const md5Name = mod.hashMap[name];
    // const data = mod.data[md5Name];
    // if (!data) {
    //   console.error(`cant resolve ${name}`);
    //   return "";
    // }

    // return (mqmd5Name].code +
    //   mod.data[md5Name].deps.map((name) => mod.toJs(name)).join(
    //     "\n",
    //   ));
  },
  hashMap: {} as unknown as Record<string, string>,
  // ToJs: (name: string)=>{
  //   const md5Name = md5(name);
  //   return mod.data[md5Name].code +  mod.data[md5Name].deps.map(dep=>mod.toJs(dep)).join() as unknown as string
  // },
  data: {} as unknown as Record<string, {
    code: string;
    deps: string[];
  }>,
};

export const toUmd = async (source: string, name: string) => {
  const {transform} = await import("./esbuildEsm")

  const hash = md5(source);
  mod.hashMap = { ...mod.hashMap, [hash]: name, [name]: hash };

  if (!mod.data[hash]) {
    const transformed = await transform(source, {
      format: "iife",
      treeShaking: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          jsxImportSource: "@emotion/react",
        },
      },
      target: "es2021",

      loader: name.includes(".tsx")
        ? "tsx"
        : (name.includes(".ts") ? "ts" : name.includes(".jsx") ? "jsx" : "js"),
      globalName: hash.replace(/[^a-f]/g, ""),
    });
    if (!transformed || !transformed.code) {
      console.log("transform result -code is empty");
      return;
    }

    mod.data = {
      ...mod.data,
      [hash]: {
        ...transformed,
        deps: findDeps(transformed.code),
      },
    };

    await Promise.all(mod.data[hash].deps.map(async (dep) => {
      if (mod.hashMap[dep]) {
        return;
      }

      const importMap = importShim.getImportMap();

      let url = "";
      let urlHash = "";
      if (importMap.imports[dep]) {
        url = importMap.imports[dep];
        urlHash = md5(dep);
      } else if (dep.startsWith("./")) {
        url = new URL(dep, location.origin).toString();
        urlHash = md5(dep);
      } else {
        try {
          url = await importShim.resolve!(dep, name);
          urlHash = md5(dep);
        } catch {
          console.error(`failed to resolve: ${dep}`);
          return;
        }
      }

      if (mod.hashMap[urlHash]) {
        return;
      }

      mod.hashMap[dep] = url;
      const source = await (await fetch(url)).text();

      return toUmd(source, dep);
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


const findDeps = (code: string) => {
  // Alternative syntax using RegExp constructor
  const regex = /require\("(.+?)"\)/gm;

  let m;
  const deps: string[] = [];

  while ((m = regex.exec(code)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    for (const [groupIndex, match] of m.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }

      console.log(`Found match, group ${groupIndex}: ${match}`);
    }
  }

  return deps;
};
