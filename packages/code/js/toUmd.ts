// Import { createJsBlob } from "starter";
// import {comlink} from "comlink"
// import { hashCode } from "session";
// import comlinkUmd from "comlink/dist/umd/comlink.js"
// Import { string } from "prop-types";

import { transform } from "./esbuildEsm";
import { md5 } from "./md5.js";

import importmap from "./importmap.json";

import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

const imp: { [key: string]: string } = { ...importmap.imports };

const importMasRes: { [k: string]: string } = {};
Object.keys(imp).map((k) => Object.assign(importMasRes, { [k]: location.origin + imp[k] }));

// import "es-module-shims";
// Import { m } from "framer-motion";

const mod = {
  printR(name: string, included: { [modZkey: string]: boolean }): string {
    if (included[mod.hashMap[name]]) return "";
    included[mod.hashMap[name]] = true;

    const current = mod.data[mod.hashMap[name]];
    if (!current) console.error(name + " is missing!");
    const currentCode = current.code;
    if (!current.deps || !current.deps.length) {
      return currentCode;
    }

    // current.code = '';
    const myDepts = [...current.deps];
    // current.deps=[]

    const depts = myDepts.map((name) => mod.printR(name, included)).join(
      " \n ",
    );

    return depts + `
    
    ` + currentCode;
  },

  toJs: async (name: string) => {
    // while ((Date.now() - mod.last) / 1000 < 4) {
    //   console.log((Date.now() - mod.last) / 1000);
    //   await wait(1000);
    // }
    const js = mod.printR(name, {});

    let reverseMap: { [key: string]: string } = {};

    Object.keys(mod.hashMap).forEach((key) => reverseMap = { ...reverseMap, [mod.hashMap[key]]: key });

    let modZ: { [key: string]: string } = {};
    Object.keys(mod.data).forEach((k) => modZ = { ...modZ, [reverseMap[k]]: k });
    Object.keys(importMasRes).forEach((k) => modZ = { ...modZ, [k]: "getName(`" + importMasRes[k] + "`)" });

    //  Object.keys(mod.data).map(key=>mod.data[key].code).join( "\n") + debts +
    const res = `
     ${js}




  
  function require(name){


      const importmap = ${JSON.stringify(importmap.imports)};
    
      const urlName = new URL(name, location.origin).toString();
 
      if (globalThis.globalNames[name]) return  globalThis.globalNames[name];     
      if (globalThis.globalNames[urlName]) return  globalThis.globalNames[urlName];
      if (importmap[name]) return require(importmap[name])
      if (!name.includes("/npm:")){
      const npmUrl = new URL('/npm:*'+name+"?bundle&external=@emotion/*,react*,react ", location.origin).toString()
      return require(npmUrl);
    }

  
  }
    
     `;

    // const t = await transform(res, {
    //   format: "esm",
    //   minify: true,
    //   keepNames: true,
    //   platform: "neutral",
    //   treeShaking: true,
    // });

    // const c = await transform(t.code, {
    //   format: "iife",
    //   minify: true,
    //   keepNames: true,
    //   platform: "neutral",
    //   treeShaking: true,
    // });

    return res;
  },
  last: 0,
  hashMap: {} as { [key: string]: string },
  // ToJs: (name: string)=>{
  //   const md5Name = md5(name);
  //   return mod.data[md5Name].code +  mod.data[md5Name].deps.map(dep=>mod.toJs(dep)).join() as unknown as string
  // },
  data: {} as unknown as Record<string, {
    code: string;
    deps: string[];
  }>,
};

const findDeps = (code: string) => {
  // Alternative syntax using RegExp constructor
  const regex = /require\("(.+?)"\)/gm;

  let m;
  const deps: string[] = [];

  while ((m = regex.exec(code)) !== null) {
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
export const toUmd = async (source: string, name: string) => {
  //  const tr=  await build(source, {});

  //  return {
  //   toJs: ()=>tr
  //  }
  console.log("toUmd: " + name);
  const hash = md5(source);
  mod.hashMap = { ...mod.hashMap, [name]: hash };

  if (mod.data[hash]) return mod;
  //  mod.last = Date.now();

  try {
    mod.data[hash] = {
      code: (await transform(source, {
        format: "iife",
        keepNames: true,
        treeShaking: true,
        // sourcefile: name,

        ignoreAnnotations: true,
        target: "es2022",
        // tsconfigRaw: {
        //   compilerOptions: {
        //     jsx: "react-jsx",
        //     useDefineForClassFields: false,
        //     jsxImportSource: "@emotion/react",
        //   },
        // },

        loader: "ts",
        globalName: hash,
      })).code,
      deps: [],
    };
  } catch {
    mod.data[hash] = {
      code: (await transform(source, {
        format: "iife",
        keepNames: true,
        treeShaking: true,
        // sourcefile: name,
        define: {
          "globalThis.workerDom": JSON.stringify(true),
          "process.env.NODE_ENV": `"production"`,
          "process.env.NODE_DEBUG": JSON.stringify(false),
          "process.browser": JSON.stringify(true),
          "process.env.DEBUG": JSON.stringify(false),
          "isBrowser": JSON.stringify(true),
          "isJest": JSON.stringify(false),
          "process.env.version": "\"1.1.1\"",
          global: "globalThis",
          "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
        },

        ignoreAnnotations: true,
        target: "es2022",
        tsconfigRaw: {
          compilerOptions: {
            jsx: "react-jsx",
            useDefineForClassFields: false,
            jsxImportSource: "@emotion/react",
          },
        },

        loader: "tsx",
        globalName: hash,
      })).code,
      deps: [],
    };
  }
  mod.data[hash].code = mod.data[hash].code + `
  
  globalThis.globalNames = globalThis.globalNames || {};
  globalThis.globalNames["${name}"] =  ${hash}  ;`;

  mod.data[hash].deps = findDeps(mod.data[hash].code).map((dep) => importShim.resolve(dep, name));

  await Promise.all(
    mod.data[hash].deps.map((depUrl) =>
      fetch_or_die(depUrl).then((content) => toUmd(content, depUrl).then(async (mod) => await mod))
    ),
  );

  return mod;
};

const urls: { [url: string]: string } = {};
const fetch_or_die = async (url: string) => {
  if (url.includes(`/live/`)) return await fetch(url).then((res) => res.text());
  if (urls[url]) return urls[url];
  const cached = await fileCache.getItem<string>(url);
  if (cached) return cached;

  urls[url] = urls[url] || await fetch(url).then((res) => res.text());
  await fileCache.setItem(url, urls[url]);
  return urls[url];
};
