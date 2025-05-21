import { getCodeSpace } from "@/hooks/use-code-space";
import { messagesPush } from "@/lib/chat-utils";
import type { ICode, ICodeSession, ImageData, Message } from "@/lib/interfaces";
import { computeSessionHash, sanitizeSession } from "@/lib/make-sess";
import { md5 } from "@/lib/md5";
import { tryCatch } from "@/lib/try-catch";
import { wait } from "@/lib/wait";
import { CodeProcessor } from "@/services/CodeProcessor";
import { screenshot } from "@/services/editorUtils";
import { ModelManager } from "@/services/ModelManager";
import { SessionManager } from "@/services/SessionManager";
import { Mutex } from "async-mutex";

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
  private codeSpace: string;
  private pendingRun: string | null = null;

  private sessionManager: SessionManager;
  private currentSession: ICodeSession;

  constructor(private session: ICodeSession) {
    this.currentSession = sanitizeSession(session);
    this.session = this.currentSession;
    const codeSpace = session.codeSpace;

    this.codeSpace = session.codeSpace;
    this.sessionManager = new SessionManager(codeSpace);
    this.sessionManager.init(session);

    this.codeProcessor = new CodeProcessor(codeSpace);
    this.modelManager = new ModelManager(codeSpace, this);
    this.setSession({
      ...this.currentSession,
      codeSpace,
    });
  }

  async getSession(): Promise<ICodeSession> {
    return this.sessionManager.getSession();
  }

  setSession(session: ICodeSession & { sender?: string; }): void {
    // Extract the sender property if it exists
    const { sender, ...sessionWithoutSender } = session;

    if (
      computeSessionHash(sessionWithoutSender) ===
        computeSessionHash(this.currentSession)
    ) {
      console.warn("⚠️ No changes to session, skipping update");
      return;
    }

    this.currentSession = sanitizeSession(sessionWithoutSender);
    this.session = this.currentSession;
    console.warn(
      `🔄 CodeSession.setSession called with session${sender ? ` from sender: ${sender}` : ""}:`,
      this.currentSession,
    );
    this.sessionManager.updateSession(sessionWithoutSender);
  }

  async init(session: ICodeSession | null = null): Promise<ICodeSession> {
    if (session) {
      const initializedSession = await this.sessionManager.init(session);
      this.setSession(initializedSession);
      return initializedSession;
    }

    const { data: response, error: fetchError } = await tryCatch(
      fetch(`/api/room/${this.codeSpace}/session.json`),
    );

    if (fetchError) {
      console.error(
        `Failed to fetch session for ${this.codeSpace}:`,
        fetchError,
      );
      throw new Error(`Failed to fetch session: ${fetchError.message}`);
    }

    const { data: sessionData, error: jsonError } = await tryCatch(
      response.json(),
    );

    if (jsonError) {
      console.error(
        `Failed to parse session JSON for ${this.codeSpace}:`,
        jsonError,
      );
      throw new Error(`Failed to parse session JSON: ${jsonError.message}`);
    }

    const initializedSession = await this.sessionManager.init(sessionData);
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
    return [...this.currentSession.messages];
  }

  async getCode(): Promise<string> {
    if (mutex.isLocked()) {
      const { error: mutexError } = await tryCatch(mutex.waitForUnlock());
      if (mutexError) {
        console.error("Error waiting for mutex unlock:", mutexError);
      }
    }
    return this.currentSession?.code || "";
  }

  /**
   * Adds a message chunk to the last assistant message or creates a new one
   */
  addMessageChunk(chunk: string): void {
    console.warn(
      "🔄 CodeSession.addMessageChunk called with chunk length:",
      chunk.length,
    );

    // Create a copy of the current session for tracking changes
    const oldSession = sanitizeSession(this.currentSession);

    // If there are no messages, create a new assistant message
    if (oldSession.messages.length === 0) {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    // Get the last message
    const lastMessage = oldSession.messages[oldSession.messages.length - 1];

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
      ...this.currentSession,
      messages: [
        ...oldSession.messages.slice(0, oldSession.messages.length - 1),
        lastMessage,
      ],
    });

    // Update the session
    this.setSession(newSession);

    console.warn("✅ CodeSession.addMessageChunk completed successfully");
  }

  /**
   * Adds a new message to the session
   */
  addMessage(newMessage: Message): boolean {
    console.warn(
      "🔄 CodeSession.addMessage called with message:",
      newMessage.role,
    );

    // Create a copy of the current messages
    const currentMessages = [...this.currentSession.messages];

    // Use messagesPush to add the new message following the rules
    const updatedMessages = messagesPush(currentMessages, newMessage);

    // Check if messages actually changed
    if (
      md5(JSON.stringify(updatedMessages)) ===
        md5(JSON.stringify(currentMessages))
    ) {
      console.warn("⚠️ No changes to messages, skipping update");
      return false;
    }

    // Create a new session with the updated messages
    const newSession = sanitizeSession({
      ...this.currentSession,
      messages: updatedMessages,
    });

    // Update the session
    this.setSession(newSession);

    console.warn("✅ CodeSession.addMessage completed successfully");
    return true;
  }

  /**
   * Removes all messages from the session
   */
  removeMessages(): boolean {
    console.warn("🔄 CodeSession.removeMessages called");

    // If there are no messages, nothing to remove
    if (this.currentSession.messages.length === 0) {
      console.warn("⚠️ No messages to remove");
      return false;
    }

    // Create a new session with empty messages
    const newSession = sanitizeSession({
      ...this.currentSession,
      messages: [],
    });

    // Update the session
    this.setSession(newSession);

    console.warn("✅ CodeSession.removeMessages completed successfully");
    return true;
  }

  async setCode(
    rawCode: string,
    skipRunning = false,
    replaceIframe?: (newIframe: HTMLIFrameElement) => void,
  ): Promise<string> {
    console.warn(
      "🔄 CodeSession.setCode called with code length:",
      rawCode.length,
    );

    // Store current code before any updates
    const currentCode = this.currentSession?.code || "";

    if (this.isRunning) {
      this.pendingRun = rawCode;
      while (this.isRunning) {
        await wait(100);
      }
      if (this.pendingRun !== rawCode) {
        console.warn("Skipping outdated run request");
        return currentCode;
      }
    }

    this.isRunning = true;
    this.pendingRun = null;

    const { data: result, error } = await tryCatch(
      this.updateCodeInternal(rawCode, skipRunning, replaceIframe),
    );

    this.isRunning = false;

    if (error) {
      console.error("❌ CodeSession.setCode failed with error:", error);
      return currentCode;
    }

    return result;
  }

  private async updateCodeInternal(
    rawCode: string,
    skipRunning: boolean,
    replaceIframe?: (newIframe: HTMLIFrameElement) => void,
  ): Promise<string> {
    console.warn(
      "🔄 CodeSession.updateCodeInternal called with code length:",
      rawCode.length,
    );

    // Store current code for fallback
    const currentCode = this.currentSession?.code || "";

    if (skipRunning) {
      // If skipRunning is true, this is often a "force save" scenario from the editor,
      // e.g., for comment-only changes that might not alter a structural hash.
      // We bypass the main setSession's hash check to ensure the update goes through.
      if (rawCode === this.currentSession.code) {
        console.warn(
          "⚠️ Code unchanged (skipRunning=true), and raw code matches current session code. No update needed.",
        );
        return this.currentSession.code;
      }

      console.warn(
        "🔄 Force updating session state due to skipRunning=true flag.",
      );
      const newSessionState = sanitizeSession({ // Ensure session structure is valid
        ...this.currentSession,
        code: rawCode, // Use the rawCode provided
      });

      // Directly update the internal currentSession state
      this.currentSession = newSessionState;
      // And directly tell the sessionManager to update, bypassing the hash check in this.setSession()
      this.sessionManager.updateSession(newSessionState);
      console.warn(
        "✅ Session updated directly via sessionManager (skipRunning=true). New code hash:",
        md5(this.currentSession.code),
      );
      return this.currentSession.code; // Return the code that is now in the session
    }

    if (this.setCodeController) {
      console.warn("🔄 Aborting previous setCode operation");
      this.setCodeController.abort();
    }

    this.setCodeController = new AbortController();
    const signal = this.setCodeController.signal;

    console.warn("🔄 Processing code with CodeProcessor");
    const { data: result, error: processError } = await tryCatch(
      this.codeProcessor.process(
        rawCode,
        skipRunning,
        signal,
        () => this.currentSession,
        replaceIframe,
      ),
    );

    if (processError || !result) {
      console.warn(
        "⚠️ CodeProcessor returned no result or error:",
        processError,
      );
      return currentCode;
    }

    console.warn("✅ Updating session with processed code");
    // Update our local session
    const processedSession = sanitizeSession({
      ...this.currentSession,
      ...result,
    });
    this.setSession(processedSession);

    // Wait a small amount of time to ensure the session update is processed
    await new Promise((resolve) => setTimeout(resolve, 50));

    console.warn("✅ Code update completed successfully");
    return processedSession.code;
  }

  async setModelsByCurrentCode(newCodes: string): Promise<string> {
    const { data: result, error } = await tryCatch(
      this.modelManager.updateModelsByCode(newCodes),
    );

    if (error) {
      console.error("Failed to update models by code:", error);
      throw error;
    }

    return result;
  }

  async currentCodeWithExtraModels(): Promise<string> {
    const { data: result, error } = await tryCatch(
      this.modelManager.getCurrentCodeWithExtraModels(),
    );

    if (error) {
      console.error("Failed to get current code with extra models:", error);
      throw error;
    }

    return result;
  }

  sub(callback: (session: ICodeSession) => void): () => void {
    return this.sessionManager.subscribe(callback);
  }

  async release(): Promise<void> {
    this.releaseWorker();

    const { error } = await tryCatch(
      Promise.all([
        this.sessionManager.release(),
        this.modelManager.release(),
      ]),
    );

    if (error) {
      console.error("Error during release:", error);
    }
  }

  screenshot(): Promise<ImageData> {
    return screenshot();
  }

  async run(): Promise<void> {
    const { error } = await tryCatch(this.init());

    if (error) {
      console.error("Failed to initialize during run:", error);
      throw error;
    }
  }
}

/**
 * Cache for storing code sessions by codeSpace identifier
 */
const codeSessionCache: Record<string, Code> = {};

/**
 * Fetches a code session from the API
 * @param codeSpaceId - The identifier for the code space
 * @returns Promise resolving to the session data
 */
async function fetchCodeSession(codeSpaceId: string): Promise<ICodeSession> {
  const { data: response, error: fetchError } = await tryCatch(
    fetch(`/api/room/${codeSpaceId}/session.json`),
  );

  if (fetchError) {
    throw new Error(`Failed to fetch code session: ${fetchError.message}`);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch code session: ${response.status}`);
  }

  const { data: sessionData, error: jsonError } = await tryCatch(
    response.json(),
  );

  if (jsonError) {
    throw new Error(`Failed to parse code session JSON: ${jsonError.message}`);
  }

  return sessionData;
}

/**
 * Gets or creates a code session for the specified code space
 * @param codeSpaceId - The identifier for the code space (defaults to current URL's code space)
 * @returns Promise resolving to a Code instance
 */
export async function getCodeSession(
  codeSpaceId = getCodeSpace(location.pathname),
): Promise<ICode> {
  // Return cached session if it exists
  if (codeSessionCache[codeSpaceId]) {
    return codeSessionCache[codeSpaceId];
  }

  // Fetch and create a new session

  const { data: sessionData, error: fetchError } = await tryCatch(
    fetchCodeSession(codeSpaceId),
  );

  if (fetchError) {
    console.error(`Failed to get code session for ${codeSpaceId}:`, fetchError);
    throw fetchError;
  }

  const codeSession = new Code(sessionData);

  const { error: initError } = await tryCatch(codeSession.init(sessionData));

  if (initError) {
    console.error(
      `Failed to initialize session for ${codeSpaceId}:`,
      initError,
    );
    throw initError;
  }

  // Cache the session
  codeSessionCache[codeSpaceId] = codeSession;

  return codeSession;
}
