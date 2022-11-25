import type { FC } from "react";
import { useEffect, useRef } from "react";

import type { EmotionCache } from "@emotion/cache";
import { CacheProvider, css } from "@emotion/react";

import { upgradeElement } from "@ampproject/worker-dom/dist/main.mjs";
import { Mutex } from "async-mutex";
import { resetCSS } from "getResetCss";
import createCache from "./emotionCache";
import { md5 } from "./md5.js";
import { hashCode, mST, onSessionUpdate } from "./session";
import { toUmd } from "./toUmd";
import { wait } from "./wait";

const codeSpace = location.pathname.slice(1).split("/")[1];
let worker = null;
let div = null;
let oldDiv = null;
let parent: HTMLDivElement;
let lastH;

const mutex = new Mutex();

async function runInWorker(nameSpace: string, _parent: HTMLDivElement) {
  await mutex.runExclusive(async () => {
    if (lastH === hashCode()) return;
    lastH = hashCode();
    parent = parent || _parent;
    if (worker) worker.terminate();
    if (div) div.remove();
    div = await moveToWorker(nameSpace, parent);
    if (oldDiv) oldDiv.remove();
    div.setAttribute("data-shadow-dom", "open");
    worker = await upgradeElement(div, "/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.js");
  });
}

const bc = new BroadcastChannel(location.origin);

bc.onmessage = (event) => {
  const nameSpace = location.pathname.slice(1).split("/")[1];
  if (event.data.codeSpace === nameSpace) {
    runInWorker(nameSpace, parent);
  }
};

// import importmap from "./importmap.json";
// const imp: { [key: string]: string } = { ...importmap.imports };
// const res = {};
// Object.keys(imp).map((k) => Object.assign(res, { [k]: location.origin + imp[k] }));

// importShim.addImportMap({ imports: res });

async function moveToWorker(nameSpace: string, parent: HTMLDivElement) {
  const { html, css, i, code, transpiled } = nameSpace === codeSpace
    ? mST()
    : (await import(`${location.origin}/live/${codeSpace}/mST.mjs`)).mST;
  const div = document.createElement("div");
  div.setAttribute("id", `${codeSpace}-${i}`);
  div.style.height = "100%";
  div.innerHTML = `<style>${resetCSS} ${css}</style><div id="${codeSpace}-${i}" style="height: 100%">${html}</div>`;
  parent.appendChild(div);

  const k = md5(transpiled);
  const mod2 = await toUmd(
    `
    import {createRoot} from "react-dom/client"
    import { CacheProvider } from "@emotion/react";
    import createCache from "@emotion/cache ";
    import { ErrorBoundary } from "react-error-boundary";

  ` + code.replace("export default", `const App${k} =`) + `
  
  const reset = document.createElement("style");
reset.textContent = ${JSON.stringify(resetCSS)};
document.body.appendChild(reset);

  let parent = document.getElementById("${codeSpace}-${i}");

  if (!parent) {
    parent =  document.createElement("div");
    parent.setAttribute("id", "${codeSpace}-${i}");
    document.body.appendChild(parent);
  }
  parent.style.height="100%";
  parent.innerHTML=\`<div id="${codeSpace}-${k}"></div>\`;  
  const div = document.getElementById("${codeSpace}-${k}");
  div.style.height="100%";
  const root = createRoot(div );

  const cache = createCache({
    key: "${k}",
    container: parent,
    speedy: false,
  });


root.render( <ErrorBoundary
  fallbackRender={({ error }) => (
    <div role="alert">
      <div>Oh no</div>
      <pre>{error.message}</pre>
    </div>
  )}
><CacheProvider value={cache}>
  <App${k} />
  </CacheProvider></ErrorBoundary>);

  `,
    `${codeSpace}-${i}`,
  );

  const js = await mod2.toJs(`${codeSpace}-${i}`);
  const src = createJsBlob(js);
  div.setAttribute("src", src);

  return div;
}

Object.assign(globalThis, { md5 });
const myApps: { [key: string]: FC } = {};
const myAppCounters: { [key: string]: number } = {};
let controller: AbortController;

onSessionUpdate(() => {
  if (controller) controller.abort("new i");
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
            App = (await importShim(url)).default as FC;

            return { App, url: resp.url };
          } catch {
            const trp = await resp.text();

            try {
              App = (await import(createJsBlob(trp))).default;
            } catch {
              console.error("something went nuts");

              App = (await importShim(createJsBlob(trp))).default;
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

export function AutoUpdateApp(
  { codeSpace }: { codeSpace: string },
) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current === null) return;

    runInWorker(codeSpace, ref.current);
  }, [ref, ref.current]);
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

  return (
    <div
      ref={ref}
      css={css`
    height: 100%`}
    />
  );
}

export async function appFactory(
  transpiled = "",
  codeSpace: string,
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

      let mod;

      try {
        mod = await importShim(createJsBlob(trp));
      } catch {
        mod = new Function(trp + ` return ${trp.slice(2, 10)}`)();
      }
      const App = mod.default;

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

export function createJsBlob(code: string, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now(),
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}
