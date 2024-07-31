import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import { Mutex } from "async-mutex";
import { createRoot } from "react-dom/client";
import { getTransferables, hasTransferables } from "transferables";
import { Workbox } from "workbox-window";
import { mkdir } from "./memfs";
import { getPort, init } from "./shared";
import { createJsBlob } from "./starter";
import { wait } from "./wait";

const { swVersion } = self;
const paths = location.pathname.split("/");
const codeSpace = paths[2];

if (paths[1] !== "live") {
  if (location.pathname === "/") {
    import("./pages/index").then((m) => {
      const App = m.default;
      createRoot(document.getElementById("root")!).render(<App />);
    });
  }

  if (location.pathname === "/start") {
    import("./pages/templates").then((m) => {
      const App = m.default;
      createRoot(document.getElementById("root")!).render(<App />);
    });
  }
}

function setupServiceWorker() {
  if (navigator.serviceWorker) {
    setTimeout(() => {
      if (localStorage.getItem("sw") === "false") return;
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
}
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
setupServiceWorker();

async function createDirectories() {
  try {
    await mkdir("/live");
    await mkdir(`/live/${codeSpace}`);
  } catch (e) {
    console.error("Error creating directories:", e);
  }
}

createDirectories();

async function handleLivePage() {
  const { run } = await import("./ws");
  run();
}

function handleDehydratedPage() {
  BC.onmessage = ({ data }) => {
    const { html, css } = data;
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div id="${codeSpace}-css" style="height:100%;">
          <style>${css}</style>
          ${html}
        </div>
      `;
    }
  };
}

function handleDefaultPage() {
  const mod = {
    counter: 0,
    code: "",
    transpiled: "",
    controller: new AbortController(),
  };
  const mutex = new Mutex();

  BC.onmessage = async ({ data }) => {
    const { i, transpiled, html } = data;
    if (i > mod.counter && transpiled && html) {
      const blobUrl = createJsBlob(transpiled);
      const { renderApp } = await import(blobUrl);
      renderApp();
    }
  };

  window.onmessage = async ({ data }) => {
    const { i, code, transpiled } = data;
    console.log({ i, code, transpiled });

    if (i > mod.counter && transpiled) {
      console.log("rerender");
      mod.controller.abort();
      const { signal } = (mod.controller = new AbortController());

      mod.counter = i;
      mod.code = code;
      mod.transpiled = transpiled;

      if (signal.aborted) return false;

      await mutex.runExclusive(async () => {
        if (signal.aborted) return;

        const blobUrl = createJsBlob(transpiled);
        const { renderApp } = await import(blobUrl);

        if (signal.aborted) return;
        const el = document.createElement("div");
        const rRoot = createRoot(el);

        const swappedRoot = globalThis.rRoot;
        const cssCache = createCache({ key: "css", speedy: false });
        const swappedCache = globalThis.cssCache;

        globalThis.rRoot = rRoot;
        globalThis.cssCache = cssCache;
        renderApp();

        const success = await handleRender(el, signal, mod);

        globalThis.rRoot = swappedRoot;
        globalThis.cssCache = swappedCache;
        if (success) renderApp();
        rRoot.unmount();
        el.remove();
        await wait(100);
      });
    }
    return false;
  };
}

async function handleRender(_rootEl: HTMLDivElement, signal: AbortSignal, mod: {
  counter: number;
  code: string;
  transpiled: string;
  controller: AbortController;
}) {
  console.log("handleRender");
  const counter = mod.counter;

  if (!_rootEl) return false;

  const cache = (globalThis as unknown as { cssCache: EmotionCache }).cssCache;

  for (let attempts = 100; attempts > 0; attempts--) {
    if (signal.aborted) return false;
    const html = _rootEl.innerHTML;
    if (html) {
      const css = mineFromCaches(cache, html);

      if (mod.counter !== counter) return false;
      BC.postMessage({
        html,
        css,
        i: counter,
        code: mod.code,
        transpiled: mod.transpiled,
        sender: "Hydrator",
      });

      return true;
    }
    await wait(10);
  }
  return false;
}

function mineFromCaches(_cache: EmotionCache, html: string) {
  const key = _cache.key || "css";
  try {
    const styledJSXStyles = Array.from(
      document.querySelectorAll("style[data-styled-jsx]"),
    ).map((style) => style.textContent);

    const emotionStyles = Array.from(
      new Set(
        Array.from(document.querySelectorAll(`style[data-emotion="${key}"]`))
          .map(
            (style) => style.textContent,
          ),
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
      .filter(
        (rule): rule is CSSPageRule =>
          rule?.selectorText !== undefined
          && rule.selectorText.includes(key)
          && html.includes(rule.selectorText.slice(4, 11)),
      )
      .map((rule) => rule.cssText)
      .join("\n");
  }
}

if (location.pathname === `/live/${codeSpace}`) {
  handleLivePage();
} else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
  handleDehydratedPage();
} else {
  handleDefaultPage();
}
