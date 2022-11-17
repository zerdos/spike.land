import createEmotionCache from "@emotion/cache";
const cache = (createEmotionCache as unknown as { default: typeof createEmotionCache }).default || createEmotionCache;
export default cache;
