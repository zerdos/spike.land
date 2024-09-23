import type { DurableObject, DurableObjectState } from "@cloudflare/workers-types";
import { CodePatch, createPatch, ICodeSession, makeHash, makeSession, md5 } from "@spike-land/code";

import Env from "./env";
import { handleErrors } from "./handleErrors";
import { AutoSaveEntry, RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";

export { md5 };

export class Code implements DurableObject {

  private routeHandler: RouteHandler;
  wsHandler: WebSocketHandler;
  private transpiled = "";
  private origin = "";
  private initialized = false;
  private codeSpace = "";
  session: ICodeSession;
  private backupSession: ICodeSession;
  private autoSaveInterval: number = 60000; // 1 minute in milliseconds
  private lastAutoSave: number = 0;
  private autoSaveHistory: AutoSaveEntry[] = [];

  constructor(private state: DurableObjectState, private env: Env) {
    this.env = env;

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

  private async initializeSession(url: URL) {
    this.origin = url.origin;
    this.codeSpace = url.searchParams.get("room")!;


    await this.state.blockConcurrencyWhile(async () => {
      try {
        const storedSession = await this.state.storage.get<ICodeSession>(
          "session",
        );
        if (storedSession && storedSession.i) {
          this.session = storedSession;
        } else {
          // const codeSpaceDashed =  this.codeSpace.includes("-");
          const codeSpaceParts = this.codeSpace.split("-");
          if (codeSpaceParts.length > 2) {
            throw new Error("Invalid codeSpace");
          }


          
          const source = codeSpaceParts.length === 2
            ? `${this.origin}/live/${codeSpaceParts[0]}/session.json`
            : `${this.origin}/live/code-main/session.json`;

            if (codeSpaceParts[0] === 'x'){
              // full empty state

              this.session = makeSession({
                code: `
// x-${codeSpaceParts[1]}.tsx

// write your code here

                `,
                i: 1,
                html: "<div></div>",
                css: "",
              });


            } else {  
          const backupCode = await fetch(
            source,
          ).then((r) => r.json()) as ICodeSession;
          this.backupSession = backupCode;
        
          await this.state.storage.put("session", this.backupSession);
          this.session = this.backupSession;
        }
          const head = makeHash(this.session);
          await this.state.storage.put("head", head);
        }

        // Initialize auto-save history
        const savedHistory = await this.state.storage.get<AutoSaveEntry[]>(
          "autoSaveHistory",
        );
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
    if (this.autoSaveHistory.find((x) => x.code === this.session.code)) return;

    const currentTime = Date.now();
    if (currentTime - this.lastAutoSave >= this.autoSaveInterval) {
      const currentCode = this.session.code;

      // Check if the code has changed since the last auto-save
      if (
        this.autoSaveHistory.length === 0
        || currentCode
          !== this.autoSaveHistory[this.autoSaveHistory.length - 1].code
      ) {
        // Remove entries younger than 1 minutes
        this.autoSaveHistory = this.autoSaveHistory.filter((entry) => currentTime - entry.timestamp >= 60_000);

        // Remove entries older than 2 months
        this.autoSaveHistory = this.autoSaveHistory.filter((entry) =>
          currentTime - entry.timestamp <= 60000 * 60 * 24 * 60
        );

        // Add new entry
        this.autoSaveHistory.push({
          timestamp: currentTime,
          code: currentCode,
        });

        // Save the updated history
        this.state.storage.put("autoSaveHistory", this.autoSaveHistory);

        // Save the current version with timestamp
        this.state.storage.put(
          `savedVersion_${currentTime}`,
          currentCode,
        );

        // Update last auto-save time
        this.lastAutoSave = currentTime;

        console.log("Auto-saved code at", new Date(currentTime).toISOString());
      }
    }
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (this.session) {
      this.origin = url.origin;
    }
    this.codeSpace = url.searchParams.get("room")!;
    logCodeSpace({...this.session, codeSpace: this.codeSpace, counter: this.session.i});  
    try {
      if (request.method === "POST" && request.url.endsWith("/session")) {
        this.session = await request.json();
        this.transpiled = this.session.transpiled;
        const oldSession = makeSession(this.session);

        await this.state.storage.put("session", this.session);
        const newSession = await this.state.storage.get<ICodeSession>("session");
        if (newSession === undefined) {
          throw new Error("newSession is undefined");
        }

        const patch = createPatch(oldSession, newSession);

        this.wsHandler.broadcast(patch);
      }
    } catch (e) {
      console.error(e);
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
    const head = makeHash(this.session);
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

  // New method to get auto-save history
  async getAutoSaveHistory(): Promise<AutoSaveEntry[]> {
    return this.autoSaveHistory;
  }

  // New method to get auto-save history
  async setAutoSaveHistory(history: AutoSaveEntry[]): Promise<AutoSaveEntry[]> {
    return this.autoSaveHistory = history;
  }

  // New method to restore code from a specific auto-save entry
  async restoreFromAutoSave(timestamp: number): Promise<boolean> {
    const entry = this.autoSaveHistory.find((e) => e.timestamp === timestamp);
    if (entry) {
      this.session.code = entry.code;
      await this.state.storage.put("session", this.session);
      this.transpiled = ""; // Reset transpiled code
      return true;
    }
    return false;
  }
}
function logCodeSpace(arg0: any) {
  throw new Error("Function not implemented.");
}

