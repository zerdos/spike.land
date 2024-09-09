import { useCodeSpace } from "@/hooks/use-code-space";
import type { ICodeSession, RenderedApp } from "@/lib/interfaces";

import { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { initializeApp } from "./hydrate";
import { Code } from "./services/CodeSession";

import { renderApp } from "@/lib/render-app";
import { prettierCss } from "@/lib/shared";
import { debounce } from "es-toolkit";
import { renderPreviewWindow } from "./renderPreviewWindow";
import { mineFromCaches } from "./utils/mineCss";
import { wait } from "./wait";

let { rendered } = globalThis as unknown as { rendered: RenderedApp | null };
const cSess = new Code();

const waitForCSess = cSess.run();

const handleDefaultPage = async () => {
  try {
    const mod = { ...cSess.session, counter: cSess.session.i, controller: new AbortController() };

    const mutex = new Mutex();

    const updateRenderedApp = async (sess: ICodeSession) => {
      try {
        await mutex.runExclusive(async () => {
          console.log("Updating rendered app...");
          const { transpiled, i } = sess;
          // if (!transpiled || mod.counter >= i) return;
          mod.transpiled = transpiled;
          mod.counter = i;

          const myEl = document.createElement("div");
          myEl.style.cssText = "height: 100%; width: 100%; display: none;";
          document.body.appendChild(myEl);

          if (rendered) rendered.cleanup();
          rendered = null;

          rendered = await renderApp({
            transpiled,
            codeSpace: cSess.codeSpace,
            rootElement: myEl,
          });

          myEl.style.display = "block";
          document.getElementById("embed")?.remove();
          // myEl.id = "root";
        });
      } catch (error) {
        if (rendered) rendered.cleanup();
        console.error("Error updating rendered app:", error);
      }
    };

    cSess.sub(updateRenderedApp);

    window.onmessage = async ({ data }) => {
      try {
        const { i, transpiled } = data;

        // if (!i || !transpiled || mod.counter >= i) return;

        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        if (signal.aborted) return false;

        await mutex.runExclusive(async () => {
          if (signal.aborted) return;

          const myEl = document.createElement("div");
          myEl.style.cssText = "height: 100%; width: 100%; display: none;";
          document.body.appendChild(myEl);

          const renderedNew = await renderApp({ rootElement: myEl, transpiled });

          if (!renderedNew) return false;

          await wait(100);
          if (signal.aborted) return renderedNew.cleanup();

          const res = await handleRender(myEl, renderedNew.cssCache, signal, mod);

          if (res !== false) {
            const { css, html } = res;
            window.parent.postMessage({ i, css, html }, "*");
            myEl.style.display = "block";

            rendered && rendered.cleanup();
            rendered = null;
            rendered = renderedNew;
            document.getElementById("embed")?.remove();
            // myEl.id = "root";
          }
        });
      } catch (error) {
        console.error("Error processing message:", error);
      }
      return false;
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};

export const main = async () => {
  const codeSpace = useCodeSpace();
  await waitForCSess;

  try {
    if (location.pathname === `/live/${codeSpace}`) {
      console.log("Rendering preview window...");
      await renderPreviewWindow({ codeSpace: useCodeSpace(), cSess });
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

const handleDehydratedPage = () => {
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
