import {
  dist_default,
  preact_default
} from "./chunk-E55CQFNI.mjs";
import "./chunk-KWFWVMVK.mjs";
import "./chunk-BZTAI3VG.mjs";

// js/renderToString.tsx
import { CacheProvider } from "https://spike.land/dist/emotion.mjs";
import createCache from "https://spike.land/dist/emotion.mjs";
var getHtmlAndCss = (MyComponent) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = dist_default(preact_default.createElement(CacheProvider, {
    value: cache
  }, preact_default.createElement(MyComponent, null)));
  return {
    html: markup,
    css: cssText
  };
};
export {
  getHtmlAndCss
};
