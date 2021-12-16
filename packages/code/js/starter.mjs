import { join } from "./ws.mjs";
import v4 from "uuid/v4";

const path = location.pathname.split("/");
const room = (path.pop() || path.pop()).slice(-12);
// const user = v4().substring(0, 8);

const runTheApp = () =>
  import("./reactLoader.mjs").then(({ run }) => run({ mode: "window", room }));

export default function (injectedRoom = "") {
  const path = location.pathname.split("/");
  const room = (path.pop() || path.pop()).slice(-12);
  const user = v4().substring(0, 8);

  // console.log({ room }, { user });
  join(injectedRoom || room, user);
  setTimeout(() => window.sess || join(room, user), 500);
  setTimeout(() => window.sess || runTheApp(), 1500);
}

// try {
//   wb();
// } catch {
//   setTimeout(wb, 100);
// }

// }
// try {
//   start();
// } catch (error) {
//   console.error({ error });
//   fetch("https://code.spike.land/error", {
//     method: "POST",
//     body: JSON.stringify({ error }),
//   });
// }

// async function start() {
//   import('./reactLoader.mjs').then(({run})=>run("window"));
//   import("./workboxLoader.mjs").then(({workboxLoader})=>workboxLoader());
// }
