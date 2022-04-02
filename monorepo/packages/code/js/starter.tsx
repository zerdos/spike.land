import "core-js/modules/web.immediate";

import { hydrate } from "react-dom";
import { fromBinary } from "./binary";
import { jsx } from "@emotion/react";
import { Workbox } from "workbox-window";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.register();
}

const path = location.pathname.split("/");
const room =
  ((path[1] === "api" && path[2] === "room")
    ? path[3]
    : (path.pop() || path.pop())!.slice(-12)) ||
  "code-main";

const start = async (App) => {
  globalThis.monacoEditorModule = import("./editor");
  globalThis.renderPreviewModule = import("./renderPreviewWindow");
  const container = document.querySelector("#root")!;

  hydrate(container, jsx(App));

  console.log("HYDRATED");
  if (location.href.endsWith("hydrated")) return;
  globalThis.App = App;
  const { join } = await import("./ws");
  join();
};

export const hydrateBinary = async (binary: string) => {
  const App = (await import(createJsBlob(fromBinary(binary)))).default;
  start(App);
};

export const run = async () => {
  if (globalThis.App) return;

  const respS = await fetch(
    `https://spike.land/api/room/${room}/session`,
  );

  const session = await respS.json();
  const container = document.getElementById("root");
  container.innerHTML =
    `<style>${session.css}</style><div id="zbody">${session.html}</div>`;

  const App = (await import(createJsBlob(session.transpiled))).default;

  start(App);
};

export function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}

async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
