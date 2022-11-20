import "core-js/stable";
import "es-module-shims";
// import { md5 } from "./md5";
// import { createJsBlob } from "starter";
import importmap from "./importmap.json";
const imp: { [key: string]: string } = { ...importmap.imports };
const res = {};
Object.keys(imp).map((k) => Object.assign(res, { [k]: location.origin + imp[k] }));

importShim.addImportMap({ imports: res });

// const runtime = () => {
//   const React = require("react");
//   Object.assign(globalThis, { React });

//   const ReactDOM = require("react-dom");
//   Object.assign(globalThis, { ReactDOM });

//   const ReactDOMClient = require("react-dom/client");
//   Object.assign(globalThis, { ReactDOMClient });

//   // const ReactDOMServer = require("react-dom/server");
//   // Object.assign(globalThis, { ReactDOMServer });

//   const ReactJSXRuntime = require("react/jsx-runtime");
//   Object.assign(globalThis, { ReactJSXRuntime });

//   // const emotionReact = require("@emotion/react");
//   // Object.assign(globalThis, { emotionReact });
//   // emotionReact.cssNonMemo = emotionReact.css;
//   // const cssCache: { [key: string]: unknown } = {};
//   // emotionReact.css = function() {
//   //   const cache = md5(arguments[0].join(""));
//   //   return cssCache[cache] = cssCache[cache]
//   //     || emotionReact.cssNonMemo.apply(this, arguments);
//   // };

//   // const emotionReactJsxRuntime = require("@emotion/react/jsx-runtime");
//   // Object.assign(globalThis, { emotionReactJsxRuntime });
//   // emotionReactJsxRuntime.emotionJsx = emotionReactJsxRuntime.jsx;

//   // const createEmotionCache = require("@emotion/cache");
//   // Object.assign(globalThis, { createEmotionCache });

//   // const styled = require("@emotion/styled");
//   // Object.assign(globalThis, { styled });

//   // emotionReactJsxRuntime.jsx = function() {
//   //   const props = arguments[1];
//   //   if (Object.hasOwn(props, "css") && typeof props.css === "string") {
//   //     props.css = emotionReact.css`${props.css}`;
//   //   }

//   //   return emotionReactJsxRuntime.emotionJsx.apply(
//   //     emotionReactJsxRuntime,
//   //     arguments,
//   //   );
//   // };

//   // const FramerMotion = require("framer-motion");
//   // Object.assign(globalThis, { FramerMotion });
//   return {
//     React,
//     ReactDOM,
//     // styled,
//     // emotionReact,
//     // emotionReactJsxRuntime,
//     ReactDOMClient,
//     // createEmotionCache,
//     // FramerMotion,
//   };
// };

// const {
//   React,
//   ReactDOM,
//   // styled,
//   // emotionReact,
//   // emotionReactJsxRuntime,
//   ReactDOMClient,
//   // createEmotionCache,
//   // FramerMotion,
// } = runtime();

// const mapTable = {
//   "react": React,
//   "react-dom": ReactDOM,
//   "react-dom/client": ReactDOMClient,
//   // "@emotion/react": emotionReact,
//   // "@emotion/styled": styled,
//   // "@emotion/cache": createEmotionCache,
//   // "@emotion/react/jsx-runtime": emotionReactJsxRuntime,
//   "react/jsx-runtime": ReactJSXRuntime,
//   // "framer-motion": FramerMotion,
// } as { [key: string]: unknown };

// const requireUmd = (pkg: string) => {
// if (mapTable[pkg]) return mapTable[pkg];
// if (window[pkg as any] as unknown) return window[pkg as any];
// if (apps[pkg]) return apps[pkg];
// if (pkg.includes(`spike.land/live`)) return Reacx/t.lazy(() => importShim(pkg));

// if (pkg.includes(`spike.land/live`)) {
//   if (!globalThis.esmTransform) return {};
//   apps[pkg] = apps[pkg] ||  fetch(importShim.resolve(pkg).replace(".js",".tsx")).then(src=>src.text().then(code=>globalThis.esmTransform(code).then(transpiled=>importShim(createJsBlob(transpiled)))).then(mod=>Object.assign(apps, {[pkg]:mod})))
//   return apps[pkg];
//   //  throw new Error(pkg + 'mod just loading' );
// }  if (!globalThis.esmTransform) return {};
// apps[pkg] = apps[pkg] || importShim(pkg).then(mod=>Object.assign(apps, {[pkg]:mod}));
// return apps[pkg];
//  throw new Error(pkg + 'mod just loading' );

// globalThis.requireLoading.push[pkg];
// fetch(importShim.resolve(pkg)).then(resp => resp.text()).then(code => globalThis.umdTransform(code)).then(x => {
//   const hash = md5(x);

//   let z = x.split("(() => {");
//   z.shift();
//   z.unshift(`globalThis.apps.${hash} = `);
//   z = z.join("(() => {");

//   new Function(z)();
//   return apps[hash];
// }).then(x => mapTable[pkg] = x).then(() =>
//   globalThis.requireLoading = globalThis.requireLoading.filter(x => x !== pkg)
// ).then(() => {
//   if (mapTable[pkg]) return mapTable[pkg];
//   console.error("Error - require: " + pkg + " not found");
// });
// };
// Object.assign(globalThis, { require: requireUmd });
