import { wait } from "axax/esnext/wait";
import { handleErrors } from "./handleErrors";

export class Code implements DurableObject {
  state: DurableObjectState;
  users: WebSocket[];
  code: string = "";
  value: number = 0;
  constructor(state: DurableObjectState, env: DurableObjectNamespace) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = Number(await this.state.storage!.get("value"));
    
      let users = (await this.state.storage!.get("users")) as WebSocket[];
      
      this.code = String(await this.state.storage!.get("code"));
      this.users = users;
      this.value = stored || 0;
    });
  }
  async add(user: WebSocket) {
    this.users.push(user)
  }
  
  async remove(user: WebSocket) {
    this.users = this.users.filter(u=> u!==user);
  }

  async increment() {
    await wait(10000);
    this.state.waitUntil(wait(1000));
    await this.state.storage!.put("value", ++this.value);
  }

  handleSession(userSocket: WebSocket, ip:string){

    this.add(userSocket);
    userSocket.accept();

    userSocket.addEventListener("close", (()=>this.remove(userSocket)))

    userSocket.addEventListener("message", (event: MessageEvent)=>{
      let data = (typeof event.data === "string")?JSON.parse(event.data): {};

      if (data.code) {
        this.code = data.code;
      }

      this.users.map(user=>user.send(JSON.stringify({code: this.code})))
      
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    return await handleErrors(request, async () => {
      let url = new URL(request.url);

      switch (url.pathname) {
        case "/websocket": {
          // The request is to `/api/room/<name>/websocket`. A client is trying to establish a new
          // WebSocket session.
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }

          // Get the client's IP address for use with the rate limiter.
          let ip = request.headers.get("CF-Connecting-IP");

          // To accept the WebSocket request, we create a WebSocketPair (which is like a socketpair,
          // i.e. two WebSockets that talk to each other), we return one end of the pair in the
          // response, and we operate on the other end. Note that this API is not part of the
          // Fetch API standard; unfortunately, the Fetch API / Service Workers specs do not define
          // any way to act as a WebSocket server today.
          let pair = new WebSocketPair();

          // We're going to take pair[1] as our end, and return pair[0] to the client.
          await this.handleSession(pair[1], ip);

          // Now we return the other end of the pair to the client.
          return new Response(null, { status: 101, webSocket: pair[0] });
        }

        default:
          return new Response("Not found", { status: 404 });
      }
    });
}
}
