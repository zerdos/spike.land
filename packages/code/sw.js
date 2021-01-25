self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
self.importScripts("https://code.zed.vision/ipfs.js");

const { cid, files } = globalThis;
let currentCid = cid;

const { pathname } = self.location;

if (pathname.indexOf("/ipfs/") !== -1) {
    currentCid = pathname.slice(6, 52);
}

self.workbox.setConfig({
    debug: true,
});


self.workbox.loadModule("workbox-precaching");


const routes = Object.keys(files).filter(x => x.length).map(x => ({ url: "/" + x, revision: files[x] }));

if (cid === currentCid) {
    self.workbox.precaching.precacheAndRoute(
        routes,
        {
            urlManipulation: ({ url }) => {
                const { pathname } = url;
                if (pathname === "/") url.pathname = "index.html";
                return [url]
            }
        }
    )
}
else {
    fetch(`/ipfs/${currentCid}/js/workers/shaSums.json`).then(x => x.json()).then(files => {
        const routes = Object.keys(files).filter(x => x.length).map(x => ({ url: `/ipfs/${currentCid}/x`, revision: files[x] }));

        console.log(routes);
        self.workbox.precaching.precacheAndRoute(
            routes
        );
        self.workbox.precaching.cleanupOutdatedCaches();


    }

    )
}
