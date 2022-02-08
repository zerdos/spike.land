// js/react.mjs
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
var react_default = React;
export {
  Children,
  Component,
  Fragment,
  JSXInternal,
  React,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  createRoot,
  react_default as default,
  forwardRef,
  hydrateRoot,
  isValidElement,
  lazy,
  memo,
  render,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
};
