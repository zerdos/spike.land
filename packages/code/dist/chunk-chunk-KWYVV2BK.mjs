import {
  __esm,
  __export,
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/jsx.mjs
var jsx_exports = {};
__export(jsx_exports, {
  Fragment: () => Fragment,
  default: () => jsx_default,
  jsx: () => jsx,
  jsxs: () => jsxs
});
var JSX, jsx, jsxs, Fragment, jsx_default;
var init_jsx = __esm({
  "js/jsx.mjs"() {
    init_define_process();
    JSX = globalThis.ReactJSXRuntime || window.ReactJSXRuntime || {
      jsxs: (...args) => JSX.jsxs(...args),
      jsx: (...args) => JSX.jsx(...args),
      Fragment: React.Fragment || ""
    };
    ({ jsx, jsxs, Fragment } = JSX);
    jsx_default = jsx;
  }
});

export {
  jsx,
  jsxs,
  Fragment,
  jsx_default,
  jsx_exports,
  init_jsx
};
