import { DurableObject, DurableObjectState } from "@cloudflare/workers-types";
import { CodePatch, createPatch, ICodeSession, makeHash, makeSession } from "@spike-land/code";

import Env from "./env";
import { handleErrors } from "./handleErrors";
import { AutoSaveEntry, RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import { createCodeHistoryManager, CodeHistoryManager } from "./x-code";

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
  private wsHandler: WebSocketHandler;
  private origin = "";
  private initialized = false;
  private session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval = 60000; // 1 minute in milliseconds
  private lastAutoSave = 0;
  private autoSaveHistory: AutoSaveEntry[] = [];
  private xLog: (sess: ICodeSession) => Promise<void>;
  private historyManager: CodeHistoryManager;

  constructor(private state: DurableObjectState, private env: Env) {
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

  private async initializeSession(url: URL): Promise<void> {
    this.origin = url.origin;
    const codeSpace = this.getCodeSpace(url);

    await this.state.blockConcurrencyWhile(async () => {
      try {
        const storedSession = await this.state.storage.get<ICodeSession>("session");

        if (storedSession && storedSession.i) {
          this.session = makeSession({ ...storedSession, codeSpace });
        } else {
          this.session = await this.createNewSession(codeSpace);
        }

        this.session.codeSpace = this.session.codeSpace || codeSpace;
        if (this.session.i > 10000) this.session.i = 1;

        await this.state.storage.put("session", this.session);
        const head = makeHash(this.session);
        await this.state.storage.put("head", head);

        // Initialize auto-save history
        const savedHistory = await this.state.storage.get<AutoSaveEntry[]>("autoSaveHistory");
        if (savedHistory) {
          this.autoSaveHistory = savedHistory;
        }
      } catch (error) {
        console.error("Error initializing session:", error);
        this.session = this.backupSession;
      }
    });

    await this.xLog(this.session);
  }

  private async createNewSession(codeSpace: string): Promise<ICodeSession> {
    const codeSpaceParts = codeSpace.split("-");
    if (codeSpaceParts.length > 2) {
      throw new Error("Invalid codeSpace");
    }

    if (codeSpaceParts[0] === 'x') {
      return makeSession({
        codeSpace,
        code: `
// x-${codeSpaceParts[1]}.tsx

// write your code here

        `,
        i: 1,          
        html: "<div></div>",
        css: "",
      });
    } else {  
      const source = codeSpaceParts.length === 2
        ? `${this.origin}/live/${codeSpaceParts[0]}/session.json`
        : `${this.origin}/live/code-main/session.json`;

      const backupCode = await fetch(source).then((r) => r.json()) as ICodeSession;
      return makeSession({ ...backupCode, codeSpace });
    }
  }

  private setupAutoSave(): void {
    setInterval(() => this.autoSave(), this.autoSaveInterval);
  }

  public async getCodeHistory(): ReturnType<CodeHistoryManager["getHistory"]> {
    return this.historyManager.getHistory(this.session.codeSpace);
  }

  public async autoSave(): Promise<void> {
    const currentTime = Date.now();
    if (currentTime - this.lastAutoSave < this.autoSaveInterval) return;

    const currentCode = this.session.code;
    const lastEntry = this.autoSaveHistory[this.autoSaveHistory.length - 1];
    
    if (!lastEntry || currentCode !== lastEntry.code) {
      this.updateAutoSaveHistory(currentTime, currentCode);
      await this.saveCurrentVersion(currentTime, currentCode);
      this.lastAutoSave = currentTime;
      console.log("Auto-saved code at", new Date(currentTime).toISOString());
    }
  }

  private updateAutoSaveHistory(currentTime: number, currentCode: string): void {
    const oneMinuteAgo = currentTime - 60_000;
    const twoMonthsAgo = currentTime - 60000 * 60 * 24 * 60;
    
    this.autoSaveHistory = this.autoSaveHistory.filter(entry => 
      entry.timestamp <= oneMinuteAgo && entry.timestamp > twoMonthsAgo
    );

    this.autoSaveHistory.push({
      timestamp: currentTime,
      code: currentCode,
    });

    this.state.storage.put("autoSaveHistory", this.autoSaveHistory);
  }

  private async saveCurrentVersion(currentTime: number, currentCode: string): Promise<void> {
    await this.state.storage.put(`savedVersion_${currentTime}`, currentCode);
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (this.session) {
      this.origin = url.origin;
    }
    
    try {
      await this.xLog(this.session);  

      if (request.method === "POST" && request.url.endsWith("/session")) {
        await this.handleSessionUpdate(request);
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
        await this.transpileCode();
      }

      if (!this.initialized) {
        await this.initializeSession(url);
        this.setupAutoSave();
        this.initialized = true;
      }

      const path = url.pathname.slice(1).split("/");
      return this.routeHandler.handleRoute(request, url, path);
    });
  }

  private async handleSessionUpdate(request: Request): Promise<void> {
    this.session = await request.json();
    const oldSession = makeSession(this.session);
 
    await this.state.storage.put("session", this.session);
    await this.xLog(this.session);
    const newSession = await this.state.storage.get<ICodeSession>("session");
    if (newSession === undefined) {
      throw new Error("newSession is undefined");
    }

    const patch = createPatch(oldSession, newSession);
    this.wsHandler.broadcast(patch);
  }

  private async transpileCode(): Promise<void> {
    try {
      const response = await fetch("https://esbuild.spikeland.workers.dev", {
        method: "POST",
        body: this.session.code,
        headers: {
          "TR_ORIGIN": this.origin,
        },
      });
      this.session.transpiled = await response.text();
      this.setSession(makeSession(this.session));
    } catch (error) {
      console.error("Error transpiling code:", error);
    }
  }

  async updateSessionStorage(msg: CodePatch): Promise<void> {
    if (!this.session.codeSpace) {
      throw new Error("CodeSpace not set");
    }
    
    const head = makeHash(this.session);
   
    await this.xLog(this.session);
    await this.state.storage.put(head, {
      ...this.session,
      oldHash: msg.oldHash,
      reversePatch: msg.reversePatch,
    });

    const oldData = await this.state.storage.get(msg.oldHash) as {
      oldHash?: string;
      reversePatch?: string;
    } | null;
    await this.state.storage.put(msg.oldHash, {
      oldHash: oldData?.oldHash || "",
      reversePatch: oldData?.reversePatch || [],
      newHash: msg.newHash,
      patch: msg.patch,
    });

    await this.state.storage.put("head", head);

    await this.autoSave();
  }

  setSession(session: ICodeSession): void {
    this.session = session;
    this.state.storage.put("session", this.session);
  }

  getState(): DurableObjectState {
    return this.state;
  }

  getEnv(): Env {
    return this.env;
  }

  getOrigin(): string {
    return this.origin;
  }

  async getAutoSaveHistory(): Promise<AutoSaveEntry[]> {
    return this.autoSaveHistory;
  }

  async setAutoSaveHistory(history: AutoSaveEntry[]): Promise<AutoSaveEntry[]> {
    this.autoSaveHistory = history;
    await this.state.storage.put("autoSaveHistory", this.autoSaveHistory);
    return this.autoSaveHistory;
  }

  async restoreFromAutoSave(timestamp: number): Promise<boolean> {
    const entry = this.autoSaveHistory.find((e) => e.timestamp === timestamp);
    if (entry) {
      this.session.code = entry.code;
      await this.state.storage.put("session", this.session);
      return true;
    }
    return false;
  }
}