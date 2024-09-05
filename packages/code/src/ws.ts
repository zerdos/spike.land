import { ICodeSession } from "@/lib/interfaces";
import { useCodeSpace } from "./hooks/useCodeSpace";

import { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { initializeApp } from "./hydrate";
import { Code } from "./services/CodeSession";

import { renderApp, renderedAPPS } from "@/components/app/wrapper";
import { prettierCss } from "@/lib/shared";
import { debounce } from "es-toolkit";
import { mineFromCaches } from "./utils/mineCss";
import { wait } from "./wait";

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

    const updateRenderedApp = async (sess: ICodeSession) => {
      try {
        const { transpiled } = sess;

        const myEl = document.createElement("div");
        myEl.style.cssText = "height: 100%; width: 100%; display: none;";
        document.body.appendChild(myEl);

        await renderApp({
          transpiled,
          codeSpace: cSess.codeSpace,
          rootElement: myEl,
        });

        const root = document.getElementById("root")!;
        renderedAPPS.get(root)?.cleanup();

        myEl.style.display = "block";
        myEl.id = "root";
      } catch (error) {
        console.error("Error updating rendered app:", error);
      }
    };

    cSess.sub(debounce(updateRenderedApp, 100));

    window.onmessage = async ({ data }) => {
      try {
        const { i, transpiled } = data;

        if (!i || !transpiled || mod.counter >= i) return;

        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        if (signal.aborted) return false;

        await mutex.runExclusive(async () => {
          if (signal.aborted) return;

          const myEl = document.createElement("div");
          myEl.style.cssText = "height: 100%; width: 100%; display: none;";
          document.body.appendChild(myEl);

          const rendered = await renderApp({ rootElement: myEl, transpiled });

          if (!rendered) return false;

          await wait(100);
          if (signal.aborted) return rendered.cleanup();

          const res = await handleRender(myEl, rendered.cssCache, signal, mod);

          if (res === false) {
            if (signal.aborted) return rendered.cleanup();
          } else {
            const { css, html } = res;
            if (html === "<div style=\"width: 100%; height: 100%;\"></div>") {
              return rendered.cleanup();
            }

            window.parent.postMessage({ i, css, html }, "*");

            const old = document.getElementById("root")!;
            renderedAPPS.get(old)?.cleanup();

            myEl.id = "root";
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

const main = async () => {
  const codeSpace = useCodeSpace();
  await waitForCSess;

  try {
    if (location.pathname === `/live/${codeSpace}`) {
      await run();
      await initializeApp();
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      handleDehydratedPage();
    } else if (location.pathname === `/live/${codeSpace}/iframe`) {
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
      const root = document.getElementById("root");
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

      let css = mineFromCaches(cache, html);
      const criticalClasses = new Set(
        css.split("\n")
          .map(line => {
            const rule = line.slice(1, line.indexOf("{"));
            return html.includes(rule) ? rule : null;
          })
          .filter(Boolean),
      );

      const styleElement = document.querySelector("head > style:last-child");
      const tailWindClasses = styleElement
        ? Array.from((styleElement as HTMLStyleElement).sheet!.cssRules).map(x => x.cssText)
        : [];

      let eCss = css.split("\n")
        .filter(line => Array.from(criticalClasses).some(rule => rule ? line.includes(rule) : false)).map(x =>
          x.trim().split("_" + cache.key + "-").join("")
        ).filter(Boolean);

      css = [...eCss, ...tailWindClasses].sort().join("\n");
      try {
        css = css ? await prettierCss(css) : "";
      } catch (error) {
        console.error("Error prettifying CSS:", error);
      }

      if (mod.counter !== counter) return false;

      return { css, html: html.split("_" + cache.key + "-").join("") };
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  }
};
