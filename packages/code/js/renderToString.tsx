import type { FC } from "react";
// import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory } from "starter";

import { createRoot } from "react-dom/client";

// import { flushSync } from "react-dom";
// import createEmotionServer from "@emotion/server/dist/emotion-server.browser.esm.js";
import { useEffect, useRef } from "react";
import type { EmotionCache } from "@emotion/utils";

const mod = {
  md5Hash: "",
  wait: 1,
  res: null as null | HTMLDivElement,
  codeSpace: "",
  waitForDiv: async () => {
    const md5Hash = mod.md5Hash;
    // if (!mod.res?.innerHTML) await waitForFlush();
    if (!mod.res?.innerHTML) await waitForAnimation();

    if (!mod.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }

    if (mod.res?.innerHTML.includes(md5Hash)) return mod.res.innerHTML;

    mod.wait = mod.wait * 2;
    return await (mod.waitForDiv as unknown as () => Promise<string>)();
  },
  setHash: null as (null | ((_hash: string) => void)),
  setApp: (md5hash: string) => {
    const rootDiv = document.createElement("div");
    rootDiv.style.visibility = "hidden";
    rootDiv.style.position = "absolute";
    document.body.appendChild(rootDiv);

    const root = createRoot(rootDiv);
    root.render(
      <Helper md5Hash={md5hash} />,
    );
    return () => {
      root.unmount;
      document.body.removeChild(rootDiv);
      rootDiv.remove();
      mod.setHash = null;
    };
  },
};

export const render = async (transpiled: string, codeSpace: string) => {
  mod.codeSpace = codeSpace;
  const md5hash = md5(transpiled).slice(0, 8);
  if (!apps[md5hash]) await appFactory(transpiled);

  mod.wait = 1;

  const cleanup = mod.setApp(
    md5hash,
  );

  try {
    const html = await mod.waitForDiv();

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
  return Array.from(document.styleSheets).map((x) =>
    x.cssRules[0] as CSSPageRule
  ).filter((x) => x && keys.includes(x.selectorText)).map((x) => x.cssText)
    .join("\n");
}

const Helper: FC<{ md5Hash: string }> = ({ md5Hash }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref?.current) mod.res = ref.current;
  }, [ref?.current]);

  const App = apps[md5Hash];

  return (
    <div ref={ref}>
      <App key={md5Hash} appId={`${mod.codeSpace}-${md5Hash}`} />
    </div>
  );
};

const waitForAnimation = () => {
  let animationFrame: (_v: unknown) => void;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
};
