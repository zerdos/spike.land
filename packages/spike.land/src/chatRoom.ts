import { CodePatch, Delta, ICodeSession } from "./../../code/src/session";
import { resetCSS, string_, syncStorage } from "./../../code/src/session";
import { aPatch, HTML, md5 } from "./../../code/src/session";
import { signaller } from "./signalimg";
// import { Mutex } from "async-mutex";
import AVLTree from "avl";
import { Record } from "immutable";
import { handleErrors } from "./handleErrors";
// import pMap from "p-map";
import { CodeEnv } from "./env";
import { initAndTransform } from "./esbuild";
// import { esmTransform } from "./esbuild.wasm";
import jsTokens from "js-tokens";
import ASSET_HASH from "./dist.shasum";

export { md5 };

// import { CodeRateLimiter } from "./rateLimiter";

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
};

interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  // blockedMessages: string[];
}

export class Code {
  // mutex: Mutex;

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

  constructor(private state: DurableObjectState, private env: CodeEnv) {
    this.state = state;

    // const _ = this;
    // this.origin = '';
    // sess = { code: "", i: 0, html: "", css: "" } as ICodeSession;
    // session = (x = this.newProperty.sess) => Record<ICodeSession>(sess)(x);
    // this.head = (x = sess) => session(x).hashCode();
    // .wsSessions = [];
    // this.env = env;

    // this.mutex = new Mutex();
    // this.state.blockConcurrencyWhile(async () => {
    //   try {
    //   const isSessLoaded =()=> sess && sess.code && sess.i>0 ;

    //   if (isSessLoaded()) return;
    //       console.log("REAC")
    //     let head  = await this.state.storage.get<number>("head").;
    //     if (head) {
    //       sess = await this.state.storage.get<ICodeSession>(String(head));
    //       if (isSessLoaded()) return;
    //     }

    //     sess=sess(backupSession);

    //     session = sess(sess);
    //     head =  this.head(sess);
    //     await this.state.storage.put<ICodeSession>(String(       head        ), sess);
    //     await this.state.storage.put<ICodeSession>("head",head);

    //     return;
    //   } catch{
    //     console.error("Error while blockConcurrencyWhile");
    //   }
    // });

    // this.lastSavedHash = this.head();
  }

  async fetch(request: Request) {
    // try {
    const sessions = await this.state.storage.get("sessions") || [];
    const backupSession: ICodeSession = {
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
    };
    const inc = this.state.inc = this.state.inc++ || 1;
    const sess: ICodeSession = (await this.state.storage.get("sess", {}))
      || (await this.state.storage.get("session", {})) || backupSession;
    const hashCode = (ICodeSession) => Record(backupSession)(sess).hashCode();

    const url = new URL(request.url);

    const origin = url.origin;
    const transpiled = () => initAndTransform(sess.code, {}, origin);

    const oldHash = hashCode(sess);

    const codeSpace = url.searchParams.get("room");

    // this.state.storage.put("head", this.state.storage.head)
    // this.state.storage.put(String(this.state.storage.head), sess)

    // const codeSpace = url.searchParams.get("room");

    // const mess = await request.json();

    // if (request.method === "POST") {
    // return new Response(JSON.stringify({ success: true, mess }), {
    //   status: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Cross-Origin-Embedder-Policy": "require-corp",
    //     "Cache-Control": "no-cache",
    //     "Content-Type": "application/json; charset=UTF-8",
    //   },
    // });

    // try {
    //   const mess:
    //     | Partial<CodePatch & ICodeSession & { session: ICodeSession }>
    //     | undefined = await request.json();
    //   if (mess) {

    //     return new Response(JSON.stringify({ foo, mess }), {
    //       status: 200,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Cross-Origin-Embedder-Policy": "require-corp",
    //         "Cache-Control": "no-cache",
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     });

    //     if (!mess.patch || (mess.patch && mess.i && mess.i > this.i)) {
    //       // this.i = mess.i;

    //       const reversePatch: Delta[] = mess.reversePatch || [];
    //       const patch: Delta[] = mess.patch || [];
    //       const oldState = sess;
    //       const newState = session(this.mST(patch));
    //       const oldHash = this.head();
    //       const newHash = newState.hashCode();
    //       if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
    //         console.error({ mess, calculated: { oldHash, newHash } });
    //         throw ("Error - we messed up the hashStores");
    //       }
    //       // setTimeout(() => {
    //       //   sess = Record<ICodeSession>(sess)(newState)

    //       //   this.syncKV(oldState, newState.toJS(), {
    //       //     oldHash,
    //       //     newHash,
    //       //     patch,
    //       //     reversePatch,
    //       //   });

    //       //   // this.broadcast(mess);
    //       // });
    //       const newRec = session().merge(
    //         newState,
    //       );
    //       session = Record<ICodeSession>(newRec.toJS());

    //       sess = Record<ICodeSession>(sess)(newRec);
    //       this.state.storage.put("head", sess);
    //       this.state.storage.put(String(this.head()), sess);

    //       return new Response(JSON.stringify({ success: true, newRec }), {
    //         status: 200,
    //         headers: {
    //           "Access-Control-Allow-Origin": "*",
    //           "Cross-Origin-Embedder-Policy": "require-corp",
    //           "Cache-Control": "no-cache",
    //           "Content-Type": "application/json; charset=UTF-8",
    //         },
    //       });
    //     }
    //   }
    // } catch (err) {
    //   return new Response(
    //     JSON.stringify({
    //       success: false,
    //       mess: "on the post",
    //       error: { er },
    //     }),
    //     {
    //       status: 500,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Cross-Origin-Embedder-Policy": "require-corp",
    //         "Cache-Control": "no-cache",
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     },
    //   );
    // }

    //  }
    // } catch (err) {
    //   console.error("error somewhere in the fetch");
    //   return new Response(
    //     JSON.stringify({ success: true, message: "error somewhere in the fetch happened" }),
    //     {
    //       status: 204,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Cross-Origin-Embedder-Policy": "require-corp",
    //         "Cache-Control": "no-cache",
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     },
    //   );
    // }

    // return new Response(
    //   JSON.stringify({ success: true, message: "nothing happened" }),
    //   {
    //     status: 204,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Cross-Origin-Embedder-Policy": "require-corp",
    //       "Cache-Control": "no-cache",
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   },
    // );

    return handleErrors(request, async () => {
      const { code, css, html, i } = sess;
      const path = url.pathname.slice(1).split("/");
      if (path.length === 0) path.push("");

      switch (path[0]) {
        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }

          const pair = new WebSocketPair();

          await signaller(sessions, pair[1]);

          this.state.storage.put("sessions", sessions.map(({ name, quit }) => ({ name, quit })));

          // this.broadcast(sessions, {yooo});
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
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
        case "tokens": {
          const toki: Token[] = Array.from(jsTokens(code, { jsx: true }));

          type Token =
            | { type: "StringLiteral"; value: string; closed: boolean }
            | { type: "NoSubstitutionTemplate"; value: string; closed: boolean }
            | { type: "TemplateHead"; value: string }
            | { type: "TemplateMiddle"; value: string }
            | { type: "TemplateTail"; value: string; closed: boolean }
            | { type: "RegularExpressionLiteral"; value: string; closed: boolean }
            | { type: "MultiLineComment"; value: string; closed: boolean }
            | { type: "SingleLineComment"; value: string }
            | { type: "IdentifierName"; value: string }
            | { type: "PrivateIdentifier"; value: string }
            | { type: "NumericLiteral"; value: string }
            | { type: "Punctuator"; value: string }
            | { type: "WhiteSpace"; value: string }
            | { type: "LineTerminatorSequence"; value: string }
            | { type: "Invalid"; value: string };
          return new Response(JSON.stringify(toki.filter(x => x.type !== "WhiteSpace")), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8",
            },
          });
        }
        case "token2": {
          const toki: Token[] = Array.from(jsTokens(code, { jsx: true }));

          type Token =
            | { type: "StringLiteral"; value: string; closed: boolean }
            | { type: "NoSubstitutionTemplate"; value: string; closed: boolean }
            | { type: "TemplateHead"; value: string }
            | { type: "TemplateMiddle"; value: string }
            | { type: "TemplateTail"; value: string; closed: boolean }
            | { type: "RegularExpressionLiteral"; value: string; closed: boolean }
            | { type: "MultiLineComment"; value: string; closed: boolean }
            | { type: "SingleLineComment"; value: string }
            | { type: "IdentifierName"; value: string }
            | { type: "PrivateIdentifier"; value: string }
            | { type: "NumericLiteral"; value: string }
            | { type: "Punctuator"; value: string }
            | { type: "WhiteSpace"; value: string }
            | { type: "LineTerminatorSequence"; value: string }
            | { type: "Invalid"; value: string };
          return new Response(toki.filter(x => x.type !== "WhiteSpace").map(x => x.value).join(" "), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "index.yo.tsx": {
          const trp = await initAndTransform(
            ` export const Box = ({children})=><div>{children}</div>;`,
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
        case "index.trans.js": {
          const trp = await initAndTransform(
            sess.code,
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
        // case "sessions": {
        //   const d = await this.state.storage.list({
        //     start: path[1] || "0",
        //     end: path[2] || "100",
        //   });

        //   return new Response(JSON.stringify(d), {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cross-Origin-Embedder-Policy": "require-corp",
        //       "Cache-Control": "no-cache",
        //       content_hash: md5(d),
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   });
        // }
        case "session.json":
        case "session": {
          if (path[1]) {
            let session = await this.state.storage.get<string | object>(path[1], {
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
          const body = string_(sess);
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
          const i = path[1] || sess.i;

          if (i > sess.i) {
            return new Response(await transpiled(i)), {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",

                content_hash: md5(await transpiled(i)),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            };
          }
          if (i < sess.i) {
            const trp = await initAndTransform(
              sess.code,
              {},
              url.origin,
            );
            return new Response(await transpiled(), {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${codeSpace}/index.js/${sess.i}`,
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          const trp = await transpiled();

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
              <script type="module" src="/src/signalz.mjs"></script>

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
        i: sess.i,
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

    // const storage = await this.state.storage.list({ reverse: true, limit: 100 });
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
      while (commit && commit !== this.head()) {
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
        //        commit = newNode?.newHash;
      }
      // const oldNode =  await this.state.storage.get<CodePatch>(commit);
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
    //       const patch = makePatchFrom(data.hashCode, sess);
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
      //   return respondWith({ if ( if (data.i <= sess.i) return;data.i <= sess.i) return;
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
          // const oldState = session;
          // const newState = session.merge(this.mST(data.patch));

          // const newRec = session.merge(
          //   newState,
          // );
          try {
            // session = newRec;
            // sess = session.toObject();

            // this.syncKV(oldState.toJSON(), newState.toJSON(), {
            //   oldHash: data.oldHash,
            //   newHash: data.newHash,
            //   patch: data.patch,
            //   reversePatch: data.reversePatch,
            // });

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
