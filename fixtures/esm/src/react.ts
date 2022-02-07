import * as preact from "preact";
import { render } from "preact";
import * as _compat from 'preact/compat';


export import JSX = JSXInternal;

// Hooks
// export import CreateHandle = _compat.CreateHandle;
// export import EffectCallback = _compat.EffectCallback;
// export import Inputs = _compat.Inputs;
// export import PropRef = _compat.PropRef;
// export import Reducer = _compat.Reducer;
// export import Ref = _compat.Ref;
// export import StateUpdater = _compat.StateUpdater;
export import useCallback = _compat.useCallback;
export import useContext = _compat.useContext;
export import useDebugValue = _compat.useDebugValue;
export import useEffect = _compat.useEffect;
export import useImperativeHandle = _compat.useImperativeHandle;
export import useLayoutEffect = _compat.useLayoutEffect;
export import useMemo = _compat.useMemo;
export import useReducer = _compat.useReducer;
export import useRef = _compat.useRef;
export import useState = _compat.useState;
export import forwardRef = _compat.forwardRef;

// Preact Defaults
// export import Component = preact.Component;
// export import FunctionComponent = preact.FunctionComponent;
// export import FC = preact.FunctionComponent;
export import createContext = preact.createContext;
export import createRef = preact.createRef;
export import Fragment = preact.Fragment;
export import createElement = preact.createElement;
export import cloneElement = preact.cloneElement;
// export import ComponentProps = preact.ComponentProps;

// Suspense
export import Suspense = _compat.Suspense;
export import lazy = _compat.lazy;
export import SuspenseList = _compat.SuspenseList;


export { render };

// // export { createContext}
// // export {     useDebugValue}
// // export {     useId}
// // export {     useRef}
// // export {     useContext}
// // export {     useEffect}
// // export {     useLayoutEffect}
// //  export {    useReducer}
// // export {     useCallback}
// // export {     forwardRef}
// // export {     createElement}
// // export {     Fragment}
// // export {     Component}
// // export {     isValidElement}
// // export {     memo}
// // export {     useImperativeHandle}
// // export {     Children}
// // export {     cloneElement}
// // export {     useMemo}
// // } = React

// // export {lazy}
// // export {isLazy}

// export const { createContext } = react as {
//   createContext: typeof React.createContext;
// };
// export const { useDebugValue } = react as {
//   useDebugValue: typeof React.useDebugValue;
// };

// export const { useState } = react;
// export const { useId } = react;
// export const { useRef } = react;
// export const { useContext } = react;

// export const { useReducer } = react;
// export const { useCallback } = react;
// export const { forwardRef } = react;
// export const { createElement } = react;
// export const { createFactory } = react;
// export const { createRef } = react;
// export const { Fragment } = react;
// export const { Component } = react;
// export const { Suspense } = react;
// export const { isValidElement } = react;
// export const { memo } = react;
// export const { useImperativeHandle } = react;
// export const { Children } = react;

// export const { lazy } = react;
// export const { useMemo } = react;

// export const { cloneElement } = react;
export function createPortal(
  vnode: preact.VNode,
  container: Element
): preact.VNode<any>;

export function render(
  vnode: preact.VNode<any>,
  parent: Element,
  callback?: () => void
): Component | null;

export function hydrate(
  vnode: preact.VNode<any>,
  parent: Element,
  callback?: () => void
): Component | null;

export function unmountComponentAtNode(
  container: Element | Document | ShadowRoot | DocumentFragment
): boolean;

export function createFactory(
  type: preact.VNode<any>['type']
): (
  props?: any,
  ...children: preact.ComponentChildren[]
) => preact.VNode<any>;
export function isValidElement(element: any): boolean;
export function findDOMNode(component: preact.Component): Element | null;

export abstract class PureComponent<P = {}, S = {}> extends preact.Component<
  P,
  S
> {
  isPureReactComponent: boolean;
}

export function memo<P = {}>(
  component: preact.FunctionalComponent<P>,
  comparer?: (prev: P, next: P) => boolean
): preact.FunctionComponent<P>;
export function memo<C extends preact.FunctionalComponent<any>>(
  component: C,
  comparer?: (
    prev: preact.ComponentProps<C>,
    next: preact.ComponentProps<C>
  ) => boolean
): C;

export interface ForwardFn<P = {}, T = any> {
  (props: P, ref: Ref<T>): preact.ComponentChild;
  displayName?: string;
}

export function forwardRef<R, P = {}>(
  fn: ForwardFn<P, R>
): preact.FunctionalComponent<Omit<P, 'ref'> & { ref?: preact.Ref<R> }>;

export function unstable_batchedUpdates(
  callback: (arg?: any) => void,
  arg?: any
): void;

export const Children: {
  map<T extends preact.ComponentChild, R>(
    children: T | T[],
    fn: (child: T, i: number) => R
  ): R[];
  forEach<T extends preact.ComponentChild>(
    children: T | T[],
    fn: (child: T, i: number) => void
  ): void;
  count: (children: preact.ComponentChildren) => number;
  only: (children: preact.ComponentChildren) => preact.ComponentChild;
  toArray: (children: preact.ComponentChildren) => preact.VNode<{}>[];
};

// scheduler
export const unstable_ImmediatePriority: number;
export const unstable_UserBlockingPriority: number;
export const unstable_NormalPriority: number;
export const unstable_LowPriority: number;
export const unstable_IdlePriority: number;
export function unstable_runWithPriority(
  priority: number,
  callback: () => void
): void;
export const unstable_now: () => number;

export default React;

// export default React;
