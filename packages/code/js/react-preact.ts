import * as Preact from "preact";

import { Fragment, options } from "preact";

/** @type {number} */
let currentIndex;

/** @type {import('./internal').Component} */
let currentComponent;

/** @type {import('./internal').Component} */
let previousComponent;

/** @type {number} */
let currentHook = 0;

/** @type {Array<import('./internal').Component>} */
let afterPaintEffects = [];

let EMPTY = [];

let oldBeforeDiff = options._diff;
let oldBeforeRender = options._render;
let oldAfterDiff = options.diffed;
let oldCommit = options._commit;
let oldBeforeUnmount = options.unmount;

const RAF_TIMEOUT = 100;
let prevRaf;

options._diff = (vnode) => {
  if (vnode.type === Fragment) {
    // Skip so we don't have to ensure wrapping fragments in RTS and prepass
    vnode._mask = "";
  } else if (typeof vnode.type === "function" && !vnode._mask) {
    const parentMask = vnode._parent && vnode._parent._mask
      ? vnode._parent._mask
      : "";
    const position = vnode._parent && vnode._parent._children
      ? vnode._parent._children.indexOf(vnode)
      : 0;
    vnode._mask = parentMask + position;
  } else if (!vnode._mask) {
    vnode._mask = vnode._parent._mask;
  }
  currentComponent = null;
  if (oldBeforeDiff) oldBeforeDiff(vnode);
};

function hash(str) {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return out;
}

function getHookState(index, type) {
  if (options._hook) {
    options._hook(currentComponent, index, currentHook || type);
  }
  currentHook = 0;

  // Largely inspired by:
  // * https://github.com/michael-klein/funcy.js/blob/f6be73468e6ec46b0ff5aa3cc4c9baf72a29025a/src/hooks/core_hooks.mjs
  // * https://github.com/michael-klein/funcy.js/blob/650beaa58c43c33a74820a3c98b3c7079cf2e333/src/renderer.mjs
  // Other implementations to look at:
  // * https://codesandbox.io/s/mnox05qp8
  const hooks = currentComponent.__hooks ||
    (currentComponent.__hooks = {
      _list: [],
      _pendingEffects: [],
    });

  if (index >= hooks._list.length) {
    hooks._list.push({ _pendingValue: EMPTY });
  }
  return hooks._list[index];
}

export function useId() {
  const state = getHookState(currentIndex++, 11);
  if (!state._value) {
    state._value = "P" + hash(currentComponent._vnode._mask + currentIndex);
  }

  return state._value;
}

export { Fragment };

// import { createContext  } from "preact/compat"

import { createPortal, findDOMNode, SuspenseList } from "preact/compat";

import PreactCompat from "preact/compat";

const React = window.React = window.React ||
  { ...Preact, ...PreactCompat, createPortal, SuspenseList, findDOMNode };

export const { createContext } = React;

import { renderToString } from "preact-render-to-string";

import { jsx, jsxDEV, jsxs } from "preact/jsx-runtime";

// window.PreactJSX = window.PreactJSX || { jsx: j, jsxDEV: jd, jsxs: js };
// window.renderToString = window.renderToString || renderToStr;

export { jsx, jsxDEV, jsxs };

export const { hydrate, render, unmountComponentAtNode } = React;
// @ts-ignore
export { renderToString };

// export const { toChildArray } = PreactCompat;
export default React;

export { createPortal, findDOMNode, SuspenseList };

export const {
  createElement,
  cloneElement,
  createFactory,
  useInsertionEffect,
  unstable_batchedUpdates,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  lazy,
  Suspense,
  StrictMode,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
} = React;

export const flushSync = (callback: (arg: boolean) => void, arg: boolean) =>
  callback(arg);

export function createRoot(container: HTMLDivElement) {
  return {
    render(children: preact.VNode<any>) {
      render(children, container);
    },
    unmount() {
      unmountComponentAtNode(container);
    },
  };
}

export function hydrateRoot(
  container: HTMLDivElement,
  children: preact.VNode<any>,
) {
  hydrate(children, container);
  return createRoot(container);
}
