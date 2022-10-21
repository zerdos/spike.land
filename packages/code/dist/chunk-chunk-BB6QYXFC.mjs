import {
  __esm,
  __export,
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/emotion.ts
var emotion_exports = {};
__export(emotion_exports, {
  CacheProvider: () => CacheProvider,
  ClassNames: () => ClassNames,
  Global: () => Global,
  ThemeContext: () => ThemeContext,
  ThemeProvider: () => ThemeProvider,
  css: () => css,
  default: () => emotion_default,
  jsx: () => jsx,
  keyframes: () => keyframes,
  useTheme: () => useTheme,
  withEmotionCache: () => withEmotionCache,
  withTheme: () => withTheme
});
var emotionReact, CacheProvider, ClassNames, Global, ThemeContext, ThemeProvider, css, jsx, keyframes, useTheme, withEmotionCache, withTheme, emotion_default;
var init_emotion = __esm({
  "js/emotion.ts"() {
    init_define_process();
    ({ emotionReact } = window);
    ({
      CacheProvider,
      ClassNames,
      Global,
      ThemeContext,
      ThemeProvider,
      css,
      jsx,
      keyframes,
      useTheme,
      withEmotionCache,
      withTheme
    } = emotionReact);
    emotion_default = emotionReact;
  }
});

export {
  CacheProvider,
  ClassNames,
  Global,
  ThemeContext,
  ThemeProvider,
  css,
  jsx,
  keyframes,
  useTheme,
  withEmotionCache,
  withTheme,
  emotion_default,
  emotion_exports,
  init_emotion
};
