const wb = () =>
  import("./workboxLoader.mjs").then(({ workboxLoader }) => workboxLoader());

const runTheApp = () =>
  import("./reactLoader.mjs").then(({ run }) => run("window"));
export default function(){
try {
  wb();
} catch {
  setTimeout(wb, 100);
}

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
