// export * from "@emotion/react";

window.EmotionReact = window.EmotionReact || await import("@emotion/react");

// import createCache from "@emotion/cache";

import  { jsxs } from "@emotion/react/jsx-runtime";
//
// export { JSX } from "@emotion/react/jsx-runtime";

// export const ss = JSX.
export const  { jsx } = window.EmotionReact ;
export  { jsxs };



export const { css } = window.EmotionReact;
// export const { CacheProvider } = emotionReact;
// export const { ClassNames } = emotionReact;
// export const { Global } = emotionReact;
// export const { ThemeContext } = emotionReact;
// export const { ThemeProvider } = emotionReact;
// // export const { __unsafe_useEmotionCache } = emotionReact;

// export const { keyframes } = emotionReact;
// export const { useTheme } = emotionReact;
// export const { withEmotionCache } = emotionReact;
// export const { withTheme } = emotionReact;

export default window.EmotionReact;
