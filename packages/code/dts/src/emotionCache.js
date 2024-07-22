import createEmotionCache from "@emotion/cache";
const emotionCacheWithExtraDefault = createEmotionCache
    .default;
const cache = typeof emotionCacheWithExtraDefault === "function"
    ? emotionCacheWithExtraDefault
    : createEmotionCache;
export default cache;
