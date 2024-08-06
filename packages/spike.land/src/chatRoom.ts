import type { DurableObject, DurableObjectState, WebSocket } from "@cloudflare/workers-types";
import { CodePatch, ICodeSession, makeHash, makeSession, md5 } from "@spike-land/code";
import Env from "./env";
import { handleErrors } from "./handleErrors";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";

export { md5 };

interface AutoSaveEntry {
  timestamp: number;
  code: string;
}

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

  private async initializeSession() {
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

        const source = codeSpaceParts.length === 2 ? `https://spike.land/live/${codeSpaceParts[0]}/index.tsx` : `https://spike.land/code-main/index.tsx`;
        
          const backupCode = await fetch( 
        source
          ).then((r) => r.text());
          this.backupSession.code = backupCode;
          await this.state.storage.put("session", this.backupSession);
          this.session = this.backupSession;
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
        await this.state.storage.put("autoSaveHistory", this.autoSaveHistory);

        // Save the current version with timestamp
        await this.state.storage.put(
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
    this.codeSpace = url.searchParams.get("room")!;
    return handleErrors(request, async () => {
      this.session.code = this.session.code.replace(
        /https:\/\/spike\.land\//g,
        `${url.origin}/`,
      );

      if (!this.origin) {
        this.origin = url.origin;
      }

      if (!this.transpiled) {
        const resp = await fetch(`https://js.spike.land`, {
          method: "POST",
          body: this.session.code,
          headers: { TR_ORIGIN: this.origin },
        });
        this.transpiled = await resp.text();
      }


      if (!this.initialized) {
        await     this.initializeSession();
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
