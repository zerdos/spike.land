// packages/code/src/@/workers/socket.worker.ts

import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess";
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
  lastHash: string;
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
}

interface WsMessage {
  changes: unknown;
  type: string;
  newHash: string;
  oldHash: string;
  error?: string;
  codeSpace: string;
  code: string;
  transpiled: string;
  hashCode: string;
  hash: string;
}

// Use a Map for better management of connections
const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections ||
  new Map();
const mutex = new Mutex();

console.log("Socket worker initialized");

// Define constants for sender identifiers to avoid magic strings
const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HANDSHAKE = "WORKER_HANDSHAKE";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";

/**
 * Sets up the connection for a given code space and user.
 * @param signal - A string containing the code space and user.
 * @param sess - The initial code session.
 */
export async function setConnections(
  signal: string,
  sess: ICodeSession,
): Promise<void> {
  console.log("Setting up connections...");
  console.log("Signal:", signal);
  console.log("Session:", sess);

  const [codeSpace, user] = signal.split(" ");
  if (connections.has(codeSpace)) return;

  console.log("Creating new connection for codeSpace:", codeSpace);
  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: sanitizeSession(sess),
    lastHash: computeSessionHash(sess),
    broadcastChannel: new BroadcastChannel(
      `${location.origin}/live/${codeSpace}/`,
    ),
    webSocket: createWebSocket(codeSpace),
  };

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
    const response = await fetch(`/api/room/${codeSpace}/session.json`);
    const data = (await response.json()) as ICodeSession;
    console.log("Initial session fetched successfully");
    return sanitizeSession(data);
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
      const connection = connections.get(codeSpace)!;
      connection.webSocket.send(
        JSON.stringify({
          type: "handShake",
          name: connection.user,
          hashCode: connection.lastHash,
        }),
      );
    },
    socketDidClose(_socket: Socket, code?: number, reason?: string) {
      console.log("Socket closed", code, reason);
      // Socket closed and will retry the connection.
    },
    socketDidFinish() {
      console.log("Socket finished");
      // Socket closed for good and will not retry.
    },
    socketDidReceiveMessage(socket: Socket, message: string) {
      connections.set(codeSpace, { ...connections.get(codeSpace)!, webSocket: socket });
      console.log("Socket message:", message);
      const data: WsMessage = typeof message === "string" ? JSON.parse(message) : message;
      handleSocketMessage(data, codeSpace).catch((error) => {
        console.error("Error handling socket message:", error);
      });
    },
    socketShouldRetry(_socket: Socket, code: number): boolean {
      return code !== 1008;
    },
  };

  return new BufferedSocket(
    new StableSocket(url, delegate as unknown as SocketDelegate, SOCKET_POLICY),
  );
}

/**
 * Handles incoming socket messages and dispatches them based on their type.
 * @param data - The received message
 * @param codeSpace - The code space identifier
 */
async function handleSocketMessage(data: WsMessage, codeSpace: string): Promise<void> {
  const connection = connections.get(codeSpace);
  if (!connection) {
    console.error("Connection not found for codeSpace:", codeSpace);
    return;
  }
  const ws = connection.webSocket;
  console.log(`Handling socket message for codeSpace: ${codeSpace}`);

  if (data.type === "ping") {
    console.log("Received ping message");
    return;
  }

  if (data.error && data.error === "old hashes not matching") {
    const sess = await fetchInitialSession(codeSpace);
    const lastHash = computeSessionHash(sess);
    if (lastHash !== data.hash) {
      throw new Error("Hash mismatch");
    }
    if (data.hash === lastHash) {
      connection.oldSession = sess;
      connection.lastHash = lastHash;
      connection.broadcastChannel.postMessage({
        ...sess,
        sender: "WORKER_HANDLE_CHANGES",
      });
    }
    const patch = generateSessionPatch(sess, connection.oldSession);
    connection.webSocket.send(
      JSON.stringify({ ...patch, name: connection.user }),
    );
    return;
  }

  if (data.hashCode) {
    console.log("Received hash code:", data.hashCode);
    if (connection.lastHash === data.hashCode) {
      console.log("Skipping message due to hash match");
      return;
    }
  }

  if (data.hash && data.hash !== connection.lastHash) {
    const sess = await fetchInitialSession(codeSpace);
    if (data.hash !== computeSessionHash(sess)) {
      console.log("Hash mismatch, skipping message");
      return;
    }
    connection.lastHash = data.hash;
    connection.oldSession = sess;
    connection.broadcastChannel.postMessage({
      ...sess,
      sender: SENDER_WORKER_HANDLE_CHANGES,
    });
    return;
  }

  if (data.hash && data.hash !== connection.lastHash) {
    const sess = await fetchInitialSession(codeSpace);
    if (data.hash !== computeSessionHash(sess)) {
      console.log("Hash mismatch, skipping message");
      return;
    }
    const patch = generateSessionPatch(sess, connection.oldSession);
    connection.webSocket.send(
      JSON.stringify({ ...patch, name: connection.user }),
    );
    return;
  }

  if (data.changes) {
    await handleChanges({ changes: data.changes }, connection);
  } else if (data.hash) {
    await handleSessionString({ hash: data.hash }, ws, connection);
  } else if (data.type === "handShake") {
    await handleHandshake(ws, { hashCode: data.hashCode, type: data.type }, connection, codeSpace);
  } else if (data.newHash && data.oldHash) {
    if (connection.lastHash === data.newHash) {
      return;
    }
    await handleHashUpdate(data as unknown as CodePatch, connection, codeSpace);
  } else {
    console.log("Unhandled message type:", data);
  }
}

/**
 * Handles 'changes' messages received from the socket.
 * @param data - The received data
 * @param connection - The connection context
 */
async function handleChanges(
  data: { changes: unknown; },
  connection: Connection,
): Promise<void> {
  console.log("Handling changes:", data);
  connection.broadcastChannel.postMessage({
    ...data,
    sender: SENDER_WORKER_HANDLE_CHANGES,
  });
  console.log("Changes broadcasted to channel");
}

/**
 * Handles a session string message.
 * @param data - The received data
 * @param ws - The WebSocket instance
 * @param connection - The connection context
 */
async function handleSessionString(
  data: { hash: string; },
  ws: Socket,
  connection: Connection,
): Promise<void> {
  console.log("Handling session string:", data);
  const { oldSession, user } = connection;
  const sess = await fetchInitialSession(connection.codeSpace);
  const patch = generateSessionPatch(sess, oldSession);
  console.log("Created patch:", patch);
  ws.send(JSON.stringify({ ...patch, name: user }));
  console.log("Sent patch to WebSocket");
}

/**
 * Handles handshake messages and synchronizes sessions.
 * @param ws - The WebSocket instance
 * @param data - The received data
 * @param connection - The connection context
 * @param codeSpace - The code space identifier
 */
async function handleHandshake(
  ws: Socket,
  data: { hashCode: string; type: string; },
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  console.log("Handling handshake...");
  ws.send(JSON.stringify({ name: connection.user }));
  console.log("Sent user name to WebSocket");

  const oldSessionHash = computeSessionHash(connection.oldSession);
  console.log("Old session hash:", oldSessionHash);
  console.log("Received hash code:", data.hashCode);

  if (oldSessionHash !== data.hashCode) {
    console.log("Hash mismatch, fetching new session");
    connection.oldSession = await fetchInitialSession(codeSpace);
    connection.broadcastChannel.postMessage({
      ...connection.oldSession,
      sender: SENDER_WORKER_HANDSHAKE,
    });
    console.log("New session broadcasted");
  } else {
    console.log("Hash match, no action needed");
  }
}

/**
 * Handles hash updates to synchronize code sessions.
 * @param data - The received data containing hash updates
 * @param connection - The connection context
 * @param codeSpace - The code space identifier
 */
async function handleHashUpdate(
  data: CodePatch,
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
    try {
      const oldSession = sanitizeSession(connection.oldSession);
      const oldHash = computeSessionHash(oldSession);

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
 * @param connection - The connection context
 * @param codeSpace - The code space identifier
 * @param signal - The AbortSignal to handle cancellation
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

  connection.broadcastChannel.postMessage({
    ...connection.oldSession,
    sender: SENDER_WORKER_HASH_MISMATCH,
  });
}

/**
 * Handles cases where the hash of the old session matches.
 * @param data - The received data
 * @param connection - The connection context
 * @param oldSession - The old code session
 * @param signal - The AbortSignal to handle cancellation
 */
async function handleHashMatch(
  data: CodePatch,
  connection: Connection,
  oldSession: ICodeSession,
  signal: AbortSignal,
): Promise<void> {
  console.log("Handling hash match");
  const newSession = applySessionPatch(oldSession, data);
  const newHash = computeSessionHash(newSession);

  if (signal.aborted) {
    console.log("Hash match handling aborted");
    return;
  }

  if (data.newHash === newHash) {
    connection.oldSession = newSession;
    connection.lastHash = newHash;
    connection.broadcastChannel.postMessage({
      ...newSession,
      sender: SENDER_WORKER_HASH_MATCH,
    });
    console.log("Broadcasted new session");
  } else {
    throw new Error("New hash does not match received hash");
  }
}

interface BroadcastMessageData extends ICodeSession {
  changes: boolean;
  sender: string;
}

// Use a Map to manage broadcast modifications and prevent memory leaks
const broadcastMod = new Map<
  string,
  BroadcastMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

/**
 * Handles messages received from the broadcast channel.
 * @param data - The received data
 * @param connection - The connection context
 */
async function handleBroadcastMessage(
  data: BroadcastMessageData,
  connection: Connection,
): Promise<void> {
  console.log("Handling broadcast message:", data);

  if (data.changes) {
    connection.webSocket.send(JSON.stringify({ ...data, name: connection.user }));
    return;
  }

  if (data.html && data.code) {
    const codeSpace = connection.codeSpace;
    let bMod = broadcastMod.get(codeSpace);

    if (!bMod) {
      bMod = {
        ...data,
        controller: new AbortController(),
        timeoutId: setTimeout(() => {}, 0),
      };
      broadcastMod.set(codeSpace, bMod);
    } else {
      bMod.controller.abort();
      Object.assign(bMod, data);
      bMod.controller = new AbortController();
    }

    bMod.controller.abort();
    bMod.controller = new AbortController();
    const { signal } = bMod.controller;
    clearTimeout(bMod.timeoutId);

    const oldSession = sanitizeSession(connection.oldSession);
    const newSession = sanitizeSession(data);
    const newHash = computeSessionHash(newSession);
    const oldHash = computeSessionHash(oldSession);

    if (newHash !== oldHash) {
      const patchMessage = generateSessionPatch(oldSession, newSession);
      if (patchMessage.oldHash === oldHash) {
        connection.oldSession = newSession;
        connection.lastHash = newHash;
        connection.webSocket.send(
          JSON.stringify({
            ...patchMessage,
            name: connection.user,
          }),
        );
        return;
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

// Expose the setConnections function to the global scope
Object.assign(globalThis, { setConnections, connections });

// Add event listener for broadcast channel messages
self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  port.addEventListener("message", (evt: MessageEvent) => {
    const connection = connections.get(evt.data.codeSpace);
    if (connection) {
      handleBroadcastMessage(evt.data, connection).catch((error) => {
        console.error("Error handling broadcast message:", error);
      });
    }
  });
  port.start();
});

console.log("Socket worker setup complete");
