import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import HTML from "./index.html";
import RCA from "./rca.tsx.html";
import HYDRATED from "./hydrated.html";

import { version } from "@spike.land/code/package.json";

import applyDelta from "textdiff-patch";
import { CodeEnv } from "./env";
import type {
  CodeSession,
  ICodeSession,
  INewWSConnection,
} from "@spike.land/code/js/session";
import { startSession } from "@spike.land/code/js/session";

import imap from "@spike.land/code/js/importmap.json";

interface IState extends DurableObjectState {
  mySession: CodeSession;
  hashOfCode: string;
}

interface ISession {
  i: number;
  code: string;
  transpiled: string;
  css: string;
  html: string;
  lastTimestamp: number;
}

interface WebsocketSession {
  uuid: string;
  name?: string;
  webSocket: WebSocket;
  quit?: boolean;
  blockedMessages: string[];
}

export class Code {
  state: IState;
  room: string = "";
  kv: DurableObjectStorage;
  sessions: WebsocketSession[];
  constructor(state: IState, private env: CodeEnv) {
    this.kv = state.storage;
    this.state = state;
    this.sessions = [];
    this.env = env;
    this.sessions = [];

    const username = self.crypto.randomUUID().substring(0, 8);

    this.state.blockConcurrencyWhile(async () => {
      const sessionMaybeStr = await this.kv.get<ISession>("session");

      let session: ISession = typeof sessionMaybeStr === "string"
        ? JSON.parse(sessionMaybeStr)
        : sessionMaybeStr;

      if (!session) {
        const codeMainId = env.CODE.idFromName("code-main");
        const defaultRoomObject = env.CODE.get(codeMainId);

        const resp = await defaultRoomObject.fetch("session");

        session = await resp.json();
        if (!session) {
          session = {
            code: RCA,
            transpiled: RCA,
            html: "",
            css: "",
            lastTimestamp: 0,
            i: 0,
          };
        }
        await this.kv.put<ISession>("session", session);
      }

      this.state.mySession = startSession("", {
        name: username,
        state: { ...session },
      });

      return;
    });
  }

  async fetch(request: Request, env) {
    const mST = () => this.state.mySession.json().state;
    return await handleErrors(request, async () => {
      let code = "";
      let patched = false;

      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room") || "code-main";
      if (codeSpace && this.state.mySession.room === "") {
        this.state.mySession.setRoom(codeSpace);
      }

      let path = url.pathname.slice(1).split("/");

      switch (path[0]) {
        case "":
        case "index":
        case "index.tsx":
        case "code": {
          return new Response(mST().code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "session":
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session) {
              new Response(JSON.stringify(session), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8",
                },
              });
            }
          }
          return new Response(JSON.stringify(mST()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });

        case "delta":
          type Diff = [-1 | 0 | 1, string];

          const delta = await this.kv.get<{
            hashCode: number;
            delta: Diff[][];
          }>("delta");

          let deltaDiffs: Diff[][];

          if (!delta || delta.hashCode !== this.state.mySession.hashCode()) {
            deltaDiffs = [];
          } else {
            deltaDiffs = delta.delta;
          }

          return new Response(JSON.stringify(deltaDiffs || []), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "lazy":
          const { html, css, transpiled } = mST();
          const hash = this.state.mySession.hashCode();

          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "https://spike.land/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;
           `,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            },
          );

        case "hashCodeSession":
          return new Response(this.state.mySession.hashCode().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mST":
          return new Response(
            JSON.stringify({
              mST: mST(),
              hashCode: this.state.mySession.hashCode(),
            }),
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8",
              },
            },
          );
        case "room":
          return new Response(JSON.stringify({ codeSpace }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });

        case "index.js":
        case "js": {
          // if (codeSpace==="sanyi") {
          //   'export default function(){};'
          // }

          return new Response(mST().transpiled, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "env": {
          return new Response(request.url, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }
        case "hashCode": {
          const hashCode = String(Number(path[1]));
          const patch = await this.kv.get<{ patch: string; oldHash: number }>(
            hashCode,
          );

          return new Response(JSON.stringify(patch || {}), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "hydrated":
        case "public": {
          const startState = mST();
          const html = HTML.replace(
            `/** startState **/`,
            `Object.assign(window,${
              JSON.stringify({ startState, codeSpace })
            });`,
          )
            .replace(
              `<!--importmap-->`,
              `<script type="importmap">${JSON.stringify(imap)}</script>`,
            );
          return new Response(html, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }

        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }

          let ip = request.headers.get("CF-Connecting-IP") || "192.100.123.1";
          // eslint-disable-next-line no-undef
          let pair = new WebSocketPair();

          await this.handleSession(pair[1], ip);

          return new Response(null, { status: 101, webSocket: pair[0] });
        }

        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }

  async handleSession(webSocket: WebSocket, ip: string) {
    const mST = () => this.state.mySession.json().state;
    webSocket.accept();

    let limiterId = this.env.LIMITERS.idFromName(ip);

    let limiter = new RateLimiterClient(
      () => this.env.LIMITERS.get(limiterId),
      (err: Error) => webSocket.close(1011, err.stack),
    );
    const uuid = self.crypto.randomUUID();

    const newConnEvent: INewWSConnection = {
      uuid,
      hashCode: this.state.mySession.hashCode(),
      type: "new-ws-connection",
      timestamp: Date.now(),
    };

    webSocket.send(JSON.stringify(newConnEvent));

    // this.state.mySession.addEvent(newConnEvent);

    let session = {
      uuid,
      webSocket,
      timestamp: Date.now(),
      blockedMessages: [] as string[],
    } as WebsocketSession;
    this.sessions.push(session);

    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(
          JSON.stringify({
            joined: otherSession.name,
            i: mST().i,
            hashCode: this.state.mySession.hashCode(),
          }),
        );
      }
    });

    webSocket.addEventListener("message", async (msg) => {
      let data;
      try {
        data = JSON.parse(msg.data);
      } catch (exp) {
        webSocket.send(
          JSON.stringify({
            error: "JSON parse error",
            exp: exp || {},
          }),
        );
      }

      if (data.timestamp) {
        session.timestamp = Date.now();

        session.webSocket.send(JSON.stringify({
          timestamp: session.timestamp,
          hashCode: this.state.mySession.hashCode(),
        }));
      }

      try {
        if (session.quit) {
          if (session.name && typeof session.name === "string") {
            // this.state.mySession.addEvent({
            //   type: "quit",
            //   target: "broadcast",
            //   uuid: self.crypto.randomUUID(),
            //   name: session.name,
            //   timestamp: Date.now()
            // });
          }
          webSocket.close(1011, "WebSocket broken.");
          return;
        }

        // this.state.mySession.addEvent(
        //   { ...data, uuid: session.uuid } as unknown as IEvent,
        // );

        // if (data.type === "get-cid") {
        //   const CID = data.cid;
        //   if (this.hashCache[CID]) {
        //     webSocket.send(
        //       JSON.stringify({
        //         type: "get-cid",
        //         cid: data.cid,
        //         [CID]: this.hashCache[CID]
        //       })
        //     );
        //   }
        //   return;
        // }

        if (
          !(
            data.type &&
            (data.type === "new-ice-candidate" ||
              data.type === "offer" ||
              data.type === "answer")
          ) &&
          !limiter.checkLimit()
        ) {
          webSocket.send(
            JSON.stringify({
              error: "Your IP is being rate-limited, please try again later.",
            }),
          );
          return;
        }

        if (data.type === "lost") {
          webSocket.send(JSON.stringify({
            ...mST(),
          }));
          A;
        }

        if (!session.name && data.name) {
          session.name = "" + (data.name || "anonymous");

          if (session.name.length > 32) {
            webSocket.send(JSON.stringify({ error: "Name too long." }));
            webSocket.close(1009, "Name too long.");
            return;
          }

          // Deliver all the messages we queued up since the user connected.
          // session.blockedMessages.forEach((queued) => {
          //   webSocket.send(queued);
          // });

          session.blockedMessages = [];

          // Broadcast to all other connections that this user has joined.
          // this.broadcast({ joined: session.name });

          const messageEv = {
            type: "code-init",
            hashCode: this.state.mySession.hashCode(),
          };

          webSocket.send(
            JSON.stringify(messageEv),
          );

          // Note that we've now received the user info message.

          return;
        }

        if (
          data.type &&
          (data.type === "new-ice-candidate" ||
            data.type === "offer" ||
            data.type === "answer")
        ) {
          this.user2user(data.target, { name: session.name, ...data });
          return;
        }

        if (
          data.type &&
          (data.type === "delta")
        ) {
          const delta = data.delta;
          await this.kv.put("delta", {
            delta,
            hashCode: this.state.mySession.hashCode(),
          });
          // this.user2user(data.target, { name: session.name, ...data });
          return;
        }

        if (data.patch) {
          const newHash: number = data.newHash;
          const oldHash: number = data.oldHash;
          const patch: string = data.patch;

          await this.state.mySession.applyPatch(data);
          if (newHash === this.state.mySession.hashCode()) {
            this.broadcast(msg.data);

            // session.webSocket.send(JSON.stringify({
            //   hashCode: newHash,
            // }));

            await this.kv.put<ICodeSession>("session", mST());

            await this.kv.put(String(newHash), { oldHash, patch });
          } else {
            this.user2user(data.name, {
              hashCode: this.state.mySession.hashCode(),
            });
          }

          return;
        }
      } catch (exp) {
        webSocket.send(
          JSON.stringify({
            error: "unknown error",
            exp: exp || {},
          }),
        );
      }
    });

    let closeOrErrorHandler = () => {
      session.quit = true;
      this.sessions = this.sessions.filter((member) => member !== session);
      if (session.name) {
        this.broadcast({ quit: session.name });
      }
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  user2user(to: string, msg: Object | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;

    // Iterate over all the sessions sending them messages.
    this.sessions
      .filter((session) => session.name === to)
      .map((s) => s.webSocket.send(message));
  }

  broadcast(msg: Object | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;

    let quitters: WebsocketSession[] = [];
    this.sessions = this.sessions.filter((session) => {
      if (session.name) {
        try {
          session.webSocket.send(message);
          return true;
        } catch (err) {
          session.quit = true;
          quitters.push(session);
          return false;
        }
      } else {
        session.blockedMessages.push(message);
        return true;
      }
    });

    quitters.forEach((quitter) => {
      if (quitter.name) {
        this.broadcast({ quit: quitter.name });
      }
    });
  }
}

function applyPatch(old: string, delta: string) {
  return applyDelta(old, JSON.parse(delta));
}
