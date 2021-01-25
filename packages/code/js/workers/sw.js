self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
self.importScripts('./files.umd.js')



self.workbox.setConfig({
    debug: true,
  });

  
self.workbox.loadModule("workbox-precaching");

const { files } = globalThis;
const routes = Object.keys(files).filter(x => x.length).map(x => ({ url: x, revision: files[x] }));

self.workbox.precaching.precacheAndRoute(
    routes
    // {
    //     urlManipulation: ({ url }) => {

    //         const { pathname } = url;
    //         const urls = [];

    //         if (pathname.slice(0,4)==="/sw/"){
    //             urls.push(new URL("https://code.zed.vision/ipfs/"+cid+"/"+pathname.slice(4)))
    //         }else if (pathname.indexOf("/ipfs/") === -1 && reverseMap[pathname]) {
    //             urls.push(new URL("https://code.zed.vision/ipfs/" + reverseMap[pathname]))
    //             urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + pathname));
    //         } else if (pathname.slice(0,6) === "/ipfs/") {
    //             const start = pathname.indexOf("/ipfs/");
    //             const reverseCID = pathname.slice(start + 6, start + 52);
        
    //             if (reverseMap[cid]) {
    //                 urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + reverseMap[reverseCID]))
    //             }
    //         }
    //         return urls;
    //     }
    // }
)
