import type {
  DurableObject,
  DurableObjectState,
} from "@cloudflare/workers-types";
import {
  CodePatch,
  createPatch,
  ICodeSession,
  makeHash,
  makeSession,
  md5,
} from "@spike-land/code";

import Env from "./env";
import { handleErrors } from "./handleErrors";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import { createCodeHistoryManager } from "./x-code";
import type { CodeHistoryManager, CodeHistoryEntry } from "./x-code";
export { md5 };

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;

  private origin = "";
  private initialized = false;

  session: ICodeSession;
  private backupSession: ICodeSession;

  private xLog: (sess: ICodeSession) => Promise<void>;
  private historyManager: CodeHistoryManager;

  constructor(private state: DurableObjectState, private env: Env) {
    this.env = env;
    this.historyManager = createCodeHistoryManager(this.env);
    this.xLog = this.historyManager.logCodeSpace.bind(this.historyManager);

    this.backupSession = makeSession({
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
    this.wsHandler = new WebSocketHandler(this);
  }

  private getCodeSpace(url: URL): string {
    const codeSpace = url.searchParams.get("room");
    if (!codeSpace) {
      throw new Error("CodeSpace not provided in URL parameters");
    }
    return codeSpace;
  }

  private async initializeSession(url: URL) {
    // ... (implementation remains the same)
  }

  public async getCodeHistory(): ReturnType<CodeHistoryManager["getHistory"]> {
    return this.historyManager.getHistory(this.session.codeSpace);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (this.session) {
      this.origin = url.origin;
    }

    if (!this.initialized) {
      await this.initializeSession(url);
    }

    try {
      this.xLog(this.session);

      if (request.method === "POST" && request.url.endsWith("/session")) {
        const newSession = await request.json();
        await this.updateAndBroadcastSession(newSession);
      }
    } catch (e) {
      console.error(e);
      return new Response("Error processing request", { status: 400 });
    }

    return handleErrors(request, async () => {
      this.session.code = this.session.code.replace(
        /https:\/\/spike\.land\//g,
        `${url.origin}/`,
      );

      if (!this.origin) {
        this.origin = url.origin;
      }

      if (!this.session.transpiled) {
        try {
          const transpiled = await (await fetch("https://esbuild.spikeland.workers.dev", {
            method: "POST",
            body: this.session.code,
            headers: {
              "TR_ORIGIN": this.origin,
              // Include any additional headers required for authentication
            },
          })).text();

          await this.updateAndBroadcastSession(makeSession({...this.session, transpiled}));
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
    // ... (implementation remains the same)
  }

  async updateAndBroadcastSession(newSession: ICodeSession) {
    const oldSession = makeSession(this.session);
    this.session = newSession;
    await this.state.storage.put("session", this.session);
    await this.xLog(this.session);
    
    const patch = createPatch(oldSession, this.session);
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

  // Methods to interact with CodeHistoryManager
  async saveCode(): Promise<void> {
    await this.historyManager.logCodeSpace(this.session);
  }

  async restoreCode(timestamp: number): Promise<boolean> {
    const restoredSession = await this.historyManager.getSessionAtTimestamp(this.session.codeSpace, timestamp);
    if (restoredSession) {
      await this.updateAndBroadcastSession(restoredSession);
      return true;
    }
    return false;
  }

  async loadMoreTimestamps(startEntryId: string | null, limit: number): Promise<{ timestamps: number[]; nextEntryId: string | null }> {
    return this.historyManager.loadMoreTimestamps(this.session.codeSpace, startEntryId, limit);
  }
}
