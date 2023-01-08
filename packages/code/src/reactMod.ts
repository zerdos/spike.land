// import isCallable from "is-callable";
import * as React from "react";
export const {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  useState,
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

// const originalUseState = React.useState;

// export function useState<S>(
//   initialState: (() => S) | S,
// ) {
//   if ((globalThis as unknown as { workerDom: boolean }).workerDom) {
//     const [state, setState] = originalUseState(initialState);
//     // const delayedSetState = (updates: (() => S) | S) =>
//       // setTimeout(() => isCallable(updates) ? setState(() => updates()) : setState(updates));
//     return [state, delayedSetState];
//   }

//   return originalUseState(initialState);
// }

// Object.assign(React, { useState });

export default React;
