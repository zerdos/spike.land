import { md5 } from "./js/md5";

const bc = new BroadcastChannel(location.origin);
const mocks = {};

bc.onmessage = (event) => {
  console.log(event);
  if (event.data.type === "set-mock") {
    mocks[event.data.filePath] = event.data.content;
  }
};

// async function wait(delay) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });
// }

let lastChecked = 0;
let cache;
let cacheName;
let getCacheName = () =>
  fetch(location.origin + "/files.json").then(files => files.ok && files.text()).then(content => md5(content)).then(
    cn => (cn === cacheName || (cache = null) || (cacheName = cn)),
  );
self.addEventListener("fetch", async (event) => {
  if (!cache) cache = await caches.open(await getCacheName());
  const url = new URL(event.request.url);
  if (url.href === "/mocks") {
    return event.respondWith(
      new Response(JSON.stringify(mocks), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "no-cache",
        },
      }),
    );
  }

  if (Date.now() - lastChecked > 10_000) {
    lastChecked = Date.now();
  }

  const cacheKey = new Request(event.request.url);
  const cachedResp = await cache.match(cacheKey);

  if (cachedResp) return cachedResp;

  if (mocks[event.request.url]) {
    return event.respondWith(
      new Response(mocks[event.request.url]),
    );
  }
  const resp = await fetch(event.request);
  if (resp.ok) await cache.put(cacheKey, resp.clone());

  return event.respondWith(resp);
});
