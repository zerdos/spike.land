import type { FC } from "react";

import { upgradeElement } from "@ampproject/worker-dom/dist/main.mjs";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";
import { Mutex } from "async-mutex";
import createCache from "./emotionCache";
import { build } from "./esbuildEsm";
import { md5 } from "./md5.js";
import { hashCode, type ICodeSession, mST, onSessionUpdate, resetCSS } from "./session";
import { wait } from "./wait";

const modz: { [key: string]: null | Promise<HTMLIFrameElement> | number } = {};
const abortz: { [key: string]: () => void } = {};
const codeSpace = location.pathname.slice(1).split("/")[1];

const mutex = new Mutex();

if (location.pathname.includes(`/live/${codeSpace}/worker`)) {
  runInWorker(codeSpace, document.getElementById("root") as HTMLDivElement);
}

export const createIframe = async (cs: string, counter: number) => {
  await mutex.runExclusive(async () => {
    if (modz[`${cs}-${counter}`]) return modz[`${cs}-${counter}`];
    return modz[`${cs}-${counter}`] = new Promise(async (res) => {
      if (modz[cs] !== null && modz[cs]! > counter) return;
      if (abortz[cs]) (abortz[cs])();

      const controller = new AbortController();
      const { signal } = controller;
      abortz[cs] = () => controller.abort();
      modz[cs] = counter;

      let MST: ICodeSession;
      if (cs === codeSpace) MST = mST();
      else {
        MST = await fetch(`/live/${cs}/session.json`).then((x) => x.json() as Promise<ICodeSession>);
      }

      if (signal.aborted) return;
      if (modz[cs] !== counter) return;
      const { html, css, i, transpiled } = MST;
      // const hashCode = md5(transpiled);
      if (i > modz[cs]!) modz[cs] = i;

      const counterLength = `/*${i}*/`.length;

      if (i > counter) return createIframe(cs, i);
      const c2 = +transpiled.slice(-counterLength).split("*")[1];
      if (c2 > modz[cs]!) modz[cs] = c2;
      if (c2 > i) return createIframe(cs, c2);

      if (signal.aborted) return;

      let iframe = document.createElement("iframe");
      iframe.setAttribute("src", `${location.origin}/live/${codeSpace}/`);

      const iSRC = (srcJS: string) =>
        createHTML(`
    <html> 
    <head>
    <style>
    html,body{
      height: 100%;
    }
    q{
      display: none;
    }
    ${resetCSS}
    ${css}
    </style>
    <script type="module" src=${srcJS}></script> 
    </head>
    <body>
    <div id="root" style="height: 100%;">${html}</div>
    </body>
    </html>`);
      const setIframe = (srcJS: string) => {
        iframe.src = iSRC(srcJS);
        if (signal.aborted) return;

        const zBody = document.getElementById("z-body");

        iframe.onload = () => {
          if (signal.aborted) return false;

          if (zBody?.firstChild?.isSameNode(iframe)) {
            console.log("ALL OK");
            return true;
          }

          if (zBody) {
            zBody.innerHTML = "";
            zBody.appendChild(iframe);
            return true;
          }
          return new Promise((res) =>
            setTimeout(async () => {
              res(await setIframe(srcJS));
            }, 10000)
          );
        };

        iframe.setAttribute("data-coder", cs);
        iframe.style.height = "100%";
        iframe.setAttribute("id", `coder-${cs}`);
        iframe.style.border = "none";
        iframe.style.width = "100%";

        if (signal.aborted) return false;

        if (zBody) {
          zBody.innerHTML = ``;
          zBody.appendChild(iframe);
          return iframe;
        }
        return false;
      };

      setIframe(createJsBlob(``));
      if (signal.aborted) return;
      if (modz[cs] !== counter) return;
      // document.querySelectorAll(`iframe[data-coder="${cs}"]`).forEach((el) => el.replaceWith(iframe));
      // document.body.appendChild(iframe)

      if (signal.aborted) return;
      if (!iframe) return;
      if (signal.aborted) return;
      // iframe.style.position = "fixed";

      // iframe && iframe.remove();

      requestAnimationFrame(() =>
        !signal.aborted
        && build(cs, counter, signal, false).then((x) => x && setIframe(createJsBlob(x)))
      );
      res(iframe);
      return iframe;
      // document.getElementById(`coder-${codeSpace}`)?.replaceWith(iframe);
      // iframe.setAttribute("id", `coder-${code#Space}`);

      // document.body.appendChild(iframe);
    });
  });
};

let worker: { terminate: () => void };
// let oldDiv = null;
let lastH = "";
let lastSuccessful = "";

export async function runInWorker(nameSpace: string, _parent: HTMLDivElement) {
  if (worker) worker.terminate();
  lastH = hashCode();
  console.log(`last hash: ${lastH}`);
  await mutex.runExclusive(async () => {
    const current = hashCode();
    if (lastH !== hashCode()) {
      console.log(`skipping old build hash: ${lastH}`);
      return;
    }

    if (current === lastSuccessful) {
      console.log(
        `skipping build since it is the latest successful: ${current}`,
      );
      return;
    }

    const div = await moveToWorker(nameSpace, document.getElementById("root")!);
    if (!div) return;

    const w = await upgradeElement(
      div,
      "/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.mjs",
    );
    if (w === null) throw new Error("No worker");
    worker = w;
  });
}

// const bc = new BroadcastChannel(location.origin);

// bc.onmessage = (event) => {
//   const nameSpace = location.pathname.slice(1).split("/")[1];

//   if (event.data.codeSpace === nameSpace) {
//     if (location.href.indexOf("/worker") !== -1) {
//       runInWorker(nameSpace, document.getElementById("root") as HTMLDivElement);
//     }
//   }
// };
// let iframe = document.createElement("iframe");
// iframe.setAttribute("src", `${location.origin}/live/${codeSpace}/`);

// //  iframe.setAttribute("data-coder", cs);
// iframe.style.height = "100%";
// //    iframe.setAttribute("id", `coder-${cs}`);
// iframe.style.border = "none";
// iframe.style.width = "100%";

//      createIframe(nameSpace, mST().i);
// }
// }
// };

// import importmap from "./importmap.json";
// const imp: { [key: string]: string } = { ...importmap.imports };
// const res = {};
// Object.keys(imp).map((k) => Object.assign(res, { [k]: location.origin + imp[k] }));

// importShim.addImportMap({ imports: res });

async function moveToWorker(nameSpace: string, parent: HTMLElement) {
  const { i } = nameSpace === codeSpace
    ? mST()
    : (await import(`${location.origin}/live/${codeSpace}/mST.mjs`)).mST;
  const div = parent?.getElementsByTagName("div")[0]!;
  div.style.height = "100%";
  const cont = new AbortController();

  const js = await build(codeSpace, i, cont.signal, false);

  if (!js) return false;
  const src = createJsBlob(js);

  div.setAttribute("src", src);
  div.setAttribute("data-shadow-dom", "open");

  return div;
}

Object.assign(globalThis, { md5 });
const myApps: { [key: string]: FC } = {};
const myAppCounters: { [key: string]: number } = {};
let controller: AbortController;

onSessionUpdate(() => {
  if (controller) controller.abort();
}, "abort");

export { md5 };

export const importIt: (url: string) => Promise<{ App: FC; url: string }> = async (url: string) => {
  let waitingTime = 100;
  let App;
  const urlARR = url.split("/");
  const naked = +(urlARR.pop() || 0);

  const nUrl = urlARR.join("/");
  myAppCounters[nUrl] = myAppCounters[nUrl] || naked;

  while (true) {
    const betterNaked = naked < myAppCounters[nUrl]
      ? myAppCounters[nUrl]
      : naked;
    const url = [...urlARR, betterNaked].join("/");

    try {
      try {
        let controller = new AbortController();
        const signal = controller.signal;
        let resp = await fetch(url, { signal });

        //  let urlLoc: null | string;
        // if (resp.headers.keys()) {
        //   urlLoc = resp.headers.get("location");
        //   const// if (urlLoc === null) throw new Error("No idea why");
        // const bestCounter = +(urlLoc.split("/").pop() || 0);
        // myAppCounters[nUrl] = bestCounter;
        // if (urlLoc !== null)
        // return await importIt(urlLoc);
        // }

        if (resp.ok) {
          try {
            App = (await import(url)).default as FC;

            return { App, url: resp.url };
          } catch {
            const trp = await resp.text();

            try {
              App = (await import(createJsBlob(trp))).default;
            } catch {
              console.error("something went nuts");

              App = (await import(createJsBlob(trp))).default;
            }
            myApps[nUrl] = App;

            return { App, url: resp.url };
          }
        }
      } catch (err) {
        console.error({ err });
        console.error(
          (err && (err as unknown as any)?.message as unknown as any)
            || "error has been thrown",
        );
      }
    } catch {
      console.error("bad something happened;");
    } finally {
      await wait(waitingTime *= 2);
    }
  }
};

if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}

export const { apps, eCaches } = (globalThis as unknown as {
  apps: Record<string, FC<{ appId: string }>>;
  eCaches: Record<string, EmotionCache>;
});

// export function AutoUpdateApp()
//    {
//   useEffect(() => {
// let iframe = document.createElement("iframe");
// iframe.setAttribute("src", `${location.origin}/live/${codeSpace}/`);

// //  iframe.setAttribute("data-coder", cs);
// iframe.style.height = "100%";
// //    iframe.setAttribute("id", `coder-${cs}`);
// iframe.style.border = "none";
// document.getElementById("z-body")
// createIframe(codeSpace, mST().i);

// setHash(hashCode());
// runInWorker(codeSpace, ref.current);
// }, []);
// let starterI = 1 * (document.getElementById(`root-${codeSpace}`)!.getAttribute(
//   "data-i",
// ) as unknown as number);

// const [{ App, i }, setApps] = useState({
//   i: starterI - 1,
//   App: null as null | FC<{}>,
// });

// useEffect(() => {
//   (async () => {
//     const { url, App: newApp } = await importIt(
//       `${location.origin}/live/${codeSpace}/index.js/${i}`,
//     );

//     const urlCounter = +(url.split("/").pop() || 0);
//     if (i < urlCounter && newApp !== App) {
//       setApps((x) => ({ ...x, i: urlCounter, App: newApp }));
//     }
//   })();
// }, []);
// useEffect(() => {
//   (async () => {
//     (async () => {
//       const { url, App: newApp } = await importIt(
//         `${location.origin}/live/${codeSpace}/index.js/${i + 1}`,
//       );
//       const urlCounter = +(url.split("/").pop() || 0);
//       if (i < urlCounter && newApp !== App) {
//         console.log({ url, urlCounter });
//         setApps((x) => ({ ...x, i: urlCounter, App: newApp }));
//       }
//     })();
//   })();
// }, [i, setApps, App]);

// return <></>;
// }

export async function appFactory(
  transpiled = "",
): Promise<FC<{ appId: string }>> {
  // }

  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  if (transpiled) console.log({ transpiled });
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

      const App = (await import(createJsBlob(trp))).default;

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

function createHTML(code: string) {
  return URL.createObjectURL(
    new Blob([code], { type: "text/html" }),
  );
}
