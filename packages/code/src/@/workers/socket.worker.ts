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
import { SessionSynchronizer } from "@/services/SessionSynchronizer";

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
  sessionSynchronizers: Map<string, SessionSynchronizer>;
};

const SOCKET_POLICY = {
  timeout: 4000,
  attempts: Infinity,
  maxDelay: 60000,
};

interface Connection {
  hashCode: string;
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
  sessionSynchronizer: SessionSynchronizer;
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

// Extend ICodeSession to include additional properties needed for messaging
interface SessionMessageData extends ICodeSession {
  changes?: boolean;
  sender: string;
}

// Use a Map for better management of connections
const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections ||
  new Map();
const sessionSynchronizers: Map<string, SessionSynchronizer> = (globalThis as unknown as typeof self).sessionSynchronizers ||
  new Map();
const mutex = new Mutex();

// Use a Map to manage session modifications and prevent memory leaks
// Store last message timestamp per codeSpace
const lastMessageTime = new Map<string, number>();

const sessionMod = new Map<
  string,
  SessionMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

console.log("[SocketWorker] Initializing socket worker...");

// Define constants for sender identifiers to avoid magic strings
const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const _SENDER_WORKER_HANDSHAKE = "WORKER_HANDSHAKE"; // Prefixed with _ since it's only used for type definition
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";

/**
 * Sets up the connection for a given code space and user.
 */
export async function setConnections(
  signal: string,
  sess: ICodeSession,
): Promise<void> {
  const [codeSpace, user] = signal.split(" ");
  if (connections.has(codeSpace)) return;

  // Create or get existing SessionSynchronizer
  let sessionSynchronizer = sessionSynchronizers.get(codeSpace);
  if (!sessionSynchronizer) {
    sessionSynchronizer = new SessionSynchronizer(codeSpace, sess);
    await sessionSynchronizer.init(sess);
    sessionSynchronizers.set(codeSpace, sessionSynchronizer);
  }

  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: sess,
    hashCode: computeSessionHash(sess),
    webSocket: createWebSocket(codeSpace),
    sessionSynchronizer,
  };

  connections.set(codeSpace, connection);
  
  // Set up session synchronizer subscriber to handle session updates
  sessionSynchronizer.subscribe((updatedSession) => {
    console.debug("[SessionSynchronizer] Session updated");
    
    // Handle the session update
    handleSessionUpdate(updatedSession as SessionMessageData, connection).catch(error => {
      console.error("[SessionSynchronizer] Error handling session update:", error);
    });
  });

  connection.webSocket.open();
}

/**
 * Handles session updates from the SessionSynchronizer
 */
async function handleSessionUpdate(
  updatedSession: SessionMessageData,
  connection: Connection
): Promise<void> {
  // Only send to WebSocket if the session has meaningful changes
  if (hasSessionChanges(connection.oldSession, updatedSession)) {
    console.debug("[SessionSynchronizer] Forwarding changes to WebSocket");
    
    // Send to WebSocket
    connection.webSocket.send(
      JSON.stringify({
        ...updatedSession,
        name: connection.user,
      })
    );
    
    // Process the session update (similar to what was in handleBroadcastMessage)
    await processSessionUpdate(updatedSession, connection);
  }
}

/**
 * Checks if there are meaningful changes between two sessions
 * Uses deep comparison for complex properties
 */
function hasSessionChanges(oldSession: ICodeSession, newSession: ICodeSession): boolean {
  // Quick check for primitive properties
  if (oldSession.code !== newSession.code ||
      oldSession.transpiled !== newSession.transpiled ||
      oldSession.css !== newSession.css ||
      oldSession.html !== newSession.html) {
    return true;
  }
  
  // Check messages array length
  if (oldSession.messages.length !== newSession.messages.length) {
    return true;
  }
  
  // For complex properties like messages, we could do more detailed comparison
  // if needed, but for now we'll assume if the lengths match, they're the same
  // since messages are typically only appended to, not modified
  
  return false;
}

/**
 * Creates a WebSocket connection for the given code space.
 */
function createWebSocket(codeSpace: string): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost"
    ? "testing.spike.land"
    : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;

  const delegate = {
    socketDidOpen() {
      const connection = connections.get(codeSpace);
      if (!connection) {
        console.error(`[SocketWorker] Connection for ${codeSpace} not found during socketDidOpen`);
        return;
      }
      
      connection.webSocket.send(
        JSON.stringify({
          type: "handShake",
          name: connection.user,
          hashCode: connection.hashCode,
        }),
      );
      console.debug(`[SocketWorker] WebSocket opened for ${codeSpace}`);
    },
    socketDidClose() {
      // Socket closed and will retry the connection.
      console.debug(`[SocketWorker] WebSocket closed for ${codeSpace}, will retry`);
    },
    socketDidFinish() {
      // Socket closed for good and will not retry.
      console.debug(`[SocketWorker] WebSocket finished for ${codeSpace}, will not retry`);
      
      // Clean up resources when the socket is closed for good
      cleanupCodeSpace(codeSpace);
    },
    socketDidReceiveMessage(socket: Socket, message: string) {
      connections.set(codeSpace, {
        ...connections.get(codeSpace)!,
        webSocket: socket,
      });
      const data: WsMessage = typeof message === "string"
        ? JSON.parse(message)
        : message;
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
 * Processes session updates with debouncing and change detection
 */
async function processSessionUpdate(
  data: SessionMessageData,
  connection: Connection,
): Promise<void> {
  // Early return if the message doesn't have meaningful changes
  if (
    !data.code && !data.messages
  ) {
    console.debug(
      "[ProcessSessionUpdate] Skipping message - no meaningful changes",
    );
    return;
  }

  const now = Date.now();
  const lastTime = lastMessageTime.get(data.codeSpace) || now;
  const timeSinceLastMessage = now - lastTime;
  lastMessageTime.set(data.codeSpace, now);

  console.debug("[ProcessSessionUpdate] Processing editor message", {
    hasCode: !!data.code,
    hasTranspiled: !!data.transpiled,
    hasCss: !!data.css,
    hasHtml: !!data.html,
    timeSinceLastMessage,
    timeStamp: now,
  });

    const codeSpace = data.codeSpace;
    let sMod = sessionMod.get(codeSpace);

    if (!sMod) {
      sMod = {
        ...data,
        controller: new AbortController(),
        timeoutId: setTimeout(() => {}, 0),
      };
      sessionMod.set(codeSpace, sMod);
    } else {
      sMod.controller.abort();
      Object.assign(sMod, data);
      sMod.controller = new AbortController();
    }

    sMod.controller.abort();
    sMod.controller = new AbortController();
    const { signal } = sMod.controller;
    clearTimeout(sMod.timeoutId);
    await wait(1000); // Increase debounce time to 1 second

    if (signal.aborted) {
      return;
    }

    // Only process if there are actual changes to sync
    if (data.code || data.transpiled || data.css || data.html) {
      const syncStartTime = performance.now();
      const oldSession = sanitizeSession(connection.oldSession);
      const newSession = sanitizeSession({ ...oldSession, ...data });
      const hashCode = computeSessionHash(newSession);
      const oldHash = computeSessionHash(oldSession);
      const hashTime = performance.now() - syncStartTime;

      if (hashCode !== oldHash) {
        const patchStartTime = performance.now();
        const patchMessage = generateSessionPatch(oldSession, newSession);
        if (patchMessage.oldHash === oldHash) {
          connection.oldSession = newSession;
          connection.hashCode = hashCode;
          
          // Send changes to WebSocket
          connection.webSocket.send(
            JSON.stringify({
              ...patchMessage,
              name: connection.user,
            }),
          );
          
          // Update the SessionSynchronizer with the new session
          connection.sessionSynchronizer.broadcastSession(newSession);
          
          const totalTime = performance.now() - syncStartTime;
          console.debug("[ProcessSessionUpdate] Sync metrics", {
            hashingTime: hashTime,
            patchingTime: performance.now() - patchStartTime,
            totalProcessingTime: totalTime,
            messageSize: JSON.stringify(patchMessage).length,
          });
        }
      }
    }
  }

/**
 * Handles incoming socket messages.
 */
async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
): Promise<void> {
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
      
      // Use SessionSynchronizer to broadcast the changes
      const sessionData: SessionMessageData = {
        ...sess,
        sender: SENDER_WORKER_HANDLE_CHANGES
      };
      connection.sessionSynchronizer.broadcastSession(sessionData);
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
      
      // Use SessionSynchronizer to broadcast the changes
      const sessionData: SessionMessageData = {
        ...sess,
        sender: SENDER_WORKER_HANDLE_CHANGES
      };
      connection.sessionSynchronizer.broadcastSession(sessionData);
    }
    return;
  }

  if (data.hashCode && data.oldHash) {
    if (connection.hashCode !== data.hashCode) {
      await handleHashUpdate(
        data as unknown as CodePatch,
        connection,
        codeSpace,
      );
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
        
        // Use SessionSynchronizer to broadcast the changes
        const sessionData: SessionMessageData = {
          ...connection.oldSession,
          sender: SENDER_WORKER_HASH_MISMATCH
        };
        connection.sessionSynchronizer.broadcastSession(sessionData);
      }
    } else {
      const newSession = applySessionPatch(oldSession, data);
      const hashCode = computeSessionHash(newSession);

      if (!signal.aborted && data.hashCode === hashCode) {
        connection.oldSession = newSession;
        connection.hashCode = hashCode;
        
        // Use SessionSynchronizer to broadcast the changes
        const sessionData: SessionMessageData = {
          ...newSession,
          sender: SENDER_WORKER_HASH_MATCH
        };
        connection.sessionSynchronizer.broadcastSession(sessionData);
      }
    }
  });
}

// Event listener setup for WebSocket connections
self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  port.addEventListener("message", (evt: MessageEvent) => {
    try {
      const data = evt.data;
      const session :SessionMessageData= data.payload.session;
      const codeSpace = session.codeSpace;
    
      const connection = connections.get(codeSpace);
      if (connection) {

        connection.sessionSynchronizer.broadcastSession(session);
      } else {
        console.debug(`[SocketWorker] No connection found for codeSpace: ${data.codeSpace}`);
      }
    } catch (error) {
      console.error("[SocketWorker] Error handling port message:", error);
    }
  });
  port.start();
});

/**
 * Cleans up resources for a specific code space
 */
function cleanupCodeSpace(codeSpace: string): void {
  try {
    const connection = connections.get(codeSpace);
    if (connection) {
      // Close the session synchronizer
      connection.sessionSynchronizer.close();
      
      // Remove from maps
      connections.delete(codeSpace);
      sessionSynchronizers.delete(codeSpace);
      
      // Clean up other resources
      lastMessageTime.delete(codeSpace);
      sessionMod.delete(codeSpace);
      
      console.debug(`[SocketWorker] Cleaned up all resources for ${codeSpace}`);
    }
  } catch (error) {
    console.error(`[SocketWorker] Error cleaning up resources for ${codeSpace}:`, error);
  }
}

// Expose the necessary functions to the global scope
Object.assign(globalThis, { 
  connections, 
  sessionSynchronizers, 
  setConnections,
  cleanupCodeSpace 
});

console.log("[SocketWorker] Setup complete");
