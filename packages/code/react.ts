import * as Preact from "preact";
import PreactCompat from "preact/compat";
import {
  hydrate as hy,
  render as rend,
  lazy as laz,
  Suspense as Sus, 
  SuspenseList as SusL,
  unmountComponentAtNode as unm,
} from "preact/compat";

import { renderToString as renderToStr } from "preact-render-to-string";

import {
  JSX as jjx,
  jsx as j,
  jsxDEV as jd,
  jsxs as js,
} from "preact/jsx-runtime";

window.ReactDOM = window.ReactDOM ||
  {
    hydrate: hy,
    render: rend,
    unmountComponentAtNode: unm,
    renderToString: renderToStr,
  };

window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
window.renderToString = window.renderToString || renderToStr;

window.React = window.React || {...PreactCompat,  lazy: laz,
  Suspense: Sus, 
  SuspenseList: SusL};

window.MyPreact = window.MyPreact || Preact;

export const { jsx, jsxDEV, jsxs } = window.PreactJSX;

export const { Fragment } = Preact;

export const { hydrate, render, unmountComponentAtNode } = window.ReactDOM;
// @ts-ignore
export const { renderToString } = window;

export const { toChildArray } = Preact;
export default PreactCompat;

export const {
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
  version,
} = window.React;

export const flushSync = (callback: (arg: boolean) => void, arg: boolean) =>
  callback(arg);

export function createRoot(container: HTMLDivElement) {
  return {
    render(children: preact.VNode<any>) {
      render(children, container);
    },
    unmount() {
      unmountComponentAtNode(container);
    },
  };
}

export function hydrateRoot(
  container: HTMLDivElement,
  children: preact.VNode<any>,
) {
  hydrate(children, container);
  return createRoot(container);
}
