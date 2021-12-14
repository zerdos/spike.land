import { handleErrors } from "./handleErrors";
import { RateLimiterClient } from "./rateLimiterClient";
import Hash from "ipfs-only-hash";
import HTML from "./target.html";
import importMap from "@spike.land/code/js/importmap.json";
import { version } from "@spike.land/code/package.json";
import applyDelta from 'textdiff-patch';
import { CodeEnv } from "./env";


interface IState extends DurableObjectState{
  session: ISession,
  hashOfCode: string,
  hashCache: {[key:string]: string}
}

interface ISession{
  i: number;
  code: string;
  transpiled: string,
  css: string,
  html: string,
  lastTimestamp: number
}

interface WebsocketSession {
  name?: string,
  webSocket: WebSocket,
  quit?: boolean,
  blockedMessages: string[]
}

type ResolveFn = (value: unknown) => void;

let code = ""

export class Code {
  state: IState
  
  sessions: WebsocketSession[]
  constructor(state: IState, private env: CodeEnv) {
    this.state = state;
    this.sessions = []
    

    
   

    this.state.blockConcurrencyWhile(async () => {
      this.state.hashCache = {};
      code = await this.state.storage.get<string>("code") || "";

      
      if (!code) {
        this.state.session = {
          i: 0,
          code: "",
          transpiled: "",
          css: "",
          html: "",
          lastTimestamp: Date.now()
        };

        return;
      }

      let hashOfCodeP = Hash.of(code);

      let i = await this.state.storage.get<number>("i") || 0;
      
      let css = await this.state.storage.get<string>("css") || "";
      let transpiled = await this.state.storage.get<string>("transpiled") || "";
      let html = await this.state.storage.get<string>("html") || "";
      let lastTimestamp =
        Number(await this.state.storage.get<string>("lastTimestamp") || 0) ||
        Date.now();

      const hashOfCode = await hashOfCodeP;
      
      this.state.session = {
        i,
        code,
        transpiled,
        html,
        css,
        lastTimestamp
      };

      this.state.hashOfCode = hashOfCode;
      this.state.hashCache[hashOfCode] = code;

    });

    this.env = env;
    this.sessions = [];
  }

  async fetch(request: Request) {
    return await handleErrors(request, async () => {

      
      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room");

      let path = url.pathname.slice(1).split("/");

      switch (path[0]) {
        case "code": {
          return new Response(this.state.session.code,{
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          } );
        }
        case "js": {
          return new Response(this.state.session.transpiled, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8",
            },
          });
        }
        case "html": {
          const htmlContent = this.state.session.html;
          const css = await this.state.session.css;

          const html = HTML.replace(
            `<div id="zbody"></div>`,
            `<style>${css}</style><div id="zbody">${htmlContent}</div>`,
          ).replace(
            "$$IMPORTMAP",
            JSON.stringify({
              imports: {
                ...importMap.imports,
                app: `https://code.spike.land/api/room/${codeSpace}/js`
              },
            }),
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
        case "env": {
          return new Response(codeSpace, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }
        case "hashOfCode": {
          code = this.state.session.code;
          const hashOfCode = code && await Hash.of(code) || "";
          return new Response(hashOfCode, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8",
            },
          });
        }

        case "public": {
          const html = HTML.replace(
            "$$IMPORTMAP",
            JSON.stringify({
              imports: {
                ...importMap.imports,
                app: `https://unpkg.com/@spike.land/code@${version}/js/ws.mjs`,
              },
            }),
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

    let session = { webSocket, blockedMessages: [] as string[] } as WebsocketSession;
    this.sessions.push(session);

    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(
          JSON.stringify({ joined: otherSession.name }),
        );
      }
    });

    // let storage = await this.storage.list({ reverse: true, limit: 100 });
    // let backlog = [...storage.values()];

    // backlog.reverse();
    // backlog.forEach((value) => {
    //   session.blockedMessages.push(value);
    // });


    // if (this.state.session.code && this.state.hashOfCode !== null) {
    //   const hashOfCode = this.state.hashOfCode;
    //   session.blockedMessages.push(JSON.stringify({ hashOfCode }),
    //   );
    // }

    let receivedUserInfo = false;



    webSocket.addEventListener("message", async (msg) => {
      try {
        if (session.quit) {
          webSocket.close(1011, "WebSocket broken.");
          return;

        }

        if (typeof msg.data !== "string") return;

        let data = JSON.parse(msg.data);

        if (data.type === 'get-cid') {
          const CID = data.cid;
          if (this.state.hashCache[CID]) webSocket.send(JSON.stringify({type: "get-cid", cid: data.cid, [CID]: this.state.hashCache[CID]}));
          return;
        }
        
        if ( !(data.type && (data.type === "new-ice-candidate" || data.type ==="video-offer" || data.type ==="video-answer")) && !limiter.checkLimit()) {
          webSocket.send(JSON.stringify({
            error: "Your IP is being rate-limited, please try again later.",
          }));
          return;
        }


        let patched = false;
        if (!receivedUserInfo) {
          session.name = "" + (data.name || "anonymous");

          if (session.name.length > 32) {
            webSocket.send(JSON.stringify({ error: "Name too long." }));
            webSocket.close(1009, "Name too long.");
            return;
          }

          // Deliver all the messages we queued up since the user connected.
          session.blockedMessages.forEach((queued) => {
            webSocket.send(queued);
          });


          session.blockedMessages=[];
          if (this.state.session.code){
            session.blockedMessages.push(JSON.stringify({
              code: this.state.session.code,
              hashOfCode: this.state.hashOfCode,
              i: this.state.session.i
            }));
          }

          // Broadcast to all other connections that this user has joined.
          this.broadcast({ joined: session.name });

          webSocket.send(JSON.stringify({ ready: true }));

          // Note that we've now received the user info message.
          receivedUserInfo = true;

          return;
        }

        if(data.type && (data.type === "new-ice-candidate" || data.type ==="video-offer" || data.type ==="video-answer")) {
          this.user2user(data.target, {name: session.name, ...data});
          return;
          
        } 

        code = data.code;
        let html = data.html;
        let css = data.css;
        let transpiled = data.transpiled;
        let hashOfStarterCode = data.hashOfStarterCode;

        const codeDiff = data.codeDiff;
        const transpiledDiff = data.transpiledDiff;
        const htmlDiff = data.htmlDiff;
        const cssDiff = data.cssDiff;
        const hashOfPatched = data.hashOfCode;


        let previousCode = this.state.session.code;
        let hashOfPreviousCode = await Hash.of(previousCode);

        data = { name: session.name };

      

        if (code) {
          this.state.session.code = code;
          const hashOfCode = await Hash.of(code);
          this.state.session.css = css;
          this.state.session.html = html;
          this.state.session.transpiled = transpiled;
          if (hashOfCode === data.hashOfCode) {
            this.state.hashOfCode = hashOfCode;
            this.state.hashCache[hashOfCode] = code;
          } else {
            return;
          }
        }

        else if (hashOfStarterCode != hashOfPreviousCode) {
          previousCode = this.state.hashCache[hashOfStarterCode];
          hashOfPreviousCode = hashOfStarterCode;
        } if (codeDiff && previousCode) {
          code = applyPatch(previousCode, codeDiff);

          const hashOfCode = await Hash.of(code);

          if (hashOfCode === hashOfPatched) {
            patched = true;
            this.state.hashOfCode = hashOfCode;
            this.state.session.code = code;

            data.hashOfCode = hashOfCode;
            data.hashOfPreviousCode = hashOfPreviousCode;
            data.codeDiff = codeDiff;
          } else {
            data.decoded = code;
            data.gotHash = hashOfCode;
            data.expected = data.hashOfCode;
            data.error = "Code mismatch";
          }
        }

        // if (data..length > 4096) {
        //   webSocket.send(JSON.stringify({ error: "Message too long." }));
        //   return;
        // }

        data.timestamp = Math.max(
          Date.now(),
          this.state.session.lastTimestamp + 1,
        );
        this.state.session.lastTimestamp = data.timestamp;

        // Broadcast the message to all other WebSockets.
        let dataStr = JSON.stringify(data);
        this.broadcast(dataStr);

        if (patched) {
          try {
            if (cssDiff) css = applyPatch(this.state.session.css, cssDiff);
            if (transpiledDiff) {
              transpiled = applyPatch(this.state.session.transpiled, transpiledDiff);
            }
            if (htmlDiff) html = applyPatch(this.state.session.html, htmlDiff);
            this.state.session.css = css;
            this.state.session.html = html;
            this.state.session.transpiled = transpiled;
          } catch {
            data.errorUnDiff = true;
          }
        }
        // Save message.
        let key = new Date(this.state.session.lastTimestamp).toISOString();
        
        let _res: ResolveFn = ()=>Promise.resolve({});

        const pr = new Promise((resolve)=>_res=resolve);


        
        setTimeout(async () => {
        if (code && code === this.state.session.code) {
          // await this.state.storage.put(hashOfCode, code);
          await this.state.storage.put("code", code);
        } else {

          
          _res(true);
          return;
        }

        if (html ) {
          await this.state.storage.put("html", html);
        }
        if (transpiled) {
          await this.state.storage.put("transpiled", transpiled);
        }
        if (css) {
          await this.state.storage.put("css", css);
        }
        await this.state.storage.put(key, dataStr);
      }, 1000);

      await pr;

       
      } catch (err: any) {

        webSocket.send(JSON.stringify({ error: err.stack || "unknown error" }));
      }
    });

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

  user2user(to: string, msg: Object | string) {
    const message = (typeof msg !== "string")? JSON.stringify(msg): msg;
  
     // Iterate over all the sessions sending them messages.
    this.sessions.filter((session) => session.name === to).map (s=>  s.webSocket.send(message) );
  }

  broadcast(msg: Object | string) {
    const message = (typeof msg !== "string")? JSON.stringify(msg): msg;
    
    let quitters: WebsocketSession[] = [];
    this.sessions = this.sessions.filter((session) =>  {
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

function applyPatch(old: string, delta: string) {
  return applyDelta(old, JSON.parse(delta))
}
