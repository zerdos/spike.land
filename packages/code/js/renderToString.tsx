import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory } from "starter";
import { renderToString } from "react-dom/server";

import isCallable from "is-callable";

export const render = async (transpiled: string, codeSpace: string) => {
  const md5hash = md5(transpiled).slice(0, 8);
  const App = await appFactory(transpiled);
  if (isCallable(App)) {
    const html = renderToString(<App appId={`${codeSpace}-${md5hash}`} />);
    const css = mineFromCaches(md5hash, html);
    const globalCss = document.querySelector("style[data-emotion=z-global]")
      ?.innerHTML;

    return {
      html: `<style>${globalCss}</style>${html}`,
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

  const css = html ? extractCritical22(html) : "";
  const globalCss = document.querySelector("style[data-emotion=z-global]")
    ?.innerHTML;

  return {
    html: `<div id="${codeSpace}-${md5hash}" style="height:100%">
      ${(globalCss ? `<style>${globalCss}</style>` : ``) + html}</div>`,
    css,
  };
};

function mineFromCaches(md5Hash, html){
const keys = Object.keys(globalThis.eCaches[md5Hash].inserted);
return Array.from(document.styleSheets).map(x=>x.cssRules).filter(x=>x[0]&&x[0].cssText).map(x=>x[0].cssText).filter(x=>keys.find((k: string)=>x.includes(k))).filter(x=>html.includes(x.slice(0,11))).join(" ")
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
