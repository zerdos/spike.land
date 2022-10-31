"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const tslib_1 = require("tslib");
const handleErrors_1 = require("./handleErrors");
const rateLimiterClient_1 = require("./rateLimiterClient");
const index_html_1 = tslib_1.__importDefault(require("./index.html"));
const iife_html_1 = tslib_1.__importDefault(require("./iife.html"));
const __STATIC_CONTENT_MANIFEST_1 = tslib_1.__importDefault(
  require("__STATIC_CONTENT_MANIFEST"),
);
const session_1 = require("@spike.land/code/js/session");
// import importMap from "@spike.land/code/js/importmap.json";
const getBackupSession_1 = require("./getBackupSession");
const chat_1 = require("./chat");
class Code {
  env;
  state;
  room = "";
  kv;
  codeSpace;
  sess;
  sessionStarted;
  address;
  sessions;
  constructor(state, env) {
    this.env = env;
    this.kv = state.storage;
    this.state = state;
    this.sessionStarted = false;
    this.sessions = [];
    this.sess = null;
    this.env = env;
    this.codeSpace = "";
    this.address = "";
    this.state.blockConcurrencyWhile(async () => {
      const backupSession = (0, getBackupSession_1.getBackupSession)();
      const session = await this.kv.get("session")
        || backupSession;
      if (!session.code) {
        const s = backupSession;
        session.code = s.code;
        session.transpiled = s.transpiled;
        session.i = s.i;
        session.html = s.html;
        session.css = s.css;
      }
      this.address = await this.kv.get("address") || "";
      this.sess = session;
      this.sessionStarted = false;
    });
  }
  async fetch(request, env, ctx) {
    const state = this.sess;
    let url = new URL(request.url);
    if (!this.sessionStarted) {
      (0, session_1.startSession)(this.codeSpace, {
        name: this.codeSpace,
        state,
      }, url.origin);
      this.sessionStarted = true;
    }
    this.codeSpace = url.searchParams.get("room") || "code-main";
    return (0, handleErrors_1.handleErrors)(request, async () => {
      let path = url.pathname.slice(1).split("/");
      switch (path[0]) {
        case "":
        case "index":
        case "index.tsx":
        case "code": {
          return new Response((0, session_1.mST)().code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "session.json":
        case "session": {
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session) {
              // const { i, transpiled, code, html, css } = session;
              return new Response(session, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8",
                },
              });
            } else {
              return new Response(
                JSON.stringify({ success: false, statusCode: 404 }),
                {
                  status: 404,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                },
              );
            }
          }
          return new Response(JSON.stringify((0, session_1.mST)()), {
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
        // case "delta":
        //   type Diff = [-1 | 0 | 1, string];
        //   const delta = await this.kv.get<{
        //     hashCode: number;
        //     delta: Diff[][];
        //   }>("delta");
        //   let deltaDiffs: Diff[][];
        //   if (!delta || delta.hashCode !== hashCode()) {
        //     deltaDiffs = [];
        //   } else {
        //     deltaDiffs = delta.delta;
        //   }
        //   return new Response(JSON.stringify(deltaDiffs || []), {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cache-Control": "no-cache",
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   });
        case "lazy":
          const { html, css, transpiled } = (0, session_1.mST)();
          const hash = (0, session_1.hashCode)();
          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
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
        case "request": {
          return new Response(JSON.stringify({ ...request }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "hashCodeSession":
          return new Response((0, session_1.hashCode)().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mST.mjs":
          const a = JSON.parse(__STATIC_CONTENT_MANIFEST_1.default);
          const assets = {
            "ws.mjs": a["ws.mjs"],
            "react.mjs": a["react.mjs"],
            "emotion.mjs": a["emotion.mjs"],
            "framer-motion.mjs": a["framer-motion.mjs"],
            "ws.css": a["ws.css"],
          };
          return new Response(
            `
              export const assets=${JSON.stringify(assets)};
              export const mST=${JSON.stringify((0, session_1.mST)())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${
              JSON.stringify({
                js: importMapReplace((0, session_1.mST)().transpiled),
              })
            }`,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            },
          );
        case "mST":
          return new Response(
            JSON.stringify({
              mST: (0, session_1.mST)(),
              hashCode: (0, session_1.hashCode)(),
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
          if (path[1]) {
            const session = await this.kv.get(path[1]);
            if (session && session.transpiled) {
              return new Response(session.transpiled, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/javascript; charset=UTF-8",
                },
              });
            }
          }
          return new Response((0, session_1.mST)().transpiled, {
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
          const patch = await this.kv.get(hashCode);
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
        case "dehydrated":
        case "public": {
          const a = JSON.parse(__STATIC_CONTENT_MANIFEST_1.default);
          const respText = index_html_1.default.replaceAll(
            "/live/coder/",
            `/live/${this.codeSpace}/`,
          ).replace(
            `/* #root{} */`,
            `
        #root{
          height: 100%; 
        }
        ${(0, session_1.mST)().css}
        `,
          ).replace("favicon.ico", a["favicon.ico"])
            .replace(
              `<script type="importmap"></script>`,
              `<script type="importmap">
            ${(0, chat_1.getImportMapStr)(url.origin)}
            </script>`,
            )
            .replace(
              `<div id="root"></div>`,
              `<div id="root">
                    <div id="root-${this.codeSpace}" style="height: 100%">
                      ${(0, session_1.mST)().html}
                    </div>
              </div>
         `,
            );
          const Etag = request.headers.get("Etag");
          const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set(
            "Cache-Control",
            "max-age=604800, stale-while-revalidate=86400",
          );
          // headers.set('Etag', newEtag);
          if (Etag === newEtag) {
            // headers.set('CF-Cache-Status', 'HIT');
            return new Response(null, {
              status: 304,
              statusText: "Not modified",
              headers,
            });
          }
          headers.set("Content-Type", "text/html; charset=UTF-8");
          return new Response(respText, {
            status: 200,
            headers,
          });
        }
        case "iife": {
          const startState = (0, session_1.mST)();
          const html = iife_html_1.default.replace(
            `/** startState **/`,
            `Object.assign(window,${
              JSON.stringify({
                startState,
                codeSpace: this.codeSpace,
                address: this.address,
              })
            });`,
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
  async handleSession(webSocket, ip) {
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new rateLimiterClient_1.RateLimiterClient(
      () => this.env.LIMITERS.get(limiterId),
      (err) => webSocket.close(1011, err.stack),
    );
    let session = {
      name: "",
      webSocket,
      limiter,
      timestamp: Date.now(),
      blockedMessages: [],
    };
    this.sessions.push(session);
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session),
    );
    let closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  async processWsMessage(msg, session) {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const { webSocket, limiter, name } = session;
    const respondWith = (obj) => session.webSocket.send(JSON.stringify(obj));
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
    if (!name) {
      if (data.name) {
        session.name = data.name;
        try {
          this.sessions.map((otherSession) => {
            if (otherSession === session) {
              return;
            }
            if (otherSession.name === data.name) {
              otherSession.name = "";
              otherSession.blockedMessages.map((m) => session.webSocket.send(m));
              otherSession.blockedMessages = [];
            }
          });
        } catch (e) {
          respondWith({ error: "error while checked blocked messages" });
        }
        return respondWith({
          hashCode: (0, session_1.hashCode)(),
        });
      }
      return respondWith({
        msg: "no-name-no-party",
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
        hashCode: (0, session_1.hashCode)(),
      });
    }
    try {
      // if (
      //   limiter.checkLimit() &&  !data.type
      // ) {
      //   return respondWith({
      //     error: "Your IP is being rate-limited, please try again later.",
      //   });
      // }
      try {
        if (
          data.target
          && data.type
          && ["new-ice-candidate", "offer", "answer"].includes(data.type)
        ) {
          return this.user2user(data.target, { ...data, name });
        }
        if (data.patch && data.oldHash && data.newHash) {
          const patch = data.patch;
          const newHash = Number(data.newHash);
          const oldHash = Number(data.oldHash);
          if (oldHash !== (0, session_1.hashCode)()) {
            return respondWith({ hashCode: (0, session_1.hashCode)() });
          }
          try {
            await (0, session_1.applyPatch)({ patch, newHash, oldHash });
          } catch (err) {
            return respondWith({
              msg: "strange error",
              err: (err instanceof SyntaxError) ? err.toString() : "Some error",
              stack: (err instanceof SyntaxError)
                ? err.stack?.toString()
                : "no stack",
              hash: (0, session_1.hashCode)(),
            });
          }
          if (newHash === (0, session_1.hashCode)()) {
            try {
              this.broadcast(data);
            } catch {
              return respondWith({
                "msg": "broadcast issue",
              });
            }
            await this.kv.put("session", { ...(0, session_1.mST)() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash,
                patch,
              }),
            );
          }
          return respondWith({
            hashCode: (0, session_1.hashCode)(),
          });
        }
      } catch (exp) {
        console.error({ exp });
        return respondWith({
          error: "unknown error - e1",
          exp: exp || {},
        });
      }
    } catch (exp) {
      console.error({ exp });
      return respondWith({
        error: "unknown error - e2",
        exp: exp || {},
      });
    }
  }
  user2user(to, msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    // Iterate over all the sessions sending them messages.
    this.sessions
      .filter((session) => session.name === to)
      .map((s) => s.webSocket.send(message));
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.sessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        s.blockedMessages.push(message);
      }
    });
  }
}
exports.Code = Code;
function importMapReplace(codeInp) {
  const items = Object.keys(chat_1.imap.imports);
  let returnStr = codeInp;
  items.map((lib) => {
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      `from "${chat_1.imap.imports[lib]}"`,
    );
  });
  return returnStr;
}
async function sha256(myText) {
  const myY = new TextEncoder().encode(myText);
  const myDigest = await crypto.subtle.digest({
    name: "SHA-256",
  }, myY);
  return new TextDecoder("utf-8").decode(new Uint8Array(myDigest));
}
// # sourceMappingURL=chatRoom.js.map
