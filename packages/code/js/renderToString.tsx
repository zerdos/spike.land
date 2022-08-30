// import {CacheProvider } from "@emotion/react"

import { md5 } from "./md5";
import { createRoot, flushSync } from "react-dom/client";
import { appFactory } from "starter";
import { hashCode, mST, patchSync } from "./session";
import { useEffect } from "react";

// const WithCache: FC<{children: ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>
const temp = document.createElement("div");

const tempRoot = createRoot(temp);
const mod: {[key: string]: Promise<boolean>} = {};
const TestBed: React.FC<{md5Hash: string, children: JSX.Element}> = ({md5Hash, children})=>{
  let resolv;
  mod[md5Hash] = new Promise((res)=>resolv=res);

  useEffect(()=>{
   resolv(true);
  }, []);

  return <div id={md5Hash}>{children}</div>
}

export const renderFromString =async (code:string, transpiled:string,  codeSpace: string) => {
  const md5Code = 'ID'+md5(code).slice(0,14);
  const App = await appFactory(transpiled);
  
  // const myCache =  createCache({
  //   prepend: true,
  //   key: 'css',
  //   stylisPlugins: [
  //   ]
  // });

  // const temp = document.createElement("div");

  
  tempRoot.render(<TestBed key={md5Code} md5Hash={md5Code}><App /></TestBed>);
  await new Promise<boolean>((_res=>flushSync(_res, true)));
  // await new Promise<boolean>((_res=>fluxshSync(_res, true)));
  if (!mod[md5Code])   return null;

  if (! await mod[md5Code]) return null;
  const html = temp.querySelector(`#${md5Code}`)?.innerHTML;
  tempRoot.unmount();

  setTimeout(() => {
    const hash = hashCode();
    setTimeout(() => {
      if (hash !== hashCode()) return;
      const { css, html, code } = mST();
      const newMd5Code = 'ID'+md5(code).slice(0,14);
      if (newMd5Code !== md5Code) return;
      // @ts-ignore
      // const codeSpace: string = globalThis["codeSpace"] as unknown as string;
      const tmp = document.getElementById("root-" + codeSpace)!;

      const htmlHtml = tmp.innerHTML;
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

  return html?  {
    html,
    css: extractCritical(html),
  }:null;
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
