import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";

import { formatCode } from "./components/editorUtils";
import { connect, transpile } from "./shared";

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

  // mod.cssIds = getCssStr(data.html);
  // } else {
  // mod.i = data.i;
  // }
};

class Code {
  session: ICodeSession;
  head: string;
  user: string;
  ignoreUsers: string[] = [];
  waiting: (() => boolean)[] = [];
  buffy: Promise<void>[] = [];
  private controller = new AbortController();

  constructor() {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${codeSpace} user`)
      || md5(self.crypto.randomUUID());

    this.init();
  }

  async setCode(rawCode: string) {
    this.controller.abort();
    this.controller = new AbortController();
    const { signal } = this.controller;
    let code = rawCode;

    if (code === this.session.code) return;
    try {
      code = await formatCode(rawCode, signal);
    } catch (error) {
      console.error("Error formatting code:", error);
      throw error;
    }

    if (this.session.code === code) return;

    if (signal.aborted) return;
    let transpiled = "";

    try {
      transpiled = await transpile({
        code,
        originToUse: location.origin,
      });

      const counter = ++this.session.i;
      this.session.code = code;
      this.session.transpiled = transpiled;

      let resolve: (v: {
        i: number;
        html: string;
        css: string;
      }) => void;
      const promise = new Promise<{ i: number; html: string; css: string }>(
        (_resolve, _reject) => {
          resolve = _resolve;
          setTimeout(() => {
            if (signal.aborted) return resolve({ i: counter, html: "", css: "" });
          }, 3000);
        },
      );

      window.onmessage = (ev) => {
        const data: { i: number; html: string; css: string } = ev.data;

        const { i, html, css } = data;
        if (i === counter) {
          resolve({ i, html, css });
        }
      };

      console.log("Sending message iframe first to calculate css", counter);
      if (signal.aborted) return false;

      document.querySelector("iframe")?.contentWindow?.postMessage({
        ...this.session,
        html: "",
        css: "",
        sender: "Runner / Editor",
      });

      const res = await promise;

      if (signal.aborted) return false;

      const { i, html, css } = res;

      if (html.includes("Oops! Something went wrong")) {
        console.error("Error in runner: no html");

        return false;
      }

      console.log("Sending message to BC", i);

      this.session.html = html;
      this.session.css = css;
      const toPost = {
        ...this.session,
        sender: "Editor",
      };
      console.log("Sending message to BC", toPost);

      BC.postMessage(toPost);

      this.controller.abort();
      console.log("Runner succeeded");
      return true;
    } catch (error) {
      console.error("Error transpiling code:", error);
      throw error;
    }
  }

  async init() {
    try {
      const response = await fetch(`/live/${codeSpace}/session.json`);
      const data: ICodeSession = await response.json();
      this.session = makeSession(data);
    } catch (error) {
      console.error("Error fetching session data:", error);
      // Use default session data for testing environment
      this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    }
  }

  async run() {
    if (location.pathname === `/live/${codeSpace}`) {
      connect(`${codeSpace} ${this.user}`);

      const { renderPreviewWindow } = await import("./renderPreviewWindow");
      renderPreviewWindow({ codeSpace });
    }
  }
}

if (!globalThis.cSess) {
  globalThis.cSess = new Code();
}

export const { cSess } = globalThis;

export const sess = cSess.session;

export const run = () => cSess.run();
