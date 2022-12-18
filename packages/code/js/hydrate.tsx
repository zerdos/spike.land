import { RpcProvider } from "worker-rpc";

import { appFactory } from "starter";

import type { Root } from "react-dom/client";

import type { EmotionCache } from "@emotion/cache";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
export { ab2str } from "sab";
import type { CodeSession, ICodeSession } from "session";
import { wait } from "wait";
import { md5 } from "./md5";
import { makePatch, startSession } from "./session";

export { md5 };

const divs = {};
let r: Root | null;
let root: HTMLDivElement;
let lastI: number;
let session: CodeSession;

const user = md5((self && self.crypto && self.crypto.randomUUID
  && self.crypto.randomUUID()).slice(
    0,
    8,
  ));

const rpcProvider = new RpcProvider(
  (message, transfer) => postMessage(message, transfer),
);

onmessage = e => rpcProvider.dispatch(e.data);

rpcProvider.registerRpcHandler("render", (transformed: string) => render(transformed));

async function render(transpiled: string) {
  const appId = md5(transpiled);
  const App = await (appFactory(transpiled));
  const rootDiv = document.createElement("div");
  divs[appId] = rootDiv;
  const root = createRoot(rootDiv);
  root.render(<App appId={appId}></App>);

  while (true) {
    await wait(50);
    const html = rootDiv.innerHTML;
    const css = mineFromCaches(globalThis.eCaches[appId]);
    if (html) {
      return { html, css };
    }
  }
}

export const hydrate = async (codeSpace: string, sess?: ICodeSession, port: MessagePort) => {
  if (sess?.i && sess.i === lastI) return;
  if (r) {
    r.unmount();
    r = null;
  }

  if (sess && sess.transpiled) {
    session = startSession(codeSpace, {
      name: user,
      state: sess,
    });
  }

  // requestAnimationFrame(async () => {
  let App;
  const rt = document.getElementById("root")!;

  if (sess && sess.i && sess.html && sess.transpiled) {
    const { i, css, html, transpiled } = sess;
    rt?.setAttribute("data-i", String(i));
    rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
      `css`,
    );
  }
  const i = rt?.getAttribute("data-i") || 1;
  lastI = +i;

  App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`))
    .default;

  root = document.getElementById(
    codeSpace + "-css",
  ) as unknown as HTMLDivElement;

  if (!root) {
    document.getElementById("root")!.innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
    root = document.getElementById(
      codeSpace + "-css",
    ) as unknown as HTMLDivElement;
  }
  if (!r) {
    const cache = createCache({
      key: sess?.transpiled ? md5(sess?.transpiled) : "css",
      speedy: false,
    });
    cache.compat = undefined;
    r = createRoot(root);
    r.render(
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh, no!!!</div>
            <pre>{error.message}</pre>
          </div>
        )}
      >
        <CacheProvider key={cache.key} value={cache}>
          <App />
        </CacheProvider>
      </ErrorBoundary>,
    );
    if (sess && sess.transpiled) {
      requestAnimationFrame(() => {
        const html = root.innerHTML;
        const css = mineFromCaches(cache);
        // const fromState = sess;
        const newSt = { ...sess, html, css };
        const message = makePatch(
          newSt,
        );
        if (!message) return;
        port.postMessage({
          newHash: message.newHash,
          oldHash: message.oldHash,
          patch: message.patch,
          codeSpace,
          reversePatch: message.reversePatch,
          name: (message.oldHash + message.newHash).slice(4, 12),
          i: sess!.i,
          sess: newSt,
        });

        console.log({ html, css });
      });
    }
  }
};

function mineFromCaches(cache: EmotionCache) {
  const key = cache.key;
  try {
    return Array.from(
      document.querySelectorAll(`style[data-emotion="${cache.key}"]`),
    ).map((x) => x.textContent).join(
      "\n",
    );
  } catch {
    // const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
    return Array.from(document.styleSheets).map((x) => {
      try {
        return x.cssRules[0] as CSSPageRule;
      } catch {
        return null;
      }
    }).filter((x) => x && x.selectorText && x.selectorText.indexOf(key) !== -1)
      .map((x) => x!.cssText)
      // .filter((x) => x && keys.includes(x.selectorText)).map((x) => x!.cssText)
      .join("\n");
  }
}
