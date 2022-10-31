import type { FC } from "react";
import { lazy, Suspense, useEffect, useState } from "react";
// import {terminal} from "./DraggableWindow"
import { ErrorBoundary } from "react-error-boundary";

import type { EmotionCache } from "@emotion/cache";

import { CacheProvider, css } from "@emotion/react";

import createCache from "./emotionCache";
import { md5 } from "./md5.js";
import { hashCode, mST } from "./session";

// import { CacheProvider } from "@emotion/react// import createCache from "@emotion/cache";
// import type { EmotionCache } from "@emotion/cache";

// import isCallable from "is-callable";

import { wait } from "./wait";

Object.assign(globalThis, { md5 });

// const dynamicImport = (src: string) =>
//   return require(src)
//   fetch(src).then(async (resp) => {
//     if (!resp.ok) throw new Error("Error while import ${src}");

//     const trp = await resp.text();
//     const hash = md5(trp);
//     const codeHash = trp.slice(2, 10);
//     globalThis.IIFE[hash] = codeHash;
//     try {
//       return new Function(trp + "return " + globalThis.IIFE[hash])();
//     } catch {
//       const umdTrp = await umdTransform(trp);
//       const umdHash = md5(umdTrp);
//       return new Function(umdTrp + "return " + globalThis.IIFE[umdHash])();
//     }
//   });

// window.importShim ? window.importShim(src) : import(src);

// const {default: createCache} = emotionCache as unknown as {default: typeof emotionCache};

if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}

export const { apps, eCaches } = (globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
});

// const myCache = createCache({
// key: "z",
// });

// const render: Record<string, { html: string; css: string }> = {};
// {[md5(starter.transpiled)]: await appFactory(starter.transpiled)};
let starterI = 1
  * (document.getElementById("root")!.getAttribute(
    "data-i",
  ) as unknown as number);

export function AutoUpdateApp(
  { codeSpace }: { codeSpace: string },
) {
  const importIt = async (url: string) => {
    let waitingTime = 100;
    while (true) {
      try {
        let resp = await fetch(url);
        if (resp.status === 307 && resp.headers.get("location")) {
          const i = Number(resp.headers.get("location")!.split("/").pop()) * 1;
          setApps((x) => ({ ...x, i }));
          return;
        }
        if (resp.ok) {
          const trp = await resp.text();
          let mod;
          try {
            mod = new Function(trp + ` return ${trp.slice(2, 10)}`)();
          } catch {
            mod = await importShim(createJsBlob(trp));
          }
          setApps({ App: lazy(async () => mod), i: i + 1 });

          return mod;
        }
      } catch (err) {
        console.error({ err });
        console.error("error has been thrown");
      } finally {
        await wait(waitingTime *= 2);
      }
    }
  };

  const [{ App, i }, setApps] = useState({
    i: starterI - 1,
    App: lazy(() => importIt(`${location.origin}/live/${codeSpace}/index.js/${starterI}`)),
  });

  useEffect(() => {
    importIt(`${location.origin}/live/${codeSpace}/index.js/${i + 1}`);
  }, [i]);

  return (
    <ErrorBoundary
      key={i}
      fallbackRender={({ error }) => (
        <div role="alert">
          <div>Oh no</div>
          <pre>{error.message}</pre>
        </div>
      )}
    >
      <Suspense
        fallback={
          <div
            style={{ height: "100%" }}
            dangerouslySetInnerHTML={{
              __html: `<style>${mST().css.split("body").join(`${codeSpace}-${hashCode()}`)}</style>${mST().html}`,
            }}
          />
        }
      >
        <App />
      </Suspense>
    </ErrorBoundary>
  );
}

// export function AutoUpdateApp(
//   { codeSpace, transpiled }: { codeSpace: string; transpiled?: string },
// ) {
//   const [{ md5Hash, resetErrorBoundary, App }, setMdHash] = useState({
//     App: lazy(async () => {
//       return {
//         default: apps[md5(mST().transpiled)],
//       };
//     }),
//     md5Hash: md5(transpiled || mST().transpiled),
//     resetErrorBoundary: null as null | (() => void),
//   });

//   useEffect(() =>
//     onSessionUpdate(async () => {
//       const transpiled = mST().transpiled;
//       await appFactory(transpiled);
//       resetErrorBoundary && resetErrorBoundary();
//       const md5Hash = md5(transpiled);
//       if (apps[md5Hash]) {
//         setMdHash({
//           md5Hash: md5(transpiled),
//           resetErrorBoundary: null,
//           App: lazy(async () => {
//             if (!location.href.endsWith("/public")) await wait(1000);
//             return {
//               default: apps[md5(mST().transpiled)],
//             };
//           }),
//         });
//       }
//     }, "autoUpdate"), [setMdHash, resetErrorBoundary]);

//   // const App = apps[md5Hash];

//   return (
//     <ErrorBoundary
//       key={md5Hash}
//       fallbackRender={({ error, resetErrorBoundary }) §
//           <div>Oh no</div>
//           <pre>{error.message}</pre>
//           <button
//             onClick={() => {
//               if (
//                 resetErrorBoundary !== null && isCallable(resetErrorBoundary)
//               ) resetErrorBoundary();

//               setMdHash((x) => ({ ...x, resetErrorBoundary: null }));
//             }}
//           >
//             Try again
//           </button>
//         </div>
//       )}
//     >
//       <Suspense
//         fallback={<div style={{ height: "100%" }} dangerouslySetInnerHTML={{ __html: mST().html }} />}
//       >
//         <App key={md5Hash} appId={`${codeSpace}-${md5Hash}`} />
//       </Suspense>
//     </ErrorBoundary>
//   );
// }

//
// let Emotion: typeof iEmotion;
// let started = false;

export async function appFactory(
  transpiled = "",
): Promise<FC<{ appId: string }>> {
  // }
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;

  const hash = md5(trp);

  if (!apps[hash] || !eCaches[hash]) {
    try {
      eCaches[hash] = eCaches[hash] || createCache({
        key: hash,
        speedy: false,
      });

      eCaches[hash].compat = undefined;

      // if (terminal && terminal.clear) {
      //   terminal.clear();
      // }
      console.log(`i: ${mstI}: `);

      const App = new Function(trp + ` return ${trp.slice(2, 10)}`)().default;

      //      globalThis.TmpApp.default as unknown as FC; // (await importShim(createJsBlob(transpiled))).default;

      // try {
      //   const fn = new Function("return " + trp)().default as unknown as FC;
      //   App = fn;
      // } catch {
      //   wait(300);
      //   App = new Function("return " + trp)().default as unknown as FC;
      // }

      apps[hash] = ({ appId }: { appId: string }) => (
        <div key={hash} style={{ height: 100 + "%" }} id={appId}>
          <CacheProvider key={hash} value={eCaches[hash]}>
            <App />
          </CacheProvider>
        </div>
      );
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

    if (transpiled !== "") return apps[hash];
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
