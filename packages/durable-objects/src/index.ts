export class Counter implements DurableObject {
  count: number = 0;

  constructor(readonly state: DurableObjectState) {
    void state.blockConcurrencyWhile(async () => {
      this.count = (await state.storage.get("count")) ?? 0;
    });
  }

  increment(by = 1) {
    this.count += by;
    void this.state.storage.put("count", this.count);
  }

  fetch(_request: Request) {
    this.increment();
    return new Response(this.count.toString());
  }

  alarm() {
    this.count = 0;
    void this.state.storage.put("count", this.count);
  }

  scheduleReset(afterMillis: number) {
    void this.state.storage.setAlarm(Date.now() + afterMillis);
  }
}

// Define UserSession interface (should have been added in the previous step)
interface UserSession {
  socket: WebSocket;
  status: string;
}

export class PresenceDurableObject implements DurableObject {
  state: DurableObjectState;
  env: DurableObjectEnv; // Or specific Env type if defined
  users: Map<string, UserSession>; // Store UserSession objects

  constructor(state: DurableObjectState, env: DurableObjectEnv) {
    this.state = state;
    this.env = env;
    this.users = new Map();
  }

  async fetch(request: Request): Promise<Response> {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected Upgrade: websocket", { status: 426 });
    }

    const { 0: clientSocket, 1: serverSocket } = new WebSocketPair();
    await this.handleWebSocketSession(serverSocket, request);

    return new Response(null, {
      status: 101,
      webSocket: clientSocket,
    });
  }

  async handleWebSocketSession(webSocket: WebSocket, request: Request) {
    // @ts-expect-error TODO: Add types for CF workers
    webSocket.accept();

    const userId = crypto.randomUUID();
const userSession: UserSession = { socket: webSocket, status: "online" };
this.users.set(userId, userSession);

console.log(`User ${userId} connected from ${request.headers.get("CF-Connecting-IP")}, status: online`);

this.broadcast(JSON.stringify({ type: "USER_CONNECTED", userId, status: "online" }));

    webSocket.addEventListener("message", async (event) => {
  try {
    const messageData = JSON.parse(event.data as string);
    if (messageData.type === "STATUS_UPDATE" && messageData.payload && typeof messageData.payload.status === 'string') {
      const newStatus = messageData.payload.status;
      const session = this.users.get(userId);
      if (session) {
        session.status = newStatus;
        this.users.set(userId, session); // Update the map
        console.log(`User ${userId} updated status to: ${newStatus}`);
        this.broadcast(JSON.stringify({ type: "USER_STATUS_UPDATED", userId, status: newStatus }));
      }
    } else {
      console.log(`Received unhandled message type from ${userId}: ${event.data}`);
    }
  } catch (e) {
    console.error(`Failed to parse message from ${userId} or handle status update: ${event.data}`, e);
    // Optionally send an error message back to the user
    // webSocket.send(JSON.stringify({ type: "ERROR", message: "Invalid message format" }));
  }
    });

    webSocket.addEventListener("close", async (event) => {
      console.log(`User ${userId} disconnected. Reason: ${event.reason} Code: ${event.code}`);
      this.users.delete(userId);
      this.broadcast(JSON.stringify({ type: "USER_DISCONNECTED", userId }));
    });

    webSocket.addEventListener("error", async (event) => {
      console.error(`WebSocket error for ${userId}: ${event.error}`);
      if (this.users.has(userId)) {
        this.users.delete(userId);
        this.broadcast(JSON.stringify({ type: "USER_DISCONNECTED", userId, error: true }));
      }
    });
  }

  broadcast(message: string) {
this.users.forEach((session, id) => { // session is now UserSession
      try {
    session.socket.send(message);
      } catch (error) {
        console.error(`Failed to send message to user ${id}:`, error);
    // Consider removing user if send fails multiple times or specific errors occur
        // this.users.delete(id);
      }
    });
  }
}

export class SQLiteDurableObject implements DurableObject {
  constructor(readonly ctx: DurableObjectState) {}
  fetch() {
    return new Response(this.ctx.storage.sql.databaseSize.toString());
  }
}

// Define a basic Env interface for clarity
interface Env {
  PRESENCE: DurableObjectNamespace;
  SQL: DurableObjectNamespace;
  COUNTER: DurableObjectNamespace;
  // Add other bindings if necessary
}

export default <ExportedHandler<Env>> {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    let id: DurableObjectId;
    let stub: DurableObjectStub | undefined;

    switch (pathname) {
      case "/presence":
        // For presence, we could use a fixed ID if only one "room" or instance is needed,
        // or derive it from the path if multiple presence rooms are desired.
        // For a single, global presence system, a fixed name is fine.
        id = env.PRESENCE.idFromName("global-presence"); // Use a consistent name for the singleton DO
        stub = env.PRESENCE.get(id);
        break;
      case "/sql":
        id = env.SQL.idFromName(pathname); // Or a more specific name if needed
        stub = env.SQL.get(id);
        break;
      case "/counter": // Assuming '/counter' or similar for the Counter DO
        // Or if it's the fallback/default:
        id = env.COUNTER.idFromName("shared-counter"); // Use a consistent name
        stub = env.COUNTER.get(id);
        break;
      default:
        // Fallback to Counter DO if no specific path matches, or return 404
        // Depending on desired behavior. The original code used COUNTER as a fallback.
        // Let's make it more explicit, e.g. by path or return 404 for unknown paths.
        // For this example, let's assume /counter is the explicit path for Counter.
        return new Response("Not found", { status: 404 });
    }

    if (!stub) {
      // This case should ideally not be reached if logic is correct
      return new Response("Internal error: stub not found", { status: 500 });
    }

    return stub.fetch(request);
  },
};
