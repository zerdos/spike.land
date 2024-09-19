// CodeSession.ts

import { formatCodeAsSection } from "@/lib/chat-utils";
import type { ICode, ICodeSession, ImageData } from "@/lib/interfaces";
import { makeHash, makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import { formatCode, runCode, screenShot, transpileCode } from "../components/editorUtils";

/**
 * Recursively fetches and collects code from import statements in the provided code.
 * @param code - The code to search for import statements.
 * @param origin - The base origin URL to use for fetching.
 * @param extraModels - A map to store fetched code modules.
 * @returns A map of code modules keyed by their code space.
 */
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
  private controller = new AbortController();

  async process(
    rawCode: string,
    skipRunning: boolean,
    counter: number,
    cacheBust = false,
  ): Promise<ICodeSession | false> {
    this.controller.abort();
    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      const formattedCode = await this.formatCode(rawCode);
      if (signal.aborted) return false;

      const transpiledCode = await this.transpileCode(formattedCode);

      if (signal.aborted) return false;

      let html = "<div></div>";
      let css = "";

      try {
        const res = await this.runCode(
          cacheBust ? transpileCode + "\n\n" + `const cacheBust=${Date.now()};` : transpiledCode,
        );
        if (res) {
          html = res.html;
          css = res.css;
        }
      } catch (error) {
        if (skipRunning) {
          console.error("Error running code, but skipRunning:", {
            formattedCode,
            transpiledCode,
            error,
          });
        } else {
          throw new Error(`Error running code: ${error}`);
        }
      }
      if (signal.aborted) return false;

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
      return await formatCode(code);
    } catch (error) {
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCode(code);
      if (!transpiled) {
        throw new Error("Transpilation resulted in empty output");
      }
      return transpiled;
    } catch (error) {
      throw new Error(`Error transpiling code: ${error}`);
    }
  }

  private async runCode(code: string): Promise<{ html: string; css: string }> {
    try {
      const result = await runCode(code);
      if (!result) {
        throw new Error("Running code produced no output");
      }
      return result;
    } catch (error) {
      throw new Error(`Error running code: ${error}`);
    }
  }
}

export class Code implements ICode {
  session: ICodeSession = makeSession({ i: 0, code: "", html: "", css: "" });
  head: string = makeHash(this.session);
  user: string;
  private broadcastedCounter = 0;
  private broadcastChannel: BroadcastChannel;
  private subscribers: Array<(session: ICodeSession) => void> = [];
  private codeProcessor = new CodeProcessor();
  private releaseWorker: () => void = () => {};
  private models: Map<string, Code> = new Map();

  constructor(private codeSpace: string) {
    this.user = localStorage.getItem(`${this.codeSpace} user`)
      || md5(crypto.randomUUID());
    this.broadcastChannel = new BroadcastChannel(
      `${location.origin}/live/${this.codeSpace}/`,
    );
    this.models.set(this.codeSpace, this); // Add self to models map
  }

  /**
   * Generates the current code along with any extra models as a formatted string.
   * @returns The formatted code string including extra models.
   */
  async currentCodeWithExtraModels(): Promise<string> {
    const extraModels = await fetchAndCreateExtraModels(
      this.session.code,
      location.origin,
    );

    const extraCodeSections = Object.entries(extraModels)
      .filter(([codeSpace]) => codeSpace !== this.codeSpace)
      .map(([codeSpace, code]) => formatCodeAsSection(codeSpace, code));

    const currentCodeSection = formatCodeAsSection(
      this.codeSpace,
      this.session.code,
    );

    return [currentCodeSection, ...extraCodeSections].join("\n");
  }

  /**
   * Parses the provided code string to extract code spaces and their code content.
   * Updates the code for each code space if it has changed.
   * @param newCodes - The code string containing multiple code spaces and their code content.
   */
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

      // Check if the code has changed
      if (codeInstance.session.code !== codeContent) {
        const success = await codeInstance.setCode(
          codeContent + "\n\n\n",
          codeSpace !== this.codeSpace,
          true,
        );

        if (success && this.codeSpace !== codeSpace) {
          this.session.i++;
          this.broadcastSessionChange();
        }

        if (!success) {
          errors.push(`Failed to update code for ${codeSpace}`);
        }
      }
    }

    return errors.join("\n");
  }

  async release(): Promise<void> {
    this.releaseWorker();
    this.broadcastChannel.close();
  }

  screenShot(): Promise<ImageData> {
    return screenShot();
  }

  sub(callback: (session: ICodeSession) => void): void {
    this.subscribers.push(callback);
  }

  private broadcastSessionChange(): void {
    if (this.broadcastedCounter >= this.session.i) return;
    this.broadcastedCounter = this.session.i;
    this.subscribers.forEach((cb) => setTimeout(() => cb(this.session)));
    this.broadcastChannel.postMessage({
      ...this.session,
      transpiled: this.session.transpiled + "\n\n\n\n\n" + `const cacheBust=${this.session.i};`,
      sender: "Editor",
    } as BroadcastMessage);
  }

  async setCode(rawCode: string, skipRunning = false, cacheBust = false): Promise<string | boolean> {
    if (rawCode === this.session.code) return true;

    const processedSession = await this.codeProcessor.process(rawCode, skipRunning, this.session.i + 1, cacheBust);
    if (!processedSession) return false;

    this.session = processedSession;
    this.broadcastSessionChange();
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);

    return this.session.code;
  }

  private async initialize(code: string = ""): Promise<ICodeSession> {
    this.broadcastChannel.onmessage = ({ data }: MessageEvent<BroadcastMessage>) => {
      if (data.i > this.session.i) {
        this.session = data;
        this.broadcastSessionChange();
      }
    };

    try {
      if (code && code.length > 0) {
        return makeSession({ i: 0, code: code + "\n\n\n\n\n", html: "", css: "" });
      }

      const response = await fetch(`/live/${this.codeSpace}/session.json`);
      const sessionData = await response.json();
      return makeSession(sessionData);
    } catch (error) {
      console.error("Error fetching session data:", error);
      return makeSession({ i: 0, code: "", html: "", css: "" });
    }
  }

  async init(code: string = ""): Promise<ICodeSession> {
    this.session = await this.initialize(code);

    this.releaseWorker = await connect({
      signal: `${this.codeSpace} ${this.user}`,
      sess: this.session,
    });
    return this.session;
  }

  async run(): Promise<void> {
    await this.init();
  }
}
