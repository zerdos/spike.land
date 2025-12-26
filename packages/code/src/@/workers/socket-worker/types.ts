import type { ICodeSession } from "@/lib/interfaces";
import type { createDelta } from "@/lib/text-delta";
import type { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type { Socket } from "@github/stable-socket";

export interface Connection {
  hashCode: string;
  codeSpace: string;
  webSocket: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
  sessionSynchronizer: SessionSynchronizer;
}

export interface WsMessage {
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

export interface SessionMessageData extends ICodeSession {
  changes?: boolean;
  sender: string;
  requiresReRender?: boolean;
}

export interface SocketPolicy {
  timeout: number;
  attempts: number;
  maxDelay: number;
}

export interface SharedWorkerState {
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
}

export const SOCKET_POLICY: SocketPolicy = {
  timeout: 4000,
  attempts: Infinity,
  maxDelay: 60000,
};

export const SENDER_WORKER_HANDLE_CHANGES = "WORKER_HANDLE_CHANGES";
export const SENDER_WORKER_HASH_MATCH = "WORKER_HASH_MATCH";
export const SENDER_WORKER_TRANSPILED_CHANGE = "WORKER_TRANSPILED_CHANGE";
