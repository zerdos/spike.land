import { useCodeSpace } from "@/hooks/use-code-space";
import { makeHash, makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";

import { ICodeSession } from "@/lib/interfaces";
import { connect } from "@/lib/shared";
import { formatCode, runCode, transpileCode } from "../components/editorUtils";
import { ICode } from "../cSess.interface";

export class Code implements ICode {
  session: ICodeSession;
  head: string;
  user: string;
  broadcastedCounter = 0;
  codeSpace = useCodeSpace();
  private BC = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);

  ignoreUsers: string[] = [];
  waiting: (() => boolean)[] = [];
  buffy: Promise<void>[] = [];
  private controller = new AbortController();
  private subs: ((sess: ICodeSession) => void)[] = [];
  constructor() {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${this.codeSpace} user`)
      || md5(self.crypto.randomUUID());
  }

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
  }

  broadCastSessChanged() {
    if (this.broadcastedCounter >= this.session.i) return;

    this.broadcastedCounter = this.session.i;
    this.subs.forEach(cb => setTimeout(() => cb(this.session)));
  }

  async setCode(rawCode: string) {
    this.controller.abort();
    this.controller = new AbortController();
    const { signal } = this.controller;
    let code = rawCode;

    if (code === this.session.code) return true;
    console.log("Formatting code");
    try {
      code = await formatCode(code);
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
      transpiled = await transpileCode(code);
      if (!transpiled) {
        console.error("Error transpiling code");
        return false;
      }
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

      const res = await runCode(transpiled);
      if (signal.aborted) return false;

      if (res) {
        html = res.html;
        css = res.css;
      } else {
        console.error("Error running the code, no error");
        return false;
      }
    } catch (e) {
      if (signal.aborted) return false;
      console.error("Error running the code", e);
      return false;
    }

    if (signal.aborted) return false;

    console.log("Sending message to BC: ", i);
    this.session = makeSession({
      code,
      i,
      transpiled,
      html,
      css,
    });

    console.log("Sending message to BC", this.session);

    this.broadCastSessChanged();
    this.BC.postMessage({
      ...this.session,
      sender: "Editor",
    });

    console.log("Runner succeeded");
    return this.session.code;
  }

  async init() {
    this.BC.onmessage = ({ data }) => {
      // if (data.i > mod.i) {

      this.session.code = data.code;
      this.session.i = data.i;
      this.session.html = data.html;
      this.session.css = data.css;
      this.session.transpiled = data.transpiled;

      if (this.session.i > this.broadcastedCounter) {
        this.broadCastSessChanged();
      }
    };
    try {
      const response = await fetch(`/live/${this.codeSpace}/session.json`);
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
    if (location.pathname === `/live/${this.codeSpace}`) {
      connect({ signal: `${this.codeSpace} ${this.user}`, sess: this.session });
    }
  }
}
