import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NFYMKIWC.mjs";
import "./chunk-chunk-FJRKYGWZ.mjs";
import "./chunk-chunk-OH444ZSQ.mjs";
import "./chunk-chunk-ZL6L5B7C.mjs";
import {
  md5
} from "./chunk-chunk-I52D4BQZ.mjs";
import {
  require_react_error_boundary_umd
} from "./chunk-chunk-VSR6Z5WK.mjs";
import {
  require_client
} from "./chunk-chunk-FFMS35Y7.mjs";
import "./chunk-chunk-M3XF32XQ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// js/hydrate.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var hydrate = /* @__PURE__ */ __name(async (codeSpace, i) => {
  const App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
  (0, import_client.hydrateRoot)(
    document.getElementById(codeSpace + `-css`),
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
export {
  hydrate,
  md5
};
