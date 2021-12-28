import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import Hash from "ipfs-only-hash";
import HTML from "./index.html";
import { version } from "@spike.land/code/package.json";
import applyDelta from "textdiff-patch";
import { CodeEnv } from "./env";
import SANYI from "./sanyi.js.html";
import type {
  ICodeSess, IEvent, INewWSConnection,
} from "@spike.land/code/js/session.tsx";
import startSession from "@spike.land/code/js/session.tsx";
import { Record } from "immutable";

interface IState extends DurableObjectState {
  session: ISession;
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
  uuid: string,
  name?: string;
  webSocket: WebSocket;
  quit?: boolean;
  blockedMessages: string[];
}

type ResolveFn = (value: unknown) => void;

export class Code {
  state: IState;
  kv: DurableObjectStorage;
  mySession: ICodeSess;
  hashCache: { [key: string]: string } = {};
  sessions: WebsocketSession[];
  constructor(state: IState, private env: CodeEnv) {
    this.kv = state.storage;

    this.state = state;
    this.sessions = [];
    this.env = env;
    this.sessions = [];

    const username =  self.crypto.randomUUID().substring(0,8);
    
    this.mySession = startSession("",{
      name: username,
      users: [],
      capabilities: {
        prettier: false,
        babel: false,
        webRRT: false,
        prerender:false,
        IPFS: false
      },
      state: {  code:"", i:0, transpiled: "", html: "", css: "", errorDiff: "" },
      events: [],
    })

    this.state.blockConcurrencyWhile(async () => {
      const sessionMaybeStr = await this.kv.get<ISession>("session");

      const session: ISession =
        typeof sessionMaybeStr === "string"
          ? JSON.parse(sessionMaybeStr)
          : sessionMaybeStr;

      if (session && session.code) {
       
        let hashOfCode = await Hash.of(session.code);
        this.state.session = session;
        this.state.hashOfCode = hashOfCode;
        this.hashCache[hashOfCode] = session.code;
      }
      else {

      const codeMainId = env.CODE.idFromName("code-main");
      const defaultRoomObject = env.CODE.get(codeMainId);

      const resp = await defaultRoomObject.fetch("session");
      const defaultClone: ISession = await resp.json();

        this.state.session = defaultClone;
        //        this.state.session.code = RCA;

        this.state.hashOfCode = await Hash.of(this.state.session.code);
        this.hashCache[this.state.hashOfCode] = this.state.session.code;
    }

    this.mySession = startSession("",{
      name: username,
      capabilities: {
        prettier: false,
        babel: false,
        webRRT: false,
        prerender:false,
        IPFS: false
      },
      users: [],
      state: { ...session, errorDiff: "" },
      events: [],
    });

      return;
    });
  }

  async fetch(request: Request) {
    return await handleErrors(request, async () => {
      let code = "";
      let patched = false;

      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room");
      if (codeSpace && this.mySession.room ==="") this.mySession.setRoom(codeSpace);


      let path = url.pathname.slice(1).split("/");

      switch (path[0]) {
        case "code": {
          return new Response(this.state.session.code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "session":
          return new Response(JSON.stringify(this.state.session), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "hashCodeSession":
          return new Response(this.mySession.hashCode(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mySession":
          return new Response(JSON.stringify(this.mySession.json()), {
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

          return new Response(
            codeSpace === "sanyi" ? SANYI : this.state.session.transpiled,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            }
          );
        }
        case "hydrated": {
          const htmlContent = this.state.session.html;
          const css = this.state.session.css;

          const html = HTML.replace(
            `<div id="root"></div>`,
            `<div id="root"><style>${css}</style><div id="zbody">${htmlContent}</div></div>`
          ).replace(  
           `import app from "./starter.mjs";app("");`,`
            import App from "https://code.spike.land/api/room/${codeSpace}/js";
            import { jsx } from "@emotion/react";
           
           ReactDOM.hydrate(jsx(App), document.getElementById("zbody"));
            `
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
        case "hashOfCode": {
          return new Response(this.state.hashOfCode, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }

        case "public": {
          const htmlContent = this.state.session.html;
          const css = this.state.session.css;

          const html = HTML.replace(
            `<div id="root"></div>`,
            `<div id="root"><style>${css}</style><div id="zbody">${htmlContent}</div></div>`
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
    webSocket.accept();

    let limiterId = this.env.LIMITERS.idFromName(ip);

    let limiter = new RateLimiterClient(
      () => this.env.LIMITERS.get(limiterId),
      (err: Error) => webSocket.close(1011, err.stack)
    );
    const uuid = self.crypto.randomUUID();


    const newConnEvent: INewWSConnection = {
      uuid,
      hashCode:  this.mySession.hashCode(),
      type: "new-ws-connection",
      timestamp: Date.now()
    };

    webSocket.send(JSON.stringify(newConnEvent));


    this.mySession.addEvent(newConnEvent);
  
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
            i: this.state.session.i,
            hashOfCode: this.state.hashOfCode,
          })
        );
      }
    });

    webSocket.addEventListener("message", async (msg) => {

      try {
        if (session.quit) {

          if (session.name && typeof session.name === "string") {
          this.mySession.addEvent({
            type: "quit",
            target: "broadcast",
            uuid: self.crypto.randomUUID(),
            name: session.name,
            timestamp: Date.now()
          });
        }
          webSocket.close(1011, "WebSocket broken.");
          return;
        }

        if (typeof msg.data !== "string") return;

        let data = JSON.parse(msg.data);

        this.mySession.addEvent({...data, uuid: session.uuid} as unknown as IEvent);

        if (data.type === "get-cid") {
          const CID = data.cid;
          if (this.hashCache[CID]) {
            webSocket.send(
              JSON.stringify({
                type: "get-cid",
                cid: data.cid,
                [CID]: this.hashCache[CID]
              })
            );
          }
          return;
        }

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
            })
          );
          return;
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
            ready: true,
            type: "code-init",
            hashOfCode: this.state.hashOfCode,
            ...this.state.session,
            uuid: data.uuid
          }
      
          webSocket.send(
            JSON.stringify(messageEv)
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

        if (data.i) {
          if (data.i <= this.state.session.i) {
            this.user2user(data.name, { ...this.state.session });
            return;
          }

          if (data.code && data.i > this.state.session.i) {
            const hash = await Hash.of(data.code);

            if (data.hashOfCode === hash) {
              this.state.session.i = data.i;
              this.state.session.code = data.code;
              this.state.session.html = data.html;
              this.state.session.css = data.css;
              this.state.session.transpiled = data.transpiled;
              this.state.hashOfCode = hash;
              this.hashCache[hash] = data.code;

              this.broadcast(msg.data);
              await this.kv.put("session", this.state.session);
              return;
            }
          }
          let patched = false;
          let code = data.code;
          let html = data.html;
          let css = data.css;
          let i = data.i;
          let transpiled = data.transpiled;
          const hashOfStarterCode = data.hashOfStarterCode;

          const codeDiff = data.codeDiff;
          const transpiledDiff = data.transpiledDiff;
          const htmlDiff = data.htmlDiff;
          const cssDiff = data.cssDiff;
          const hashOfPatched = data.hashOfCode;

          let previousCode = this.state.session.code;
          let hashOfPreviousCode = this.state.hashOfCode;

          data = { name: session.name };

          this.sessions;

          if (code) {
            this.state.session.code = code;
            const hashOfCode = await Hash.of(code);
            this.state.session.css = css;
            this.state.session.html = html;
            this.state.session.transpiled = transpiled;
            if (hashOfCode === data.hashOfCode) {
              this.state.hashOfCode = hashOfCode;
              this.hashCache[hashOfCode] = code;
            } else {
              return;
            }
          } else if (hashOfStarterCode != hashOfPreviousCode) {
            previousCode = this.hashCache[hashOfStarterCode];
            hashOfPreviousCode = hashOfStarterCode;
          }
          if (codeDiff && previousCode) {
            code = applyPatch(previousCode, codeDiff);

            const hashOfCode = await Hash.of(code);

            if (hashOfCode === hashOfPatched) {
              patched = true;
              this.state.hashOfCode = hashOfCode;
              this.state.session.code = code;

              data.hashOfCode = hashOfCode;
              data.hashOfPreviousCode = hashOfPreviousCode;
              data.codeDiff = codeDiff;
            } else {
              data.decoded = code;
              data.gotHash = hashOfCode;
              data.expected = data.hashOfCode;
              data.error = "Code mismatch";
            }
          }

          // if (data..length > 4096) {
          //   webSocket.send(JSON.stringify({ error: "Message too long." }));
          //   return;
          // }

          data.timestamp = Math.max(
            Date.now(),
            this.state.session.lastTimestamp + 1
          );
          this.state.session.lastTimestamp = data.timestamp;

          // Broadcast the message to all other WebSockets.
          let dataStr = JSON.stringify({
            ...data,
            i: data.i,
            hashOfCode: data.hashOfCode,
          });
          this.broadcast(dataStr);

          if (patched) {
            try {
              if (cssDiff) css = applyPatch(this.state.session.css, cssDiff);
              if (transpiledDiff) {
                transpiled = applyPatch(
                  this.state.session.transpiled,
                  transpiledDiff
                );
              }
              if (htmlDiff) {
                html = applyPatch(this.state.session.html, htmlDiff);
              }
              this.state.session.css = css;
              this.state.session.html = html;
              this.state.session.transpiled = transpiled;
            } catch {
              data.errorUnDiff = true;
            }
          }
          // Save message.
          if (code && code === this.state.session.code) {
            // await this.kv.put(hashOfCode, code);
            await this.kv.put("code", code);
          } else {
            return;
          }

          if (html) {
            await this.kv.put("html", html);
          }
          if (transpiled) {
            await this.kv.put("transpiled", transpiled);
          }
          if (css) {
            await this.kv.put("css", css);
          }

          let key = new Date(this.state.session.lastTimestamp).toISOString();
          await this.kv.put(key, dataStr);

          webSocket.send(JSON.stringify({ msg: "end of fn" }));
          return;
        }
      } catch {
        webSocket.send(
          JSON.stringify({
            error: "unknown error",
          })
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
