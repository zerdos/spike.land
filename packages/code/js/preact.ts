export * from "preact";
import Preact from "preact/compat";

export default Preact;
export const {
  Fragment,
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
} = Preact;

import { hydrate, render, unmountComponentAtNode } from "preact/compat";

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

export { renderToString } from "preact-render-to-string";

export * from "preact/jsx-runtime";
