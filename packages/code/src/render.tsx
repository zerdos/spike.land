import "react";
import { EmotionCache } from "@emotion/cache";
import type { FC } from "react";

import createCache from "./emotionCache";
// import { unmountComponentAtNode } from "react-dom";import { createRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { appFactory, md5 } from "./starter";
import { wait } from "./wait";

const codeSpace = location.pathname.slice(1).split("/")[1];

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

let root: Root;
globalThis.firstRender = globalThis.firstRender || {
  html: "",
  css: "",
  code: "",
};

export const render = async (
  _rootEl: HTMLDivElement,
  codeSpace: string,
  counter: number,
) => {
  let App;
  try {
    App = (await import(
      location.origin + "/live/" + codeSpace + "/index.mjs"
    )).default;
  } catch (err) {
    try {
      App = (await import(
        location.origin + "/live/" + codeSpace + "/index.js?i=" + counter
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

  const el = document.createElement("div");
  el.style.opacity = "0";
  _rootEl.parentElement?.appendChild(el);
  _rootEl.parentElement;
  const cache = createCache({
    key: "css",
    speedy: false,
  });

  cache.compat = undefined;

  // rootEl = _rootEl;
  root = createRoot(el);
  root.render(
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>,
  );

  let i = 100;
  while (i-- > 0) {
    const html = el.innerHTML;
    if (html && html !== "") {
      const css = mineFromCaches(
        cache,
        html,
      );

      // root.unmount();
      console.log({ html, css });
      globalThis.firstRender.html = html;
      globalThis.firstRender.css = css;
      el.style.opacity = "1";
      el.style.height = "100%";
      const id = _rootEl.id;

      _rootEl.remove();
      el.setAttribute(id, id);
      BC.postMessage({ type: "firstRender", html, css });

      return { html, css };
    }

    await wait(10);
  }

  return root;
};

export const prerender = async (App: FC) => {
  const _rootEl = document.getElementById("root")!;
  const el = document.createElement("div");
  el.style.opacity = "0";
  _rootEl.parentElement?.appendChild(el);
  _rootEl.parentElement;

  const root = createRoot(el);
  root.render(<App />);

  let i = 100;
  while (i-- > 0) {
    const html = document.getElementById("root")!.innerHTML;
    if (html && html !== "") {
      const css = mineFromCaches(
        { key: "css" } as unknown as EmotionCache,
        html,
      );
      //      root.unmount();
      console.log({ html, css });
      return { html, css };
    }

    await wait(10);
  }

  return { html: "", css: "" };
};

function mineFromCaches(cache: EmotionCache, html: string) {
  // const key = "css";
  const key = cache.key || "css";
  try {
    return Array.from(document.querySelectorAll(`style[data-styled-jsx`)).map(
      (x) => x.textContent,
    )
      + Array.from(
        document.querySelectorAll(`style[data-emotion="${key}"]`),
      ).map((x) => x.textContent).join(
        "\n",
      );
  } catch {
    // const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
    return Array.from(document.styleSheets).map((x) => {
      try {
        return x.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    }).filter((x) =>
      x && x.selectorText && x.selectorText.indexOf(key) !== -1
      && html.indexOf(x.selectorText.slice(4, 11)) !== -1
    )
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}

let i = 0;
let controller = new AbortController();
const mod: {
  [i: number]: {
    retry: number;
    rootEl: HTMLDivElement;
    root: Root;
    i: number;
    signal: AbortSignal;
  };
} = {};
BC.onmessage = async ({ data }) => {
  if (data.transpiled && !data.html && data.code && data.type === "prerender") {
    if (i === data.i || data.html) return;
    i = data.i;

    controller.abort();
    controller = new AbortController();

    const el = document.createElement("div");
    el.style.opacity = "0";
    el.style.height = "100%";
    document.body.appendChild(el);

    const myRoot = createRoot(el);
    const App = await appFactory(data.transpiled);
    const appId = md5(data.transpiled);
    myRoot.render(<App appId={appId} />);

    console.log("rerender", data.i);

    // //(await import(
    //   createJsBlob(importMapReplace(data.transpiled, origin, origin))
    // )).default;
    // const rootEl = document.createElement("div");
    // rootEl.style.height = "100%";

    // const root = createRoot(rootEl);
    const m = mod[i] || {
      i,
      signal: controller.signal,
      root: myRoot,
      rootEl: el,
      retry: 100,
    };
    // const r = createRoot(newRoot);

    if (m.signal.aborted) {
      m.root.unmount();
      m.rootEl.remove();
    }

    // check(myMod);

    // async function check(m: typeof mod[0]) {
    // ReactDOM.flushSync(() => {

    while (m.retry--) {
      if (m.signal.aborted) {
        m.root.unmount();
        m.rootEl.remove();
        // root.unmount();
        return;
      }
      const html = m.rootEl.innerHTML;
      if (html) {
        const css = mineFromCaches(eCaches[appId], html);
        // root.unmount();
        console.log({ html, css, i: m.i });
        // document.getElementById("root")?.appendChild(newRoot);
        // root.unmount();
        // root = r;
        root.unmount();

        // root = m.root;

        m.rootEl.style.opacity = "1";
        m.rootEl.style.height = "100%";
        //        rootEl = m.rootEl;
        document.getElementById("root")?.remove();

        m.rootEl.id = "root";

        BC.postMessage({
          html,
          css,
          i: data.i,
          type: "prerender",
          code: data.code,
        });
        controller.abort();
        // root.unmount();
        return;
      }
      await wait(1);
    }
    return;
  }
};
