import 'preact/compat';

export {renderToString} from "preact-render-to-string";

export {jsx, jsxs, Fragment}  from "./preact/compat/jsx-runtime.mjs";

export {createContext} from "./preact/src/create-context";

export { createRoot, hydrateRoot  } from "./preact/compat/client.mjs";

import { Component } from "./preact/src/component";




// export const { render, hydrate } = c;

// export function createRoot(container: HTMLDivElement) {
//   return {
//     render(children: JSX.Element) {
//       Ptract.render(children, container);
//     },
//     unmount() {
//       unmountComponentAtNode(container);
//     },
//   };
// }

// export function hydrateRoot(container: HTMLDivElement, children: JSX.Element) {
//   hydrate(children, container);
//   return createRoot(container);
// }
import * as Preact from "./preact/src";
import * as PreactCompat from "./preact/compat";

export const React = { ...Preact, ...PreactCompat, Component};
Object.assign(React, {default: React})
// Export const {signal} = PreactSignals;
// export const {effect} = PreactSignals;
// export const {computed} = PreactSignals;

// export { jsx, jsxs } from "./preact-jsx-runtime";

// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;

// export const { hydrate, render, unmountComponentAtNode } = React;

// export const { toChildArray } = PreactCompat;

// export { createPortal, findDOMNode, SuspenseList };



export const {
  createPortal,
  findDOMNode,
  //@ts-expect-error
  flushSync,
  startTransition,
  SuspenseList,
  unstable_batchedUpdates,
  cloneElement,
  createElement,
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
  // CreateClass,
  forwardRef,
  memo,
  Children,
  PureComponent,
  version,
} = React;

export default React
