import type { FC } from "react";

// import { upgradeElement } from "@ampproject/worker-dom/dist/main.mjs";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import createCache from "./emotionCache";
// import { buildT } from "./esbuildEsm";
import { md5 } from "./md5.js";

Object.assign(globalThis, { md5 });
const myApps: { [key: string]: FC } = {};
const myAppCounters: { [key: string]: number } = {};

export { md5 };

// export const importIt: (url: string) => Promise<{ App: FC; url: string }> = async (url: string) => {
//   let waitingTime = 100;
//   let App;
//   const urlARR = url.split("/");

//   const naked = +(urlARR.pop() || 0);

//   const nUrl = urlARR.join("/");
//   myAppCounters[nUrl] = myAppCounters[nUrl] || naked;

//   while (true) {
//     const betterNaked = naked < myAppCounters[nUrl]
//       ? myAppCounters[nUrl]
//       : naked;
//     const url = [...urlARR, betterNaked].join("/");

//     try {
//       try {
//         let controller = new AbortController();
//         const signal = controller.signal;
//         let resp = await fetch(url, { signal });

//         //  let urlLoc: null | string;
//         // if (resp.headers.keys()) {
//         //   urlLoc = resp.headers.get("location");
//         //   const// if (urlLoc === null) throw new Error("No idea why");
//         // const bestCounter = +(urlLoc.split("/").pop() || 0);
//         // myAppCounters[nUrl] = bestCounter;
//         // if (urlLoc !== null)
//         // return await importIt(urlLoc);
//         // }

//         if (resp.ok) {
//           try {
//             App = (await import(url)).default as FC;

//             return { App, url: resp.url };
//           } catch {
//             const trp = await resp.text();

//             try {
//               App = (await import(createJsBlob(trp))).default;
//             } catch {
//               console.error("something went nuts");

//               App = (await import(createJsBlob(trp))).default;
//             }
//             myApps[nUrl] = App;

//             return { App, url: resp.url };
//           }
//         }
//       } catch (err) {
//         console.error({ err });
//         console.error(
//           (err && (err as unknown as any)?.message as unknown as any)
//             || "error has been thrown",
//         );
//       }
//     } catch {
//       console.error("bad something happened;");
//     } finally {
//       await wait(waitingTime *= 2);
//     }
//   }
// };

if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}

export const { apps, eCaches } = globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
};

export async function appFactory(
  transpiled: string,
): Promise<FC<{ appId: string }>> {
  // }

  const trp: string = transpiled;

  const hash = md5(transpiled);

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

      const App = (await import(createJsBlob(trp)))
        .default;

      apps[hash] = ({ appId }: { appId: string }) => (
        <div key={hash} style={{ height: 100 + "%" }} id={appId}>
          <CacheProvider key={hash} value={eCaches[hash]}>
            <App />
          </CacheProvider>
        </div>
      );
    } catch (error) {
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

  return apps[hash];
}

export function createJsBlob(code: string | Uint8Array) {
  return URL.createObjectURL(
    new Blob([code], {
      type: "application/javascript",
    }),
  );
}

export function createHTML(code: string) {
  return URL.createObjectURL(
    new Blob([code], { type: "text/html" }),
  );
}
