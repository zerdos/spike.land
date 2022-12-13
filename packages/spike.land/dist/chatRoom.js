"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const tslib_1 = require("tslib");
const handleErrors_1 = require("./handleErrors");
const index_html_1 = tslib_1.__importDefault(require("./index.html"));
// import { RateLimiterClient } from "./rateLimiterClient";
// import type { DurableObjectState, DurableObjectStorage } from "@cloudflare/workers-types";
// import * as CF from "@cloudflare/workers-types";
const importmap_json_1 = tslib_1.__importDefault(
  require("@spike.land/code/js/importmap.json"),
);
const session_1 = require("@spike.land/code/js/session");
const session_2 = require("@spike.land/code/js/session");
const async_mutex_1 = require("async-mutex");
const avl_1 = tslib_1.__importDefault(require("avl"));
const iife_html_1 = tslib_1.__importDefault(require("./iife.html"));
const staticContent_mjs_1 = require("./staticContent.mjs");
class Code {
  env;
  state;
  kv;
  codeSpace;
  sess;
  sessionStarted;
  user = (0, session_2.md5)(self.crypto.randomUUID());
  address;
  users = new avl_1.default((a, b) => a === b ? 0 : a < b ? 1 : -1, true);
  waiting = [];
  sessions;
  mutex = new async_mutex_1.Mutex();
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
      // const backupSession = fetch(origin +  "/api/room/coder-main/session.json").then(x=>x.json());getBackupSession();
      const session = await this.kv.get("session") ||
        await (env.CODE.get(env.CODE.idFromName("code-main"))).fetch(
          "session.json",
        ).then((x) => x.json());
      if (!session) {
        throw Error("cant get the starter session");
      }
      // if (!session.code) {
      //   const s = backupSession;
      //   session.code = s.code;
      //   session.transpiled = s.transpiled;
      //   session.i = s.i;
      //   session.html = s.html;
      //   session.css = s.css;
      // }
      this.address = await this.kv.get("address") || "";
      this.sess = session;
      this.sessionStarted = false;
    });
  }
  wait = (x) => {
    this.waiting = this.waiting.filter((x) => !x());
    if (x && !x()) {
      this.waiting.push(x);
    }
  };
  async fetch(request) {
    const state = this.sess;
    const url = new URL(request.url);
    this.wait();
    this.codeSpace = url.searchParams.get("room") || "code-main";
    if (!this.sessionStarted) {
      (0, session_2.startSession)(this.codeSpace, {
        state,
        name: this.codeSpace,
      }, url.origin);
      this.sessionStarted = true;
    }
    return (0, handleErrors_1.handleErrors)(request, async () => {
      const { code, transpiled, css, html, i } = (0, session_2.mST)();
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0) {
        path.push("");
      }
      switch (path[0]) {
        case "code":
        case "index.tsx":
          return new Response(code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: (0, session_2.md5)(code),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
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
                  content_hash: (0, session_2.md5)(session),
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
          const body = JSON.stringify((0, session_2.mST)());
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: (0, session_2.md5)(body),
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
        case "list": {
          const list = await this.kv.list();
          return new Response(JSON.stringify({ ...list }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "hashCodeSession":
          return new Response((0, session_2.hashCode)().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mST.mjs": {
          const body = `
          export const mST=${JSON.stringify((0, session_2.mST)())};
          export const codeSpace="${this.codeSpace}";
          export const address="${this.address}";
          export const importmapReplaced=${
            JSON.stringify({
              js: importMapReplace((0, session_2.mST)().transpiled, url.origin),
            })
          }`;
          const content_hash = (0, session_2.md5)(body);
          return new Response(
            `
              export const mST=${JSON.stringify((0, session_2.mST)())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${
              JSON.stringify({
                js: importMapReplace(
                  (0, session_2.mST)().transpiled,
                  url.origin,
                ),
              })
            }`,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                content_hash: content_hash,
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            },
          );
        }
        case "mST":
          return new Response(
            JSON.stringify({
              mST: (0, session_2.mST)(),
              hashCode: (0, session_2.hashCode)(),
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
        case "path":
          return new Response(path.join("----"), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        case "render.tsx": {
          const codeSpace = this.codeSpace;
          const src = importMapReplace(
            `import {createRoot} from "react-dom/client"
          import { CacheProvider } from "@emotion/react";
          import createCache from "@emotion/cache";
          import { ErrorBoundary } from "react-error-boundary";
          import App from "${url.origin}/live/${codeSpace}/index.js/${i}"
          
          document.body.innerHTML = '<div id="root"></div>';

      let rootEl = document.getElementById("root");

      rootEl.innerHTML="";
       
      const root = createRoot(rootEl);
      
        const cache = createCache({
          key: "z",
          container: rootEl,
          speedy: false
        });
      
       cache.compat = undefined;
      
      root.render(<ErrorBoundary
        fallbackRender={({ error }) => (
          <div role="alert">
            <div>Oh no</div>
            <pre>{error.message}</pre>
          </div>
        )}>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
        </ErrorBoundary>);`,
            url.origin,
          );
          return new Response(src, {
            headers: {
              "x-typescript-types":
                `${url.origin}/live/${this.codeSpace}/render.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: (0, session_2.md5)(src),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "index.mjs":
        case "index.js":
        case "js": {
          const i = path[1] || (0, session_2.mST)().i;
          if (i > (0, session_2.mST)().i) {
            const started = Date.now() / 1000;
            const body = await new Promise((res, reject) =>
              this.wait(() => {
                const now = Date.now() / 1000;
                if (
                  (0, session_2.mST)().i < Number(i) && started - now < 3000
                ) {
                  return false;
                }
                if (
                  (0, session_2.mST)().i < Number(i) && started - now >= 3000
                ) {
                  reject(null);
                  return false;
                }
                res((0, session_2.mST)().transpiled);
                return true;
              })
            );
            const trp = importMapReplace(body, url.origin);
            return new Response(trp, {
              status: 200,
              headers: {
                "x-typescript-types":
                  `${url.origin}/live/${this.codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                content_hash: (0, session_2.md5)(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          if (i < (0, session_2.mST)().i) {
            const trp = importMapReplace(transpiled, url.origin);
            return new Response(trp, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Location": `${url.origin}/live/${this.codeSpace}/index.mjs/${
                  (0, session_2.mST)().i
                }`,
                "Cache-Control": "no-cache",
                content_hash: (0, session_2.md5)(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          const trp = importMapReplace(transpiled, url.origin);
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: (0, session_2.md5)(trp),
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
        case "":
        case "hydrated":
        case "worker":
        case "dehydrated":
        case "public": {
          const respText = index_html_1.default.replace(
            "/**reset*/",
            session_1.resetCSS +
              css.split((0, session_2.md5)(transpiled)).join(`css`),
          )
            .replace(
              `<script type="importmap"></script>`,
              `<script type="importmap">${
                JSON.stringify(importmap_json_1.default)
              }</script>`,
            )
            .replace(
              `<div id="root"></div>`,
              `<div id="root" data-i="${i}" style="height: 100%;">${
                html.split((0, session_2.md5)(transpiled)).join(`css`)
              }</div>`,
            ).split("ASSET_HASH").join(staticContent_mjs_1.ASSET_HASH);
          // const Etag = request.headers.get("Etag");
          // const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set("Cache-Control", "no-cache");
          // headers.set('Etag', newEtag);
          // if (Etag === newEtag) {
          //   // headers.set('CF-Cache-Status', 'HIT');
          //   return new Response(null, {
          //     status: 304,
          //     statusText: "Not modified",
          //     headers,
          //   });
          // }
          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", (0, session_2.md5)(respText));
          // headers.set("Etag", newEtag)
          // headers.set("x-content-digest", `SHA-256=${newEtag}`);÷≥≥÷÷÷
          return new Response(respText, {
            status: 200,
            headers,
          });
        }
        case "iife": {
          const startState = (0, session_2.mST)();
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
          const pair = new WebSocketPair();
          await this.handleSession(pair[1]);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }
  async handleSession(webSocket) {
    webSocket.accept();
    // const limiter = new CodeRateLimiter(  );
    // Create our session and add it to the sessions list.
    // We don't send any messages to the client until it has sent us the initial user info
    // message. Until then, we will queue messages in `session.blockedMessages`.
    const session = {
      name: "",
      quit: false,
      webSocket,
      blockedMessages: [],
    };
    this.sessions.push(session);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(
          JSON.stringify({ name: otherSession.name }),
        );
      }
    });
    const storage = await this.kv.list({ reverse: true, limit: 100 });
    const backlog = [...storage.values()];
    backlog.reverse();
    backlog.forEach((value) => {
      session.blockedMessages.push(
        typeof value === "string" ? value : JSON.stringify(value),
      );
    });
    webSocket.addEventListener(
      "message",
      (msg) => this.processWsMessage(msg, session),
    );
    const closeOrErrorHandler = () => {
      session.quit = true;
      this.users.remove(session.name);
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  async processWsMessage(msg, session) {
    if (session.quit) {
      this.users.remove(session.name);
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const { name } = session;
    // session.lastSeen = Date.now();
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
              otherSession.blockedMessages.map((m) =>
                session.webSocket.send(m)
              );
              otherSession.blockedMessages = [];
            }
          });
          if (data.hashCode) {
            if (data?.hashCode !== (0, session_2.hashCode)()) {
              const patch = (0, session_2.makePatchFrom)(
                data.hashCode,
                (0, session_2.mST)(),
              );
              if (patch) {
                return respondWith({ ...patch });
              }
            }
          }
        } catch (e) {
          respondWith({ error: "error while checked blocked messages" });
        }
        const userNode = this.users.insert(data.name);
        const usersNum = this.users.keys().length;
        const rtcConnUser = usersNum > 2
          ? (userNode.parent?.key || userNode.left?.key || userNode.right?.key)
          : null;
        return respondWith({
          ...(rtcConnUser ? { name: rtcConnUser } : {}),
          hashCode: (0, session_2.hashCode)(),
          users: this.users.keys(),
        });
      }
      return respondWith({
        msg: "no-name-no-party",
      });
    }
    if (data.i <= (0, session_2.mST)().i) {
      return;
    }
    await this.mutex.runExclusive(async () => {
      if (data.i <= (0, session_2.mST)().i) {
        return;
      }
      if (data.codeSpace && data.address && !this.address) {
        return this.broadcast(data);
      }
      try {
        // if (
        //   !data.type && limiter.checkLimit()
        // ) {
        //   return respondWith({
        //     error: "Your IP is being rate-limited, please try again later.",
        //   });
        // }
        try {
          if (
            data.target &&
            data.type &&
            ["new-ice-candidate", "video-offer", "video-answer"].includes(
              data.type,
            )
          ) {
            return this.user2user(data.target, { ...data, name });
          }
          const newHash = (0, session_2.applyPatchSync)(data);
          if (newHash === data.newHash) {
            await this.kv.put("session", { ...(0, session_2.mST)() });
            await this.kv.put(
              String(newHash),
              JSON.stringify({
                oldHash: data,
                patch: data,
              }),
            );
            return this.broadcast(data);
          }
          if (data.patch && data.oldHash && data.newHash) {
            const patch = data.patch;
            const newHash = data.newHash;
            const oldHash = data.oldHash;
            if (oldHash !== (0, session_2.hashCode)()) {
              return respondWith({ hashCode: (0, session_2.hashCode)() });
            }
            try {
              (0, session_2.applyPatchSync)({ newHash, oldHash, patch });
            } catch (err) {
              console.error({ err });
              return respondWith({ err });
            }
            if (newHash === (0, session_2.hashCode)()) {
              try {
                this.broadcast(data);
              } catch {
                return respondWith({
                  "msg": "broadcast issue",
                });
              }
              await this.kv.put("session", { ...(0, session_2.mST)() });
              await this.kv.put(
                String(newHash),
                JSON.stringify({
                  oldHash,
                  patch,
                }),
              );
            }
            return respondWith({
              hashCode: (0, session_2.hashCode)(),
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
    });
  }
  user2user(to, msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    // Iterate over all the sessions sending them messages.
    this.sessions
      .filter((session) => session.name === to)
      .map((s) => {
        try {
          s.webSocket.send(message);
        } catch {
          console.error("p2p error");
          "";
        }
      });
  }
  broadcast(msg) {
    const message = JSON.stringify(msg);
    this.sessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        this.users.remove(s.name);
        s.blockedMessages.push(message);
      }
    });
  }
}
exports.Code = Code;
function importMapReplace(codeInp, origin) {
  const items = Object.keys(importmap_json_1.default.imports);
  let returnStr = codeInp;
  items.map((lib) => {
    const uri = importmap_json_1.default.imports[lib].slice(1);
    returnStr = returnStr.replaceAll(
      ` from "${String(lib)}"`,
      ` from "${origin}/${String(uri)}"`,
    ).replaceAll(` from "./`, ` from "${origin}/live/`).replaceAll(
      ` from "/`,
      ` from "${origin}/`,
    );
  });
  returnStr = returnStr.split(";").map((x) => x.trim()).map((x) => {
    if (x.startsWith("import") && x.indexOf(`"https://`) === -1) {
      return x.replaceAll(` "`, ` "${origin}/npm:/`);
    }
    if (x.startsWith("import") && x.includes(origin)) {
      const u = new URL(x.split(`"`)[1]);
      if (u && u.pathname.indexOf(".") === -1) {
        return x.slice(0, -1) + `/index.js"`;
      }
    }
    return x;
  }).join(";");
  return returnStr;
}
//# sourceMappingURL=chatRoom.js.map
