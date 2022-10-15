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

import type { renderFromString as RFS } from "./renderToString";

import { useState } from "react";
import type { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import type CreateCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

import isCallable from "is-callable";

let renderFromString: typeof RFS | null = null;

let createCache: typeof CreateCache | null = null;
let CacheProvider: typeof EmotionCacheProvider | null = null;
// const myCache = createCache({
// key: "z",
// });

// Object.assign(globalThis, {myCache})

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
} // @ts-expect-error

globalThis.apps = globalThis.apps || {};
globalThis.eCaches = globalThis.eCaches as unknown || {};

const { apps, eCaches } = globalThis as unknown as {
  apps: Record<string, React.FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
};

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

    if (!renderFromString) return;

    render[md5Hash] = render[md5Hash] || renderFromString(codeSpace, hash);

    const { html, css } = render[md5Hash];

    if (html && css) {
      patchSync({ ...mST(), html, css });
    } else delete render[md5Hash];
  }, [md5Hash]);

  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled).slice(0, 8)];

  // Return <Root codeSpace={codeSpace}>

  //   if (!createCache || !CacheProvider) return null;

  //   const myCache = createCache({
  //     key: "z",
  //     });

  // Object.assign(globalThis, {myCache})

  return (
    <ErrorBoundary key={md5Hash} ref={ref}>
      <App appId={`${codeSpace}-${md5Hash}`} />
    </ErrorBoundary>
  );
};
// @ts-expect-error

let Emotion = null;

let myCache: EmotionCache | null = null;

export async function appFactory(
  transpiled = "",
): Promise<React.FC<{ appId: string }>> {
  // console.log('App fac', codeSpace, transpiled)
  // Const hashC = hashCode();
  // @ts-expect-error

  if (Emotion === null) {
    Emotion = await importShim("@emotion/react");

    renderFromString = (await importShim("/renderToString.mjs"))
      .renderFromString as unknown as typeof RFS;
    createCache = Emotion.cache.default as unknown as typeof CreateCache;
    CacheProvider = Emotion
      .CacheProvider as unknown as typeof EmotionCacheProvider;
    myCache = createCache({
      key: "z",
    });
  }
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;

  const hash = md5(trp).slice(0, 8);

  if (!apps[hash]) {
    try {
      if (globalThis.terminal && globalThis.terminal.clear) {
        globalThis.terminal.clear();
      }
      console.log(`i: ${mstI}: `);
      const App = (await importShim(createJsBlob(trp)))
        .default as unknown as FC;
      if (CacheProvider === null || myCache === null) {
        return () => <h1>error</h1>;
      }
      if (isCallable(App)) {
        const { CacheProvider, css } = Emotion;
        eCaches[hash] = Emotion.cache.default({
          key: "z",
          isSpeedy: true,
        }) as unknown as EmotionCache;
        apps[hash] = ({ appId }) =>
          appId.includes(hash)
            ? (
              <CacheProvider value={eCaches[hash]}>
                <div css={css`height: 100%;`} id={appId}>
                  <App />
                </div>
              </CacheProvider>
            )
            : null;
      } else throw new Error("the default export is not a function!");
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
