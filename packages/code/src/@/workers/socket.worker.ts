// packages/code/src/@/workers/socket.worker.ts

/**
 * Socket Worker
 *
 * This worker manages WebSocket connections for real-time collaboration.
 * It handles connection establishment, message processing, and session synchronization.
 * 
 * IMPORTANT: The backend is always the source of truth for session data.
 * When hash mismatches occur, this worker will:
 * 1. Fetch the current session from the backend
 * 2. Overwrite local state with the backend data
 * 3. Broadcast the backend session to all connected clients
 * 
 * This ensures all clients stay synchronized with the backend state.
 */

import {
  applySessionDelta,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import type { createDelta } from "@/lib/text-delta";
import { tryCatch } from "@/lib/try-catch";
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
  setConnections: (
    user: string,
    codeSpace: string,
    sess: ICodeSession,
  ) => Promise<void>;
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
  delta: ReturnType<typeof createDelta>;
}

interface SessionMessageData extends ICodeSession {
  changes?: boolean;
  sender: string;
  requiresReRender?: boolean;
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
  debug: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.debug) {
      console.warn(`[SocketWorker][DEBUG] ${message}`, ...args); // Changed to console.warn
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.info) {
      console.warn(`[SocketWorker][INFO] ${message}`, ...args); // Changed to console.warn
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.warn) {
      console.warn(`[SocketWorker][WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[SocketWorker][ERROR] ${message}`, ...args);
  },
  log: (message: string, startTime: number) => {
    if (LOG_CONFIG.log) {
      const duration = Date.now() - startTime;
      console.warn(`[SocketWorker][log] ${message} (${duration.toFixed(2)}ms)`); // Changed to console.warn
    }
  },
};

logger.info("Initializing socket worker...");

const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";
const SENDER_WORKER_TRANSPILED_CHANGE = "WORKER_TRANSPILED_CHANGE";

export async function setConnections(
  user: string,
  codeSpace: string,
  _sess: ICodeSession,
): Promise<void> {
  const startTime = Date.now();
  const sess = sanitizeSession(_sess);

  logger.info(
    `Setting up connection for codeSpace: ${codeSpace}, user: ${user}`,
  );

  if (connections.has(codeSpace)) {
    logger.debug(
      `Connection for codeSpace ${codeSpace} already exists, skipping setup`,
    );
    return;
  }

  let sessionSynchronizer = sessionSynchronizers.get(codeSpace);
  if (!sessionSynchronizer) {
    logger.debug(
      `Creating new SessionSynchronizer for codeSpace: ${codeSpace}`,
    );
    sessionSynchronizer = new SessionSynchronizer(codeSpace, sess);
    sessionSynchronizers.set(codeSpace, sessionSynchronizer);
  } else {
    logger.debug(
      `Using existing SessionSynchronizer for codeSpace: ${codeSpace}`,
    );
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
  sessionSynchronizer.subscribe(async (updatedSession: ICodeSession) => {
    // Check if the session has a sender property
    if (!("sender" in updatedSession)) {
      logger.debug(
        `Ignoring session update without sender property for ${codeSpace}`,
      );
      return;
    }

    logger.debug(
      `Processing session update from sender: ${
        (updatedSession as SessionMessageData).sender
      } for ${codeSpace}`,
    );
    const oldSession = connection.oldSession;
    const newSession = sanitizeSession(updatedSession);
    const patch = generateSessionPatch(oldSession, newSession);

    logger.debug(`Sending patch to WebSocket for ${codeSpace}`, {
      patchSize: JSON.stringify(patch).length,
      user: connection.user,
    });

    const { error: sendError } = await tryCatch(
      Promise.resolve(
        connection.webSocket.send(
          JSON.stringify({ ...patch, name: connection.user }),
        ),
      ),
    );

    if (sendError) {
      logger.error(
        `Error sending patch to WebSocket for ${codeSpace}:`,
        sendError,
      );
      return;
    }

    connection.oldSession = newSession;

    const newHashCode = computeSessionHash(newSession);
    logger.debug(
      `Updated session hash for ${codeSpace}: ${newHashCode} (was: ${connection.hashCode})`,
    );
    connection.hashCode = newHashCode;
  });

  logger.debug(`Opening WebSocket connection for codeSpace: ${codeSpace}`);
  connection.webSocket.open();
  logger.log(`Connection setup completed for ${codeSpace}`, startTime);
}

function createWebSocket(codeSpace: string): Socket {
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  const host = location.host === "localhost"
    ? "testing.spike.land"
    : location.host;
  const url = `${protocol}//${host}/live/${codeSpace}/websocket`;

  logger.info(`Creating WebSocket connection to: ${url}`);

  const delegate = {
    socketDidOpen() {
      logger.info(`WebSocket connection opened for ${codeSpace}`);
      const connection = connections.get(codeSpace);
      if (!connection) {
        logger.error(
          `Connection for ${codeSpace} not found during socketDidOpen`,
        );
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

    socketDidClose(_socket: Socket, event: CloseEvent) {
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

    socketDidReceiveMessage(_socket: Socket, message: string) {
      const messageSize = message.length;
      const messagePreview = message.length > 100
        ? message.substring(0, 97) + "..."
        : message;
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
          .catch((error) => {
            logger.error(
              `Error handling socket message for ${codeSpace}:`,
              error,
            );
          });
      } catch (error) {
        logger.error(
          `Failed to parse WebSocket message for ${codeSpace}:`,
          error,
        );
      }
    },

    socketShouldRetry(_socket: Socket, code: number): boolean {
      const shouldRetry = code !== 1008;
      logger.debug(
        `Socket retry decision for ${codeSpace}: ${shouldRetry} (code: ${code})`,
      );
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
  const url = `/live/${codeSpace}/session.json`;

  logger.info(`Fetching initial session for ${codeSpace} from ${url}`);

  const { data: response, error: fetchError } = await tryCatch(fetch(url));

  if (fetchError) {
    logger.error(
      `Error fetching initial session for ${codeSpace}:`,
      fetchError,
    );
    throw fetchError;
  }

  if (!response.ok) {
    const errorMsg = `HTTP error: ${response.status} ${response.statusText}`;
    logger.error(
      `Failed to fetch initial session for ${codeSpace}: ${errorMsg}`,
    );
    throw new Error(errorMsg);
  }

  const { data: rawSession, error: jsonError } = await tryCatch(
    response.json() as Promise<ICodeSession>,
  );

  if (jsonError) {
    logger.error(`Error parsing JSON for ${codeSpace}:`, jsonError);
    throw jsonError;
  }

  logger.debug(
    `Raw session received for ${codeSpace}, size: ${JSON.stringify(rawSession).length} bytes`,
  );

  const sanitizedSession = sanitizeSession(rawSession);
  const sessionHash = computeSessionHash(sanitizedSession);

  logger.debug(`Sanitized session for ${codeSpace}, hash: ${sessionHash}`);
  logger.log(`Initial session fetched for ${codeSpace}`, startTime);

  return sanitizedSession;
}

async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
): Promise<void> {
  const startTime = Date.now();
  logger.debug(
    `Handling socket message for ${codeSpace}, type: ${data.type || "unknown"}`,
  );

  const { data: release, error: mutexError } = await tryCatch(mutex.acquire());

  if (mutexError) {
    logger.error(`Failed to acquire mutex for ${codeSpace}:`, mutexError);
    return;
  }

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
      logger.warn(
        `Hash mismatch detected for ${codeSpace}: old hashes not matching`,
      );
      logger.debug(
        `Current hash: ${connection.hashCode}, server hash: ${data.hash || "unknown"}`,
      );

      logger.info(
        `Fetching fresh session from backend for ${codeSpace} due to hash mismatch`,
      );
      const { data: sess, error: fetchError } = await tryCatch(
        fetchInitialSession(codeSpace),
      );

      if (fetchError) {
        logger.error(
          `Failed to fetch fresh session for ${codeSpace}:`,
          fetchError,
        );
        return;
      }

      const hashCode = computeSessionHash(sess);
      logger.debug(`Fresh session hash from backend for ${codeSpace}: ${hashCode}`);

      // Always update local state with backend session (source of truth)
      connection.oldSession = sess;
      connection.hashCode = hashCode;

      logger.info(
        `Updated local session with backend data for ${codeSpace}, broadcasting to all clients`,
      );
      
      // Broadcast the backend session to all connected clients
      const { error: broadcastError } = await tryCatch(
        Promise.resolve(connection.sessionSynchronizer.broadcastSession(
          {
            ...sess,
            sender: SENDER_WORKER_HASH_MATCH,
          } as ICodeSession & { sender: string; },
        )),
      );

      if (broadcastError) {
        logger.error(
          `Failed to broadcast backend session for ${codeSpace}:`,
          broadcastError,
        );
      }

      // Send handshake with new hash to re-establish connection
      const handshakeData = {
        type: "handShake",
        name: connection.user,
        hashCode: hashCode,
      };

      logger.debug(`Sending new handshake for ${codeSpace} with updated hash`);
      const { error: handshakeError } = await tryCatch(
        Promise.resolve(ws.send(JSON.stringify(handshakeData))),
      );

      if (handshakeError) {
        logger.error(
          `Failed to send handshake after hash mismatch for ${codeSpace}:`,
          handshakeError,
        );
      }

      return;
    }

    if (data.hash && data.hash !== connection.hashCode) {
      logger.warn(
        `Hash mismatch for ${codeSpace}: local=${connection.hashCode}, server=${data.hash}`,
      );

      logger.info(
        `Fetching backend session for ${codeSpace} - backend is source of truth`,
      );
      const { data: sess, error: fetchError } = await tryCatch(
        fetchInitialSession(codeSpace),
      );

      if (fetchError) {
        logger.error(
          `Failed to fetch backend session for ${codeSpace}:`,
          fetchError,
        );
        return;
      }

      const freshHash = computeSessionHash(sess);
      logger.debug(`Backend session hash for ${codeSpace}: ${freshHash}`);

      // Always trust the backend session as source of truth
      connection.hashCode = freshHash;
      connection.oldSession = sess;

      logger.info(
        `Overwriting local session with backend data for ${codeSpace}, hash: ${freshHash}`,
      );

      // Broadcast the backend session to all connected clients
      const { error: broadcastError } = await tryCatch(
        Promise.resolve(connection.sessionSynchronizer.broadcastSession(
          {
            ...sess,
            sender: SENDER_WORKER_HASH_MATCH,
          } as ICodeSession & { sender: string; },
        )),
      );

      if (broadcastError) {
        logger.error(
          `Failed to broadcast backend session for ${codeSpace}:`,
          broadcastError,
        );
      }

      // If server hash still doesn't match after fetching backend, log warning but continue
      if (data.hash !== freshHash) {
        logger.warn(
          `Server WebSocket hash (${data.hash}) doesn't match backend session hash (${freshHash}) for ${codeSpace}. Using backend session.`,
        );
      }

      return;
    }

    if (data.hashCode && data.oldHash) {
      logger.debug(
        `Received patch data for ${codeSpace}: oldHash=${data.oldHash}, newHash=${data.hashCode}`,
      );

      if (
        connection.hashCode !== data.hashCode &&
        connection.hashCode === data.oldHash
      ) {
        logger.info(
          `Applying session patch for ${codeSpace}: ${data.oldHash} -> ${data.hashCode}`,
        );

        const patchStartTime = Date.now();
        const { data: sess, error: patchError } = await tryCatch(
          Promise.resolve(applySessionDelta(connection.oldSession, data)),
        );

        if (patchError) {
          logger.error(
            `Failed to apply session delta for ${codeSpace}:`,
            patchError,
          );
          return;
        }

        logger.log(`Session patch applied for ${codeSpace}`, patchStartTime);

        // Check if transpiled code changed and trigger re-render if needed
        const oldTranspiled = connection.oldSession.transpiled;
        const newTranspiled = sess.transpiled;
        
        if (oldTranspiled !== newTranspiled) {
          logger.info(
            `Transpiled code mismatch detected for ${codeSpace}, triggering re-render`,
          );
          logger.debug(
            `Old transpiled length: ${oldTranspiled?.length || 0}, New transpiled length: ${newTranspiled?.length || 0}`,
          );

          // Broadcast a special message type for re-render
          const { error: reRenderBroadcastError } = await tryCatch(
            Promise.resolve(connection.sessionSynchronizer.broadcastSession(
              {
                ...sess,
                sender: SENDER_WORKER_TRANSPILED_CHANGE,
                requiresReRender: true,
              } as ICodeSession & { sender: string; requiresReRender: boolean; },
            )),
          );

          if (reRenderBroadcastError) {
            logger.error(
              `Failed to broadcast re-render session for ${codeSpace}:`,
              reRenderBroadcastError,
            );
          }
        }

        connection.oldSession = sess;
        connection.hashCode = data.hashCode;

        const sender = data.name || SENDER_WORKER_HANDLE_CHANGES;
        logger.debug(
          `Broadcasting patched session for ${codeSpace} from sender: ${sender}`,
        );

        const { error: broadcastError } = await tryCatch(
          Promise.resolve(connection.sessionSynchronizer.broadcastSession(
            {
              ...sess,
              sender,
            } as ICodeSession & { sender: string; },
          )),
        );

        if (broadcastError) {
          logger.error(
            `Failed to broadcast patched session for ${codeSpace}:`,
            broadcastError,
          );
        }

        return;
      } else {
        logger.warn(
          `Cannot apply patch for ${codeSpace}: hash mismatch detected`,
        );
        logger.debug(
          `Current hash: ${connection.hashCode}, patch oldHash: ${data.oldHash}, patch newHash: ${data.hashCode}`,
        );

        // Hash mismatch - fetch backend session as source of truth
        logger.info(
          `Fetching backend session for ${codeSpace} due to patch hash mismatch`,
        );
        const { data: sess, error: fetchError } = await tryCatch(
          fetchInitialSession(codeSpace),
        );

        if (fetchError) {
          logger.error(
            `Failed to fetch backend session for ${codeSpace}:`,
            fetchError,
          );
          return;
        }

        const freshHash = computeSessionHash(sess);
        connection.oldSession = sess;
        connection.hashCode = freshHash;

        logger.info(
          `Updated local session with backend data for ${codeSpace}, new hash: ${freshHash}`,
        );

        // Broadcast the backend session to all connected clients
        const { error: broadcastError } = await tryCatch(
          Promise.resolve(connection.sessionSynchronizer.broadcastSession(
            {
              ...sess,
              sender: SENDER_WORKER_HASH_MATCH,
            } as ICodeSession & { sender: string; },
          )),
        );

        if (broadcastError) {
          logger.error(
            `Failed to broadcast backend session for ${codeSpace}:`,
            broadcastError,
          );
        }
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

  port?.addEventListener("message", async (evt: MessageEvent) => {
    const startTime = Date.now();

    const data = evt.data;
    logger.debug(
      `Received message on port ${portId}, id: ${data.id || "unknown"}`,
    );

    if (!data.payload || !data.payload.sess) {
      logger.warn(
        `Invalid message format on port ${portId}, missing payload or session`,
      );
      return;
    }

    const session: SessionMessageData = data.payload.sess;
    const { codeSpace: sessionCodeSpace } = session;
    codeSpace = sessionCodeSpace; // Store for port close handler

    logger.debug(
      `Message for codeSpace: ${sessionCodeSpace} on port ${portId}`,
    );

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
        logger.debug(
          `Broadcasting session from port ${portId} for ${session.codeSpace}`,
        );

        // Check if this is a re-rendered session that needs to be sent to the server
        if (session.sender === "CODE_SESSION_RERENDER") {
          logger.info(
            `Re-rendered session detected for ${session.codeSpace}, sending update to server`,
          );

          // Send the updated session back to the server
          const sanitizedSession = sanitizeSession(session);
          const patch = generateSessionPatch(connection.oldSession, sanitizedSession);
          
          logger.debug(
            `Sending re-render patch to server for ${session.codeSpace}, patch size: ${
              JSON.stringify(patch).length
            } bytes`,
          );

          const { error: sendError } = await tryCatch(
            Promise.resolve(
              connection.webSocket.send(
                JSON.stringify({ ...patch, name: connection.user, type: "sessionUpdate" }),
              ),
            ),
          );

          if (sendError) {
            logger.error(
              `Failed to send re-render patch to server for ${session.codeSpace}:`,
              sendError,
            );
          } else {
            // Update the local reference
            connection.oldSession = sanitizedSession;
            connection.hashCode = computeSessionHash(sanitizedSession);
            logger.info(
              `Re-render patch sent successfully for ${session.codeSpace}`,
            );
          }
        }

        // Create a new session object with the sender property
        const sessionWithSender = {
          ...session,
          sender: connection.user || "unknown",
        };

        // Use a type assertion to tell TypeScript this is the correct type
        const { error: broadcastError } = await tryCatch(
          Promise.resolve(connection.sessionSynchronizer.broadcastSession(
            sessionWithSender as ICodeSession & { sender: string; },
          )),
        );

        if (broadcastError) {
          logger.error(
            `Error broadcasting session from port ${portId} for ${session.codeSpace}:`,
            broadcastError,
          );
        } else {
          logger.debug(
            `Session broadcast completed for ${session.codeSpace} from port ${portId}`,
          );
        }
      } else {
        logger.warn(
          `No connection found for ${session.codeSpace} when broadcasting from port ${portId}`,
        );
      }
    }

    logger.log(
      `Port message handled for ${sessionCodeSpace} on port ${portId}`,
      startTime,
    );
  });

  port?.addEventListener("close", () => {
    logger.info(`Port ${portId} closed`);

    if (codeSpace) {
      const count = activePorts.get(codeSpace) || 0;
      logger.debug(
        `Port ${portId} closed for codeSpace ${codeSpace}, current count: ${count}`,
      );

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

  port?.start();
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

      logger.debug(
        `Removing synchronizer from sessionSynchronizers map for ${codeSpace}`,
      );
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
