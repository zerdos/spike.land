import { defer, selectClient, toReadableStream } from "./service/util";
import { IPFSClient } from "ipfs-message-port-client";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import pMap from 'p-map';

const IPFS_SERVER_URL = "./worker.js";

/**
 * @param {LifecycleEvent} event
 */
const oninstall = async (event) => {
  // We don't want to wait for old workers to be deactivated before the
  // new one gets activated
  event.waitUntil(event.target.skipWaiting());
};

/**
 * @param {LifecycleEvent} event
 */

let cache = {};

const hashResp = {};

async function update() {
    const filesResp = await (fetch("https://spike.land/files.json"));
    const files = await filesResp.json();
    if (files) {
      cache = files;
    }
}

const updateCacheNOW = debounce(update, 500);

const updateCache = throttle(update, 60_000);

const onactivate = async (event) => {
  // We want to start handling requests right away, so that requests from the
  // very first page will be handled by service worker. Which is why we claim
  // clients.

  event.waitUntil(event.target.clients.claim());
};

const mapper = async (name) => {

  const withHash = cache[name];

  if (hashResp[withHash] && hashResp[withHash].ok) {


  const resp = await fetch(new URL(withHash, "https://spike.land"));
  if (resp.ok) {
  
  
  const blob =  await resp.blob();  
  const clone = resp.clone()
  hashResp[withHash] = new Response(blob, {url: new URL(name, "https://spike.land"), headers: clone.headers });


  }
  }
};

function onPeriodicSync( event){
  if (event.tag == 'get-latest-news') {
    event.waitUntil((async()=>{
      await update();
      await pMap(Object.keys(cache), mapper,  {concurrency: 2});
    })());
  }
}

export async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

/**
 * @param {Fetch} event
 */
const onfetch = (event) => {
  updateCache();
  const url = new URL(event.request.url);

  const loc = url.pathname.slice(1);
  if (cache[loc] && hashResp[cache[loc]]) {
    event.respondWith((async () => hashResp[cache[loc]].clone())());
  }
  if (cache[loc]) {
    return event.respondWith((async () => {
      let resp = await fetch( new URL(cache[loc], "https://spike.land")   );

      if (!resp.ok) {
        updateCacheNOW();
        await wait(1000);
        resp = await fetch(new URL(cache[loc], "https://spike.land")   );
      }

      if (!res.ok) return resp.clone();

      hashResp[cache[loc]] = resp.clone();

      return hashResp[cache[loc]];
    })());
  }

  try {
    switch (url.origin) {
      // Our service worker only serves pages for its own page origin
      case location.origin: {
        const paths = url.pathname.split("/");
        if (paths.length > 2) {
          const protocol = paths[1];
          switch (protocol) {
            // If requests are for `/ipfs/...` or `/ipns/` URLs we respond with
            // a content viewer which is a page containing an iframe
            // for actual content like <iframe src=`/view${url.pathname}` />
            // and a script that we can talk to in order to obtain a connection to the shared IPFS node via a MessagePort.
            // This might be confusing but this wrapper page is what allows this
            // service worker to obtain a MessagePort, otherwise there may not even
            // be a page that will start a shared worker, nor a way to get a message
            // port for it.
            case "ipfs":
            case "ipns":
              return event.respondWith(fetchViewer({ url }));
            // If requests are for `/view/...` URL those are requests from iframes
            // for the content.
            case "view":
              console.log(
                "VIEW! Fetching the content: " +
                  url.pathname.slice(protocol.length + 1),
              );
              return event.respondWith(fetchContent({
                event,
                path: url.pathname.slice(protocol.length + 1),
              }));
              // Anything else might be for scripts, source maps etc.. we just fetch
              // those from network
              return event.respondWith(
                fetch(event.request).catch((e) => console.log({ url, event })),
              );
          }
        }
      }
      // Requests to other origins are fetched from the network.
      default:
        try {
          return event.respondWith(fetch(event.request));
        } catch {
          console.error(url);
        }
    }
  } catch {
    console.error(url);
  }
};

/**
 * Generates a simple page which:
 *
 * 1. Embeds JS that will provide us message port on request.
 * 2. Embeds iframe to load an actual content.
 *
 * @param {Object} options
 * @param {URL} options.url
 */
const fetchViewer = async ({ url }) => {
  const body = new Blob([`<html lang="en">
<head>
  <title>${url.pathname}</title>
</head>
<body>
  <iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${url.pathname}"></iframe>
  <script defer src="https://spike.land/main.js"></script>
  </body>
</html>
`], { type: "text/html" });
  return new Response(body, {
    status: 200,
  });
};

/**
 * Fetches content from the IPFS and responds with it.
 *
 * @param {Object} options
 * @param {Fetch} options.event
 * @param {string} options.path
 */
const fetchContent = async ({ event, path }) => {
  const [, protocol] = path.split("/");
  switch (protocol) {
    case "ipns":
      return event.respondWith(fetchIPNSContent({
        event,
        path,
      }));
    case "ipfs":
      return event.respondWith(fetchIPFSContent({
        event,
        path,
      }));
    default:
      const response = await unsupportedProtocol(protocol);
      return response;
  }
};

/**
 * @param {Object} options
 * @param {Fetch} options.event
 * @param {string} options.path
 */
const fetchIPNSContent = async ({/* path, event */}) => {
  // Challenge: Implement IPNS support.
  return new Response(
    `<html>
  <body>
    <h1>IPNS protocol support is not implemented</h1>
    <p>It is left as an excercise to the viewer</p>
  </body>
</html>`,
    {
      statusText: "IPNS support is not implemented",
      status: 502,
    },
  );
};

/**
 * @param {Object} options
 * @param {Fetch} options.event
 * @param {string} options.path
 */
const fetchIPFSContent = async ({ event, path }) => {
  // Obtains IPFS inst.statance
  console.log("IPFS");
  const ipfs = await createIPFSClient(event);
  console.log({ ipfs });
  try {
    const stat = await ipfs.files.stat(path);
    switch (stat.type) {
      case "file": {
        return await fetchIPFSFile(ipfs, path);
      }
      case "directory": {
        if (!path.endsWith("/")) {
          return Response.redirect(`${event.request.url}/`);
        } else {
          // try index.html file in this directory if there is such file
          // render it otherwise render directory
          const index = `${path}index.html`;
          const stat = await ipfs.files.stat(index).catch(() => ({
            type: null,
          }));
          return stat.type === "file"
            ? fetchIPFSFile(ipfs, index)
            : await fetchIPFSDirectory(ipfs, path);
        }
      }
      default: {
        // If non file redirect to ipld explorer
        return Response.redirect(`https://explore.ipld.io/#/explore${path}`);
      }
    }
  } catch ({ message }) {
    console.error(message);

    // If such link does not exists respond with 404
    if (
      message.startsWith("no link named") || message.includes("does not exist")
    ) {
      return new Response(message, {
        statusText: message,
        status: 404,
      });
    }

    // If problem with CID respond with 400
    if (message.includes("invalid")) {
      return new Response(message, {
        statusText: message,
        status: 400,
      });
    }

    // Otherwise respond with 500
    return new Response(message, {
      statusText: message,
      status: 500,
    });
  }
};

/**
 * @param {IPFS} ipfs
 * @param {string} path
 */
const fetchIPFSFile = async (ipfs, path) => {
  const content = ipfs.cat(path);
  const body = toReadableStream(content);
  // Note: Browsers by default perform content sniffing to do a content type
  // decetion https://developer.mozilla.org/en-US/docs/Mozilla/How_Mozilla_determines_MIME_Types
  // but it is limited to web relevant content and seems to exclude svg.
  // Here we fix svg support that otherwise breaks many pages doing proper content
  // type detection is left as an excercise to the reader.
  const contentType = path.endsWith(".svg")
    ? { "content-type": "image/svg+xml" }
    : null;

  return new Response(body, {
    status: 200,
    headers: {
      ...contentType,
    },
  });
};

/**
 * @param {IPFS} ipfs
 * @param {string} path
 */
const fetchIPFSDirectory = async (ipfs, path) => {
  return new Response(toReadableStream(renderDirectory(ipfs, path)), {
    headers: {
      "content-type": "text/html",
    },
    status: 200,
  });
};

/**
 * @param {IPFS} ipfs
 * @param {string} path
 * @param {number} [limit=174]
 * @returns {AsyncIterable<Uint8Array>}
 */
const renderDirectory = async function* (ipfs, path, limit = 64) {
  const encoder = new TextEncoder();
  yield encoder.encode(`<html><h3>Index of ${path}<h3><ul>`);

  for await (const entry of ipfs.ls(path)) {
    yield encoder.encode(renderDirectoryEntry(path, entry));
    if (--limit < 0) {
      break;
    }
  }

  yield encoder.encode(`</ul>${limit < 0 ? PAGINATION_NOTE : ""}</html>`);
};

const PAGINATION_NOTE =
  "<h2>Directory has too many entries</h2><p><mark>Implementing a pagination is left as an excercise to the viewer</mark></p></h2>";

/**
 * @param {string} base
 * @param {import('ipfs-message-port-client/src/core').LsEntry} entry
 */
const renderDirectoryEntry = (base, entry) =>
  `<li>
  <div class="type-${entry.type}"><a href="/view${base}${entry.name}">${entry.name}<a></div>
  <small>${entry.cid.toString()}</small>
  <details><pre>${JSON.stringify(entry, null, 2)}</pre></details>
</li>`;

/**
 * @param {string} protocol
 */
const unsupportedProtocol = async (protocol) => {
  return new Response(
    `<html>
    <body>
      <h1>Protocol ${protocol} is not supported</h1>
    </body>
</html>`,
    {
      statusText: `Unsupported protocol ${protocol}`,
      status: 405,
    },
  );
};

/**
 * Obtains MessagePort for the SharedWorker operating IPFS node and
 * creates a client for it.
 *
 * @param {Fetch} context .**/

const createIPFSClient = async (context) => {
  // Selects a service worker client that can be used to obtain a message port
  // from, then sends a request to it and once a response is obtained, creates a
  // IPFS client and returns it
  console.log("SELECTING  THE CLIENT");
  const client = await selectClient(context.target);
  console.log("The client is...", client);
  const port = await requestIPFSPort(client);
  console.log("The port is:", port);
  return IPFSClient.from(port);
};

/** @type {Record<string, { promise: Promise<MessagePort>, resolve(port:MessagePort):void, reject(error:Error):void }>} */
const portRequests = {};

/**
 * Sends a message prot request to the window client and waits for the response.
 * Returns promise for the message port it will receive.
 *
 * @param {WindowClient} client
 * @returns {Promise<MessagePort>}
 */

const requestIPFSPort = (client) => {
  // We might receive multiple concurrent requests from the same client (e.g.
  // images, scripts, stylesheets for the page) to avoid creating a port for
  // each request we use a little table keyed by client id instead.
  const request = portRequests[client.id];

  if (request == null) {
    const request = defer();
    portRequests[client.id] = request;
    client.postMessage({
      method: "ipfs-message-port",
      id: client.id,
    });
    return request.promise;
  } else {
    return request.promise;
  }
};

/**
 * Listens to the messages from the clients if it is response to pending message
 * port request resolves it.
 *
 * @param {MessageEvent} event
 */

const onmessage = ({ data }) => {
  if (data) {
    const request = portRequests[data.id];
    if (request != null) {
      delete portRequests[data.id];
      if (data.port instanceof MessagePort) {
        request.resolve(data.port);
      } else {
        request.reject(new Error(data.error));
      }
    }
  }
};

/**
 * Sets up service worker event handlers.
 * @param {any} self
 */
const setup = (self) => {

  self.oninstall = oninstall;
  self.onactivate = onactivate;
  self.onfetch = onfetch;
  self.onmessage = onmessage;
  self.onperiodicsync = onPeriodicSync;
};

setup(self);
export {};

//import { precacheAndRoute } from "workbox-precaching";
//import { registerRoute } from "workbox-routing";
//import { StaleWhileRevalidate } from "workbox-strategies";
//import { CacheableResponsePlugin } from "workbox-cacheable-response";
// import path from "path-browserify";
// import git from "isomorphic-git";
// import http from "isomorphic-git/http/web";
// import LightningFS from "@isomorphic-git/lightning-fs";

// const fs = new LightningFS("fs");

// const dir = "/test-clone";
// git.clone({
//   fs,
//   http,
//   dir,
//   url: "https://github.com/spike-land/monorepo",
//   corsProxy: "https://cors.isomorphic-git.org",
// }).then(console.log);

//declare const self: ServiceWorkerGlobalScope;

//precacheAndRoute(self.__WB_MANIFEST);
// const { registerRoute } = workbox.routing;
// const { CacheFirst } = workbox.strategies;
// const { CacheableResponsePlugin } = workbox.cacheableResponse;

// // Const {CacheFirst} =  self.workbox.strategies;

//registerRoute(
//  ({ request }) =>
//    (request.url.includes("unpkg.com") && request.url.includes("@")) ||
//   (request.url.includes("jspm.io") && request.url.includes("@")) ||
//  (request.url.includes("/chunks")) ||
//  (request.url.includes("esm.sh") && request.url.includes("@")),
// new StaleWhileRevalidate({
// matchOptions: {
// ignoreVary: true,
//ignoreSearch: true,
// },
// plugins: [
// new CacheableResponsePlugin({ statuses: [0, 200] }),
// ],
//  }),/
//);

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
// //   "https://unpkg.com/ipfs@0.55.3/public/index.min.js",
// // );

// // // self.importScripts(
// // //   ""
// // //   // "https://unpkg.com/ipfs-message-port-client@0.6.3/public/index.min.js"
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
