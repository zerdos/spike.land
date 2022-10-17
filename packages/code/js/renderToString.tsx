import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory, eCaches } from "starter";

import { createRoot,  } from "react-dom/client";
import {flushSync} from "react-dom"
import isCallable from "is-callable";

const rootDiv = document.createElement("div");
rootDiv.style.visibility = "hidden";
rootDiv.style.position = "absolute";
document.body.appendChild(rootDiv);

export const render = async (transpiled: string, codeSpace: string) => {
  const md5hash = md5(transpiled).slice(0, 8);
  const App = await appFactory(transpiled);
  if (isCallable(App)) {
    
    const root = createRoot(rootDiv);
    root.render(
      <App appId={`${codeSpace}-${md5hash}`} />
    );
    let flushed: (_v: unknown)=>void;
    const rendered = new Promise((resolve)=>flushed = resolve);
    flushSync(()=>flushed(true));
    await rendered;
    const html = rootDiv.innerHTML;
    let css = mineFromCaches(md5hash, html);
    const globalCss = document.querySelector("style[data-emotion=z-global]")
      ?.innerHTML;

    root.unmount()

    if (css && globalCss) css=css + globalCss 

    return {
      html,
      css,
    };
  } else return { html: null, css: null };
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


  if (css && globalCss) css=css + globalCss 

  return {
    html,
    css,
  };
};

function mineFromCaches(md5Hash: string, html: string) {
  if (!(eCaches[md5Hash]?.inserted)) return "";
  const keys = Object.keys(eCaches[md5Hash].inserted);
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
