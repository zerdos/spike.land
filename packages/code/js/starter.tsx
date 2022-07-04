/** @jsxImportSource @emotion/react */

import { FC, Fragment, Suspense, lazy } from "react";

import type {} from "react-dom/next";
import { createRoot } from "react-dom/client";

import {mST} from "./session"
import { md5 } from "./md5";
import "es-module-shims"
// import { renderPreviewWindow } from "renderPreviewWindow";
// import { hashCode } from "session";

const apps: { [key: string]: FC } = {};

globalThis.apps = apps;

export const AutoUpdateApp: FC<{hash: number}> = ({hash})=> {

const App = lazy(()=>importShim(createJsBlob(mST().transpiled)));

return <Suspense fallback={<div dangerouslySetInnerHTML={{__html: mST().html}}></div>}>
  <App />
</Suspense>}


export const appFactory = async (transpiled: string): Promise<FC> => {
  const result = md5(transpiled);
  // return lazy(>import(`/live/${codeSpace}/js#${result}`));
  if (globalThis.transpiled === transpiled) return globalThis.App;
  globalThis.transpiled = transpiled;

  // hash.update(transpiled);
  // const resultU8Arr = await hash.digest();



  //new TextDecoder().decode(resultU8Arr);
  // if (globalThis.App && globalThis.App === apps[result]) {
  //   globalThis.setCh && globalThis.setCh(globalThis.App);
  //   return;
  // }

  if (!apps[result]) {    
    apps[result] = (await importShim(createJsBlob(transpiled))).default as unknown as FC;;
  }

  globalThis.transpiled = transpiled;
  globalThis.App = apps[result];


  return  globalThis.App ;
};

export const appRoot = createRoot(
  document.getElementById("root") || (() => {
    const root = document.createElement("div");
    document.body.append(root);
    return root;
  })(),
);

export const renderApp = (App: FC) => {
 
  // const key = "css";
  // const cache = createCache({ key });

  // const { App } = globalThis;
  console.log("render App");
  try {
    appRoot.render(
      // <CacheProvider value={cache}>
      <Fragment>
        <Suspense fallback={<div dangerouslySetInnerHTML={{__html: mST().html}} />}>
          <App />
        </Suspense>
      </Fragment>,
      // </CacheProvider>,
    );
  } catch (err) {
    appRoot.render(
      <Fragment>
        <p>error</p>
      </Fragment>,
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
