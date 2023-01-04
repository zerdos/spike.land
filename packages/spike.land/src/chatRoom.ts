import type { CodePatch, Delta, ICodeSession } from "../../code/dist/src/session.d";
import { hashCode, hashKEY, patchSync, resetCSS, string_, syncStorage } from "../../code/dist/src/session.mjs";
import { HTML, md5, mST, startSession } from "../../code/dist/src/session.mjs";
// import { Mutex } from "async-mutex";
import AVLTree from "avl";
import { handleErrors } from "./handleErrors";
// import pMap from "p-map";
import { CodeEnv } from "./env";
import { initAndTransform } from "./esbuild";
// import { esmTransform } from "./esbuild.wasm";
import { ASSET_HASH } from "./staticContent.mjs";

// import { CodeRateLimiter } from "./rateLimiter";

interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  // blockedMessages: string[];
}

export class Code {
  state: DurableObjectState;
  kv: DurableObjectStorage;
  codeSpace: string;
  // mutex: Mutex;
  sess: ICodeSession | null;
  sessionStarted: boolean;
  session: ICodeSession | null = null;
  user = md5(self.crypto.randomUUID());
  address: string;
  users = new AVLTree(
    (a: string, b: string) => a === b ? 0 : a < b ? 1 : -1,
    true,
  );
  head = 0;
  waiting: (() => boolean)[] = [];
  sessions: WebsocketSession[];
  i = 0;

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
          allowConcurrency: true,
          allowUnconfirmed: true,
        })), // .then(x=>console.log(x)).catch(()=>console.error('error')).finally(()=>console.log("ok")),
        async (key: string) => await this.kv.get(key, { allowConcurrency: true }),
        oldSession,
        newSess,
        message,
      ))();
  }

  constructor(state: DurableObjectState, private env: CodeEnv) {
    this.kv = state.storage;
    this.state = state;

    this.head = 0;
    this.sessionStarted = false;
    this.sessions = [];
    this.sess = null;
    this.env = env;
    this.codeSpace = "";
    this.address = "";

    // this.mutex = new Mutex();

    this.state.blockConcurrencyWhile(async () => {
      try {
        // const backupSession = fetch(origin +  "/api/room/coder-main/session.json").then(x=>x.json());getBackupSession();
        const session = await this.kv.get<ICodeSession>("session", {
          allowConcurrency: true,
        })
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

        this.head = await this.kv.get("head") || 0;

        if (Number(this.head + 50) !== 50 + this.head) this.head = 0;
        // if ( (head+1) !== Number(head)+1 ) {
        //   head =
        // }
        this.address = await this.kv.get<string>("address", { allowConcurrency: true })
          || "";

        this.sess = session;
        this.codeSpace = session.codeSpace || "";
        if (this.sess.codeSpace) {
          this.session = startSession(
            this.codeSpace,
            { state: session, name: this.user },
            // url.origin,
          );
        }
        this.sessionStarted = false;
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

    // let sess = this.sess;
    if (!this.codeSpace) {
      this.codeSpace = url.searchParams.get("room") || "code-main";

      this.codeSpace = url.searchParams.get("room") || "code-main";
      this.sess!.codeSpace = this.codeSpace;

      await this.kv.put("session", this.sess!, { allowConcurrency: true });

      this.session = startSession(
        this.codeSpace,
        { state: this.sess!, name: this.codeSpace },
        // url.origin,
      );
      this.sessionStarted = true;
    }

    if (this.head === 0) {
      // const headValue = await this.kv.get<CodePatch>(this.head);
      // if (headValue) {
      const sess = mST(this.codeSpace);
      this.head = hashCode(sess);
      await this.kv.put("head", this.head);
      await this.kv.put(String(this.head), sess);

      // const newSession = mST(this.codeSpace);

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
              const oldState = mST(this.codeSpace);
              const newState = mST(this.codeSpace, patch);
              const oldHash = hashCode(oldState);
              const newHash = hashCode(newState);
              if (oldHash !== mess.oldHash || newHash !== mess.newHash) {
                console.error({ mess, calculated: { oldHash, newHash } });
                throw ("Error - we messed up the hashStores");
              }
              this.sess = newState;
              t;
              this.session = startSession(
                this.codeSpace,
                { state: newState, name: this.user },
                // url.origin,
              );

              // patchSync(newState, true);

              // const newRec = mST(this.codeSpace, pa)  //.session.get("state").merge(
              //   newState,
              // // // );
              // sessions[codeSpace].session = sessions[codeSpace].session.set(
              //   "state",
              //   newRec,
              // );

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
      const { code, css, html, i } = mST(this.codeSpace);
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
            mST(this.codeSpace).code,
            {},
            url.origin,
          );
          return new Response(trp, {
            status: 200,
            headers: {
              "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp",
              "Cache-Control": "no-cache",

              content_hash: md5(trp),
              "Content-Type": "application/javascript; charset=UTF-8",
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
          const body = string_(mST(this.codeSpace));
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
        // case "prettier": {
        //   return new Response(prettier(mST(this.codeSpace).code), {
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

        //   if (!delta || delta.hashCode !== hashKEY()) {
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
        // case "yay": {
        //   // const deps = detective(mST(this.codeSpace).code);
        //   // initAta();
        //   // await addExtraModels(code, url.origin + `/live/` + this.codeSpace);
        //   // initAta();

        //   // await addExtraModels(importMapReplace(mST(this.codeSpace).code, url.origin, url.origin, false), url.toString());
        //   // const code = await this.kv.list();c
        //   // const code = mST(this.codeSpace).code;
        //   // let [, ...deps] = path;
        //   // if (deps.length === 0) {
        //   //   deps = code.split(";").map(x => x.trim()).filter(x => x.startsWith("import") || x.startsWith("export")).map(
        //   //     s => s.split("'")[1],
        //   //   ).filter(x => x && !(x.startsWith("https")));

        //   //   deps.push("@emotion/react/jsx-runtime");
        //   // }
        //   // deps = [...(new Set(deps))];
        //   // const res = JSON.stringify(deps);

        //   const res = JSON.stringify(await run(mST(this.codeSpace).code, url.origin));

        //   return new Response(res, {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cross-Origin-Embedder-Policy": "require-corp",
        //       "Cache-Control": "no-cache",
        //       "content_hash": md5(res),
        //       "Etag": md5(res),
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   });
        // }
        // case "ataStart": {
        //   let [, ...deps] = path;
        //   initAta();
        //   // const code = await this.kv.list();c
        //   const code = prettierJs(mST(this.codeSpace).code);
        //   if (deps.length === 0) {
        //     deps = code.split(";").map(x => x.trim()).filter(x => x.startsWith("import") || x.startsWith("export")).map(
        //       s => s.split(`"`)[1],
        //     ).filter(x => x && !(x.startsWith("https")));

        //     deps.push("@emotion/react/jsx-runtime");
        //     deps.push("@emotion/react/jsx-dev-runtime");
        //   }
        //   deps = [...(new Set(deps))];
        //   console.log({ deps });
        //   const res = JSON.stringify(deps);
        //   return new Response(res, {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cross-Origin-Embedder-Policy": "require-corp",
        //       "Cache-Control": "no-cache",
        //       "content_hash": md5(res),
        //       "Etag": md5(res),
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   });
        // }
        // case "ata": {
        //   return ATA();
        // }
        // case "hashCodeSession":
        //   return new Response(hashKEY().toString(), {
        //     status: 200,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Cross-Origin-Embedder-Policy": "require-corp",
        //       "Cache-Control": "no-cache",
        //       "Content-Type": "application/json; charset=UTF-8",
        //     },
        //   });
        case "room":
          return new Response(JSON.stringify({ codeSpace: this.codeSpace }), {
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
        //   case "render.tsx": {
        //     const codeSpace = this.codeSpace;

        //     const src = importMapReplace(
        //       `import {createRoot} from "react-dom/client"
        //     import { CacheProvider } from "@emotion/react";
        //     import createCache from "@emotion/cache";
        //     import { ErrorBoundary } from "react-error-boundary";
        //     import App from "${url.origin}/live/${codeSpace}/index.js"

        //     export default App;
        //     export const render =(rootEl)=>{

        // const root = createRoot(rootEl);

        //   const cache = createCache({
        //     key: "z",
        //     container: rootEl,
        //     speedy: false
        //   });

        //  cache.compat = undefined;

        // root.render(<ErrorBoundary
        //   fallbackRender={({ error }) => (
        //     <div role="alert">
        //       <div>Oh no</div>
        //       <pre>{error.message}</pre>
        //     </div>
        //   )}>
        //   <CacheProvider value={cache}>
        //     <App />
        //   </CacheProvider>
        //   </ErrorBoundary>)
        //   }
        //   ;`,
        //       url.origin,
        //       url.origin,
        //     );
        //     return new Response(src, {
        //       headers: {
        //         "x-typescript-types": `${url.origin}/live/${this.codeSpace}/render.tsx`,
        //         "Access-Control-Allow-Origin": "*",
        //         "Cross-Origin-Embedder-Policy": "require-corp",
        //         "Cache-Control": "no-cache",

        //         content_hash: md5(src),
        //         "Content-Type": "application/javascript; charset=UTF-8",
        //       },
        //     });
        //   }
        case "index.mjs":
        case "index.js":
        case "js": {
          const i = path[1] || mST(this.codeSpace).i;

          if (i > mST(this.codeSpace).i) {
            // const started = Date.now() / 1000;
            // const body = await new Promise<string>((res, reject) =>
            //   this.wait(() => {
            //     const now = Date.now() / 1000;

            //     if (mST(this.codeSpace).i < Number(i) && started - now < 3000) {
            //       return false;
            //     }
            //     if (
            //       mST(this.codeSpace).i < Number(i) && started - now >= 3000
            //     ) {
            //       reject(null);
            //       return false;
            //     }

            //     initAndTransform(mST(this.codeSpace).code, {}, url.origin).then(
            //       (transpiled) => res(transpiled),
            //     );
            //     return true;
            //   })
            // );

            const trp = await initAndTransform(
              mST(this.codeSpace).code,
              {},
              url.origin,
            );
            return new Response(trp, {
              status: 200,
              headers: {
                "x-typescript-types": `${url.origin}/live/${this.codeSpace}/index.tsx`,
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          if (i < mST(this.codeSpace).i) {
            const trp = await initAndTransform(
              mST(this.codeSpace).code,
              {},
              url.origin,
            );
            return new Response(trp, {
              status: 307,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Location": `${url.origin}/live/${this.codeSpace}/index.mjs/${mST(this.codeSpace).i}`,
                "Cache-Control": "no-cache",

                content_hash: md5(trp),
                "Content-Type": "application/javascript; charset=UTF-8",
              },
            });
          }
          const trp = await initAndTransform(
            mST(this.codeSpace).code,
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
          return new Response(request.url, {
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
                  <div id="${this.codeSpace}-css" data-i="${i}" style="height: 100%;">
                  <style>${css}</style>
                  ${html}
                  </div>
              </div>` + (path[0] === "dehydrated"
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
          import App from "${url.origin}/live/${this.codeSpace}/index.js?i=${mST(this.codeSpace).i}"
              
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
        case "iframe": {
          const respText = HTML.replace(
            "/**reset*/",
            resetCSS,
          )
            .replace(
              `<div id="root"></div>`,
              `
              <div id="root" data-i="${i}" style="height: 100%;">

              <style>${css}</style>
              <div id="${this.codeSpace}-css" style="height: 100%;">
                ${html}
              </div>
              </div>
              <script type="module">

              import {render} from "${url.origin}/src/render.mjs";
              
              import App from "${url.origin}/live/${this.codeSpace}/index.js?i=${mST(this.codeSpace).i}";

              const rootEl = document.getElementById("${this.codeSpace}-css");
              
              render(rootEl, App, "${this.codeSpace}");          
          
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
    this.sessions.push(session);
    this.sessions = this.sessions.filter((x) => !x.quit);
    const users = this.sessions.filter((x) => x.name).map((x) => x.name);
    webSocket.send(
      JSON.stringify({
        hashCode: hashKEY(this.codeSpace),
        i: mST(this.codeSpace).i,
        users,
        type: "handshake",
      }),
    );

    // this.sessions.forEach((otherSession) => {
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
      if (!data.name) {
        return respondWith({
          msg: "no-name-no-party",
        });
      }

      this.sessions.filter((x) => x.name === data.name).map((x) => x.quit = true);

      session.name = name;
    }

    if (data.type == "handshake") {
      const HEAD = hashKEY(this.codeSpace);
      const commit = data.hashCode;
      while (commit && commit !== HEAD) {
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
    // this.sessions.map((otherSession) => {
    //   if (otherSession === session) return;

    //   if (otherSession.name === data.name) {
    //     otherSession.name = "";
    //     otherSession.blockedMessages.map((m) => session.webSocket.send(m));
    //     otherSession.blockedMessages = [];
    //   }
    // });

    //   if (data.hashCode) {
    //     if (data?.hashCode !== hashKEY(this.codeSpace)) {
    //       const patch = makePatchFrom(data.hashCode, mST(this.codeSpace));
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
    //   hashCode: hashKEY(this.codeSpace),
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
      //   return respondWith({ if ( if (data.i <= mST(this.codeSpace).i) return;data.i <= mST(this.codeSpace).i) return;
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

        // if (data.i <= mST(this.codeSpace).i) {
        //   return respondWith({
        //     error: `data.i <= mST(this.codeSpace).i`,
        //   });
        // }

        // const newHash = this.session!.applyPatch({
        //   newHash: data.newHash!,
        //   oldHash: data.oldHash!,
        //   patch: data.patch!,
        // });
        // if (newHash === data.newHash) {
        //   this.broadcast(data);
        //   await this.kv.put<ICodeSession>("session", { ...this.session!.session.get("state").toJSON() });
        //   await this.kv.put(
        //     String(newHash),
        //     JSON.stringify({
        //       oldHash: data,
        //       patch: data,
        //     }),
        //   );
        //   return;
        // }
        if (data.patch && data.oldHash && data.newHash) {
          const oldSession = mST(this.codeSpace);
          const newSess = mST(this.codeSpace, data.patch);

          if (hashKEY(this.codeSpace) !== data.oldHash) {
            return respondWith({
              error: `old hashes not matching`,
            });
          }

          try {
            // const newHash = data.newHash;
            // const oldHash = data.oldHash;
            // const reversePatch = data.reversePatch;

            // this.session.patchSync(newSess, true);
            patchSync(
              newSess,
            );
          } catch (exp) {
            const err = exp || {};
            return respondWith({
              error: "unknown error- in patching" + JSON.stringify({ err }),
              exp: exp || {},
            });
          }

          // try {

          //  // await applyPatch({ newHash, oldHash, patch, reversePatch });
          // } catch (err) {
          //   console.error({ err });
          //   return respondWith({ err });
          // }

          // if (newHash === hashKEY()) {

          try {
            await this.kv.put<ICodeSession>("session", newSess, {
              allowConcurrency: true,
            });

            const { newHash, oldHash, patch, reversePatch } = data;

            await this.syncKV(oldSession, newSess, {
              newHash: +newHash,
              oldHash: +oldHash,
              patch,
              reversePatch,
            });
            this.broadcast(data);
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
            hashCode: hashKEY(this.codeSpace),
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
        // s.blockedMessages.push(message);
      }
    });
  }
}

// function importMapReplace(codeInp: string, origin: string, skipImap: false) {
//  if (skipImap ===false){
//   const items = Object.keys(
//     importMap.imports,
//   ) as (keyof typeof importMap.imports)[];
//   let returnStr = codeInp;

//   items.map((lib: keyof typeof importMap.imports) => {
//     const uri = importMap.imports[lib].slice(1);
//     returnStr = returnStr.replaceAll(
//       ` from "${String(lib)}"`,
//       ` from "${origin}/${String(uri)}"`,
//     ).replaceAll
//       ` from "./`,
//       ` from "${origin}/live/`,
//     ).replaceAll(
//       ` from "/`,
//       ` from "${origin}/`,
//     );
//   });}

//   returnStr = returnStr.split(";").map((x) => x.trim()).map((x) => {
//     if ((x.startsWith("import") || x.startsWith("export")) && x.indexOf(`"https://`) === -1) {
//       return x.replaceAll(` "`, ` "${origin}/npm:/`);
//     }

//     if (
//       !x.includes("/npm:/") && x.startsWith("import") && x.includes(origin)
//       && !x.includes("/index.js")
//     ) {
//       const u = new URL(x.split(`"`)[1]);
//       if (u && u.pathname.indexOf(".") === -1) {
//         return x.slice(0, -1) + `/index.js"`;
//       }
//     }
//     return x;
//   }).join(";");

//   return returnStr;
// }
