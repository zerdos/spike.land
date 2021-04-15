self.importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js",
);

self.importScripts(
  "https://unpkg.com/ipfs@0.54.4/dist/index.min.js",
);

// self.importScripts(
//   ""
//   // "https://unpkg.com/ipfs-message-port-client@0.5.4/dist/index.min.js"
// )

// let port;

// const workerSrc = "./js/workers/ipfsWorker.js";



// if (typeof SharedWorker !== "undefined" ) {
//   const ipfsWorker = new SharedWorker(
//     workerSrc,
//   );
//   port = ipfsWorker.port;
// } else {
//   const worker = new Worker(workerSrc);

//   const { port1, port2 } = new MessageChannel();
//   const msg = {
//     clientInit: true,
//     port: port1,
//   };

//   worker.postMessage(msg, [port1]);

//   // eslint-disable-next-line no-unused-vars
//   port = port2;
// }

// const ipfsClient = self.IpfsMessagePortClient.from(port);

function concat (arrays, length) {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return output
}


const all = async (source) => {
  const arr = []

  for await (const entry of source) {
    arr.push(entry)
  }

  return arr
}


const ipfsCat = async (cid, opts) => {
  const options = opts || {};
  const res = self.Ipfs.cat(cid, options);

  const result = concat(
    await all(res),
  );
  const resultStr = toString(result);
  return resultStr;
};



globalThis.register = () => {
  const { cid, files, shaSums } = globalThis;

  let currentCid = cid;

  const { pathname } = self.location;

  if (pathname.indexOf("/ipfs/") !== -1) {
    currentCid = pathname.slice(6, 52);
  }

  // self.workbox.setConfig({
  //   debug: true,
  // });

  self.workbox.loadModule("workbox-routing");
  self.workbox.loadModule("workbox-precaching");
  self.workbox.loadModule("workbox-strategies");
  self.workbox.loadModule("workbox-cacheable-response");

  const routes = Object.keys(files).filter((x) =>
    x.length && x.indexOf(".") !== -1 && shaSums[x]
  ).map((x) => ({
    url: `/${x}`,
    revision: files[x],
    integrity: `sha256-${hexToBase64(shaSums[x])}`,
  }));

  self.workbox.precaching.precacheAndRoute(
    routes,
    {
      urlManipulation: ({ url }) => {
        const { pathname } = url;
        if (pathname === "/") url.pathname = "/index.html";
        const fileName = pathname.slice(1);
        const fileCid = files[fileName];

        const urlList = [
          new URL(
            `https://code.zed-vision.workers.dev/ipfs/${currentCid}/${fileName}`,
          ),
        ];
        if (fileCid) {
          urlList.push(
            new URL(`https://code.zed-vision.workers.dev/ipfs/${fileCid}`),
            new URL(`https://cf-ipfs.com/ipfs/${fileCid}`),
          );
        }

        return urlList;
      },
    },
  );

  self.workbox.routing.registerRoute(
    ({ url }) => url.origin.indexOf("workers.dev") === -1,
    new self.workbox.strategies.CacheFirst({
      cacheName: "cdn-cache",
      plugins: [
        new self.workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
  );

  self.addEventListener("fetch", (event) => {
    if (event.request.url.endsWith("/ipfs")) {
      event.respondWith((async () => {
        // Configure the strategy in advance.

     


        // const strategy = new self.workbox.strategies.CacheFirst({
        //   cacheName: "ipfs-cache",
        // });

        // // Make two requests using the strategy.
        // // Because we're passing in event, event.waitUntil() will be called automatically.
        // const firstPromise = strategy.handle({
        //   event,
        //   request: "https://example.com/api1",
        // });
        // const secondPromise = strategy.handle({
        //   event,
        //   request: "https://example.com/api2",
        // });

        // const [firstResponse, secondResponse] = await Promise.all(
        //   firstPromise,
        //   secondPromise,
        // );
        // const [firstBody, secondBody] = await Promise.all(
        //   firstResponse.text(),
        //   secondResponse.text(),
        // );

        // Assume that we just want to concatenate the first API response with the second to create the
        // final response HTML.
        const compositeResponse = new Response(await ipfsCat("QmS7udzEsQxu8netTzmuRHCniiSUqGuMtCUeJLRepouoG3"), {
          headers: { "content-type": "text/html" },
        });

        return compositeResponse;
      })());
    }
  });


};

function hexToBase64(hexString) {
  return btoa(
    hexString.match(/\w{2}/g).map(function (a) {
      return String.fromCharCode(parseInt(a, 16));
    }).join(""),
  );
}
