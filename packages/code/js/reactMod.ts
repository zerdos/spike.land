const React = require("react");

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

export const useState = (startState: unknown) => {
  const [state, setState] = originalUseState(startState);
  const delayedSetState = (updates: unknown) => queueMicrotask(() => setState(updates));
  return [state, delayedSetState];
};
React.useState = useState;

export default React;
