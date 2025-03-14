// packages/code/src/@/lib/common-functions.ts

import type { ICodeSession } from "@/lib/interfaces";
import type { SessionDelta } from "@/lib/make-sess";
import {
  applySessionDelta as originalApplySessionPatch,
  computeSessionHash as originalComputeSessionHash,
  generateSessionPatch as originalGenerateSessionPatch,
  sanitizeSession as originalSanitizeSession,
  sessionToJSON as originalSessionToJSON,
} from "@/lib/make-sess";

/**
 * Safely sanitize a session.
 * @param session The incoming session
 * @returns A sanitized ICodeSession
 */
export function sanitizeSession(session: ICodeSession): ICodeSession {
  return originalSanitizeSession(session);
}

/**
 * Generates a patch between two sessions.
 * @param newSession The newer session
 * @param oldSession The older session
 * @returns A SessionDelta describing the difference
 */
export function generateSessionPatch(
  newSession: ICodeSession,
  oldSession: ICodeSession,
): SessionDelta {
  return originalGenerateSessionPatch(newSession, oldSession);
}

/**
 * Applies a patch to an old session.
 * @param oldSession The original session
 * @param patch The patch to apply
 * @returns The updated session
 */
export function applySessionDelta(
  oldSession: ICodeSession,
  delta: SessionDelta,
): ICodeSession {
  return originalApplySessionPatch(oldSession, delta);
}

/**
 * Computes a unique hash for a session.
 * @param session The session to hash
 * @returns The computed hash string
 */
export function computeSessionHash(session: ICodeSession): string {
  return originalComputeSessionHash(session);
}

/**
 * Converts a session to a JSON string.
 * @param session The session to convert
 * @returns JSON string of the session
 */
export function sessionToJSON(session: ICodeSession): string {
  return originalSessionToJSON(session);
}
