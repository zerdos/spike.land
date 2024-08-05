import type { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { createRoot } from "react-dom/client";
import { Workbox } from "workbox-window";
import { mkdir } from "./memfs";
import { wait } from "./wait";
import { renderApp, renderedAPPS, Wrapper } from "./Wrapper";
import { deleteAllServiceWorkers } from "./swUtils";
import React from "react";


//registerBroadcastLogger();
const paths = location.pathname.split("/");
const codeSpace = paths[2];

// Setup BroadcastChannel
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

async function handleNonLiveRoutes() {
  if (paths[1] !== "live") {
    const root = document.getElementById("root");
    if (!root) return;

    if (location.pathname === "/") {
      const { default: App } = await import("./pages/index");
      createRoot(root).render(React.createElement(App));
    } else if (location.pathname === "/start") {
      const { default: App } = await import("./pages/templates");
      createRoot(root).render(React.createElement(App));
    }
  }
}

async function setupServiceWorker() {
  if (!navigator.serviceWorker || localStorage.getItem("sw") === "false") {
    return;
  }

  try {
    const sw = new Workbox(`/sw.js`);
    return sw.register();
  } catch (e) {
    console.error("Error setting up service worker:", e);
  }
}

async function initializeApp() {
  await deleteAllServiceWorkers();
  await handleNonLiveRoutes();
  // Uncomment the following lines if you want to use service worker and run tests
  // const sw = await setupServiceWorker();
  // sw?.messageSkipWaiting();
  // runTests();
}

async function createDirectories() {
  try {
    await mkdir("/live");
    await mkdir(`/live/${codeSpace}`);
  } catch (e) {
    console.error("Error creating directories:", e);
  }
}

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

        const myEl = document.createElement("div")! as HTMLDivElement;
        myEl.style.height = "0";
        myEl.style.width = "0";
        document.body.appendChild(myEl); 
        console.log({myEl});

      
        const rendered = await renderApp({rootElement:myEl,transpiled});
        const App: React.ComponentType = rendered?.App!;

        if (signal.aborted) {
          rendered?.cleanup();
          document.body.removeChild(myEl);
          myEl.remove();

          return;}

       const success = await handleRender( myEl, rendered?.cssCache!, signal, mod);
          

       console.log({success});
       if (!success) return rendered?.cleanup();
       const old = document.getElementById("root")!;
       renderedAPPS!.get(old!)!.cleanup();
       myEl.style.height = "100%";
       myEl.style.width = "100%";
       document.body.removeChild(old);

       old.remove();


      
          myEl.id = "root";
       
    


   
      });
    }
    return false;
  };
}

async function handleRender(
  rootEl: HTMLDivElement,
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

  if (!rootEl) return false;

  for (let attempts = 100; attempts > 0; attempts--) {
    if (signal.aborted) return false;
    const html = rootEl.innerHTML;
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

function mineFromCaches(cache: EmotionCache, html: string) {
  console.log("mineFromCaches");
  const key = cache.key || "css";
  try {
    const tailwindCss = Array.from(
      document.querySelectorAll("style"),
    ).map((style) => style.textContent).filter((style) => style?.startsWith("/* ! tailwindcss"))[0] || "";

    const styledJSXStyles = Array.from(
      document.querySelectorAll("style[data-styled-jsx]"),
    ).map((style) => style.textContent);

    const emotionStyles = Array.from(
      new Set(
        Array.from(document.querySelectorAll(`style[data-emotion="${key}"]`))
          .map((style) => style.textContent),
      ),
    ).join("\n");

    return [tailwindCss, styledJSXStyles, emotionStyles].join("\n");
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
          rule?.selectorText !== undefined &&
          rule.selectorText.includes(key) &&
          html.includes(rule.selectorText.slice(4, 11)),
      )
      .map((rule) => rule.cssText)
      .join("\n");
  }
}

// Main execution
(async () => {
  await initializeApp();
  await createDirectories();

  if (location.pathname === `/live/${codeSpace}`) {
    handleLivePage();
  } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
    handleDehydratedPage();
  } else {
    handleDefaultPage();
  }
})();
