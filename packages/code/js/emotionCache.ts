import { default as cache } from "@emotion/cache";

const createCache =
  (cache as unknown as { default: typeof cache | null }).default || cache;

export default createCache;
