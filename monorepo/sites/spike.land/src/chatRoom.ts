import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import HTML from "./index.html";

import { CodeEnv } from "./env";
import type { ICodeSession } from "@spike.land/code/js/session";
import {
  hashCode,
  mST,
  patch as applyPatch,
  startSession,
} from "@spike.land/code/js/session";
import imap from "@spike.land/code/js/importmap.json";

interface IState extends DurableObjectState {
}

interface WebsocketSession {
  uuid: string;
  name?: string;
  limiter: RateLimiterClient;
  webSocket: WebSocket;
  quit?: boolean;
  blockedMessages: string[];
}

export class Code {
  state: IState;
  room: string = "";
  kv: DurableObjectStorage;
  codeSpace: string;
  address: string;
  sessions: WebsocketSession[];
  constructor(state: IState, private env: CodeEnv) {
    this.kv = state.storage;
    this.state = state;
    this.sessions = [];
    this.env = env;
    this.codeSpace = "";
    this.address = "";

    this.state.blockConcurrencyWhile(async () => {
      const session = await this.kv.get<ICodeSession>("session") ||
        await (await (env.CODE.get(env.CODE.idFromName("code-main"))).fetch(
          "session",
        )).json() as ICodeSession;
      this.address = await this.kv.get<string>("address") || "";

      startSession(this.codeSpace, {
        name: this.codeSpace,
        state: session,
      });
    });
  }

  async fetch(request: Request, env: CodeEnv) {
    let url = new URL(request.url);
    this.codeSpace = url.searchParams.get("room") || "code-main";

    return await handleErrors(request, async () => {
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
        case "session": {
          if (path[1]) {
            const session = await this.kv.get<ICodeSession>(path[1]);
            if (session) {
              const { i, transpiled, code, html, css } = session;

              new Response(JSON.stringify({ i, transpiled, code, html, css }), {
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
        }
        // case "prettier": {
        //   return new Response(prettier(mST().code), {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cache-Control": "no-cache",
        //       "Content-Type": "application/javascript; charset=UTF-8",
        //     },
        //   });
        // }
        case "delta":
          type Diff = [-1 | 0 | 1, string];

          const delta = await this.kv.get<{
            hashCode: number;
            delta: Diff[][];
          }>("delta");

          let deltaDiffs: Diff[][];

          if (!delta || delta.hashCode !== hashCode()) {
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
          const hash = hashCode();

          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "https://spike.land/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${this.codeSpace}"}) ;
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
          return new Response(hashCode().toString(), {
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
              hashCode: hashCode(),
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
          return new Response(JSON.stringify({ codeSpace: this.codeSpace }), {
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
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "hydrated":
        case "public": {
          const startState = mST();
          const html = HTML.replace(
            `/** startState **/`,
            `Object.assign(window,${
              JSON.stringify({
                startState,
                codeSpace: this.codeSpace,
                address: this.address,
              })
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
    webSocket.accept();

    let limiterId = this.env.LIMITERS.idFromName(ip);

    let limiter = new RateLimiterClient(
      () => this.env.LIMITERS.get(limiterId),
      (err: Error) => webSocket.close(1011, err.stack),
    );


    let session = {
      name: null,
      webSocket,
      limiter,
      timestamp: Date.now(),
      blockedMessages: [] as string[],
    } as WebsocketSession;

    this.sessions.push(session);


    webSocket.addEventListener(
      "message",
      (msg: { data: string | ArrayBuffer }) =>
        this.processWsMessage(msg, session),
    );

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

  async processWsMessage(
    msg: { data: string | ArrayBuffer },
    session: WebsocketSession,
  ) {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }

    

    const { webSocket, limiter, name } = session;



    const respondWith = (obj: Object) =>
      session.webSocket.send(JSON.stringify(obj));

    let data;
    try {
      data = typeof msg.data === "string"
        ? JSON.parse(msg.data)
        : JSON.parse(new TextDecoder().decode(msg.data));
    } catch (exp) {
      return respondWith({
        error: "JSON parse error",
        exp: exp || {},
      });
    }
    
    
    
    if (!name ) {
    if (data.name){
      

     this.sessions= this.sessions.map((otherSession) => {
        if (otherSession.name === data.name) {
          otherSession.name = null;
          otherSession.blockedMessages.map(m=>session.webSocket.send(m));
          otherSession.blockedMessages=[];
        }
      });
  
      session.name = data.name;

      return respondWith({
        hashCode: hashCode()
      })
    }

    return respondWith({
        msg: "no-name-no-party"
      });   
    }

    if (data.codeSpace && data.address && !this.address) {
      try {
        this.broadcast(data);
      } catch {
        return respondWith({
          "msg": "broadcast issue",
        });
      }

      this.address = data.address;
      await this.kv.put("address", data.address);

      return;
    }

    if (data.timestamp && !data.patch) {
      return respondWith({
        timestamp: Date.now(),
        hashCode: hashCode(),
      });
    }

    try {
      if (
        limiter.checkLimit() && 
       ! (["new-ice-candidate", "offer", "answer"].includes(data.type))
        
      ) {
        return respondWith({
          error: "Your IP is being rate-limited, please try again later.",
        });
      }

      try {
        if (
          data.type &&
          ["new-ice-candidate", "offer", "answer"].includes(data.type)
        ) {
          return this.user2user(data.target, { ...data,  name });
        }

        if (data.patch && data.oldHash && data.newHash) {
          const patch = data.patch;
          const newHash = Number(data.newHash);
          const oldHash = Number(data.oldHash);

          if (oldHash !== hashCode()) {
            return respondWith({ hashCode: hashCode() });
          }

          try {
            await applyPatch(data);
          } catch (err) {
            return respondWith({
              msg: "strange error",
              err: err.toString(),
              stack: err.stack.toString(),
              hash: hashCode(),
            });
          }

          if (newHash === hashCode()) {
            try {
              this.broadcast(data);
            } catch {
              return respondWith({
                "msg": "broadcast issue",
              });
            }

            await this.kv.put<ICodeSession>("session", { ...mST() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash,
                patch,
              }),
            );
          }
          return respondWith({
            hashCode: hashCode(),
          });
        }
      } catch (exp) {
        console.error({ exp });
        return respondWith({
          error: "unknown error - Trarraax",
          exp: exp || {},
        });
      }
    } catch (exp) {
      console.error({ exp });
      return respondWith({
        error: "unknown error - kxzkx",
        exp: exp || {},
      });
    }
  }

  user2user(to: string, msg: Object | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;

    // Iterate over all the sessions sending them messages.
    this.sessions
      .filter((session) => session.name === to)
      .map((s) => s.webSocket.send(message));
  }

  broadcast(msg: Object ) {
    const message = JSON.stringify(msg);

    this.sessions.filter((s) => s.name).map((s)=>{
        try {
          s.webSocket.send(message);
        } catch (err) {
          s.quit=true;
          s.blockedMessages.push(message);
        }
      }
      
    );

    
  }
}
