/** @jsx jsx */
import { CacheProvider, jsx } from "@emotion/react";
//@ts-ignore
import { createCache } from "@emotion/react";

//@ts-ignore
import { renderToString } from "react";

export const getHtmlAndCss = (MyComponent: () => JSX.Element) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };

  const markup = renderToString(
    <div>
      <CacheProvider value={cache}>
        <div>
          <MyComponent />
        </div>
      </CacheProvider>
    </div>,
  );

  return {
    html: markup,
    css: cssText,
  };
};
