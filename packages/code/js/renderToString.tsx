/** @jsx jsx */
import { jsx } from "@emotion/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { renderToStaticMarkup } from "react-dom/server";

export const getHtmlAndCss = (MyComponent: () => JSX.Element) => {
  const key = "foo";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };

  const markup = renderToStaticMarkup(
    <CacheProvider value={cache}>
      <MyComponent />
    </CacheProvider>,
  );

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
    css: cssText,
  };
};
