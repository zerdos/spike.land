// import {CacheProvider } from "@emotion/react"

// import { md5 } from "./md5";
// import { createRoot } from "react-dom/client";
// import { appFactory } from "starter";
import { default as createCache, EmotionCache } from "@emotion/cache";
import { default as createEmotionServer } from "@emotion/server/create-instance";

import { CacheProvider } from "@emotion/react";
import type { FunctionComponent } from "preact";
import { renderToString } from "preact-render-to-string";
// import { useEffect } from "react";

// import  postcss from 'postcss';
// import autoprefixer from "autoprefixer"
// import { useState } from "react";
// import { wait } from "wait";
// import { hashCode, mST, patchSync } from "session";
// import postcssNested from "postcss-nested"

// const prefixer = (css: string)=> postcss([autoprefixer({ grid: 'autoplace' })]).process(css).then(result => {
// console.log("•••••••CSS*******")
//   console.log({result})
//   result.warnings().forEach(warn => {
//     console.warn(warn.toString())
//   })
//   console.log(result.css)
//   return result.css
// })

// const WithCache: FC<{children: ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>
// const temp = document.createElement("div");

// const tempRoot = createRoot(temp);
// const mod: { [key: string]: Promise<boolean> | string } = {  transpiled: ""};
// const TestBed: React.FC<{ md5Hash: string; children: JSX.Element }> = (
//   { md5Hash, children },
// ) => {
//   const [resolveMod, setResolve] = useState< {res: null | (( success: boolean)=> void) } >({res: null});
//   mod[md5Hash] = new Promise((res) => setResolve({res}));

//   useEffect(() => {
//     if (resolveMod.res) resolveMod.res(true);
//   }, [resolveMod]);

//   return <div id={md5Hash}>{children}</div>;
// };
export const renderFromString = (
  // code: string,
  // App: FunctionComponent
  codeSpace: string,
) => {
  const html = document.getElementById(`root-${codeSpace}`)?.innerHTML!;
  const css = extractCritical22(html);

  // const temp = document.createElement("div");

  // const cache = createCache.default({
  //     key: 'my-prefix-key',
  //     container: temp,
  //   //   stylisPlugins: [
  //   //     /* your plugins here */
  //     //
  //   }) as EmotionCache;

  // const cache = createCache.default({ key }) as EmotionCache
  // const {  renderStylesToString } = createEmotionServer.default(cache)

  // const myCache = createCache.default({
  //   key: 'my-prefix-key',
  //   container: temp,
  //   stylisPlugins: [
  //     /* your plugins here */
  //   ]
  // }) as EmotionCache

  // mod.transpiled = transpiled;
  // const md5Code =codeSpace + md5(transpiled).slice(0, 14);

  // const myCache =  createCache({
  //   prepend: true,
  //   key: 'css',
  //   stylisPlugins: [
  //   ]
  // });

  // tempRoot.render(
  //   <TestBed key={md5Code} md5Hash={md5Code}>
  //     <App />
  //   </TestBed>,
  // );
  // // await new Promise<boolean>((_res) => flushSync(_res, true));
  // // await new Promise<boolean>((_res=>fluxshSync(_res, true)));
  // await wait(50);

  // if (!mod[md5Code]) return null;

  // if (!await mod[md5Code]) return null;

  // const html = renderToString(  <CacheProvider value={cache}><App /></CacheProvider>);
  // const css = extractCritical22(html);

  // console.log({html, css})
  // const css = constructStyleTagsFromChunks(chunks)

  // console.log( {chunks,
  // cache,
  // css});

  // flushSync();
  // tempRoot.unmount();

  //   setTimeout(() => {
  //     if (mod.transpiled === transpiled && mST().transpiled===transpiled) {

  //       const tmp = document.getElementById("root-" + codeSpace)!;

  //       const htmlHtml = tmp.innerHTML;
  //       const newCss = extractCritical(htmlHtml);
  //       if (css !== newCss || html !== htmlHtml) {
  //         patchSync({
  //           ...mST(),
  //           html: htmlHtml,
  //           css: newCss,
  //         });
  //       }

  //   }
  // }, 200);

  return { html, css };
};
const extractCritical22 = (html: string) => {
  try {
    const rules: { [key: string]: string } = {};
    for (let i in document.styleSheets) {
      const styleSheet = document.styleSheets[i];
      // for (let r in styleSheet.cssRules) {
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = rule.selectorText || selector;
            if (
              !rules[selector] && html.includes(selector) &&
              !rule.cssText.slice(10).includes(".css-")
            ) {
              rules[selectorText] = rule.cssText;
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
