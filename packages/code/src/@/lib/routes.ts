/**
 * Application route configuration
 * Contains all route patterns used throughout the application
 */

export const routes = {
  "/": "landing",
  "/start": "temp",
};

export const ROUTES = {
  /**
   * Live coding route pattern
   * @param codeSpace - The unique identifier for the code space
   * @returns The formatted live coding route
   */
  LIVE: (codeSpace: string): string => `/live/${codeSpace}`,

  /**
   * Live CMS route pattern
   * @param codeSpace - The unique identifier for the code space
   * @returns The formatted live CMS route
   */
  LIVE_CMS: (codeSpace: string): string => `/live-cms/${codeSpace}`,

  /**
   * Dehydrated state route pattern
   * @param codeSpace - The unique identifier for the code space
   * @returns The formatted dehydrated state route
   */
  DEHYDRATED: (codeSpace: string): string => `/live/${codeSpace}/dehydrated`,
} as const;

/**
 * Type-safe route parameters
 */
export interface RouteParams {
  codeSpace: string;
}

/**
 * Route utilities for common operations
 */
export const RouteUtils = {
  /**
   * Check if the given path is a live route
   * @param pathname - The path to check
   * @returns True if the path is a live route
   */
  isLiveRoute: (pathname: string): boolean => pathname.startsWith("/live/"),

  /**
   * Check if the given path is a live CMS route
   * @param pathname - The path to check
   * @returns True if the path is a live CMS route
   */
  isLiveCMSRoute: (pathname: string): boolean => pathname.startsWith("/live-cms/"),

  /**
   * Check if the given path is a dehydrated route
   * @param pathname - The path to check
   * @returns True if the path is a dehydrated route
   */
  isDehydratedRoute: (pathname: string): boolean => pathname.endsWith("dehydrated"),

  /**
   * Check if the app should be rendered for the given path
   * @param pathname - The path to check
   * @returns True if the app should be rendered
   */
  shouldRenderApp: (pathname: string): boolean =>
    (RouteUtils.isLiveRoute(pathname) || RouteUtils.isLiveCMSRoute(pathname)) &&
    !RouteUtils.isDehydratedRoute(pathname)
} as const;
