// import { Workbox } from "workbox-window";
import "es-module-shims";
import imap from "./importmap.json";
(async () => {
  // const esbuild = import("./esbuildEsm.ts");

  window.esmsInitOptions = {
    shimMode: false,
    revokeBlobURLs: true,

    resolve: (id: string, parentUrl: string) => {
      return parentUrl + id;
    },
    polyfillEnable: ["css-modules", "json-modules"],
    onerror: (error) => console.log(error), // defaults to `((e) => { throw e; })`
    noLoadEventRetriggers: true,
    skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//,
  };

  // async function myFetch(input: RequestInfo, init?: RequestInit) {
  //   const url = input.toString();

  //   const urlEnd = url.substring(-3);
  //   if (
  //     url.indexOf("monaco") === -1 && ["tsx", ".ts"].indexOf(urlEnd) !== -1
  //   ) {
  //     console.log(url);
  //     const res = await fetch(url, init);
  //     if (!res.ok) return res;

  //     const source = await res.text();
  //     return new Response(source, init);

  //     //https://localhost:8000/monorepo/packages/code/js/editor.ts
  //     // const { transform } = await importShim("./dist/esbuildEsm.mjs");

  //     //const transformed = await transform(source);

  //     // return new Response(
  //     //   new Blob([transformed], { type: "application/javascript" }),
  //     // );
  //   }
  //   return fetch(url, init);
  // }

  document.body.appendChild(Object.assign(document.createElement("script"), {
    type: "importmap-shims",
    innerHTML: JSON.stringify(imap),
  }));

  const { run } = await importShim(
    "./dist/starter.mjs",
  );
  run();
})();
