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
import type { CodeHistoryManager } from "./x-code";
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
          this.session = makeSession({ ...storedSession, codeSpace });
        } else {
          const codeSpaceParts = codeSpace!.split("-");
          if (codeSpaceParts.length > 2) {
            throw new Error("Invalid codeSpace");
          }

          if (codeSpaceParts[0] === "x") {
            // full empty state
            this.session = makeSession({
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
            this.backupSession = makeSession({ ...backupCode, codeSpace });

            this.state.storage.put("session", this.backupSession);
            this.session = this.backupSession;
            this.xLog(this.session);
          }

          if (!this.session.codeSpace) {
            this.session.codeSpace = codeSpace;
          }
          this.state.storage.put("session", this.session);
          const head = makeHash(this.session);
          this.state.storage.put("head", head);
        }
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
        this.session = await request.json();
        const oldSession = makeSession(this.session);

        this.state.storage.put("session", this.session);
        this.xLog(this.session);
        const newSession = await this.state.storage.get<ICodeSession>(
          "session",
        );
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

          this.setSession(makeSession(...this.session, transpiled));
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

    const head = makeHash(this.session);

    await this.historyManager.logCodeSpace(this.session);
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
  }

  setSession(session: ICodeSession) {
    this.session = session;
    this.state.storage.put("session", this.session);
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

  // New methods to interact with CodeHistoryManager
  async saveCode(): Promise<void> {
    await this.historyManager.logCodeSpace(this.session);
  }

  async restoreCode(timestamp: number): Promise<boolean> {
    const history = await this.historyManager.getHistory(this.session.codeSpace);
    const entry = history.find(e => e.timestamp === timestamp);
    if (entry) {
      this.session.code = entry.code;
      this.state.storage.put("session", this.session);
      return true;
    }
    return false;
  }
}
