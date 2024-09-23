import type { DurableObject, DurableObjectState } from "@cloudflare/workers-types";
import { CodePatch, createPatch, ICodeSession, makeHash, makeSession, md5 } from "@spike-land/code";

import Env from "./env";
import { handleErrors } from "./handleErrors";
import { AutoSaveEntry, RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";
import { logCodeSpace } from "./x-code";
export { md5 };

export class Code implements DurableObject {

  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;
  private transpiled = "";
  private origin = "";
  private initialized = false;
  private codeSpace: string | null = null;

  session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval: number = 60000; // 1 minute in milliseconds
  private lastAutoSave: number = 0;
  private autoSaveHistory: AutoSaveEntry[] = [];
  private xLog: (sess: ICodeSession) => Promise<void>;

  constructor(private state: DurableObjectState, private env: Env) {
    this.env = env;
    
    this.xLog = logCodeSpace(this.env);

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
    this.origin = url.origin;
    this.codeSpace = this.getCodeSpace(url);
    this.xLog({...this.session, codeSpace: this.codeSpace, counter: this.session.i});

    await this.state.blockConcurrencyWhile(async () => {
      try {
        const storedSession = await this.state.storage.get<ICodeSession>("session");
        if (storedSession && storedSession.i) {
          this.session = {...storedSession, codeSpace: this.codeSpace};
        } else {
          const codeSpaceParts = this.codeSpace.split("-");
          if (codeSpaceParts.length > 2) {
            throw new Error("Invalid codeSpace");
          }

          if (codeSpaceParts[0] === 'x') {
            // full empty state
            this.session = makeSession({
              code: `
// x-${codeSpaceParts[1]}.tsx

// write your code here

              `,
              i: 1,
              codeSpace: this.codeSpace,
              html: "<div></div>",
              css: "",
            });
          } else {  
            const source = codeSpaceParts.length === 2
              ? `${this.origin}/live/${codeSpaceParts[0]}/session.json`
              : `${this.origin}/live/code-main/session.json`;

            const backupCode = await fetch(source).then((r) => r.json()) as ICodeSession;
            this.backupSession = backupCode;
          
            await this.state.storage.put("session", this.backupSession);
            this.session = this.backupSession;
          }
          this.session.codeSpace = this.codeSpace;

          const head = makeHash(this.session);
          await this.state.storage.put("head", head);
        }

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
  }

  private setupAutoSave() {
    setInterval(() => this.autoSave(), this.autoSaveInterval);
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
      
      this.autoSaveHistory = this.autoSaveHistory.filter(entry => 
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

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (this.session) {
      this.origin = url.origin;
    }
    
    try {
      this.codeSpace = this.getCodeSpace(url);
      this.xLog({...this.session, codeSpace: this.codeSpace, counter: this.session.i});  

      if (request.method === "POST" && request.url.endsWith("/session")) {
        this.session = await request.json();
        this.transpiled = this.session.transpiled;
        const oldSession = makeSession(this.session);

        await this.state.storage.put("session", this.session);
        this.xLog({...this.session, codeSpace: this.codeSpace, counter: this.session.i});
        const newSession = await this.state.storage.get<ICodeSession>("session");
        if (newSession === undefined) {
          throw new Error("newSession is undefined");
        }

        const patch = createPatch(oldSession, newSession);

        this.wsHandler.broadcast(patch);
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

      if (!this.transpiled) {
        try {
          const resp = await fetch("https://esbuild.spikeland.workers.dev", {
            method: "POST",
            body: this.session.code,
            headers: {
              "TR_ORIGIN": this.origin,
              // Include any additional headers required for authentication
            },
          });
      
          if (!resp.ok) {
            throw new Error(`ESBUILD service responded with status ${resp.status}`);
          }
      
          this.transpiled = await resp.text();
        } catch (error) {
          console.error("Error transpiling code:", error);
          // Handle the error as appropriate for your application
        }
      }

      if (!this.initialized) {
        await this.initializeSession(url);
        await this.setupAutoSave();
        this.initialized = true;
      }

      const path = url.pathname.slice(1).split("/");
      return this.routeHandler.handleRoute(request, url, path);
    });
  }

  async updateSessionStorage(msg: CodePatch) {
    if (!this.codeSpace) {
      throw new Error("CodeSpace not set");
    }
    
    this.session.codeSpace = this.codeSpace;  
    const head = makeHash(this.session);
    this.xLog({...this.session, codeSpace: this.codeSpace, counter: this.session.i});
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
    this.transpiled = "";

    // Trigger auto-save after updating session storage
    await this.autoSave();
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

  getTranspiled() {
    return this.transpiled;
  }

  getCodeSpace() {
    return this.codeSpace;
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
      this.session.code = entry.code;
      this.session.codeSpace = this.codeSpace;
      await this.state.storage.put("session", this.session);
      this.transpiled = ""; // Reset transpiled code
      return true;
    }
    return false;
  }
}