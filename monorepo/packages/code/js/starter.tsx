/** @jsxImportSource @emotion/react */

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import type { FC, ReactElement } from "react";
// import  from "react";

import { render } from "react-dom";

import { md5 } from "./md5";
// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

// const hash = new Sha256();

const apps: { [key: string]: FC } = {};

globalThis.apps = apps;
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

  const container = document.createElement("div");
  container.style.height = "100%";

  // const key = "css";
  // const cache = createCache({ key });

  // const { App } = globalThis;
  console.log("render App");
try{
  render(
    // <CacheProvider value={cache}>
    <App />,
    // </CacheProvider>,
    container,
  );
} catch (err){
  console.error({err});
  render(
    // <CacheProvider value={cache}>
    <p>error</p>,
    // </CacheProvider>,
    container,
  );
}

  if (!container.innerHTML) return;

  if (!globalThis.currentTarget) {
    document.getElementById("root")?.replaceWith(container);
    globalThis.currentTarget = container;
    container.id = "root";
  } else {
    globalThis.currentTarget.parentNode?.replaceChildren(container);
    globalThis.currentTarget = container;
    container;
  }
};

export function createJsBlob(code: string) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl = new URL(blobUrl,'https://spike.land/live/');

  // return actualUrl;
}
