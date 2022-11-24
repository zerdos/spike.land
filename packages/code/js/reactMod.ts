import React from "react";

export const {
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
  version,
} = React;

const originalUseState = React.useState;

export const useState: typeof originalUseState = (startState) => {
  if ((globalThis as unknown as { workerDom: boolean }).workerDom) {
    const [state, setState] = originalUseState(startState);
    const delayedSetState: React.Dispatch<React.SetStateAction<typeof startState>> = (updates) =>
      queueMicrotask(() =>
        (typeof updates === typeof startState) ? setState((s) => ({ ...s, updates })) : setState(updates => (updates))
      );
    return [state, delayedSetState];
  }
  return originalUseState(startState);
};

React.useState = useState;

export default React;
