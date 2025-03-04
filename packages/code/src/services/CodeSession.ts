import { messagesPush } from "@/lib/chat-utils";
import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
import { computeSessionHash, sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
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

  /**
   * Adds a message chunk to the last assistant message or creates a new one
   */
  addMessageChunk(chunk: string): void {
    console.log("🔄 CodeSession.addMessageChunk called with chunk length:", chunk.length);

    // Create a copy of the current session for tracking changes
    const oldSession = sanitizeSession(this.session);

    // If there are no messages, create a new assistant message
    if (this.session.messages.length === 0) {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    // Get the last message
    const lastMessage = this.session.messages[this.session.messages.length - 1];

    // If the last message is not from the assistant, create a new assistant message
    if (lastMessage.role !== "assistant") {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    // Append the chunk to the last assistant message
    lastMessage.content += chunk;

    // Create a new session with the updated messages
    const newSession = sanitizeSession({
      ...this.session,
      messages: [
        ...this.session.messages.slice(0, this.session.messages.length - 1),
        lastMessage,
      ],
    });

    // Update the session
    this.session = newSession;

    // Broadcast the changes
    this.sessionManager.updateSession(newSession);

    console.log("✅ CodeSession.addMessageChunk completed successfully");
  }

  /**
   * Adds a new message to the session
   */
  addMessage(newMessage: Message): boolean {
    console.log("🔄 CodeSession.addMessage called with message:", newMessage.role);

    // Create a copy of the current messages
    const currentMessages = [...this.session.messages];

    // Use messagesPush to add the new message following the rules
    const updatedMessages = messagesPush(currentMessages, newMessage);

    // Check if messages actually changed
    if (md5(JSON.stringify(updatedMessages)) === md5(JSON.stringify(currentMessages))) {
      console.log("⚠️ No changes to messages, skipping update");
      return false;
    }

    // Create a new session with the updated messages
    const newSession = sanitizeSession({
      ...this.session,
      messages: updatedMessages,
    });

    // Update the session
    this.session = newSession;

    // Broadcast the changes
    this.sessionManager.updateSession(newSession);

    console.log("✅ CodeSession.addMessage completed successfully");
    return true;
  }

  /**
   * Removes all messages from the session
   */
  removeMessages(): boolean {
    console.log("🔄 CodeSession.removeMessages called");

    // If there are no messages, nothing to remove
    if (this.session.messages.length === 0) {
      console.log("⚠️ No messages to remove");
      return false;
    }

    // Create a new session with empty messages
    const newSession = sanitizeSession({
      ...this.session,
      messages: [],
    });

    // Update the session
    this.session = newSession;

    // Broadcast the changes
    this.sessionManager.updateSession(newSession);

    console.log("✅ CodeSession.removeMessages completed successfully");
    return true;
  }

  async setCode(
    rawCode: string,
    skipRunning = false,
  ): Promise<string | boolean> {
    console.log("🔄 CodeSession.setCode called with code length:", rawCode.length);
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
      console.error("❌ CodeSession.setCode failed with error:", error);
      return false;
    } finally {
      this.isRunning = false;
    }
  }

  private async updateCodeInternal(
    rawCode: string,
    skipRunning: boolean,
  ): Promise<string> {
    console.log("🔄 CodeSession.updateCodeInternal called with code length:", rawCode.length);

    if (rawCode === this.session.code) {
      console.log("⚠️ Code unchanged, returning current code");
      return this.session.code;
    }

    if (skipRunning) {
      console.log("🔄 Skipping running, just updating session");
      this.setSession({
        ...this.session,
        code: rawCode,
      });
      return rawCode;
    }

    if (this.setCodeController) {
      console.log("🔄 Aborting previous setCode operation");
      this.setCodeController.abort();
    }

    this.setCodeController = new AbortController();
    const signal = this.setCodeController.signal;

    console.log("🔄 Processing code with CodeProcessor");
    const result = await this.codeProcessor.process(
      rawCode,
      skipRunning,
      signal,
      () => this.session,
    );

    if (!result) {
      console.log("⚠️ CodeProcessor returned no result, returning current code");
      return this.session.code;
    }

    console.log("✅ Updating session with processed code");
    // Update our local session first
    this.session = sanitizeSession({
      ...this.session,
      ...result,
    });

    // Then broadcast the changes
    this.sessionManager.updateSession(result);

    // Wait a small amount of time to ensure the session update is processed
    await new Promise(resolve => setTimeout(resolve, 50));

    console.log("✅ Code update completed successfully");
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
