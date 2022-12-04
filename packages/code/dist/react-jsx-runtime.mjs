import {
  run
} from "./chunk-chunk-GVBT7Y67.mjs";
import "./chunk-chunk-RQTYXR7S.mjs";
import "./chunk-chunk-ZZWIKWD4.mjs";
import "./chunk-chunk-NBK6NTLB.mjs";
import "./chunk-chunk-TIL35SAU.mjs";
import "./chunk-chunk-RNJNNLQS.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NFYMKIWC.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-OH444ZSQ.mjs";
import "./chunk-chunk-ZL6L5B7C.mjs";
import "./chunk-chunk-DFJPXHKK.mjs";
import {
  require_react_error_boundary_umd
} from "./chunk-chunk-VSR6Z5WK.mjs";
import {
  require_client
} from "./chunk-chunk-FFMS35Y7.mjs";
import {
  require_react_dom
} from "./chunk-chunk-M3XF32XQ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/react-jsx-runtime.tsx
init_define_process();
var import_react_dom = __toESM(require_react_dom(), 1);

// js/hydrate.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var hydrate = /* @__PURE__ */ __name(async (codeSpace2, i) => {
  const App = (await import(`${location.origin}/live/${codeSpace2}/index.js/${i}`)).default;
  (0, import_client.hydrateRoot)(
    document.getElementById("root"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_error_boundary.ErrorBoundary,
      {
        fallbackRender: ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "alert", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Oh n o" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: error.message })
        ] }),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {})
      }
    ) })
  );
}, "hydrate");

// js/load.ts
init_define_process();
var load_default = /* @__PURE__ */ __name(async () => {
  const codeSpace2 = location.pathname.slice(1).split("/")[1];
  const {
    mST,
    address
  } = await import(`${location.origin}/live/${codeSpace2}/mST.mjs`);
  run({
    mST,
    dry: false,
    codeSpace: codeSpace2,
    address
  });
}, "default");

// js/react-jsx-runtime.tsx
var paths = location.pathname.split("/");
var codeSpace = paths[2];
var rootEl = document.getElementById(`root`);
if (location.pathname !== `/live/${codeSpace})`) {
  const bc = new BroadcastChannel(location.origin);
  hydrate(codeSpace, 1);
  bc.onmessage = async (event) => {
    if (event.data.codeSpace === codeSpace && location.pathname.includes("dehydrated")) {
      const { html, css, i } = event.data.sess;
      rootEl.setAttribute("data-i", i);
      (0, import_react_dom.unmountComponentAtNode)(document.getElementById("root"));
      rootEl.innerHTML = `<style>${css}</style>${html}`;
      await hydrate(codeSpace, event.data.sess.i);
    }
  };
} else {
  load_default();
}
