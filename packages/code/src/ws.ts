import { useCodeSpace } from "@/hooks/use-code-space";
import type { ICodeSession, RenderedApp } from "@/lib/interfaces";

import { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { initializeApp } from "./hydrate";
import { Code } from "./services/CodeSession";

import { renderApp } from "@/lib/render-app";
import { prettierCss } from "@/lib/shared";
import { debounce } from "es-toolkit";
import { mineFromCaches } from "./utils/mineCss";
import { wait } from "./wait";

let { rendered } = globalThis as unknown as { rendered: RenderedApp | null };
const cSess = new Code();

const waitForCSess = cSess.run();

const run = async () => {
  const { renderPreviewWindow } = await import("./renderPreviewWindow");
  renderPreviewWindow({ codeSpace: useCodeSpace(), cSess });
};

const handleDefaultPage = async () => {
  try {
    const mod = { ...cSess.session, counter: cSess.session.i, controller: new AbortController() };

    const mutex = new Mutex();

    let currentVersion = 0;
    const renderQueue: ICodeSession[] = [];
    let isRendering = false;

    const queueRender = (sess: ICodeSession) => {
      renderQueue.push(sess);
      processRenderQueue();
    };

    const processRenderQueue = async () => {
      if (isRendering || renderQueue.length === 0) return;
      isRendering = true;
      const sess = renderQueue.pop()!;
      renderQueue.length = 0; // Clear queue, we'll render the latest
      try {
        await updateRenderedApp(sess);
      } finally {
        isRendering = false;
        processRenderQueue(); // Check if more renders were queued
      }
    };

    const updateRenderedApp = async (sess: ICodeSession) => {
      const version = ++currentVersion;
      try {
        await mutex.runExclusive(async () => {
          console.log(`Updating rendered app... (version ${version})`);
          const { transpiled, i } = sess;

          if (!transpiled || mod.counter >= i) {
            console.log(`Skipping render due to outdated data (version ${version})`);
            return;
          }

          mod.transpiled = transpiled;
          mod.counter = i;

          if (version !== currentVersion) {
            console.log(`A newer version is already being processed (current: ${version}, latest: ${currentVersion})`);
            return;
          }

          const myEl = document.createElement("div");
          myEl.style.cssText = "height: 100%; width: 100%; display: none;";
          document.body.appendChild(myEl);

          if (rendered) {
            console.log(`Cleaning up previous render (version ${version})`);
            rendered.cleanup();
          }
          rendered = null;

          try {
            rendered = await renderApp({
              transpiled,
              codeSpace: cSess.codeSpace,
              rootElement: myEl,
            });

            console.log(`Render successful (version ${version})`);
            myEl.style.display = "block";
            myEl.id = "root";
          } catch (error) {
            console.error(`Error rendering app (version ${version}):`, error);
          } finally {
            if (!rendered) {
              console.log(`Implementing fallback render (version ${version})`);
              // Implement a fallback render or retry mechanism
              rendered = await createFallbackRender();
            }
          }
        });
      } catch (error) {
        console.error(`Error in updateRenderedApp (version ${version}):`, error);
      }
    };

    cSess.sub(queueRender);

    window.onmessage = async ({ data }) => {
      try {
        const { i, transpiled } = data;

        if (!i || !transpiled || mod.counter >= i) {
          console.log("Skipping message due to outdated data");
          return false;
        }

        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        if (signal.aborted) return false;

        queueRender({ ...cSess.session, i, transpiled });
      } catch (error) {
        console.error("Error processing message:", error);
      }
      return false;
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

const main = async () => {
  const codeSpace = useCodeSpace();
  await waitForCSess;

  try {
    if (location.pathname === `/live/${codeSpace}`) {
      await run();
      await initializeApp();
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      handleDehydratedPage();
    } else {
      await handleDefaultPage();
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

if (location.pathname.startsWith("/live")) {
  main();
}

(() => {
  try {
    cSess.sub(debounce((sess: ICodeSession) => {
      const { i, code, transpiled } = sess;
      console.table({ i, code, transpiled });
    }, 100));
  } catch (error) {
    console.error("Error in cSess subscription:", error);
  }
})();

export const handleDehydratedPage = () => {
  try {
    cSess.sub(debounce((sess: ICodeSession) => {
      const { html, css } = sess;
      const root = document.getElementById("embed");
      if (root && html && css) {
        root.innerHTML = `<style>${css}</style><div>${html}</div>`;
      }
    }, 100));
  } catch (error) {
    console.error("Error handling dehydrated page:", error);
  }
};

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
    const counter = mod.counter;
    if (!rootEl) return false;

    for (let attempts = 5; attempts > 0; attempts--) {
      if (signal.aborted) return false;

      const html = rootEl.innerHTML;
      if (!html) {
        await wait(100);
        continue;
      }

      let css = mineFromCaches(cache);
      const criticalClasses = new Set(
        css.map(line => {
          const rule = line.slice(1, line.indexOf("{")).trim();
          return html.includes(rule) ? rule : null;
        })
          .filter(Boolean),
      );

      const styleElement = document.querySelector("head > style:last-child");
      const tailWindClasses = styleElement
        ? Array.from((styleElement as HTMLStyleElement).sheet!.cssRules).map(x => x.cssText)
        : [];

      let eCss = css.filter(line => Array.from(criticalClasses).some(rule => rule ? line.includes(rule) : false)).map(
        x => x.trim(),
      ).filter(Boolean);

      let cssStrings = [...eCss, ...tailWindClasses].sort().join("\n");
      try {
        cssStrings = cssStrings ? await prettierCss(cssStrings) : "";
      } catch (error) {
        console.error("Error prettifying CSS:", error);
      }

      if (mod.counter !== counter) return false;

      return { css: cssStrings.split(cache.key).join("x"), html: html.split(cache.key).join("x") };
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  }
};

// Helper function for fallback render (implementation needed)
const createFallbackRender = () =>
  renderApp({ rootElement: document.createElement("div"), transpiled: cSess.session.transpiled });
