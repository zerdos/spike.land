import React from "react";
// import { CacheProvider } from '@emotion/react'
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
// import {css} from "@emotion/css"
export function getHtmlAndCss(App) {
  // const { html, css, ids } = extractCritical(
  //   renderToString(<App />),
  // );
  const html = renderStylesToString(renderToString(<App />));
  console.log({ html });
  return { html };
}
