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

  const ReactDOMServer = require("react-dom/server");
  Object.assign(globalThis, { ReactDOMServer });

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
};
runtime();

export const {
  ReactDOM,
  React,
  ReactJSXRuntime,
  emotionReact,
  emotionReactJsxRuntime,
  ReactDOMServer,
  createEmotionCache,
  styled,
  ReactDOMClient,
} = globalThis;

export const { hydrateRoot, createRoot } = ReactDOMClient;
