import { Buffer } from "buffer/";


export { createRoot, hydrateRoot} from "preact/compat/client";
export { flushSync } from "preact/compat/server";

import * as Preact from "preact";

import { createElement, Fragment } from "preact";

export {renderToString, shallowRender} from "preact-render-to-string"

export { createElement };
// import { createContext  } from "preact/compat"

import { createPortal, findDOMNode, SuspenseList } from "preact/compat";


import PreactCompat from "preact/compat";

const React = window.React = window.React ||
  { ...Preact, ...PreactCompat, createPortal, SuspenseList, findDOMNode ,};

export const { createContext } = React;


import { jsx, jsxDEV, jsxs } from "preact/jsx-runtime";

export { Fragment };
// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;

export { jsx, jsxDEV, jsxs };

export const { hydrate, render, unmountComponentAtNode } = React;
// @ts-ignore

// export const { toChildArray } = PreactCompat;
export default React;

export { createPortal, findDOMNode, SuspenseList };

export const {
  cloneElement,
  createFactory,
  useInsertionEffect,
  unstable_batchedUpdates,
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
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
} = React;

globalThis.Buffer = Buffer;
