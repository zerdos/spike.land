importScripts(
  "../../node_legacy/workbox-sw.js",
);
importScripts("/ipfs.js");
// importScripts("./files.umd.js")

const {files, cid} = globalThis;

// @ts-ignore
workbox.loadModule("workbox-precaching");

workbox.precaching.precacheAndRoute([
  {url: '/src/codeLoader.js', revision: "lelleldld"},
  `/ipfs/${files["src/codeLoader.js"]}`,
]);

// const addRoute = workbox.precaching;
// addRoute(
//   {url: "index.html", files["index.html"] )


// const {Router, Routing, RegExpRoute} = workbox.routing;
// const router = new Router();

// router.registerRoute(new RegExpRoute( new RegExp(cid +"\/*")), async ({request, url, event}) => {
//     console.log("URL ASYnc");
//     const pathCID = files[url.slice(53 + url.indexOf("/ipfs/"))];
//     const response = await fetch(`https://code.zed.vision/ipfs/${pathCID}`).then(r=>r.arrayBuffer());

//     const cacheFirst = new workbox.strategies.CacheFirst();
//     return cacheFirst.handle({ event, request, url, response });
// }
// );

// // @ts-ignore
// self.addEventListener(
//   "fetch", /**
//  * @param {{ respondWith?: any; request?: any; }} event
//  */
//   (event) => {
//     const { request } = event;
//     const { url} = request;
//     // const {origin, pathname} = new URL(url);
//     // const filePath = pathname.slice(53);
//     // const cid = files[filePath];
//     // if (cid){
//     //   const cacheFirst = new workbox.strategies.CacheFirst();
//     //   event.respondWith(fetch(`${origin}/ipfs/${cid}`));
//     // }
//      if ( 
//       url.indexOf("/ipfs/") !== -1 && files[url.slice(53+url.indexOf("/ipfs/"))]
//     ) {
//       console.log("IPFS cache!")
//       const cid = files[url.slice(53 + url.indexOf("/ipfs/"))];
//       const request = fetch(`https://code.zed.vision/ipfs/${cid}`);
//       // @ts-ignore
//       const cacheFirst = new workbox.strategies.CacheFirst();
//       event.respondWith(cacheFirst.handle({ event, request }));
//     }
//     else {
//       console.log("no cache", url.slice(53 + url.indexOf("/ipfs/"))); 
//     }
//   }
// );
