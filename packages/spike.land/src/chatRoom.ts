import type { CodePatch, CodeSession, Delta, ICodeSession } from "../../code/dist/src/session.d";
import { patchSync, resetCSS, string_, syncStorage } from "../../code/dist/src/session.mjs";
import { aPatch, HTML, md5 } from "../../code/dist/src/session.mjs";
// import { Mutex } from "async-mutex";
import AVLTree from "avl";
import { Record } from "immutable";
import { handleErrors } from "./handleErrors";
// import pMap from "p-map";
import { CodeEnv } from "./env";
import { initAndTransform } from "./esbuild";
// import { esmTransform } from "./esbuild.wasm";
import ASSET_HASH from "./dist.shasum";

// import { CodeRateLimiter } from "./rateLimiter";

interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  // blockedMessages: string[];
}

function hashCode(sess: ICodeSession) {
  return Record<ICodeSession>(sess)().hashCode();
}

export class Code {
  state: DurableObjectState;
  kv: DurableObjectStorage;
  // mutex: Mutex;
  session: CodeSession | null;
  sess: ICodeSession | null;
  user = md5(self.crypto.randomUUID());
  users = new AVLTree(
    (a: string, b: string) => a === b ? 0 : a < b ? 1 : -1,
    true,
  );
  head = 0;
  waiting: (() => boolean)[] = [];
  wsSessions: WebsocketSession[];
  buffy: Promise<void>[] = [];
  i = 0;

  mST(p?: Delta[]) {
    if (p && p.length) {
      const sessAsJs = this.session!.session.get("state").toJSON();

      const { i, transpiled, code, html, css }: ICodeSession = p
        ? JSON.parse(
          aPatch(
            string_(
              sessAsJs,
            ),
            p,
          ),
        )
        : sessAsJs;
      return this.session!.session.get("state").merge({
        i,
        transpiled,
        code,
        html,
        css,
      }).toObject();
    }
    return this.session!.session.get("state").toObject();
  }
  user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;

    // Iterate over all the sessions sending them messages.
    this.wsSessions
      .filter((session) => session.name === to)
      .map((s) => {
        try {
          s.webSocket.send(message);
        } catch {
          console.error("p2p error");
        }
      });
  }

  broadcast(msg: unknown) {
    const message = JSON.stringify(msg);

    this.wsSessions.filter((s) => s.name).map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        this.users.remove(s.name);
        // s.blockedMessages.push(message);
      }
    });
  }

  syncKV(
    oldSession: ICodeSession,
    newSess: ICodeSession,
    message: CodePatch,
  ) {
    return (async () =>
      await syncStorage(
        async (
          key: string,
          v: object,
        ) => (await this.kv.put(key, v, {
          allowConcurrency: false,
        })), // .then(x=>console.log(x)).catch(()=>console.error('error')).finally(()=>console.log("ok")),
        async (key: string) => await this.kv.get(String(key), { allowConcurrency: true }),
        oldSession,
        newSess,
        message,
      ))();
  }

  constructor(state: DurableObjectState, private env: CodeEnv) {
    this.state = state;
    this.kv = state.storage;
    this.sess = null;
    this.session = null;
    this.head = 0;
    this.wsSessions = [];
    this.env = env;

    // this.mutex = new Mutex();

    this.state.blockConcurrencyWhile(async () => {
      try {
        // const backupSession = fetch(origin +  "/api/room/coder-main/session.json").then(x=>x.json());getBackupSession();

        this.head = await this.kv.get("head") || 0;

        this.sess = await this.kv.get<ICodeSession>(this.head ? String(this.head) : "session", {
          allowConcurrency: true,
        }) || await (env.CODE.get(env.CODE.idFromName("code-main"))).fetch(
          "session.json",
        ).then((x) => x.json());
        if (!this.sess) throw Error("cant get the starter session");
        // if (!session.code) {
        //   const s = backupSession;
        //   session.code = s.code;
        //   session.transpiled = s.transpiled;
        //   session.i = s.i;
        //   session.html = s.html;
        //   session.css = s.css;
        // }

        if (Number(this.head + 50) !== 50 + this.head) this.head = 0;

        // if ( (head+1) !== Number(head)+1 ) {
        //   head =
        // }
      } catch {
        throw Error("cant get the starter session");
      }
    });
  }
  wait = (x?: () => boolean) => {
    this.waiting = this.waiting.filter((x) => !x()) || [];
    if (x && !x()) this.waiting.push(x);
  };

  async fetch(request: Request) {
    const url = new URL(request.url);

    this.wait();
    const codeSpace = url.searchParams.get("room");

    if (this.head === 0) {
      // const headValue = await this.kv.get<CodePatch>(this.head);
      // if (headValue) {
      this.head = hashCode(this.sess!);

      this.kv.put(String(this.head), this.sess!).then(() => this.kv.put("head", this.head));

      // const newSession = this.sess;

      // patchSync(oldSession, true);
      // const message = makePatch(newSession);
      // patchSync(newSession, true);
      // await this.syncKV(oldSession, newSession, message);
    }

    if (request.method === "POST") {
      try {
        const mess:
          | Partial<CodePatch & ICodeSession & { session: ICodeSession }>
          | undefined = await request.json();
        if (mess) {
          if (!mess.patch || (mess.patch && mess.i && mess.i > this.i)) {
            if (mess.i) {
              this.i = mess.i;

              const reversePatch: Delta[] = mess.reversePatch || [];
              const patch: Delta[] = mess.patch || [];
              const oldState = this.sess!;
              const newState = this.mST(patch);
              const oldHash = hashCode(oldState);
              const newHash = hashCode(newState);
              if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
                console.error({ mess, calculated: { oldHash, newHash } });
                throw ("Error - we messed up the hashStores");
              }

              const newRec = this.session!.session.get("state").merge(
                newState,
              );
              this.session!.session = this.session!.session.set(
                "state",
                newRec,
              );
              this.sess = this.session!.session.get("state").toObject();

              this.syncKV(oldState, newState, {
                oldHash,
                newHash,
                patch,
                reversePatch,
              });
              this.broadcast(mess);
              return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8",
                },
              });
            }
          }
        }
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: { e } }), {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
      }
      return new Response(JSON.stringify({ success: true, message: "nothing happened" }), {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    }

    return handleErrors(request, async () => {
      const { code, css, html, i } = this.sess!;
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0) path.push("");

      switch (path[0]) {
        case "code":
        case "index.tsx":
          return new Response(code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(code),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });

        case "index.trans.js": {
          const trp = await initAndTransform(
            this.sess!.code,
            {},
            url.origin,
          );
          return new Response(trp, {
            status: 200,
            headers: {
              "x-typescript-types": `${url.origin}/live/${codeSpace}/index.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",

              content_hash: md5(trp),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "sessions": {
          const d = await this.state.storage.list({ start: path[1] || "0", end: path[2] || "100" });

          return new Response(JSON.stringify(d), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(d),
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "session.json":
        case "session": {
          if (path[1]) {
            let session = await this.kv.get<string | object>(path[1], {
              allowConcurrency: true,
            });
            if (session) {
              if (typeof session !== "string") {
                session = JSON.stringify(session);
              }

              // const { i, transpiled, code, html, css } = session;

              return new Response(session, {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
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
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                },
              );
            }
          }
          const body = string_(this.sess);
          return new Response(body, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              content_hash: md5(body),
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "lazy":
          return new Response(
            `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${codeSpace}"}) ;
           `,
            {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
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
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "list": {
          const list = await this.kv.list({ allowConcurrency: true });

          return new Response(JSON.stringify({ ...list }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "room":
          return new Response(JSON.stringify({ codeSpace: codeSpace }), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        case "path":
          return new Response(path.join("----"), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        case "index.mjs":
        case "index.js":
        case "js": {
          const i = path[1] || this.sess!.i;

          if (i > this.sess!.i) {
            const trp = await initAndTransform(
              this.sess!.code,
              {},
              url.origin,
            );
            return new Response(trp, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          if (i < this.sess!.i) {
            const trp = await initAndTransform(
              this.sess!.code,
              {},
              url.origin,
            );
            return new Response(trp, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${codeSpace}/index.mjs/${this.sess!.i}`,
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          const trp = await initAndTransform(
            this.sess!.code,
            {},
            url.origin,
          );
          return new Response(trp, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",

              content_hash: md5(trp),
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "env": {
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
        case "hashCode": {
          const hashCode = String(Number(path[1]));
          const patch = await this.kv.get<{ patch: string; oldHash: number }>(
            hashCode,
            { allowConcurrency: true },
          );

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
        case "":
        case "hydrated":
        case "worker":
        case "dehydrated":
        case "public": {
          const respText = HTML.replace(
            "/**reset*/",
            resetCSS,
          )
            .replace(
              `<div id="root"></div>`,
              `<div id="root" style="height: 100%;">
              <style>${css}</style>

                <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
                  ${html}
                  </div>

              </div>              
              ` + (path[0] === "dehydrated"
                ? `<script>

              const paths = location.href.split("/");
              const page = paths.pop();
              const codeSpace = paths.pop();
                
            
                const BC = new BroadcastChannel([...paths, codeSpace, ""].join("/"));
              
              BC.onmessage = ({data}) => {
                const {html, css, i } = data;
                if (page ==="dehydrated" && html ) document.getElementById("root").innerHTML = ['<div id="', codeSpace, '-css" style="height: 100%"><style>', css, "</style>", html, "<div>" ].join("");
                
              }
              var sheet = document.createStyleSheet();
sheet.addRule('h1', 'background: red;');
              </script>`
                : `<script type="module" src="${url.origin}/src/hydrate.mjs?ASSET_HASH=${ASSET_HASH}"></script>`),
            );

          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");

          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache",
          );

          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", md5(respText));

          return new Response(respText, {
            status: 200,
            headers,
          });
        }
        case "prerender": {
          const respText = HTML.replace(
            "/**reset*/",
            resetCSS,
          )
            .replace(
              `<div id="root"></div>`,
              `   
          <div id="root"></div>
          <script type="module">
          import App from "${url.origin}/live/${codeSpace}/index.js?i=${i}"
              
            import {prerender} from "${url.origin}/src/render.mjs"
              
              
             const res = prerender(App).then(res=>window.parent.postMessage(res))

            //  console.log({res});
            
              </script>`,
            ).split("ASSET_HASH").join(ASSET_HASH);

          // const Etag = request.headers.get("Etag");
          // const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");

          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache",
          );

          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers,
          });
        }
        case "iframe": {
          const respText = HTML.replace(
            "/**reset*/",
            resetCSS,
          )
            .replace(
              `<div id="root"></div>`,
              `

              <div id="root" style="height: 100%;">
                <style>${css}</style>
                <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
                ${html}
                </div>
              </div>
              <script type="module">

              import {render} from "${url.origin}/src/render.mjs";
              
              import App from "${url.origin}/live/${codeSpace}/index.js?i=${i}";

              const rootEl = document.getElementById("${codeSpace}-css");
      
              render(rootEl, App, "${codeSpace}");          
          
              </script>`,
            ).split("ASSET_HASH").join(ASSET_HASH);

          // const Etag = request.headers.get("Etag");
          // const newEtag = await sha256(respText);
          const headers = new Headers();
          headers.set("Access-Control-Allow-Origin", "*");

          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set(
            "Cache-Control",
            "no-cache",
          );

          headers.set("Content-Type", "text/html; charset=UTF-8");
          headers.set("content_hash", md5(respText));
          return new Response(respText, {
            status: 200,
            headers,
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
      //   blockedMessages: [] as string[],
    };
    this.wsSessions.push(session);
    this.wsSessions = this.wsSessions.filter((x) => !x.quit);
    const users = this.wsSessions.filter((x) => x.name).map((x) => x.name);
    webSocket.send(
      JSON.stringify({
        hashCode: this.head,
        i: this.sess!.i,
        users,
        type: "handshake",
      }),
    );

    // this.wsSessions.forEach((otherSession) => {
    // if (otherSession.name) {
    // session.blockedMessages.push(
    //   JSON.stringify({ name: otherSession.name }),
    // );
    //   }
    // });

    // const storage = await this.kv.list({ reverse: true, limit: 100 });
    // const backlog = [...storage.values()];
    // backlog.reverse();
    // backlog.forEach((value) => {
    // session.blockedMessages.push(
    // typeof value === "string" ? value : JSON.stringify(value),
    // );
    // });

    webSocket.addEventListener(
      "message",
      (msg: { data: string | ArrayBuffer }) => this.processWsMessage(msg, session),
    );

    const closeOrErrorHandler = () => {
      session.quit = true;
      // this.users.remove(session.name);
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
      codeSpace?: string;
      target?: string;
      type?:
        | "new-ice-candidate"
        | "video-offer"
        | "video-answer"
        | "handshake"
        | "fetch";
      patch?: Delta[];
      reversePatch: Delta[];
      address?: string;
      hashCode?: number;
      i: number;
      candidate?: string;
      answer?: string;
      offer?: string;
      newHash?: number;
      oldHash?: number;
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
      if (!data.name) {
        return respondWith({
          msg: "no-name-no-party",
        });
      }

      this.wsSessions.filter((x) => x.name === data.name).map((x) => x.quit = true);

      session.name = name;
    }

    if (data.type == "handshake") {
      const commit = data.hashCode;
      while (commit && commit !== this.head) {
        const oldNode = await this.kv.get<CodePatch>("" + commit, {
          allowConcurrency: true,
        });
        const newNode = await this.kv.get<CodePatch>("" + oldNode!.newHash, {
          allowConcurrency: true,
        });
        return respondWith({
          oldHash: commit,
          newHash: oldNode!.newHash,
          patch: oldNode!.patch,
          reversePatch: newNode!.reversePatch,
        });
        //        commit = newNode?.newHash;
      }
      // const oldNode =  await this.kv.get<CodePatch>(commit);
      // respondWith({oldHash: commit, newHash: oldNode!.newHash, patch: oldNode!.patch, reversePatch: newNode!.reversePatch})
    }
    // try {
    // this.wsSessions.map((otherSession) => {
    //   if (otherSession === session) return;

    //   if (otherSession.name === data.name) {
    //     otherSession.name = "";
    //     otherSession.blockedMessages.map((m) => session.webSocket.send(m));
    //     otherSession.blockedMessages = [];
    //   }
    // });

    //   if (data.hashCode) {
    //     if (data?.hashCode !== hashKEY(codeSpace)) {
    //       const patch = makePatchFrom(data.hashCode, this.sess);
    //       if (patch) {
    //         return respondWith({ ...patch });
    //       }
    //     }
    //   }
    // } catch (e) {
    //   respondWith({ error: "error while checked blocked messages" });
    // }

    // const userNode = this.users.insert(data.name);

    // const usersNum = this.users.keys().length;
    // const rtcConnUser = usersNum > 2
    //   ? (userNode.parent?.key || userNode.left?.key || userNode.right?.key)
    //   : null;
    // // return respondWith({
    //   ...(rtcConnUser ? { name: rtcConnUser } : {}),
    //   hashCode: hashKEY(codeSpace),
    //   users: this.users.keys(),
    // });

    // }
    // this.i = data.i;

    // await this.mutex.runExclusive(async () => {
    // if (data.i < this.i) return;
    // if (data.codeSpace && data.address && !this.address) {
    //   return this.broadcast(data);
    // }

    try {
      // if (
      //   !data.type && limiter.checkLimit()
      // ) {
      //   return respondWith({ if ( if (data.i <= this.sess!.i) return;data.i <= this.sess!.i) return;
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
          const oldState = this.session!.session.get("state");
          const newState = this.mST(data.patch);

          const newRec = this.session!.session.get("state").merge(
            newState,
          );
          try {
            this.session!.session = this.session!.session.set(
              "state",
              newRec,
            );
            this.sess = this.session!.session.get("state").toObject();

            this.syncKV(oldState, newState, {
              oldHash: data.oldHash,
              newHash: data.newHash,
              patch: data.patch,
              reversePatch: data.reversePatch,
            });

            this.broadcast(data);
            // if (this.head !== data.oldHash) {
            //   return respondWith({
            //     error: `old hashes not matching`,
            //   });
            // }

            //

            //  // await applyPatch({ newHash, oldHash, patch, reversePatch });
            // } catch (err) {
            //   console.error({ err });
            //   return respondWith({ err });
            // }

            // if (newHash === hashKEY()) {
          } catch (err) {
            return respondWith({
              error: "Saving it its really hard",
              exp: err || {},
            });
          }

          // await this.kv.put(
          //   String(newHash),
          //   JSON.stringify({
          //     oldHash,
          //     patch,
          //   }),
          // );
          // }
          return respondWith({
            hashCode: this.head,
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
}
