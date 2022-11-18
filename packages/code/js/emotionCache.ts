import createEmotionCache from "@emotion/cache";

const emotionCacheWithExtraDefault = (createEmotionCache as unknown as { default: typeof createEmotionCache }).default;
const cache = (emotionCacheWithExtraDefault) ? emotionCacheWithExtraDefault : createEmotionCache;
export default cache;
