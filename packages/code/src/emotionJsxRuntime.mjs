export { Fragment, jsx, jsxs } from "@emotion/react/jsx-runtime";

// // import {Fragment } from "react"
// import { jsx } from "@emotion/react";
// import { Fragment } from "react";

// export const { jsx, jsxs, Fragment } = {
//   jsx,
//   jsxs: jsx,
//   Fragment,

// };
// const jsxs = jsx;

// export {jsx, jsxs, Fragment};

// const emotionReactJsxRuntime = globalThis.emotionReactJsxRuntime = globalThis.emotionReactJsxRuntime || require("@emotion/react/jsx-runtime");;

// emotionReactJsxRuntime.jsx = function() {
//     const props = arguments[1];
//     if (Object.hasOwn(props, "css") && typeof props.css === "string") {
//       props.css = emotionReact.css`${props.css}`;
//     }

//     return emotionReactJsxRuntime.emotionJsx.apply(
//       emotionReactJsxRuntime,
//       arguments,
//     );
//   };
