import * as React from "react";
export declare const Children: {
    map<T, C>(
      children: C | readonly C[],
      fn: (child: C, index: number) => T,
    ): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
    forEach<C>(children: C | readonly C[], fn: (child: C, index: number) => void): void;
    count(children: any): number;
    only<C>(children: C): C extends any[] ? never : C;
    toArray(children: React.ReactNode | React.ReactNode[]): Array<Exclude<React.ReactNode, boolean | null | undefined>>;
  },
  Component: typeof React.Component,
  Fragment: React.ExoticComponent<{
    children?: React.ReactNode | undefined;
  }>,
  PureComponent: typeof React.PureComponent,
  StrictMode: React.ExoticComponent<{
    children?: React.ReactNode | undefined;
  }>,
  Suspense: React.ExoticComponent<React.SuspenseProps>,
  useState: typeof React.useState,
  cloneElement: typeof React.cloneElement,
  createContext: typeof React.createContext,
  createElement: typeof React.createElement,
  createFactory: typeof React.createFactory,
  createRef: typeof React.createRef,
  forwardRef: typeof React.forwardRef,
  isValidElement: typeof React.isValidElement,
  lazy: typeof React.lazy,
  memo: typeof React.memo,
  startTransition: typeof React.startTransition,
  useCallback: typeof React.useCallback,
  useContext: typeof React.useContext,
  useDebugValue: typeof React.useDebugValue,
  useDeferredValue: typeof React.useDeferredValue,
  useEffect: typeof React.useEffect,
  useId: typeof React.useId,
  useImperativeHandle: typeof React.useImperativeHandle,
  useInsertionEffect: typeof React.useInsertionEffect,
  useLayoutEffect: typeof React.useLayoutEffect,
  useMemo: typeof React.useMemo,
  useReducer: typeof React.useReducer,
  useRef: typeof React.useRef,
  useSyncExternalStore: typeof React.useSyncExternalStore,
  useTransition: typeof React.useTransition,
  version: string;
export default React;
