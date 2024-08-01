import type { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { createRoot } from "react-dom/client";
import { getTransferables, hasTransferables } from "transferables";
import { Workbox } from "workbox-window";
import { mkdir } from "./memfs";
import { getPort, init } from "./shared";

import { wait } from "./wait";
import { renderApp } from "./Wrapper";

const { swVersion } = self;
const paths = location.pathname.split("/");
const codeSpace = paths[2];

// Setup BroadcastChannel
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

// Handle non-live routes
import React from "react";

async function handleNonLiveRoutes() {
  if (paths[1] !== "live") {
    if (location.pathname === "/") {
      const { default: App } = await import("./pages/index");
      createRoot(document.getElementById("root")!).render(React.createElement(App));
    } else if (location.pathname === "/start") {
      const { default: App } = await import("./pages/templates");
      createRoot(document.getElementById("root")!).render(React.createElement(App));
    }
  }
}

// Setup Service Worker
async function setupServiceWorker() {
  if (!navigator.serviceWorker || localStorage.getItem("sw") === "false") return;

  try {
    const sw = new Workbox(`/sw.js`);
    sw.register();
    return sw;
  } catch (e) {
    console.error("Error setting up service worker:", e);
  }
}

// Initialize the application
async function initializeApp() {
  await handleNonLiveRoutes();
 const sw =  await setupServiceWorker();
 sw?.messageSkipWaiting();
}

initializeApp();

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
      renderApp({
        transpiled,
        rootElement: document.getElementById("root")! as HTMLDivElement,
      });
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

        // const rootElement = document.createElement("div");

        const rendered = (await renderApp({
          transpiled,
          rootElement: document.getElementById("root")! as HTMLDivElement,
        }))!;
        const { rootElement, cssCache } = rendered;

        await handleRender(rootElement, cssCache, signal, mod);
      });
    }
    return false;
  };
}

async function handleRender(
  _rootEl: HTMLDivElement,
  cache: EmotionCache,
  signal: AbortSignal,
  mod: {
    counter: number;
    code: string;
    transpiled: string;
    controller: AbortController;
  },
) {
  console.log("handleRender");
  const counter = mod.counter;

  if (!_rootEl) return false;

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
