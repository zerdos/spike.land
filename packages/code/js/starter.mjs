import { join } from "../dist/ws.mjs";

// const wb = () =>
// import("./workboxLoader.mjs").then(({ workboxLoader }) => workboxLoader());

const path = location.pathname.split("/");
const user = "user" + Math.random();
const room = (path.pop() || path.pop()).slice(-12);

const runTheApp = () =>
  import("./reactLoader.mjs").then(({ run }) => run({ mode: "window", room }));

export default function () {
  try {
    join(user, room);
  } catch {
    setTimeout(() => join(user, room), 100);
  }

  // try {
  //   wb();
  // } catch {
  //   setTimeout(wb, 100);
  // }

  try {
    runTheApp();
  } catch {
    location.reload();
  }
}
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
