// Import { createPortal } from "react-dom";
// import { prefixer } from 'stylis';

// import type * as next from "react-dom/next";
// import "es-module-shims";

// import {CacheProvider, createCache } from "@emotion/react"
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

import type { FC } from "react";

import { mST, patchSync } from "./session";
import ErrorBoundary from "./ErrorBoundary";
import { md5 } from "./md5.js";

import { renderFromString } from "./renderToString";

import { useState } from "react";

import isCallable from "is-callable";

async function importShim(scr: string): Promise<any> {
  if (!document.scripts) {
    throw new Error("document.scripts");
  }

  const scripts = Array.from(document.scripts);
  const imap = scripts.find((s) => s.type === "importmap");

  if (!imap) {
    throw new Error("no imap");
  }

  // @ts-expect-error
  await import("es-module-shims");

  await window.importShim.addImportMap(
    JSON.parse(
      imap.innerText,
    ),
  );

  // @ts-expect-error
  importShim = window.importShim;

  return importShim(scr);
}

// (async()=>{
// Array.from( document.scripts).find(s=>s.type==="importmap")
// const res = await fetch(location.origin + '/importmap.json')
// const importMap = await res.json();

// importShim.addImportMap(importMap);
// })();
// Object.assign(window, {});

// const modalRoot = document.getElementById("root")!;

// export class Root extends React.Component<{children: ReactNode, codeSpace: string}> {
//   #el: HTMLDivElement;
//   #codeSpace: string;
//   children: ReactNode
//   constructor(props: {children: ReactNode, codeSpace: string}) {
//      super(props);
//     this.#codeSpace=props.codeSpace;
//      this.#el=document.createElement("div");
//      this.#el.id=`root-${this.#codeSpace}`;
//      this.#el.style.height='100%';

//   }

//   componentDidMount() {
//     // The portal element is inserted in the DOM tree after
//     // the Modal's children are mounted, meaning that children
//     // will be mounted on a detached DOM node. If a child
//     // component requires to be attached to the DOM tree
//     // immediately when mounted, for example to measure a
//     // DOM node, or uses 'autoFocus' in a descendant, add
//     // state to Modal and only render the children when Modal
//     // is inserted in the DOM tree.
//     modalRoot.innerHTML ="";
//     modalRoot.append(this.#el);
//   }

//   componentWillUnmount() {
//     modalRoot.appendChild(this.#el);
//   }

//   render() {
//     return createPortal(
//       this.props.children,
//       this.#el,
//     );
//   }
// }

// const orig = location.origin.includes("localhost") ? "." : location.origin;
// let isEsModuleShimsLoaded = false;
// export const initShims = async (assets: { [key: string]: string }) => {
// if (isEsModuleShimsLoaded) return;
// isEsModuleShimsLoaded = true;
// const {importShim} = await import("es-module-shims");

// location.origin.includes("localhost")
//   ? importShim.addImportMap({
//     "imports": {
//       "@emotion/react":
//         "https://esm.sh/@emotion/react@11.10.0?alias=react:/react.mjs",
//       "framer-motion": "./framer-motion",
//       "react": orig + "/" + assets["react.mjs"],
//       "react-dom": orig + "/" + assets["react.mjs"],
//       "react-dom/client": orig + "/" + assets["react.mjs"],
//       "react-dom/server": orig + "/" + assets["react.mjs"],
//       "react/jsx-runtime": orig + "/" + assets["react.mjs"],
//     },
//   })
//   : importShim.addImportMap({
//     "imports": {
//       // ...imap,
//       "framer-motion": location.origin + "/" + assets["framer-motion.mjs"],
//       "@emotion/react": location.origin + "/" + assets["emotion.mjs"],
//       "react": location.origin + "million/react",
//       "react-dom": location.origin + "million/react",
//       "react-dom/client": location.origin + "/" + assets["react.mjs"],
//       "react-dom/server": location.origin + "/" + assets["react.mjs"],
//       "react/jsx-runtime": location.origin + "/" + assets["react.mjs"],
//       // "preact": "https://ga.jspm.iopreact@10.8.2/dist/preact.module.js",
//       // "preact-render-to-string": "https://ga.jspm.iopreact-render-to-string@5.2.0/dist/index.mjs",
//       // "preact/compat": "https://ga.jspm.iopreact@10.8.2/compat/dist/compat.module.js",
//       // "preact/jsx-runtime": "https://ga.jspm.iopreact@10.8.2/jsx-runtime/dist/jsxRuntime.module.js"
//     },
//   });
// };

const apps: Record<string, React.FC> = {};
const render: Record<string, { html: string; css: string }> = {};
// {[md5(starter.transpiled)]: await appFactory(starter.transpiled)};

export const AutoUpdateApp: React.FC<{ hash: number; codeSpace: string }> = (
  { hash, codeSpace },
) => {
  const [md5Hash, setMdHash] = useState(md5(mST().transpiled).slice(0, 8));

  useEffect(() => {
    //  SetTimeout(()=>{

    const newHash = md5(mST().transpiled).slice(0, 8);

    if (newHash !== md5Hash) {
      setMdHash(newHash);
    }

    // }, 100);
  }, [hash]);

  useEffect(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash) return;

    render[md5Hash] = render[md5Hash] || renderFromString(codeSpace, hash);

    const { html, css } = render[md5Hash];

    if (html && css) {
      patchSync({ ...mST(), html, css });
    } else delete render[md5Hash];
  }, [md5Hash]);

  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled)];

  // Return <Root codeSpace={codeSpace}>

  return (
    <ErrorBoundary key={md5Hash} ref={ref}>
      <div style={{ height: "100%" }} id={`${codeSpace}-${md5Hash}`}>
        <App />
      </div>
    </ErrorBoundary>
  );
};

export async function appFactory(transpiled = ""): Promise<React.FC> {
  // Const hashC = hashCode();

  const trp = transpiled.length > 0 ? transpiled : mST().transpiled;

  const hash = md5(trp);

  if (!apps[hash]) {
    try {
      const App = (await importShim(createJsBlob(trp)))
        .default as unknown as FC;
      if (isCallable(App)) apps[hash] = App;
      else throw new Error("the default export is not a function!");
    } catch (error) {
      // Try {
      //   apps[hash] = (await importShim(createJsBlob(trp))).default as unknown as React.FC;
      // } catch {
      //   console.error("not even importShim");
      // }

      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => (
          <div
            css={css`
        background-color: orange;
        `}
          >
            <h1>Syntax Error</h1>
            <h2>{name}: {message}</h2>
            <p>{JSON.stringify({ err: error })}</p>
          </div>
        );
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;

        apps[hash] = () => (
          <div
            css={css`
						background-color: orange;
						`}
          >
            <h1>Syntax Error</h1>
            <h2>{name}: {message}</h2>
            <p>{JSON.stringify({ err: error })}</p>
          </div>
        );
      } else {
        apps[hash] = () => (
          <div
            css={css`
        background-color: orange;
      `}
          >
            <h1>Unknown Error: ${hash}</h1>
          </div>
        );
      }
    }
  }

  // If ( mST().transpiled !== trp) {
  //   if (hashC===hashCode()){
  //     apps[hashC]=apps[hash];
  //   } else {
  //     apps[hashC] =  await  appFactory(mST().transpiled)
  //   }

  // }
  //   const newApp = apps[hash];

  //   // delete apps[hash];
  //   return newApp;
  // }
  return apps[hash];
}

export function createJsBlob(code: string, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now(),
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // Const actualUrl = new URL(blobUrl,'//live/');

  // return actualUrl;
}
