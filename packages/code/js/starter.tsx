/** @jsxImportSource @emotion/react */

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import type { FC } from "react";
// import  from "react";

import type {} from "react-dom/next"
import {createRoot} from "react-dom/client";

import { md5 } from "./md5";
// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

// const hash = new Sha256();

const apps: { [key: string]: FC } = {};

globalThis.apps = apps;

globalThis.prettierJs = async (code: string) => {
  const { prettierJs } = await import("./prettierEsm");
  globalThis.prettierJs = async (code: string) => prettierJs(code);
  return prettierJs(code);
};
export const appFactory = async (transpiled: string) => {
  if (globalThis.transpiled === transpiled) return globalThis.App;
  globalThis.transpiled = transpiled;

  // hash.update(transpiled);
  // const resultU8Arr = await hash.digest();

  const result = md5(transpiled);
  //new TextDecoder().decode(resultU8Arr);
  // if (globalThis.App && globalThis.App === apps[result]) {
  //   globalThis.setCh && globalThis.setCh(globalThis.App);
  //   return;
  // }

  globalThis.App = apps[result] ||
    (await import(
      /* @vite-ignore */
      createJsBlob(transpiled)
    )).default;
  globalThis.transpiled = transpiled;

  apps[result] = globalThis.App;

  return apps[result];

  // globalThis.notify();
};

export const renderApp = (App: FC<{}>) => {
  if (globalThis.setCh) return globalThis.setCh(<App />);



  // const key = "css";
  // const cache = createCache({ key });

if (!globalThis.root) {
  const container = document.createElement("div");
  container.style.height = "100%";
  globalThis.root =  createRoot(container);;
}

  const {root} = globalThis
  // const { App } = globalThis;
  console.log("render App");
  try {
    root.render(
      // <CacheProvider value={cache}>
      <App />
      // </CacheProvider>,
  
    );
  } catch (err) {
    console.error({ err });
    globalThis.App = () => <p>error</p>;

    const { App } = globalThis;
    root.render(
      // <CacheProvider value={cache}>
      <App />,
      // </CacheProvider>,
    );
  }

  

};

export function createJsBlob(code: string) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl = new URL(blobUrl,'//live/');

  // return actualUrl;
}
