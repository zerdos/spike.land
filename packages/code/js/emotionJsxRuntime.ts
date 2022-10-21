const JSX = {
  jsxs: (...args) => ReactJSXRuntime.jsx(...args),
  jsx: (...args) => emotionReact.jsx(...args),
  Fragment: React.Fragment || "",
};

export const { jsx, jsxs, Fragment } = JSX;
export default jsx;
