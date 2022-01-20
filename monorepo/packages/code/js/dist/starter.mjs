import "./chunk-L7N3FHV6.mjs";

// js/starter.mjs
function starter_default(injectedRoom = "") {
  run(injectedRoom);
}
var run = async (injectedRoom) => {
  const path = location.pathname.split("/");
  window.aniStart = Date.now();
  const room = injectedRoom || (path[1] === "api" && path[2] === "room" ? path[3] : (path.pop() || path.pop()).slice(-12)) || "code-main";
  const user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || (await import("./uidV4-JKG6FMAF.mjs")).default()).slice(0, 8);
  if (location.pathname.includes("hydrate")) {
    const App = (await import(`https://spike.land/api/room/${room}/js`)).default;
    const createDelta = (await import("https://unpkg.com/@spike.land/esm@0.6.38/dist/textdiff-create.mjs")).default;
    const { jsx } = await import("https://unpkg.com/@spike.land/esm@0.6.38/dist/emotion-react.mjs");
    const { ReactDOM: ReactDOM2 } = window;
    const container = document.querySelector("#zbody");
    window.aniStart = Date.now();
    const root = ReactDOM2.hydrateRoot(container, jsx(App));
    const deltas = [];
    let first = document.getElementById("zbody").innerHTML;
    const html = first;
    const interV = setInterval(() => {
      const el = container.innerHTML;
      deltas.push(createDelta(first, el));
      first = el;
    }, 1e3 / 60);
    window.deltas = deltas;
    const { join: join2 } = await import("./ws-VDVSJRVT.mjs");
    join2(room, user, deltas);
    return;
    return;
  } else {
    (async () => {
      const applyDelta = (await import("https://unpkg.com/@spike.land/esm@0.4.33/dist/textdiff-patch.mjs")).default;
      const resp = await fetch(`https://spike.land/api/room/${room}/delta`);
      const deltas = await resp.json();
      let container = document.getElementById("zbody");
      if (!container) {
        const respS = await fetch(`https://spike.land/api/room/${room}/session`);
        const session2 = await respS.json();
        container = document.getElementById("root");
        container.innerHTML = `<style>${session2.css}</style><div id="zbody">${session2.html}</div>`;
        container = document.getElementById("zbody");
      }
      if (deltas && deltas.length) {
        const html = container.innerHTML;
        let i = 0;
        let last = html;
        const deltasLength = deltas.length;
        const animationLength = (2e3 - (Date.now() - window.aniStart)) / deltas.length;
        console.log({ animationLength });
        const clInt = setInterval(() => {
          if (i >= deltas.length) {
            clearInterval(clInt);
            return;
          }
          const index = i % deltasLength;
          if (index === 0)
            last = html;
          i++;
          const delta = deltas[index];
          if (!delta)
            return;
          const next = applyDelta(last, delta);
          last = next;
          container.innerHTML = next;
        }, animationLength);
      } else {
        const App = (await import(`https://spike.land/api/room/${room}/js`)).default;
        const { jsx } = await import("https://unpkg.com/@spike.land/esm@0.6.38/dist/emotion-react.mjs");
        let container2 = document.querySelector("#zbody");
        if (!container2) {
          container3 = document.getElementById("root");
          container3.innerHTML = `<style>${session.css}</style><div id="zbody">${session.html}</div>`;
          let container3 = document.querySelector("#zbody");
        }
        ReactDOM.hydrateRoot(container2, jsx(App));
      }
    })();
  }
  const { join } = await import("./ws-VDVSJRVT.mjs");
  join(room, user);
};
export {
  starter_default as default,
  run
};
//# sourceMappingURL=starter.mjs.map
