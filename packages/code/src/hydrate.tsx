// Import necessary modules
import { Workbox } from "workbox-window";
import { getPort, init } from "./shared";

import type { EmotionCache } from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { getTransferables, hasTransferables } from "transferables";
import { mkdir } from "./memfs";
import { createJsBlob } from "./starter";
import { wait } from "./wait";

// Set up service worker version
const { swVersion } = self;

if (!location.pathname.startsWith("/live/")) {
  import("./assets/tw.js");

  const Page = (await import("./pages/index")).default;

  const root = document.getElementById("root");
  createRoot(root!).render(<Page />);
}

if (navigator.serviceWorker) {
  setTimeout(() => {
    try {
      const sw = new Workbox(`/sw.js`);

      init(swVersion, null);
      const port = getPort();

      // Set up service worker event listeners
      sw.getSW().then((sw) => {
        const swPort = new MessageChannel();
        port.addEventListener(
          "message",
          ({ data }) =>
            swPort.port1.postMessage(
              data,
              (hasTransferables(data)
                ? getTransferables(data)
                : undefined) as unknown as Transferable[],
            ),
        );
        swPort.port1.addEventListener(
          "message",
          ({ data }) =>
            swPort.port1.postMessage(
              data,
              (hasTransferables(data)
                ? getTransferables(data)
                : undefined) as unknown as Transferable[],
            ),
        );
        sw.postMessage(
          { type: "sharedworker", sharedWorkerPort: swPort.port1 },
          [
            swPort.port1,
          ],
        );
      });

      // Register service worker
      if ("serviceWorker" in navigator) {
        sw.register().then(() =>
          navigator.serviceWorker.register("/sw.js").then((sw) => {
            navigator.serviceWorker.getRegistrations().then(
              (workers) =>
                Promise.all(
                  workers.filter(
                    (x) => x !== sw,
                  ).map((x) => x.unregister()),
                ),
            );
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  });
}

// Create directories for the code space

const paths = location.pathname.split("/");

const codeSpace = paths[2];

(async () => {
  try {
    await mkdir("/live").then(() => mkdir(`/live/${codeSpace}`));
  } catch (e) {
    console.error("no local storage available");
  }
})();

// Check if on live page, and if so, run the code
if (location.pathname === `/live/${codeSpace}`) {
  import("./ws").then(({ run }) => run());
} else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

  // Update HTML and CSS on message received
  BC.onmessage = ({ data }) => {
    const { html, css } = data;
    debugger;
    document.getElementById("root")!.innerHTML = [
      `<div id="${codeSpace}-css" style="height:100%;">`,
      "<style>",
      css,
      "</style>",
      html,
      "</div>",
    ].join("");
  };
} else {
  // Render the code
  // import { render } from "./render";

  // console.log("render");
  // const { renderApp } = await import(`/live/${codeSpace}/index.mjs`);

  // renderApp();

  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

  const mod = { counter: 0, code: "", transpiled: "" };
  BC.onmessage = async ({ data }) => {
    const { i, code, transpiled } = data;

    console.log({ i, code, transpiled });

    if (i > mod.counter && transpiled) {
      console.log("rerender");
      mod.counter = i;
      mod.code = code;
      mod.transpiled = transpiled;

      const blobUrl = createJsBlob(transpiled);
      const renderApp = (await import(blobUrl)).renderApp;
      renderApp();
      handleRender();
    }
    async function handleRender() {
      console.log("handleRender");
      const counter = mod.counter;
      const _rootEl = document.getElementById("root");
      if (!_rootEl) return;

      const cache = (globalThis as unknown as { cssCache: EmotionCache }).cssCache;

      let attempts = 100;

      while (attempts-- > 0) {
        const html = _rootEl.innerHTML;
        if (html) {
          const css = mineFromCaches(cache, html);

          if (mod.counter !== counter) return;
          BC.postMessage({
            html,
            css,
            i: counter,
            code: mod.code,
            transpiled: mod.transpiled,
            sender: "Hydrater",
          });
          // globalThis.firstRender = { html, css, code: "" };
          // window?.parent?.postMessage({ type: "firstRender", html, css });

          return;
        }
        await wait(10);
      }

      function mineFromCaches(_cache: EmotionCache, html: string) {
        const key = _cache.key || "css";
        try {
          const styledJSXStyles = Array.from(
            document.querySelectorAll("style[data-styled-jsx]"),
          ).map((style) => style.textContent);

          const emotionStyles = Array.from(
            new Set(
              Array.from(
                document.querySelectorAll(`style[data-emotion="${key}"]`),
              )
                .map((style) => style.textContent),
            ),
          ).join("\n");

          return styledJSXStyles.concat(emotionStyles).join("\n");
        } catch {
          return Array.from(document.styleSheets)
            .map((sheet) => {
              try {
                return sheet.cssRules[0] as CSSPageRule;
              } catch {
                return null;
              }
            })
            .filter((rule) =>
              rule?.selectorText
              && rule.selectorText.includes(key)
              && html.includes(rule.selectorText.slice(4, 11))
            )
            .map((rule) => rule!.cssText)
            .join("\n");
        }
      }
    }
  };

  // window.onmessage = () => {
  //   const now = Date.now();
  //   rerender(now);
  // };
}
