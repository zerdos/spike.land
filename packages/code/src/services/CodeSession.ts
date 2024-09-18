import type { ICode, ICodeSession, ImageData } from "@/lib/interfaces";
import { makeHash, makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import { formatCode, runCode, screenShot, transpileCode } from "../components/editorUtils";

async function fetchAndCreateExtraModels(
  code: string,
  originToUse: string,
) {
  const search = new RegExp(
    ` from "(${originToUse})/live/[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models = code.matchAll(search);

  const search2 = new RegExp(
    ` from "./[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models2 = code.matchAll(search2);

  const search3 = new RegExp(
    ` from "/live/[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models3 = code.matchAll(search3);

  const extraModels: {
    [key: string]: string;
  } = {};

  for (const match of [...models, ...models2, ...models3]) {
    const codeSpace = match[0].split("/").pop()!;
    const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse)
      .toString();

    const res = await fetch(extraModel);
    code = await res.text();
    extraModels[codeSpace] = code;
  }

  return extraModels;
}

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
      const formattedCode = await this.formatCode(rawCode);
      if (signal.aborted) return false;

      const transpiled = await this.transpileCode(formattedCode);
      if (signal.aborted) return false;

      const { html, css } = await this.runCode(transpiled);
      if (signal.aborted) return false;

      return { code: formattedCode, transpiled, html, css, i: Date.now() };
    } catch (error) {
      console.error("Error processing code:", error);
      return false;
    }
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return await formatCode(code);
    } catch (error) {
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCode(code);
      if (!transpiled) throw new Error("Transpilation resulted in empty output");
      return transpiled;
    } catch (error) {
      throw new Error(`Error transpiling code: ${error}`);
    }
  }

  private async runCode(transpiled: string): Promise<{ html: string; css: string }> {
    try {
      const res = await runCode(transpiled);
      if (!res) throw new Error("Running code produced no output");
      return res;
    } catch (error) {
      throw new Error(`Error running code: ${error}`);
    }
  }
}

const toString = (codeSpace: string, code: string) =>
  `# ${codeSpace}.tsx

\`\`\`tsx
${code}
\`\`\`

`;

export class Code implements ICode {
  session: ICodeSession;
  head: string;
  user: string;
  private broadcastedCounter = 0;
  private BC: BroadcastChannel;
  private subs: ((sess: ICodeSession) => void)[] = [];
  private codeProcessor: CodeProcessor;
  private releaseWorker = () => {};

  constructor(private codeSpace: string) {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${this.codeSpace} user`) || md5(self.crypto.randomUUID());
    this.BC = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);
    this.codeProcessor = new CodeProcessor();
  }
  async currentCodeWithExtraModels() {
    const extraModels = await fetchAndCreateExtraModels(this.session.code, location.origin);

    const filesToMdx = Object.entries(extraModels).map(([codeSpace, code]) => toString(codeSpace, code));
    const currentCode = toString(this.codeSpace, this.session.code);

    return [currentCode, ...filesToMdx].join("\n");
  }
  // destructor
  async release() {
    this.releaseWorker();
    this.BC.close();
  }
  screenShot() {
    return screenShot() as Promise<ImageData>;
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
