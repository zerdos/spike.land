// import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory, apps, eCaches } from "starter";

import { createRoot } from "react-dom/client";

// import { flushSync } from "react-dom";
// import createEmotionServer from "@emotion/server/dist/emotion-server.browser.esm.js";
import { useEffect, useRef, useState } from "react";
import { wait } from "wait.mjs";

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

  //  const html = mod.res.innerHTML;``
  const css = mineFromCaches(eCaches[md5hash]);
  // const extractCritical = createExtractCritical(eCaches[md5hash]);
  // let critical = extractCritical(html);
  // let css3 = extractCritical22(html);

  // console.log(css, critical, css3);

  const globalCss = document.querySelector("style[data-emotion=z-global]")
    ?.innerHTML;
  // if (!css) css = extractCritical22(html);
  //    root.unmount()

  return {
    html,
    css: globalCss + " " + css,
  };
};
// };
// export const renderFromString = (
//   // Code: string,
//   // App: FunctionComponent
//   codeSpace: string,
//   hash: number,
// ) => {
//   const md5hash = md5(mST().transpiled).slice(0, 8);
//   if (hash !== hashCode()) {
//     return { html: null, css: null };
//   }

//   const html = document.getElementById(`${codeSpace}-${md5hash}`)?.innerHTML!;

//   let css = html ? extractCritical22(html) : "";

//   const globalCss = document.querySelector("style[data-emotion=z-global]")
//     ?.innerHTML;

//   if (css && globalCss) css = css + globalCss;

//   return {
//     html,
//     css,
//   };
//};

function mineFromCaches(cache) {
  const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
  return Array.from(document.styleSheets).map((x) =>
    x.cssRules[0] as CSSPageRule
  ).filter((x) => x && keys.includes(x.selectorText)).map((x) => x.cssText)
    .join("\n");
}

// const extractCritical22 = (html: string) => {
//   try {
//     const rules: Record<string, string> = {};
//     for (const i in document.styleSheets) {
//       let yesFromNow = false;
//       const styleSheet = document.styleSheets[i];
//       // For (let r in styleSheet.cssRules) {
//       if (styleSheet?.cssRules) {
//         for (const rule of Array.from(styleSheet.cssRules)) {
//           if (
//             yesFromNow ||
//             rule && rule.cssText && rule.cssText.startsWith(".z-")
//           ) {
//             const selector = rule.cssText.slice(1, 9);
//             const selectorText = selector; // Rule.selectorText ||
//             //  selector;
//             if (
//               !rules[selector] && html.includes(selector) &&
//               !rule.cssText.slice(10).includes(".z-")
//             ) {
//               yesFromNow = true;
//               rules[selectorText] = rule.cssText;
//             }
//           }
//         }
//       }
//     }

//     return Object.keys(rules).map((r) => rules[r]).join(" ");
//   } catch {
//     console.error("no css");
//     return "";
//   }
// };

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
// const waitForFlush = () => {
//   let flushed: (_v: unknown) => void;
//   console.log("wait for flush");
//   const rendered = new Promise((resolve) => flushed = resolve);
//   flushSync(() => flushed(true));
//   rendered;
// };

// var createExtractCritical = function createExtractCritical(cache) {
//   return function (html) {
//     // parse out ids from html
//     // reconstruct css/rules/cache to pass
//     var RGX = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", "gm");
//     var o = {
//       html: html,
//       ids: [],
//       css: "",
//     };
//     var match;
//     var ids = {};

//     while ((match = RGX.exec(html)) !== null) {
//       // $FlowFixMe
//       if (ids[match[1]] === undefined) {
//         // $FlowFixMe
//         ids[match[1]] = true;
//       }
//     }

//     o.ids = Object.keys(cache.inserted).filter(function (id) {
//       if (
//         (ids[id] !== undefined ||
//           cache.registered[cache.key + "-" + id] === undefined) &&
//         cache.inserted[id] !== true
//       ) {
//         o.css += cache.inserted[id];
//         return true;
//       }
//     });
//     return o;
//   };
// };
