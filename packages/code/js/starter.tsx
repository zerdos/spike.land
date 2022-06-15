/** @jsxImportSource @emotion/react */

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import type { ReactElement } from "react";
// import  from "react";

import type {} from "react-dom/next";
import { createRoot } from "react-dom/client";

import { md5 } from "./md5";
// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

// const hash = new Sha256();

const apps: { [key: string]: ReactElement } = {};

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

  if (!apps[result]) {
    const App = (await import(
      /* @vite-ignore */
      createJsBlob(transpiled)
    )).default;
    apps[result] = <App />;
  }

  globalThis.transpiled = transpiled;
  globalThis.App = apps[result];

  return apps[result];

  // globalThis.notify();
};

export const renderApp = (App: ReactElement) => {
  if (globalThis.setCh) return globalThis.setCh(App);

  // const key = "css";
  // const cache = createCache({ key });

  if (!globalThis.appRoot) {
    const container = document.getElementById("root")!;

    globalThis.appRoot = createRoot(container);
  }

  const { appRoot } = globalThis;

  // const { App } = globalThis;
  console.log("render App");
  try {
    appRoot.render(
      // <CacheProvider value={cache}>
      // <>
      App,
      // </CacheProvider>,
    );
  } catch (err) {
    console.error({ err });
    const ErrorFailBack = () => <p>error</p>;

    globalThis.App = <ErrorFailBack />;

    const { App } = globalThis;
    appRoot.render(
      // <CacheProvider value={cache}>
      // <>
      App,
      // </>
      // </CacheProvider>,
    );
  }
};

export function createJsBlob(code: string) {
  try {
    const file = new File([code], "index.mjs", {
      type: "application/javascript",
    });
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
    // const actualUrl = new URL(blobUrl,'//live/');

    // return actualUrl;
  } catch (err) {
    console.error(err);
  }
}
