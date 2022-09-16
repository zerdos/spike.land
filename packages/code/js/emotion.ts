import * as ea from "@emotion/react";
// import { jsxDEV } from "react";

const EmotionReact = (window.emotionReact = window.emotionReact || ea);

// import createCache from "@emotion/cache";
// export {JSX} from "@emotion/react/jsx-dev-runtime";
// export { jsx as jsxs } from "./react-preact";
// export { Fragment } from "./react-preact"
export { Fragment, jsx, jsxs, hoistNonReactStatics } from "./emotionJsxRuntime";
//
// export const  jsxs  = jsxOrig;

// export const ss = JSX.
// export {jsxs as jsx} from "./react-preact";

// import {JSX} from  "@emotion/react/jsx-runtime" ;
// export { jsxs } = {...jsxDEV, ...jsxRunTime};

export const { css } = EmotionReact;
export const { CacheProvider } = EmotionReact;
export const { ClassNames } = EmotionReact;
export const { Global } = EmotionReact;
export const { ThemeContext } = EmotionReact;
export const { ThemeProvider } = EmotionReact;
// export const { __unsafe_useEmotionCache } = emotionReact;

export const { keyframes } = EmotionReact;
export const { useTheme } = EmotionReact;
export const { withEmotionCache } = EmotionReact;
export const { withTheme } = EmotionReact;

export default EmotionReact;
