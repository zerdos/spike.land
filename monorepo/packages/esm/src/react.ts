import * as preact from "preact";
import * as preactCompat from "preact/compat";

const react = {...preact, ...preactCompat};
export const React = react;

// export { createContext}
// export {     useDebugValue}
// export {     useId}
// export {     useRef}
// export {     useContext}
// export {     useEffect}
// export {     useLayoutEffect}
//  export {    useReducer}
// export {     useCallback}
// export {     forwardRef}
// export {     createElement}
// export {     Fragment}
// export {     Component}
// export {     isValidElement}
// export {     memo}
// export {     useImperativeHandle}
// export {     Children}
// export {     cloneElement}
// export {     useMemo}
// } = React

// export {lazy}
// export {isLazy}

export const { createContext } = react as {
  createContext: typeof React.createContext;
};
export const { useDebugValue } = react as {
  useDebugValue: typeof React.useDebugValue;
};

export const { useState } = react 
export const { useId } = react;
export const { useRef } = react;
export const { useContext } = react;

export const { useEffect } = react;
export const  useLayoutEffect = function() {if (globalThis.renderToString)  return ()=>{}; else return react.useLayoutEffect(...arguments)};
export const { useReducer } = react;
export const { useCallback } = react;
export const { forwardRef } = react;
export const { createElement } = react;
export const { createFactory } = react;
export const { createRef } = react;
export const { Fragment } = react;
export const { Component } = react;
export const { Suspense } = react;
export const { isValidElement } = react;
export const { memo } = react;
export const { useImperativeHandle } = react;
export const { Children } = react;

export const { lazy } = react;
export const { useMemo } = react;

export const { cloneElement } = react;
export const {render} = react;
export const {hydrate} = react;

export default React;

// export default React;
