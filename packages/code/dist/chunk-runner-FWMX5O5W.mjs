import {
  appFactory,
  saveCode
} from "./chunk-chunk-H4PDKQWX.mjs";
import {
  hashCode,
  mST,
  patchSync
} from "./chunk-chunk-CZFPQHSF.mjs";
import "./chunk-chunk-QAEKXW25.mjs";
import {
  init_define_process
} from "./chunk-chunk-532LUWKD.mjs";

// js/runner.tsx
init_define_process();

// js/renderToString.tsx
init_define_process();
import { render } from "react-dom";
import { jsx } from "@emotion/react/jsx-runtime";
var renderFromString = (App) => {
  const temp = document.createElement("div");
  render(/* @__PURE__ */ jsx(App, {}), temp);
  const html = temp.innerHTML;
  setTimeout(() => {
    const hash = hashCode();
    setTimeout(() => {
      if (hash !== hashCode())
        return;
      const { css, html: html2 } = mST();
      const codeSpace = globalThis["codeSpace"];
      const temp2 = document.getElementById("root-" + codeSpace);
      const htmlHtml = temp2.innerHTML;
      const newCss = extractCritical(htmlHtml);
      if (css !== newCss || html2 !== htmlHtml) {
        patchSync({
          ...mST(),
          html: htmlHtml,
          css: newCss
        });
      }
    }, 50);
  }, 100);
  return {
    html,
    css: extractCritical(html)
  };
};
var extractCritical = (html) => {
  try {
    const rules = {};
    for (let i2 in document.styleSheets) {
      const styleSheet = document.styleSheets[i2];
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 11);
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              rules[selector] = rule.cssText;
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

// js/runner.tsx
var transform = null;
var i = 0;
async function runner({ code, counter }) {
  if (i >= counter) {
    setTimeout(() => i = mST().i, 100);
    return;
  }
  i = counter;
  const { init } = await import("./chunk-esbuildEsm-WKQAU7C6.mjs");
  transform = transform || await init();
  if (code === mST().code)
    return;
  if (i > counter)
    return;
  try {
    const transpiled = await transform(code);
    if (transpiled === mST().transpiled)
      return;
    let restartError = false;
    if (transpiled.length > 0) {
      try {
        const App = await appFactory();
        const { html, css } = renderFromString(App);
        await saveCode({
          code,
          transpiled,
          i: counter,
          html,
          css
        });
        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
        return;
      }
    }
  } catch (error) {
    console.error({ error });
  }
}
export {
  runner
};
//# sourceMappingURL=chunk-runner-FWMX5O5W.mjs.map
