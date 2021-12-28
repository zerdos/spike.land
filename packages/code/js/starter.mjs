import { join } from "./ws.mjs";
import uuid from "./uidV4.mjs";

export default function (injectedRoom = "") {
  run(injectedRoom);
}
export const run = (injectedRoom) => {
  const path = location.pathname.split("/");

  const room = injectedRoom ||
    ((path[1] === "api" && path[2] === "room")
      ? path[3]
      : (path.pop() || path.pop()).slice(-12));

  const user = ((self && self.crypto && self.crypto.randomUUID &&
    self.crypto.randomUUID()) || uuid()).substring(0, 8);

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

  // console.log({ room }, { user });
  join(room, user);
  setTimeout(() => window.sess || join(room, user), 500);
};
