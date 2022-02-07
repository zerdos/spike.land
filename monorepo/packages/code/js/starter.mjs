import { join } from "./ws.mjs";
import React, { hydrateRoot, render } from "react";
import { jsx } from "@emotion/react";

window.React = React;
export const run = async (injectedRoom) => {
  const path = location.pathname.split("/");
  window.aniStart = Date.now();

  const room = injectedRoom ||
    ((path[1] === "api" && path[2] === "room")
      ? path[3]
      : (path.pop() || path.pop()).slice(-12)) ||
    "code-main";
  const user = ((self && self.crypto && self.crypto.randomUUID &&
    self.crypto.randomUUID()) || (await import("./uidV4.mjs")).default()).slice(
      0,
      8,
    );

  if (location.pathname.includes("hydrate")) {
    const App = (await import(
      `https://spike.land/api/room/${room}/js`
    )).default;

    const createDelta = (await import("textdiff-create")).default;
    // const applyDelta = (await import("textdiff-patch")).default;

    const { jsx } = await import("@emotion/react");
    // const { hydrateRoot } = React;
    const container = document.querySelector("#zbody");

    window.aniStart = Date.now();
    const root = hydrateRoot(container, jsx(App));

    join(room, user);

    return;
  } else {
    (async () => {
      const App = (await import(
        `https://spike.land/api/room/${room}/js`
      )).default;

      let container = document.getElementById("zbody");
      render(jsx(App), container);

      if (!container) {
        const respS = await fetch(
          `https://spike.land/api/room/${room}/session`,
        );
        const session = await respS.json();
        container = document.getElementById("root");
        container.innerHTML =
          `<style>${session.css}</style><div id="zbody">${session.html}</div>`;
        container = document.getElementById("zbody");
      } else {
        const App = (await import(
          `https://spike.land/api/room/${room}/js`
        )).default;

        const { jsx } = await import("@emotion/react");

        let container = document.querySelector("#zbody");

        if (!container) {
          container = document.getElementById("root");
          if (!container) throw new Error();

          const respS = await fetch(
            `https://spike.land/api/room/${room}/session`,
          );

          const session = await respS.json();

          container.innerHTML =
            `<style>${session.css}</style><div id="zbody">${session.html}</div>`;
          container = document.querySelector("#zbody");
        }

        if (!container) throw new Error();

        hydrateRoot(container, jsx(App));
      }
    })();
  }

  join(room, user);
};
run();
