import type { FC } from "react";
// import { unmountComponentAtNode } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import { importMapReplace } from "./importMapReplace";
import { createJsBlob } from "./starter";
import { wait } from "./wait";

const codeSpace = location.pathname.slice(1).split("/")[1];

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

// let root: Root;
// let rootEl: HTMLDivElement;
let i = 0;
let controller = new AbortController();
const mod: { [i: number]: { retry: number; rootEl: HTMLDivElement; root: Root; i: number; signal: AbortSignal } } = {};
BC.onmessage = async ({ data }) => {
  if (data.transpiled) {
    if (i === data.i) return;
    i = data.i;

    controller.abort();
    controller = new AbortController();

    console.log("rerender", data.i);
    const App: FC<{}> = (await import(
      createJsBlob(importMapReplace(data.transpiled, origin, origin))
    )).default;
    const rootEl = document.createElement("div");
    rootEl.style.height = "100%";

    const root = createRoot(rootEl);
    const myMod = mod[i] = { i, signal: controller.signal, root, rootEl, retry: 100 };
    // const r = createRoot(newRoot);

    if (myMod.signal.aborted) return;
    root.render(<App />);
    check(myMod);

    function check(m: typeof mod[0]) {
      requestAnimationFrame((_) => {
        if (myMod.signal.aborted) {
          root.unmount();
          return;
        }
        const html = m.rootEl.innerHTML;
        if (html) {
          const css = mineFromCaches(html);
          // root.unmount();
          console.log({ html, css, i: m.i });
          // document.getElementById("root")?.appendChild(newRoot);
          // root.unmount();
          // root = r;
          BC.postMessage({ html, css, i: data.i });
          root.unmount();
          return;
        }
        if (m.retry-- > 0) check(m);
        else {
          root.unmount();
          return { html: "", css: "" };
        }
      });
    }
  }
};

export const render = async (_rootEl: HTMLDivElement, App: FC, codeSpace: string) => {
  rootEl = _rootEl;
  root = createRoot(rootEl);
  root.render(<App />);

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
      const css = mineFromCaches(html);
      root.unmount();
      console.log({ html, css });
      return { html, css };
    }

    await wait(10);
  }

  return { html: "", css: "" };
};

function mineFromCaches(html: string) {
  const key = "css";
  // const key = cache.key;
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
      x && x.selectorText && x.selectorText.indexOf(key) !== -1 && html.indexOf(x.selectorText.slice(4, 11)) !== -1
    )
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}
