import { EmotionCache } from "@emotion/cache";
import type { FC, ReactNode } from "react";
import { CacheProvider } from "./emotion";
import createCache from "./emotionCache";
import { ICodeSession } from "./makeSess";
import { stat } from "./memfs";
import ParentSize from "./ParentSize";
import type { ParentSizeState } from "./ParentSize";
import { createRoot } from "./reactDomClient.mjs";
import { transpile } from "./shared";
import { appFactory } from "./starter";
import { wait } from "./wait";

const codeSpace = getCodeSpace();
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
let controller = new AbortController();
const mod = { i: 0 };

let root: ReturnType<typeof createRoot>;
globalThis.firstRender = globalThis.firstRender || { html: "", css: "", code: "" };
let __rootEl: HTMLElement;

export const render = async (
  _rootEl: HTMLElement,
  codeSpace: string,
  mApp: FC<AppProps> | null = null,
  signal: AbortSignal | null = null,
  data: ICodeSession | null = null,
) => {
  __rootEl = _rootEl;
  if (!__rootEl) return;

  const App = (await getApp(mApp, codeSpace)) as FC<AppProps>;

  root = createRoot(_rootEl);
  const cache = createCache({ key: "css", speedy: false });

  root.render(
    <CacheProvider value={cache}>
      <ParentSize>
        {({ width, height, top, left }) => (
          <App
            width={width || window.innerWidth}
            height={height || window.innerHeight}
            top={top || 0}
            left={left || 0}
          />
        )}
      </ParentSize>
    </CacheProvider>,
  );

  return await handleRender(_rootEl, signal, data, cache);
};

async function rerender(data: ICodeSession & { transpiled: string }) {
  try {
    if (data.i && data.i > mod.i) {
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

      data.transpiled = data.transpiled || await transpile({
        code: data.code,
        originToUse: location.origin,
      });

      if (signal.aborted) return;
      const App = await appFactory(data.transpiled);

      if (signal.aborted) return;

      render(
        document.getElementById(`${codeSpace}-css`)!,
        codeSpace,
        App as any,
        signal,
        data,
      );
    }
  } catch (error) {
    console.error("Error during rerendering:", error);
  }
}

function getCodeSpace() {
  return location.pathname.slice(1).split("/")[1];
}

async function getApp(App: FC<AppProps> | null, codeSpace: string) {
  if (!App) {
    try {
      const isIframe = location.href.endsWith("iframe");
      const hasIndex = await stat(`/live/${codeSpace}/index.mjs`);
      const moduleUrl = isIframe || hasIndex
        ? `${location.origin}/live/${codeSpace}/index.mjs`
        : `${location.origin}/live/${codeSpace}/index.js`;

      App = (await import(moduleUrl)).default;
    } catch (err) {
      App = () => (
        <div>
          <h1>Error</h1>
          <pre>{JSON.stringify({ err })}</pre>
        </div>
      );
    }
  }

  return App;
}

async function handleRender(
  _rootEl: HTMLElement,
  signal: AbortSignal | null,
  data: ICodeSession | null,
  cache: EmotionCache,
) {
  const isIframe = location.href.endsWith("iframe")
    || location.href.endsWith("/")
    || location.href.endsWith("public");

  let attempts = isIframe ? 100 : 0;

  while (attempts-- > 0) {
    if (signal?.aborted) return;

    const html = _rootEl.innerHTML;
    if (html) {
      const css = mineFromCaches(cache, html);

      if (data) {
        if (!signal?.aborted) {
          BC.postMessage({ ...data, html, css });
        }
        return;
      }

      globalThis.firstRender = { html, css, code: "" };
      window?.parent?.postMessage({ type: "firstRender", html, css });

      return { html, css };
    }

    await wait(10);
  }

  return root;
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

if (
  location.pathname.endsWith("/iframe")
  || location.pathname.endsWith("/")
  || location.pathname.endsWith("/public")
) {
  window.onmessage = async ({ data }) => {
    await rerender(data);
  };
  BC.onmessage = async ({ data }) => {
    if (data.html && data.i) {
      await rerender(data);
    }
  };
}

type AppProps = {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  ref?: HTMLDivElement;
  resize?: (state: ParentSizeState) => void;
  children?: ReactNode;
};