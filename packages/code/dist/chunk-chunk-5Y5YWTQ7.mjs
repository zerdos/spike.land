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
  createElement: () => createElement,
  css: () => css,
  default: () => emotion_default,
  jsx: () => jsx,
  keyframes: () => keyframes,
  withEmotionCache: () => withEmotionCache
});
var emotionReact, CacheProvider, ClassNames, css, Global, jsx, createElement, keyframes, withEmotionCache, emotion_default;
var init_emotion = __esm({
  "js/emotion.ts"() {
    init_define_process();
    ({ emotionReact } = window);
    ({
      CacheProvider,
      ClassNames,
      css,
      Global,
      jsx,
      jsx: createElement,
      keyframes,
      withEmotionCache
    } = emotionReact);
    emotion_default = emotionReact;
  }
});

export {
  CacheProvider,
  ClassNames,
  css,
  Global,
  jsx,
  createElement,
  keyframes,
  withEmotionCache,
  emotion_default,
  emotion_exports,
  init_emotion
};
