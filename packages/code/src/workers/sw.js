importScripts(
  "../../node_legacy/workbox-sw.js",
);
importScripts("/cid.umd.js")
importScripts("/files.umd.js");
// importScripts("./files.umd.js")

const {files} = globalThis;

// @ts-ignore
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-routing");

registerRoute(
  new RegExp('/ipfs/QmPLS43S1qjBzx6JMPS9kkUNWEuy6c6PrZtSAqkD2VBp1a/*'),
  handlerCb
);

// @ts-ignore
self.addEventListener(
  "fetch", /**
 * @param {{ respondWith?: any; request?: any; }} event
 */
  (event) => {
    const { request } = event;
    const { url} = request;
    // const {origin, pathname} = new URL(url);
    // const filePath = pathname.slice(53);
    // const cid = files[filePath];
    // if (cid){
    //   const cacheFirst = new workbox.strategies.CacheFirst();
    //   event.respondWith(fetch(`${origin}/ipfs/${cid}`));
    // }
     if ( 
      url.indexOf("/ipfs/") !== -1 && files[url.slice(53+url.indexOf("/ipfs/"))]
    ) {
      console.log("IPFS cache!")
      const cid = files[url.slice(53 + url.indexOf("/ipfs/"))];
      const request = fetch(`https://code.zed.vision/ipfs/${cid}`);
      // @ts-ignore
      const cacheFirst = new workbox.strategies.CacheFirst();
      event.respondWith(cacheFirst.handle({ event, request }));
    }
    else {
      console.log("no cache", url.slice(53 + url.indexOf("/ipfs/"))); 
    }
  }
);
