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

    const AppJsx = jsx(App);

    const root = ReactDOM.hydrateRoot(container, AppJsx);

    const { renderToString } = await import("./vendor/renderToString.mjs");
    // const outers = [];
    const deltas = [];

    const html = JSON.stringify(renderToString(AppJsx));

    const interV = setInterval(() => {
      const el = JSON.stringify(renderToString(AppJsx));

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
