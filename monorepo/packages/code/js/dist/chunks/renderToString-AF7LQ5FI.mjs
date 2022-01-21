import "./chunk-4IQSHU34.mjs";

// js/renderToString.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";
import createCache from "https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";
import { CacheProvider } from "https://unpkg.com/@spike.land/esm@0.6.62/dist/emotion-react.mjs";
import { renderToString } from "https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-fe905f152-20220107/server.browser.js";
var getHtmlAndCss = (MyComponent) => {
  const key = "foo";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = renderToString(/* @__PURE__ */ jsx(CacheProvider, {
    value: cache
  }, /* @__PURE__ */ jsx(MyComponent, null)));
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${cssText}</style>
    </head>
    <body>
        <div>${markup}</div>
    </body>
  </html>
`;
  return {
    html: markup,
    css: cssText
  };
};
export {
  getHtmlAndCss
};
//# sourceMappingURL=renderToString-AF7LQ5FI.mjs.map
