globalThis.createEmotionCache = globalThis.createEmotionCache || require("@emotion/cache");
const createCache = globalThis.createEmotionCache.default
  || globalThis.createEmotionCache;

export default createCache;
