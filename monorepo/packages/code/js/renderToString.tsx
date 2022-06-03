/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";
import { renderToString } from "react-dom/server";

import { appFactory, createJsBlob } from "./starter";
import { prettierCss, prettierHtml } from "./prettierEsm";

export const renderFromString = async (transpiled: string) => {
  console.log("render to string");
  const App = await getApp(transpiled);

  const { html, css } = getHtmlAndCss(App);

  const htmlWithCss =  prettierHtml(`<style>${css}</style><div id="zbody">${html}</div>`)

  await appFactory(transpiled, htmlWithCss);

  return {
    html: htmlWithCss, 
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
}

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
