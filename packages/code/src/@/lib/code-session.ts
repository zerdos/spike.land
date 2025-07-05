import { getCodeSpace } from "@/hooks/use-code-space";
import { messagesPush } from "@/lib/chat-utils";
import type { ICode, ICodeSession, ImageData, Message, TextPart } from "@/lib/interfaces";
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
    const codeSpace = this.session.codeSpace;

    this.codeSpace = this.session.codeSpace;
    this.sessionManager = new SessionManager(codeSpace);
    this.sessionManager.init(this.session);

    this.codeProcessor = new CodeProcessor(codeSpace);
    this.modelManager = new ModelManager(codeSpace, this);

    // Set up re-render handling for transpiled code changes and auto-transpilation for code changes
    this.sessionManager.subscribe(async (session) => {
      // Check if session has sender property (extended interface)
      const sessionWithSender = session as ICodeSession & {
        sender?: string;
        requiresReRender?: boolean;
        requiresTranspilation?: boolean;
      };

      if (
        sessionWithSender.requiresReRender &&
        sessionWithSender.sender === "WORKER_TRANSPILED_CHANGE"
      ) {
        console.warn("🔄 Handling remote transpiled code change, triggering re-render");
        await this.handleRemoteTranspiledChange(sessionWithSender);
        return; // Exit early to avoid double processing
      }

      // Check if transpilation is explicitly required (e.g., from MCP server updates)
      if (sessionWithSender.requiresTranspilation) {
        console.warn(
          "🔄 Session update requires transpilation (MCP update), triggering auto-transpilation",
        );
        await this.handleExternalCodeChange(sessionWithSender);
        return; // Exit early to avoid double processing
      }

      // Check if code changed but transpiled is potentially stale (from external sources like MCP)
      if (this.shouldTriggerAutoTranspilation(this.currentSession, sessionWithSender)) {
        console.warn(
          "🔄 Detected external code change with stale transpiled code, triggering auto-transpilation",
        );
        await this.handleExternalCodeChange(sessionWithSender);
      }
    });

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
      fetch(`/live/${this.codeSpace}/session.json`),
    );

    if (fetchError) {
      console.error(
        `Failed to fetch session for ${this.codeSpace}:`,
        fetchError,
      );
      throw new Error(
        `Failed to fetch session: ${fetchError?.message || "Unknown error"}`,
      );
    }

    const { data: sessionData, error: jsonError } = await tryCatch(
      response!.json(),
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

    // If the last message is not from the assistant or if there's no last message,
    // create a new assistant message.
    if (!lastMessage || lastMessage.role !== "assistant") {
      this.addMessage({
        id: Date.now().toString(),
        role: "assistant",
        content: chunk,
      });
      return;
    }

    // Append the chunk to the last assistant message
    // Ensure content is treated as a string for concatenation.
    // Assuming MessageContent can be string or structured, we need to handle it.
    // For simplicity, this example assumes string content or a way to append to it.
    // If MessageContent is complex, this part needs more sophisticated handling.
    if (typeof lastMessage.content === "string") {
      lastMessage.content += chunk;
    } else {
      // Handle MessagePart[] case, e.g., by adding a new TextPart or appending to the last TextPart
      // This is a simplified example; actual implementation depends on MessageContent structure
      const newTextPart: TextPart = { type: "text", text: chunk };
      if (Array.isArray(lastMessage.content)) {
        lastMessage.content.push(newTextPart);
      } else {
        // This case should ideally not happen if content is string or MessagePart[]
        // but as a fallback, create a new array.
        lastMessage.content = [newTextPart];
      }
    }

    // Create a new session with the updated messages
    const newSession = sanitizeSession({
      ...this.currentSession,
      messages: [
        ...oldSession.messages.slice(0, oldSession.messages.length - 1),
        lastMessage, // lastMessage is now guaranteed to be defined and updated
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

    // The 'skipRunning' parameter is passed from Editor.tsx.
    // It's true if Editor.tsx is attempting a "force save" (e.g. for comment-only changes).
    // It's false for regular saves where the editor expects the app to run/be validated by the processor.

    if (this.setCodeController) {
      console.warn(
        "🔄 Aborting previous setCode operation (updateCodeInternal)",
      );
      this.setCodeController.abort();
    }
    this.setCodeController = new AbortController();
    const signal = this.setCodeController.signal;

    console.warn("🔄 Processing code with CodeProcessor (updateCodeInternal)");
    // Always call the processor. The 'skipRunning' flag informs the processor's behavior.
    const { data: processorResult, error: processError } = await tryCatch(
      this.codeProcessor.process(
        rawCode,
        skipRunning, // Pass the flag to the processor
        signal,
        () => this.currentSession,
        replaceIframe,
      ),
    );

    if (processError || !processorResult) {
      console.warn(
        "⚠️ CodeProcessor failed or returned no result. Session will not be updated. Error:",
        processError,
      );
      // Return the original code that was in the session before this attempt.
      // 'currentCode' was defined at the beginning of this function.
      return currentCode;
    }

    // CodeProcessor succeeded. Now, prepare the session data based on its result.
    const processedSessionData = sanitizeSession({
      ...this.currentSession,
      ...processorResult, // Apply changes/data from the processor
    });

    if (skipRunning) {
      // This is a "force save" path (e.g., comment-only change where Editor.tsx set skipRunning=true)
      // AND the processor was successful (e.g., it might do lighter validation or just format).
      // We directly update the current session state and inform the sessionManager,
      // bypassing this.setSession()'s computeSessionHash check. This ensures changes
      // like comments (which might not alter the structural hash) are persisted.

      // Small optimization: if the processed code is truly identical to what's already
      // in currentSession (both content and structural hash), no need to update.
      const currentSessionHash = computeSessionHash(this.currentSession);
      const processedSessionHash = computeSessionHash(processedSessionData);

      if (
        processedSessionData.code === this.currentSession.code &&
        processedSessionHash === currentSessionHash
      ) {
        console.warn(
          "✅ CodeProcessor succeeded (skipRunning=true), but processed code and session hash are identical to current. No direct update needed.",
        );
      } else {
        console.warn(
          "✅ CodeProcessor succeeded (skipRunning=true). Directly updating currentSession and sessionManager.",
        );
        this.currentSession = processedSessionData; // Update internal state
        this.sessionManager.updateSession(processedSessionData); // Inform the manager
      }
    } else {
      // This is a regular save path (skipRunning=false). Processor succeeded.
      // Use the standard this.setSession, which includes its own hash checks
      // to prevent redundant updates if the code is structurally the same.
      console.warn(
        "✅ CodeProcessor succeeded (skipRunning=false). Updating session via this.setSession().",
      );
      this.setSession(processedSessionData);
    }

    // Wait a small amount of time to ensure the session update is processed by subscribers
    await new Promise((resolve) => setTimeout(resolve, 50));

    console.warn(
      "✅ Code update process in updateCodeInternal completed successfully.",
    );
    // Return the code that was effectively set in the session.
    return processedSessionData.code;
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

  /**
   * Handles remote transpiled code changes by re-rendering the app
   * and updating the session with new HTML/CSS values
   */
  private async handleRemoteTranspiledChange(
    session: ICodeSession & { requiresReRender?: boolean; },
  ): Promise<void> {
    console.warn("🔄 CodeSession.handleRemoteTranspiledChange called");

    try {
      // Use the CodeProcessor to re-render with the new transpiled code
      const processorResult = await this.codeProcessor.reRenderFromTranspiled(
        session.transpiled,
        new AbortController().signal,
        () => session,
        undefined, // replaceIframe not needed for background re-render
      );

      if (processorResult !== false) {
        console.warn("🔄 Re-render successful, updating session with new HTML/CSS");

        // Update session with new HTML/CSS from rendering
        // Remove the requiresReRender flag to prevent loops
        const { requiresReRender: _requiresReRender, ...sessionWithoutFlag } = processorResult as
          & ICodeSession
          & { requiresReRender?: boolean; };

        this.setSession({
          ...sessionWithoutFlag,
          sender: "CODE_SESSION_RERENDER",
        });

        console.warn("✅ Remote transpiled change handling completed successfully");
      } else {
        console.error("❌ Re-render failed for remote transpiled change");
      }
    } catch (error) {
      console.error("❌ Error handling remote transpiled change:", error);
    }
  }

  /**
   * Determines if auto-transpilation should be triggered based on session changes
   */
  private shouldTriggerAutoTranspilation(
    oldSession: ICodeSession,
    newSession: ICodeSession & { sender?: string; },
  ): boolean {
    // Don't auto-transpile if:
    // 1. Code hasn't changed
    // 2. This update is from our own re-render process (to prevent loops)
    // 3. This update is from the user's editor (which handles transpilation itself)
    // 4. This update is from a transpiled change handler
    if (
      oldSession.code === newSession.code ||
      newSession.sender === "CODE_SESSION_RERENDER" ||
      newSession.sender === "EDITOR_CODE_CHANGE" ||
      newSession.sender === "WORKER_TRANSPILED_CHANGE"
    ) {
      return false;
    }

    // Check if transpiled code appears to be stale relative to the code
    // This is a heuristic - if the code changed but transpiled contains old content or is empty/default
    const hasStaleTranspiled = !newSession.transpiled ||
      newSession.transpiled.includes("Write your code hee!") || // Default content
      newSession.transpiled.includes("stdin_default") && !newSession.code.includes("default"); // Generic transpiled but code changed

    // Trigger auto-transpilation for external updates (like MCP) with stale transpiled code
    return hasStaleTranspiled;
  }

  /**
   * Handles external code changes by triggering transpilation
   */
  private async handleExternalCodeChange(
    session: ICodeSession & { sender?: string; },
  ): Promise<void> {
    console.warn(
      "🔄 CodeSession.handleExternalCodeChange called for code length:",
      session.code.length,
    );
    console.warn(
      "🔄 Session has empty transpiled:",
      !session.transpiled || session.transpiled === "",
    );

    try {
      // Temporarily update our current session to match the new session
      // This prevents the setCode process from thinking nothing changed
      this.currentSession = sanitizeSession(session);

      // Use setCode to trigger full transpilation pipeline
      // skipRunning=false ensures full processing including HTML/CSS generation
      await this.setCode(session.code, false);

      // After transpilation, get the updated session with new transpiled code
      const updatedSession = this.currentSession;
      console.warn("✅ External code change auto-transpilation completed successfully");
      console.warn("✅ Transpiled length:", updatedSession.transpiled?.length || 0);

      // If this was triggered by MCP server (requiresTranspilation flag),
      // we need to send the transpiled code back to the server
      if ((session as any).requiresTranspilation) {
        console.warn("🔄 Sending transpiled code back to server via broadcast");
        // Mark the session as coming from CODE_SESSION_RERENDER to trigger server update
        this.sessionManager.updateSession(
          {
            ...updatedSession,
            sender: "CODE_SESSION_RERENDER",
          } as ICodeSession & { sender: string; },
        );
      }
    } catch (error) {
      console.error("❌ Error handling external code change:", error);
    }
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
    fetch(`/live/${codeSpaceId}/session.json`),
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

  if (!sessionData) {
    console.error(
      `Failed to get code session for ${codeSpaceId}: sessionData is undefined`,
    );
    throw new Error(
      `Failed to get code session for ${codeSpaceId}: sessionData is undefined`,
    );
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
