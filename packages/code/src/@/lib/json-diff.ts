import type { ICodeSession } from "@/lib/interfaces";
import DiffMatchPatch from "diff-match-patch";
import type { Delta } from "jsondiffpatch";
import { DiffPatcher } from "jsondiffpatch";
// The diff can be any valid Delta type from jsondiffpatch
export type ICodeSessionDiff = Delta;

// Create an instance of DiffPatcher with optional configuration
const diffPatcher = new DiffPatcher({
  // Enable text diffing for strings (optional customization)
  textDiff: {
    diffMatchPatch: DiffMatchPatch,
    minLength: 60, // Optional: only diff strings longer than this length
  },
  // Configure array handling if your messages array requires special treatment
  arrays: {
    detectMove: true,
    // You may also define an objectHash function if your arrays contain objects:
    // objectHash: (item: any) => item.id || JSON.stringify(item),
  },
});

/**
 * Creates a diff (delta) between two code sessions using jsondiffpatch.
 * @param original The original code session.
 * @param revision The updated code session.
 * @returns A delta representing the differences.
 */
export function createDelta(original: ICodeSession, revision: ICodeSession) {
  // jsondiffpatch will compute differences for all properties, including strings and arrays.
  return diffPatcher.diff(original, revision);
}

/**
 * Applies a diff (delta) to a code session using jsondiffpatch.
 * @param session The code session to patch.
 * @param delta The delta to apply.
 * @returns The updated code session.
 */
export function applyDelta(session: ICodeSession, delta: ICodeSessionDiff): ICodeSession {
  if (!delta) {
    return session;
  }
  // The patch function applies the computed delta to the session.
  return diffPatcher.patch(session, delta) as ICodeSession;
}
