var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// js/preact.ts
var preact_exports = {};
__export(preact_exports, {
  Children: () => Children,
  Component: () => Component,
  Fragment: () => Fragment,
  JSXInternal: () => JSXInternal,
  React: () => React,
  Suspense: () => Suspense,
  cloneElement: () => cloneElement,
  createContext: () => createContext,
  createElement: () => createElement,
  createFactory: () => createFactory,
  createRef: () => createRef,
  createRoot: () => createRoot,
  default: () => preact_default,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => isValidElement,
  lazy: () => lazy,
  memo: () => memo,
  render: () => render,
  useCallback: () => useCallback,
  useContext: () => useContext,
  useDebugValue: () => useDebugValue,
  useEffect: () => useEffect,
  useId: () => useId,
  useImperativeHandle: () => useImperativeHandle,
  useLayoutEffect: () => useLayoutEffect,
  useMemo: () => useMemo,
  useReducer: () => useReducer,
  useRef: () => useRef,
  useState: () => useState
});
import * as preact from "preact";
import * as compat from "preact/compat";
import { hydrate, render } from "preact/compat";
var createRoot = (container) => ({
  render: (App) => render(App, container)
});
var hydrateRoot = (container, App) => hydrate(App, container);
var react = {
  ...preact,
  ...compat
};
var React = react;
var { createContext } = react;
var { useDebugValue } = react;
var { useState } = react;
var { useId } = react;
var { useRef } = react;
var { useContext } = react;
var { useLayoutEffect } = react;
var { useEffect } = react;
var { useReducer } = react;
var { useCallback } = react;
var { forwardRef } = react;
var { JSXInternal } = react;
var { createElement } = react;
var { createFactory } = react;
var { createRef } = react;
var { Fragment } = react;
var { Component } = react;
var { Suspense } = react;
var { isValidElement } = react;
var { memo } = react;
var { useImperativeHandle } = react;
var { Children } = react;
var { lazy } = react;
var { useMemo } = react;
var { cloneElement } = react;
var preact_default = React;

// js/react.mjs
var createRoot2 = (container) => ({
  render: (App) => render(App, container)
});
var hydrateRoot2 = (container, App) => hydrate(App, container);
var react2 = {
  ...preact_exports,
  ...preact_exports
};
var React2 = react2;
var { createContext: createContext2 } = react2;
var { useDebugValue: useDebugValue2 } = react2;
var { useState: useState2 } = react2;
var { useId: useId2 } = react2;
var { useRef: useRef2 } = react2;
var { useContext: useContext2 } = react2;
var { useLayoutEffect: useLayoutEffect2 } = react2;
var { useEffect: useEffect2 } = react2;
var { useReducer: useReducer2 } = react2;
var { useCallback: useCallback2 } = react2;
var { forwardRef: forwardRef2 } = react2;
var { JSXInternal: JSXInternal2 } = react2;
var { createElement: createElement2 } = react2;
var { createFactory: createFactory2 } = react2;
var { createRef: createRef2 } = react2;
var { Fragment: Fragment2 } = react2;
var { Component: Component2 } = react2;
var { Suspense: Suspense2 } = react2;
var { isValidElement: isValidElement2 } = react2;
var { memo: memo2 } = react2;
var { useImperativeHandle: useImperativeHandle2 } = react2;
var { Children: Children2 } = react2;
var { lazy: lazy2 } = react2;
var { useMemo: useMemo2 } = react2;
var { cloneElement: cloneElement2 } = react2;
var react_default = React2;
export {
  Children2 as Children,
  Component2 as Component,
  Fragment2 as Fragment,
  JSXInternal2 as JSXInternal,
  React2 as React,
  Suspense2 as Suspense,
  cloneElement2 as cloneElement,
  createContext2 as createContext,
  createElement2 as createElement,
  createFactory2 as createFactory,
  createRef2 as createRef,
  createRoot2 as createRoot,
  react_default as default,
  forwardRef2 as forwardRef,
  hydrate,
  hydrateRoot2 as hydrateRoot,
  isValidElement2 as isValidElement,
  lazy2 as lazy,
  memo2 as memo,
  render,
  useCallback2 as useCallback,
  useContext2 as useContext,
  useDebugValue2 as useDebugValue,
  useEffect2 as useEffect,
  useId2 as useId,
  useImperativeHandle2 as useImperativeHandle,
  useLayoutEffect2 as useLayoutEffect,
  useMemo2 as useMemo,
  useReducer2 as useReducer,
  useRef2 as useRef,
  useState2 as useState
};
