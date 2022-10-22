import type { FC } from "react";
import { useEffect, useState } from "react";
// import {terminal} from "./DraggableWindow"
import { ErrorBoundary } from "react-error-boundary";

import { mST } from "./session";
import { md5 } from "./md5.js";
import { CacheProvider, css } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";
import createCache from "./emotionCache";
import { renderPreviewWindow } from "renderPreviewWindow";

// import { CacheProvider } from "@emotion/react// import createCache from "@emotion/cache";
// import type { EmotionCache } from "@emotion/cache";

import isCallable from "is-callable";

const dynamicImport = (src: string) =>
  window.importShim ? window.importShim(src) : import(src);

// const {default: createCache} = emotionCache as unknown as {default: typeof emotionCache};

Object.assign(globalThis, { apps: {}, eCaches: {} });

export const { apps, eCaches } = (globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
}) || (globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
}).apps;

// const myCache = createCache({
// key: "z",
// });

//const render: Record<string, { html: string; css: string }> = {};
// {[md5(starter.transpiled)]: await appFactory(starter.transpiled)};
let resetErrorBoundary: (() => void) | null;
export const AutoUpdateApp: FC<{ hash: number; codeSpace: string }> = (
  { hash, codeSpace },
) => {
  const [md5Hash, setMdHash] = useState(md5(mST().transpiled).slice(0, 8));

  useEffect(() => {
    //  SetTimeout(()=>{

    const newHash = md5(mST().transpiled);

    if (newHash !== md5Hash) {
      setMdHash(newHash);
    }
    if (resetErrorBoundary && isCallable(resetErrorBoundary)) {
      resetErrorBoundary();
      resetErrorBoundary = null;
    }

    // }, 100);
  }, [hash]);

  const App = apps[md5Hash];

  return (
    <ErrorBoundary
      key={md5Hash}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div role="alert">
          <div>Oh no</div>
          <pre>{error.message}</pre>
          <button
            onClick={() => {
              // this next line is why the fallbackRender is useful

              // though you could accomplish this with a combination
              // of the FallbackCallback and onReset props as well.
              resetErrorBoundary();
            }}
          >
            Try again
          </button>
        </div>
      )}
    >
      <div key={md5Hash} style={{ height: 100 + "%" }}>
        <App key={md5Hash} appId={`${codeSpace}-${md5Hash}`} />
      </div>
    </ErrorBoundary>
  );
};
//
// let Emotion: typeof iEmotion;
let started = false;

export async function appFactory(
  transpiled = "",
  codeSpace?: string,
): Promise<FC<{ appId: string }>> {
  //}
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;

  const hash = md5(trp);

  if (!apps[hash]) {
    try {
      // if (terminal && terminal.clear) {
      //   terminal.clear();
      // }
      console.log(`i: ${mstI}: `);
      const App = (await dynamicImport(createJsBlob(trp)))
        .default as unknown as FC;

      if (isCallable(App)) {
        eCaches[hash] = eCaches[hash] || createCache({
          key: hash,

          speedy: false,
        });

        eCaches[hash].compat = undefined;

        apps[hash] = apps[hash] ||
          (({ appId }: { appId: string }) =>
            appId.includes(hash)
              ? (
                <CacheProvider key={hash} value={eCaches[hash]}>
                  <div key={hash} css={css`height: 100%;`} id={appId}>
                    <App></App>
                  </div>
                </CacheProvider>
              )
              : null);
      } else throw new Error("the default export is not a function!");
    } catch (error) {
      // Try {
      //   apps[hash] = (await importShim(createJsBlob(trp))).default as unknown as FC;
      // } catch {
      //   console.error("not even importShim");
      // }

      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => (
          <div css={css`background-color: orange;`}>
            <h1>Syntax Error</h1>

            <h2>{hash}</h2>
            <h2>{name}: {message}</h2>
            <p>{JSON.stringify({ err: error })}</p>
          </div>
        );
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;

        apps[hash] = () => (
          <div css={css`background-color: orange;`}>
            <h1>Syntax Error</h1>
            <h2>{name}: {message}</h2>
            <p>{JSON.stringify({ err: error })}</p>
          </div>
        );
      } else {
        apps[hash] = () => (
          <div css={css`background-color: orange;`}>
            <h1>Unknown Error: ${hash}</h1>
          </div>
        );
      }
    }
  }

  if (!started && codeSpace) {
    started = true;
    await renderPreviewWindow({ codeSpace });
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
