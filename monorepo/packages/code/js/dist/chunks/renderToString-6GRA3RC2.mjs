import {
  emotion_cache_browser_esm_default
} from "./chunk-AQGKM5PG.mjs";
import {
  dist_default
} from "./chunk-EORBAGMS.mjs";
import "./chunk-KWFWVMVK.mjs";
import "./chunk-BZTAI3VG.mjs";

// js/renderToString.tsx
import { CacheProvider } from "https://spike.land/dist/emotion.mjs";
import React from "https://spike.land/dist/react.mjs";
var getHtmlAndCss = (MyComponent) => {
  const key = "css";
  const cache = emotion_cache_browser_esm_default({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = dist_default(React.createElement(CacheProvider, {
    value: cache
  }, React.createElement(MyComponent, null)));
  return {
    html: markup,
    css: cssText
  };
};
export {
  getHtmlAndCss
};
