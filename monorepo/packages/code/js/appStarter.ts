import "es-module-shims";

import importMap from "./importmap.json";

document.body.appendChild(Object.assign(document.createElement("script"), {
  type: "importmap-shim",
  innerHTML: JSON.stringify(importMap),
}));

(async (injectedRoom = "") => {
  // const esbuild = import("./esbuildEsm.ts");

  window.esmsInitOptions = {
    shimMode: true,
    revokeBlobURLs: true,
    fetch: myFetch,

    resolve: (id: string, parentUrl: string) => {
      return parentUrl + id;
    },
    polyfillEnable: ["css-modules", "json-modules"],
    onerror: (error) => console.log(error), // defaults to `((e) => { throw e; })`
    noLoadEventRetriggers: true,
    skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//,
  };

  async function myFetch(input: RequestInfo, init?: RequestInit) {
    const url = input.toString();

    const urlEnd = url.substring(-3);
    if (
      url.indexOf("monaco") === -1 && ["tsx", ".ts"].indexOf(urlEnd) !== -1
    ) {
      console.log(url);
      const res = await fetch(url, init);
      if (!res.ok) return res;

      const source = await res.text();
      return new Response(source, init);

      //https://localhost:8000/monorepo/packages/code/js/editor.ts
      // const { transform } = await importShim("./dist/esbuildEsm.mjs");

      //const transformed = await transform(source);

      // return new Response(
      //   new Blob([transformed], { type: "application/javascript" }),
      // );
    }
    return fetch(url, init);
  }

  // window.process = { env: { NODE_ENV: "production" } };

  const { run } = await importShim("./dist/starter.mjs");
  run(injectedRoom);

  const { Workbox } = await importShim("workbox-window");

  const wb = new Workbox("./sw.js");
  wb.addEventListener("activated", async (event) => {
    if (!event.isUpdate) {
      console.log("Service worker activated for the first time!");
    }
  });
  wb.register();
})();
