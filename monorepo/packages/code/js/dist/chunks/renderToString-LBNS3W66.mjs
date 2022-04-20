import "./chunk-BZTAI3VG.mjs";

// js/renderToString.tsx
import { CacheProvider, jsx } from "https://spike.land/dist/emotion.mjs";
import { createCache } from "https://spike.land/dist/emotion.mjs";
import { renderToString } from "https://spike.land/dist/react.mjs";
var getHtmlAndCss = (MyComponent) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = renderToString(jsx(CacheProvider, {
    value: cache
  }, jsx(MyComponent, null)));
  return {
    html: markup,
    css: cssText
  };
};
export {
  getHtmlAndCss
};
