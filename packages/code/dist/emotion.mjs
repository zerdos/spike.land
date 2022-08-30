import {
  require_emotion_react_cjs,
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-YMIN6QMO.mjs";
import "./chunk-chunk-3G2TDKOV.mjs";
import {
  __export,
  __reExport,
  __toESM,
  init_define_process
} from "./chunk-chunk-NZ5A3UGY.mjs";

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
init_define_process();
var ea = __toESM(require_emotion_react_cjs(), 1);
__reExport(emotion_exports, __toESM(require_emotion_react_jsx_runtime_cjs(), 1));
var EmotionReact = window.emotionReact = window.emotionReact || ea;
var { jsx } = EmotionReact;
var { css } = EmotionReact;
var { CacheProvider } = EmotionReact;
var { ClassNames } = EmotionReact;
var { Global } = EmotionReact;
var { ThemeContext } = EmotionReact;
var { ThemeProvider } = EmotionReact;
var { keyframes } = EmotionReact;
var { useTheme } = EmotionReact;
var { withEmotionCache } = EmotionReact;
var { withTheme } = EmotionReact;
var emotion_default = EmotionReact;
export {
  CacheProvider,
  ClassNames,
  Global,
  ThemeContext,
  ThemeProvider,
  css,
  emotion_default as default,
  jsx,
  keyframes,
  useTheme,
  withEmotionCache,
  withTheme
};
