// import { CacheProvider } from '@emotion/react'
import React from "react";
import { renderToString } from "react-dom/server";
import { extractCritical } from "@emotion/server";
// import {css} from "@emotion/css"
export function getHtmlAndCss(App) {
  const { html, css, ids } = extractCritical(
    renderToString(React.createElement(App, null)),
  );
  return { html, css: `<style data-emotion="${ids.join(" ")}">${css}</style>` };
}
