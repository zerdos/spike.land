import * as preact from "preact";
import {render} from "preact"
import {render, useLayoutEffect as ulf} from "preact/compat"
import * as preactCompat from "preact/compat";



export  {render};

export const createRoot= (container: Element)=>({
  render: (App: FC)=>render(App, container)
})
export const  hydrateRoot = (container: Element, App: FC)=>hydrate(App,container)





export const { useEffect } = preact;
export const  useLayoutEffect = function() {if (globalThis.renderToString)  return ()=>{}; else return ulf(...arguments)};


const react = { createRoot, hydrateRoot, ...preact, ...preactCompat, useLayoutEffect, useEffect, render };
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




export default React;

// export default React;
