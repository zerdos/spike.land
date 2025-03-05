// packages/code/src/@/workers/socket.worker.ts

import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import type { Socket, SocketDelegate } from "@github/stable-socket";
import { BufferedSocket, StableSocket } from "@github/stable-socket";
import { Mutex } from "async-mutex";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";

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
  activePorts: Map<string, number>;
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
  name?: string;
}

interface SessionMessageData extends ICodeSession {
  changes?: boolean;
  sender: string;
}

const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections || new Map();
const sessionSynchronizers: Map<string, SessionSynchronizer> = (globalThis as unknown as typeof self).sessionSynchronizers || new Map();
const activePorts: Map<string, number> = (globalThis as unknown as typeof self).activePorts || new Map();
const mutex = new Mutex();

const lastMessageTime = new Map<string, number>();
const sessionMod = new Map<
  string,
  SessionMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

console.log("[SocketWorker] Initializing socket worker...");

const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";

export async function setConnections(
  signal: string,
  sess: ICodeSession,
): Promise<void> {
  const [codeSpace, user] = signal.split(" ");
  if (connections.has(codeSpace)) return;

  let sessionSynchronizer = sessionSynchronizers.get(codeSpace);
  if (!sessionSynchronizer) {
    sessionSynchronizer = new SessionSynchronizer(codeSpace, sess);
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
  
  sessionSynchronizer.subscribe( (updatedSession: ICodeSession) => {
    try {
      // Check if the session has a sender property and if it matches the connection user
      if (! ('sender' in updatedSession
      )) {
        return;
      }
      const oldSession = connection.oldSession;
      const newSession = sanitizeSession(updatedSession);
      const patch = generateSessionPatch( newSession, oldSession);
      connection.webSocket.send(JSON.stringify({ ...patch, name: connection.user }));
      connection.oldSession = newSession;
      connection.hashCode = computeSessionHash(newSession);
    } catch (error) {
      console.error("[SocketWorker] Error handling session update:", error);
    }
  });

  connection.webSocket.open();
}

function createWebSocket(codeSpace: string): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
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
      console.debug(`[SocketWorker] WebSocket closed for ${codeSpace}, will retry`);
    },
    socketDidReceiveMessage(socket: Socket, message: string) {
      const data: WsMessage = JSON.parse(message);
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

async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  const response = await fetch(`/api/room/${codeSpace}/session.json`);
  return sanitizeSession(await response.json() as ICodeSession);
}

async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
): Promise<void> {
  const release = await mutex.acquire();
  try {
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
        connection.sessionSynchronizer.broadcastSession({
          ...sess,
          sender: SENDER_WORKER_HASH_MATCH,
        } as ICodeSession & {sender: string});
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
        connection.sessionSynchronizer.broadcastSession({
          ...sess,
          sender: SENDER_WORKER_HASH_MATCH,
        } as ICodeSession & {sender: string});
      }
      return;
    }

    if (data.hashCode && data.oldHash) {
      if (connection.hashCode !== data.hashCode && connection.hashCode === data.oldHash) {
        const sess = applySessionPatch(connection.oldSession, data);
        connection.oldSession = sess;
        connection.hashCode = data.hashCode;
        connection.sessionSynchronizer.broadcastSession({
          ...sess,
          sender: data.name || SENDER_WORKER_HANDLE_CHANGES,
        } as ICodeSession & {sender: string});
        return;
      }
    }
  } finally {
    release();
  }
}

self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  let codeSpace: string | undefined;

  port.addEventListener("message", async (evt: MessageEvent) => {
    try {
      const data = evt.data;
      const session: SessionMessageData = data.payload.sess;
      const {codeSpace} = session;
      // const [user, codeSpace] = data.signal.split(" ");

      if (data.id === 'connect') {
        const count = activePorts.get(codeSpace) || 0;
        activePorts.set(codeSpace, count + 1);
        return;
      }

      if (session ) {
        const connection = connections.get(session.codeSpace);
        if (connection) {
          // Create a new session object with the sender property
          const sessionWithSender = {
            ...session,
            sender: connection.user || 'unknown',
          };
          // Use a type assertion to tell TypeScript this is the correct type
          connection.sessionSynchronizer.broadcastSession(sessionWithSender as ICodeSession & { sender: string });
        }
      }
    } catch (error) {
      console.error("[SocketWorker] Error handling port message:", error);
    }
  });

  port.addEventListener("close", () => {
    if (codeSpace) {
      const count = activePorts.get(codeSpace) || 0;
      if (count <= 1) {
        cleanupCodeSpace(codeSpace);
        activePorts.delete(codeSpace);
      } else {
        activePorts.set(codeSpace, count - 1);
      }
    }
  });

  port.start();
});

function cleanupCodeSpace(codeSpace: string): void {
  try {
    const connection = connections.get(codeSpace);
    if (connection) {
      connection.controller.abort();
      connection.webSocket.close();
      connection.sessionSynchronizer.close();
      connections.delete(codeSpace);
      sessionSynchronizers.delete(codeSpace);
      lastMessageTime.delete(codeSpace);
      sessionMod.delete(codeSpace);
      console.debug(`[SocketWorker] Cleaned up resources for ${codeSpace}`);
    }
  } catch (error) {
    console.error(`[SocketWorker] Error cleaning up ${codeSpace}:`, error);
  }
}

Object.assign(globalThis, { 
  connections, 
  sessionSynchronizers, 
  activePorts,
  setConnections,
  cleanupCodeSpace 
});

console.log("[SocketWorker] Setup complete");
