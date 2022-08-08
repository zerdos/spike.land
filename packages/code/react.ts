
import * as  Preact from "preact"

// import { createContext  } from "preact/compat"


import {createPortal, SuspenseList,
  findDOMNode} from "preact/compat"

import PreactCompat from "preact/compat"

const React = window.React = window.React || {...Preact, ...PreactCompat, createPortal, SuspenseList,
  findDOMNode};

  export const {createContext} = React;


import { renderToString  } from "preact-render-to-string";

import {
  JSX,
  jsx,
  jsxDEV,
  jsxs
} from "preact/jsx-runtime";




// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;


export  { jsx, jsxDEV, jsxs }

export const { Fragment } = React;

export const { hydrate, render, unmountComponentAtNode } = React;
// @ts-ignore
export  { renderToString } ;

// export const { toChildArray } = PreactCompat;
export default React;

export {createPortal,   SuspenseList,
  findDOMNode
};

export const {
  createElement,
  cloneElement,
  createFactory,

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
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
} = React;

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
