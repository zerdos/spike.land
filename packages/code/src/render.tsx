import type { FC } from "react";
// import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import { importMapReplace } from "./importMapReplace";
import { createJsBlob } from "./starter";
import { wait } from "./wait";

export const render = async (rootEl: HTMLDivElement, App: FC, codeSpace: string) => {
  const root = createRoot(rootEl);
  root.render(<App />);

  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
  BC.onmessage = async ({ data }) => {
    if (data.transpiled) {
      const App: FC<{}> = (await import(
        createJsBlob(importMapReplace(data.transpiled, origin, origin))
      )).default;
      root.render(<App />);
      requestAnimationFrame(async () => {
        let i = 100;
        while (i-- > 0) {
          const html = document.getElementById("root")!.innerHTML;
          if (html && html !== "") {
            const css = mineFromCaches();
            root.unmount();
            console.log({ html, css, i: data.i });
            return BC.postMessage({ html, css });
          }

          await wait(10);
        }

        return { html: "", css: "" };
      });
    }
    prerender(new Function(data.transpiled)()).then(res => window.parent.postMessage(res));
  };
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
      const css = mineFromCaches();
      root.unmount();
      console.log({ html, css });
      return { html, css };
    }

    await wait(10);
  }

  return { html: "", css: "" };
};

function mineFromCaches() {
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
    }).filter((x) => x && x.selectorText && x.selectorText.indexOf(key) !== -1)
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}
