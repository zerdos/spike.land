import type { ICodeSession } from "@/lib/interfaces";
import { applyCodePatch, createPatch, makeHash, makeSession, stringifySession } from "@/lib/make-sess";
import type { Socket, SocketDelegate } from "@github/stable-socket";
import { BufferedSocket, StableSocket } from "@github/stable-socket";
import { Mutex } from "async-mutex";

// Define the properties of `self` with proper types
declare let self: SharedWorkerGlobalScope & {
  ata: unknown;
  connections: Map<string, Connection>;
  prettierCss: unknown;
  prettierJs: unknown;
  createWorkflow: unknown;
  tsx: unknown;
  updateSearchReplace: unknown;
  setConnections: (signal: string, sess: ICodeSession) => Promise<void>;
};

const SOCKET_POLICY = {
  timeout: 4000,
  attempts: Infinity,
  maxDelay: 60000,
};

interface Connection {
  broadcastChannel: BroadcastChannel;
  lastCounter: number;
  lastHash: string;
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
}

type WsMessage = {
  i: number;
  changes: unknown;
  strSess: string;
  type: string;
  newHash: string;
  oldHash: string;
  error?: string;
  codeSpace: string;
  code: string;
  transpiled: string;
  hashCode: string;
};

// Use a Map for better management of connections
const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections || new Map();
const mutex = new Mutex();

console.log("Socket worker initialized");

/**
 * Sets up the connection for a given code space and user.
 * @param signal - A string containing the code space and user.
 * @param sess - The initial code session.
 */
async function setConnections(signal: string, sess: ICodeSession): Promise<void> {
  console.log("Setting up connections...");
  console.log("Signal:", signal);
  console.log("Session:", sess);

  const [codeSpace, user] = signal.split(" ");

  if (connections.has(codeSpace)) return;

  console.log("Creating new connection for codeSpace:", codeSpace);
  // Create a new connection
  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: makeSession(sess),
    lastHash: makeHash(sess),
    lastCounter: sess.i,
    broadcastChannel: new BroadcastChannel(`${location.origin}/live/${codeSpace}/`),
    webSocket: createWebSocket(codeSpace),
  };

  // Initialize the WebSocket and BroadcastChannel

  connections.set(codeSpace, connection);
  connection.broadcastChannel.onmessage = (event) => {
    handleBroadcastMessage(event.data, connection).catch((error) => {
      console.error("Error handling broadcast message:", error);
    });
  };

  connection.webSocket.open();
  console.log("New connection created and stored");
}

/**
 * Fetches the initial session data for a given code space.
 * @param codeSpace - The code space identifier.
 * @returns A promise that resolves to the code session.
 */
async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  console.log("Fetching initial session for codeSpace:", codeSpace);
  try {
    const response = await fetch(`/live/${codeSpace}/session`);
    const data = await response.json() as ICodeSession;
    console.log("Initial session fetched successfully");
    return makeSession(data);
  } catch (error) {
    console.error(`Failed to fetch initial session for ${codeSpace}:`, error);
    throw error;
  }
}

/**
 * Creates a WebSocket connection for the given code space.
 * @param codeSpace - The code space identifier.
 * @returns The initialized WebSocket.
 */
function createWebSocket(codeSpace: string) {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;
  console.log("Creating WebSocket connection to:", url);

  const delegate = {
    socketDidOpen() {
      console.log("Socket opened");
      // Socket is ready to write.
    },
    socketDidClose(_socket: Socket, code?: number, reason?: string) {
      console.log("Socket closed", code, reason);
      // Socket closed and will retry the connection.
    },
    socketDidFinish() {
      console.log("Socket finished");
      // Socket closed for good and will not retry.
    },
    socketDidReceiveMessage(_socket: Socket, message: WsMessage) {
      // Socket read data from the connection.
      console.log("Socket message:", message);
      handleSocketMessage(message, codeSpace).catch((error) => {
        console.error("Error handling socket message:", error);
      });
    },
    socketShouldRetry(_socket: Socket, code: number): boolean {
      // Socket reconnects unless server returns the policy violation code.
      return code !== 1008;
    },
  };

  return new BufferedSocket(new StableSocket(url, delegate as unknown as SocketDelegate, SOCKET_POLICY));
}

/**
 * Handles incoming socket messages and dispatches them based on their type.
 * @param message - The received message as a string.
 * @param codeSpace - The code space identifier.
 */
async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
): Promise<void> {
  const connection = connections.get(codeSpace);
  if (!connection) {
    console.error("Connection not found for codeSpace:", codeSpace);
    return;
  }
  const ws = connection.webSocket;

  console.log(`Handling socket message for codeSpace: ${codeSpace}`);

  if (data.hashCode || data.newHash) {
    connection.lastHash = data.hashCode || data.newHash;
    const oldSessionHash = makeHash(connection.oldSession);
    if (oldSessionHash === connection.lastHash) {
      connection.lastCounter = connection.oldSession.i;
    }
  }

  if (typeof data.i === "number") {
    connection.lastCounter = data.i;
    console.log(`Updated lastCounter to: ${data.i}`);
  }

  if (data.changes) {
    console.log("Handling changes message");
    await handleChanges(data as { changes: unknown }, connection);
  } else if (data.strSess) {
    console.log("Handling session string message");
    await handleSessionString(data as { strSess: string }, ws, connection);
  } else if (data.type === "handShake") {
    console.log("Handling handshake message");
    await handleHandshake(ws, data as { hashCode: string; type: string }, connection, codeSpace);
  } else if (data.newHash && data.oldHash) {
    console.log("Handling hash update message");
    await handleHashUpdate(data as { newHash: string; oldHash: string }, connection, codeSpace);
  } else {
    console.log("Unhandled message type:", data);
  }
}

/**
 * Handles 'changes' messages received from the socket.
 * @param data - The received data.
 * @param connection - The connection context.
 */
async function handleChanges(data: { changes: unknown }, connection: Connection): Promise<void> {
  console.log("Handling changes:", data);
  const { broadcastChannel } = connection;
  broadcastChannel.postMessage({ ...data, sender: SENDER_WORKER_HANDLE_CHANGES });
  console.log("Changes broadcasted to channel");
}

/**
 * Handles 'strSess' messages received from the socket.
 * @param data - The received data.
 * @param ws - The WebSocket instance.
 * @param connection - The connection context.
 */
async function handleSessionString(
  data: { strSess: string },
  ws: Socket,
  connection: Connection,
): Promise<void> {
  console.log("Handling session string:", data);
  const { oldSession, user } = connection;
  const sess = makeSession(JSON.parse(data.strSess) as ICodeSession);
  const patch = createPatch(sess, oldSession);
  console.log("Created patch:", patch);
  ws.send(JSON.stringify({ ...patch, name: user, i: oldSession.i }));
  console.log("Sent patch to WebSocket");
}

/**
 * Handles handshake messages and synchronizes sessions.
 * @param ws - The WebSocket instance.
 * @param data - The received data.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 */
async function handleHandshake(
  ws: Socket,
  data: {
    hashCode: string;
    type: string;
  },
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  console.log("Handling handshake...");
  console.log("Data:", { data });
  ws.send(JSON.stringify({ name: connection.user }));
  console.log("Sent user name to WebSocket");

  const oldSessionHash = makeHash(connection.oldSession);
  console.log("Old session hash:", oldSessionHash);
  console.log("Received hash code:", data.hashCode);
  if (oldSessionHash !== data.hashCode) {
    console.log("Hash mismatch, fetching new session");
    connection.oldSession = await fetchInitialSession(codeSpace);
    const { broadcastChannel, oldSession } = connection;
    broadcastChannel.postMessage({
      ...oldSession,
      sender: SENDER_WORKER_HANDSHAKE,
    });
    console.log("New session broadcasted");
  } else {
    console.log("Hash match, no action needed");
  }
}

/**
 * Handles hash updates to synchronize code sessions.
 * @param data - The received data containing hash updates.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 */
async function handleHashUpdate(
  data: { newHash: string; oldHash: string },
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  console.log("Handling hash update:", data);
  connection.controller.abort();
  connection.controller = new AbortController();
  const { signal } = connection.controller;

  if (signal.aborted) {
    console.log("Update aborted");
    return;
  }

  await mutex.runExclusive(async () => {
    console.log("Running hash update exclusively");
    try {
      const oldSession = makeSession(connection.oldSession);
      const oldHash = makeHash(oldSession);
      console.log("Old hash:", oldHash);
      console.log("Received old hash:", data.oldHash);

      if (oldHash !== String(data.oldHash)) {
        console.log("Hash mismatch, handling mismatch");
        await handleHashMismatch(connection, codeSpace, signal);
      } else {
        console.log("Hash match, handling match");
        await handleHashMatch(data, connection, oldSession, signal);
      }
    } catch (error) {
      console.error("Error during hash update handling:", error);
    }
  });
}

/**
 * Handles cases where the hash of the old session does not match.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 * @param signal - The AbortSignal to handle cancellation.
 */
async function handleHashMismatch(
  connection: Connection,
  codeSpace: string,
  signal: AbortSignal,
): Promise<void> {
  if (signal.aborted) {
    console.log("Hash mismatch handling aborted");
    return;
  }
  console.log("Fetching new session due to hash mismatch");
  connection.oldSession = await fetchInitialSession(codeSpace);

  if (signal.aborted) {
    console.log("Hash mismatch handling aborted after fetching session");
    return;
  }

  const { broadcastChannel, oldSession } = connection;
  broadcastChannel.postMessage({
    ...oldSession,
    sender: SENDER_WORKER_HASH_MISMATCH,
  });
}

/**
 * Handles cases where the hash of the old session matches.
 * @param data - The received data.
 * @param connection - The connection context.
 * @param oldSession - The old code session.
 * @param signal - The AbortSignal to handle cancellation.
 */
async function handleHashMatch(
  data: { newHash: string; oldHash: string },
  connection: Connection,
  oldSession: ICodeSession,
  signal: AbortSignal,
): Promise<void> {
  console.log("Handling hash match");
  const newSession = applyCodePatch(oldSession, {
    ...data,
    patch: [],
    reversePatch: [],
  });
  const newHash = makeHash(newSession);
  console.log("New hash:", newHash);

  if (signal.aborted) {
    console.log("Hash match handling aborted");
    return;
  }

  if (data.newHash === newHash) {
    console.log("New hash matches received hash");
    connection.oldSession = newSession;
    const { broadcastChannel } = connection;
    broadcastChannel.postMessage({
      ...newSession,
      sender: SENDER_WORKER_HASH_MATCH,
    });
    console.log("Broadcasted new session");
  } else {
    console.log("New hash does not match received hash");
    if (signal.aborted) {
      console.log("Hash match handling aborted before fetching new session");
      return;
    }
    console.log("Fetching new session due to hash mismatch");
    connection.oldSession = await fetchInitialSession(connection.codeSpace);
    if (signal.aborted) {
      console.log("Hash match handling aborted after fetching new session");
      return;
    }
    const { broadcastChannel } = connection;
    broadcastChannel.postMessage({
      ...connection.oldSession,
      sender: SENDER_WORKER_HASH_MISMATCH_RELOAD,
    });
    console.log("Broadcasted reloaded session");
  }
}

interface BroadcastMessageData {
  i: number;
  changes?: boolean;
  html: string;
  css: string;
  codeSpace: string;
  code: string;
  transpiled: string;
  sender?: string;
}

// Use a Map to manage broadcast modifications and prevent memory leaks
const broadcastMod = new Map<
  string,
  {
    i: number;
    code: string;
    html: string;
    css: string;
    transpiled: string;
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

/**
 * Handles messages received from the broadcast channel.
 * @param data - The received data.
 * @param connection - The connection context.
 */
async function handleBroadcastMessage(
  data: BroadcastMessageData,
  connection: Connection,
): Promise<void> {
  console.log("Handling broadcast message:", data);
  if (data.changes) {
    console.log("Sending changes to WebSocket");
    connection.webSocket.send(JSON.stringify({ ...data, name: connection.user }));
    return;
  }

  if (data.i > connection.oldSession.i && data.html && data.code) {
    console.log("Processing broadcast modification");
    const codeSpace = connection.codeSpace;

    let bMod = broadcastMod.get(codeSpace);
    if (!bMod) {
      console.log("Creating new broadcast modification");
      bMod = {
        ...data,
        controller: new AbortController(),
        timeoutId: setTimeout(() => {}, 0),
      };
      broadcastMod.set(codeSpace, bMod);
    } else {
      console.log("Updating existing broadcast modification");
      bMod.controller.abort();
      Object.assign(bMod, data);
      bMod.controller = new AbortController();
    }

    bMod.controller.abort();
    bMod.controller = new AbortController();

    const { signal } = bMod.controller;

    console.log("Clearing existing timeout");
    clearTimeout(bMod.timeoutId);

    console.log("Scheduling session update");
    bMod.timeoutId = setTimeout(() => {
      (async () => {
        if (bMod.i === connection.lastCounter) {
          console.log("Session already up to date");
          return;
        }
        if (signal.aborted) {
          console.log("Session update aborted");
          return;
        }

        if (connection.lastCounter < bMod!.i) {
          console.log("Updating session");
          const { code, html, css, i, transpiled } = bMod!;

          const json = stringifySession({ code, html, css, codeSpace, i, transpiled });
          try {
            await fetch(`/live/${codeSpace}/session`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: json,
            });
            console.log("Session updated successfully");
          } catch (error) {
            console.error("Failed to update session:", error);
          }
        } else {
          console.log("Session update skipped due to outdated counter");
        }

        console.log("Cleaning up broadcast modification");
        broadcastMod.delete(codeSpace);
      })().catch((error) => {
        console.error("Error in setTimeout callback:", error);
      });
    }, 1000);

    console.log("Processing session changes");
    const oldSession = makeSession(connection.oldSession);
    const newSession = makeSession(data);
    const newHash = makeHash(newSession);
    const oldHash = makeHash(oldSession);

    if (newHash !== oldHash) {
      console.log("Session hash changed, creating patch");
      const patchMessage = createPatch(oldSession, newSession);
      if (patchMessage.oldHash === oldHash) {
        console.log("Patch created successfully, updating session");
        connection.oldSession = newSession;
        connection.webSocket.send(
          JSON.stringify({
            ...patchMessage,
            i: newSession.i,
            name: connection.user,
          }),
        );
        console.log("Patch sent to WebSocket");
      } else {
        console.log("Patch creation failed due to hash mismatch");
      }
    } else {
      console.log("Session unchanged, no patch needed");
    }
  } else {
    console.log("Broadcast message ignored due to conditions not met");
  }
}

// Define constants for sender identifiers to avoid magic strings
const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HANDSHAKE = "WORKER_HANDSHAKE";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";
const SENDER_WORKER_HASH_MISMATCH_RELOAD = "WORKER_HASH_MISMATCH_RELOAD";

// Expose the setConnections function to the global scope
Object.assign(globalThis, {
  setConnections,
  connections,
});

// Add event listener for broadcast channel messages
self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];

  port.addEventListener("message", (event: MessageEvent) => {
    const connection = connections.get(event.data.codeSpace);
    if (connection) {
      handleBroadcastMessage(event.data, connection).catch((error) => {
        console.error("Error handling broadcast message:", error);
      });
    }
  });
  port.start();
});

console.log("Socket worker setup complete");
