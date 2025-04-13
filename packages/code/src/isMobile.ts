export const isMobile = (): boolean => {
  // Simple mobile device detection based on user agent
  if (typeof window !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(
        window.navigator.userAgent,
      );
  }
  return false;
};
