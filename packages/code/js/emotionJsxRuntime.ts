const JSX = {
  jsxs: (...args) => emotionReactJSXRuntime.jsxs(...args),
  jsx: (...args) => emotionReactJSXRuntime.jsx(...args),
  Fragment: React.Fragment || "",
};

export const { jsx, jsxs, Fragment } = JSX;
export default jsx;
