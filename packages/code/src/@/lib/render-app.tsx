
/** importMapReplace */
import { jsx, jsxs } from "@emotion/react/jsx-runtime";
import createCache from "/@emotion/cache?bundle=true&external=react/jsx-runtime,react-dom/server,react-dom/client,@emotion/react,react,framer-motion,react-dom,recharts";
import { CacheProvider } from "@emotion/react";
import { debounce } from "/es-toolkit?bundle=true&external=react/jsx-runtime,react-dom/server,react-dom/client,@emotion/react,react,framer-motion,react-dom,recharts&exports=debounce";
import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AIBuildingOverlay } from "/@/components/app/ai-building-overlay.mjs";
import ErrorBoundary from "/@/components/app/error-boundary.mjs";
import { md5 } from "/@/lib/md5.mjs";
import { transpile } from "/@/lib/shared.mjs";
const createJsBlob = (code) => URL.createObjectURL(new Blob([code], { type: "application/javascript" }));
async function renderApp({ rootElement, codeSpace, transpiled, App, code }) {
  try {
    const rootEl = rootElement || document.getElementById("embed") || document.createElement("div");
    if (!document.body.contains(rootEl)) {
      document.body.appendChild(rootEl);
    }
    let AppToRender;
    if (App) {
      AppToRender = App;
    } else if (transpiled || code) {
      AppToRender = (await import(createJsBlob(transpiled || await transpile({ code, originToUse: location.origin })))).default;
    } else if (codeSpace) {
      const indexJs = `${location.origin}/live/${codeSpace}/index.js`;
      AppToRender = (await import(indexJs)).default;
    } else {
      AppToRender = () => /* @__PURE__ */ jsx("div", { children: "Mock App for Testing" });
    }
    const root = createRoot(rootEl);
    const cssCache = createCache({
      key: md5(transpiled || code || Math.random().toString()),
      speedy: true,
      container: rootEl.parentNode
    });
    const AppWithScreenSize = React.memo(function AppWithScreenSize2() {
      const [{ width, height }, setDimensions] = useState({ width: innerWidth, height: innerHeight });
      const debouncedSetDimensions = useCallback(
        debounce(
          (dim) => setDimensions(dim),
          100
        ),
        []
      );
      useEffect(() => {
        const handleResize = () => debouncedSetDimensions({ width: innerWidth, height: innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [debouncedSetDimensions]);
      return /* @__PURE__ */ jsx(AppToRender, { width, height });
    });
    root.render(
      /* @__PURE__ */ jsxs(CacheProvider, { value: cssCache, children: [
        /* @__PURE__ */ jsx(ErrorBoundary, { ...codeSpace ? { codeSpace } : {}, children: /* @__PURE__ */ jsx(AppWithScreenSize, {}) }),
        codeSpace && /* @__PURE__ */ jsx(AIBuildingOverlay, { codeSpace })
      ] })
    );
    const renderedApp = { rootElement: rootEl, rRoot: root, App, cssCache, cleanup: () => {
      root.unmount();
      if (cssCache.sheet) {
        cssCache.sheet.flush();
      }
      rootEl.remove();
    } };
    return renderedApp;
  } catch (error) {
    console.error("Error in renderApp:", error);
    return null;
  }
}
export {
  renderApp
};