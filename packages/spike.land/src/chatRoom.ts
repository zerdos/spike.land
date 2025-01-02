import type {
  DurableObject,
  DurableObjectState,
  Request as IRequest,
  Response as IResponse,
} from "@cloudflare/workers-types";
import type { CodePatch, ICodeSession } from "@spike-npm-land/code";
import {
  computeSessionHash,
  generateSessionPatch,
  md5,
  sanitizeSession,
} from "@spike-npm-land/code";

import type Env from "./env";
import { handleErrors } from "./handleErrors";
import type { AutoSaveEntry } from "./routeHandler";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import { createCodeHistoryManager } from "./x-code";
import type { CodeHistoryManager } from "./x-code";
export { md5 };

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;

  private origin = "";
  private initialized = false;

  session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval: number = 60000; // 1 minute in milliseconds
  private lastAutoSave: number = 0;
  private autoSaveHistory: AutoSaveEntry[] = [];

  private xLog: (sess: ICodeSession) => Promise<void>;
  private historyManager: CodeHistoryManager;

  constructor(private state: DurableObjectState, private env: Env) {
    this.env = env;
    this.historyManager = createCodeHistoryManager(this.env);
    this.xLog = this.historyManager.logCodeSpace.bind(this.historyManager);

    this.backupSession = sanitizeSession({
      code: `export default () => (
        <div>
          <h1>404 - for now.</h1>
          <h2>
            But you can edit even this page and share with your friends.
          </h2>
        </div>
      );`,
      i: 1,
      html: "<div></div>",
      css: "",
    });

    this.session = this.backupSession;
    this.routeHandler = new RouteHandler(this);
    this.wsHandler = new WebSocketHandler(this.session);
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
    const codeSpace = this.getCodeSpace(url);

    await this.state.blockConcurrencyWhile(async () => {
      try {
        if (this.initialized) return;
        this.origin = url.origin;
        const codeSpace = this.getCodeSpace(url);

        const storedSession = await this.state.storage.get<ICodeSession>(
          "session",
        );

        if (storedSession && storedSession.i) {
          this.session = sanitizeSession({ ...storedSession, codeSpace });
        } else {
          const codeSpaceParts = codeSpace!.split("-");
          if (codeSpaceParts.length > 2) {
            throw new Error("Invalid codeSpace");
          }

          if (codeSpaceParts[0] === "x") {
            // full empty state
            this.session = sanitizeSession({
              codeSpace,
              code: `export default () => (<>Write your code here!</>);
              `,
              i: 1,
              html: "<div>Write your code here!</div>",
              css: "",
            });
          } else {
            const source = codeSpaceParts.length === 2
              ? `${this.origin}/live/${codeSpaceParts[0]}/session.json`
              : `${this.origin}/live/code-main/session.json`;

            const backupCode = await fetch(source).then((r) =>
              r.json()
            ) as ICodeSession;
            this.backupSession = sanitizeSession({ ...backupCode, codeSpace });

            this.state.storage.put("session", this.backupSession);
            this.session = this.backupSession;
            this.xLog(this.session);
          }

          if (!this.session.codeSpace) {
            this.session.codeSpace = codeSpace;
          }
          this.state.storage.put("session", this.session);
          const head = computeSessionHash(this.session);
          this.state.storage.put("head", head);
        }

        // Initialize auto-save history
        this.state.storage.get<AutoSaveEntry[]>("autoSaveHistory").then(
          (savedHistory) => {
            if (savedHistory) {
              this.autoSaveHistory = savedHistory;
            }
          },
        );
      } catch (error) {
        console.error("Error initializing session:", error);
        this.session = this.backupSession;
      } finally {
        this.initialized = true;

        this.session.codeSpace = this.session.codeSpace || codeSpace;
        if (this.session.i > 10000) this.session.i = 1;
      }
    });

    this.xLog(this.session);
  }

  private setupAutoSave() {
    setInterval(() => this.autoSave(), this.autoSaveInterval);
  }

  public async getCodeHistory(): ReturnType<CodeHistoryManager["getHistory"]> {
    return this.historyManager.getHistory(this.session.codeSpace);
  }

  public async autoSave() {
    const currentTime = Date.now();
    if (currentTime - this.lastAutoSave < this.autoSaveInterval) return;

    const currentCode = this.session.code;
    const lastEntry = this.autoSaveHistory[this.autoSaveHistory.length - 1];

    if (!lastEntry || currentCode !== lastEntry.code) {
      // Remove entries younger than 1 minute and older than 2 months in one pass
      const oneMinuteAgo = currentTime - 60_000;
      const twoMonthsAgo = currentTime - 60000 * 60 * 24 * 60;

      this.autoSaveHistory = this.autoSaveHistory.filter((entry) =>
        entry.timestamp <= oneMinuteAgo && entry.timestamp > twoMonthsAgo
      );

      // Add new entry
      this.autoSaveHistory.push({
        timestamp: currentTime,
        code: currentCode,
      });

      // Save the updated history
      this.state.storage.put("autoSaveHistory", this.autoSaveHistory);

      // Save the current version with timestamp
      this.state.storage.put(`savedVersion_${currentTime}`, currentCode);

      // Update last auto-save time
      this.lastAutoSave = currentTime;

      console.log("Auto-saved code at", new Date(currentTime).toISOString());
    }
  }

  async fetch(request: IRequest): Promise<IResponse> {
    const url = new URL(request.url);
    if (this.session) {
      this.origin = url.origin;
    }

    if (!this.initialized) {
      await this.initializeSession(url).then(() => {
        this.setupAutoSave();
      });
    }

    try {
      this.xLog(this.session);

      if (request.method === "POST" && request.url.endsWith("/session")) {
        const newSession = await request.json();
        await this.updateAndBroadcastSession(newSession);
      }
    } catch (e) {
      console.error(e);
      return new Response("Error processing request", {
        status: 400,
      }) as unknown as IResponse;
    }

    return handleErrors(request as unknown as Request, async () => {
      this.session.code = this.session.code.replace(
        /https:\/\/spike\.land\//g,
        `${url.origin}/`,
      );

      if (!this.origin) {
        this.origin = url.origin;
      }

      if (!this.session.transpiled) {
        try {
          const transpiled =
            (await fetch("https://esbuild.spikeland.workers.dev", {
              method: "POST",
              body: this.session.code,
              headers: {
                "TR_ORIGIN": this.origin,
                // Include any additional headers required for authentication
              },
            })).text();

          await this.updateAndBroadcastSession(
            sanitizeSession(...this.session, transpiled),
          );
        } catch (error) {
          console.error("Error transpiling code:", error);
          // Handle the error as appropriate for your application
        }
      }

      const path = url.pathname.slice(1).split("/");
      return this.routeHandler.handleRoute(request, url, path);
    });
  }

  async updateSessionStorage(msg: CodePatch) {
    if (!this.session.codeSpace) {
      throw new Error("CodeSpace not set");
    }

    const head = computeSessionHash(this.session);

    this.xLog(this.session);
    this.state.storage.put(head, {
      ...this.session,
      oldHash: msg.oldHash,
      reversePatch: msg.reversePatch,
    });

    const oldData = await this.state.storage.get(msg.oldHash) as {
      oldHash?: string;
      reversePatch?: string;
    } | null;
    this.state.storage.put(msg.oldHash, {
      oldHash: oldData?.oldHash || "",
      reversePatch: oldData?.reversePatch || [],
      newHash: msg.newHash,
      patch: msg.patch,
    });

    this.state.storage.put("head", head);

    // Trigger auto-save after updating session storage
    this.autoSave();
  }

  async updateAndBroadcastSession(newSession: ICodeSession) {
    const oldSession = sanitizeSession(this.session);
    this.session = newSession;
    await this.state.storage.put("session", this.session);
    await this.xLog(this.session);

    const patch = generateSessionPatch(oldSession, this.session);
    this.wsHandler.broadcast(patch);
  }

  setSession(session: ICodeSession) {
    this.updateAndBroadcastSession(session);
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

  async getAutoSaveHistory(): Promise<AutoSaveEntry[]> {
    return this.autoSaveHistory;
  }

  async setAutoSaveHistory(history: AutoSaveEntry[]): Promise<AutoSaveEntry[]> {
    return this.autoSaveHistory = history;
  }

  async restoreFromAutoSave(timestamp: number): Promise<boolean> {
    const entry = this.autoSaveHistory.find((e) => e.timestamp === timestamp);
    if (entry) {
      await this.updateAndBroadcastSession({
        ...this.session,
        code: entry.code,
      });
      return true;
    }
    return false;
  }
}
