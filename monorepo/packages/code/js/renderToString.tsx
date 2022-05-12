/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";
import { render } from "react-dom";

import { appFactory, createJsBlob } from "./starter";

export const renderFromString = async (transpiled: string) => {
  console.log("render to string");
  const App = await getApp(transpiled);

  const { html, css } = getHtmlAndCss(App);

  await appFactory(transpiled);

  return {
    html,
    css,
  };
};

export const getHtmlAndCss = (MyComponent: FC) => {
  const key = "css";
  const cache = createCache({ key });
  let cssText = "";

  cache.sheet.insert = (rule: string) => {
    cssText += rule;
  };

  const target = document.createElement("div");
  target.style.height = "100%";

  render(
    <CacheProvider value={cache}>
      <MyComponent />
    </CacheProvider>,
    target,
  );

  const markup = target.innerHTML;

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
