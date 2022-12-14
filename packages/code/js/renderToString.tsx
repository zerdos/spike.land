import { md5 } from "md5";
import { appFactory } from "starter";

import type { EmotionCache } from "@emotion/cache";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { renderToString } from "react-dom/server";
import { wait } from "./wait";

const mod = {
  md5hash: "",
  wait: 1,
  res: null as null | HTMLDivElement,
  codeSpace: "",
  waitForDiv: async (md5hash: string) => {
    if (mod.md5hash !== md5hash) return "";
    if (mod.wait > 256) return "";

    // if (!mod.res?.innerHTML) await waitForFlush();

    if (!mod.res?.innerHTML) await waitForAnimation();
    mod.wait *= 2;
    await wait(mod.wait);

    if (!mod.res?.innerHTML.includes(md5hash)) {
      await waitForAnimation();
    }

    const html = mod.res?.innerHTML;

    if (
      html?.includes(md5hash) && mod.res?.firstElementChild?.innerHTML !== ""
    ) return html;

    return await (mod.waitForDiv as unknown as (
      md5hash: string,
    ) => Promise<string>)(md5hash);
  },
  setApp: (md5hash: string) => {
    const rootDiv = document.createElement("div");
    rootDiv.style.visibility = "hidden";
    rootDiv.style.position = "absolute";
    // document.body.appendChild(rootDiv);
    const root = createRoot(rootDiv);
    const App = apps[md5hash];

    mod.md5hash = md5hash;
    mod.res = rootDiv;

    root.render(
      <StrictMode>
        <App appId={`${mod.codeSpace}-${md5hash}`} />
      </StrictMode>,
    );

    return () => {
      root.unmount();
      rootDiv.remove();
    };
  },
};

export const render = async (transpiled: string, codeSpace: string) => {
  mod.codeSpace = codeSpace;
  const md5hash = md5(transpiled);
  if (!apps[md5hash]) await appFactory(transpiled);

  mod.wait = 1;

  const cleanup = mod.setApp(
    md5hash,
  );

  try {
    const html = await mod.waitForDiv(md5hash);

    if (!html) return { html: null, css: null };

    const css = mineFromCaches(eCaches[md5hash]);

    const globalCss = document.querySelector(
      `style[data-emotion=${eCaches[md5hash].key}-global]`,
    )
      ?.innerHTML;

    return {
      html,
      css: globalCss ? globalCss + " " + css : css,
    };
  } finally {
    cleanup();
  }
};

function mineFromCaches(cache: EmotionCache) {
  const key = cache.key;
  try {
    return Array.from(
      document.querySelectorAll(`style[data-emotion="${cache.key}"]`),
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

const waitForAnimation = () => {
  let animationFrame: (_v: unknown) => void;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
};
