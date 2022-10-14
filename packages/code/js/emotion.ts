

import * as Emotion from "@emotion/react";
//import Emotion  from "@emotion/react";
import styledG from "@emotion/styled"
import cacheG from "@emotion/cache"
import * as JSX from "@emotion/react/jsx-runtime"
// @ts-expect-error

globalThis.EmotionGlob = globalThis.EmotionGlob || { JSX, Emotion, styled: styledG, cache: cacheG, jsx, jsxs, Fragment}

// @ts-expect-error
const EmotionGlob = globalThis.EmotionGlob;


export const {styled, cache} = EmotionGlob
export const {jsx, jsxs, Fragment} = EmotionGlob.JSX
export const {CacheProvider, ClassNames, Global, ThemeContext, ThemeProvider,css, keyframes, useTheme, withEmotionCache, withTheme   } =  EmotionGlob.Emotion
export default EmotionGlob.Emotion;