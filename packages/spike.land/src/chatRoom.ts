import { handleErrors } from "./handleErrors";
import HTML from "./index.html";
// import { RateLimiterClient } from "./rateLimiterClient";

import importMap from "@spike.land/code/js/importmap.json";
import { ICodeSession, resetCSS } from "@spike.land/code/js/session";
import { applyPatch, hashCode, makePatchFrom, md5, mST, startSession } from "@spike.land/code/js/session";
import type { Delta } from "@spike.land/code/js/session";
import AVLTree from "avl";
import { imap } from "./chat";
import { CodeEnv } from "./env";
import IIFE from "./iife.html";
import { files } from "./staticContent.mjs";
// import { CodeRateLimiter } from "./rateLimiter";

interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  blockedMessages: string[];
}

export class Code {
  state: DurableObjectState;
  kv: DurableObjectStorage;
  codeSpace: string;
  sess: ICodeSession | null;
  sessionStarted: boolean;
  user = md5(self.crypto.randomUUID());
  address: string;
  users = new AVLTree(
    (a: string, b: string) => a === b ? 0 : a < b ? 1 : -1,
    true,
  );
  waiting: (() => boolean)[] = [];
  sessions: WebsocketSession[];

  constructor(state: DurableObjectState, private env: CodeEnv) {
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
      const session = await this.kv.get<ICodeSession>("session")
        || await (env.CODE.get(env.CODE.idFromName("code-main"))).fetch(
          "session.json",
        ).then((x) => x.json());
      if (!session) throw Error("cant get the starter session");
      // if (!session.code) {
      //   const s = backupSession;
      //   session.code = s.code;
      //   session.transpiled = s.transpiled;
      //   session.i = s.i;
      //   session.html = s.html;
      //   session.css = s.css;
      // }
      this.address = await this.kv.get<string>("address") || "";
      this.sess = session;
      this.sessionStarted = false;
    });
  }
  wait = (x?: () => boolean) => {
    this.waiting = this.waiting.filter((x) => !x());
    if (x && !x()) this.waiting.push(x);
  };

  async fetch(request: Request) {
    const state = this.sess!;
    const url = new URL(request.url);

    this.wait();

    this.codeSpace = url.searchParams.get("room") || "code-main";

    if (!this.sessionStarted) {
      startSession(
        this.codeSpace,
        { state, name: this.codeSpace },
        url.origin,
      );
      this.sessionStarted = true;
    }

    return handleErrors(request, async () => {
      const { code, transpiled, css, html, i } = mST();
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0) path.push("");

      switch (path[0]) {
        case "code":
        case "index.tsx":
          return new Response(code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: md5(code),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        case "session.json":
        case "session": {
          if (path[1]) {
            const session = await this.kv.get<string>(path[1]);
            if (session) {
              // const { i, transpiled, code, html, css } = session;

              return new Response(session, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "no-cache",
                  content_hash: md5(session),
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
          const body = JSON.stringify(mST());
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              content_hash: md5(body),
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
          return new Response(hashCode().toString(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "mST.mjs": {
          const body = `
          export const mST=${JSON.stringify(mST())};
          export const codeSpace="${this.codeSpace}";
          export const address="${this.address}";
          export const importmapReplaced=${
            JSON.stringify({
              js: importMapReplace(mST().transpiled, url.origin),
            })
          }`;

          const content_hash = md5(body);

          return new Response(
            `
              export const mST=${JSON.stringify(mST())};
              export const codeSpace="${this.codeSpace}";
              export const address="${this.address}";
              export const importmapReplaced=${
              JSON.stringify({
                js: importMapReplace(mST().transpiled, url.origin),
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
              "x-typescript-types": `${url.origin}/live/${this.codeSpace}/render.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",

              content_hash: md5(src),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "index.js":
        case "js": {
          const i = path[1] || mST().i;
          if (i > mST().i) {
            const started = Date.now() / 1000;
            const body = await new Promise<string>((res, reject) =>
              this.wait(() => {
                const now = Date.now() / 1000;

                if (mST().i < Number(i) && started - now < 3000) {
                  return false;
                }
                if (mST().i < Number(i) && started - now >= 3000) {
                  reject(null);
                  return false;
                }

                res(mST().transpiled);
                return true;
              })
            );
            const trp = importMapReplace(body, url.origin);
            return new Response(trp, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          if (i < mST().i) {
            const trp = importMapReplace(transpiled, url.origin);
            return new Response(trp, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Location": `${url.origin}/live/${this.codeSpace}/index.js/${mST().i}`,
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          const trp = importMapReplace(transpiled, url.origin);
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",

              content_hash: md5(trp),
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
        case "":
        case "hydrated":
        case "dehydrated":
        case "public": {
          const respText = HTML.replace("/**reset*/", resetCSS + css.split(md5(transpiled)).join(`css`))
            .replace(
              `<script type="importmap"></script>`,
              `<script type="importmap">${JSON.stringify({ imports: { ...files, ...importMap.imports } })}</script>`,
            )
            .replace(
              `<root/>`,
              `<div id="root" data-i="${i}" style="height: 100%;">${html.split(md5(transpiled)).join(`css`)}</div>`,
            );

          // const Etag = request.headers.get("Etag");
          // const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");
          headers.set(
            "Cache-Control",
            "no-cache",
          );

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
          headers.set("content_hash", md5(respText));
          // headers.set("Etag", newEtag)
          // headers.set("x-content-digest", `SHA-256=${newEtag}`);÷≥≥÷÷÷
          return new Response(respText, {
            status: 200,
            headers,
          });
        }
        case "iife": {
          const startState = mST();
          const html = IIFE.replace(
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

          // eslint-disable-next-line no-undef
          const pair = new WebSocketPair();

          await this.handleSession(pair[1]);

          return new Response(null, { status: 101, webSocket: pair[0] });
        }

        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }

  async handleSession(webSocket: WebSocket) {
    webSocket.accept();

    // const limiter = new CodeRateLimiter(  );

    // Create our session and add it to the sessions list.
    // We don't send any messages to the client until it has sent us the initial user info
    // message. Until then, we will queue messages in `session.blockedMessages`.
    const session = {
      name: "",
      quit: false,
      webSocket,
      blockedMessages: [] as string[],
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
      (msg: { data: string | ArrayBuffer }) => this.processWsMessage(msg, session),
    );

    const closeOrErrorHandler = () => {
      session.quit = true;
      this.users.remove(session.name);
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  async processWsMessage(
    msg: { data: string | ArrayBuffer },
    session: WebsocketSession,
    //    limiter: RateLimiterClient,
  ) {
    if (session.quit) {
      this.users.remove(session.name);
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }

    const { name } = session;
    // session.lastSeen = Date.now();

    const respondWith = (obj: unknown) => session.webSocket.send(JSON.stringify(obj));

    let data: {
      name?: string;
      timestamp?: number;
      codeSpace?: string;
      target?: string;
      type?: "new-ice-candidate" | "video-offer" | "video-answer";
      patch?: Delta[];
      address?: string;
      hashCode?: string;
      newHash?: string;
      oldHash?: string;
    };
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
            if (otherSession === session) return;

            if (otherSession.name === data.name) {
              otherSession.name = "";
              otherSession.blockedMessages.map((m) => session.webSocket.send(m));
              otherSession.blockedMessages = [];
            }
          });

          if (data.hashCode) {
            if (data?.hashCode !== hashCode()) {
              const patch = makePatchFrom(data.hashCode, mST());
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
          hashCode: hashCode(),
          users: this.users.keys(),
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
        hashCode: hashCode(),
      });
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
          data.target
          && data.type
          && ["new-ice-candidate", "video-offer", "video-answer"].includes(
            data.type,
          )
        ) {
          return this.user2user(data.target, { ...data, name });
        }

        if (data.patch && data.oldHash && data.newHash) {
          const patch = data.patch;
          const newHash = data.newHash;
          const oldHash = data.oldHash;

          if (oldHash !== hashCode()) {
            return respondWith({ hashCode: hashCode() });
          }

          try {
            await applyPatch({ newHash, oldHash, patch });
            this.wait();
          } catch (err) {
            console.error({ err });
            return respondWith({ err });
          }

          if (newHash === hashCode()) {
            try {
              this.wait();
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

  user2user(to: string, msg: unknown | string) {
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

  broadcast(msg: unknown) {
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

function importMapReplace(codeInp: string, origin: string) {
  const items = Object.keys(
    imap.imports,
  ) as (keyof typeof imap.imports)[];
  let returnStr = codeInp;

  items.map((lib: keyof typeof imap.imports) => {
    const uri = (new URL(imap.imports[lib], origin)).toString();
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      ` from "${uri}"`,
    ).replaceAll(
      ` from "./`,
      ` from "https://${origin}/live/`,
    ).replaceAll(
      ` from "/`,
      ` from "https://${origin}/`,
    );
  });

  returnStr = returnStr.split(";").map(x => x.trim()).map(x => {
    if (x.startsWith("import") && x.indexOf(`"https://`) === -1) {
      return x.replaceAll(` "`, ` "${origin}/npm:/`);
    }
    if (x.includes(origin) && x.endsWith(`.mjs";`)) {
      return x.slice(0, -2) + `/index.mjs";`;
    }
    return x;
  }).join(";");

  return returnStr;
}
