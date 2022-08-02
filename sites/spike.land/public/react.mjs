import {
  init_define_process
} from "./chunk-CY4CZGSG.mjs";

// react.ts
init_define_process();
import * as Preact from "https://ga.jspm.io/npm:preact@10.10.0/dist/preact.module.js";
import PreactCompat from "https://ga.jspm.io/npm:preact@10.10.0/compat/dist/compat.module.js";
import {
  hydrate as hy,
  lazy as laz,
  render as rend,
  Suspense as Sus,
  SuspenseList as SusL,
  unmountComponentAtNode as unm
} from "https://ga.jspm.io/npm:preact@10.10.0/compat/dist/compat.module.js";
import { renderToString as renderToStr } from "https://ga.jspm.io/npm:preact-render-to-string@5.2.1/dist/index.mjs";
import {
  jsx as j,
  jsxDEV as jd,
  jsxs as js
} from "https://ga.jspm.io/npm:preact@10.10.0/jsx-runtime/dist/jsxRuntime.module.js";
window.ReactDOM = window.ReactDOM || {
  hydrate: hy,
  render: rend,
  unmountComponentAtNode: unm,
  renderToString: renderToStr
};
window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
window.renderToString = window.renderToString || renderToStr;
window.React = window.React || { ...PreactCompat, lazy: laz, Suspense: Sus, SuspenseList: SusL };
window.MyPreact = window.MyPreact || Preact;
var { jsx, jsxDEV, jsxs } = window.PreactJSX;
var { Fragment } = Preact;
var { hydrate, render, unmountComponentAtNode } = window.ReactDOM;
var { renderToString } = window;
var { toChildArray } = Preact;
var react_default = PreactCompat;
var {
  createContext,
  createElement,
  cloneElement,
  createFactory,
  createPortal,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  lazy,
  Suspense,
  StrictMode,
  SuspenseList,
  findDOMNode,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version
} = window.React;
var flushSync = (callback, arg) => callback(arg);
function createRoot(container) {
  return {
    render(children) {
      render(children, container);
    },
    unmount() {
      unmountComponentAtNode(container);
    }
  };
}
function hydrateRoot(container, children) {
  hydrate(children, container);
  return createRoot(container);
}
export {
  Children,
  Component,
  Fragment,
  PureComponent,
  StrictMode,
  Suspense,
  SuspenseList,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createPortal,
  createRef,
  createRoot,
  react_default as default,
  findDOMNode,
  flushSync,
  forwardRef,
  hydrate,
  hydrateRoot,
  isValidElement,
  jsx,
  jsxDEV,
  jsxs,
  lazy,
  memo,
  render,
  renderToString,
  toChildArray,
  unmountComponentAtNode,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  version
};
