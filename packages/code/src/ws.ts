import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession } from "./makeSess";

import { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { Code } from "./services/CodeSession";
import { prettierCss } from "./shared";
import { mineFromCaches } from "./utils/mineCss";
import { wait } from "./wait";
import { renderApp, renderedAPPS } from "./Wrapper";

export const cSess = new Code();
await cSess.run();

export const run = async () => {
  const { renderPreviewWindow } = await import("./renderPreviewWindow");
  renderPreviewWindow({ codeSpace: useCodeSpace(), cSess });
};

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

export const handleDehydratedPage = () => {
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

    for (let attempts = 5; attempts > 0; attempts--) {
      if (signal.aborted) return false;

      const html = rootEl.innerHTML;
      console.log("Initial HTML length:", html.length);

      if (html) {
        let css = mineFromCaches(cache, html);
        console.log("Initial CSS length:", css.length);

        const criticalClasses = css.split("\n").map((line) => {
          const rule = line.slice(1, 12);
          if (html.includes(rule)) return rule;
          return null;
        }).filter((rule) => rule !== null);
        console.log("Critical classes found:", criticalClasses.length);

        // filter all the css for the critical classes
        css = css.split("\n").filter((line) => {
          return criticalClasses.some((rule) => line.includes(rule));
        }).join("\n");
        console.log("CSS length after filtering:", css.length);

        try {
          console.log("Prettifying CSS");
          if (css) {
            const prettifiedCss = await prettierCss(css);
            console.log("Prettified CSS length:", prettifiedCss.length);
            css = prettifiedCss;
          } else {
            console.log("CSS is empty before prettifying");
          }
        } catch (error) {
          console.error("Error prettifying CSS:", error);
          // Preserve original CSS if prettifying fails
          console.log("Preserving original CSS due to prettify error");
        }

        if (mod.counter !== counter) {
          console.log("Counter mismatch, returning false");
          return false;
        }

        console.log("Final CSS length:", css.length);
        console.log("Final HTML length:", html.length);
        return { css, html };
      } else {
        console.log("HTML is empty, returning without processing");
        await wait(100);
      }
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  }
};

export const handleDefaultPage = async () => {
  try {
    const mod = { ...cSess.session, counter: cSess.session.i, controller: new AbortController() };

    const mutex = new Mutex();

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

        if (mod.counter >= i) return;

        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        if (signal.aborted) return false;

        await mutex.runExclusive(async () => {
          if (signal.aborted) return;

          const myEl = document.createElement("div")! as HTMLDivElement;
          myEl.style.height = "100%";
          myEl.style.width = "100%";
          myEl.style.display = "none";
          document.body.appendChild(myEl);

          const rendered = await renderApp({ rootElement: myEl, transpiled });
          if (null === rendered) return false;

          await wait(300);

          const cleanupAndRemove = () => {
            try {
              rendered?.cleanup?.();
              document.body.removeChild(myEl);
              myEl.remove();
            } catch (e) {
              console.error(e);
            }
            return false;
          };

          if (signal.aborted) return cleanupAndRemove();

          await wait(100);

          if (signal.aborted) return cleanupAndRemove();

          const res = await handleRender(
            myEl,
            rendered.cssCache,
            signal,
            mod,
          );

          if (res === false) {
            if (signal.aborted) return cleanupAndRemove();
          } else {
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
          }
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
