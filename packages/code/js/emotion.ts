import type Emotion from "@emotion/react";

const { emotionReact } = window as unknown as { emotionReact: typeof Emotion };
export const {
  CacheProvider,
  ClassNames,
  Global,
  ThemeContext,
  ThemeProvider,
  __unsafe_useEmotionCache,
  createElement,
  css,
  jsx,
  keyframes,
  useTheme,
  withEmotionCache,
  withTheme,
} = emotionReact;
export default emotionReact;
