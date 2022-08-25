import {
  appFactory,
  saveCode
} from "./chunk-chunk-NCH7SY5J.mjs";
import {
  hashCode,
  mST,
  patchSync
} from "./chunk-chunk-RMPTOUUW.mjs";
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
  render(jsx(App, {}), temp);
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

// js/toUmd.ts
init_define_process();
var toUmd = async (source) => {
  const esbuild = await (await import("./chunk-esbuildEsm-NUGIUG6Q.mjs")).init();
  const { code } = await esbuild.transform(
    source,
    {
      loader: "tsx",
      format: "iife",
      globalName: "myAppp",
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021"
    }
  );
  return code;
};

// js/runner.tsx
var mod = {
  i: 0,
  esbuildInit: async () => (await await import("./chunk-esbuildEsm-NUGIUG6Q.mjs")).init()
};
async function runner({ code, counter }) {
  const esbuild = await mod.esbuildInit();
  mod.i = counter;
  if (code === mST().code)
    return;
  if (mod.i > counter)
    return;
  try {
    const transpiled = await esbuild.transform(
      code,
      {
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
      }
    );
    const UMD = await toUmd(code);
    console.log({ UMD });
    if (transpiled.code === mST().transpiled)
      return;
    let restartError = false;
    if (transpiled.code.length > 0) {
      try {
        const App = await appFactory(transpiled.code);
        const { html, css } = renderFromString(App);
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
//# sourceMappingURL=chunk-runner-NNZ3PB7G.mjs.map
