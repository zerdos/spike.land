import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

// workbox.setConfig({
//   debug: false,
// });

precacheAndRoute([{"revision":"048e85eb3a57bcd153f60249d9bae22c","url":"assets/app.css"},{"revision":"8c608256fb0273e3a36e6b603f71f213","url":"assets/fonts/KFOlCnqEu92Fr1MmEU9fBBc9.ttf"},{"revision":"806854d4422d0bd79e0f8c87c329a568","url":"assets/fonts/KFOlCnqEu92Fr1MmSU5fBBc9.ttf"},{"revision":"96559ffb5be917f1ce9f748bf4f34732","url":"assets/fonts/KFOlCnqEu92Fr1MmWUlfBBc9.ttf"},{"revision":"329ae1c377b1fb667f5be6abd50327fc","url":"assets/fonts/KFOmCnqEu92Fr1Mu4mxP.ttf"},{"revision":"bc73ad379628323dd8b59587bc5494aa","url":"assets/roboto.css"},{"revision":"17e5d7f3a6a57b5c42f1e60a6bc3a658","url":"assets/synthwave.webp"},{"revision":"9004e8a7889a9f9cfd1721e1430fcf8a","url":"assets/triangle-geometry.png"},{"revision":"d71147f38c8eba4b5184eeb97a7a58d4","url":"assets/zed-icon-big.png"},{"revision":"28f1dfbfc07e6095dde3876b81bdfacc","url":"babel.mjs"},{"revision":"4e7c0823170d06aba032222c0caede2a","url":"dev.html"},{"revision":"a7db92b6763ae44754e32223aecf862b","url":"dist/esbuildEsm-IHWMAF3R.mjs"},{"revision":"0e97ec64f9a037a036133562e17338c5","url":"dist/formatter-U4GMQGVN.mjs"},{"revision":"e349b939207b959b4412670a2dd8d012","url":"dist/LazyLoadedComponent.mjs"},{"revision":"5ce83e8cda9239bc199f8ae8b65669a1","url":"dist/mui.mjs"},{"revision":"af2fbd29ed449874d7a3009932ee2464","url":"dist/quickStart.mjs"},{"revision":"2be8e47158d62eeb58168cf05623cf58","url":"dist/renderPreviewWindow-IYSMHUFJ.mjs"},{"revision":"b48e0a0a68477dd4db146feb08f92120","url":"dist/renderPreviewWindow.mjs"},{"revision":"9f6fba3d4b70ddcf8f0245843c670fa2","url":"dist/renderToString-W4XCJNIT.mjs"},{"revision":"316cd6f2254c533127e538a566f1329b","url":"dist/renderToString.mjs"},{"revision":"b07f3105f13c24e073ea57cae64ab294","url":"dist/session-GUB2RX2C.mjs"},{"revision":"d8f017448b33ab453d03a57543d26215","url":"dist/session.mjs"},{"revision":"837798e5e5591a0bcd6fdee843e4a6b7","url":"dist/startMonaco-DVUBVLZL.mjs"},{"revision":"14c8560ff231b5b663ecb200f250f29f","url":"dist/startMonaco.mjs"},{"revision":"2ef1befbba33cdc5681a15b3130a0b40","url":"esbuildEsm.mjs"},{"revision":"bd7afef2da12f2e71a35302f6faa1115","url":"examples/starter_framer.js"},{"revision":"7693b53464fbcae8df2b27653087c784","url":"formatter.mjs"},{"revision":"d59d4e06002a5b8549c042ca4ce104da","url":"hello-world.js"},{"revision":"a7e571491dd213b1da54b41ee40efe7f","url":"hydrated.html"},{"revision":"67f1283438414100d102e84587635d77","url":"hydrateRoot.html"},{"revision":"83cbb9bee226ee0b110488b276dd7871","url":"importmap.json"},{"revision":"0688f6760164c8d5f9a1f48a33d1207e","url":"importScript.mjs"},{"revision":"95af8277cf17d8941af3fad936c93488","url":"index.html"},{"revision":"8dec863344f5838c9f884075f05774c1","url":"quickStart.mjs"},{"revision":"69c1e05731d438a473f92f68d66895db","url":"starter.mjs"},{"revision":"0188992ef66a1bc1ab5494c812bf3eb3","url":"sw.js"},{"revision":"2651f864dacad7cdc0b4e20133be55a1","url":"test.mjs"},{"revision":"c6fdf2a908f7ea613ea537a2666f6fb5","url":"uidV4.mjs"},{"revision":"6ba299d0e7eaffb2eda029c34f78bf00","url":"vendor/es-module-shims.wasm.js"},{"revision":"96d584c8cfd78ac84b0094980cfba4fc","url":"vendor/mui.mjs"},{"revision":"b6c117011092b63d7dc8b9b0232fee1e","url":"vendor/renderToString.mjs"},{"revision":"891b54222faeb2953dde97191c7b07c5","url":"workboxLoader.mjs"},{"revision":"790d468074d3632321fe6cc8d6abca7d","url":"workers/babel.worker.js"},{"revision":"77b74e9ad2affbe5f91ae61872e272b9","url":"workers/custom-worker.js"},{"revision":"c6279715ced465ed2728e78659b2270e","url":"workers/esbuild.worker.js"},{"revision":"8030ca2f2db7baef85b29a59825c8b23","url":"workers/getWorker.mjs"},{"revision":"d45eca244dd39209adf18e4d157ec501","url":"workers/prettierWorker.js"},{"revision":"cc61d874f9dabe79a8b5a46f07fabe37","url":"ws.mjs"}]);
// const { registerRoute } = workbox.routing;
// const { CacheFirst } = workbox.strategies;
// const { CacheableResponsePlugin } = workbox.cacheableResponse;

// // Const {CacheFirst} =  self.workbox.strategies;

// registerRoute(
//   ({ request }) =>
//     (request.url.includes("unpkg.com") && request.url.includes("@")) ||
//     (request.url.includes("jspm.io") && request.url.includes("@")) ||
//     (request.url.includes("esm.sh") && request.url.includes("@")),
//   new CacheFirst({
//     plugins: [
//       new CacheableResponsePlugin({ statuses: [0, 200] }),
//     ],
//   }),
// );

// let SW_VERSION = null;

// addEventListener("message", async (event) => {
//   if (event.data.type === "GET_VERSION") {
//     const resp = await fetch("./package.json");

//     const json = await resp.json();
//     SW_VERSION = json.version;

//     event.ports[0].postMessage(SW_VERSION);
//   }

//   // If (event.data.type === 'GET_PACKAGE_JSON') {

//   //   const resp = await fetch("https://spike.land/package.json");

//   //   const json = await resp.json();

//   //   event.ports[0].postMessage(JSON.stringify(json));
//   // }
// });

// // self.importScripts(
// //   "https://unpkg.com/ipfs@0.55.3/dist/index.min.js",
// // );

// // // self.importScripts(
// // //   ""
// // //   // "https://unpkg.com/ipfs-message-port-client@0.6.3/dist/index.min.js"
// // // )

// // // let port;

// // // const workerSrc = "./js/workers/ipfsWorker.js";

// // // if (typeof SharedWorker !== "undefined" ) {
// // //   const ipfsWorker = new SharedWorker(
// // //     workerSrc,
// // //   );
// // //   port = ipfsWorker.port;
// // // } else {
// // //   const worker = new Worker(workerSrc);

// // //   const { port1, port2 } = new MessageChannel();
// // //   const msg = {
// // //     clientInit: true,
// // //     port: port1,
// // //   };

// // //   worker.postMessage(msg, [port1]);

// // //   // eslint-disable-next-line no-unused-vars
// // //   port = port2;
// // // }

// // // const ipfsClient = self.IpfsMessagePortClient.from(port);

// // function concat (arrays, length) {
// //   if (!length) {
// //     length = arrays.reduce((acc, curr) => acc + curr.length, 0)
// //   }

// //   const output = new Uint8Array(length)
// //   let offset = 0

// //   for (const arr of arrays) {
// //     output.set(arr, offset)
// //     offset += arr.length
// //   }

// //   return output
// // }

// // const all = async (source) => {
// //   const arr = []

// //   for await (const entry of source) {
// //     arr.push(entry)
// //   }

// //   return arr
// // }

// // const ipfsCat = async (cid, opts) => {
// //   const options = opts || {};
// //   const res = self.Ipfs.cat(cid, options);

// //   const result = concat(
// //     await all(res),
// //   );
// //   const resultStr = toString(result);
// //   return resultStr;
// // };

// globalThis.register = () => {
//   const { cid, files, shaSums } = globalThis;

//   let currentCid = cid;

//   const { pathname } = self.location;

//   if (pathname.indexOf("/ipfs/") !== -1) {
//     currentCid = pathname.slice(6, 52);
//   }

//   // self.workbox.setConfig({
//   //   debug: true,
//   // });

//   self.workbox.loadModule("workbox-routing");
//   self.workbox.loadModule("workbox-precaching");
//   self.workbox.loadModule("workbox-strategies");
//   self.workbox.loadModule("workbox-cacheable-response");

//   const routes = Object.keys(files).filter((x) =>
//     x.length && x.indexOf(".") !== -1 && shaSums[x]
//   ).map((x) => ({
//     url: `/${x}`,
//     revision: files[x],
//     integrity: `sha256-${hexToBase64(shaSums[x])}`,
//   }));

//   self.workbox.precaching.precacheAndRoute(
//     routes,
//     {
//       urlManipulation: ({ url }) => {
//         const { pathname } = url;
//         if (pathname === "/") url.pathname = "/index.html";
//         const fileName = pathname.slice(1);
//         const fileCid = files[fileName];

//         const urlList = [
//           new URL(
//             `https://spike.land/ipfs/${currentCid}/${fileName}`,
//           ),
//         ];
//         if (fileCid) {
//           urlList.push(
//             new URL(`https://spike.land/ipfs/${fileCid}`),
//             new URL(`https://cf-ipfs.com/ipfs/${fileCid}`),
//           );
//         }

//         return urlList;
//       },
//     },
//   );

//   self.workbox.routing.registerRoute(
//     ({ url }) => url.origin.indexOf("spike.land") === -1,
//     new self.workbox.strategies.CacheFirst({
//       cacheName: "cdn-cache",
//       plugins: [
//         new self.workbox.cacheableResponse.CacheableResponsePlugin({
//           statuses: [200],
//         }),
//       ],
//     }),
//   );

//   self.addEventListener("fetch", (event) => {
//     if (event.request.url.endsWith("/ipfs/haha")) {
//       event.respondWith((async () => {
//         // Configure the strategy in advance.

//         // const strategy = new self.workbox.strategies.CacheFirst({
//         //   cacheName: "ipfs-cache",
//         // });

//         // // Make two requests using the strategy.
//         // // Because we're passing in event, event.waitUntil() will be called automatically.
//         // const firstPromise = strategy.handle({
//         //   event,
//         //   request: "https://example.com/api1",
//         // });
//         // const secondPromise = strategy.handle({
//         //   event,
//         //   request: "https://example.com/api2",
//         // });

//         // const [firstResponse, secondResponse] = await Promise.all(
//         //   firstPromise,
//         //   secondPromise,
//         // );
//         // const [firstBody, secondBody] = await Promise.all(
//         //   firstResponse.text(),
//         //   secondResponse.text(),
//         // );

//         // Assume that we just want to concatenate the first API response with the second to create the
//         // final response HTML.
//         // const compositeResponse = new Response(await globalThis.ipfsCat("QmS7udzEsQxu8netTzmuRHCniiSUqGuMtCUeJLRepouoG3"), {
//         //   headers: { "content-type": "text/html" },
//         // });
//         const compositeResponse = new Response("yeah. Haha.", {
//           headers: { "content-type": "text/html" },
//         });
//         return compositeResponse;
//       })());
//     }
//   });
// };

// function hexToBase64(hexString) {
//   return btoa(
//     hexString.match(/\w{2}/g).map(function (a) {
//       return String.fromCharCode(parseInt(a, 16));
//     }).join(""),
//   );
// }
