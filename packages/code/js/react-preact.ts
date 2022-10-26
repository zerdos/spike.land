// @ts-ignore
export { jsx, jsxs } from "preact/compat/jsx-runtime";
// export { flushSync } from "preact/compat";
import * as PR from "preact/compat";

export const {
  render,
  unmountComponentAtNode,
  Fragment,
  createPortal,
  // @ts-ignore
  flushSync,
  hydrate,
  Children,
  Component,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  forwardRef,
  isValidElement,

  lazy,
  memo,
  startTransition,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version,
  ...props
} = PR;

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

export { default } from "preact/compat";

// export default React
