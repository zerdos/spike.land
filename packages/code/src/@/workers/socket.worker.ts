// packages/code/src/@/workers/socket.worker.ts

import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import type { CodePatch } from "@/lib/make-sess";
import { wait } from "@/lib/wait";
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

console.log("[SocketWorker] Initializing socket worker...");
console.log("[SocketWorker] Creating mutex and connections map");

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
  console.log("[SetConnections] Starting connection setup...");
  console.log("[SetConnections] Signal details:", {
    signal,
    sessionHash: computeSessionHash(sess),
  });
  console.log("[SetConnections] Initial session state:", JSON.stringify(sess, null, 2));

  const [codeSpace, user] = signal.split(" ");
  if (connections.has(codeSpace)) return;

  console.log("[SetConnections] Creating new connection for codeSpace:", codeSpace, "user:", user);
  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: sanitizeSession(sess),
    lastHash: computeSessionHash(sess),
    broadcastChannel: new BroadcastChannel(
      `/live/${codeSpace}/`,
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
  console.log("[SetConnections] Connection successfully created and stored:", {
    codeSpace,
    user,
    lastHash: connection.lastHash,
    channelPath: `/live/${codeSpace}/`,
  });
}

/**
 * Fetches the initial session data for a given code space.
 * @param codeSpace - The code space identifier.
 * @returns A promise that resolves to the code session.
 */
async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  console.log("[FetchInitialSession] Starting fetch for codeSpace:", codeSpace);
  try {
    const response = await fetch(`/api/room/${codeSpace}/session.json`);
    const data = (await response.json()) as ICodeSession;
    console.log("[FetchInitialSession] Session fetched successfully:", {
      codeSpace,
      sessionHash: computeSessionHash(data),
      dataSize: JSON.stringify(data).length,
    });
    return sanitizeSession(data);
  } catch (error) {
    console.error(`[FetchInitialSession] Failed to fetch session for ${codeSpace}:`, {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
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
  console.log("[CreateWebSocket] Initializing connection:", {
    url,
    protocol: location.protocol,
    host,
    codeSpace,
    socketPolicy: SOCKET_POLICY,
  });

  const delegate = {
    socketDidOpen() {
      console.log("[WebSocket] Connection established successfully", {
        codeSpace,
        timestamp: new Date().toISOString(),
      });
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
      console.log("[WebSocket] Connection closed", {
        code,
        reason,
        codeSpace,
        timestamp: new Date().toISOString(),
        willRetry: code !== 1008,
      });
      // Socket closed and will retry the connection.
    },
    socketDidFinish() {
      console.log("[WebSocket] Connection finished permanently", {
        codeSpace,
        timestamp: new Date().toISOString(),
      });
      // Socket closed for good and will not retry.
    },
    socketDidReceiveMessage(socket: Socket, message: string) {
      connections.set(codeSpace, { ...connections.get(codeSpace)!, webSocket: socket });
      console.log("[WebSocket] Received message:", {
        messageType: typeof message === "string" ? "string" : "object",
        messageSize: message.length,
        codeSpace,
        timestamp: new Date().toISOString(),
      });
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
    console.error("[HandleSocketMessage] Connection not found", {
      codeSpace,
      availableConnections: Array.from(connections.keys()),
      timestamp: new Date().toISOString(),
    });
    return;
  }
  const ws = connection.webSocket;
  console.log(`[HandleSocketMessage] Processing message for ${codeSpace}:`, {
    messageType: data.type,
    hasChanges: !!data.changes,
    hasHash: !!data.hash,
    timestamp: new Date().toISOString(),
  });

  if (data.type === "ping") {
    console.log("[HandleSocketMessage] Received ping message", {
      codeSpace,
      timestamp: new Date().toISOString(),
    });
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
    console.log("[HandleSocketMessage] Received hash code", {
      hashCode: data.hashCode,
      currentHash: connection.lastHash,
      codeSpace,
      timestamp: new Date().toISOString(),
    });
    if (connection.lastHash === data.hashCode) {
      console.log("[HandleSocketMessage] Skipping message - hash match detected", {
        hashCode: data.hashCode,
        currentHash: connection.lastHash,
        codeSpace,
        timestamp: new Date().toISOString(),
      });
      return;
    }
  }

  if (data.hash && data.hash !== connection.lastHash) {
    const sess = await fetchInitialSession(codeSpace);
    if (data.hash !== computeSessionHash(sess)) {
      console.log("[HandleSocketMessage] Hash mismatch detected", {
        expectedHash: data.hash,
        computedHash: computeSessionHash(sess),
        codeSpace,
        timestamp: new Date().toISOString(),
      });
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
    console.log("[HandleSocketMessage] Unhandled message type", {
      messageType: data.type,
      dataKeys: Object.keys(data),
      codeSpace,
      timestamp: new Date().toISOString(),
    });
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
  console.log("[HandleChanges] Processing changes", {
    changeType: typeof data.changes,
    changeSize: JSON.stringify(data.changes).length,
    timestamp: new Date().toISOString(),
  });
  connection.broadcastChannel.postMessage({
    ...data,
    sender: SENDER_WORKER_HANDLE_CHANGES,
  });
  console.log("[HandleChanges] Changes successfully broadcasted", {
    sender: SENDER_WORKER_HANDLE_CHANGES,
    timestamp: new Date().toISOString(),
  });
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
  console.log("[HandleSessionString] Processing session string", {
    hash: data.hash,
    user: connection.user,
    codeSpace: connection.codeSpace,
    timestamp: new Date().toISOString(),
  });
  const { oldSession, user } = connection;
  const sess = await fetchInitialSession(connection.codeSpace);
  const patch = generateSessionPatch(sess, oldSession);
  console.log("[HandleSessionString] Generated session patch", {
    patchSize: JSON.stringify(patch).length,
    user: connection.user,
    timestamp: new Date().toISOString(),
  });
  ws.send(JSON.stringify({ ...patch, name: user }));
  console.log("[HandleSessionString] Patch sent successfully", {
    user: connection.user,
    timestamp: new Date().toISOString(),
  });
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
  console.log("[HandleHandshake] Processing handshake", {
    user: connection.user,
    codeSpace,
    timestamp: new Date().toISOString(),
  });
  ws.send(JSON.stringify({ name: connection.user }));
  console.log("[HandleHandshake] User name sent", {
    user: connection.user,
    codeSpace,
    timestamp: new Date().toISOString(),
  });

  const oldSessionHash = computeSessionHash(connection.oldSession);
  console.log("[HandleHandshake] Hash comparison", {
    oldSessionHash,
    receivedHashCode: data.hashCode,
    match: oldSessionHash === data.hashCode,
    codeSpace,
    timestamp: new Date().toISOString(),
  });

  if (oldSessionHash !== data.hashCode) {
    console.log("[HandleHandshake] Hash mismatch detected, fetching new session", {
      oldHash: oldSessionHash,
      receivedHash: data.hashCode,
      codeSpace,
      timestamp: new Date().toISOString(),
    });
    connection.oldSession = await fetchInitialSession(codeSpace);
    connection.broadcastChannel.postMessage({
      ...connection.oldSession,
      sender: SENDER_WORKER_HANDSHAKE,
    });
    console.log("[HandleHandshake] New session broadcasted successfully", {
      newHash: computeSessionHash(connection.oldSession),
      sender: SENDER_WORKER_HANDSHAKE,
      codeSpace,
      timestamp: new Date().toISOString(),
    });
  } else {
    console.log("[HandleHandshake] Hash match verified, no sync needed", {
      hash: oldSessionHash,
      codeSpace,
      timestamp: new Date().toISOString(),
    });
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
  console.log("[HandleHashUpdate] Processing hash update", {
    oldHash: data.oldHash,
    newHash: data.newHash,
    codeSpace,
    timestamp: new Date().toISOString(),
  });
  connection.controller.abort();
  connection.controller = new AbortController();
  const { signal } = connection.controller;

  if (signal.aborted) {
    console.log("[HandleHashUpdate] Update aborted by controller", {
      codeSpace,
      timestamp: new Date().toISOString(),
    });
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
      console.error("[HandleHashUpdate] Error during processing", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        codeSpace,
        timestamp: new Date().toISOString(),
      });
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
    console.log("[HandleHashMismatch] Processing aborted by controller", {
      codeSpace,
      timestamp: new Date().toISOString(),
    });
    return;
  }
  console.log("[HandleHashMismatch] Fetching new session", {
    codeSpace,
    timestamp: new Date().toISOString(),
  });
  connection.oldSession = await fetchInitialSession(codeSpace);

  if (signal.aborted) {
    console.log("[HandleHashMismatch] Processing aborted after session fetch", {
      codeSpace,
      timestamp: new Date().toISOString(),
    });
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
  console.log("[HandleHashMatch] Processing matching hash", {
    oldHash: computeSessionHash(oldSession),
    newHash: data.newHash,
    timestamp: new Date().toISOString(),
  });
  const newSession = applySessionPatch(oldSession, data);
  const newHash = computeSessionHash(newSession);

  if (signal.aborted) {
    console.log("[HandleHashMatch] Processing aborted by controller", {
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (data.newHash === newHash) {
    connection.oldSession = newSession;
    connection.lastHash = newHash;
    connection.broadcastChannel.postMessage({
      ...newSession,
      sender: SENDER_WORKER_HASH_MATCH,
    });
    console.log("[HandleHashMatch] New session broadcasted successfully", {
      newHash,
      sender: SENDER_WORKER_HASH_MATCH,
      timestamp: new Date().toISOString(),
    });
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
  console.log("[HandleBroadcastMessage] Processing broadcast", {
    hasChanges: !!data.changes,
    sender: data.sender,
    codeSpace: data.codeSpace,
    timestamp: new Date().toISOString(),
  });

  if (data.changes) {
    connection.webSocket.send(JSON.stringify({ ...data, name: connection.user }));
    return;
  }

  if (
    data.html && data.code && data.css && data.transpiled && data.codeSpace &&
    data.sender === "Editor"
  ) {
    const codeSpace = data.codeSpace;
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
    await wait(1000);
    if (signal.aborted) {
      return;
    }

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
        console.log("[HandleBroadcastMessage] Patch creation failed", {
          expectedOldHash: patchMessage.oldHash,
          actualOldHash: oldHash,
          timestamp: new Date().toISOString(),
        });
      }
    } else {
      console.log("[HandleBroadcastMessage] No changes detected", {
        hash: newHash,
        timestamp: new Date().toISOString(),
      });
    }
  } else {
    console.log("[HandleBroadcastMessage] Message ignored - conditions not met", {
      hasHtml: !!data.html,
      hasCode: !!data.code,
      hasCss: !!data.css,
      hasTranspiled: !!data.transpiled,
      hasCodeSpace: !!data.codeSpace,
      sender: data.sender,
      timestamp: new Date().toISOString(),
    });
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
        console.error("[BroadcastMessageHandler] Error processing message", {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        });
      });
    }
  });
  port.start();
});

console.log("[SocketWorker] Setup complete", {
  timestamp: new Date().toISOString(),
});
