

// const wb = () =>
// import("./workboxLoader.mjs").then(({ workboxLoader }) => workboxLoader());
const path = location.pathname.split("/");
const room = (path.pop() || path.pop()).slice(-12);


const wsStart = async () =>{
  const join  = (await import("./ws.mjs")).join;
  const v4 = (await import( "uuid/v4")).default


const user = v4();

join(room, user);

}


const runTheApp = () =>
  import("./reactLoader.mjs").then(({ run }) => run({ mode: "window", room }));

export default function () {
  wsStart();
  setTimeout(() => window.sess ||wsStart(), 1000);
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
