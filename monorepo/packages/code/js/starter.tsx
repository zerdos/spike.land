/** @jsxImportSource @emotion/react */

import "core-js/modules/web.immediate";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { render } from "react-dom";
import { fromBinary } from "./binary";
import { Workbox } from "workbox-window";
import { ReactNode } from "react";
import { IRunnerSession } from "quickStart";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.register();
}

const start = async (App) => {
  const e = import("./editor");
  const p = import("./renderPreviewWindow");

  renderApp(App);

  if (location.href.endsWith("hydrated")) return;
  Object.assign(globalThis, { App });
  const { join } = await import("./ws");
  join(App);
  await (Promise.all([e, p]));
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

export const run = async (sess: IRunnerSession) => {
  if (globalThis.App) return;

  if (!window.startSession && !sess) {
    const { roomName } = await import("./ws");

    const respS = await fetch(
      `https://spike.land/api/room/${roomName}/session`,
    );
    const session = await respS.json();
    window.startSession = session;
  }
  const session = sess || window.startSession;

  const container = document.getElementById("root");
  container.innerHTML =
    `<style>${session.css}</style><div id="zbody">${session.html}</div>`;

  const App = (await import(createJsBlob(session.transpiled))).default;

  start(App);
};

export function createJsBlob(code: string) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
