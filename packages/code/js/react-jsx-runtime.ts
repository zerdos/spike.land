/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const runtime = () => {
  if (globalThis.React) return;
  const React = require("react");
  Object.assign(globalThis, { React });
  const ReactDOMClient = require("react-dom/client");
  Object.assign(globalThis, { ReactDOMClient });
  const ReactDOM = require("react-dom");
  Object.assign(globalThis, { ReactDOM });

  const ReactJSXRuntime = require("react/jsx-runtime");
  Object.assign(globalThis, { ReactJSXRuntime });

  const emotionReact = require("@emotion/react");
  Object.assign(globalThis, { emotionReact });

  const emotionReactJsxRuntime = require("@emotion/react/jsx-runtime");
  Object.assign(globalThis, { emotionReactJsxRuntime });

  const createEmotionCache = require("@emotion/cache").default;
  Object.assign(globalThis, { createEmotionCache });

  const styled = require("@emotion/styled").default;
  Object.assign(globalThis, { styled });
};
runtime();

export const {
  ReactDOM,
  React,
  ReactJSXRuntime,
  emotionReact,
  emotionReactJsxRuntime,
  createEmotionCache,
  styled,
  ReactDOMClient,
} = globalThis;
