/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";

import { appFactory, createJsBlob } from "./starter";
import { prettierCss, prettierHtml } from "./prettierEsm";

import { renderToString } from "react-dom/server";

export const renderFromString = async (transpiled: string) => {
  console.log("render to string");    
  const App = await getApp(transpiled);

  const { html, css } = getHtmlAndCss(App);

  await appFactory(transpiled, html);

  return {
    html: prettierHtml(html),
    css: prettierCss(css),
  };
};

export const getHtmlAndCss = (App: FC) => {
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
      <App />
    </CacheProvider>,
    // target,
  );

  return {
    html: markup,
    css: cssText,
  };
};

async function getApp(transpiled: string, mode = "window") {

  const objectUrl = createJsBlob(
    transpiled,
  );

  const App = window.importShim
    ? (await window.importShim(objectUrl)).default
    : (await import(objectUrl)).default;

  URL.revokeObjectURL(objectUrl);

  return App;

  /**
   * @param {BlobPart} code
   */
}

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
