// CodeSession.ts

import { formatCodeAsSection } from "@/lib/chat-utils";
import type { ICode, ICodeSession, ImageData } from "@/lib/interfaces";
import { makeHash, makeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import {
  formatCode as formatCodeUtil,
  runCode as runCodeUtil,
  screenShot,
  transpileCode as transpileCodeUtil,
} from "../components/editorUtils";
import { wait } from "../wait";

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
  /**
   * Processes the code by formatting, transpiling, and running it.
   * @param rawCode - The raw code to process.
   * @param skipRunning - Whether to skip running the code.
   * @param counter - The current session counter.
   * @param cacheBust - Whether to cache bust during transpilation.
   * @param signal - Optional AbortSignal to cancel the processing.
   * @returns The processed code session or false if processing was aborted or failed.
   */
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

      try {
        const codeToRun = transpiledCode;
        const res = await this.runCode(codeToRun, signal);
        if (signal?.aborted) return false;

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
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCodeUtil(code);
      if (!transpiled) {
        throw new Error("Transpilation resulted in empty output");
      }
      return transpiled;
    } catch (error) {
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

  private setCodeController: AbortController | null = null;

  constructor(private codeSpace: string) {
    this.user = localStorage.getItem(`${this.codeSpace} user`) || md5(crypto.randomUUID());
    this.broadcastChannel = new BroadcastChannel(`${location.origin}/live/${this.codeSpace}/`);
    this.models.set(this.codeSpace, this); // Add self to models map
  }

  /**
   * Initializes the code session.
   * @param code - Optional initial code.
   * @returns The initialized code session.
   */
  async init(code: string = ""): Promise<ICodeSession> {
    this.session = await this.initialize(code);

    this.releaseWorker = await connect({
      signal: `${this.codeSpace} ${this.user}`,
      sess: this.session,
    });

    this.broadcastChannel.onmessage = ({ data }: MessageEvent<BroadcastMessage>) => {
      if (data.i > this.session.i) {
        this.session = data;
        this.broadcastSessionChange();
      }
    };

    return this.session;
  }

  /**
   * Initializes the code session, fetching existing session data if available.
   * @param code - Optional initial code.
   * @returns The initialized code session.
   */
  private async initialize(code: string = ""): Promise<ICodeSession> {
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

  /**
   * Sets the code and processes it.
   * If a previous processing is in progress, it will be aborted.
   * @param rawCode - The new code to set.
   * @param skipRunning - Whether to skip running the code.
   * @param cacheBust - Whether to cache bust during transpilation.
   * @returns The processed code or false if processing failed.
   */
  async setCode(
    rawCode: string,
    skipRunning = false,
    cacheBust = false,
  ): Promise<string | boolean> {
    if (rawCode === this.session.code) return true;

    // Abort any previous processing
    if (this.setCodeController) {
      this.setCodeController.abort();
    }
    this.setCodeController = new AbortController();
    const { signal } = this.setCodeController;

    const processedSession = await this.codeProcessor.process(
      rawCode,
      skipRunning,
      this.session.i + 1,
      cacheBust,
      signal,
    );
    if (!processedSession) return false;

    this.session = processedSession;
    this.broadcastSessionChange();
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);

    return this.session.code;
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

        if (!success) {
          errors.push(`Failed to update code for ${codeSpace}`);
        }
      }
    }

    await wait(200);
    this.session.i++;
    this.session = makeSession({
      ...this.session,
      transpiled: (await transpileCodeUtil(this.session.code))
        + "\n\n\n\n\n"
        + `const cacheBust4=${this.session.i};`,
    });

    this.broadcastSessionChange();

    return errors.join("\n");
  }

  /**
   * Generates the current code along with any extra models as a formatted string.
   * @returns The formatted code string including extra models.
   */
  async currentCodeWithExtraModels(): Promise<string> {
    const extraModels = await fetchAndCreateExtraModels(this.session.code, location.origin);

    const extraCodeSections = Object.entries(extraModels)
      .filter(([codeSpace]) => codeSpace !== this.codeSpace)
      .map(([codeSpace, code]) => formatCodeAsSection(codeSpace, code));

    const currentCodeSection = formatCodeAsSection(this.codeSpace, this.session.code);

    return [currentCodeSection, ...extraCodeSections].join("\n");
  }

  /**
   * Broadcasts the session change to subscribers and through the BroadcastChannel.
   */
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

  /**
   * Subscribes to session changes.
   * @param callback - The callback to invoke when the session changes.
   */
  sub(callback: (session: ICodeSession) => void): void {
    this.subscribers.push(callback);
  }

  /**
   * Releases resources associated with the Code instance.
   */
  async release(): Promise<void> {
    this.releaseWorker();
    this.broadcastChannel.close();
  }

  /**
   * Takes a screenshot of the current code.
   * @returns The image data of the screenshot.
   */
  screenShot(): Promise<ImageData> {
    return screenShot();
  }

  /**
   * Runs the code by initializing the session.
   */
  async run(): Promise<void> {
    await this.init();
  }
}
