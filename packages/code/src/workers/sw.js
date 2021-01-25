self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
self.importScripts("https://code.zed.vision/ipfs.js");

const {workbox} = self;
workbox.loadModule("workbox-precaching");

const { files, cid, reverseMap } = globalThis;

workbox.precaching.addRoute(
    Object.keys(files).filter(x => x.length).map(x => ({ url: x, revision: files[x] })),
    {
        urlManipulation: ({ url }) => {

            const { pathname } = url;
            const urls = [];

            if (pathname.indexOf("/ipfs/") === -1 && reverseMap[pathname]) {
                urls.push(new URL("https://code.zed.vision/ipfs/" + reverseMap[pathname]))
                urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + pathname));
            }

            if (pathname.indexOf("/ipfs/")) {
                const start = pathname.indexOf("/ipfs/");
                const reverseCID = pathname.slice(start + 6, start + 52);
        
                if (reverseMap[cid]) {
                    urls.push(new URL("https://code.zed.vision/ipfs/" + cid + "/" + reverseMap[reverseCID]))
                }
            }
            return urls;
        }
    }
)
