importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
importScripts("/ipfs.js");

workbox.loadModule("workbox-precaching");

const { files, cid, reverseMap } = globalThis;

// @ts-ignore


// workbox.precaching.precacheAndRoute([
//   {url: '/src/codeLoader.js', revision: files["src/codeLoader.js"]},
//   `/ipfs/${files["src/codeLoader.js"]}`,
// ]);

workbox.precaching.addRoute(
  Object.keys(files).filter(x=>x.length).map(x=>({url: x, revision: files[x]})),
 { urlManipulation: ({url}) => {

console.log(url);

  const urls =  [`/ipfs/${cid}/${url}`,

  ];

  if (url.indexOf("/ipfs/")) {
    const start = url.indexOf("/ipfs/");
    const reverseCID = url.slice(start+6, start +52);
    if (reverseMap[cid]) {
      urls.push(`/ipfs/${cid}/${reverseMap[reverseCID]}`)
    }
  } 

  
     



  return urls;
  }}
)

// workbox.precaching.precacheAndRoute([
//   {url: '/src/data.js', revision: files["src/data.js"]},
//   `/ipfs/${files["src/data.js"]}`,
// ]);

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
