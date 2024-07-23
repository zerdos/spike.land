import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { transpile } from "./shared";
import { appFactory } from "./starter";
import { wait } from "./wait";
const codeSpace = getCodeSpace();
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
let controller = new AbortController();
const mod = { i: 0 };
let root;
globalThis.firstRender = globalThis.firstRender || { html: "", css: "", code: "" };
let __rootEl;
export const render = async (_rootEl, codeSpace, mApp = null, signal = null, data = null) => {
  __rootEl = _rootEl;
  if (!__rootEl) {
    return;
  }
  const { App, createRoot, createCache, CacheProvider } = await getApp(mApp, codeSpace);
  root = createRoot(_rootEl);
  const cache = createCache({ key: "css", speedy: false });
  root.render(
    _jsx(CacheProvider, {
      value: cache,
      children: _jsx(App, { width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 }),
    }),
  );
  return await handleRender();
};
async function rerender(data) {
  try {
    if (data.i && data.i > mod.i) {
      console.log("rerender", { i: data.i });
      mod.i = data.i;
      controller.abort();
      controller = new AbortController();
      const signal = controller.signal;
      root.unmount();
      document.getElementById("root").innerHTML = [
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
      if (signal.aborted) {
        return;
      }
      const App = await appFactory(data.transpiled);
      if (signal.aborted) {
        return;
      }
      render(document.getElementById(`${codeSpace}-css`), codeSpace, App, signal, data);
    }
  } catch (error) {
    console.error("Error during rerendering:", error);
  }
}
function getCodeSpace() {
  return location.pathname.slice(1).split("/")[1];
}
const m = {
  App: () => _jsx("div", { children: "loading..." }),
  createRoot: null,
  createCache: null,
  CacheProvider: null,
};
async function getApp(App, codeSpace) {
  if (!App) {
    try {
      const mod = await import(`${location.origin}/live/${codeSpace}/index.mjs`);
      m.App = mod.default;
      m.createCache = m.createCache || mod.createCache;
      m.createRoot = m.createRoot || mod.createRoot;
      m.CacheProvider = m.CacheProvider || mod.CacheProvider;
    } catch (err) {
      m.App = () => (_jsxs("div", {
        children: [_jsx("h1", { children: "Error" }), _jsx("pre", { children: JSON.stringify({ err }) })],
      }));
    }
  } else {
    m.App = App;
    const mod = await import(`${location.origin}/renderHelpers.mjs`);
    m.createCache = m.createCache || mod.createCache;
    m.createRoot = m.createRoot || mod.createRoot;
    m.CacheProvider = m.CacheProvider || mod.CacheProvider;
  }
  return m;
}
export async function handleRender() {
  const _rootEl = document.getElementById("root");
  if (!_rootEl) {
    return;
  }
  const cache = globalThis.cssCache;
  const isIframe = location.href.endsWith("iframe")
    || location.href.endsWith("/")
    || location.href.endsWith("public");
  let attempts = isIframe ? 100 : 0;
  while (attempts-- > 0) {
    const html = _rootEl.innerHTML;
    if (html) {
      return;
    }
  }
  await wait(10);
}
function mineFromCaches(_cache, html) {
  const key = _cache.key || "css";
  try {
    const styledJSXStyles = Array.from(document.querySelectorAll("style[data-styled-jsx]")).map((style) =>
      style.textContent
    );
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
          return sheet.cssRules[0];
        } catch {
          return null;
        }
      })
      .filter((rule) =>
        rule?.selectorText
        && rule.selectorText.includes(key)
        && html.includes(rule.selectorText.slice(4, 11))
      )
      .map((rule) => rule.cssText)
      .join("\n");
  }
}
