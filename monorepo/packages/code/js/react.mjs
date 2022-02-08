import * as preact from "./dist/preact.mjs";
import * as compat from "./dist/preact.mjs";
import { hydrate, render } from "./dist/preact.mjs";

export { render };
export { hydrate };

export const createRoot = (container) => ({
  render: (App) => render(App, container),
});
export const hydrateRoot = (container, App) => hydrate(App, container);

const react = {
  ...preact,
  ...compat,
};
export const React = react;

export const { createContext } = react;
export const { useDebugValue } = react;

export const { useState } = react;
export const { useId } = react;
export const { useRef } = react;
export const { useContext } = react;

export const { useLayoutEffect } = react;

export const { useEffect } = react;

export const { useReducer } = react;
export const { useCallback } = react;
export const { forwardRef } = react;
export const { JSXInternal } = react;
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
