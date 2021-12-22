/** @jsx jsx */
import { jsx } from "@emotion/react";
import type { FC } from "react";
// import { CacheProvider } from '@emotion/react'
import { renderToString } from "react-dom/server";
// import { renderStylesToString } from "@emotion/server";
// import {css} from "@emotion/css"
export function getHtmlAndCss(App: FC) {
  // const { html, css, ids } = extractCritical(
  //   renderToString(<App />),
  // );
  const html = renderToString(<App />);
  console.log({ html });
  return { html };
}
