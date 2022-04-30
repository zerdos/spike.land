import {
  dist_default,
  init_preact,
  init_react_shim
} from "./chunk-D7XGJMVH.mjs";

// js/renderToString.tsx
init_react_shim();
init_preact();
import { CacheProvider } from "https://spike.land/dist/emotion.mjs";
import createCache from "https://spike.land/dist/emotion.mjs";
var getHtmlAndCss = (MyComponent) => {
  const key = "css";
  const cache = createCache({ key });
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
