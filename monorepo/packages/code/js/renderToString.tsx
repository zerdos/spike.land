/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";
import { renderToString } from "react-dom";

export const getHtmlAndCss = (MyComponent: FC) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule: string) => {
    cssText += rule;
  };

  const markup = renderToString(
    <CacheProvider value={cache}>
      <MyComponent></MyComponent>
    </CacheProvider>,
  );

  return {
    html: markup,
    css: cssText,
  };
};
