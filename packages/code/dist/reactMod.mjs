import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/reactMod.ts
init_define_process();
var import_react = __toESM(require_react(), 1);
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
} = import_react.default;
var originalUseState = import_react.default.useState;
var useState = /* @__PURE__ */ __name((startState) => {
  if (globalThis.workerDom) {
    const [state, setState] = originalUseState(startState);
    const delayedSetState = /* @__PURE__ */ __name((updates) => queueMicrotask(
      () => typeof updates === typeof startState ? setState((s) => ({ ...s, updates })) : setState((updates2) => updates2)
    ), "delayedSetState");
    return [state, delayedSetState];
  }
  return originalUseState(startState);
}, "useState");
import_react.default.useState = useState;
var reactMod_default = import_react.default;
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
