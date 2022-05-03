/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";
import { renderToString } from "react-dom";

export const renderFromString = async (transpiled: string) => {
  const App = await getApp(transpiled);
  return getHtmlAndCss(App);
};

export const getHtmlAndCss = (MyComponent: FC) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule: string) => {
    cssText += rule;
  };

  const markup = renderToString(
    <CacheProvider value={cache}>
      <App></App>
    </CacheProvider>,
  );

  return {
    html: markup,
    css: cssText,
  };
};

async function getApp(transpiled: string, mode = "window") {
  const codeToHydrate = mode === "window"
    ? transpiled.replace("body{", "#zbody{")
    : transpiled;

  const objectUrl = createJsBlob(
    codeToHydrate,
  );

  const App = (await import(objectUrl)).default;

  URL.revokeObjectURL(objectUrl);

  return App;

  /**
   * @param {BlobPart} code
   */
  function createJsBlob(code: string) {
    const blob = new Blob([code], { type: "application/javascript" });

    return URL.createObjectURL(blob);
  }
}
