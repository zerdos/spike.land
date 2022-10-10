import { hashCode, mST } from "session";
import { md5 } from "md5";
import { appFactory } from "starter";
import { renderToString } from "react-dom/server";

import isCallable from "is-callable";

export const render = async (transpiled: string, codeSpace: string) => {
  const hash = md5(transpiled).slice(0, 8);
  const App = await appFactory(transpiled);
  if (isCallable(App)) {
    return renderToString(
      <div
        style={{
          height: "100%",
        }}
        id={`${codeSpace}-${hash}`}
      >
        <App />
      </div>,
    );
  } else return null;
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

  const html = document.getElementById(`${codeSpace}-${md5hash}`)
    ?.innerHTML!;

  const css = html ? extractCritical22(html) : "";

  return {
    html: `<div id="${codeSpace}-${md5hash}" style="height:100%">${html}</div>`,
    css,
  };
};

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
            rule && rule.cssText && rule.cssText.startsWith(".css-")
          ) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector; // Rule.selectorText ||
            //  selector;
            if (
              !rules[selector] && html.includes(selector) &&
              !rule.cssText.slice(10).includes(".css-")
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
