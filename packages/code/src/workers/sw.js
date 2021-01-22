importScripts(
  "../../node_legacy/workbox-sw.js",
);
importScripts("/ipfs.js");
// importScripts("./files.umd.js")

const {files, cid} = globalThis;

// @ts-ignore
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-routing");

registerRoute(
  new RegExp(`/ipfs/${cid}/*`),
  async ({url, request, event, params}) => {
    const pathCID = files[url.slice(53 + url.indexOf("/ipfs/"))];
    const request = fetch(`https://code.zed.vision/ipfs/${pathCID}`);

    const response = await fetch(request);
    const responseBody = await response.text();
    
    return new Response(responseBody, {
      headers: response.headers,
    });
  } 
);

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
