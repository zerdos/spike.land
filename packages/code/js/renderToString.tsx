import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory, apps, eCaches } from "starter";

import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { wait } from "wait";

const mod = {
  md5Hash: "",
  wait: 1,
  res: null as null | HTMLDivElement,
  codeSpace: "",
  waitForDiv: async () => {
    const md5Hash = mod.md5Hash;
    if (!mod.res?.innerHTML) await waitForFlush();
    if (!mod.res?.innerHTML) await waitForAnimation();

    if (!mod.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }

    if (!mod.res?.innerHTML.includes(md5Hash)) {
      console.log(`waiting ${mod.wait} for ${mod.md5Hash} `),
        await wait(mod.wait);
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
  },
};

export const render = async (transpiled: string, codeSpace: string) => {
  mod.codeSpace = codeSpace;
  const md5hash = md5(transpiled).slice(0, 8);
  if (!apps[md5hash]) await appFactory(transpiled);

  mod.wait = 1;

  if (!mod.setHash) {
    mod.setApp(
      md5hash,
    );
  } else {
    mod.setHash(md5hash);
  }

  const html = await mod.waitForDiv();

  if (!html) return { html: null, css: null };

  //  const html = mod.res.innerHTML;
  let css = mineFromCaches(md5hash, html);
  const globalCss = document.querySelector("style[data-emotion=z-global]")
    ?.innerHTML;
  if (!css) css = extractCritical22(html);
  //    root.unmount()

  if (css && globalCss) css = css + globalCss;

  return {
    html,
    css,
  };
};
// };
export const renderFromString = (
  // Code: string,
  // App: FunctionComponent
  codeSpace: string,
  hash: number,
) => {
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode()) {
    return { html: null, css: null };
  }

  const html = document.getElementById(`${codeSpace}-${md5hash}`)?.innerHTML!;

  let css = html ? extractCritical22(html) : "";
  const globalCss = document.querySelector("style[data-emotion=z-global]")
    ?.innerHTML;

  if (css && globalCss) css = css + globalCss;

  return {
    html,
    css,
  };
};

function mineFromCaches(md5Hash: string, html: string) {
  if (!(eCaches[md5Hash]?.inserted)) return "";
  const keys = Object.keys(eCaches[md5Hash].inserted);
  console.log(`css keys:`, { keys });
  return Array.from(document.styleSheets).map((x) => x.cssRules).filter((x) =>
    x[0] && x[0].cssText
  ).map((x) => x[0].cssText).filter((x) =>
    keys.find((k: string) => x.includes(k))
  ).filter((x) => html.includes(x.slice(0, 11))).join(" ");
}

const extractCritical22 = (html: string) => {
  try {
    const rules: Record<string, string> = {};
    for (const i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      // For (let r in styleSheet.cssRules) {
      if (styleSheet?.cssRules) {
        for (const rule of Array.from(styleSheet.cssRules)) {
          if (
            yesFromNow ||
            rule && rule.cssText && rule.cssText.startsWith(".z-")
          ) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector; // Rule.selectorText ||
            //  selector;
            if (
              !rules[selector] && html.includes(selector) &&
              !rule.cssText.slice(10).includes(".z-")
            ) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        }
      }
    }

    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch {
    console.error("no css");
    return "";
  }
};

const Helper: React.FC<{ md5Hash: string }> = ({ md5Hash }) => {
  const ref = useRef(null);
  const [hash, setHash] = useState(md5Hash);

  useEffect(() => {
    if (ref.current) mod.res = ref.current;
    mod.md5Hash = hash, mod.setHash = (hash: string) => setHash(hash);
  }, [ref, hash, setHash]);

  const App = apps[hash];

  return (
    <div ref={ref}>
      <App key={hash} appId={`${mod.codeSpace}-${hash}`} />
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
const waitForFlush = () => {
  let flushed: (_v: unknown) => void;
  console.log("wait for flush");
  const rendered = new Promise((resolve) => flushed = resolve);
  flushSync(() => flushed(true));
  rendered;
};
