/** @jsxImportSource @emotion/react */

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import type { FC } from "react";

import { render } from "react-dom";

import { md5 } from "./md5";
// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

// const hash = new Sha256();

const apps: { [key: string]: FC } = {};

globalThis.apps = apps;
export const appFactory = async (transpiled: string, _html: string) => {
  if (globalThis.transpiled === transpiled) return;
  globalThis.transpiled = transpiled;

  // hash.update(transpiled);
  // const resultU8Arr = await hash.digest();

  const result = md5(transpiled);
  //new TextDecoder().decode(resultU8Arr);
  if (globalThis.App && globalThis.App === apps[result]) return;

  globalThis.App = apps[result] ||
    (await import(
      /* @vite-ignore */
      createJsBlob(transpiled)
    )).default;
  globalThis.transpiled = transpiled;

  apps[result] = globalThis.App;

  return renderApp();

  // globalThis.notify();
};

export const renderApp = () => {
  const container = document.createElement("div");
  container.style.height = "100%";

  // const key = "css";
  // const cache = createCache({ key });

  const { App } = globalThis;
  console.log("render App");

  render(
    // <CacheProvider value={cache}>
    <App />,
    // </CacheProvider>,
    container,
  );

  if (!container.innerHTML) return;

  if (!globalThis.currentTarget) {
    document.getElementById("root")?.replaceWith(container);
    globalThis.currentTarget = container;
  } else {
    globalThis.currentTarget.parentNode?.replaceChildren(container);
    globalThis.currentTarget = container;
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
