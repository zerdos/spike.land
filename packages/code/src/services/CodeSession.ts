// CodeSession.ts

import type { ICode, ICodeSession, ImageData } from "@/lib/interfaces";
import { makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import { hash } from "immutable";
import {
  formatCode as formatCodeUtil,
  runCode as runCodeUtil,
  screenShot,
  transpileCode as transpileCodeUtil,
} from "../components/editorUtils";
import { CodeSessionBC } from "./CodeSessionBc";

async function fetchAndCreateExtraModels(
  code: string,
  origin: string,
  extraModels: Record<string, string> = {},
): Promise<Record<string, string>> {
  const patterns = [
    ` from "(${origin})/live/[\\w\\-]+"`,
    ` from "\\./(?!@/)[\\w\\-]+"`,
    ` from "/live/[\\w\\-]+"`,
  ];

  const regex = new RegExp(patterns.join("|"), "gm");
  const matches = code.matchAll(regex);

  for (const match of matches) {
    const matchedPath = match[0];
    const codeSpace = matchedPath.split("/").pop()?.replace(/"$/, "");
    if (!codeSpace || extraModels[codeSpace]) continue;

    const extraModelUrl = new URL(`/live/${codeSpace}/index.tsx`, origin).toString();
    const response = await fetch(extraModelUrl);
    const fetchedCode = await response.text();

    extraModels[codeSpace] = fetchedCode;
    await fetchAndCreateExtraModels(fetchedCode, origin, extraModels);
  }

  return extraModels;
}

interface BroadcastMessage extends ICodeSession {
  sender: string;
}

class CodeProcessor {
  async process(
    rawCode: string,
    skipRunning: boolean = false,
    counter: number,
    _cacheBust = false,
    signal: AbortSignal,
  ): Promise<ICodeSession | false> {
    try {
      const formattedCode = await this.formatCode(rawCode);
      if (signal?.aborted) return false;

      const transpiledCode = await this.transpileCode(formattedCode);
      if (signal?.aborted) return false;

      let html = "<div></div>";
      let css = "";

      if (!skipRunning) {
        try {
          const res = await this.runCode(transpiledCode, signal);
          if (signal?.aborted) return false;

          if (res) {
            html = res.html;
            css = res.css;
          }
        } catch (error) {
          console.error("Error running code:", error);
        }
      }

      if (signal?.aborted) return false;

      return {
        code: formattedCode,
        transpiled: transpiledCode,
        html,
        css,
        i: counter,
      };
    } catch (error) {
      console.error("Error processing code:", error);
      return false;
    }
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return await formatCodeUtil(code);
    } catch (error) {
      console.error("Error formatting code:", { code });
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCodeUtil(code);
      if (!transpiled) {
        console.log("Error Transpiled code:", { code });
        throw new Error("Transpilation resulted in empty output");
      }
      return transpiled;
    } catch (error) {
      console.log("Error Transpiled code:", { code });
      throw new Error(`Error transpiling code: ${error}`);
    }
  }

  private async runCode(code: string, signal: AbortSignal): Promise<{ html: string; css: string }> {
    try {
      const result = await runCodeUtil(code, signal);
      if (!result) {
        if (signal.aborted) return { html: "", css: "" };
        throw new Error("Running code produced no output");
      }
      return result;
    } catch (error) {
      if (signal.aborted) return { html: "", css: "" };
      console.error("Error running code:", { code });
      throw new Error(`Error running code: ${error}`);
    }
  }
}

export class Code implements ICode {
  session: ICodeSession;
  private user: string;
  private broadcastedCounter = 0;
  private broadcastChannel: CodeSessionBC;

  private broadcastMd5 = "";

  private subscribers: Array<(session: ICodeSession) => void> = [];
  private codeProcessor = new CodeProcessor();
  private releaseWorker: () => void = () => {};
  private models: Map<string, Code> = new Map();
  private setCodeController: AbortController | null = null;

  constructor(private codeSpace: string) {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.user = localStorage.getItem(`${this.codeSpace} user`) || md5(crypto.randomUUID());
    this.broadcastChannel = new CodeSessionBC(codeSpace);
    this.models.set(this.codeSpace, this);
  }

  async init(): Promise<ICodeSession> {
    this.session = await this.broadcastChannel.init();

    this.releaseWorker = await connect({
      signal: `${this.codeSpace} ${this.user}`,
      sess: this.session,
    });

    this.broadcastChannel.sub(() => {
      return (data: ICodeSession) => {
        if (data.i > this.session.i) {
          this.session = data;
          this.broadcastSessionChange();
        }
      };
    });

    return this.session;
  }

  async setCode(
    rawCode: string,
    skipRunning = false,
    cacheBust = false,
  ): Promise<string> {
    if (rawCode === this.session.code) return this.session.code;

    if (this.setCodeController) {
      this.setCodeController.abort();
    }
    this.setCodeController = new AbortController();
    const { signal } = this.setCodeController;
    const counter = this.session.i;

    const processedSession = await this.codeProcessor.process(
      rawCode,
      skipRunning,
      counter,
      cacheBust,
      signal,
    );
    if (!processedSession || signal.aborted) return this.session.code;

    const session = makeSession(processedSession);
    if (hash(session) === hash(this.session)) return this.session.code;

    this.session = makeSession({ ...session, i: this.session.i + 1 });

    this.broadcastSessionChange();
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);

    return this.session.code;
  }

  async setModelsByCurrentCode(newCodes: string): Promise<string> {
    const sections = newCodes.split(/^#\s+/gm).filter(Boolean);
    const errors: string[] = [];

    for (const section of sections) {
      const lines = section.trim().split("\n");
      const codeSpaceLine = lines.shift();
      if (!codeSpaceLine) continue;

      const codeSpaceMatch = codeSpaceLine.match(/^([\w\-\.]+)\.tsx$/);
      if (!codeSpaceMatch) continue;
      const codeSpace = codeSpaceMatch[1];

      const codeContentMatch = lines.join("\n").match(/```tsx\s*([\s\S]*?)\s*```/m);
      if (!codeContentMatch) continue;
      const codeContent = codeContentMatch[1];

      let codeInstance = this.models.get(codeSpace);
      if (!codeInstance) {
        codeInstance = new Code(codeSpace);
        await codeInstance.init();
        this.models.set(codeSpace, codeInstance);
      }

      if (codeInstance.session.code !== codeContent) {
        const updatedCode = await codeInstance.setCode(
          codeContent + "\n\n\n",
          codeSpace !== this.codeSpace,
          true,
        );

        if (updatedCode !== codeContent + "\n\n\n") {
          errors.push(`Failed to update code for ${codeSpace}`);
        }
      }
    }

    this.session = makeSession({
      ...this.session,
      transpiled: (await transpileCodeUtil(this.session.code))
        + "\n\n\n\n\n"
        + `const cacheBust4=${this.session.i};`,
    });

    this.broadcastSessionChange();

    return errors.join("\n");
  }

  async currentCodeWithExtraModels(): Promise<string> {
    const extraModels = await fetchAndCreateExtraModels(this.session.code, location.origin);

    const extraCodeSections = Object.entries(extraModels)
      .filter(([codeSpace]) => codeSpace !== this.codeSpace)
      .map(([codeSpace, code]) => this.formatCodeAsSection(codeSpace, code));

    const currentCodeSection = this.formatCodeAsSection(this.codeSpace, this.session.code);

    return [currentCodeSection, ...extraCodeSections].join("\n");
  }

  private formatCodeAsSection(codeSpace: string, code: string): string {
    return `# ${codeSpace}.tsx\n\n\`\`\`tsx\n${code}\n\`\`\`\n`;
  }

  private broadcastSessionChange(): void {
    if (this.broadcastedCounter >= this.session.i) return;
    this.broadcastedCounter = this.session.i;

    const broadcastMd5 = md5(this.session.transpiled);
    if (this.broadcastMd5 === broadcastMd5) return;

    this.broadcastMd5 = broadcastMd5;

    this.subscribers.forEach((cb) => setTimeout(() => cb(this.session)));
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);
  }

  sub(callback: (session: ICodeSession) => void): void {
    this.subscribers.push(callback);
  }

  async release(): Promise<void> {
    this.releaseWorker();
    this.broadcastChannel.close();
  }

  screenShot(): Promise<ImageData> {
    return screenShot();
  }

  async run(): Promise<void> {
    await this.init();
  }
}
