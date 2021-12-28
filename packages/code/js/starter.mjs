export default function (injectedRoom = "") {
  run(injectedRoom);
}

export const run = async (injectedRoom) => {
  if (location.pathname.endsWith("hydrated")) {
    const { ReactDOM } = window;

    import("https://code.spike.land/api/room/${codeSpace}/js").then((App) =>
      import("@emotion/react").then(({ jsx }) =>
        ReactDOM.hydrate(jsx(App), document.getElementById("zbody"))
      )
    );
    return;
  }

  const path = location.pathname.split("/");

  const room = injectedRoom ||
    ((path[1] === "api" && path[2] === "room")
      ? path[3]
      : (path.pop() || path.pop()).slice(-12));

  const user = ((self && self.crypto && self.crypto.randomUUID &&
    self.crypto.randomUUID()) || (await import("./uidV4.mjs")).default())
    .substring(0, 8);

  const cacheKey = `state-${room}`;
  const savedStateStr = localStorage.getItem(cacheKey);
  if (!savedStateStr) {
    const savedState = JSON.parse(savedStateStr);
    const preRenderContainer = document &&
      document.getElementById("root");
    console.log(preRenderContainer?.innerHTML.length, savedState);
    if (
      preRenderContainer && savedState &&
      preRenderContainer.innerHTML.length === 0
    ) {
      preRenderContainer.innerHTML = `<style>${savedState.css}</style>
    ${savedState.html}
    `;
      console.log(`<style>${savedState.css}</style>
    ${savedState.html}
    `);
    }
  }

  if (location.pathname.endsWith("hydrated")) {
    const { App } = await import(
      "https://code.spike.land/api/room/" + room + "/js"
    );
    const { jsx } = await import("@emotion/react");
    const { ReactDOM } = window;

    ReactDOM.hydrate(jsx(App), document.getElementById("zbody"));

    return;
  }

  const { join } = await import("./ws.mjs");
  join(room, user);
  // console.log({ r
};
