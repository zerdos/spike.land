import {
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import { tryCatch } from "@/lib/try-catch";
import type { SessionSynchronizer } from "@/services/SessionSynchronizer";
import { cleanupCodeSpace, setConnections } from "./connection-manager";
import { logger } from "./logger";
import type { Connection, SessionMessageData, SharedWorkerState } from "./types";

declare let self: SharedWorkerGlobalScope & SharedWorkerState;

const connections: Map<string, Connection> = (globalThis as unknown as typeof self).connections ||
  new Map();
const sessionSynchronizers: Map<string, SessionSynchronizer> =
  (globalThis as unknown as typeof self).sessionSynchronizers || new Map();
const activePorts: Map<string, number> = (globalThis as unknown as typeof self).activePorts ||
  new Map();

const lastMessageTime = new Map<string, number>();
const sessionMod = new Map<
  string,
  SessionMessageData & {
    controller: AbortController;
    timeoutId: ReturnType<typeof setTimeout>;
  }
>();

logger.info("Initializing socket worker...");

export async function setConnectionsWrapper(
  user: string,
  codeSpace: string,
  sess: ICodeSession,
): Promise<void> {
  return setConnections(user, codeSpace, sess, connections, sessionSynchronizers);
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
    codeSpace = sessionCodeSpace;

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

        if (session.sender === "CODE_SESSION_RERENDER") {
          logger.info(
            `Re-rendered session detected for ${session.codeSpace}, sending update to server`,
          );

          const sanitizedSession = sanitizeSession(session);
          const patch = generateSessionPatch(
            connection.oldSession,
            sanitizedSession,
          );

          logger.debug(
            `Sending re-render patch to server for ${session.codeSpace}, patch size: ${
              JSON.stringify(patch).length
            } bytes`,
          );

          const { error: sendError } = await tryCatch(
            Promise.resolve(
              connection.webSocket.send(
                JSON.stringify({
                  ...patch,
                  name: connection.user,
                  type: "sessionUpdate",
                }),
              ),
            ),
          );

          if (sendError) {
            logger.error(
              `Failed to send re-render patch to server for ${session.codeSpace}:`,
              sendError,
            );
          } else {
            connection.oldSession = sanitizedSession;
            connection.hashCode = computeSessionHash(sanitizedSession);
            logger.info(
              `Re-render patch sent successfully for ${session.codeSpace}`,
            );
          }
        }

        const sessionWithSender = {
          ...session,
          sender: connection.user || "unknown",
        };

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
        cleanupCodeSpace(
          codeSpace,
          connections,
          sessionSynchronizers,
          lastMessageTime,
          sessionMod,
        );
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

Object.assign(globalThis, {
  connections,
  sessionSynchronizers,
  activePorts,
  setConnections: setConnectionsWrapper,
  cleanupCodeSpace: (codeSpace: string) =>
    cleanupCodeSpace(
      codeSpace,
      connections,
      sessionSynchronizers,
      lastMessageTime,
      sessionMod,
    ),
  logger,
});

logger.info("Socket worker setup complete");
logger.debug(
  `Initial state: ${connections.size} connections, ${sessionSynchronizers.size} synchronizers, ${activePorts.size} active ports`,
);

export {
  cleanupCodeSpace,
  connections,
  logger,
  sessionSynchronizers,
  setConnections,
};

export type { Connection, SessionMessageData, WsMessage } from "./types";
