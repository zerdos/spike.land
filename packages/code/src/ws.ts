import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";

import { formatCode, runCode, transpileCode } from "./components/editorUtils";
import { connect } from "./shared";

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

class Code {
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

    this.init();
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
      code = await formatCode(rawCode, signal);
    } catch (error) {
      console.error("Error formatting code:", error);
      return false;
    }

    if (this.session.code === code) return true;

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
    return true;
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
