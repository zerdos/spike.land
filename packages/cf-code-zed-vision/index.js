(() => {
  // ../code/src/versions.js
  function versions_default() {
    const v = {
      ipfs: "0.52.4-rc.4",
      babel: "7.12.12",
      code: "11.2.7",
      emotionRenderer: "11.2.0",
      shadb: "11.2.0",
      prettier: "2.2.1",
      editor: "11.2.10",
      diff: "11.2.0",
      sha256: "11.0.5",
      uuid: "8.3.2",
      comlink: "4.3.0"
    };
    return v;
  }

  // src/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    const {searchParams, pathname} = url;
    const v = versions_default();
    const cache = caches.default;
    let response = await cache.match(request);
    if (!response || response.url !== `https://unpkg.com/@zedvision/code@${v.code}/ipfs.html`) {
      response = await fetch(`https://unpkg.com/@zedvision/code@${v.code}/ipfs.html`);
      await cache.put(request, response.clone());
    }
    if (response.status > 399) {
      response = new Response(response.statusText, {status: response.status});
    }
    return response;
  }
})();
