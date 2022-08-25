// import {CacheProvider } from "@emotion/react"

import { render } from "react-dom";
import type { FC } from "react";
import { hashCode, mST, patchSync } from "./session";

// const WithCache: FC<{children: ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>

export const renderFromString = (App: FC) => {
  // const myCache =  createCache({
  //   prepend: true,
  //   key: 'css',
  //   stylisPlugins: [
  //   ]
  // });

  const temp = document.createElement("div");
  render(<App />, temp);
  const html = temp.innerHTML;

  setTimeout(() => {
    const hash = hashCode();
    setTimeout(() => {
      if (hash !== hashCode()) return;
      const { css, html } = mST();
      // @ts-ignore
      const codeSpace: string = globalThis["codeSpace"] as unknown as string;
      const temp = document.getElementById("root-" + codeSpace)!;

      const htmlHtml = temp.innerHTML;
      const newCss = extractCritical(htmlHtml);
      if (css !== newCss || html !== htmlHtml) {
        patchSync({
          ...mST(),
          html: htmlHtml,
          css: newCss,
        });
      }
    }, 50);
  }, 100);

  return {
    html,
    css: extractCritical(html),
  };
};
const extractCritical = (html: string) => {
  try {
    const rules: { [key: string]: string } = {};
    for (let i in document.styleSheets) {
      const styleSheet = document.styleSheets[i];
      // for (let r in styleSheet.cssRules) {
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 11);
            if (
              !rules[selector] && html.includes(selector) &&
              !rule.cssText.slice(10).includes(".css-")
            ) {
              rules[selector] = rule.cssText;
            }
          }
        });
      }
    }

    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch {
    console.error("no css");
    return "";
  }
};
