const codeSpace = location.pathname.slice(1).split("/")[1];
// import { upgradeElement } from '@ampproject/worker-dom/dist/main.mjs';

// globalThis.upgradeElement = upgradeElement;
// const start = (dry = false) =>

async function start() {
  if (!globalThis.React?.Children) {
    setTimeout(start, 100);
    return;
  }

  const { run } = await importShim<{ run: (t: any) => void }, { run: (t: any) => void }>(`${location.origin}/ws.mjs`);
  const {
    mST,
    address,
  } = await import(`${location.origin}/live/${codeSpace}/mST.mjs`);

  run({
    mST,
    dry: false,
    codeSpace,
    address,
  });
}
start();
// const App = await appFactory(mST().transpiled);

// if (location.pathname.endsWith("/hydrated")) {
//   let i = document.getElementById("root")?.getAttribute("data-i");
//   let unmount = () => {};
//   const bc = new BroadcastChannel(location.origin);
//   bc.onmessage = (event) => {
//     if (
//       event.data.codeSpace === codeSpace
//     ) {
//       const rootDiv = document.createElement("div");
//       rootDiv.style.height = "100%";

//       i = event.data.sess.i;

//       const root = createRoot(rootDiv);

//       const current = i;
//       importShim<() => JSX.Element, {}>(
//         `${location.origin}/live/${codeSpace}/index.js/${i}`,
//       ).then((mod) => i === current && root.render(mod.default())).then(
//         () => document.querySelectorAll("#root>div>div")[0].replaceWith(rootDiv),
//       ).then(unmount).then(() =>
//         unmount = () => {
//           root.unmount();
//         }
//       );
//     }
//   };
//   const {appFactory} = import("./starer");

//   importShim<() => JSX.Element, {}>(
//     `${location.origin}/live/${codeSpace}/index.js/${i}`,
//   ).then((mod) => hydrateRoot(document.querySelectorAll("#root>div>div")[0], mod.default()));
//   // .then(() => {
//   //   setTimeout(() => {
//   //     const dry = true;
//   //     start(dry);
//   //     import("./prettierEsm").then((x) => x.prettierJs("dry"));
//   //     import("./esbuildEsm").then((x) => x.transform("dry"));
//   //   }, 1000);
//   // });
// } else {
//   const dry = false;
//   start(dry);
// }

export { codeSpace };
