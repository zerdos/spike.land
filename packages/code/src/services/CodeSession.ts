import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
import { computeSessionHash } from "@/lib/make-sess";
import { connect } from "@/lib/shared";
import { wait } from "@/lib/wait";
import { Mutex } from "async-mutex";
import { screenshot } from "../components/editorUtils";
import { CodeProcessor } from "./code/CodeProcessor";
import { ModelManager } from "./code/ModelManager";
import { SessionManager } from "./code/SessionManager";

// Mutex for thread-safe code access
const mutex = new Mutex();

/**
 * Main class that coordinates code processing, session management,
 * and model relationships.
 */
export class Code implements ICode {
  // private sessionManager: SessionManager
  // private codeSpace = getCodeSpace(location.pathname);
  private modelManager: ModelManager;
  private codeProcessor: CodeProcessor;
  private releaseWorker: () => void = () => {};
  private setCodeController: AbortController | null = null;
  private isRunning = false;
  private pendingRun: string | null = null;
  private session: ICodeSession = {
    code: "",
    codeSpace: "",
    html: "",
    css: "",
    messages: [],
    transpiled: "",
  };
  private sessionManager: SessionManager;

  constructor(private codeSpace: string) {
    this.session = {
      code: "",
      codeSpace: codeSpace,
      html: "",
      css: "",
      messages: [],
      transpiled: "",
    };
    this.sessionManager = new SessionManager(codeSpace);
    this.session.codeSpace = codeSpace;
    this.codeProcessor = new CodeProcessor(codeSpace);
    this.modelManager = new ModelManager(codeSpace, this);
    this.setSession({
      ...this.session,
      codeSpace,
    });
  }

  async getSession(): Promise<ICodeSession> {
    return this.sessionManager.getSession();
  }

  setSession(session: ICodeSession): void {
    this.session = session;
    this.sessionManager.updateSession(session);
  }

  async init(session: ICodeSession | null = null): Promise<ICodeSession> {
    const initializedSession: ICodeSession = await this.sessionManager.init(
      session ??
        await fetch(`/api/room/${this.codeSpace}/session.json`).then((res) => res.json()),
    );
    this.releaseWorker = await connect({
      signal: `${this.codeSpace} ${initializedSession.codeSpace}`,
      sess: initializedSession,
    });

    this.setSession(initializedSession);

    return initializedSession;
  }

  computeSessionHash(session: ICodeSession): string {
    return computeSessionHash(session);
  }

  getCodeSpace(): string {
    return this.codeSpace;
  }

  getMessages(): Message[] {
    return [...this.session.messages];
  }

  async getCode(): Promise<string> {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
    }
    return this.session.code;
  }

  addMessageChunk(chunk: string): void {
    this.sessionManager.addMessageChunk(chunk);
  }

  addMessage(newMessage: Message): boolean {
    return this.sessionManager.addMessage(newMessage);
  }

  removeMessages(): boolean {
    return this.sessionManager.removeMessages();
  }

  async setCode(
    rawCode: string,
    skipRunning = false,
  ): Promise<string | boolean> {
    if (this.isRunning) {
      this.pendingRun = rawCode;
      while (this.isRunning) {
        await wait(100);
      }
      if (this.pendingRun !== rawCode) {
        console.log("Skipping outdated run request");
        return false;
      }
    }

    this.isRunning = true;
    this.pendingRun = null;

    try {
      return await this.updateCodeInternal(rawCode, skipRunning);
    } catch (error) {
      console.error("Error setting code:", error);
      return false;
    } finally {
      this.isRunning = false;
    }
  }

  private async updateCodeInternal(
    rawCode: string,
    skipRunning: boolean,
  ): Promise<string> {
    if (rawCode === this.session.code) {
      return this.session.code;
    }

    if (skipRunning) {
      this.setSession({
        ...this.session,
        code: rawCode,
      });
      return rawCode;
    }

    if (this.setCodeController) {
      this.setCodeController.abort();
    }

    this.setCodeController = new AbortController();
    const signal = this.setCodeController.signal;

    const result = await this.codeProcessor.process(
      rawCode,
      skipRunning,
      signal,
      () => this.session,
    );

    if (!result) {
      return this.session.code;
    }

    this.sessionManager.updateSession(result);
    return this.session.code;
  }

  async setModelsByCurrentCode(newCodes: string): Promise<string> {
    return this.modelManager.updateModelsByCode(newCodes);
  }

  async currentCodeWithExtraModels(): Promise<string> {
    return this.modelManager.getCurrentCodeWithExtraModels();
  }

  sub(callback: (session: ICodeSession) => void): () => void {
    return this.sessionManager.subscribe(callback);
  }

  async release(): Promise<void> {
    this.releaseWorker();
    await Promise.all([
      this.sessionManager.release(),
      this.modelManager.release(),
    ]);
  }

  screenshot(): Promise<ImageData> {
    return screenshot();
  }

  async run(): Promise<void> {
    await this.init();
  }
}
