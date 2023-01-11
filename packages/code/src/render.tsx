import "react";
import { EmotionCache } from "@emotion/cache";
import type { FC } from "react";
import ReactDOM from "react-dom";

import createCache from "./emotionCache";
// import { unmountComponentAtNode } from "react-dom";import { createRoot } from "react-dom/client";
import { CacheProvider, css } from "@emotion/react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { appFactory, md5 } from "./starter";
import { wait } from "./wait";

const codeSpace = location.pathname.slice(1).split("/")[1];

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

let root: Root;
let rootEl: HTMLDivElement;
globalThis.firstRender = globalThis.firstRender || {
  html: "",
  css: "",
  code: "",
};

export const render = async (
  _rootEl: HTMLDivElement,
  App: FC,
) => {
  console.log({ _rootEl, App });

  const cache = createCache({
    key: "css",
    speedy: false,
  });

  cache.compat = undefined;

  rootEl = _rootEl;
  root = createRoot(rootEl);
  root.render(
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>,
  );

  let i = 100;
  while (i-- > 0) {
    const html = rootEl.innerHTML;
    if (html && html !== "") {
      globalThis.firstRender.html = html;
      const css = mineFromCaches(
        cache,
        html,
      );
      // root.unmount();
      console.log({ html, css });

      globalThis.firstRender.css = css;

      return { html, css };
    }

    await wait(10);
  }

  return root;
};

export const prerender = async (App: FC) => {
  const rootEl = document.getElementById("root")!;
  const root = createRoot(rootEl);
  root.render(<App />);

  let i = 100;
  while (i-- > 0) {
    const html = document.getElementById("root")!.innerHTML;
    if (html && html !== "") {
      const css = mineFromCaches(
        { key: "css" } as unknown as EmotionCache,
        html,
      );
      root.unmount();
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
    return Array.from(
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
  if (data.transpiled && !data.html) {
    if (i === data.i || data.html) return;
    i = data.i;

    controller.abort();
    controller = new AbortController();

    console.log("rerender", data.i);
    const App = await appFactory(data.transpiled);
    const appId = md5(data.transpiled);

    // //(await import(
    //   createJsBlob(importMapReplace(data.transpiled, origin, origin))
    // )).default;
    // const rootEl = document.createElement("div");
    // rootEl.style.height = "100%";

    // const root = createRoot(rootEl);
    const myMod = mod[i] || {
      i,
      signal: controller.signal,
      root,
      rootEl,
      retry: 100,
    };
    // const r = createRoot(newRoot);

    if (myMod.signal.aborted) return;
    root.render(<App appId={appId} />);
    check(myMod);

    function check(m: typeof mod[0]) {
      ReactDOM.flushSync(() => {
        if (myMod.signal.aborted) {
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
          BC.postMessage({ html, css, i: data.i });
          controller.abort();
          // root.unmount();
          return;
        }
        m.retry = m.retry - 1;

        if (m.retry > 0) check(m);
        else {
          // root.unmount();
          return { html: "", css: "" };
        }
      });
    }
  }
};
