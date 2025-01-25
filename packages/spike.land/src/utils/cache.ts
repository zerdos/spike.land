export const getCacheDefault = () => {
  return (caches as unknown as { default: Cache; }).default;
};
