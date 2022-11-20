import {
  require_react
} from "./chunk-chunk-IGJHLPB6.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-BSQL4JKA.mjs";

// js/reactMod.ts
init_define_process();
var React = require_react();
var {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
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
  useSyncExternalStore,
  useTransition,
  version
} = React;
var originalUseState = React.useState;
var useState = /* @__PURE__ */ __name((startState) => {
  const [state, setState] = originalUseState(startState);
  const delayedSetState = /* @__PURE__ */ __name((updates) => queueMicrotask(() => setState(updates)), "delayedSetState");
  return [state, delayedSetState];
}, "useState");
React.useState = useState;
var reactMod_default = React;
export {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  reactMod_default as default,
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
  version
};
