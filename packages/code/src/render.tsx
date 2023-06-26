import { EmotionCache } from "@emotion/cache";
import type { FC, ReactNode } from "react";

import { CacheProvider } from "@emotion/react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import createCache from "./emotionCache";
import { ICodeSession } from "./makeSess";
import ParentSize from "./ParentSize";
import type { ParentSizeState } from "./ParentSize";
import { appFactory } from "./starter";
import { wait } from "./wait";
import { stat } from "./memfs";

const runtime = require("react-refresh/runtime");
runtime.injectIntoGlobalHook(window);

const codeSpace = location.pathname.slice(1).split("/")[1];

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

let controller = new AbortController();
const mod: {
  i: number;
} = {
  i: 0,
};

const cache = createCache({
  key: "css",
  speedy: false,
});

cache.compat = undefined;

async function rerender(data: ICodeSession & { transpiled: string }) {
  try {
    if (data.i) {
      if (mod.i >= data.i) return;
      console.log("rerender", { i: data.i });
      mod.i = data.i;

      controller.abort();
      controller = new AbortController();
      const signal = controller.signal;

      root.unmount();

      document.getElementById("root")!.innerHTML = [
        `<div id="${codeSpace}-css" style="height:100%;">`,
        "<style>",
        data.css,
        "</style>",
        data.html,
        "</div>",
      ].join("");

      if (signal.aborted) return;
      const App = await appFactory(data.transpiled);

      if (signal.aborted) return;

      render(document.getElementById(`${codeSpace}-css`)!, codeSpace, App as any, signal, data);
      return;
    }
  } catch (error) {
    console.error("Error during rerendering:", error);
  }
}

let root: Root;
globalThis.firstRender = globalThis.firstRender || {
  html: "",
  css: "",
  code: "",
};

let __rootEl: HTMLElement;

export const render = async (
  _rootEl: HTMLElement,
  codeSpace: string,
  mApp = null,
  signal = null as any,
  data = null as any,
) => {
  __rootEl = _rootEl;
  if (!__rootEl) return;
  let App: FC<
    {
      width?: number;
      height?: number;
      top?: number;
      left?: number;
      ref?: HTMLDivElement;
      resize?: (state: ParentSizeState) => void;
      children?: ReactNode;
    }
  > = mApp as any;

  if (!App) {
    try {
      App = (await import(
   await stat(`/live/${codeSpace}/index.mjs`)?     `${location.origin}/live/${codeSpace}/index.mjs`: `${location.origin}/live/${codeSpace}/index.js`
      )).default;
    } catch (err) {
      App = () => (
        <div>
          <h1>Error</h1>
          <pre>{JSON.stringify({err})}</pre>
        </div>
      );
    }
  }

  root = createRoot(_rootEl);
  const cache = createCache({
    key: "css",
    speedy: false,
  });

  cache.compat = undefined;

  root.render(
    <CacheProvider value={cache}>
      <ParentSize>
        {({ width, height, top, left }) => (
          <App
            {...(width ? { width } : { width: window.innerWidth })}
            {...(height ? { height } : { height: window.innerHeight })}
            {...(top ? { top } : { top: 0 })}
            {...(left ? { left } : { left: 0 })}
          />
        )}
      </ParentSize>
    </CacheProvider>,
  );

  let ii = (location.href.endsWith("iframe") || location.href.endsWith("/")
      || location.href.endsWith("public"))
    ? 100
    : 0;
  while (ii-- > 0) {
    if (signal && signal.aborted) return;

    const html = _rootEl.innerHTML;
    if (html && html !== "") {
      const css = mineFromCaches(
        cache,
        html,
      );

      if (data) {
        if (!signal.aborted) {
          BC.postMessage({
            ...data,
            html,
            css,
          });
        }
        return;
      }

      globalThis.firstRender.html = html;
      globalThis.firstRender.css = css;

      window?.parent?.postMessage({ type: "firstRender", html, css });

      return { html, css };
    }

    await wait(10);
  }

  return root;
};

function mineFromCaches(_cache: EmotionCache, html: string) {
  // const key = "css";
  const key = _cache.key || "css";
  try {
    return Array.from(document.querySelectorAll("style[data-styled-jsx")).map(
      (x) => x.textContent,
    )
      + Array.from(
        new Set(
          Array.from(
            document.querySelectorAll(`style[data-emotion="${key}"]`),
          ).map((x) => x.textContent),
        ),
      ).join("\n");
  } catch {
    // const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
    return Array.from(document.styleSheets).map((x) => {
      try {
        return x.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    }).filter((x) =>
      x?.selectorText && x.selectorText.indexOf(key) !== -1
      && html.indexOf(x.selectorText.slice(4, 11)) !== -1
    )
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}

if (
  location.pathname.endsWith("/iframe")
  || location.pathname.endsWith("/")
  || location.pathname.endsWith("/public")
) {
  window.onmessage = async ({ data }) => {
    rerender(data);
  };
  BC.onmessage = ({ data }) => data.html && data.i && rerender(data);
}
