/** @jsxImportSource @emotion/react */

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { FC } from "react";
import { renderToString } from "react-dom/server";

import { appFactory, createJsBlob } from "./starter";
import { prettierCss, prettierHtml } from "./prettierEsm";

import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'



export const getIframe = async (App: FC) => {

  var Buffer = require('buffer/').Buffer 

  const createEmotionServer =(await  import('@emotion/server/create-instance')).default;

const key = 'custom'
const cache = createCache({ key })
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

const html = renderToString(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
)

const chunks = extractCriticalToChunks(html)
const styles = constructStyleTagsFromChunks(chunks)

return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    ${styles}
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`;
}


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
