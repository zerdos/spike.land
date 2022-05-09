/** @jsxImportSource @emotion/react */

import "core-js/modules/web.immediate";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { render } from "react-dom";
import { Workbox } from "workbox-window";
import { ReactNode } from "react";
import { IRunnerSession } from "quickStart";

// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");

//   wb.register();
// }

const start = async (App) => {
  renderApp(App);

  if (location.href.endsWith("hydrated")) return;

  Object.assign(globalThis, { App });

  const { join } = await import("./ws");
  join();
};

export const renderApp = (App) => {
  const container = document.createElement("div");

  const key = "css";
  const cache = createCache({ key });

  render(
    <CacheProvider value={cache}>
      <App></App>
    </CacheProvider>,
    container,
  );

  document.getElementById("root").replaceWith(container);
  container.id = "root";

  console.log("HYDRATED");
};

export const run = async (session, StarterApp = null) => {
  if (globalThis.App) return;

  const container = document.getElementById("root");
  container.innerHTML =
    `<style>${session.css}</style><div id="zbody">${session.html}</div>`;

  const AppPromise = StarterApp || import(createJsBlob(session.transpiled));

  const App = (await AppPromise).default;
  start(App);
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
