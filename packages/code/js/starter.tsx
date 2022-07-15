/** @jsxImportSource @emotion/react */
import { FC, Fragment } from "react";

import type {} from "react-dom/next";

import { mST } from "./session";
import { md5 } from "./md5";

Object.assign(window, {

});

import "es-module-shims";

const orig = location.origin.includes("localhost")? ".":location.origin;

export const initShims = async (assets: { [key: string]: string }) => location.origin.includes("localhost")?importShim.addImportMap({
"imports": {
  "@emotion/react": orig + "/" + assets["emotion.mjs"],
  "framer-motion":"./framer-motion",
  "react": orig + "/" + assets["react.mjs"],
  "react-dom":orig + "/" + assets["react.mjs"],
  "react-dom/client":orig + "/" + assets["react.mjs"],
  "react-dom/server": orig+ "/" + assets["react.mjs"],
  "react/jsx-runtime":orig+ "/" + assets["react.mjs"]}}): importShim.addImportMap({
      "imports": {
        // ...imap,
        "framer-motion": location.origin + "/" + assets["framer-motion.mjs"],
        "@emotion/react": location.origin + "/" + assets["emotion.mjs"],
        "react": location.origin + "/" + assets["react.mjs"],
        "react-dom": location.origin + "/" + assets["react.mjs"],
        "react-dom/client": location.origin + "/" + assets["react.mjs"],
        "react-dom/server": location.origin + "/" + assets["react.mjs"],
        "react/jsx-runtime": location.origin + "/" + assets["react.mjs"],
        // "preact": "https://ga.jspm.io/npm:preact@10.8.2/dist/preact.module.js",
        // "preact-render-to-string": "https://ga.jspm.io/npm:preact-render-to-string@5.2.0/dist/index.mjs",
        // "preact/compat": "https://ga.jspm.io/npm:preact@10.8.2/compat/dist/compat.module.js",
        // "preact/jsx-runtime": "https://ga.jspm.io/npm:preact@10.8.2/jsx-runtime/dist/jsxRuntime.module.js"
      }});
  
  
let App: FC = () => <Fragment></Fragment>;
const apps: { [key: string]: FC } = {};

// {[md5(starter.transpiled)]: await appFactory(starter.transpiled)};

export const AutoUpdateApp: FC<{ hash: number }> = ({ hash }) => {
  const result = md5(mST().transpiled);

  if (apps[result]) {
    App = apps[result];
  }
  // apps[]=result;

  return <App key={hash} />;
};

export async function appFactory(transpiled: string): Promise<FC> {
  const result = md5(transpiled);
  // return lazy(>import(`/live/${codeSpace}/js#${result}`));
  // if (globalThis.transpiled === transpiled) return globalThis.App;
  // globalThis.transpiled = transpiled;

  // hash.update(transpiled);
  // const resultU8Arr = await hash.digest();

  //new TextDecoder().decode(resultU8Arr);
  // if (globalThis.App && globalThis.App === apps[result]) {
  //   globalThis.setCh && globalThis.setCh(globalThis.App);
  //   return;
  // }

  if (!apps[result]) {
    apps[result] = (await importShim(createJsBlob(transpiled)))
      .default as unknown as FC;
  }

  App = apps[result];
  return apps[result];
}

export function createJsBlob(code: string) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl = new URL(blobUrl,'//live/');

  // return actualUrl;
}
