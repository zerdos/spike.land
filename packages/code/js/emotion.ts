import type Emotion from "@emotion/react";

const { emotionReact } = window as unknown as { emotionReact: typeof Emotion };
export const {
  CacheProvider,
  ClassNames,
  css,
  Global,
  jsx,
  jsx: createElement,
  keyframes,
  withEmotionCache,
} = emotionReact;
export default emotionReact;
