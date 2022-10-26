const React = globalThis.React;

export const {
  Children,
  Component,
  Fragment,
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
  // @ts-ignore
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} = React;

export const {
  createRoot,
  hydrateRoot,
} = globalThis.ReactDOMClient;

export const {
  createPortal,
  flushSync,
  render,
  findDOMNode,
  hydrate,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
  version,
} = globalThis.ReactDOM;

const all = {
  ...globalThis.React,
  ...globalThis.ReactDOM,
  ...globalThis.ReactDOMClient,
};
export default all;
