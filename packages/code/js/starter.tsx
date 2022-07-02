/** @jsxImportSource @emotion/react */

import { Fragment, Suspense, } from "react";
import type { ReactElement } from "react";

import type {} from "react-dom/next";
import { createRoot } from "react-dom/client";

import { md5 } from "./md5";
// import "es-module-shims";
    

// const importMap = { imports: {  
//   "framer-motion": "/framer-motion.mjs",
//   "@emotion/react": "/emotion.mjs",
//   "react": "/react.mjs"} };

  // importShim.addImportMap(importMap)

const apps: { [key: string]: ReactElement } = {};

globalThis.apps = apps;

export const appFactory = async (transpiled: string): Promise<ReactElement> => {
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

    const {importShim} = window;


    const App = ((await importShim(
      /* @vite-ignore */
      createJsBlob(transpiled)
    )).default as ()=>ReactElement)();
    
    apps[result] = App;
  }

  globalThis.transpiled = transpiled;
  globalThis.App = apps[result];

  return apps[result];

  // globalThis.notify();
};

export const appRoot = createRoot(
  document.getElementById("root") || (() => {
    const root = document.createElement("div");
    document.body.append(root);
    return root;
  })(),
);

export const renderApp = (App: ReactElement) => {
  if (globalThis.setCh) return globalThis.setCh(App);

  // const key = "css";
  // const cache = createCache({ key });

  // const { App } = globalThis;
  console.log("render App");
  try {
    appRoot.render(
      // <CacheProvider value={cache}>
      <Fragment>
        <Suspense fallback={<p>error</p>}>
          {App}
        </Suspense>
      </Fragment>,
      // </CacheProvider>,
    );
  } catch (err) {
    appRoot.render(
      // <CacheProvider value={cache}>
      <Fragment>
        <p>error</p>
      </Fragment>,
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
