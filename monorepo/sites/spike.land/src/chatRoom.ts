import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import HTML from "./index.html";
import RCA from "./rca.tsx.html";
import HYDRATED from "./hydrated.html";

import { version } from "@spike.land/code/package.json";

import { CodeEnv } from "./env";
import type {
  CodeSession,
  ICodeSession,
  INewWSConnection,
} from "@spike.land/code/js/session";
import {
  hashCode,
  mST,
  patch,
  startSession,
} from "@spike.land/code/js/session";
import imap from "@spike.land/code/js/importmap.json";

interface IState extends DurableObjectState {
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
  codeSpace: string;
  address: string;
  sessions: WebsocketSession[];
  constructor(state: IState, private env: CodeEnv) {
    this.kv = state.storage;
    this.state = state;
    this.sessions = [];
    this.env = env;
    this.codeSpace = "";

    this.state.blockConcurrencyWhile(async () => {
      const session = await this.kv.get<ICodeSession>("session") ||
        await (await (env.CODE.get(env.CODE.idFromName("code-main"))).fetch(
          "session",
        )).json();
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
      let code = "";
      let patched = false;

      const address = this.state.address || "";

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
            const session = await this.kv.get(path[1]);
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
    const uuid = self.crypto.randomUUID();

    const newConnEvent = {
      hashCode: hashCode(),
    };

    webSocket.send(JSON.stringify(newConnEvent));

    let session = {
      uuid,
      webSocket,
      limiter,
      timestamp: Date.now(),
      blockedMessages: [] as string[],
    } as WebsocketSession;

    this.sessions.push(session);

    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(
          JSON.stringify({
            joined: otherSession.name,
            hashCode: hashCode(),
          }),
        );
      }
    });

    webSocket.addEventListener(
      "message",
      (msg: { data: string }) =>
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

  async processWsMessage(msg, session) {
    if (session.quit) {
      webSocket.close(1011, "WebSocket broken.");
      return;
    }

    const {webSocket, limiter} = session;

    const respondWith = (obj)=> session.webSocket.send(JSON.stringify(obj))


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

    if (data.codeSpace && data.address && !this.state.address) {
      this.broadcast(msg.data);

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


        if ( ['new-ice-candidate', 'offer', "answer"].includes(data.type) && !limiter.checkLimit()){
        
          return respondWith({
              error: "Your IP is being rate-limited, please try again later.",
            });
          
        }

        
     
        try {
          if (
            ['new-ice-candidate', 'offer', "answer"].includes(data.type) 
          ) {
            return  this.user2user(data.target, { name: session.name, ...data });
          }

    
          if (data.patch && data.oldHash && data.newHash) {
       
            if (oldHash !== hashCode()){
             return respondWith({hashCode: hashCode()})
            } 

            await patch(data);
            if (newHash === hashCode()) {
              this.broadcast(msg.data);

              respondWith({
                hashCode: newHash,
              });

              await this.kv.put<ICodeSession>("session", mST());
              await this.kv.put(String(newHash), { oldHash, patch });
              return;
            } else {
              return respondWith({
                hashCode: hashCode(),
              });
            }
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
