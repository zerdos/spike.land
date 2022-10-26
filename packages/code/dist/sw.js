"use strict";
(() => {
  // sw.mjs
  var bc = new BroadcastChannel(location.origin);
  var mocks = {};
  bc.onmessage = (event) => {
    console.log(event);
    if (event.data.type === "set-mock") {
      mocks[event.data.filePath] = event.data.content;
    }
  };
  (void 0).onfetch = (event) => {
    const url = new URL(event.request.url);
    if (url.href === "/mocks") {
      return event.respondWith(
        new Response(JSON.stringify(mocks), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Cache-Control": "no-cache"
          }
        })
      );
    }
    if (mocks[event.request.url]) {
      return event.respondWith(
        new Response(mocks[event.request.url])
      );
    }
    return event.respondWith(fetch(event.request));
  };
})();
