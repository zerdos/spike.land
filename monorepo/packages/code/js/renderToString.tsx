/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";

import { appFactory } from "./starter";
import { prettierCss, prettierHtml } from "./prettierEsm";

import { renderToString } from "react-dom/server";

export const renderFromString = async (transpiled: string) => {
  console.log("render to string");
  const MyApp = await appFactory(transpiled);

  const { html, css } = getHtmlAndCss(MyApp);

  // await appFactory(transpiled, html);

  return {
    html: prettierHtml(html),
    css: prettierCss(css),
  };
};

export const getHtmlAndCss = (MyApp: FC) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";

  cache.sheet.insert = (rule: string) => {
    cssText += rule;
  };

  // const target = document.createElement("div");
  // target.style.height = "100%";

  const markup = renderToString(
    <CacheProvider value={cache}>
      <MyApp />
    </CacheProvider>,
    // target,
  );

  return {
    html: markup,
    css: cssText,
  };
};
