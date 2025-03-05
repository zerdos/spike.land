// packages/code/src/@/workers/socket.worker.ts

/**
 * Socket Worker
 *
 * This worker manages WebSocket connections for real-time collaboration.
 * It handles connection establishment, message processing, and session synchronization.
 */

import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type { Socket, SocketDelegate } from "@github/stable-socket";
import { BufferedSocket, StableSocket } from "@github/stable-socket";
import { Mutex } from "async-mutex";

declare let self: SharedWorkerGlobalScope & {
  ata: unknown;
  connections: Map<string, Connection>;
  prettierCss: unknown;
  prettierJs: unknown;
  createWorkflow: unknown;
  tsx: unknown;
  updateSearchReplace: unknown;
  setConnections: (user: string, codeSpace: string, sess: ICodeSession) => Promise<void>;
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

const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections ||
  new Map();
const sessionSynchronizers: Map<string, SessionSynchronizer> =
  (globalThis as unknown as typeof self).sessionSynchronizers || new Map();
const activePorts: Map<string, number> = (globalThis as unknown as typeof self).activePorts ||
  new Map();
const mutex = new Mutex();

const lastMessageTime = new Map<string, number>();
const sessionMod = new Map<
  string,
  SessionMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

// Configure logging levels - set to true to enable that level
const LOG_CONFIG = {
  debug: true, // Detailed debug information
  info: true, // General information about normal operation
  warn: true, // Warning conditions
  log: true, // Date measurements
};

// Logging utility functions
const logger = {
  debug: (message: string, ...args: any[]) => {
    if (LOG_CONFIG.debug) console.debug(`[SocketWorker][DEBUG] ${message}`, ...args);
  },
  info: (message: string, ...args: any[]) => {
    if (LOG_CONFIG.info) console.info(`[SocketWorker][INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    if (LOG_CONFIG.warn) console.warn(`[SocketWorker][WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[SocketWorker][ERROR] ${message}`, ...args);
  },
  log: (message: string, startTime: number) => {
    if (LOG_CONFIG.log) {
      const duration = Date.now() - startTime;
      console.info(`[SocketWorker][log] ${message} (${duration.toFixed(2)}ms)`);
    }
  },
};

logger.info("Initializing socket worker...");

const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HASH_MISMATCH = "WORKER_HASH_MISMATCH";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";

export async function setConnections(
  user: string,
  codeSpace: string,
  _sess: ICodeSession,
): Promise<void> {
  const startTime = Date.now();
  const sess = sanitizeSession(_sess);

  logger.info(`Setting up connection for codeSpace: ${codeSpace}, user: ${user}`);

  if (connections.has(codeSpace)) {
    logger.debug(`Connection for codeSpace ${codeSpace} already exists, skipping setup`);
    return;
  }

  let sessionSynchronizer = sessionSynchronizers.get(codeSpace);
  if (!sessionSynchronizer) {
    logger.debug(`Creating new SessionSynchronizer for codeSpace: ${codeSpace}`);
    sessionSynchronizer = new SessionSynchronizer(codeSpace, sess);
    sessionSynchronizers.set(codeSpace, sessionSynchronizer);
  } else {
    logger.debug(`Using existing SessionSynchronizer for codeSpace: ${codeSpace}`);
  }

  const hashCode = computeSessionHash(sess);
  logger.debug(`Initial session hash for ${codeSpace}: ${hashCode}`);

  const connection: Connection = {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: sess,
    hashCode,
    webSocket: createWebSocket(codeSpace),
    sessionSynchronizer,
  };

  connections.set(codeSpace, connection);
  logger.debug(`Connection stored for codeSpace: ${codeSpace}`);

  logger.debug(`Setting up session subscription for codeSpace: ${codeSpace}`);
  sessionSynchronizer.subscribe((updatedSession: ICodeSession) => {
    const updateStartTime = Date.now();
    try {
      // Check if the session has a sender property
      if (!("sender" in updatedSession)) {
        logger.debug(`Ignoring session update without sender property for ${codeSpace}`);
        return;
      }

      logger.debug(
        `Processing session update from sender: ${(updatedSession as any).sender} for ${codeSpace}`,
      );
      const oldSession = connection.oldSession;
      const newSession = sanitizeSession(updatedSession);
      const patch = generateSessionPatch(newSession, oldSession);

      logger.debug(`Sending patch to WebSocket for ${codeSpace}`, {
        patchSize: JSON.stringify(patch).length,
        user: connection.user,
      });

      connection.webSocket.send(JSON.stringify({ ...patch, name: connection.user }));
      connection.oldSession = newSession;

      const newHashCode = computeSessionHash(newSession);
      logger.debug(
        `Updated session hash for ${codeSpace}: ${newHashCode} (was: ${connection.hashCode})`,
      );
      connection.hashCode = newHashCode;
    } catch (error) {
      logger.error(`Error handling session update for ${codeSpace}:`, error);
    }
  });

  logger.debug(`Opening WebSocket connection for codeSpace: ${codeSpace}`);
  connection.webSocket.open();
  logger.log(`Connection setup completed for ${codeSpace}`, startTime);
}

function createWebSocket(codeSpace: string): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;

  logger.info(`Creating WebSocket connection to: ${url}`);

  const delegate = {
    socketDidOpen() {
      logger.info(`WebSocket connection opened for ${codeSpace}`);
      const connection = connections.get(codeSpace);
      if (!connection) {
        logger.error(`Connection for ${codeSpace} not found during socketDidOpen`);
        return;
      }

      const handshakeData = {
        type: "handShake",
        name: connection.user,
        hashCode: connection.hashCode,
      };

      logger.debug(`Sending handshake for ${codeSpace}`, handshakeData);
      connection.webSocket.send(JSON.stringify(handshakeData));
    },

    socketDidClose(socket: Socket, event: CloseEvent) {
      logger.info(
        `WebSocket closed for ${codeSpace} with code ${event.code}, reason: "${event.reason}", wasClean: ${event.wasClean}`,
      );
      if (event.code === 1000 || event.code === 1001) {
        logger.debug(`Normal closure for ${codeSpace}, code: ${event.code}`);
      } else {
        logger.warn(
          `Abnormal closure for ${codeSpace}, code: ${event.code}, will retry: ${
            event.code !== 1008
          }`,
        );
      }
    },

    socketDidReceiveMessage(socket: Socket, message: string) {
      const messageSize = message.length;
      const messagePreview = message.length > 100 ? message.substring(0, 97) + "..." : message;
      logger.debug(
        `Received WebSocket message for ${codeSpace} (${messageSize} bytes): ${messagePreview}`,
      );

      try {
        const data: WsMessage = JSON.parse(message);
        logger.debug(`Message type: ${data.type || "unknown"}`);

        if (data.type === "ping") {
          logger.debug(`Ping received for ${codeSpace}`);
          return;
        }

        const startTime = Date.now();
        handleSocketMessage(data, codeSpace)
          .then(() => {
            logger.log(`Handled socket message for ${codeSpace}`, startTime);
          })
          .catch(error => {
            logger.error(`Error handling socket message for ${codeSpace}:`, error);
          });
      } catch (error) {
        logger.error(`Failed to parse WebSocket message for ${codeSpace}:`, error);
      }
    },

    socketShouldRetry(_socket: Socket, code: number): boolean {
      const shouldRetry = code !== 1008;
      logger.debug(`Socket retry decision for ${codeSpace}: ${shouldRetry} (code: ${code})`);
      return shouldRetry;
    },

    socketDidFailWithError(_socket: Socket, error: Error) {
      logger.error(`WebSocket error for ${codeSpace}:`, error);
    },
  };

  logger.debug(`Creating BufferedSocket with StableSocket for ${codeSpace}`);
  logger.debug(
    `Socket policy: timeout=${SOCKET_POLICY.timeout}ms, attempts=${SOCKET_POLICY.attempts}, maxDelay=${SOCKET_POLICY.maxDelay}ms`,
  );

  return new BufferedSocket(
    new StableSocket(url, delegate as unknown as SocketDelegate, SOCKET_POLICY),
  );
}

async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  const startTime = Date.now();
  const url = `/api/room/${codeSpace}/session.json`;

  logger.info(`Fetching initial session for ${codeSpace} from ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      logger.error(
        `Failed to fetch initial session for ${codeSpace}: ${response.status} ${response.statusText}`,
      );
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const rawSession = await response.json() as ICodeSession;
    logger.debug(
      `Raw session received for ${codeSpace}, size: ${JSON.stringify(rawSession).length} bytes`,
    );

    const sanitizedSession = sanitizeSession(rawSession);
    const sessionHash = computeSessionHash(sanitizedSession);

    logger.debug(`Sanitized session for ${codeSpace}, hash: ${sessionHash}`);
    logger.log(`Initial session fetched for ${codeSpace}`, startTime);

    return sanitizedSession;
  } catch (error) {
    logger.error(`Error fetching initial session for ${codeSpace}:`, error);
    throw error;
  }
}

async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
): Promise<void> {
  const startTime = Date.now();
  logger.debug(`Handling socket message for ${codeSpace}, type: ${data.type || "unknown"}`);

  const release = await mutex.acquire();
  logger.debug(`Acquired mutex for ${codeSpace}`);

  try {
    const connection = connections.get(codeSpace);
    if (!connection) {
      logger.warn(`No connection found for ${codeSpace}, ignoring message`);
      return;
    }

    const ws = connection.webSocket;

    if (data.type === "ping") {
      logger.debug(`Ignoring ping message for ${codeSpace}`);
      return;
    }

    if (data.error === "old hashes not matching") {
      logger.warn(`Hash mismatch detected for ${codeSpace}: old hashes not matching`);
      logger.debug(`Current hash: ${connection.hashCode}, server hash: ${data.hash || "unknown"}`);

      logger.info(`Fetching fresh session for ${codeSpace} due to hash mismatch`);
      const sess = await fetchInitialSession(codeSpace);
      const hashCode = computeSessionHash(sess);

      logger.debug(`Fresh session hash for ${codeSpace}: ${hashCode}`);

      if (hashCode === data.hash) {
        logger.info(`Hash match after refresh for ${codeSpace}: ${hashCode}`);
        connection.oldSession = sess;
        connection.hashCode = hashCode;

        logger.debug(`Broadcasting hash match session for ${codeSpace}`);
        connection.sessionSynchronizer.broadcastSession(
          {
            ...sess,
            sender: SENDER_WORKER_HASH_MATCH,
          } as ICodeSession & { sender: string; },
        );
      } else {
        logger.warn(
          `Hash still mismatched after refresh for ${codeSpace}: local=${hashCode}, server=${
            data.hash || "unknown"
          }`,
        );
      }

      const patch = generateSessionPatch(sess, connection.oldSession);
      logger.debug(
        `Sending patch after hash mismatch for ${codeSpace}, patch size: ${
          JSON.stringify(patch).length
        } bytes`,
      );
      ws.send(JSON.stringify({ ...patch, name: connection.user }));
      return;
    }

    if (data.hash && data.hash !== connection.hashCode) {
      logger.warn(
        `Hash mismatch for ${codeSpace}: local=${connection.hashCode}, server=${data.hash}`,
      );

      logger.info(`Fetching fresh session for ${codeSpace} due to hash difference`);
      const sess = await fetchInitialSession(codeSpace);
      const freshHash = computeSessionHash(sess);

      logger.debug(`Fresh session hash for ${codeSpace}: ${freshHash}`);

      if (data.hash === freshHash) {
        logger.info(`Server hash matches fresh session for ${codeSpace}: ${freshHash}`);
        connection.hashCode = data.hash;
        connection.oldSession = sess;

        logger.debug(`Broadcasting hash match session for ${codeSpace}`);
        connection.sessionSynchronizer.broadcastSession(
          {
            ...sess,
            sender: SENDER_WORKER_HASH_MATCH,
          } as ICodeSession & { sender: string; },
        );
      } else {
        logger.warn(
          `Server hash doesn't match fresh session for ${codeSpace}: server=${data.hash}, fresh=${freshHash}`,
        );
      }
      return;
    }

    if (data.hashCode && data.oldHash) {
      logger.debug(
        `Received patch data for ${codeSpace}: oldHash=${data.oldHash}, newHash=${data.hashCode}`,
      );

      if (connection.hashCode !== data.hashCode && connection.hashCode === data.oldHash) {
        logger.info(`Applying session patch for ${codeSpace}: ${data.oldHash} -> ${data.hashCode}`);

        const patchStartTime = Date.now();
        const sess = applySessionPatch(connection.oldSession, data);
        logger.log(`Session patch applied for ${codeSpace}`, patchStartTime);

        connection.oldSession = sess;
        connection.hashCode = data.hashCode;

        const sender = data.name || SENDER_WORKER_HANDLE_CHANGES;
        logger.debug(`Broadcasting patched session for ${codeSpace} from sender: ${sender}`);

        connection.sessionSynchronizer.broadcastSession(
          {
            ...sess,
            sender,
          } as ICodeSession & { sender: string; },
        );
        return;
      } else {
        logger.warn(`Cannot apply patch for ${codeSpace}: hash conditions not met`);
        logger.debug(
          `Current hash: ${connection.hashCode}, patch oldHash: ${data.oldHash}, patch newHash: ${data.hashCode}`,
        );
      }
    }

    logger.debug(`No action taken for message in ${codeSpace}`);
  } catch (error) {
    logger.error(`Error handling socket message for ${codeSpace}:`, error);
  } finally {
    release();
    logger.debug(`Released mutex for ${codeSpace}`);
    logger.log(`Socket message handling completed for ${codeSpace}`, startTime);
  }
}

self.addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  let codeSpace: string | undefined;
  const portId = Math.random().toString(36).substring(2, 10);

  logger.info(`New port connected: ${portId}`);

  port.addEventListener("message", async (evt: MessageEvent) => {
    const startTime = Date.now();
    try {
      const data = evt.data;
      logger.debug(`Received message on port ${portId}, id: ${data.id || "unknown"}`);

      if (!data.payload || !data.payload.sess) {
        logger.warn(`Invalid message format on port ${portId}, missing payload or session`);
        return;
      }

      const session: SessionMessageData = data.payload.sess;
      const { codeSpace: sessionCodeSpace } = session;
      codeSpace = sessionCodeSpace; // Store for port close handler

      logger.debug(`Message for codeSpace: ${sessionCodeSpace} on port ${portId}`);

      if (data.id === "connect") {
        const count = activePorts.get(sessionCodeSpace) || 0;
        const newCount = count + 1;
        activePorts.set(sessionCodeSpace, newCount);
        logger.info(
          `Port ${portId} connected to codeSpace ${sessionCodeSpace}, active ports: ${newCount}`,
        );
        return;
      }

      if (session) {
        const connection = connections.get(session.codeSpace);
        if (connection) {
          logger.debug(`Broadcasting session from port ${portId} for ${session.codeSpace}`);

          // Create a new session object with the sender property
          const sessionWithSender = {
            ...session,
            sender: connection.user || "unknown",
          };

          // Use a type assertion to tell TypeScript this is the correct type
          connection.sessionSynchronizer.broadcastSession(
            sessionWithSender as ICodeSession & { sender: string; },
          );
          logger.debug(`Session broadcast completed for ${session.codeSpace} from port ${portId}`);
        } else {
          logger.warn(
            `No connection found for ${session.codeSpace} when broadcasting from port ${portId}`,
          );
        }
      }

      logger.log(`Port message handled for ${sessionCodeSpace} on port ${portId}`, startTime);
    } catch (error) {
      logger.error(`Error handling port message on port ${portId}:`, error);
    }
  });

  port.addEventListener("close", () => {
    logger.info(`Port ${portId} closed`);

    if (codeSpace) {
      const count = activePorts.get(codeSpace) || 0;
      logger.debug(`Port ${portId} closed for codeSpace ${codeSpace}, current count: ${count}`);

      if (count <= 1) {
        logger.info(`Last port for ${codeSpace} closed, cleaning up resources`);
        cleanupCodeSpace(codeSpace);
        activePorts.delete(codeSpace);
      } else {
        const newCount = count - 1;
        logger.debug(`Decreasing port count for ${codeSpace} to ${newCount}`);
        activePorts.set(codeSpace, newCount);
      }
    } else {
      logger.debug(`Port ${portId} closed without associated codeSpace`);
    }
  });

  port.start();
  logger.debug(`Port ${portId} started`);
});

function cleanupCodeSpace(codeSpace: string): void {
  const startTime = Date.now();
  logger.info(`Cleaning up resources for codeSpace: ${codeSpace}`);

  try {
    const connection = connections.get(codeSpace);
    if (connection) {
      logger.debug(`Aborting controller for ${codeSpace}`);
      connection.controller.abort();

      logger.debug(`Closing WebSocket for ${codeSpace}`);
      connection.webSocket.close();

      logger.debug(`Closing SessionSynchronizer for ${codeSpace}`);
      connection.sessionSynchronizer.close();

      logger.debug(`Removing connection from connections map for ${codeSpace}`);
      connections.delete(codeSpace);

      logger.debug(`Removing synchronizer from sessionSynchronizers map for ${codeSpace}`);
      sessionSynchronizers.delete(codeSpace);

      logger.debug(`Cleaning up message tracking for ${codeSpace}`);
      lastMessageTime.delete(codeSpace);
      sessionMod.delete(codeSpace);

      logger.info(`Successfully cleaned up all resources for ${codeSpace}`);
    } else {
      logger.warn(`No connection found for ${codeSpace} during cleanup`);
    }

    logger.log(`Cleanup completed for ${codeSpace}`, startTime);
  } catch (error) {
    logger.error(`Error cleaning up ${codeSpace}:`, error);
  }
}

Object.assign(globalThis, {
  connections,
  sessionSynchronizers,
  activePorts,
  setConnections,
  cleanupCodeSpace,
  logger, // Expose logger for debugging
});

logger.info("Socket worker setup complete");
logger.debug(
  `Initial state: ${connections.size} connections, ${sessionSynchronizers.size} synchronizers, ${activePorts.size} active ports`,
);
