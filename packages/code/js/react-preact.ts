//export {renderToString} from "./preact/compa
// import { render, hydrate, unmountComponentAtNode } from "./preact/compat/dist/compat.mjs"

// export function createRoot(container) {
// 	return {
// 		render(children) {
// 			render(children, container)
// 		},
// 		unmount() {
// 			unmountComponentAtNode(container)
// 		}
// 	}
// }

// export function hydrateRoot(container, children) {
// 	hydrate(children, container)
// 	return createRoot(contain


// import { render, hydrate, unmountComponentAtNode } from "./preact/compat/dist/compat.mjs"

// export function createRoot(container) {
// 	return {
// 		render(children) {
// 			render(children, container)
// 		},
// 		unmount() {
// 			unmountComponentAtNode(container)
// 		}
// 	}
// }

// export function hydrateRoot(container, children) {
// 	hydrate(children, container)
// 	return createRoot(container)
// }


// export {jsx, jsxs, Fragment}  from "./preact/compat/jsx-runtime.mjs";

import * as React from "react"

export const {
 Children,
Component,
Fragment,
PureComponent,
 StrictMode,
Suspense,
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
 useState,
 useSyncExternalStore,
 useTransition,
 version} = React;


 export {default} from  "react"

// export const React = { ...Preact, ...PreactCompat, Component};
// Object.assign(React, {default: React})
// Export const {signal} = PreactSignals;
// export const {effect} = PreactSignals;
// export const {computed} = PreactSignals;

// export { jsx, jsxs } from "./preact-jsx-runtime";

// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;

// export const { hydrate, render, unmountComponentAtNode } = React;

// export const { toChildArray } = PreactCompat;

// export { createPortal, findDOMNode, SuspenseList };



// export const {
//   createPortal,
//   findDOMNode,
//   //@ts-expect-error
//   flushSync,
//   startTransition,
//   SuspenseList,
//   unstable_batchedUpdates,
//   cloneElement,
//   createElement,
//   createFactory,
//   useInsertionEffect,
//   createRef,
//   useCallback,
//   useContext,
//   useDebugValue,
//   isValidElement,
//   useEffect,
//   useImperativeHandle,
//   useLayoutEffect,
//   useMemo,
//   useReducer,
//   useRef,
//   useState,
//   lazy,
//   Suspense,
//   StrictMode,
//   useId,
//   // CreateClass,
//   forwardRef,
//   memo,
//   Children,
//   PureComponent,
//   version,
// } = React;

// export default React
