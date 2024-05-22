import { processWsMessage } from './wsMessageProcessor';
import type { DurableObject, DurableObjectState, Request as WRequest } from "@cloudflare/workers-types";
import { resetCSS } from "../../code/src/getResetCss";
import { importMapReplace } from "../../code/src/importMapReplace";
import HTML from "./../../code/src/index.html";
import {  CodePatch, ICodeSession, makeSession } from "./../../code/src/makeSess";
import { makeHash, string_ } from "./../../code/src/makeSess";
import { md5 } from "./../../code/src/md5";
import ASSET_HASH from "./dist.shasum";
import shasum from "./dist.shasum";
import Env from "./env";
import { handleErrors } from "./handleErrors";
import { WebsocketSession, pingTimeout, YMessage } from './WebsocketSession';
import { StringMappingType } from 'typescript';

export { md5 };
export class Code implements DurableObject {
  topics = new Map<string, Set<WebSocket>>();
  #wsSessions: WebsocketSession[] = [];
  #userSessions: WebsocketSession[] = [];
  #transpiled = "";
  #origin = "";

  constructor(private state: DurableObjectState, private env: Env) {
    this.state.blockConcurrencyWhile(async () => {
      try {
        let s = await this.state.storage.get<ICodeSession>("session");
        if (!s || !s.i) {
          const backupCode = await fetch("https://spike.land/live/code-main/index.tsx").then((r) => r.text());
          this.#backupSession.code = backupCode;
          await this.state.storage.put("session", this.#backupSession);
          s = this.#backupSession;
          const head = makeHash(s as ICodeSession);
          await this.state.storage.put("head", head);
        }
        this.session = s as unknown as ICodeSession;
      } catch {
        this.session = this.#backupSession;
      }
    });
  }

  user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.#wsSessions
      .filter((session) => session.name === to)
      .forEach((s) => {
        try {
          s.webSocket.send(message);
        } catch {
          console.error("p2p error");
        }
      });
  }

  async broadcast(msg: CodePatch | string, session: ICodeSession) {
    let message: string;
    if (typeof msg === "string") {
      message = msg;
    } else {
      const head = makeHash(session);
      await this.state.storage.put(head, {
        ...session,
        oldHash: msg.oldHash,
        reversePatch: msg.reversePatch,
      });

      const data = await this.state.storage.get(msg.oldHash) as { oldHash?: string, reversePatch?: string[] };
      await this.state.storage.put(msg.oldHash, {
        oldHash: data?.oldHash || "",
        reversePatch: data?.reversePatch || [],
        newHash: msg.newHash,
        patch: msg.patch,
      });

      await this.state.storage.put("head", head);
      this.#transpiled = "";
      message = JSON.stringify({ ...msg, i: this.session.i });
    }

    this.#wsSessions.forEach((s) => {
      try {
        s.webSocket.send(message);
      } catch {
        s.quit = true;
        s.blockedMessages.push(message);
      }
    });
  }

  session = makeSession({ i: 0, code: "", html: "", css: "" });

  #backupSession = makeSession({
    code: `export default () => (
      <div>
        <h1>404 - for now.</h1>
        <h2>But you can edit even this page and share with your friends.</h2>
      </div>
    );`,
    i: 1,
    html: "<div></div>",
    css: "",
  });

  fetch(request: WRequest<unknown, CfProperties<unknown>>) {
    return handleErrors(request, async () => {
      const url = new URL(request.url);
      this.session.code = this.session.code.split("https://spike.land/").join(`${url.origin}/`);

      const codeSpace = url.searchParams.get("room");
      const { code, css, html, i } = this.session;
      if (this.#origin.length === 0) this.#origin = url.origin;

      const transpiledPromise = fetch(`https://js.spike.land?v=${shasum}`, {
        method: "POST",
        body: code,
        headers: { TR_ORIGIN: this.#origin },
      }).then(async (resp) => this.#transpiled = importMapReplace(await resp.text(), url.origin));

      if (this.#transpiled.length === 0) await transpiledPromise;
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0) path.push("");

      switch (path[0]) {
        case "users":
          return this.handleWebSocket(request, this.#userSessions, this.broadcastUsers.bind(this));
        case "websocket":
          return this.handleWebSocket(request, this.#wsSessions, (msg, session) => 
            processWsMessage(
              msg, 
              session, 
              {
                getCommit: async (commit: string) => this.state.storage.get<CodePatch | undefined>("" + commit, { allowConcurrency: true }), 
                setCommit: async (code: ICodeSession) => this.state.storage.put("session", code)
              }, 
              this.topics, 
              this.#wsSessions, 
              this.user2user.bind(this), 
              this.broadcast.bind(this), 
              this.send.bind(this),
              makeSession,
              this.session
            )
          );
        case "code":
        case "index.tsx":
          return this.createResponse(code, "application/javascript");
        case "session.json":
        case "session":
          return this.handleSessionRequest(path);
        case "lazy":
          return this.createResponse(
            `import { jsx as jsX } from "@emotion/react";
             import {LoadRoom} from "/live/lazy/js";
             export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;`,
            "application/javascript"
          );
        case "request":
          return this.createResponse(JSON.stringify({ ...request }), "application/json");
        case "list":
          return this.createResponse(JSON.stringify({ ...(await this.state.storage.list({ allowConcurrency: true })) }), "application/json");
        case "room":
          return this.createResponse(JSON.stringify({ codeSpace: codeSpace }), "application/json");
        case "path":
          return this.createResponse(path.join("----"), "application/javascript");
        case "index.mjs":
        case "index.js":
        case "js":
          this.#transpiled = this.#transpiled.length > 0
            ? this.#transpiled
            : await fetch(`https://js.spike.land`, {
              method: "POST",
              body: this.session.code,
              headers: { TR_ORIGIN: this.#origin },
            }).then((resp) => resp.text());
          const replaced = this.#transpiled.split("https://spike.land/").join(`${this.#origin}/`);
          return this.createResponse(replaced, "application/javascript");
        case "env":
          return this.createResponse(JSON.stringify(this.env), "text/html");
        case "hashCode":
          return this.handleHashCodeRequest(path);
        case "":
        case undefined:
        case null:
        case "hydrated":
        case "worker":
        case "dehydrated":
        case "iframe":
        case "public":
          return this.createHTMLResponse(codeSpace!, css, html, i);
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }

  async handleWebSocket(request: WRequest<unknown, CfProperties<unknown>>, sessions: WebsocketSession[], messageHandler: (msg: { data: string | ArrayBuffer }, session: WebsocketSession) => void) {
    if (request.headers.get("Upgrade") != "websocket") {
      return new Response("expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.setupWebSocketSession(pair[1], sessions, messageHandler);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  async setupWebSocketSession(webSocket: WebSocket, sessions: WebsocketSession[], messageHandler: (msg: { data: string | ArrayBuffer }, session: WebsocketSession) => void) {
    webSocket.accept();
    const session: WebsocketSession = {
      name: "",
      quit: false,
      webSocket,
      pongReceived: true,
      subscribedTopics: new Set(),
      blockedMessages: [],
    };
    sessions.push(session);

    const pingInterval = setInterval(() => {
      if (!session.pongReceived) {
        webSocket.close();
        clearInterval(pingInterval);
      } else {
        session.pongReceived = false;
        try {
          webSocket.send(JSON.stringify({ type: 'ping' }));
        } catch {
          webSocket.close();
        }
      }
    }, pingTimeout);

    webSocket.addEventListener("message", (msg) => messageHandler(msg, session));
    webSocket.addEventListener("close", () => session.quit = true);
    webSocket.addEventListener("error", () => session.quit = true);
  }

  async handleSessionRequest(path: string[]) {
    if (path[1]) {
      const session = await this.state.storage.get<string | object>(path[1], { allowConcurrency: false });
      if (session) {
        const s = makeSession(typeof session === "string" ? JSON.parse(session) : session);
        return this.createResponse(string_(s), "application/json");
      } else {
        return this.createResponse(JSON.stringify({ success: false, statusCode: 404 }), "application/json", 404);
      }
    }
    const body = string_(this.session);
    return this.createResponse(body, "application/json");
  }

  async handleHashCodeRequest(path: string[]) {
    const hashCode = String(Number(path[1]));
    const patch = await this.state.storage.get<{ patch: string; oldHash: number }>(hashCode, { allowConcurrency: true });
    return this.createResponse(JSON.stringify(patch || {}), "application/json");
  }

  createResponse(body: string, contentType: string, status: number = 200) {
    return new Response(body, {
      status,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": `${contentType}; charset=UTF-8`,
        "Content-Encoding": "gzip",
        content_hash: md5(body),
      }),
    });
  }

  createHTMLResponse(codeSpace: string, css: string, html: string, i: number) {
    const respText = HTML.replace("/**reset*/", resetCSS + css)
      .replace('<script src="/swVersion.js"></script>', `<script>window.swVersion = "${ASSET_HASH}"</script>`)
      .replace("ASSET_HASH", ASSET_HASH)
      .replace('<div id="root"></div>', `<div id="root" style="height: 100%;"><div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">${html}</div></div>`);

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Resource-Policy", "cross-origin");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cache-Control", "no-cache");
    headers.set("Content-Encoding", "gzip");
    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("content_hash", md5(respText));

    return new Response(respText, { status: 200, headers });
  }

  send(conn: WebSocket, message: YMessage | { type: 'pong' }) {
    if (conn.readyState !== WebSocket.OPEN && conn.readyState !== WebSocket.CONNECTING) {
      conn.close();
      return;
    }
    try {
      conn.send(JSON.stringify(message));
    } catch {
      conn.close();
    }
  }

  broadcastUsers() {
    this.#userSessions.forEach(sess => {
      const users = this.#userSessions.filter(x => x.name).map(x => x.name);
      try {
        sess.webSocket.send(JSON.stringify(users));
      } catch {
        sess.quit = true;
        this.#userSessions = this.#userSessions.filter(session => session !== sess);
      }
    });
  }
}
