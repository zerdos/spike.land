import {
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import { tryCatch } from "@/lib/try-catch";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type { Socket, SocketDelegate } from "@github/stable-socket";
import { BufferedSocket, StableSocket } from "@github/stable-socket";
import { logger } from "./logger";
import { handleSocketMessage } from "./message-handler";
import type { Connection, SessionMessageData } from "./types";
import { SOCKET_POLICY } from "./types";

export function createWebSocket(
  codeSpace: string,
  connections: Map<string, Connection>,
): Socket {
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
        const data = JSON.parse(message);
        logger.debug(`Message type: ${data.type || "unknown"}`);

        if (data.type === "ping") {
          logger.debug(`Ping received for ${codeSpace}`);
          return;
        }

        const startTime = Date.now();
        handleSocketMessage(data, codeSpace, connections)
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

export async function setConnections(
  user: string,
  codeSpace: string,
  _sess: ICodeSession,
  connections: Map<string, Connection>,
  sessionSynchronizers: Map<string, SessionSynchronizer>,
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
    webSocket: createWebSocket(codeSpace, connections),
    sessionSynchronizer,
  };

  connections.set(codeSpace, connection);
  logger.debug(`Connection stored for codeSpace: ${codeSpace}`);

  logger.debug(`Setting up session subscription for codeSpace: ${codeSpace}`);
  sessionSynchronizer.subscribe(async (updatedSession: ICodeSession) => {
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

export function cleanupCodeSpace(
  codeSpace: string,
  connections: Map<string, Connection>,
  sessionSynchronizers: Map<string, SessionSynchronizer>,
  lastMessageTime: Map<string, number>,
  sessionMod: Map<string, unknown>,
): void {
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
