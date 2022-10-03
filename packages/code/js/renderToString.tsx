import { hashCode, mST } from "session";
import { md5 } from "md5";

// };
export const renderFromString = (
  // code: string,
  // App: FunctionComponent
  codeSpace: string,
  hash: number,
) => {
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode()) return { html: null, css: null };
  mST().transpiled;
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
    const rules: { [key: string]: string } = {};
    for (let i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      // for (let r in styleSheet.cssRules) {
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (
            yesFromNow ||
            rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-"
          ) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector; //rule.selectorText ||
            //  selector;
            if (
              !rules[selector] && html.includes(selector) &&
              !rule.cssText.slice(10).includes(".css-")
            ) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        });
      }
    }

    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch {
    console.error("no css");
    return "";
  }
};
