import {
  appFactory,
  saveCode
} from "./chunk-chunk-3HJGVWHA.mjs";
import {
  hashCode,
  mST,
  patchSync
} from "./chunk-chunk-ONQROWRT.mjs";
import "./chunk-chunk-DJ7PZ2MA.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-VZCGMROI.mjs";
import {
  init_react_preact,
  render
} from "./chunk-chunk-Q62VCUD7.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-chunk-JAPAFYDL.mjs";

// js/runner.tsx
init_define_process();

// js/renderToString.tsx
init_define_process();
init_react_preact();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var renderFromString = (App, codeSpace) => {
  const temp = document.createElement("div");
  render((0, import_jsx_runtime.jsx)(App, {}), temp);
  const html = temp.innerHTML;
  setTimeout(() => {
    const hash = hashCode();
    setTimeout(() => {
      if (hash !== hashCode())
        return;
      const { css, html: html2 } = mST();
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
    for (let i in document.styleSheets) {
      const styleSheet = document.styleSheets[i];
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
var mod = {
  i: 0,
  esbuildInit: async () => await (await await import("./chunk-esbuildEsm-76NKXHCU.mjs")).init()
};
async function runner({ code, counter, codeSpace }) {
  const esbuild = await mod.esbuildInit();
  mod.i = counter;
  if (code === mST().code)
    return;
  if (mod.i > counter)
    return;
  try {
    const transpiled = await esbuild.transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021"
    });
    if (transpiled.code === mST().transpiled)
      return;
    let restartError = false;
    if (transpiled.code.length > 0) {
      try {
        const App = await appFactory(transpiled.code);
        const { html, css } = renderFromString(App, codeSpace);
        await saveCode({
          code,
          transpiled: transpiled.code,
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
