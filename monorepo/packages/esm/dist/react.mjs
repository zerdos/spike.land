// src/react.ts
import * as preact from "preact";
import * as preactCompat from "preact/compat";
var react = { ...preact, ...preactCompat };
var React = react;
var { createContext } = react;
var { useDebugValue } = react;
var { useState } = react;
var { useId } = react;
var { useRef } = react;
var { useContext } = react;
var { useEffect } = react;
var useLayoutEffect = function() {
  if (globalThis.renderToString)
    return () => {
    };
  else
    return react.useLayoutEffect(...arguments);
};
var { useReducer } = react;
var { useCallback } = react;
var { forwardRef } = react;
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
var { render } = react;
var { hydrate } = react;
var react_default = React;
export {
  Children,
  Component,
  Fragment,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  react_default as default,
  forwardRef,
  hydrate,
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
