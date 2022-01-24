import importMap from "./importmap.json";
import React from "react";
import ReactDOM from "react-dom";
import * as emotionReact from "@emotion/react";

document.body.appendChild(Object.assign(document.createElement("script"), {
  type: "importmap-shim",
  innerHTML: JSON.stringify(importMap),
}));

(async (injectedRoom = "") => {
  window.React = React;
  window.ReactDOM = ReactDOM;
  window.emotionReact = emotionReact;

  window.esmsInitOptions = {
    shimMode: true,
    polyfillEnable: ["css-modules", "json-modules"],
    onerror: (error) => console.log(error), // defaults to `((e) => { throw e; })`
    fetch: async function (url, options) {
      const urlEnd = url.substr(-3);
      if (
        url.indexOf("monaco") === -1 && ["tsx", ".ts"].indexOf(urlEnd) !== -1
      ) {
        console.log(url);
        const res = await fetch(url, options);
        if (!res.ok) return res;

        const source = await res.text();
        return source;

        // const transformed = await transform(source);
        // return new Response(
        //   new Blob([transformed], { type: "application/javascript" }),
        // );§
      }
      return fetch(url, options);
    },
    noLoadEventRetriggers: true,
    skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//,
  };

  window.process = { env: { NODE_ENV: "production" } };

  await import(
    "es-module-shims/wasm"
  );
  const { importShim } = self;
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
