// js/renderToString.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
import createCache from "https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";
import { CacheProvider } from "https://unpkg.com/@spike.land/esm@0.4.33/dist/emotion-react.mjs";
import { renderToString } from "https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-f2a59df48-20211208/server.browser.js";
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
//# sourceMappingURL=renderToString.mjs.map
