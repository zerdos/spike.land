import * as React from "react";

const react = (window as unknown as { React: unknown }).React;

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
export const { useState } = react as { useState: typeof React.useState };
export const { useId } = react;
export const { useRef } = react;
export const { useContext } = react;

export const { useEffect } = react;
export const { useLayoutEffect } = react;
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
export const { isLazy } = react;
export const { useMemo } = react;

export const { cloneElement } = react;

export default react;

// export default React;
