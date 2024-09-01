import type { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { Workbox } from "workbox-window";

import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession } from "./makeSess";
import { prettierCss } from "./shared";
import { wait } from "./wait";
import { renderApp, renderedAPPS } from "./Wrapper";
import { cSess, run as handleLivePage } from "./ws";

const codeSpace = useCodeSpace();

(() => {
  try {
    cSess.sub((sess: ICodeSession) => {
      const { i, code, transpiled } = sess;
      console.table({ i, code, transpiled });
    });
  } catch (error) {
    console.error("Error in cSess subscription:", error);
  }
})();

const setupServiceWorker = async () => {
  if (
    !navigator.serviceWorker || localStorage.getItem("sw") === "false"
    || location.origin.indexOf("localhost") !== -1
  ) {
    return null;
  }

  try {
    const sw = new Workbox(`/sw.js`);
    return sw.register();
  } catch (e) {
    console.error("Error setting up service worker:", e);
    return null;
  }
};

const createLangChainWorkflow = async (prompt: string) => {
  try {
    const { createWorkflow } = await import("./shared");
    return createWorkflow(prompt);
  } catch (error) {
    console.error("Error creating LangChain workflow:", error);
    throw error;
  }
};

const initializeApp = async () => {
  try {
    const [
      { enhancedFetch },
      { useArchive, useSpeedy },
    ] = await Promise.all([
      import("./enhancedFetch"),
      import("./hooks/useArchive"),
    ]);

    Object.assign(globalThis, { createWorkflow: createLangChainWorkflow });
    Object.assign(globalThis, {
      enhancedFetch,
      useArchive,
      useSpeedy,
    });

    await setupServiceWorker();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

const handleDehydratedPage = () => {
  try {
    cSess.sub((sess: ICodeSession) => {
      const { html, css } = sess;

      const root = document.getElementById("root");

      if (root && html && css) {
        root.innerHTML = `<style>${css}</style><div>${html}</div>`;
      }
    });
  } catch (error) {
    console.error("Error handling dehydrated page:", error);
  }
};

/**
 * Extracts CSS styles from various sources in the document.
 * @param cache - The Emotion cache object.
 * @param html - The HTML string of the document.
 * @returns A string containing the extracted CSS styles.
 */
function mineFromCaches(cache: EmotionCache, html: string): string {
  const key = cache.key || "css";

  try {
    return extractStylesFromDOM(key);
  } catch (error) {
    console.warn("Failed to extract styles from DOM, falling back to stylesheet parsing:", error);
    return extractStylesFromStylesheets(key, html);
  }
}

/**
 * Extracts styles from DOM elements.
 * @param key - The Emotion key to look for.
 * @returns A string of concatenated styles.
 */
function extractStylesFromDOM(key: string): string {
  const styledJSXStyles = getStyledJSXStyles();
  const emotionStyles = getEmotionStyles(key);
  return styledJSXStyles.concat(emotionStyles).join("\n");
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
function getEmotionStyles(key: string): string {
  const styles = Array.from(
    document.querySelectorAll(`style[data-emotion="${key}"]`),
  ).map((style) => style.textContent || "");
  return Array.from(new Set(styles)).join("\n");
}

/**
 * Extracts styles from stylesheets when DOM extraction fails.
 * @param key - The Emotion key to look for.
 * @param html - The HTML string of the document.
 * @returns A string of concatenated styles.
 */
function extractStylesFromStylesheets(key: string, html: string): string {
  return Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return sheet.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    })
    .filter((rule): rule is CSSPageRule =>
      rule?.selectorText !== undefined
      && rule.selectorText.includes(key)
      && html.includes(rule.selectorText.slice(4, 11))
    )
    .map((rule) => rule.cssText)
    .join("\n");
}

export { mineFromCaches };

const handleRender = async (
  rootEl: HTMLDivElement,
  cache: EmotionCache,
  signal: AbortSignal,
  mod: {
    counter: number;
    code: string;
    transpiled: string;
    controller: AbortController;
  },
) => {
  try {
    console.log("handleRender");
    const counter = mod.counter;

    if (!rootEl) return false;

    for (let attempts = 100; attempts > 0; attempts--) {
      if (signal.aborted) return false;
      const html = rootEl.innerHTML;
      if (html) {
        let css = mineFromCaches(cache, html);

        const criticalClasses = css.split("\n").map((line) => {
          const rule = line.slice(1, 12);
          if (html.includes(rule)) return rule;
          return null;
        }).filter((rule): rule is string => rule !== null);
        console.log({ criticalClasses });
        css = css.split("\n").filter((line) => {
          const rule = line.slice(1, 12);
          if (html.includes(rule)) return false;
          return true;
        }).join("\n");

        try {
          console.log("Prettifying CSS");
          if (css) css = await prettierCss(css);
        } catch (error) {
          console.error("Error prettifying CSS:", error);
        }

        if (mod.counter !== counter) return false;
        return { css, html };
      }
      await wait(10);
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  }
};

const handleDefaultPage = async () => {
  try {
    const mod = {
      counter: 0,
      code: "",
      transpiled: "",
      controller: new AbortController(),
    };
    const mutex = new Mutex();
    const { cSess } = await import("./ws");

    cSess.sub((sess: ICodeSession) => {
      try {
        const { transpiled } = sess;

        const myEl = document.createElement("div")! as HTMLDivElement;
        myEl.style.height = "100%";
        myEl.style.width = "100%";
        myEl.style.display = "none";
        document.body.appendChild(myEl);

        renderApp({
          transpiled,
          rootElement: myEl,
        });

        const root = document.getElementById("root");
        renderedAPPS.get(root!)!.cleanup();
        myEl.style.display = "block";
        myEl.id = "root";
      } catch (error) {
        console.error("Error in cSess subscription:", error);
      }
    });

    window.onmessage = async ({ data }) => {
      try {
        const { i, transpiled } = data;

        if (!i || !transpiled) return;
        if (i === "undefined" || transpiled === "undefined") return;

        if (mod.counter >= i) return;
        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        mod.counter = i;
        mod.transpiled = transpiled;

        if (signal.aborted) return false;

        await mutex.runExclusive(async () => {
          if (signal.aborted) return;

          const myEl = document.createElement("div")! as HTMLDivElement;
          myEl.style.height = "100%";
          myEl.style.width = "100%";
          myEl.style.display = "none";
          document.body.appendChild(myEl);

          const rendered = await renderApp({ rootElement: myEl, transpiled });
          if (signal.aborted) return false;

          if (signal.aborted) {
            try {
              rendered !== null && rendered !== undefined && rendered!.cleanup !== undefined && rendered.cleanup();
              document.body.removeChild(myEl);
              myEl.remove();
            } catch (e) {
              console.error(e);
            }
            return;
          }

          const res = await handleRender(
            myEl,
            rendered?.cssCache!,
            signal,
            mod,
          );

          if (!res) return rendered?.cleanup();

          const { css, html } = res;
          if (html === "<div style=\"width: 100%; height: 100%;\"></div>") {
            return rendered?.cleanup();
          }

          window.parent.postMessage({ i, css, html }, "*");

          const old = document.getElementById("root")!;
          renderedAPPS!.get(old!)!.cleanup();
          myEl.style.display = "block";
          document.body.removeChild(old);

          old.remove();

          myEl.id = "root";
        });
      } catch (error) {
        console.error("Error in window.onmessage handler:", error);
      }
      return false;
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

const main = async () => {
  try {
    if (location.pathname === `/live/${codeSpace}`) {
      handleLivePage();
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      handleDehydratedPage();
    } else if (location.pathname === `/live/${codeSpace}/iframe`) {
      await handleDefaultPage();
    }

    await initializeApp();
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

if (location.pathname.startsWith("/live")) {
  main().catch((error) => console.error("Unhandled error in main:", error));
}
