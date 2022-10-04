// @ts-ignore
export * from "preact/compat";
export { jsx, jsxs } from "./preact-jsx-runtime";
// import compat from 'preact/compat'
// export default compat

// import * as  PreactSignals from "@preact/signals";

// import { createClass  as crc  } from 'preact-compat/dist/preact-compat.min'

export { createElement, Fragment } from "preact";

export { renderToString, shallowRender } from "preact-render-to-string";

// import { createContext  } from "preact/compat"

// export { createPortal, findDOMNode, SuspenseList } from "preact/compat";

import PreactCompat from "preact/compat";

export const { render, hydrate, unmountComponentAtNode } = PreactCompat;

export function createRoot(container: HTMLDivElement) {
  return {
    render(children: JSX.Element) {
      render(children, container);
    },
    unmount() {
      unmountComponentAtNode(container);
    },
  };
}

export function hydrateRoot(container: HTMLDivElement, children: JSX.Element) {
  hydrate(children, container);
  return createRoot(container);
}

const React = window.React = window.React ||
  { ...PreactCompat };
export const { createContext } = React;
// export const {signal} = PreactSignals;
// export const {effect} = PreactSignals;
// export const {computed} = PreactSignals;

// export { jsx, jsxs } from "./preact-jsx-runtime";

// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;

// export const { hydrate, render, unmountComponentAtNode } = React;
// @ts-ignore

// export const { toChildArray } = PreactCompat;
export default PreactCompat;

// export { createPortal, findDOMNode, SuspenseList };

export const {
  cloneElement,
  createFactory,
  useInsertionEffect,
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
  useId,
  // createClass,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
} = React;
