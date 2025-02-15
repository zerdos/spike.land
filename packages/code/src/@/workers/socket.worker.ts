// packages/code/src/@/workers/socket.worker.ts

import { getBroadcastChannel } from "@/lib/broadcast-channel";
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
import { get } from "http";

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
  hashCode: string;
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
}

interface WsMessage {
  changes: unknown;
  type: string;
  oldHash: string;
  error?: string;
  codeSpace: string;
  code: string;
  transpiled: string;
  hashCode: string;
  hash: string;
}

interface BroadcastMessageData extends ICodeSession {
  changes: boolean;
  sender: string;
}

// Use a Map for better management of connections
const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections ||
  new Map();
const mutex = new Mutex();

// Use a Map to manage broadcast modifications and prevent memory leaks
// Store last message timestamp per codeSpace
const lastMessageTime = new Map<string, number>();

const broadcastMod = new Map<
  string,
  BroadcastMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

console.log("[SocketWorker] Initializing socket worker...");

// Define constants for sender identifiers to avoid magic strings
const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HANDSHAKE = "WORKER_HANDSHAKE";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";

/**
 * Sets up the connection for a given code space and user.
 */
export async function setConnections(signal: string, sess: ICodeSession): Promise<void> {
  const [codeSpace, user] = signal.split(" ");
  if (connections.has(codeSpace)) return;

  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: sess,
    hashCode: computeSessionHash(sess),
    broadcastChannel: getBroadcastChannel(codeSpace),
    webSocket: createWebSocket(codeSpace),
  };

  connections.set(codeSpace, connection);
  connection.broadcastChannel.onmessage = (event) => {
    handleBroadcastMessage(event.data, connection).catch(console.error);
  };

  connection.webSocket.open();
}

/**
 * Creates a WebSocket connection for the given code space.
 */
function createWebSocket(codeSpace: string): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;

  const delegate = {
    socketDidOpen() {
      const connection = connections.get(codeSpace)!;
      connection.webSocket.send(
        JSON.stringify({
          type: "handShake",
          name: connection.user,
          hashCode: connection.hashCode,
        }),
      );
    },
    socketDidClose(_socket: Socket, code?: number) {
      // Socket closed and will retry the connection.
    },
    socketDidFinish() {
      // Socket closed for good and will not retry.
    },
    socketDidReceiveMessage(socket: Socket, message: string) {
      connections.set(codeSpace, { ...connections.get(codeSpace)!, webSocket: socket });
      const data: WsMessage = typeof message === "string" ? JSON.parse(message) : message;
      handleSocketMessage(data, codeSpace).catch(console.error);
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
 * Fetches the initial session data for a code space.
 */
async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  const response = await fetch(`/api/room/${codeSpace}/session.json`);
  const data = await response.json() as ICodeSession;
  return sanitizeSession(data);
}

/**
 * Handles messages received from the broadcast channel.
 */
async function handleBroadcastMessage(
  data: BroadcastMessageData,
  connection: Connection,
): Promise<void> {
  if (data.changes) {
    console.debug("[HandleBroadcastMessage] Direct change message forwarded");
    connection.webSocket.send(JSON.stringify({ ...data, name: connection.user }));
    return;
  }

  // Early return if the message doesn't have meaningful changes
  if (data.sender === "Editor" && !data.code && !data.transpiled && !data.css && !data.html) {
    console.debug("[HandleBroadcastMessage] Skipping message - no meaningful changes");
    return;
  }

  const now = Date.now();
  const lastTime = lastMessageTime.get(data.codeSpace) || now;
  const timeSinceLastMessage = now - lastTime;
  lastMessageTime.set(data.codeSpace, now);

  console.debug("[HandleBroadcastMessage] Processing editor message", {
    hasCode: !!data.code,
    hasTranspiled: !!data.transpiled,
    hasCss: !!data.css,
    hasHtml: !!data.html,
    timeSinceLastMessage,
    timeStamp: now
  });

  if (data.sender === "Editor") {
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
    await wait(1000); // Increase debounce time to 1 second
    
    if (signal.aborted) {
      return;
    }

    // Only process if there are actual changes to sync
    if (data.code || data.transpiled || data.css || data.html) {
      const syncStartTime = performance.now();
      const oldSession = sanitizeSession(connection.oldSession);
      const newSession = sanitizeSession({...oldSession, ...data});
      const hashCode = computeSessionHash(newSession);
      const oldHash = computeSessionHash(oldSession);
      const hashTime = performance.now() - syncStartTime;

      if (hashCode !== oldHash) {
        const patchStartTime = performance.now();
        const patchMessage = generateSessionPatch(oldSession, newSession);
        if (patchMessage.oldHash === oldHash) {
          connection.oldSession = newSession;
          connection.hashCode = hashCode;
          connection.webSocket.send(
            JSON.stringify({
              ...patchMessage,
              name: connection.user,
            }),
          );
          const totalTime = performance.now() - syncStartTime;
          console.debug("[HandleBroadcastMessage] Sync metrics", {
            hashingTime: hashTime,
            patchingTime: performance.now() - patchStartTime,
            totalProcessingTime: totalTime,
            messageSize: JSON.stringify(patchMessage).length,
          });
        }
      }
    }
  }
}

/**
 * Handles incoming socket messages.
 */
async function handleSocketMessage(data: WsMessage, codeSpace: string): Promise<void> {
  const connection = connections.get(codeSpace);
  if (!connection) return;

  const ws = connection.webSocket;

  if (data.type === "ping") return;

  if (data.error === "old hashes not matching") {
    const sess = await fetchInitialSession(codeSpace);
    const hashCode = computeSessionHash(sess);
    if (hashCode === data.hash) {
      connection.oldSession = sess;
      connection.hashCode = hashCode;
      connection.broadcastChannel.postMessage({
        ...sess,
        sender: SENDER_WORKER_HANDLE_CHANGES,
      });
    }
    const patch = generateSessionPatch(sess, connection.oldSession);
    ws.send(JSON.stringify({ ...patch, name: connection.user }));
    return;
  }

  if (data.hash && data.hash !== connection.hashCode) {
    const sess = await fetchInitialSession(codeSpace);
    if (data.hash === computeSessionHash(sess)) {
      connection.hashCode = data.hash;
      connection.oldSession = sess;
      connection.broadcastChannel.postMessage({
        ...sess,
        sender: SENDER_WORKER_HANDLE_CHANGES,
      });
    }
    return;
  }

  if (data.hashCode && data.oldHash) {
    if (connection.hashCode !== data.hashCode) {
      await handleHashUpdate(data as unknown as CodePatch, connection, codeSpace);
    }
    return;
  }
}

/**
 * Handles hash updates to synchronize sessions.
 */
async function handleHashUpdate(
  data: CodePatch,
  connection: Connection,
  codeSpace: string,
): Promise<void> {
  connection.controller.abort();
  connection.controller = new AbortController();
  const { signal } = connection.controller;

  if (signal.aborted) return;

  await mutex.runExclusive(async () => {
    const oldSession = sanitizeSession(connection.oldSession);
    const oldHash = computeSessionHash(oldSession);

    if (oldHash !== String(data.oldHash)) {
      if (!signal.aborted) {
        connection.oldSession = await fetchInitialSession(codeSpace);
        connection.broadcastChannel.postMessage({
          ...connection.oldSession,
          sender: SENDER_WORKER_HASH_MISMATCH,
        });
      }
    } else {
      const newSession = applySessionPatch(oldSession, data);
      const hashCode = computeSessionHash(newSession);

      if (!signal.aborted && data.hashCode === hashCode) {
        connection.oldSession = newSession;
        connection.hashCode = hashCode;
        connection.broadcastChannel.postMessage({
          ...newSession,
          sender: SENDER_WORKER_HASH_MATCH,
        });
      }
    }
  });
}

// Event listener setup for WebSocket connections
self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  port.addEventListener("message", (evt: MessageEvent) => {
    const connection = connections.get(evt.data.codeSpace);
    if (connection) {
      handleBroadcastMessage(evt.data, connection).catch((error) => {
        console.error("[BroadcastMessageHandler] Error:", error);
      });
    }
  });
  port.start();
});

// Expose the necessary functions to the global scope
Object.assign(globalThis, { connections, setConnections });

console.log("[SocketWorker] Setup complete");
