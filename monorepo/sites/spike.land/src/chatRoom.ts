import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import LAZY from "./lazy.html";
import HTML from "./index.html";
import RCA from "./rca.tsx.html";
import HYDRATED from "./hydrated.html";
  // @ts-expect-error
import {toBinary} from "@spike.land/code/js/binary.ts"
       

import { version } from "@spike.land/code/package.json";
import imap from "@spike.land/code/js/importmap.json";
import applyDelta from "textdiff-patch";
import { CodeEnv } from "./env";
import type {
  ICodeSess,
  ICodeSession,
  IEvent,
  INewWSConnection,
  // @ts-expect-error
} from "@spike.land/code/js/session.tsx";
// @ts-expect-error

import startSession from "@spike.land/code/js/session.tsx";

interface IState extends DurableObjectState {
  mySession: ICodeSess;
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

type ResolveFn = (value: unknown) => void;

export class Code {
  state: IState;
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
        capabilities: {
          prettier: false,
          babel: false,
          webRRT: false,
          prerender: false,
          IPFS: false,
        },
        users: [],
        state: { ...session, errorDiff: "" },
        events: [],
      });

      return;
    });
  }

  async fetch(request: Request) {
    const mST = () => this.state.mySession.session.get("state");
    return await handleErrors(request, async () => {
      let code = "";
      let patched = false;

      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room");
      if (codeSpace && this.state.mySession.room === "") {
        this.state.mySession.setRoom(codeSpace);
      }

      let path = url.pathname.slice(1).split("/");
      const vReg = /{VERSION}/ig;

      switch (path[0]) {
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
          return new Response(JSON.stringify(mST().toJSON()), {
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
          const { html, css, transpiled } = mST().toJSON();
          const hash = this.state.mySession.hashCode();

          return new Response(
            LAZY.replace(
              "{...o}",
              JSON.stringify({
                name: codeSpace,
                transpiled,
                html:
                  `<div id="root"><style>${css}</style><div id="zbody">${html}</div></div>`,
                hash,
              }),
            ),
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
          return new Response(this.state.mySession.hashCode(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mySession":
          return new Response(JSON.stringify(this.state.mySession.json()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });

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
        case "hydrated": {

          return new Response( HYDRATED.replace(
            `<div id="root"></div>`,
            `<div id="root">
            <style>${mST().css}</style>
            <div id="zbody">${ mST().html}
            </div></div>
            <script type="importmap">${JSON.stringify(imap)}</script>
            <script type="module">
            import {hydrateBinary}  from "./dist/starter.mjs"; 
            hydrateBinary(atob("${ btoa( toBinary(mST().transpiled))}"));
            </script>`,
          ).replaceAll(vReg, version), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
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

        case "public": {


          const html = HTML.replace(
              `<div id="root"></div>`,
              `<div id="root">
              <style>${mST().css}</style>
              <div id="zbody">${ mST().html}
              </div></div>
              <script type="importmap">${JSON.stringify(imap)}</script>
              <script defer src=">
              <script type="module">
              import {hydrateBinary}  from "./dist/starter.mjs"; 
              hydrateBinary(atob("${ btoa( toBinary(mST().transpiled))}"));
              </script>`,
          ).replaceAll(vReg, version);
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
    const mST = () => this.state.mySession.session.get("state");
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
      session.webSocket.send(JSON.stringify({
        hashCode: this.state.mySession.hashCode(),
      }));

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

        if (typeof msg.data !== "string") return;

        let data = JSON.parse(msg.data);

        this.state.mySession.addEvent(
          { ...data, uuid: session.uuid } as unknown as IEvent,
        );

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
              data.type === "video-offer" ||
              data.type === "video-answer")
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
            ...mST().toJSON(),
          }));
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
            data.type === "video-offer" ||
            data.type === "video-answer")
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

        if (data.patch && data.oldHash === this.state.mySession.hashCode()) {
          const newHash: number = data.newHash;
          const oldHash: number = data.oldHash;
          const patch: string = data.patch;

          this.state.mySession.applyPatch(data);
          if (newHash === this.state.mySession.hashCode()) {
            this.broadcast(msg.data);
            const session = mST().toJSON();
            await this.kv.put<ICodeSession>("session", session);

            await this.kv.put(String(newHash), { oldHash, patch });
          } else {
            this.user2user(data.name, {
              hashCode: this.state.mySession.hashCode(),
            });
          }

          return;
        }

        // if (data.i) {
        //   if (data.i <= this.state.session.i) {
        //     this.user2user(data.name, { ...this.state.session });
        //     return;
        //   }

        //   if (data.code && data.i > this.state.session.i) {
        //     const hash = await Hash.of(data.code);

        //     if (data.hashOfCode === hash) {
        //       this.state.session.i = data.i;
        //       this.state.session.code = data.code;
        //       this.state.session.html = data.html;
        //       this.state.session.css = data.css;
        //       this.state.session.transpiled = data.transpiled;
        //       this.state.hashOfCode = hash;
        //       this.hashCache[hash] = data.code;

        //       this.broadcast(msg.data);
        //       await this.kv.put("session", this.state.session);
        //       return;
        //     }
        //   }
        //   let patched = false;
        //   let code = data.code;
        //   let html = data.html;
        //   let css = data.css;
        //   let i = data.i;
        //   let transpiled = data.transpiled;
        //   const hashOfStarterCode = data.hashOfStarterCode;

        //   const codeDiff = data.codeDiff;
        //   const transpiledDiff = data.transpiledDiff;
        //   const htmlDiff = data.htmlDiff;
        //   const cssDiff = data.cssDiff;
        //   const hashOfPatched = data.hashOfCode;

        //   let previousCode = this.state.session.code;
        //   let hashOfPreviousCode = this.state.hashOfCode;

        //   data = { name: session.name };

        //   this.sessions;

        //   if (code) {
        //     this.state.session.code = code;
        //     const hashOfCode = await Hash.of(code);
        //     this.state.session.css = css;
        //     this.state.session.html = html;
        //     this.state.session.transpiled = transpiled;
        //     if (hashOfCode === data.hashOfCode) {
        //       this.state.hashOfCode = hashOfCode;
        //       this.hashCache[hashOfCode] = code;
        //     } else {
        //       return;
        //     }
        //   } else if (hashOfStarterCode != hashOfPreviousCode) {
        //     previousCode = this.hashCache[hashOfStarterCode];
        //     hashOfPreviousCode = hashOfStarterCode;
        //   }
        //   if (codeDiff && previousCode) {
        //     code = applyPatch(previousCode, codeDiff);

        //     const hashOfCode = await Hash.of(code);

        //     if (hashOfCode === hashOfPatched) {
        //       patched = true;
        //       this.state.hashOfCode = hashOfCode;
        //       this.state.session.code = code;

        //       data.hashOfCode = hashOfCode;
        //       data.hashOfPreviousCode = hashOfPreviousCode;
        //       data.codeDiff = codeDiff;
        //     } else {
        //       data.decoded = code;
        //       data.gotHash = hashOfCode;
        //       data.expected = data.hashOfCode;
        //       data.error = "Code mismatch";
        //     }
        //   }

        //   // if (data..length > 4096) {
        //   //   webSocket.send(JSON.stringify({ error: "Message too long." }));
        //   //   return;
        //   // }

        //   data.timestamp = Math.max(
        //     Date.now(),
        //     this.state.session.lastTimestamp + 1
        //   );
        //   this.state.session.lastTimestamp = data.timestamp;

        //   // Broadcast the message to all other WebSockets.
        //   let dataStr = JSON.stringify({
        //     ...data,
        //     i: data.i,
        //     hashOfCode: data.hashOfCode,
        //   });
        //   this.broadcast(dataStr);

        //   if (patched) {
        //     try {
        //       if (cssDiff) css = applyPatch(this.state.session.css, cssDiff);
        //       if (transpiledDiff) {
        //         transpiled = applyPatch(
        //           this.state.session.transpiled,
        //           transpiledDiff
        //         );
        //       }
        //       if (htmlDiff) {
        //         html = applyPatch(this.state.session.html, htmlDiff);
        //       }
        //       this.state.session.css = css;
        //       this.state.session.html = html;
        //       this.state.session.transpiled = transpiled;
        //     } catch {
        //       data.errorUnDiff = true;
        //     }
        //   }
        //   // Save message.
        //   if (code && code === this.state.session.code) {
        //     // await this.kv.put(hashOfCode, code);
        //     await this.kv.put("code", code);
        //   } else {
        //     return;
        //   }

        //   if (html) {
        //     await this.kv.put("html", html);
        //   }
        //   if (transpiled) {
        //     await this.kv.put("transpiled", transpiled);
        //   }
        //   if (css) {
        //     await this.kv.put("css", css);
        //   }

        //   let key = new Date(this.state.session.lastTimestamp).toISOString();
        //   await this.kv.put(key, dataStr);

        //   webSocket.send(JSON.stringify({ msg: "end of fn" }));
        //   return;
        // }
      } catch {
        webSocket.send(
          JSON.stringify({
            error: "unknown error",
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
