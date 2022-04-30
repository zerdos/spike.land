/** @jsx jsx */
import { CacheProvider, jsx } from "@emotion/react";
import createCache from "@emotion/cache";

import { ReactNode, renderToString } from "react";

export const getHtmlAndCss = (MyComponent: () => ReactNode) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule: string) => {
    cssText += rule;
  };

  const markup = renderToString(
    <CacheProvider value={cache}>
      <MyComponent />
    </CacheProvider>,
  );

  return {
    html: markup,
    css: cssText,
  };
};
