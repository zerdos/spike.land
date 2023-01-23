import type { WebSocket } from "@cloudflare/workers-types";
import { resetCSS } from "./../../code/src/getResetCss";
import HTML from "./../../code/src/index.html";
import { applyCodePatch, CodePatch, ICodeSession, makeSession } from "./../../code/src/makeSess";
import { makeHash, string_ } from "./../../code/src/makeSess";
import { md5 } from "./../../code/src/md5";
import codeShaSum from "./dist.shasum";

// import { Mutex } from "async-mutex";
// import AVLTree from "avl";

// import pMap from "p-map";
import { CodeEnv } from "./env";
// import { esmTransform } from "./esbuild.wasm";
import jsTokens from "js-tokens";
import { Delta } from "../../code/src/textDiff";
// import shaSum from "./dist.shasum";

export { md5 };

// import { CodeRateLimiter } from "./rateLimiter";

export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  blockedMessages: string[];
}

export interface IFirstRender {
  type: "firstRender";
  code: string;
  css: string;
  i: number;
  html: string;
}

export class Code implements DurableObject {
  // mutex: Mutex;
  #codeShaSum = codeShaSum;
  #versionId = -1;
  #wsSessions: WebsocketSession[] = [];
  #transpiled = "";
  #origin = "";

  user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;

    // Iterate over all the sessions sending them messages.
    this.#wsSessions
      .filter((session) => session.name === to)
      .map((s) => {
        try {
          s.webSocket.send(message);
        } catch {
          console.error("p2p error");
        }
      });
  }
  // private users:
  async broadcast(msg: CodePatch | string) {
    let message: string;
    if (typeof msg === "string") {
      message = msg;
    } else {
      const head = makeHash(this.session);

      this.state.storage.put(head, { ...this.session, oldHash: msg.oldHash, reversePatch: msg.reversePatch });
      this.state.storage.get(msg.oldHash).then((data: unknown) =>
        this.state.storage.put(msg.oldHash, {
          oldHash: (data as { oldHash?: string } || { oldHash: "" }).oldHash || "",
          reversePatch: (data as { reversePatch?: string } || { reversePatch: "" }).reversePatch || [],
          newHash: msg.newHash,
          patch: msg.patch,
        })
      );
      this.state.storage.put("head", head);

      this.#transpiled = "";
      message = JSON.stringify({ ...msg, i: this.session.i });
    }

    this.#wsSessions.map((s) => {
      try {
        s.webSocket.send(message);
      } catch (err) {
        s.quit = true;
        // this.users.remove(s.name);
        s.blockedMessages.push(message);
      }
    });
  }

  session = makeSession({ i: 0, code: "", html: "", css: "" });

  #backupSession = makeSession({
    code: `export default () => (
        <div>
          <h1>404 - for now.</h1>
      
          <h2>
            But you can edit even this page and share with your friends.
          </h2>
        </div>
      );`,
    i: 1,
    html: "<div></div>",
    css: "",
  });
  constructor(private state: DurableObjectState, private env: CodeEnv) {
    this.state.blockConcurrencyWhile(async () => {
      try {
        let s = await this.state.storage.get<ICodeSession>("session");

        if (!s || !s.i) {
          const backupCode = await (await fetch("https://spike.land/live/code-main/index.tsx")).text();
          this.#backupSession.code = backupCode;
          await this.state.storage.put("session", this.#backupSession);
          s = this.#backupSession;
          const head = makeHash(s as ICodeSession);
          // await this.state.storage.put("session", this);
          await this.state.storage.put("head", head);
        }
        this.session = s as unknown as ICodeSession;
      } catch {
        this.session = this.#backupSession;
      }
      this.state.storage.put("session", this.session);
      const head = makeHash(this.session);
      this.state.storage.put(head, this.session);
      this.state.storage.put("head", head);
    });
  }

  fetch(request: Request) {
    return this.state.storage.get("session").then(s => this.session = s as ICodeSession).then(() =>
      handleErrors(
        request,
        (async () => {
          const url = new URL(request.url);

          const codeSpace = url.searchParams.get("room");

          const { code, css, html, i } = this.session;

          if (this.#origin.length === 0) {
            this.#origin = url.origin;
          }
          if (this.#transpiled.length === 0) {
            this.#transpiled = await fetch(`https://js.spike.land`, {
              method: "POST",
              body: this.session.code,
              headers: { TR_ORIGIN: this.#origin },
            }).then(resp => resp.text());
          }
          const path = url.pathname.slice(1).split("/");
          if (path.length === 0) path.push("");

          switch (path[0]) {
            case "websocket": {
              if (request.headers.get("Upgrade") != "websocket") {
                return new Response("expected websocket", { status: 400 });
              }

              const pair = new WebSocketPair();

              const handleSession = async (webSocket: WebSocket) => {
                webSocket.accept();
                const session = {
                  name: "",
                  quit: false,
                  webSocket,
                  blockedMessages: [] as string[],
                };
                this.#wsSessions.push(session);

                const users = this.#wsSessions.filter((x) => x.name).map((x) => x.name);
                webSocket.send(
                  JSON.stringify({
                    hashCode: makeHash(this.session),
                    i: this.session.i,
                    // sessionI: JSON.parse(JSON.stringify(this.session)).i || JSON.stringify(this.session),
                    users,
                    // runner: this.#codeShaSum,
                    // codeShaSum,
                    type: "handshake",
                  }),
                );

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
              };

              await handleSession(pair[1] as unknown as WebSocket);
              // await signaller(this.#wsSessions, pair[1] as unknown as WebSocket);

              return new Response(null, { status: 101, webSocket: pair[0] });
            }
            case "code":
            case "index.tsx":
              return new Response(code, {
                status: 200,
                headers: new Headers({
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  content_hash: md5(code),
                  "Content-Type": "application/javascript; charset=UTF-8",
                }),
              });
            case "tokens": {
              const tokens = Array.from(jsTokens(code, { jsx: true }));

              return new Response(JSON.stringify(tokens.filter(x => x.type !== "WhiteSpace")), {
                status: 200,
                headers: new Headers({
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/json; charset=UTF-8",
                }),
              });
            }
            case "token2": {
              const tokens = Array.from(jsTokens(code, { jsx: true }));

              return new Response(tokens.filter(x => x.type !== "WhiteSpace").map(x => x.value).join(" "), {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/javascript; charset=UTF-8",
                },
              });
            }

            case "session.json":
            case "session": {
              if (path[1]) {
                const session = await this.state.storage.get<string | object>(path[1], {
                  allowConcurrency: false,
                });
                if (session) {
                  const s = makeSession(typeof session === "string" ? JSON.parse(session) : session);

                  // const { i, transpiled, code, html, css } = session;

                  return new Response(string_(s), {
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
              const body = string_(this.session);
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
              const list = await this.state.storage.list({ allowConcurrency: true });

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
              this.#transpiled = this.#transpiled.length > 0
                ? this.#transpiled
                : await fetch(`https://js.spike.land`, {
                  method: "POST",
                  body: this.session.code,
                  headers: { TR_ORIGIN: this.#origin },
                }).then(resp => resp.text());

              return new Response(this.#transpiled, {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",

                  content_hash: md5(this.#transpiled),
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
              const patch = await this.state.storage.get<
                { patch: string; oldHash: number }
              >(
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
            case undefined:
            case null:
            case "hydrated":
            case "worker":
            case "dehydrated":
            case "iframe":
            case "public": {
              const respText = HTML.replace(
                "/**reset*/",
                resetCSS + css,
              )
                .replace(
                  `<div id="root"></div>`,
                  `<div id="root" style="height: 100%;">
                        <div id="${codeSpace}-css" data-i="${i}" style="height: 100%;">
                          ${html}
                        </div>
                </div>              
              `,
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
                headers: headers,
              });
            }

            default:
              return new Response("Not found", { status: 404 });
          }
        }) as unknown as () => Promise<Response>,
      )
    );

    async function handleErrors(
      request: Request,
      cb: () => Promise<Response>,
    ) {
      try {
        return await cb();
      } catch (err) {
        if (request.headers.get("Upgrade") === "websocket") {
          let stack: string | undefined = "";

          if (err instanceof Error) {
            stack = err.stack;
            console.log({ error: err.stack, message: err.message });
          }

          const pair = new WebSocketPair();
          (pair[1] as unknown as WebSocket).accept();
          pair[1].send(JSON.stringify({ error: stack }));
          pair[1].close(1011, "Uncaught exception during session setup");
          return new Response(null, { status: 101, webSocket: pair[0] });
        } else {
          let stack = "We have no idea what happened";

          if (err instanceof Error) {
            stack = err.stack || stack;
            console.log({ error: err.stack, message: err.message });
          }

          return new Response(stack, { status: 500 });
        }
      }
    }
  }

  async processWsMessage(
    msg: { data: string | ArrayBuffer },
    session: WebsocketSession,
    //    limiter: RateLimiterClient,
  ) {
    if (session.quit) {
      // this.users.remove(session.name);
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }

    const { name } = session;
    // session.lastSeen = Date.now();

    const respondWith = (obj: unknown) => session.webSocket.send(JSON.stringify(obj));

    let data: {
      versionId?: number;
      name?: string;
      changes?: object[];
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
      hashCode?: string;
      i: number;
      candidate?: string;
      answer?: string;
      offer?: string;
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

    if (data.changes && data.versionId && data.versionId > this.#versionId) {
      this.#versionId = data.versionId;
      // this.state.storage.put()
      return this.broadcast(msg.data as string);
    }

    if (!name) {
      if (!data.name) {
        return respondWith({
          msg: "no-name-no-party",
        });
      }

      this.#wsSessions.filter((x) => x.name === data.name).map(x =>
        x.blockedMessages.reverse().map(m => session.webSocket.send(m)) && x
      ).map((x) => x.quit = true);
      this.#wsSessions = this.#wsSessions.filter(x => !x.quit);

      session.name = data.name;
    }

    if (data.type == "handshake") {
      const commit = data.hashCode;
      while (commit && commit !== makeHash(this.session)) {
        const oldNode = await this.state.storage.get<CodePatch>("" + commit, {
          allowConcurrency: true,
        });
        const newNode = await this.state.storage.get<CodePatch>(
          "" + oldNode!.newHash,
          {
            allowConcurrency: true,
          },
        );
        return respondWith({
          oldHash: commit,
          newHash: oldNode!.newHash,
          patch: oldNode!.patch,
          reversePatch: newNode!.reversePatch,
        });
      }
    }

    if (data.i && this.session.i && this.session.i > data.i) return respondWith({ error: "i is not up to date" });

    try {
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

        if (data.patch && data.oldHash && data.newHash && data.reversePatch) {
          const oldState = this.session;
          const oldHash = makeHash(this.session);

          if (oldHash !== data.oldHash) {
            return respondWith({
              error: `old hashes not matching`,
              i: this.session.i,
              strSess: this.session,
            });
          }

          const newState = applyCodePatch(oldState, {
            oldHash: data.oldHash,
            newHash: data.newHash,
            patch: data.patch,
            reversePatch: data.reversePatch,
          });

          // const newRec = session.merge(
          //   newState,
          // );
          try {
            // session = newRec;
            // sess = session;

            // this.syncKV(oldState, newState, {
            //   oldHash: data.oldHash,
            //   newHash: data.newHash,
            //   patch: data.patch,
            //   reversePatch: data.reversePatch,
            // });

            // this.broadcast(data);

            this.session = newState;
            await this.state.storage.put("session", this.session);

            this.broadcast(data as CodePatch);

            //

            // await applyPatch({ newHash, oldHash, patch, reversePatch });
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

          // await this.state.storage.put(
          //   String(newHash),
          //   JSON.stringify({
          //     oldHash,
          //     patch,
          //   }),
          // );
          // }
          return respondWith({
            hashCode: data.newHash,
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
