import type { ICodeSession } from "@/lib/interfaces";
import { lazyLoadScript } from "@/lib/lazy-load-scripts";
import { applyCodePatch, createPatch, makeHash, makeSession, stringifySession } from "@/lib/make-sess";
import { BufferedSocket, Socket, StableSocket } from "@github/stable-socket";
import { Mutex } from "async-mutex";

// Define the properties of `self` with proper types
declare var self: SharedWorkerGlobalScope & {
  ata: unknown;
  prettierCss: unknown;
  prettierJs: unknown;
  createWorkflow: unknown;
  transpile: (code: string, origin: string) => Promise<string>;
  build: unknown;
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
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
}

// Use a Map for better management of connections
const connections: Map<string, Connection> = new Map();
const mutex = new Mutex();

/**
 * Sets up the connection for a given code space and user.
 * @param signal - A string containing the code space and user.
 * @param sess - The initial code session.
 */
async function setConnections(signal: string, sess: ICodeSession): Promise<void> {
  const [codeSpace, user] = signal.split(" ");

  let connection = connections.get(codeSpace);

  if (!connection) {
    // Create a new connection
    connection = {
      user,
      codeSpace,
      controller: new AbortController(),
      oldSession: makeSession(sess),
      lastCounter: 0,
      broadcastChannel: null as any, // Will be initialized below
      webSocket: null as any, // Will be initialized below
    };

    // Initialize the WebSocket and BroadcastChannel
    connection.webSocket = createWebSocket(codeSpace, connection);
    connection.broadcastChannel = createBroadcastChannel(codeSpace, connection);

    connections.set(codeSpace, connection);
  } else {
    // Update existing connection if necessary
    connection.user = user;
    connection.codeSpace = codeSpace;
    // Optionally update oldSession if required
  }
}

/**
 * Fetches the initial session data for a given code space.
 * @param codeSpace - The code space identifier.
 * @returns A promise that resolves to the code session.
 */
async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  try {
    const response = await fetch(`/live/${codeSpace}/session`);
    const data = await response.json();
    return makeSession(data);
  } catch (error) {
    console.error(`Failed to fetch initial session for ${codeSpace}:`, error);
    throw error;
  }
}

/**
 * Creates a WebSocket connection for the given code space.
 * @param codeSpace - The code space identifier.
 * @param connection - The connection context.
 * @returns The initialized WebSocket.
 */
function createWebSocket(codeSpace: string, connection: Connection): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;
  const delegate = createSocketDelegate(connection, codeSpace);
  const webSocket = new BufferedSocket(new StableSocket(url, delegate, SOCKET_POLICY));
  webSocket.open();
  return webSocket;
}

/**
 * Creates the delegate object for handling WebSocket events.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 * @returns The delegate object with event handlers.
 */
function createSocketDelegate(connection: Connection, codeSpace: string) {
  return {
    socketDidOpen: () => {},
    socketDidClose: () => {},
    socketDidFinish: () => {},
    socketDidReceiveMessage: (ws: Socket, message: string) => {
      handleSocketMessage(ws, message, connection, codeSpace).catch((error) => {
        console.error("Error handling socket message:", error);
      });
    },
    socketShouldRetry: (_socket: Socket, code: number) => code !== 1008,
  };
}

/**
 * Creates a BroadcastChannel for inter-thread communication.
 * @param codeSpace - The code space identifier.
 * @param connection - The connection context.
 * @returns The initialized BroadcastChannel.
 */
function createBroadcastChannel(
  codeSpace: string,
  connection: Connection,
): BroadcastChannel {
  const channelName = `${location.origin}/live/${codeSpace}/`;
  const broadcastChannel = new BroadcastChannel(channelName);
  broadcastChannel.onmessage = ({ data }) => {
    handleBroadcastMessage(data, connection).catch((error) => {
      console.error("Error handling broadcast message:", error);
    });
  };
  return broadcastChannel;
}

/**
 * Handles incoming socket messages and dispatches them based on their type.
 * @param ws - The WebSocket instance.
 * @param message - The received message as a string.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 */
async function handleSocketMessage(
  ws: Socket,
  message: string,
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  let data: any;
  try {
    data = JSON.parse(message);
  } catch (error) {
    console.error("Invalid JSON received:", message);
    return;
  }

  if (typeof data.i === "number") {
    connection.lastCounter = data.i;
  }

  if (data.changes) {
    await handleChanges(data, connection);
  } else if (data.strSess) {
    await handleSessionString(data, ws, connection);
  } else if (data.type === "handShake") {
    await handleHandshake(ws, data, connection, codeSpace);
  } else if (data.newHash && data.oldHash) {
    await handleHashUpdate(data, connection, codeSpace);
  }
}

/**
 * Handles 'changes' messages received from the socket.
 * @param data - The received data.
 * @param connection - The connection context.
 */
async function handleChanges(data: any, connection: Connection): Promise<void> {
  const { broadcastChannel } = connection;
  broadcastChannel.postMessage({ ...data, sender: SENDER_WORKER_HANDLE_CHANGES });
}

/**
 * Handles 'strSess' messages received from the socket.
 * @param data - The received data.
 * @param ws - The WebSocket instance.
 * @param connection - The connection context.
 */
async function handleSessionString(
  data: any,
  ws: Socket,
  connection: Connection,
): Promise<void> {
  const { oldSession, user } = connection;
  const sess = makeSession(data.strSess);
  const patch = createPatch(sess, oldSession);
  ws.send(JSON.stringify({ ...patch, name: user, i: oldSession.i }));
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
  data: any,
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  ws.send(JSON.stringify({ name: connection.user }));

  const oldSessionHash = makeHash(connection.oldSession);
  if (oldSessionHash !== String(data.hashCode)) {
    connection.oldSession = await fetchInitialSession(codeSpace);
    const { broadcastChannel, oldSession } = connection;
    broadcastChannel.postMessage({
      ...oldSession,
      sender: SENDER_WORKER_HANDSHAKE,
    });
  }
}

/**
 * Handles hash updates to synchronize code sessions.
 * @param data - The received data containing hash updates.
 * @param connection - The connection context.
 * @param codeSpace - The code space identifier.
 */
async function handleHashUpdate(
  data: any,
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  connection.controller.abort();
  connection.controller = new AbortController();
  const { signal } = connection.controller;

  if (signal.aborted) return;

  await mutex.runExclusive(async () => {
    try {
      const oldSession = makeSession(connection.oldSession);
      const oldHash = makeHash(oldSession);

      if (oldHash !== String(data.oldHash)) {
        await handleHashMismatch(connection, codeSpace, signal);
      } else {
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
  if (signal.aborted) return;
  connection.oldSession = await fetchInitialSession(codeSpace);

  if (signal.aborted) return;

  await lazyLoadScript("transpile");
  if (typeof self.transpile !== "function") {
    throw new Error("Transpile function is not available.");
  }

  const transpiled = connection.oldSession.transpiled
    || (await self.transpile(connection.oldSession.code, location.origin));

  if (signal.aborted) return;

  const { broadcastChannel, oldSession } = connection;
  broadcastChannel.postMessage({
    ...oldSession,
    transpiled,
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
  data: any,
  connection: Connection,
  oldSession: ICodeSession,
  signal: AbortSignal,
): Promise<void> {
  const newSession = applyCodePatch(oldSession, data);
  const newHash = makeHash(newSession);

  if (signal.aborted) return;

  await lazyLoadScript("transpile");
  if (typeof self.transpile !== "function") {
    throw new Error("Transpile function is not available.");
  }

  const transpiled = await self.transpile(newSession.code, location.origin);

  if (signal.aborted) return;

  if (data.newHash === newHash) {
    connection.oldSession = newSession;
    const { broadcastChannel } = connection;
    broadcastChannel.postMessage({
      ...newSession,
      transpiled,
      sender: SENDER_WORKER_HASH_MATCH,
    });
  } else {
    if (signal.aborted) return;
    connection.oldSession = await fetchInitialSession(connection.codeSpace);
    if (signal.aborted) return;
    const { broadcastChannel } = connection;
    broadcastChannel.postMessage({
      ...connection.oldSession,
      sender: SENDER_WORKER_HASH_MISMATCH_RELOAD,
    });
  }
}

interface BroadcastMessageData {
  i: number;
  changes?: boolean;
  html: string;
  css: string;
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
  if (data.changes) {
    connection.webSocket.send(JSON.stringify({ ...data, name: connection.user }));
    return;
  }

  if (data.i > connection.oldSession.i && data.html && data.code) {
    const codeSpace = connection.codeSpace;

    let bMod = broadcastMod.get(codeSpace);
    if (!bMod) {
      bMod = {
        ...data,
        controller: new AbortController(),
        timeoutId: 0 as unknown as ReturnType<typeof setTimeout>,
      };
      broadcastMod.set(codeSpace, bMod);
    } else {
      // Update existing modification
      bMod.controller.abort();
      Object.assign(bMod, data);
      bMod.controller = new AbortController();
    }

    const signal = bMod.controller.signal;

    // Clear any existing timeout
    clearTimeout(bMod.timeoutId);

    // Schedule a session update after a delay
    bMod.timeoutId = setTimeout(() => {
      (async () => {
        if (signal.aborted) return;

        if (connection.lastCounter < bMod!.i) {
          const { code, html, css, i, transpiled } = bMod!;
          const json = stringifySession({ code, html, css, i, transpiled });
          try {
            await fetch(`/live/${codeSpace}/session`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: json,
            });
          } catch (error) {
            console.error("Failed to update session:", error);
          }
        }

        // Cleanup to prevent memory leaks
        broadcastMod.delete(codeSpace);
      })().catch((error) => {
        console.error("Error in setTimeout callback:", error);
      });
    }, 1000);

    const oldSession = makeSession(connection.oldSession);
    const newSession = makeSession(data);
    const newHash = makeHash(newSession);
    const oldHash = makeHash(oldSession);

    if (newHash !== oldHash) {
      const patchMessage = createPatch(oldSession, newSession);
      if (patchMessage.oldHash === oldHash) {
        connection.oldSession = newSession;
        connection.webSocket.send(
          JSON.stringify({
            ...patchMessage,
            i: newSession.i,
            name: connection.user,
          }),
        );
      }
    }
  }
}

// Define constants for sender identifiers to avoid magic strings
const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HANDSHAKE = "WORKER_HANDSHAKE";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";
const SENDER_WORKER_HASH_MISMATCH_RELOAD = "WORKER_HASH_MISMATCH_RELOAD";

// Expose the setConnections function to the global scope
Object.assign(self, {
  setConnections,
});
