const JSX = globalThis.emotionReactJSXRuntime ||
  window.emotionReactJSXRuntime || {
  jsxs: (...args) => JSX.jsxs(...args),
  jsx: (...args) => JSX.jsx(...args),
  Fragment: JSX.Fragment || "",
};

export const { jsx, jsxs, Fragment } = JSX;
export default jsx;
