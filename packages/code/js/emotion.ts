import * as ea from "@emotion/react";

const EmotionReact = window.emotionReact = window.emotionReact || ea;

// import createCache from "@emotion/cache";

export * from "@emotion/react/jsx-runtime";
//
// export { JSX } from "@emotion/react/jsx-runtime";

// export const ss = JSX.
export const { jsx } = EmotionReact;
// export { jsxs } = JSX;

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
