import {
  ab2str
} from "./chunk-chunk-3LGVA7LC.mjs";
import {
  md5
} from "./chunk-chunk-I52D4BQZ.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/hydrate.tsx
init_define_process();
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { jsx, jsxs } from "@emotion/react/jsx-runtime";
var r;
var root;
var lastI;
var hydrate = /* @__PURE__ */ __name(async (codeSpace, sess) => {
  if (sess?.i && sess.i === lastI)
    return;
  if (r) {
    r.unmount();
    r = null;
  }
  let App;
  const rt = document.getElementById("root");
  if (sess && sess.i && sess.html && sess.transpiled) {
    const { i: i2, css, html, transpiled } = sess;
    rt?.setAttribute("data-i", String(i2));
    rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
      `css`
    );
  }
  const i = rt?.getAttribute("data-i") || 1;
  lastI = +i;
  App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
  root = document.getElementById(
    codeSpace + "-css"
  );
  if (!root) {
    document.getElementById("root").innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
    root = document.getElementById(
      codeSpace + "-css"
    );
  }
  if (!r) {
    r = createRoot(root);
    r.render(
      /* @__PURE__ */ jsx(
        ErrorBoundary,
        {
          fallbackRender: ({ error }) => /* @__PURE__ */ jsxs("div", { role: "alert", children: [
            /* @__PURE__ */ jsx("div", { children: "Oh, no!!!" }),
            /* @__PURE__ */ jsx("pre", { children: error.message })
          ] }),
          children: /* @__PURE__ */ jsx(App, {})
        }
      )
    );
  }
}, "hydrate");
export {
  ab2str,
  hydrate,
  md5
};
