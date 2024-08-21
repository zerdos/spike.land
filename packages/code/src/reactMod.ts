import * as React from "react";
export { default } from "react";

export const Children: {
  map<T, C>(
    children: C | readonly C[],
    fn: (child: C, index: number) => T,
  ): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
  forEach<C>(children: C | readonly C[], fn: (child: C, index: number) => void): void;
  count(children: any): number;
  only<C>(children: C): C extends any[] ? never : C;
  toArray(children: React.ReactNode | React.ReactNode[]): Array<Exclude<React.ReactNode, boolean | null | undefined>>;
} = React.Children;
export const Component: typeof React.Component = React.Component;
export const Fragment: React.ExoticComponent<{
  children?: React.ReactNode | undefined;
}> = React.Fragment;
export const PureComponent: typeof React.PureComponent = React.PureComponent;
export const StrictMode: React.ExoticComponent<{
  children?: React.ReactNode | undefined;
}> = React.StrictMode;
export const Suspense: React.ExoticComponent<React.SuspenseProps> = React.Suspense;
export const useState: typeof React.useState = React.useState;
export const cloneElement: typeof React.cloneElement = React.cloneElement;
export const createContext: typeof React.createContext = React.createContext;
export const createElement: typeof React.createElement = React.createElement;
export const createFactory: typeof React.createFactory = React.createFactory;
export const createRef: typeof React.createRef = React.createRef;
export const forwardRef: typeof React.forwardRef = React.forwardRef;
export const isValidElement: typeof React.isValidElement = React.isValidElement;
export const lazy: typeof React.lazy = React.lazy;
export const memo: typeof React.memo = React.memo;
export const startTransition: typeof React.startTransition = React.startTransition;
export const useCallback: typeof React.useCallback = React.useCallback;
export const useContext: typeof React.useContext = React.useContext;
export const useDebugValue: typeof React.useDebugValue = React.useDebugValue;
export const useDeferredValue: typeof React.useDeferredValue = React.useDeferredValue;
export const useEffect: typeof React.useEffect = React.useEffect;
export const useId: typeof React.useId = React.useId;
export const useImperativeHandle: typeof React.useImperativeHandle = React.useImperativeHandle;
export const useInsertionEffect: typeof React.useInsertionEffect = React.useInsertionEffect;
export const useLayoutEffect: typeof React.useLayoutEffect = React.useLayoutEffect;
export const useMemo: typeof React.useMemo = React.useMemo;
export const useReducer: typeof React.useReducer = React.useReducer;
export const useRef: typeof React.useRef = React.useRef;
export const useSyncExternalStore: typeof React.useSyncExternalStore = React.useSyncExternalStore;
export const useTransition: typeof React.useTransition = React.useTransition;
export const version: string = React.version;

// export default React;
