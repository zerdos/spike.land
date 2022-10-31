import "es-module-shims";
import importmap from "./importmap.json";
import { md5 } from "./md5";
const imp = {};
Object.keys(importmap.imports).map((k) => imp[k] = location.origin + importmap.imports[k]);

importShim.addImportMap({ imports: imp });

const runtime = () => {
  if (globalThis.React) return;
  const React = require("react");
  Object.assign(globalThis, { React });

  const ReactDOM = require("react-dom");
  Object.assign(globalThis, { ReactDOM });

  const ReactDOMClient = require("react-dom/client");
  Object.assign(globalThis, { ReactDOMClient });

  // const ReactDOMServer = require("react-dom/server");
  // Object.assign(globalThis, { ReactDOMServer });

  const ReactJSXRuntime = require("react/jsx-runtime");
  Object.assign(globalThis, { ReactJSXRuntime });

  const emotionReact = require("@emotion/react");
  Object.assign(globalThis, { emotionReact });

  const emotionReactJsxRuntime = require("@emotion/react/jsx-runtime");
  Object.assign(globalThis, { emotionReactJsxRuntime });
  emotionReactJsxRuntime.emotionJsx = emotionReactJsxRuntime.jsx;

  const createEmotionCache = require("@emotion/cache").default;
  Object.assign(globalThis, { createEmotionCache });

  const styled = require("@emotion/styled").default;
  Object.assign(globalThis, { styled });

  emotionReactJsxRuntime.jsx = function() {
    const props = arguments[1];
    if (Object.hasOwn(props, "css") && typeof props.css === "string") {
      props.css = emotionReact.css`${props.css}`;
    }

    return emotionReactJsxRuntime.emotionJsx.apply(
      emotionReactJsxRuntime,
      arguments,
    );
  };

  const FramerMotion = require("framer-motion");
  Object.assign(globalThis, { FramerMotion });
};

runtime();

const {
  React,
  ReactDOM,
  ReactDOMClient,
  ReactJSXRuntime,
  emotionReact,
  emotionReactJsxRuntime,
  ReactDOMServer,
  createEmotionCache,
  styled,
  FramerMotion,
} = globalThis;

const mapTable = {
  "react": React,
  "react-dom": ReactDOM,
  "react-dom/client": ReactDOMClient,
  "@emotion/react": emotionReact,
  "@emotion/styled": styled,
  "@emotion/cache": createEmotionCache,
  "@emotion/react/jsx-runtime": emotionReactJsxRuntime,
  "react/jsx-runtime": ReactJSXRuntime,
  "react-dom/server": ReactDOMServer,
  "framer-motion": FramerMotion,
} as { [key: string]: unknown };

globalThis.requireLoading = [] as string[];

const requireUmd = (pkg: string) => {
  if (mapTable[pkg]) return mapTable[pkg];
  if (window[pkg]) return window[pkg];
  if (globalThis[pkg]) return globalThis[pkg];
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
};
Object.assign(globalThis, { require: requireUmd });
