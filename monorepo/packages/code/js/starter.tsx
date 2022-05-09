/** @jsxImportSource @emotion/react */

import "core-js/modules/web.immediate";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { render } from "react-dom";

// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

const { Sha256 } = (await import("@aws-crypto/sha256-browser")).default;

const hash = new Sha256();

const apps: {[key: string]: FC} = {};

export const appFactory = async (transpiled) => {
  if (globalThis.transpiled === transpiled) return;
  globalThis.transpiled = transpiled;

  console.log("APP factory");

  hash.update(transpiled);
  const result = await hash.digest();

  if (globalThis.App === apps[result]) return;

  globalThis.App = apps[result] ||
  
    (await import(createJsBlob(transpiled))).default;
  globalThis.transpiled = transpiled;

  apps[result] = globalThis.App;

  globalThis.notify();
};

const start = async () => {
  globalThis.notify = renderApp;
  globalThis.appFactory = appFactory;

  globalThis.notify();

  if (location.href.endsWith("hydrated")) return;

  const { join } = await import("./ws");
  join();
};

export const renderApp = () => {
  const container = document.createElement("div");

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

  document.getElementById("root")!.replaceWith(container);
  container.id = "root";
};

export const run = async (session, StarterApp = null) => {
  if (globalThis.App) return;

  const container = document.getElementById("root")!;
  container.innerHTML =
    `<style>${session.css}</style><div id="zbody">${session.html}</div>`;

  const AppPromise = StarterApp || import(createJsBlob(session.transpiled));
  globalThis.transpiled = session.transpiled;

  globalThis.App = (await AppPromise).default;

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
