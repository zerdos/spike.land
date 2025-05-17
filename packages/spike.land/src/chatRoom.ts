import type { ICodeSession } from "@spike-npm-land/code";
import {
  computeSessionHash,
  generateSessionPatch,
  md5,
  sanitizeSession,
} from "@spike-npm-land/code";

import { handleErrors } from "./handleErrors";
// import type { AutoSaveEntry } from "./routeHandler";
import type Env from "./env";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import type { WebsocketSession } from "./websocketHandler";

export { md5 };

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;

  private origin = "";
  private logs: ICodeSession[] = [];
  private initialized = false;

  private session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval = 60000; // 1 minute in milliseconds
  private lastAutoSave = 0;
  // private autoSaveHistory: AutoSaveEntry[] = [];

  private xLog: (sess: ICodeSession) => Promise<void>;
  // private historyManager: CodeHistoryManager;
  public getSession() {
    const session = this.session;
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
  }

  private async _saveSession(sessionToSave: ICodeSession): Promise<void> {
    const { code, transpiled, html, css, ...sessionCoreData } = sessionToSave;
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
    // console.warn( // Keep this commented unless active debugging is needed
    //   `split-data sizes (save): core=${coreSize} bytes, code=${codeSize} bytes, transpiled=${transpiledSize} bytes`,
    // );
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

    await Promise.all(promises);
  }

  private getCodeSpace(url: URL): string {
    const codeSpace = url.searchParams.get("room");
    if (!codeSpace) {
      throw new Error("CodeSpace not provided in URL parameters");
    }
    return codeSpace;
  }

  private async initializeSession(url: URL) {
    if (this.initialized) return;
    this.origin = url.origin;

    // Initialize with backup session first to ensure we always have a valid state
    this.session = this.backupSession;

    await this.state.blockConcurrencyWhile(async () => {
      try {
        if (this.initialized) return;
        this.origin = url.origin;
        const codeSpace = this.getCodeSpace(url);

        // Attempt to load session parts
        const sessionCore = await this.state.storage.get<
          Omit<ICodeSession, "code" | "transpiled" | "html" | "css"> | undefined
        >("session_core");
        let loadedSession: ICodeSession | null = null;

        if (sessionCore && sessionCore.codeSpace === codeSpace) { // Ensure loaded core is for the correct codespace
          const code = (await this.state.storage.get<string>("session_code")) ?? "";
          const transpiled = (await this.state.storage.get<string>("session_transpiled")) ?? "";

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

          loadedSession = {
            ...sessionCore, // Contains messages, original codeSpace, etc.
            code,
            transpiled,
            html,
            css,
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
          } else {
            const source = codeSpaceParts.length === 2
              ? `${this.origin}/live/${codeSpaceParts[0]}/session.json`
              : `${this.origin}/live/code-main/session.json`;

            try {
              const response = await fetch(source);
              if (!response.ok) {
                throw new Error(`Failed to fetch session: ${response.status}`);
              }
              const backupCode = await response.json() as ICodeSession;
              this.backupSession = sanitizeSession({
                ...backupCode,
                codeSpace,
              });
            } catch (error) {
              console.error("Error fetching backup code:", error);
              // Use default backup session if fetch fails
              this.backupSession = sanitizeSession({
                codeSpace,
                code: `export default () => (<>Write your code here!</>);`,
                html: "<div>Write your code here!</div>",
                css: "",
              });
            }

            // this.state.storage.put("session", this.backupSession);
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
      } catch (_error) {
        console.error("Error initializing session:", _error);
        this.session = this.backupSession;
      } finally {
        this.initialized = true;

        if (this.session) {
          this.xLog(this.session);
        }
      }
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
          await this.initializeSession(url);
        } catch (_error) {
          console.error("Session initialization error:", _error);
          // Continue with backup session
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

    if (oldHash === hashCode) {
      return; // No change needed
    }

    // Attempt to save the new session parts first and wait for them to complete
    // Attempt to save the new session parts first and wait for them to complete
    await this._saveSession(newSession);

    // If save is successful (i.e., did not throw), update in-memory state and broadcast
    this.session = newSession;
    const patch = generateSessionPatch(oldSession, newSession);
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
