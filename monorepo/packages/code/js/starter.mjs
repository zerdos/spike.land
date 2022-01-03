export default function (injectedRoom = "") {
  run(injectedRoom);
}

export const run = async (injectedRoom) => {
  const path = location.pathname.split("/");

  const room = injectedRoom ||
    ((path[1] === "api" && path[2] === "room")
      ? path[3]
      : (path.pop() || path.pop()).slice(-12)) ||
    "code-main";

  if (location.pathname.includes("hydrate")) {
    const App = (await import(
      `https://code.spike.land/api/room/${room}/js`
    )).default;

    const createDelta = (await import("textdiff-create")).default;
    const applyDelta = (await import("textdiff-patch")).default;

    const { compress, decompress } = await import("simple-text-compress");

    const { jsx } = await import("@emotion/react");
    const { ReactDOM } = window;

    const container = document.querySelector("#zbody");

    const root = ReactDOM.hydrateRoot(container, jsx(App));

    // const outers = [];
    const deltas = [];

    let first = document.getElementById("zbody").innerHTML;
    const html = first;

    const interV = setInterval(() => {
      const el = container.innerHTML;
      deltas.push(createDelta(first, el));

      first = el;
      //      deltas.push()
      // outers.push(el);
    }, 1000 / 60);

    window.deltas = deltas;

    // const compressed = compress(JSON.stringify(deltas));

    setTimeout(async () => {
      clearInterval(interV);

      // const deltaStr = JSON.stringify(deltas);
      const user = ((self && self.crypto && self.crypto.randomUUID &&
        self.crypto.randomUUID()) || (await import("./uidV4.mjs")).default())
        .slice(
          0,
          8,
        );

      const { join } = await import("./ws.mjs");
      join(room, user, deltas);

      //s

      // console.log(deltaStr);
      // root.unmount();
      // // const compressed = compress(JSON.stringify(deltas));
      // console.log(
      //   JSON.stringify(deltas).length,
      //   // JSON.stringify(compressed).length,
      // );

      // let i = 0;
      // const deltasLength = deltas.length;
      // let last = html;

      // setInterval(() => {
      //   const index = i % deltasLength;
      //   if (index === 0) last = html;

      //   i++;
      //   const delta = deltas[index];
      //   if (!delta) return;
      //   const next = applyDelta(last, delta);
      //   last = next;
      //   container.innerHTML = next;
      // }, 1000 / 60);
    }, 2000);

    return;
  } else {
    (async () => {
      // const App = (await import(
      //   `https://code.spike.land/api/room/zoli/js`,
      // )).default;

      const applyDelta = (await import(
        "https://unpkg.com/@spike.land/esm@0.4.33/dist/textdiff-patch.mjs"
      )).default;

      const respS = await fetch(
        `https://code.spike.land/api/room/${room}/session`,
      );
      const session = await respS.json();

      const resp = await fetch(
        `https://code.spike.land/api/room/${room}/delta`,
      );
      const deltas = await resp.json();

      //   const { jsx } = emotionReact;

      //   const { ReactDOM } = window;

      //  const container = document.createElement("div");
      //  container.id = "upgrade-me";
      // document.body.appendChild(container);

      let container = document.getElementById("zbody");

      if (!container) {
        container = document.getElementById("root");
        root.innerHTML =
          `<style>${session.css}</style><div id="zbody">${session.html}</div>`;
        container = document.getElementById("zbody");
      }

      //   const st = document.createElement("style");
      //   st.innerHTML = session.css;

      const html = session.html;
      //   const applied = applyDelta(html, deltas[0]);
      //   container.innerHTML = session.html;
      // `<style>${session.css}</style><div>${session.html}</div>`;

      //  const root = ReactDOM.createRoot(target);

      //   root.render(jsx(App));

      //   document.body.appendChild(st);

      //  document.body.appendChild(container);

      //   const zBody = container;

      let i = 0;
      let last = html;
      const deltasLength = deltas.length;

      window.aniStart = Date.now();
      const clInt = setInterval(() => {
        if (i > deltas.length) {
          clearInterval(clInt);
          return;
        }
        const index = i % deltasLength;
        if (index === 0) last = html;
        //
        i++;
        const delta = deltas[index];
        if (!delta) return;
        const next = applyDelta(last, delta);
        last = next;

        // const newDiv = document.createElement("div");
        // newDiv.id = "zbodyw";
        // newDiv.setAttribute("id", "zbodyw");

        // newDiv.innerHTML = `<div>${next}</div>`;

        // document.getElementById("zbodyw").replaceWith(newDiv);
        // console.log(next);
        //    document.removeChild(container);
        // console.log(next);
        container.innerHTML =
          `<style>${session.css}</style><div id="zbody">${next}</div>`;
      }, 1000 / 60);
      //  document.appendChild(container);
    })();
  }

  const user = ((self && self.crypto && self.crypto.randomUUID &&
    self.crypto.randomUUID()) || (await import("./uidV4.mjs")).default()).slice(
      0,
      8,
    );

  /// For local dev
  // if (document.getElementById("root").innerHTML.length === 0) {
  //   const cacheKey = `state-${room}`;
  //   const savedStateStr = localStorage.getItem(cacheKey);
  //   if (!savedStateStr) {
  //     const savedState = JSON.parse(savedStateStr);
  //     const preRenderContainer = document.getElementById("root");
  //     if (
  //       preRenderContainer && savedState &&
  //       preRenderContainer.innerHTML.length === 0
  //     ) {
  //       preRenderContainer.innerHTML = `<style>${savedState.css}</style>
  //         <div id="zbody">${savedState.html}</div>`;
  //       console.log(`<style>${savedState.css}</style>
  //       ${savedState.html}
  //       `);
  //     }
  //   }
  // }

  const { join } = await import("./ws.mjs");
  join(room, user);
  // Console.log({ r
};
