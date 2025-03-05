/**
 * Detects if the current device is a mobile device
 * @returns True if the device is mobile, false otherwise
 */
export const isMobile = (): boolean => {
  // Check if window is defined (for SSR)
  if (typeof window === "undefined") {
    return false;
  }

  // Use the user agent to detect mobile devices
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Common mobile device identifiers
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "opera mini",
    "mobile",
    "tablet",
  ];
  
  // Check if any mobile keyword is in the user agent
  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
};
