// CodeSession.ts

// import { getCodeSpace } from "@/hooks/use
import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
import { computeSessionHash, sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { connect } from "@/lib/shared";
import { wait } from "@/lib/wait";
import { Mutex } from "async-mutex";
import { th } from "date-fns/locale";
import { throttle } from "es-toolkit";
import { send } from "vite";
import {
  formatCode as formatCodeUtil,
  runCode,
  screenShot,
  transpileCode as transpileCodeUtil,
} from "../components/editorUtils";
import { CodeSessionBC } from "./CodeSessionBc";

// Existing utility (unchanged):
const mutex = new Mutex();

/** Utility function to recursively fetch models referenced in code */
async function fetchAndCreateExtraModels(
  code: string,
  origin: string,
  extraModels: Record<string, string> = {},
): Promise<Record<string, string>> {
  const patterns = [
    ` from "(${origin})/live/[\\w-]+"`,
    ` from "\\./((?!@/)[\\w-]+)"`,
    ` from "/live/[\\w-]+"`,
  ];

  const regex = new RegExp(patterns.join("|"), "gm");
  const matches = code.matchAll(regex);

  for (const match of matches) {
    const matchedPath = match[0];
    const codeSpace = matchedPath.split("/").pop()?.replace(/"$/, "");
    if (!codeSpace || extraModels[codeSpace]) {
      continue;
    }
    const extraModelUrl = new URL(`/live/${codeSpace}/index.tsx`, origin).toString();
    const response = await fetch(extraModelUrl);
    const fetchedCode = await response.text();

    extraModels[codeSpace] = fetchedCode;
    // Recursive call to find any further references
    await fetchAndCreateExtraModels(fetchedCode, origin, extraModels);
  }

  return extraModels;
}

// Type for messages broadcast to others
interface BroadcastMessage extends ICodeSession {
  sender: string;
}

// Manages formatting, transpiling, and running code snippets
class CodeProcessor {
  /**
   * Formats and transpiles the code (optionally runs it),
   * then returns updated session info or false on failure.
   */
  async process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
  ): Promise<Partial<ICodeSession> | false> {
    try {
      const formattedCode = await this.formatCode(rawCode);
      if (signal.aborted) return false;

      const transpiledCode = await this.transpileCode(formattedCode);
      if (signal.aborted) return false;

      let html = "<div></div>";
      let css = "";

      if (!skipRunning) {
        try {
          const res = await this.runCode(transpiledCode);
          if (signal.aborted) return false;

          html = res.html || "<div></div>";
          css = res.css || "";
        } catch (error) {
          console.error("Error running code:", error);
        }
      }

      if (signal.aborted) return false;

      return {
        code: formattedCode,
        transpiled: transpiledCode,
        html,
        css,
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

  private async runCode(code: string): Promise<{ html: string; css: string; }> {
    try {
      const result = await runCode(code);
      if (!result) {
        throw new Error("Running code produced no output");
      }
      return result;
    } catch (error) {
      console.error("Error running code:", { code });
      throw new Error(`Error running code: ${error}`);
    }
  }
}

/**
 * Main class that coordinates session state, broadcasting,
 * concurrency for code updates, and references to other code models.
 */
export class Code implements ICode {
  session: ICodeSession;
  private user: string;
  private broadcastChannel: CodeSessionBC;
  private codeProcessor = new CodeProcessor();

  /** Callback to release worker connection */
  private releaseWorker: () => void = () => {};

  /** A cache of Code instances for different codeSpace segments */
  private models = new Map<string, Code>();

  /** Tracks the active code update operation */
  private setCodeController: AbortController | null = null;

  /** True if a code-processing task is active */
  private isRunning = false;

  /** Stores the code if an update is requested while a previous task is running */
  private pendingRun: string | null = null;

  constructor(private codeSpace: string) {
    this.session = sanitizeSession({
      code: "",
      html: "",
      css: "",
      messages: [],
      codeSpace,
      transpiled: "",
    });

    // Determine the user ID (anonymous hashing if needed)
    this.user = localStorage.getItem(`${this.codeSpace} user`) || md5(crypto.randomUUID());
    localStorage.setItem(`${this.codeSpace} user`, this.user);

    // Setup broadcast channel to synchronize with other clients
    this.broadcastChannel = new CodeSessionBC(codeSpace);
    this.broadcastChannel.sub((session) => {
      this.session = session;
    });

    // Store the current instance under its codeSpace
    this.models.set(this.codeSpace, this);
  }

  /**
   * Initializes the session, connects to the worker,
   * and returns the updated session.
   */
  async init(session: ICodeSession | null = null): Promise<ICodeSession> {
    this.session = await this.broadcastChannel.init(session ?? undefined);
    this.releaseWorker = await connect({
      signal: `${this.codeSpace} ${this.user}`,
      sess: this.session,
    });
    return this.session;
  }

  computeSessionHash(session: ICodeSession) {
    return computeSessionHash(session);
  }

  /** Returns the current code safely (mutex-protected) */
  async getCode(): Promise<string> {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
    }
    return this.session.code;
  }

  /**
   * Low-level method to update code+transpiled in session and broadcast changes.
   */
  async setCodeAndTranspiled({
    formatted,
    transpiled,
  }: {
    formatted: string;
    transpiled: string;
  }): Promise<boolean> {
    // If nothing changed, skip
    if (
      this.session.code === formatted &&
      this.session.transpiled === transpiled
    ) {
      return true;
    }

    let session = sanitizeSession({
      ...this.session,
      code: formatted,
      messages: this.session.messages || [],
      transpiled,
    });

    // Attempt to run the code for updated HTML/CSS
    try {
      const { html, css } = (await runCode(transpiled)) || { html: "", css: "" };
      session = sanitizeSession({
        ...session,
        html,
        css,
      });
    } catch (error) {
      console.error("Error running code:", error);
    } finally {
      this.session = session;
      this.broadcastChannel.postMessage({
        ...session,
        sender: "Editor",
      } as BroadcastMessage);
    }

    return true;
  }

  broadcastSession = () => {
    this.broadcastChannel.postMessage({
      ...this.session,
      sender: "Editor",
    } as BroadcastMessage);
  };

  throttleBroadcastSession = throttle(this.broadcastSession, 500, {
    edges: ["leading", "trailing"],
  });

  addMessageChunk: (chunk: string) => void = (
    chunk: string,
  ) => {
    if (this.session.messages.length === 0) {
      this.setMessages([{ id: Date.now().toString(), role: "assistant", content: chunk }]);
      this.broadcastSession();
    } else {
      const lastMessage = this.session.messages[this.session.messages.length - 1];
      lastMessage.content += chunk;
      lastMessage.id = Number(lastMessage.id) + 1 + "";
      this.throttleBroadcastSession();
    }
  };
  /*
   * Replaces session messages if the content has changed,
   * then broadcasts the updated session.
   */
  setMessages(messages: Message[]): boolean {
    console.log("setMessages", { messages });
    const currentMessages = this.session.messages;

    if (messages.length === currentMessages.length) {
      // No changes if both are empty
      if (!messages.length) return false;

      // Compare last messages, then check hashes
      if (
        messages[messages.length - 1].content ===
          currentMessages[currentMessages.length - 1].content
      ) {
        const before = md5(JSON.stringify(currentMessages));
        const after = md5(JSON.stringify(messages));
        if (before === after) return false;
      }
    }

    this.session = sanitizeSession({
      ...this.session,
      messages,
    });

    this.throttleBroadcastSession();
    return true;
  }

  /**
   * Public method to update code. Ensures that only one update runs at a time.
   * If already running, it queues the new request and returns after the current run.
   */
  async setCode(rawCode: string, skipRunning?: boolean): Promise<string | boolean> {
    if (this.isRunning) {
      // If there's an ongoing run, queue this request
      this.pendingRun = rawCode;

      // Wait until the ongoing run completes
      while (this.isRunning) {
        await wait(100);
      }

      // If there's a newer request queued, ignore the older one
      if (this.pendingRun !== rawCode) {
        console.log("Skipping outdated run request");
        return false;
      }
    }

    this.isRunning = true;
    this.pendingRun = null;

    try {
      return await this.updateCodeInternal(rawCode, !!skipRunning);
    } catch (error) {
      console.error("Error setting code:", error);
      return false;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Internal method to perform formatting, transpiling, and optional code running.
   */
  private async updateCodeInternal(
    rawCode: string,
    skipRunning: boolean,
  ): Promise<string> {
    // If new code is the same as existing, return it
    if (rawCode === this.session.code) {
      return this.session.code;
    }

    // Cancel previous controller if it exists
    if (this.setCodeController) {
      this.setCodeController.abort();
    }
    this.setCodeController = new AbortController();

    const { signal } = this.setCodeController;

    const processedSession = await this.codeProcessor.process(
      rawCode,
      skipRunning,
      signal,
    );
    if (!processedSession || signal.aborted) {
      return this.session.code;
    }

    // Merge processed session data
    const newSession = sanitizeSession({ ...this.session, ...processedSession });

    // Check if anything actually changed
    if (
      computeSessionHash(newSession) === computeSessionHash(this.session)
    ) {
      return this.session.code;
    }

    this.session = newSession;

    this.throttleBroadcastSession();

    return this.session.code;
  }

  /**
   * Splits code into named sections (e.g., # mycode.tsx)
   * and updates each known code model.
   */
  async setModelsByCurrentCode(newCodes: string): Promise<string> {
    const sections = newCodes.split(/^#\s+/gm).filter(Boolean);
    const errors: string[] = [];

    for (const section of sections) {
      const lines = section.trim().split("\n");
      const codeSpaceLine = lines.shift();
      if (!codeSpaceLine) continue;

      const codeSpaceMatch = codeSpaceLine.match(/^([\w-.]+)\.tsx$/);
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
        );

        if (updatedCode !== codeContent + "\n\n\n") {
          errors.push(`Failed to update code for ${codeSpace}`);
        }
      }
    }

    // Re-transpile current session's code to ensure everything is fresh
    await this.setCode(this.session.code, true);
    this.session = sanitizeSession(this.session);

    this.broadcastChannel.postMessage(this.session);

    return errors.join("\n");
  }

  /**
   * Returns current code plus any extra models (discovered via imports).
   */
  async currentCodeWithExtraModels(): Promise<string> {
    const extraModels = await fetchAndCreateExtraModels(
      this.session.code,
      location.origin,
    );

    const extraCodeSections = Object.entries(extraModels)
      .filter(([codeSpace]) => codeSpace !== this.codeSpace)
      .map(([codeSpace, code]) => this.formatCodeAsSection(codeSpace, code));

    const currentCodeSection = this.formatCodeAsSection(
      this.codeSpace,
      this.session.code,
    );

    return [currentCodeSection, ...extraCodeSections].join("\n");
  }

  /** Formats code as a named section using markdown. */
  private formatCodeAsSection(codeSpace: string, code: string): string {
    return `# ${codeSpace}.tsx\n\n\`\`\`tsx\n${code}\n\`\`\`\n`;
  }

  /** Subscribe to session changes. */
  sub(callback: (session: ICodeSession) => void): () => void {
    return this.broadcastChannel.sub(callback);
  }

  /** Cleans up resources. */
  async release(): Promise<void> {
    this.releaseWorker();
    this.broadcastChannel.close();
  }

  /** Captures a screenshot of the current code output. */
  screenShot(): Promise<ImageData> {
    return screenShot();
  }

  /** A no-op run trigger that ensures init is called. */
  async run(): Promise<void> {
    await this.init();
  }
}
