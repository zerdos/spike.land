import type { DurableObject, DurableObjectState } from "@cloudflare/workers-types";
import {
  
  CodePatch,

  ICodeSession,
  makeHash,
  
  makeSession,
  md5,
  
} from "@spike-land/code";
import Env from "./env";
import { handleErrors } from "./handleErrors";
import { RouteHandler } from "./routeHandler";
import { WebSocketHandler } from "./websocketHandler";

export { md5 };

export class Code implements DurableObject {
  private routeHandler: RouteHandler;
wsHandler: WebSocketHandler;
  private transpiled = "";
  private origin = "";
  private codeSpace = "";
  session: ICodeSession;
  private backupSession: ICodeSession;

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
    this.initializeSession();
  }

  private async initializeSession() {
    await this.state.blockConcurrencyWhile(async () => {
      try {
        const storedSession = await this.state.storage.get<ICodeSession>("session");
        if (storedSession && storedSession.i) {
          this.session = storedSession;
        } else {
          const backupCode = await fetch("https://spike.land/live/code-main/index.tsx").then(r => r.text());
          this.backupSession.code = backupCode;
          await this.state.storage.put("session", this.backupSession);
          this.session = this.backupSession;
          const head = makeHash(this.session);
          await this.state.storage.put("head", head);
        }
      } catch (error) {
        console.error("Error initializing session:", error);
        this.session = this.backupSession;
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    this.codeSpace = url.searchParams.get("room")!;
    return handleErrors(request, async () => {
      this.session.code = this.session.code.replace(/https:\/\/spike\.land\//g, `${url.origin}/`);

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

    const oldData = await this.state.storage.get(msg.oldHash) as { oldHash?: string; reversePatch?: string } | null;
    await this.state.storage.put(msg.oldHash, {
      oldHash: oldData?.oldHash || "",
      reversePatch: oldData?.reversePatch || [],
      newHash: msg.newHash,
      patch: msg.patch,
    });

    await this.state.storage.put("head", head);
    this.transpiled = "";
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
}