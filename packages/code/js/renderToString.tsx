import { md5 } from "md5";
import { appFactory } from "starter";

import type { EmotionCache } from "@emotion/cache";
import { createRoot } from "react-dom/client";
import { wait } from "./wait";

const mod = {
  md5Hash: "",
  wait: 1,
  res: null as null | HTMLDivElement,
  codeSpace: "",
  waitForDiv: async (md5Hash: string) => {
    if (mod.md5Hash !== md5Hash) return "";

    // if (!mod.res?.innerHTML) await waitForFlush();

    if (!mod.res?.innerHTML) await waitForAnimation();
    mod.wait *= 2;
    await wait(mod.wait);

    if (!mod.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }

    const html = mod.res?.innerHTML;

    if (html?.includes(md5Hash)) return html;

    mod.wait = mod.wait * 2;
    return await (mod.waitForDiv as unknown as (
      md5Hash: string,
    ) => Promise<string>)(md5Hash);
  },
  setApp: (md5Hash: string) => {
    const rootDiv = document.createElement("div");
    // rootDiv.style.visibility = "hidden";
    // rootDiv.style.position = "absolute";
    // document.body.appendChild(rootDiv);
    const root = createRoot(rootDiv);
    const App = apps[md5Hash];

    mod.md5Hash = md5Hash;
    mod.res = rootDiv;

    root.render(<App appId={`${mod.codeSpace}-${md5Hash}`} />);

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
  const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
  return Array.from(document.styleSheets).map((x) => x.cssRules[0] as CSSPageRule).filter((x) =>
    x && keys.includes(x.selectorText)
  ).map((x) => x.cssText)
    .join("\n");
}

const waitForAnimation = () => {
  let animationFrame: (_v: unknown) => void;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
};
