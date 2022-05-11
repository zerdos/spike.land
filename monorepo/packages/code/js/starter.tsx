/** @jsxImportSource @emotion/react */

import "core-js/modules/web.immediate";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type {FC} from "react";

import { render } from "react-dom";
import { ICodeSession } from "session";

// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

const { Sha256 } = (await import("@aws-crypto/sha256-browser")).default;

const hash = new Sha256();

const apps: {[key: string]: FC} = {};

export const appFactory = async (transpiled: string) => {
  if (globalThis.transpiled === transpiled) return;
  globalThis.transpiled = transpiled;

  console.log("APP factory");

  hash.update(transpiled);
  const resultU8Arr = await hash.digest();

  const result = new TextDecoder().decode(resultU8Arr);
  if (globalThis.App === apps[result]) return;

  globalThis.App = apps[result] ||
  
    (await import(createJsBlob(transpiled))).default;
  globalThis.transpiled = transpiled;

  apps[result] = globalThis.App;

  return renderApp();
  

  // globalThis.notify();
};

const start = async () => {
  // globalThis.notify = renderApp;
  globalThis.appFactory = appFactory;

  // renderApp();
  
  if (location.href.endsWith("hydrated")) return;

  const { join } = await import("./ws");
  join();
};

export const renderApp = () => {
  const container = document.createElement("div");
  container.style.height = "100%";

  const key = "css";
  const cache = createCache({ key });

  console.log("render App");
  const { App } = globalThis;
  render(
    <CacheProvider value={cache}>
      <App></App>
    </CacheProvider>,
    container,
  );

  console.log("container Html");

  if (!container.innerHTML) return;

  if (!globalThis.currentTarget){
    console.log("currentTarget");

    document.getElementById("root")?.replaceWith(container);
    globalThis.currentTarget =container;
  } else {
    globalThis.currentTarget.parentNode?.replaceChildren(container);
    globalThis.currentTarget = container;
   
  }
};

export const run = async () => {


  start();
};

export function createJsBlob(code: string) {
  const file = new File([code], "index.tsx", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl = new URL(blobUrl,'https://spike.land/live/');

  // return actualUrl;
}
