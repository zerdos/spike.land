import type { DurableObject, DurableObjectState, Request as WRequest, WebSocket } from "@cloudflare/workers-types";
import * as map from "lib0/map";
import { resetCSS } from "../../code/src/getResetCss";
import { importMapReplace } from "../../code/src/importMapReplace";
import HTML from "./../../code/src/index.html";
import { applyCodePatch, CodePatch, ICodeSession, makeSession } from "./../../code/src/makeSess";
import { makeHash, string_ } from "./../../code/src/makeSess";
import { md5 } from "./../../code/src/md5";
import { Delta } from "../../code/src/textDiff";
import ASSET_HASH from "./dist.shasum";
import shasum from "./dist.shasum";
import Env from "./env";
import { handleErrors } from "./handleErrors";

export { md5 };

export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
}
const pingTimeout = 30000;

// export interface IFirstRender {
//   type: "firstRender";
//   code: string;
//   css: string;
//   i: number;
//   html: string;
// }

interface IData {
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
}

interface YMessage {
  type: "subscribe" | "unsubscribe" | "publish" | "ping" | "pong";
  topics: string[];
  topic: string;
  clients: number;
}

export class Code implements DurableObject {
  // mutex: Mutex;
  topics = new Map<string, Set<WebSocket>>();
  #wsSessions: WebsocketSession[] = [];
  #userSessions: WebsocketSession[] = [];
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
  broadcast(msg: CodePatch | string) {
    let message: string;
    if (typeof msg === "string") {
      message = msg;
    } else {
      const head = makeHash(this.session);

      this.state.storage.put(head, {
        ...this.session,
        oldHash: msg.oldHash,
        reversePatch: msg.reversePatch,
      });
      this.state.storage.get(msg.oldHash).then(async (data: unknown) => {
        await this.state.storage.put(msg.oldHash, {
          oldHash: (data as { oldHash?: string } || { oldHash: "" }).oldHash
            || "",
          reversePatch: (data as { reversePatch?: string } || { reversePatch: "" })
            .reversePatch || [],
          newHash: msg.newHash,
          patch: msg.patch,
        });
        await this.state.storage.put("head", head);
      });

      this.#transpiled = "";
      message = JSON.stringify({ ...msg, i: this.session.i });
    }

    this.#wsSessions.map((s) => {
      try {
        s.webSocket.send(message);
      } catch {
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
  constructor(private state: DurableObjectState, private env: Env) {
    this.state.blockConcurrencyWhile(async () => {
      try {
        let s = await this.state.storage.get<ICodeSession>("session");

        if (!s || !s.i) {
          const backupCode = await fetch(
            "https://spike.land/live/code-main/index.tsx",
          ).then((r) => r.text());
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
      //      this.state.storage.put("session", this.session);
      // const head = makeHash(this.session);
      //    this.state.storage.put(head, this.session);
      //  this.state.storage.put("head", head);x
    });
  }

  fetch(request: WRequest<unknown, CfProperties<unknown>>) {
    return handleErrors(
      request,
      (async () => {
        const url = new URL(request.url);
        this.session.code = this.session.code.split("https://spike.land/").join(
          `${url.origin}/`,
        );

        // if (this.#mjs === "") {
        //   this.state.storage.get("mjs").

        //   then((mjs) => mjs && mjs .text()).then((mjs) => this.#mjs = mjs?mjs:this.#transpiled));

        //   }

        // }

        const codeSpace = url.searchParams.get("room");

        const { code, css, html, i } = this.session;

        if (this.#origin.length === 0) {
          this.#origin = url.origin;
        }
        const transpiledPromise = fetch(
          `https://js.spike.land?v=${shasum}`,
          {
            method: "POST",
            body: code,
            headers: { TR_ORIGIN: this.#origin },
          },
        ).then(async (resp) => this.#transpiled = importMapReplace(await resp.text(), url.origin));

        if (this.#transpiled.length === 0) await transpiledPromise;
        const path = url.pathname.slice(1).split("/");
        if (path.length === 0) path.push("");

        switch (path[0]) {
          case "users": {
            if (request.headers.get("Upgrade") != "websocket") {
              return new Response("expected websocket", { status: 400 });
            }

            const pair = new WebSocketPair();

            const handleSession = async (webSocket: WebSocket) => {
              webSocket.accept();
              const session = {
                name: "",
                quit: false,
                subscribedTopics: new Set(),
                webSocket,
                blockedMessages: [] as string[],
              } as WebsocketSession;
              this.#userSessions.push(session);

              //              webSocket.send(JSON.stringify(users))

              webSocket.addEventListener("close", () => {
                this.#userSessions = this.#userSessions.filter((x) => x != session);
                broadcastUsers();
              });

              const broadcastUsers = () =>
                this.#userSessions.map((sess) => {
                  const users = this.#userSessions.filter((x) => x.name).map((
                    x,
                  ) => x.name);

                  try {
                    sess.webSocket.send(JSON.stringify(users));
                  } catch {
                    sess.quit = true;
                    // this.users.remove(s.name);
                    this.#userSessions = this.#userSessions.filter((session) => session !== sess);
                  }
                });

              broadcastUsers();

              webSocket.addEventListener(
                "message",
                (msg: { data: string | ArrayBuffer }) => {
                  const data: IData = JSON.parse(msg.data as string);

                  if (!session.name && data.name) {
                    this.#userSessions.filter((sess) => sess.name === data.name)
                      .map((sess) => {
                        sess.webSocket.close();
                        sess.name = "";
                      });
                    session.name = data.name;
                    broadcastUsers();
                  }

                  if (data.target && data.target !== session.name) {
                    this.#userSessions.filter((x) => x.name === data.target)[0]
                      .webSocket.send(msg.data);
                  }
                },
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
                pongReceived: true,
                subscribedTopics: new Set(),

                blockedMessages: [] as string[],
              } as WebsocketSession;
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

              const pingInterval = setInterval(() => {
                if (!session.pongReceived) {
                  webSocket.close();
                  clearInterval(pingInterval);
                } else {
                  session.pongReceived = false;
                  try {
                    webSocket.send(JSON.stringify({ type: "ping" }));
                  } catch (e) {
                    webSocket.close();
                  }
                }
              }, pingTimeout);

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
          // case "ata": {
          //   const {prettierJs} = await import("../../code/src/prettierEsm");
          //   const {ata} = await import("../../code/src/ata");
          //   const resp = JSON.stringify(await ata({code, originToUse: this.#origin , prettierJs}));
          //   return new Response(resp, {
          //     status: 200,
          //     headers: {
          //       "Access-Control-Allow-Origin": "*",
          //       "Cross-Origin-Embedder-Policy": "require-corp",
          //       "Cache-Control": "no-cache",
          //       "Content-Encoding": "gzip",
          //       content_hash: md5(resp),
          //       "Content-Type": "application/json; charset=UTF-8",
          //     },
          //   });
          // }
          case "code":
          case "index.tsx": {
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
          }
          // case "tokens": {
          //   const tokens = Array.from(jsTokens(code, { jsx: true }));

          //   return new Response(
          //     JSON.stringify(tokens.filter((x) => x.type !== "WhiteSpace")),
          //     {
          //       status: 200,
          //       headers: new Headers({
          //         "Access-Control-Allow-Origin": "*",
          //         "Cross-Origin-Embedder-Policy": "require-corp",
          //         "Cache-Control": "no-cache",
          //         "Content-Type": "application/json; charset=UTF-8",
          //       }),
          //     },
          //   );
          // }
          // case "token2": {
          //   const tokens = Array.from(jsTokens(code, { jsx: true }));

          //   return new Response(
          //     tokens.filter((x) => x.type !== "WhiteSpace").map((x) => x.value)
          //       .join(" "),
          //     {
          //       status: 200,
          //       headers: {
          //         "Access-Control-Allow-Origin": "*",
          //         "Cross-Origin-Embedder-Policy": "require-corp",
          //         "Cache-Control": "no-cache",
          //         "Content-Type": "application/javascript; charset=UTF-8",
          //       },
          //     },
          //   );
          // }

          case "session.json":
          case "session": {
            if (path[1]) {
              const session = await this.state.storage.get<string | object>(
                path[1],
                {
                  allowConcurrency: false,
                },
              );
              if (session) {
                const s = makeSession(
                  typeof session === "string" ? JSON.parse(session) : session,
                );

                // const { i, transpiled, code, html, css } = session;

                return new Response(string_(s), {
                  status: 200,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cache-Control": "no-cache",
                    "Content-Encoding": "gzip",
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
                      "Content-Encoding": "gzip",
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
                "Content-Encoding": "gzip",
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
                  "Content-Encoding": "gzip",
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
                "Content-Encoding": "gzip",
                "Content-Type": "application/json; charset=UTF-8",
              },
            });
          }
          case "list": {
            const list = await this.state.storage.list({
              allowConcurrency: true,
            });

            return new Response(JSON.stringify({ ...list }), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Content-Encoding": "gzip",
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
          case "path": {
            return new Response(path.join("----"), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          case "index.mjs":
          case "index.js":
          case "js": {
            this.#transpiled = this.#transpiled.length > 0
              ? this.#transpiled
              : await fetch(`https://js.spike.land`, {
                method: "POST",
                body: this.session.code,
                headers: { TR_ORIGIN: this.#origin },
              }).then((resp) => resp.text());

            const replaced = this.#transpiled.split("https://spike.land/").join(
              `${this.#origin}/`,
            );
            return new Response(replaced, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "x-typescript-types": this.#origin + "/live/index.tsx",
                content_hash: md5(replaced),
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
            ).replace(
              "<script src=\"/swVersion.js\"></script>",
              `<script>
              window.swVersion = "${ASSET_HASH}"
              </script>`,
            )
              .replace("ASSET_HASH", ASSET_HASH)
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
            headers.set("Cross-Origin-Resource-Policy", "cross-origin");
            headers.set("Cross-Origin-Opener-Policy", "same-origin");
            headers.set(
              "Cache-Control",
              "no-cache",
            );

            headers.set("Content-Encoding", "gzip");
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
    );
  }
  send(conn: WebSocket, message: YMessage | { type: "pong" }) {
    const wsReadyStateConnecting = 0;
    const wsReadyStateOpen = 1;
    const wsReadyStateClosing = 2; // eslint-disable-line
    const wsReadyStateClosed = 3; // eslint-disable-line

    if (
      conn.readyState !== wsReadyStateConnecting
      && conn.readyState !== wsReadyStateOpen
    ) {
      conn.close();
    }
    try {
      conn.send(JSON.stringify(message));
    } catch (e) {
      conn.close();
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

    let data: IData;
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

    const message = data as unknown as YMessage;

    if (message && message.type) {
      switch (message.type) {
        case "subscribe":
          /** @type {Array<string>} */ (message.topics || []).forEach(
            (topicName) => {
              if (typeof topicName === "string") {
                // add conn to topic
                const topic = map.setIfUndefined(
                  this.topics,
                  topicName,
                  () => new Set(),
                );
                topic.add(session.webSocket);
                // add topic to conn
                session.subscribedTopics.add(topicName);
              }
            },
          );
          break;
        case "unsubscribe":
          /** @type {Array<string>} */ (message.topics || []).forEach(
            (topicName) => {
              const subs = this.topics.get(topicName);
              if (subs) {
                subs.delete(session.webSocket);
              }
            },
          );
          break;
        case "publish":
          if (message.topic) {
            const receivers = this.topics.get(message.topic);
            if (receivers) {
              message.clients = receivers.size;
              receivers.forEach((receiver) => this.send(receiver, message));
            }
          }
          break;
        case "pong":
          session.pongReceived = true;
        case "ping":
          this.send(session.webSocket, { type: "pong" });
      }
    }

    if (data.changes) {
      // this.state.storage.put()
      return this.broadcast(msg.data as string);
    }

    if (!name) {
      if (!data.name) {
        return respondWith({
          msg: "no-name-no-party",
        });
      }

      this.#wsSessions.filter((x) => x.name === data.name).map((x) =>
        x.blockedMessages.reverse().map((m) => session.webSocket.send(m)) && x
      ).map((x) => x.quit = true);
      this.#wsSessions = this.#wsSessions.filter((x) => !x.quit);

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

    if (data.i && this.session.i && this.session.i > data.i) {
      return respondWith({ error: "i is not up to date" });
    }

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
