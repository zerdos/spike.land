(() => {
  // ../code/dist/versions.js
  function versions_default() {
    const editor = "11.2.18";
    const v = {
      ipfs: "0.52.4-rc.4",
      babel: "7.12.12",
      code: "11.2.18",
      emotionRenderer: "11.2.18",
      shadb: "11.2.0",
      prettier: "2.2.1",
      editor: `https://unpkg.com/@zedvision/smart-monaco-editor@${editor}/dist/editor.js`,
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
    const cache = caches.default;
    let response = await cache.match(request);
    if (!response || response.url !== `https://unpkg.com/@zedvision/code@${versions_default().code}/ipfs.html`) {
      response = await fetch(`https://unpkg.com/@zedvision/code@${versions_default().code}/ipfs.html`);
      await cache.put(request, response.clone());
    }
    if (response.status > 399) {
      response = new Response(response.statusText, {status: response.status});
    }
    return response;
  }
})();
