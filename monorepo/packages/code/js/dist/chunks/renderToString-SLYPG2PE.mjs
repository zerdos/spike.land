import {
  emotion_cache_browser_esm_default
} from "./chunk-AQGKM5PG.mjs";
import "./chunk-BZTAI3VG.mjs";

// js/renderToString.tsx
import { CacheProvider, jsx } from "https://spike.land/dist/emotion.mjs";
import { renderToString } from "https://spike.land/dist/react.mjs";
var getHtmlAndCss = (MyComponent) => {
  const key = "css";
  const cache = emotion_cache_browser_esm_default({ key });
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
