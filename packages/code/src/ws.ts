import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";

import { EmotionCache } from "@emotion/cache";
import { Mutex } from "async-mutex";
import { formatCode, runCode, transpileCode } from "./components/editorUtils";
import { ICode } from "./cSess.interface";
import { connect, prettierCss } from "./shared";
import { mineFromCaches } from "./utils/mineCss";
import { wait } from "./wait";
import { renderApp, renderedAPPS } from "./Wrapper";

// Initialize global state for first render
globalThis.firstRender = globalThis.firstRender
  || { html: "", css: "", code: "" };

const codeSpace = useCodeSpace();

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

BC.onmessage = ({ data }) => {
  // if (data.i > mod.i) {

  cSess.session.code = data.code;
  cSess.session.i = data.i;
  cSess.session.html = data.html;
  cSess.session.css = data.css;
  cSess.session.transpiled = data.transpiled;

  if (cSess.session.i > cSess.broadcastedCounter) {
    cSess.broadCastSessChanged();
  }

  // mod.cssIds = getCssStr(data.html);
  // } else {
  // mod.i = data.i;
  // }
};

class Code implements ICode {
  session: ICodeSession;
  head: string;
  user: string;
  broadcastedCounter = 0;

  ignoreUsers: string[] = [];
  waiting: (() => boolean)[] = [];
  buffy: Promise<void>[] = [];
  private controller = new AbortController();
  private subs: ((sess: ICodeSession) => void)[] = [];
  constructor() {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${codeSpace} user`)
      || md5(self.crypto.randomUUID());
  }

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
  }

  broadCastSessChanged() {
    this.broadcastedCounter = this.session.i;
    this.subs.forEach(cb => cb(this.session));
  }

  async setCode(rawCode: string) {
    this.controller.abort();
    this.controller = new AbortController();
    const { signal } = this.controller;
    let code = rawCode;

    if (code === this.session.code) return true;
    console.log("Formatting code");
    try {
      code = await formatCode(code, signal);
    } catch (error) {
      console.error("Error formatting code:", error);
      return false;
    }

    if (this.session.code === code) {
      console.log("After the formatting -  its unchanged!");
      return code;
    }

    if (signal.aborted) return false;
    let transpiled = "";

    console.log("Transpiling code");

    try {
      transpiled = await transpileCode(code, signal);
    } catch (error) {
      console.error("Error transpiling code");
      return false;
    }

    let html = "";
    let css = "";
    if (signal.aborted) return false;
    const i = ++this.session.i;

    try {
      console.log("Running code: " + i);

      const res = await runCode({ i, code, transpiled }, signal);
      if (signal.aborted) return false;

      if (res) {
        html = res.html;
        css = res.css;
      } else {
        console.error("Error running the code, no error");
        return false;
      }
    } catch (e) {
      console.error("Error running the code", e);
      return false;
    }

    console.log("Sending message to BC: ", i);
    if (signal.aborted) return false;

    this.session = makeSession({
      code,
      i,
      transpiled,
      html,
      css,
    });

    if (signal.aborted) return false;
    console.log("Sending message to BC", this.session);

    BC.postMessage({
      ...this.session,
      sender: "Editor",
    });

    this.controller.abort();
    // this.broadCastSessChanged();
    console.log("Runner succeeded");
    return this.session.code;
  }

  async init() {
    try {
      const response = await fetch(`/live/${codeSpace}/session.json`);
      const data: ICodeSession = await response.json();
      return makeSession(data);
    } catch (error) {
      console.error("Error fetching session data:", error);
      // Use default session data for testing environment
      return makeSession({ i: 0, code: "", html: "", css: "" });
    }
  }

  async run() {
    this.session = await this.init();
    if (location.pathname === `/live/${codeSpace}`) {
      connect({ signal: `${codeSpace} ${this.user}`, sess: this.session });
    }
  }
}

export const cSess = new Code();
await cSess.run();

export const run = async () => {
  const { renderPreviewWindow } = await import("./renderPreviewWindow");
  renderPreviewWindow({ codeSpace, cSess });
};

(() => {
  try {
    cSess.sub((sess: ICodeSession) => {
      const { i, code, transpiled } = sess;
      console.table({ i, code, transpiled });
    });
  } catch (error) {
    console.error("Error in cSess subscription:", error);
  }
})();

export const handleDehydratedPage = () => {
  try {
    cSess.sub((sess: ICodeSession) => {
      const { html, css } = sess;

      const root = document.getElementById("root");

      if (root && html && css) {
        root.innerHTML = `<style>${css}</style><div>${html}</div>`;
      }
    });
  } catch (error) {
    console.error("Error handling dehydrated page:", error);
  }
};

const handleRender = async (
  rootEl: HTMLDivElement,
  cache: EmotionCache,
  signal: AbortSignal,
  mod: {
    counter: number;
    code: string;
    transpiled: string;
    controller: AbortController;
  },
) => {
  try {
    console.log("handleRender");
    const counter = mod.counter;

    if (!rootEl) return false;

    for (let attempts = 100; attempts > 0; attempts--) {
      if (signal.aborted) return false;
      const html = rootEl.innerHTML;
      if (html) {
        let css = mineFromCaches(cache, html);

        const criticalClasses = css.split("\n").map((line) => {
          const rule = line.slice(1, 12);
          if (html.includes(rule)) return rule;
          return null;
        }).filter((rule): rule is string => rule !== null);
        console.log({ criticalClasses });

        // filter all the css for the critical classes

        css = css.split("\n").filter((line) => {
          return criticalClasses.some((rule) => line.includes(rule));
        }).join("\n");

        try {
          console.log("Prettifying CSS");
          if (css) css = await prettierCss(css);
        } catch (error) {
          console.error("Error prettifying CSS:", error);
        }

        if (mod.counter !== counter) return false;
        return { css, html };
      }
      await wait(100);
    }
    return false;
  } catch (error) {
    console.error("Error in handleRender:", error);
    return false;
  }
};

export const handleDefaultPage = async () => {
  try {
    const mod = { ...cSess.session, counter: cSess.session.i, controller: new AbortController() };

    const mutex = new Mutex();

    cSess.sub((sess: ICodeSession) => {
      try {
        const { transpiled } = sess;

        const myEl = document.createElement("div")! as HTMLDivElement;
        myEl.style.height = "100%";
        myEl.style.width = "100%";
        myEl.style.display = "none";
        document.body.appendChild(myEl);

        renderApp({
          transpiled,
          rootElement: myEl,
        });

        const root = document.getElementById("root");
        renderedAPPS.get(root!)!.cleanup();
        myEl.style.display = "block";
        myEl.id = "root";
      } catch (error) {
        console.error("Error in cSess subscription:", error);
      }
    });

    window.onmessage = async ({ data }) => {
      try {
        const { i, transpiled } = data;

        if (!i || !transpiled) return;

        if (mod.counter >= i) return;

        mod.counter = i;
        mod.controller.abort();
        const { signal } = (mod.controller = new AbortController());

        if (signal.aborted) return false;

        await mutex.runExclusive(async () => {
          if (signal.aborted) return;

          const myEl = document.createElement("div")! as HTMLDivElement;
          myEl.style.height = "100%";
          myEl.style.width = "100%";
          myEl.style.display = "none";
          document.body.appendChild(myEl);

          const rendered = await renderApp({ rootElement: myEl, transpiled });
          await wait(300);

          const cleanupAndRemove = () => {
            try {
              rendered?.cleanup?.();
              document.body.removeChild(myEl);
              myEl.remove();
            } catch (e) {
              console.error(e);
            }
            return false;
          };

          if (signal.aborted) return cleanupAndRemove();

          await wait(100);

          if (signal.aborted) return cleanupAndRemove();

          const res = await handleRender(
            myEl,
            rendered?.cssCache!,
            signal,
            mod,
          );

          if (res === false) {
            if (signal.aborted) return cleanupAndRemove();
          } else {
            const { css, html } = res;
            if (html === "<div style=\"width: 100%; height: 100%;\"></div>") {
              return rendered?.cleanup();
            }

            window.parent.postMessage({ i, css, html }, "*");

            const old = document.getElementById("root")!;
            renderedAPPS!.get(old!)!.cleanup();
            myEl.style.display = "block";
            document.body.removeChild(old);

            old.remove();

            myEl.id = "root";
          }
        });
      } catch (error) {
        console.error("Error in window.onmessage handler:", error);
      }
      return false;
    };
  } catch (error) {
    console.error("Error in handleDefaultPage:", error);
  }
};
