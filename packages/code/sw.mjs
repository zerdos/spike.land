"use strict";

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

this.onfetch = (event) => {
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

  if (mocks[event.request.url]) {
    return event.respondWith(
      new Response(mocks[event.request.url]),
    );
  }

  return event.respondWith(fetch(event.request));
};
