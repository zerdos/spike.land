import { EmotionCache } from "@emotion/cache";

/**
 * Extracts CSS styles from various sources in the document.
 * @param cache - The Emotion cache object.
 * @param html - The HTML string of the document.
 * @returns A string containing the extracted CSS styles.
 */
function mineFromCaches(cache: EmotionCache): string[] {
  const key = cache.key || "css";

  try {
    return [...extractStylesFromDOM(key), ...extractStylesFromStylesheets(key)];
  } catch (error) {
    console.warn("Failed to extract styles from DOM, falling back to stylesheet parsing:", error);
    return extractStylesFromStylesheets(key);
  }
}

/**
 * Extracts styles from DOM elements.
 * @param key - The Emotion key to look for.
 * @returns A string of concatenated styles.
 */
function extractStylesFromDOM(key: string): string[] {
  const styledJSXStyles = getStyledJSXStyles();
  const emotionStyles = getEmotionStyles(key);
  return styledJSXStyles.concat(emotionStyles);
}

/**
 * Gets styled-jsx styles from the DOM.
 * @returns An array of style contents.
 */
function getStyledJSXStyles(): string[] {
  return Array.from(
    document.querySelectorAll("style[data-styled-jsx]"),
  ).map((style) => style.textContent || "");
}

/**
 * Gets Emotion styles from the DOM.
 * @param key - The Emotion key to look for.
 * @returns A string of concatenated unique styles.
 */
function getEmotionStyles(key: string): string[] {
  const styles = Array.from(
    document.querySelectorAll(`style[data-emotion="${key}"]`),
  ).map((style) => style.textContent || "");

  return Array.from(new Set(styles));
}

/**
 * Extracts styles from stylesheets when DOM extraction fails.
 * @param key - The Emotion key to look for.
 * @param html - The HTML string of the document.
 * @returns A string of concatenated styles.
 */
function extractStylesFromStylesheets(key: string): string[] {
  return Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return sheet.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    }).filter((cssRules) =>
      cssRules && cssRules.selectorText !== undefined
      && cssRules.selectorText.includes(key)
    )
    .map((cssRules) => cssRules?.cssText).filter(x => x !== undefined) as string[];
}

export { mineFromCaches };
