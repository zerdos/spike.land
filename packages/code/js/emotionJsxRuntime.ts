// import {Fragment } from "react"
import * as JSX from "@emotion/react/jsx-runtime";

export const { jsx, jsxs, Fragment } = JSX;
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
