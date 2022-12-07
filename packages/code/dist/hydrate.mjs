import {
  jsx,
  jsxs
} from "./chunk-chunk-T4T4TGH4.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-YJ6EJ55D.mjs";
import "./chunk-chunk-URQXE74X.mjs";
import {
  md5
} from "./chunk-chunk-I52D4BQZ.mjs";
import {
  require_react_error_boundary_umd
} from "./chunk-chunk-VSR6Z5WK.mjs";
import {
  require_client
} from "./chunk-chunk-OIMXIXUK.mjs";
import "./chunk-chunk-DRFYPBHK.mjs";
import "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/hydrate.tsx
init_define_process();
var import_client = __toESM(require_client(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
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
  if (sess) {
    const { i: i2, css, html, transpiled } = sess;
    rt?.setAttribute("data-i", String(i2));
    rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(`css`);
  }
  const i = rt?.getAttribute("data-i") || 1;
  lastI = +i;
  App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
  root = document.getElementById(codeSpace + "-css");
  if (!root) {
    document.getElementById("root").innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
    root = document.getElementById(codeSpace + "-css");
  }
  if (!r) {
    r = (0, import_client.createRoot)(root);
    r.render(
      /* @__PURE__ */ jsx(
        import_react_error_boundary.ErrorBoundary,
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
  hydrate,
  md5
};
