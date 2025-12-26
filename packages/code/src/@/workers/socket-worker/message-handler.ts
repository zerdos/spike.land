import {
  applySessionDelta,
  computeSessionHash,
  sanitizeSession,
} from "@/lib/common-functions";
import type { ICodeSession } from "@/lib/interfaces";
import { tryCatch } from "@/lib/try-catch";
import { Mutex } from "async-mutex";
import { logger } from "./logger";
import type { Connection, WsMessage } from "./types";
import {
  SENDER_WORKER_HANDLE_CHANGES,
  SENDER_WORKER_HASH_MATCH,
  SENDER_WORKER_TRANSPILED_CHANGE,
} from "./types";

const mutex = new Mutex();

export async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
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

export async function handleSocketMessage(
  data: WsMessage,
  codeSpace: string,
  connections: Map<string, Connection>,
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
      logger.debug(`Ping received for ${codeSpace}`);

      if (data.hashCode && data.hashCode !== connection.hashCode) {
        logger.warn(
          `Hash mismatch in ping for ${codeSpace}: local=${connection.hashCode}, server=${data.hashCode}`,
        );

        logger.info(
          `Fetching backend session for ${codeSpace} due to ping hash mismatch`,
        );
        const { data: sess, error: fetchError } = await tryCatch(
          fetchInitialSession(codeSpace),
        );

        if (fetchError) {
          logger.error(
            `Failed to fetch backend session for ${codeSpace} during ping:`,
            fetchError,
          );
          return;
        }

        const freshHash = computeSessionHash(sess);
        connection.oldSession = sess;
        connection.hashCode = freshHash;

        logger.info(
          `Updated local session with backend data for ${codeSpace} from ping, new hash: ${freshHash}`,
        );

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
            `Failed to broadcast backend session for ${codeSpace} from ping:`,
            broadcastError,
          );
        }
      }

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
      logger.debug(
        `Fresh session hash from backend for ${codeSpace}: ${hashCode}`,
      );

      connection.oldSession = sess;
      connection.hashCode = hashCode;

      logger.info(
        `Updated local session with backend data for ${codeSpace}, broadcasting to all clients`,
      );

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

      connection.hashCode = freshHash;
      connection.oldSession = sess;

      logger.info(
        `Overwriting local session with backend data for ${codeSpace}, hash: ${freshHash}`,
      );

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

        const oldCode = connection.oldSession.code;
        const newCode = sess.code;
        const oldTranspiled = connection.oldSession.transpiled;
        const newTranspiled = sess.transpiled;

        if (oldCode !== newCode && (!newTranspiled || newTranspiled === "")) {
          logger.warn(
            `Code updated but transpiled is empty for ${codeSpace}, needs transpilation`,
          );
          logger.debug(
            `Code changed from ${oldCode?.length || 0} to ${
              newCode?.length || 0
            } chars, transpiled is empty`,
          );

          const { error: transpileBroadcastError } = await tryCatch(
            Promise.resolve(connection.sessionSynchronizer.broadcastSession(
              {
                ...sess,
                sender: SENDER_WORKER_HANDLE_CHANGES,
                requiresTranspilation: true,
              } as ICodeSession & {
                sender: string;
                requiresTranspilation?: boolean;
              },
            )),
          );

          if (transpileBroadcastError) {
            logger.error(
              `Failed to broadcast transpilation required session for ${codeSpace}:`,
              transpileBroadcastError,
            );
          }
        } else if (oldTranspiled !== newTranspiled) {
          logger.info(
            `Transpiled code changed for ${codeSpace}, triggering re-render`,
          );
          logger.debug(
            `Old transpiled length: ${oldTranspiled?.length || 0}, New transpiled length: ${
              newTranspiled?.length || 0
            }`,
          );

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
