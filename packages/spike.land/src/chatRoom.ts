import type { ICodeSession, Message } from "@spike-npm-land/code";
import {
  computeSessionHash,
  generateSessionPatch,
  md5,
  sanitizeSession,
} from "@spike-npm-land/code";

import { handleErrors } from "./handleErrors";
// import type { AutoSaveEntry } from "./routeHandler";
import type Env from "./env";
import { McpServer } from "./mcpServer";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import type { WebsocketSession } from "./websocketHandler";

export { md5 };

// Message storage configuration
interface MessageChunk {
  id: string;
  messages: Message[];
  startIndex: number;
  endIndex: number;
  timestamp: number;
}

interface MessageIndex {
  totalMessages: number;
  recentChunkIds: string[];
  archivedChunkIds: string[];
  lastMessageId?: string;
  lastUpdated: number;
}

const MESSAGE_CHUNK_SIZE = 50; // Messages per chunk
const MAX_RECENT_CHUNKS = 4; // Keep 4 chunks (200 messages) in DO storage
const MAX_TOTAL_MESSAGES = 2000; // Maximum total messages per session
const _ARCHIVE_AGE_DAYS = 7; // Archive chunks older than 7 days (for future use)

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;
  private mcpServer: McpServer;

  private origin = "";
  private logs: ICodeSession[] = [];
  public initialized = false;

  private session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval = 60000; // 1 minute in milliseconds
  private lastAutoSave = 0;
  // private autoSaveHistory: AutoSaveEntry[] = [];

  // Message management
  private messageIndex: MessageIndex | null = null;
  private recentMessagesCache: Message[] = [];
  private messageCacheValid = false;

  private xLog: (sess: ICodeSession) => Promise<void>;
  // private historyManager: CodeHistoryManager;
  public getSession() {
    // Return session with current messages from cache
    const session = {
      ...this.session,
      messages: this.messageCacheValid ? this.recentMessagesCache : this.session.messages,
    };
    return Object.freeze(session);
  }

  constructor(
    private state: DurableObjectState,
    private env: Env,
  ) {
    this.env = env;

    // this.historyManager = createCodeHistoryManager(this.env);
    this.xLog = async (c: ICodeSession) => {
      this.logs.push(c);
    }; // this.historyManager.logCodeSpace.bind(this.historyManager);

    this.backupSession = sanitizeSession({
      code: `export default () => (
        <div>
          <h1>404 - for now.</h1>
          <h2>
            But you can edit even this page and share with your friends.
          </h2>
        </div>
      );`,
      transpiled: `import { createElement as e } from "react";
      export default () => (
        e("div", null,
          e("h1", null, "404 - for now."),
          e("h2", null, "But you can edit even this page and share with your friends.")
        )
      );`,
      messages: [],
      html: "<div></div>",
      css: "",
      codeSpace: "default",
    });

    this.session = this.backupSession;
    this.wsHandler = new WebSocketHandler(this);
    this.routeHandler = new RouteHandler(this);
    this.mcpServer = new McpServer(this);
  }

  private async _saveSession(sessionToSave: ICodeSession): Promise<void> {
    // Separate messages from session data for optimized storage
    const { code, transpiled, html, css, messages, ...sessionCoreData } = sessionToSave;
    const codeSpace = sessionToSave.codeSpace;

    if (!codeSpace) {
      console.error("Attempted to save session without a codeSpace:", sessionToSave);
      throw new Error("Cannot save session: codeSpace is missing.");
    }

    const r2HtmlKey = `r2_html_${codeSpace}`;
    const r2CssKey = `r2_css_${codeSpace}`;

    // DEBUG: log split data sizes before saving
    const encoder = new TextEncoder();
    const coreSize = encoder.encode(JSON.stringify(sessionCoreData)).length;
    const codeSize = encoder.encode(code || "").length;
    const transpiledSize = encoder.encode(transpiled || "").length;
    
    if (coreSize > 131072) {
      console.warn(`session_core too large (save): ${coreSize} for ${codeSpace}`);
    }
    if (codeSize > 131072) {
      console.warn(`session_code too large (save): ${codeSize} for ${codeSpace}`);
    }
    if (transpiledSize > 131072) {
      console.warn(`session_transpiled too large (save): ${transpiledSize} for ${codeSpace}`);
    }

    const promises = [];
    promises.push(
      this.state.storage.put("session_core", sessionCoreData).catch(e => {
        console.error(`Failed to save session_core for ${codeSpace}:`, e);
        throw e;
      }),
    );
    promises.push(
      this.state.storage.put("session_code", code || "").catch(e => {
        console.error(`Failed to save session_code for ${codeSpace}:`, e);
        throw e;
      }),
    );
    promises.push(
      this.state.storage.put("session_transpiled", transpiled || "").catch(e => {
        console.error(`Failed to save session_transpiled for ${codeSpace}:`, e);
        throw e;
      }),
    );
    promises.push(
      this.env.R2.put(r2HtmlKey, html || "").catch(e => {
        console.error(`Failed to save html to R2 for ${r2HtmlKey}:`, e);
        throw e;
      }),
    );
    promises.push(
      this.env.R2.put(r2CssKey, css || "").catch(e => {
        console.error(`Failed to save css to R2 for ${r2CssKey}:`, e);
        throw e;
      }),
    );

    // Handle messages separately using optimized storage
    if (messages && messages.length > 0) {
      promises.push(this._saveMessages(messages, codeSpace));
    }

    await Promise.all(promises);
  }

  // Optimized message storage methods
  private async _saveMessages(messages: Message[], codeSpace: string): Promise<void> {
    try {
      // Update the message cache
      this.recentMessagesCache = messages;
      this.messageCacheValid = true;

      // Load existing message index
      await this._loadMessageIndex(codeSpace);
      
      // Calculate new messages to save
      const existingCount = this.messageIndex?.totalMessages || 0;
      const newMessages = messages.slice(existingCount);
      
      if (newMessages.length === 0) return;

      // Check if we need to create a new chunk or update existing
      await this._addMessagesToChunks(newMessages, codeSpace);
      
      // Clean up old messages if needed
      await this._cleanupOldMessages(codeSpace);
      
      // Update and save the index
      this.messageIndex!.totalMessages = messages.length;
      this.messageIndex!.lastUpdated = Date.now();
      if (messages.length > 0) {
        this.messageIndex!.lastMessageId = messages[messages.length - 1].id;
      }
      
      await this.state.storage.put("message_index", this.messageIndex);
      
      console.log(`[_saveMessages] Saved ${newMessages.length} new messages for ${codeSpace}`);
    } catch (error) {
      console.error(`[_saveMessages] Error saving messages for ${codeSpace}:`, error);
      throw error;
    }
  }

  private async _loadMessageIndex(_codeSpace: string): Promise<void> {
    if (this.messageIndex) return;
    
    this.messageIndex = await this.state.storage.get<MessageIndex>("message_index") || {
      totalMessages: 0,
      recentChunkIds: [],
      archivedChunkIds: [],
      lastUpdated: Date.now(),
    };
  }

  private async _addMessagesToChunks(newMessages: Message[], codeSpace: string): Promise<void> {
    if (!this.messageIndex) return;

    let currentChunkId = this.messageIndex.recentChunkIds[this.messageIndex.recentChunkIds.length - 1];
    let currentChunk: MessageChunk | null = null;

    // Load the current chunk if it exists
    if (currentChunkId) {
      currentChunk = await this.state.storage.get<MessageChunk>(`message_chunk_${currentChunkId}`) || null;
    }

    // If no current chunk or it's full, create a new one
    if (!currentChunk || (currentChunk.messages.length >= MESSAGE_CHUNK_SIZE)) {
      currentChunkId = crypto.randomUUID();
      currentChunk = {
        id: currentChunkId,
        messages: [],
        startIndex: this.messageIndex.totalMessages,
        endIndex: this.messageIndex.totalMessages,
        timestamp: Date.now(),
      };
      this.messageIndex.recentChunkIds.push(currentChunkId);
    }

    // Add new messages to the chunk
    for (const message of newMessages) {
      if (currentChunk.messages.length >= MESSAGE_CHUNK_SIZE) {
        // Save current chunk and create a new one
        await this.state.storage.put(`message_chunk_${currentChunk.id}`, currentChunk);
        
        currentChunkId = crypto.randomUUID();
        currentChunk = {
          id: currentChunkId,
          messages: [message],
          startIndex: currentChunk.endIndex,
          endIndex: currentChunk.endIndex + 1,
          timestamp: Date.now(),
        };
        this.messageIndex.recentChunkIds.push(currentChunkId);
      } else {
        currentChunk.messages.push(message);
        currentChunk.endIndex++;
      }
    }

    // Save the final chunk
    await this.state.storage.put(`message_chunk_${currentChunk.id}`, currentChunk);

    // Archive old chunks if we have too many recent ones
    await this._archiveOldChunks(codeSpace);
  }

  private async _archiveOldChunks(codeSpace: string): Promise<void> {
    if (!this.messageIndex || this.messageIndex.recentChunkIds.length <= MAX_RECENT_CHUNKS) {
      return;
    }

    const chunksToArchive = this.messageIndex.recentChunkIds.splice(0, this.messageIndex.recentChunkIds.length - MAX_RECENT_CHUNKS);
    
    for (const chunkId of chunksToArchive) {
      try {
        // Load chunk from DO storage
        const chunk = await this.state.storage.get<MessageChunk>(`message_chunk_${chunkId}`);
        if (chunk) {
          // Save to R2 for archival
          const r2Key = `archived_messages_${codeSpace}_${chunkId}`;
          await this.env.R2.put(r2Key, JSON.stringify(chunk));
          
          // Add to archived list
          this.messageIndex.archivedChunkIds.push(chunkId);
          
          // Remove from DO storage
          await this.state.storage.delete(`message_chunk_${chunkId}`);
          
          console.log(`[_archiveOldChunks] Archived chunk ${chunkId} to R2`);
        }
      } catch (error) {
        console.error(`[_archiveOldChunks] Error archiving chunk ${chunkId}:`, error);
      }
    }
  }

  private async _cleanupOldMessages(codeSpace: string): Promise<void> {
    if (!this.messageIndex || this.messageIndex.totalMessages <= MAX_TOTAL_MESSAGES) {
      return;
    }

    console.log(`[_cleanupOldMessages] Total messages (${this.messageIndex.totalMessages}) exceeds limit (${MAX_TOTAL_MESSAGES}), cleaning up`);

    // Calculate how many messages to remove
    const messagesToRemove = this.messageIndex.totalMessages - MAX_TOTAL_MESSAGES;
    let removedCount = 0;

    // Remove old archived chunks first
    for (let i = 0; i < this.messageIndex.archivedChunkIds.length && removedCount < messagesToRemove; i++) {
      const chunkId = this.messageIndex.archivedChunkIds[i];
      try {
        // Delete from R2
        const r2Key = `archived_messages_${codeSpace}_${chunkId}`;
        await this.env.R2.delete(r2Key);
        
        // Assume chunk had MESSAGE_CHUNK_SIZE messages
        removedCount += MESSAGE_CHUNK_SIZE;
        
        console.log(`[_cleanupOldMessages] Deleted archived chunk ${chunkId}`);
      } catch (error) {
        console.error(`[_cleanupOldMessages] Error deleting archived chunk ${chunkId}:`, error);
      }
    }

    // Remove deleted chunks from the index
    this.messageIndex.archivedChunkIds = this.messageIndex.archivedChunkIds.slice(Math.ceil(removedCount / MESSAGE_CHUNK_SIZE));
    
    // Update total count
    this.messageIndex.totalMessages -= removedCount;
    
    console.log(`[_cleanupOldMessages] Removed ${removedCount} old messages for ${codeSpace}`);
  }

  private async _loadMessages(codeSpace: string, limit?: number): Promise<Message[]> {
    if (this.messageCacheValid && this.recentMessagesCache.length > 0) {
      return limit ? this.recentMessagesCache.slice(-limit) : this.recentMessagesCache;
    }

    await this._loadMessageIndex(codeSpace);
    if (!this.messageIndex || this.messageIndex.totalMessages === 0) {
      return [];
    }

    const messages: Message[] = [];
    const targetLimit = limit || this.messageIndex.totalMessages;

    // Load recent chunks first (most likely to be needed)
    for (const chunkId of this.messageIndex.recentChunkIds.reverse()) {
      if (messages.length >= targetLimit) break;
      
      try {
        const chunk = await this.state.storage.get<MessageChunk>(`message_chunk_${chunkId}`);
        if (chunk) {
          messages.unshift(...chunk.messages);
        }
      } catch (error) {
        console.error(`[_loadMessages] Error loading recent chunk ${chunkId}:`, error);
      }
    }

    // Load archived chunks if needed
    if (messages.length < targetLimit) {
      for (const chunkId of this.messageIndex.archivedChunkIds.reverse()) {
        if (messages.length >= targetLimit) break;
        
        try {
          const r2Key = `archived_messages_${codeSpace}_${chunkId}`;
          const archivedChunk = await this.env.R2.get(r2Key);
          if (archivedChunk) {
            const chunk = JSON.parse(await archivedChunk.text()) as MessageChunk;
            messages.unshift(...chunk.messages);
          }
        } catch (error) {
          console.error(`[_loadMessages] Error loading archived chunk ${chunkId}:`, error);
        }
      }
    }

    // Cache the recent messages
    this.recentMessagesCache = messages.slice(-200); // Cache last 200 messages
    this.messageCacheValid = true;

    return limit ? messages.slice(-limit) : messages;
  }

  // Public method to add a single message efficiently
  public async addMessage(message: Message): Promise<void> {
    const codeSpace = this.session.codeSpace;
    
    // Add to cache first
    if (this.messageCacheValid) {
      this.recentMessagesCache.push(message);
      // Keep cache size reasonable
      if (this.recentMessagesCache.length > 250) {
        this.recentMessagesCache = this.recentMessagesCache.slice(-200);
      }
    }

    // Save message to storage
    await this._addMessagesToChunks([message], codeSpace);
    
    // Update session with new message count
    this.session = {
      ...this.session,
      messages: this.recentMessagesCache,
    };
  }

  // Public method to get messages with pagination
  public async getMessages(limit?: number): Promise<Message[]> {
    return this._loadMessages(this.session.codeSpace, limit);
  }

  private getCodeSpace(url: URL, request?: Request): string {
    // For MCP requests, try multiple sources for codeSpace
    if (url.pathname.includes("/mcp")) {
      const codeSpace = request?.headers.get("X-CodeSpace") ||
        url.searchParams.get("codeSpace") ||
        url.searchParams.get("room") ||
        "default";
      return codeSpace;
    }

    // For regular requests, use the room parameter
    const codeSpace = url.searchParams.get("room");
    if (!codeSpace) {
      throw new Error("CodeSpace not provided in URL parameters");
    }
    return codeSpace;
  }

  async initializeSession(url: URL, request?: Request) {
    if (this.initialized) return;
    this.origin = url.origin;

    // Initialize with backup session first to ensure we always have a valid state
    this.session = this.backupSession;

    await this.state.blockConcurrencyWhile(async () => {
      //   try {
      if (this.initialized) return;
      this.origin = url.origin;
      const codeSpace = this.getCodeSpace(url, request);

      // Attempt to load session parts (try new key first, then old key for migration)
      let sessionCore = await this.state.storage.get<
        Omit<ICodeSession, "code" | "transpiled" | "html" | "css"> | undefined
      >("session_core");

      // If no data found with new key, try the old key for backward compatibility
      if (!sessionCore) {
        sessionCore = await this.state.storage.get<
          Omit<ICodeSession, "code" | "transpiled" | "html" | "css"> | undefined
        >("session");

        // If we found data with the old key, migrate it to the new key
        if (sessionCore) {
          console.log(`Migrating session data from old key for codeSpace: ${codeSpace}`);
          await this.state.storage.put("session_core", sessionCore);
          await this.state.storage.delete("session"); // Clean up old key
        }
      }
      let loadedSession: ICodeSession | null = null;

      if (sessionCore && sessionCore.codeSpace === codeSpace) { // Ensure loaded core is for the correct codespace
        const code = await this.state.storage.get<string>("session_code") ?? sessionCore.code;
        const transpiled = await this.state.storage.get<string>("session_transpiled") ??
          sessionCore.transpiled;

        const r2HtmlKey = `r2_html_${codeSpace}`;
        const r2CssKey = `r2_css_${codeSpace}`;

        let html = "";
        try {
          const htmlObject = await this.env.R2.get(r2HtmlKey);
          if (htmlObject) html = await htmlObject.text();
        } catch (e) {
          console.error(`Failed to load html from R2 (${r2HtmlKey}):`, e);
        }

        let css = "";
        try {
          const cssObject = await this.env.R2.get(r2CssKey);
          if (cssObject) css = await cssObject.text();
        } catch (e) {
          console.error(`Failed to load css from R2 (${r2CssKey}):`, e);
        }

        // Load messages separately using optimized storage
        const messages = await this._loadMessages(codeSpace, 100); // Load recent 100 messages
        
        loadedSession = {
          ...sessionCore,
          code,
          transpiled,
          html,
          css,
          messages, // Use loaded messages instead of sessionCore.messages
        };
      } else if (sessionCore && sessionCore.codeSpace !== codeSpace) {
        console.warn(
          `Loaded session_core for ${sessionCore.codeSpace} but current room is ${codeSpace}. Discarding loaded core.`,
        );
        // This case will fall through to the 'else' block below, treating it as no session found.
      }

      if (loadedSession) {
        // Ensure the codeSpace from the URL is respected, sanitizeSession handles merging.
        this.session = sanitizeSession({ ...loadedSession, codeSpace });
        
        // Initialize message cache
        this.recentMessagesCache = this.session.messages || [];
        this.messageCacheValid = true;
      } else {
        // No valid stored session found, or codespace mismatch, initialize a new one
        const codeSpaceParts = codeSpace!.split("-");
        if (codeSpaceParts.length > 2) {
          throw new Error("Invalid codeSpace");
        }

        if (codeSpaceParts[0] === "x") {
          // full empty state
          this.session = sanitizeSession({
            codeSpace,
            messages: [],
            code: `export default () => (<>Write your code here!</>);
              `,
            html: "<div>Write your code here!</div>",
            css: "",
          });
          
          // Initialize empty message cache
          this.recentMessagesCache = [];
          this.messageCacheValid = true;
        } else {
          // Don't fetch from ourselves - use a default template instead
          const codeSpaceParts = codeSpace!.split("-");

          if (codeSpaceParts.length === 2 && codeSpaceParts[0] !== "code") {
            // For derived codespaces (like "code-main" derived from "code"),
            // try to get the base template from a different Durable Object instance
            try {
              const baseCodeSpace = codeSpaceParts[0];
              // Only fetch if it's not the same as our current codeSpace to avoid recursion
              if (baseCodeSpace !== codeSpace) {
                const source = `${this.origin}/live/${baseCodeSpace}/session.json`;
                const response = await fetch(source);
                if (response.ok) {
                  const backupCode = await response.json() as ICodeSession;
                  this.backupSession = sanitizeSession({
                    ...backupCode,
                    codeSpace,
                  });
                } else {
                  throw new Error(`Failed to fetch base session: ${response.status}`);
                }
              } else {
                throw new Error("Circular reference avoided");
              }
            } catch (error) {
              console.error("Error fetching backup code from base codeSpace:", error);
              // Use default backup session if fetch fails
              this.backupSession = sanitizeSession({
                codeSpace,
                code: `export default () => (<>Write your code here!</>);`,
                html: "<div>Write your code here!</div>",
                css: "",
              });
            }
          } else {
            // For base codespaces or single-part names, use default template
            this.backupSession = sanitizeSession({
              codeSpace,
              code: `export default () => (<>Write your code here!</>);`,
              html: "<div>Write your code here!</div>",
              css: "",
            });
          }

          this.session = this.backupSession;
        }

        // this.state.storage.put("session", this.backupSession); // Old logic
        this.session = this.backupSession; // Set to backup before potentially saving
        // Persist the newly initialized session
        await this._saveSession(this.session);
      }

      // Initialize auto-save history
      // this.state.storage.get<AutoSaveEntry[]>("autoSaveHistory").then(
      //   (savedHistory) => {
      //     if (savedHistory) {
      //       this.autoSaveHistory = savedHistory;
      //     }
      //   },
      // );
      // } catch (_error) {
      //   console.error("Error initializing session:", _error);
      //   this.session = this.backupSession;
      // } finally {
      this.initialized = true;

      if (this.session) {
        this.xLog(this.session);
      }
      // }
    });

    this.xLog(this.session);
  }

  // private setupAutoSave() {
  // setInterval(() => this.autoSave(), this.autoSaveInterval);
  // }

  // public async autoSave() {
  //   const currentTime = Date.now();
  //   if (currentTime - this.lastAutoSave < this.autoSaveInterval) return;

  //   const currentCode = this.session.code;
  //   // const lastEntry = this.autoSaveHistory[this.autoSaveHistory.length - 1];

  //   if (!lastEntry || currentCode !== lastEntry.code) {
  //     // Remove entries younger than 1 minute and older than 2 months in one pass
  //     const oneMinuteAgo = currentTime - 60_000;
  //     const twoMonthsAgo = currentTime - 60000 * 60 * 24 * 60;

  //     // this.autoSaveHistory = this.autoSaveHistory.filter((entry) =>
  //       // entry.timestamp <= oneMinuteAgo && entry.timestamp > twoMonthsAgo
  //     // );

  //     // Add new entry
  //     // this.autoSaveHistory.push({
  //     //   timestamp: currentTime,
  //     //   code: currentCode,
  //     // });

  //     // Save the updated history
  //     // this.state.storage.put("autoSaveHistory", this.autoSaveHistory);

  //     // Save the current version with timestamp
  //     this.state.storage.put(`savedVersion_${currentTime}`, currentCode);

  //     // Update last auto-save time
  //     this.lastAutoSave = currentTime;

  //     console.warn("Auto-saved code at", new Date(currentTime).toISOString());
  //   }
  // }

  async fetch(request: Request): Promise<Response> {
    return handleErrors(request, async () => {
      const url = new URL(request.url);
      const path = url.pathname.slice(1).split("/");
      this.origin = url.origin;

      // Only initialize session for routes that need it
      if (!this.initialized && path[0] !== "websocket" && path[0] !== "users") {
        try {
          await this.initializeSession(url, request);
        } catch (_error) {
          console.error("Session initialization error:", _error);
          // Continue with backup session
        }
      }

      // For MCP requests, we'll handle codeSpace initialization differently
      // The MCP server will extract codeSpace from the JSON payload
      if (path[0] === "mcp") {
        // If not initialized, initialize with default codeSpace
        if (!this.initialized) {
          console.log("Initializing session for MCP request with default codeSpace");
          this.initialized = false;
          try {
            await this.initializeSession(url, request);
          } catch (_error) {
            console.error("MCP session initialization error:", _error);
            // Continue with current session
          }
        }
      }

      if (request.method === "POST" && request.url.endsWith("/session")) {
        try {
          const newSession = await request.json();
          this.updateAndBroadcastSession(newSession);
        } catch (_error) {
          return new Response("Invalid session data", { status: 400 });
        }
      }

      // Handle MCP server routes
      if (path[0] === "mcp") {
        return this.mcpServer.handleRequest(request, url, path);
      }

      return this.routeHandler.handleRoute(request, url, path);
    });
  }

  // async updateSessionStorage(msg: SessionDelta) {
  //   if (!this.session.codeSpace) {
  //     throw new Error("CodeSpace not set");
  //   }

  //   // const head = computeSessionHash(this.session);

  //   // this.xLog(this.session);
  //   // this.state.storage.put(head, {
  //   //   ...this.session,
  //   //   oldHash: msg.oldHash,
  //   //   reversePatch: msg.reversePatch,
  //   // });

  //   // const oldData = await this.state.storage.get(msg.oldHash) as {
  //   //   oldHash?: string;
  //   //   reversePatch?: string;
  //   // } | null;
  //   // this.state.storage.put(msg.oldHash, {
  //   //   oldHash: oldData?.oldHash || "",
  //   //   reversePatch: oldData?.reversePatch || [],
  //   //   hashCode: msg.hashCode,
  //   //   patch: msg.patch,
  //   // });

  //   // this.state.storage.put("head", head);

  //   // Trigger auto-save after updating session storage
  //   // this.autoSave();
  // }

  async updateAndBroadcastSession( // Add async keyword
    newSession: ICodeSession,
    wsSession?: WebsocketSession,
  ) {
    const oldSession = this.getSession();
    const oldHash = computeSessionHash(oldSession);
    const hashCode = computeSessionHash(newSession);

    console.log(`[updateAndBroadcastSession] Called for codeSpace: ${newSession.codeSpace}`);
    console.log(`[updateAndBroadcastSession] Old hash: ${oldHash}, New hash: ${hashCode}`);

    if (oldHash === hashCode) {
      console.log(`[updateAndBroadcastSession] No changes detected, skipping broadcast`);
      return; // No change needed
    }

    console.log(`[updateAndBroadcastSession] Changes detected, saving session...`);
    
    // Check if only messages changed to optimize saving
    const messagesChanged = newSession.messages.length !== oldSession.messages.length ||
      (newSession.messages.length > 0 && oldSession.messages.length > 0 &&
       newSession.messages[newSession.messages.length - 1].id !== oldSession.messages[oldSession.messages.length - 1].id);

    if (messagesChanged) {
      console.log(`[updateAndBroadcastSession] Messages changed, using optimized message storage`);
      // Save only new messages efficiently
      const oldMessageCount = oldSession.messages.length;
      const newMessages = newSession.messages.slice(oldMessageCount);
      
      if (newMessages.length > 0) {
        for (const message of newMessages) {
          await this.addMessage(message);
        }
      }
      
      // Update session without triggering full save
      this.session = {
        ...newSession,
        messages: this.recentMessagesCache,
      };
    } else {
      // Save full session if non-message fields changed
      await this._saveSession(newSession);
      this.session = newSession;
    }

    const patch = generateSessionPatch(oldSession, this.session);

    console.log(`[updateAndBroadcastSession] Broadcasting patch to WebSocket clients`);
    console.log(
      `[updateAndBroadcastSession] Patch includes code change: ${patch.delta?.code !== undefined}`,
    );
    console.log(
      `[updateAndBroadcastSession] Patch includes transpiled change: ${
        patch.delta?.transpiled !== undefined
      }`,
    );
    console.log(
      `[updateAndBroadcastSession] Active WebSocket sessions: ${this.wsHandler.getWsSessions().length}`,
    );

    this.wsHandler.broadcast(patch, wsSession);
  }

  getState() {
    return this.state;
  }

  getEnv() {
    return this.env;
  }

  getOrigin() {
    return this.origin;
  }

  // async getAutoSaveHistory(): Promise<AutoSaveEntry[]> {
  //   return this.autoSaveHistory;
  // }

  // async setAutoSaveHistory(history: AutoSaveEntry[]): Promise<AutoSaveEntry[]> {
  //   return this.autoSaveHistory = history;
  // }

  // async restoreFromAutoSave(timestamp: number): Promise<boolean> {
  //   const entry = this.autoSaveHistory.find((e) => e.timestamp === timestamp);
  //   if (entry) {
  //     this.updateAndBroadcastSession({
  //       ...this.session,
  //       code: entry.code,
  //     });
  //     return true;
  //   }
  //   return false;
  // }
}
