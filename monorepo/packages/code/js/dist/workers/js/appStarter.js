(()=>{var s={"@babel/standalone":"^7.17.1","@emotion/cache":"^11.7.1","@emotion/react":"^11.7.1","@emotion/styled":"^11.6.0","@isomorphic-git/lightning-fs":"isomorphic-git/lightning-fs","@mui/material":"^5.4.0","@spike.land/qrious":"^0.6.59","@types/babel__standalone":"^7.1.4","@types/isomorphic-git__lightning-fs":"^4.4.2","@types/prettier":"^2.4.3","@types/react":"17.0.39","async-mutex":"^0.3.2",comlink:"4.3.1","es-module-shims":"1.4.4","esbuild-plugin-import-map":"2.1.0","esbuild-wasm":"^0.14.18","framer-motion":"6.2.4",immutable:"^4.0.0","isomorphic-git":"^1.11.2",lodash:"^4.17.21","monaco-editor":"0.32.1","p-all":"4.0.0",preact:"^10.6.5","preact-render-to-string":"^5.1.19",prettier:"^2.5.1",react:"npm:@preact/compat","textdiff-create":"1.0.7","textdiff-patch":"1.0.6","workbox-cacheable-response":"6.4.2","workbox-cli":"6.4.2","workbox-precaching":"6.4.2","workbox-routing":"6.4.2","workbox-strategies":"6.4.2","workbox-sw":"6.4.2","workbox-window":"6.4.2"};window.esmsInitOptions={shimMode:!0,revokeBlobURLs:!0,fetch,resolve:(e,t)=>t+e,polyfillEnable:["css-modules","json-modules"],onerror:e=>console.log(e),noLoadEventRetriggers:!0,skip:/^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//};document.body.appendChild(Object.assign(document.createElement("script"),{async:!0,src:`https://unpkg.com/es-module-shims@${s["es-module-shims"]}/dist/es-module-shims.js`}));var n=String(`import {run} from "./dist/starter.mjs";

run();

(async()=>{
const { Workbox } = await import("workbox-window");

const wb = new Workbox("./sw.js");

wb.addEventListener("activated", async (event: WorkboxLifecycleEvent) => {
  if (!event.isUpdate) {
    console.log("Service worker activated for the first time!");
  }
});

wb.register();
})();`);document.body.appendChild(Object.assign(document.createElement("script"),{type:"module",src:"/dist/starter.mjs"}));})();
