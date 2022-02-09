import { join } from "./ws.mjs";
import React, { hydrate } from "react";
import { fromBinary } from "./binary";
import { jsx } from "@emotion/react";
import uidV4 from "./uidV4.mjs";

window.React = React;

const path = location.pathname.split("/");
window.aniStart = Date.now();

const room =
  ((path[1] === "api" && path[2] === "room")
    ? path[3]
    : (path.pop() || path.pop()).slice(-12)) ||
  "code-main";
const user = ((self && self.crypto && self.crypto.randomUUID &&
  self.crypto.randomUUID()) || (uidV4())).slice(
    0,
    8,
  );

const start = (App) => {
  const container = document.querySelector("#zbody");

  hydrate(container, jsx(App));
  globalThis.App = App;

  join(room, user);
};

export const hydrateBinary = async (binary) => {
  const App = (await import(createJsBlob(fromBinary(binary)))).default;
  start(App);
};

export const run = async () => {
  if (globalThis.App) join(room, user);

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

function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
