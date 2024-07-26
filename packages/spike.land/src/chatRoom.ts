import type { DurableObject, DurableObjectState, WebSocket } from "@cloudflare/workers-types";
import {
  applyCodePatch,
  CodePatch,
  Delta,
  ICodeSession,
  makeHash,
  HTML,
  makeSession,
  md5,
  string_,
} from "@spike-land/code";
import Env from "./env";
import { handleErrors } from "./handleErrors";

export { md5 };

export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
}

interface IData {
  name?: string;
  changes?: object[];
  codeSpace?: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer" | "handshake" | "fetch";
  patch?: Delta[];
  reversePatch: Delta[];
  address?: string;
  hashCode?: string;
  i: number;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
  oldHash?: string;
}

interface YMessage {
  type: "subscribe" | "unsubscribe" | "publish" | "ping" | "pong";
  topics: string[];
  topic: string;
  clients: number;
}

const PING_TIMEOUT = 30000;

export class Code implements DurableObject {
  private topics = new Map<string, Set<WebSocket>>();
  private wsSessions: WebsocketSession[] = [];
  private userSessions: WebsocketSession[] = [];
  private transpiled = "";
  private origin = "";
  private codeSpace = "";
  private session: ICodeSession;
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

  private user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.wsSessions
      .filter(session => session.name === to)
      .forEach(s => {
        try {
          s.webSocket.send(message);
        } catch (error) {
          console.error("p2p error:", error);
        }
      });
  }

  private broadcast(msg: CodePatch | string) {
    const message = typeof msg === "string" ? msg : JSON.stringify({ ...msg, i: this.session.i });

    if (typeof msg !== "string") {
      this.updateSessionStorage(msg);
    }

    this.wsSessions.forEach(s => {
      try {
        s.webSocket.send(message);
      } catch (error) {
        s.quit = true;
        s.blockedMessages.push(message);
      }
    });

    this.wsSessions = this.wsSessions.filter(s => !s.quit);
  }

  private async updateSessionStorage(msg: CodePatch) {
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

  async fetch(request: Request): Promise<Response> {
   const url = new URL(request.url);
   this.codeSpace = url.searchParams.get("room")!;
    return handleErrors(request, async () => {
      const url = new URL(request.url);
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
      const routeHandler = this.getRouteHandler(path[0]);
      return routeHandler ? routeHandler(request, url, path) : new Response("Not found", { status: 404 });
    });
  }

  private getRouteHandler(route: string): ((req: Request, url: URL, path: string[]) => Promise<Response>) | null {
    
    const routes: { [key: string]: (req: Request, url: URL, path: string[]) => Promise<Response> } = {

      users: this.handleUsersRoute.bind(this),
      websocket: this.handleWebsocketRoute.bind(this),
      code: this.handleCodeRoute.bind(this),
      "index.tsx": this.handleCodeRoute.bind(this),
      session: this.handleSessionRoute.bind(this),
      "session.json": this.handleSessionRoute.bind(this),
      lazy: this.handleLazyRoute.bind(this),
      request: this.handleRequestRoute.bind(this),
      list: this.handleListRoute.bind(this),
      room: this.handleRoomRoute.bind(this),
      path: this.handlePathRoute.bind(this),
      "index.mjs": this.handleJsRoute.bind(this),
      "index.js": this.handleJsRoute.bind(this),
      js: this.handleJsRoute.bind(this),
      env: this.handleEnvRoute.bind(this),
      hashCode: this.handleHashCodeRoute.bind(this),
      "": this.handleDefaultRoute.bind(this),
      undefined: this.handleDefaultRoute.bind(this),
      "null": this.handleDefaultRoute.bind(this),
      hydrated: this.handleDefaultRoute.bind(this),
      worker: this.handleDefaultRoute.bind(this),
      dehydrated: this.handleDefaultRoute.bind(this),
      iframe: this.handleDefaultRoute.bind(this),
      public: this.handleDefaultRoute.bind(this),
    };

    return routes[route] || null;
  }

  private async handleUsersRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.handleUserSession(pair[1] as WebSocket);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  private async handleUserSession(webSocket: WebSocket) {
    webSocket.accept();
    const session: WebsocketSession = {
      name: "",
      quit: false,
      subscribedTopics: new Set(),
      webSocket,
      pongReceived: true,
      blockedMessages: [],
    };
    this.userSessions.push(session);

    this.broadcastUsers();

    webSocket.addEventListener("close", () => {
      this.userSessions = this.userSessions.filter(x => x !== session);
      this.broadcastUsers();
    });

    webSocket.addEventListener("message", (msg: MessageEvent) => {
      const data: IData = JSON.parse(msg.data as string);

      if (!session.name && data.name) {
        this.userSessions.filter(sess => sess.name === data.name).forEach(sess => {
          sess.webSocket.close();
          sess.name = "";
        });
        session.name = data.name;
        this.broadcastUsers();
      }

      if (data.target && data.target !== session.name) {
        const targetSession = this.userSessions.find(x => x.name === data.target);
        if (targetSession) {
          targetSession.webSocket.send(msg.data);
        }
      }
    });

    const closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  private broadcastUsers() {
    const users = this.userSessions.filter(x => x.name).map(x => x.name);
    this.userSessions.forEach(sess => {
      try {
        sess.webSocket.send(JSON.stringify(users));
      } catch (error) {
        sess.quit = true;
        this.userSessions = this.userSessions.filter(session => session !== sess);
      }
    });
  }

  private async handleWebsocketRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.handleWebsocketSession(pair[1] as WebSocket);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  private async handleWebsocketSession(webSocket: WebSocket) {
    webSocket.accept();
    const session: WebsocketSession = {
      name: "",
      quit: false,
      webSocket,
      pongReceived: true,
      subscribedTopics: new Set(),
      blockedMessages: [],
    };
    this.wsSessions.push(session);

    const users = this.wsSessions.filter(x => x.name).map(x => x.name);
    webSocket.send(JSON.stringify({
      hashCode: makeHash(this.session),
      i: this.session.i,
      users,
      type: "handshake",
    }));

    const pingInterval = setInterval(() => {
      if (!session.pongReceived) {
        webSocket.close();
        clearInterval(pingInterval);
      } else {
        session.pongReceived = false;
        try {
          webSocket.send(JSON.stringify({ type: "ping" }));
        } catch (e) {
          webSocket.close();
        }
      }
    }, PING_TIMEOUT);

    webSocket.addEventListener("message", (msg: MessageEvent) => this.processWsMessage(msg, session));

    const closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  private async handleCodeRoute(): Promise<Response> {
    return new Response(this.session.code, {
      status: 200,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        content_hash: md5(this.session.code),
        "Content-Type": "application/javascript; charset=UTF-8",
      }),
    });
  }

  private async handleSessionRoute(request: Request, url: URL, path: string[]): Promise<Response> {
    if (path[1]) {
      const session = await this.state.storage.get<string | object>(path[1], { allowConcurrency: false });
      if (session) {
        const s = makeSession(typeof session === "string" ? JSON.parse(session) : session);
        return new Response(string_(s), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip",
            content_hash: md5(session),
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      } else {
        return new Response(JSON.stringify({ success: false, statusCode: 404 }), {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Content-Encoding": "gzip",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      }
    }
    const body = string_(this.session);
    return new Response(body, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        content_hash: md5(body),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleLazyRoute(request: Request, url: URL): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    return new Response(
      `import { jsx as jsX } from "@emotion/react";
       import {LoadRoom} from "/live/lazy/js";
       export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;
       `,
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Encoding": "gzip",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cache-Control": "no-cache",
          "Content-Type": "application/javascript; charset=UTF-8",
        },
      },
    );
  }

  private async handleRequestRoute(request: Request): Promise<Response> {
    return new Response(JSON.stringify({ ...request }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleListRoute(): Promise<Response> {
    const list = await this.state.storage.list({ allowConcurrency: true });
    return new Response(JSON.stringify({ ...list }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleRoomRoute(request: Request, url: URL): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    return new Response(JSON.stringify({ codeSpace }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handlePathRoute(request: Request, url: URL, path: string[]): Promise<Response> {
    return new Response(path.join("----"), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleJsRoute(): Promise<Response> {
    const replaced = this.transpiled.replace(/https:\/\/spike\.land\//g, `${this.origin}/`);
    return new Response(replaced, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "x-typescript-types": this.origin + "/live/index.tsx",
        content_hash: md5(replaced),
        "Content-Type": "application/javascript; charset=UTF-8",
      },
    });
  }

  private async handleEnvRoute(): Promise<Response> {
    return new Response(JSON.stringify(this.env), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  }

  private async handleHashCodeRoute(request: Request, url: URL, path: string[]): Promise<Response> {
    const hashCode = String(Number(path[1]));
    const patch = await this.state.storage.get<{ patch: string; oldHash: number }>(hashCode, { allowConcurrency: true });

    return new Response(JSON.stringify(patch || {}), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  private async handleDefaultRoute(): Promise<Response> {
    const { css, html } = this.session;
    const respText = HTML.replace("/**reset*/", css).replace("<div id=\"root\"></div>", `<div id="root">${html}</div>
      <script type="module">
        ${this.transpiled.includes('ike land: API call error')
          ? `import('/live/${this.codeSpace}/index.js').then(m=>m.renderApp());`
          : this.transpiled}
        if (location.pathname.split("/").length>3) {
          globalThis.module.renderApp();
        }
      </script>`);

    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cache-Control": "no-cache",
      "Content-Encoding": "gzip",
      "Content-Type": "text/html; charset=UTF-8",
      "content_hash": md5(respText),
    });

    return new Response(respText, { status: 200, headers });
  }

  private send(conn: WebSocket, message: YMessage | { type: "pong" }) {
    const wsReadyStateConnecting = 0;
    const wsReadyStateOpen = 1;

    if (conn.readyState !== wsReadyStateConnecting && conn.readyState !== wsReadyStateOpen) {
      conn.close();
      return;
    }

    try {
      conn.send(JSON.stringify(message));
    } catch (e) {
      conn.close();
    }
  }

  private async processWsMessage(msg: MessageEvent, session: WebsocketSession) {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }

    const respondWith = (obj: unknown) => session.webSocket.send(JSON.stringify(obj));

    let data: IData;
    try {
      data = typeof msg.data === "string" ? JSON.parse(msg.data) : JSON.parse(new TextDecoder().decode(msg.data as ArrayBuffer));
    } catch (exp) {
      return respondWith({ error: "JSON parse error", exp: exp || {} });
    }

    const message = data as unknown as  YMessage;

    if (message && message.type) {
      switch (message.type) {
        case "unsubscribe":
          (message.topics || []).forEach(topicName => {
            const subs = this.topics.get(topicName);
            if (subs) {
              subs.delete(session.webSocket);
            }
          });
          break;
        case "publish":
          if (message.topic) {
            const receivers = this.topics.get(message.topic);
            if (receivers) {
              message.clients = receivers.size;
              receivers.forEach(receiver => this.send(receiver, message));
            }
          }
          break;
        case "pong":
          session.pongReceived = true;
          break;
        case "ping":
          this.send(session.webSocket, { type: "pong" });
          break;
      }
    }

    if (data.changes) {
      return this.broadcast(msg.data as string);
    }

    if (!session.name) {
      if (!data.name) {
        return respondWith({ msg: "no-name-no-party" });
      }

      this.wsSessions
        .filter(x => x.name === data.name)
        .forEach(x => {
          x.blockedMessages.reverse().forEach(m => session.webSocket.send(m));
          x.quit = true;
        });
      this.wsSessions = this.wsSessions.filter(x => !x.quit);

      session.name = data.name;
    }

    if (data.type === "handshake") {
      return this.handleHandshake(data, respondWith);
    }

    if (data.i && this.session.i && this.session.i > data.i) {
      return respondWith({ error: "i is not up to date" });
    }

    try {
      if (data.target && data.type && ["new-ice-candidate", "video-offer", "video-answer"].includes(data.type)) {
        return this.user2user(data.target, { ...data, name: session.name });
      }

      if (data.patch && data.oldHash && data.newHash && data.reversePatch) {
        return this.handlePatch(data, respondWith);
      }
    } catch (exp) {
      console.error(exp);
      return respondWith({ error: "unknown error", exp: exp || {} });
    }
  }

  private async handleHandshake(data: IData, respondWith: (obj: unknown) => void) {
    const commit = data.hashCode;
    while (commit && commit !== makeHash(this.session)) {
      const oldNode = await this.state.storage.get<CodePatch>("" + commit, { allowConcurrency: true });
      const newNode = await this.state.storage.get<CodePatch>("" + oldNode!.newHash, { allowConcurrency: true });
      return respondWith({
        oldHash: commit,
        newHash: oldNode!.newHash,
        patch: oldNode!.patch,
        reversePatch: newNode!.reversePatch,
      });
    }
  }

  private async handlePatch(data: IData, respondWith: (obj: unknown) => void) {
    const oldHash = makeHash(this.session);

    if (oldHash !== data.oldHash) {
      return respondWith({
        error: `old hashes not matching`,
        i: this.session.i,
        strSess: this.session,
      });
    }

    try {
      const newState = applyCodePatch(this.session, {
        oldHash: data.oldHash,
        newHash: data.newHash!,
        patch: data.patch!,
        reversePatch: data.reversePatch,
      });

      this.session = newState;
      await this.state.storage.put("session", this.session);

      this.broadcast(data as CodePatch);

      return respondWith({ hashCode: data.newHash });
    } catch (err) {
      return respondWith({ error: "Saving is really hard", exp: err || {} });
    }
  }
}