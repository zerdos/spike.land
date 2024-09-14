import { useCodeSpace } from "@/hooks/use-code-space";
import { ICode, ICodeSession } from "@/lib/interfaces";
import { makeHash, makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import { formatCode, runCode, transpileCode } from "../components/editorUtils";

interface BroadcastMessage extends ICodeSession {
  sender: string;
}

class CodeProcessor {
  private controller: AbortController;

  constructor() {
    this.controller = new AbortController();
  }

  async process(rawCode: string): Promise<ICodeSession | false> {
    this.controller.abort();
    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      const formattedCode = await this.formatCode(rawCode, signal);
      if (signal.aborted) return false;

      const transpiled = await this.transpileCode(formattedCode, signal);
      if (signal.aborted) return false;

      const { html, css } = await this.runCode(transpiled, signal);
      if (signal.aborted) return false;

      return { code: formattedCode, transpiled, html, css, i: Date.now() };
    } catch (error) {
      console.error("Error processing code:", error);
      return false;
    }
  }

  private async formatCode(code: string, signal: AbortSignal): Promise<string> {
    try {
      return await formatCode(code);
    } catch (error) {
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string, signal: AbortSignal): Promise<string> {
    try {
      const transpiled = await transpileCode(code);
      if (!transpiled) throw new Error("Transpilation resulted in empty output");
      return transpiled;
    } catch (error) {
      throw new Error(`Error transpiling code: ${error}`);
    }
  }

  private async runCode(transpiled: string, signal: AbortSignal): Promise<{ html: string; css: string }> {
    try {
      const res = await runCode(transpiled);
      if (!res) throw new Error("Running code produced no output");
      return res;
    } catch (error) {
      throw new Error(`Error running code: ${error}`);
    }
  }
}

export class Code implements ICode {
  session: ICodeSession;
  head: string;
  user: string;
  private broadcastedCounter = 0;
  private codeSpace = useCodeSpace();
  private BC: BroadcastChannel;
  private subs: ((sess: ICodeSession) => void)[] = [];
  private codeProcessor: CodeProcessor;
  private releaseWorker = () => {};

  constructor() {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${this.codeSpace} user`) || md5(self.crypto.randomUUID());
    this.BC = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);
    this.codeProcessor = new CodeProcessor();
  }
  // destructor
  async release() {
    this.releaseWorker();
    this.BC.close();
  }

  sub(fn: (sess: ICodeSession) => void) {
    this.subs.push(fn);
  }

  private broadCastSessChanged() {
    if (this.broadcastedCounter >= this.session.i) return;
    this.broadcastedCounter = this.session.i;
    this.subs.forEach(cb => setTimeout(() => cb(this.session)));
  }

  async setCode(rawCode: string): Promise<string | boolean> {
    if (rawCode === this.session.code) return true;

    const processedSession = await this.codeProcessor.process(rawCode);
    if (!processedSession) return false;

    this.session = processedSession;
    this.broadCastSessChanged();
    this.BC.postMessage({ ...this.session, sender: "Editor" } as BroadcastMessage);

    return this.session.code;
  }

  async init(): Promise<ICodeSession> {
    this.BC.onmessage = ({ data }: MessageEvent<BroadcastMessage>) => {
      if (data.i > this.session.i) {
        this.session = data;
        this.broadCastSessChanged();
      }
    };

    try {
      const response = await fetch(`/live/${this.codeSpace}/session.json`);
      return makeSession(await response.json());
    } catch (error) {
      console.error("Error fetching session data:", error);
      return makeSession({ i: 0, code: "", html: "", css: "" });
    }
  }

  async run() {
    this.session = await this.init();
    if (location.pathname === `/live/${this.codeSpace}`) {
      this.releaseWorker = await connect({ signal: `${this.codeSpace} ${this.user}`, sess: this.session });
    }
  }
}
