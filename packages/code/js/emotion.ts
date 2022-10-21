import type Emotion from "@emotion/react";

export const {
  CacheProvider,
  ClassNames,
  Global,
  ThemeContext,
  __unsafe_useEmotionCache,
  createElement,
  ThemeProvider,
  css,
  jsx,
  keyframes,
  useTheme,
  withEmotionCache,
  withTheme,
} = (window as unknown as { emotionReact: typeof Emotion }).emotionReact;
export default emotionReact;
