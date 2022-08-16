import {
  appFactory,
  saveCode
} from "./chunk-chunk-LFGAM7IK.mjs";
import {
  mST
} from "./chunk-chunk-FLKIQN67.mjs";
import "./chunk-chunk-TTBZSIRA.mjs";
import {
  jsx
} from "./chunk-chunk-IFMNHTES.mjs";
import {
  m
} from "./chunk-chunk-GNTXB2MA.mjs";
import "./chunk-chunk-ANDOMRU5.mjs";
import "./chunk-chunk-FHIMN3AG.mjs";
import {
  init_define_process
} from "./chunk-chunk-IUWUEL4A.mjs";

// js/runner.tsx
init_define_process();

// js/renderToString.tsx
init_define_process();
var renderFromString = (App) => {
  const html = m(jsx(App, {}));
  return {
    html,
    css: extractCritical(html)
  };
};
var extractCritical = (html) => {
  const rules = {};
  for (let i2 in document.styleSheets) {
    const styleSheet = document.styleSheets[i2];
    for (let r in styleSheet.cssRules) {
      const rule = styleSheet.cssRules[r];
      if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
        const selector = rule.cssText.slice(1, 11);
        if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
          rules[selector] = rule.cssText;
        }
      }
    }
  }
  return Object.keys(rules).map((r) => rules[r]).join(" ");
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
  const { init } = await import("./chunk-esbuildEsm-TGXOJ2H3.mjs");
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
        const App = await appFactory(transpiled);
        const { html, css } = renderFromString(App);
        if (i > counter)
          return;
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
