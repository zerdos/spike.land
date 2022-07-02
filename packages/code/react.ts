import  * as Preact from "preact";
import PreactCompat from "preact/compat";
import  { hydrate as hy, render as rend, unmountComponentAtNode as unm } from "preact/compat"

import { renderToString as renderToStr } from "preact-render-to-string";

import {jsx as j, Fragment as f, jsxDEV as jd, jsxs as js, JSX as jjx} from "preact/jsx-runtime";

window.ReactDOM = window.ReactDOM  || { hydrate: hy, render: rend, unmountComponentAtNode: unm, renderToString: renderToStr };

window.PreactJSX = window.PreactJSX || {jsx: j, Fragment: f, jsxDEV: jd, jsxs: js};



window.React = window.React || PreactCompat;

window.MyPreact = window.MyPreact || Preact;

export const {jsx, Fragment, jsxDEV, jsxs} = window.PreactJSX; 


export const { hydrate, render, unmountComponentAtNode } = window.ReactDOM;
// @ts-ignore
export const renderToString = window.ReactDOM.renderToString;

export const { toChildArray, }= Preact

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


