import EmotionReact from "@emotion/react";

const gt = globalThis as unknown as { emotionReact: typeof EmotionReact };
const emotionReact = gt.emotionReact = gt.emotionReact || require("@emotion/react");

export const {
  // @ts-ignore
  __unsafe_useEmotionCache,
  CacheProvider,
  ClassNames,
  // @ts-ignore
  createElement,
  css,
  Global,
  jsx,
  keyframes,
  ThemeContext,
  ThemeProvider,
  useTheme,
  withEmotionCache,
  withTheme,
  // @ts-ignore
} = emotionReact;

export default emotionReact;
