/** @jsxImportSource @emotion/react */

// import {CacheProvider } from "@emotion/react"

import { renderToString } from "react-dom/server";
import type { FC } from "react";

// const WithCache: FC<{children: ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>

export const renderFromString = (App: FC) => {
  // const myCache =  createCache({
  //   prepend: true,
  //   key: 'css',
  //   stylisPlugins: [
  //   ]
  // });

  const html = renderToString(<App />);

  return {
    html,
    css: extractCritical(html),
  };
};
const extractCritical = (html: string) => {
  const res = [];

  for (let i in document.styleSheets) {
    const styleSheet = document.styleSheets[i];
    for (let r in styleSheet.cssRules) {
      const rule = styleSheet.cssRules[r];
      if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
        const selector = rule.cssText.slice(1, 11);
        if (html.includes(selector) && !rule.cssText.slice(10).includes(".css-") ) res.push(rule.cssText);
      }
    }
  }
  return res.join(" ");
};
