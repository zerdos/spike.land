import { diff_match_patch as DiffMatchPatch } from "@dmsnell/diff-match-patch";
import { create as createDiffPatch, type Delta } from "jsondiffpatch";
// Configure jsondiffpatch to produce as small deltas as possible.

const diffpatcher = createDiffPatch({
  // For arrays, avoid move detection to keep deltas small.
  arrays: {
    detectMove: false,
    includeValueOnMove: false,
  },
  // Only run text diff for fields longer than 60 characters.
  textDiff: {
    diffMatchPatch: DiffMatchPatch,
    minLength: 60,
  },
});

/**
 * Creates a delta between two objects.
 * Returns an empty array if there are no differences.
 *
 * @param oldObj - The original session object.
 * @param newObj - The updated session object.
 * @returns A delta representing the changes.
 */
export function createDelta<T>(oldObj: T, newObj: T): Delta {
  // jsondiffpatch.diff returns undefined when no differences exist.
  return diffpatcher.diff(oldObj, newObj) || [] as unknown as Delta;
}

/**
 * Applies a delta to an object and returns the patched object.
 * Performs a deep clone of the original object to avoid mutation.
 *
 * @param obj - The session object to patch.
 * @param delta - The delta representing the changes.
 * @returns The new session object with the delta applied.
 */
export function applyDelta<T>(obj: T, delta: Delta): T {
  const clone = JSON.parse(JSON.stringify(obj));
  if (Array.isArray(delta)) {
    return clone;
  }
  diffpatcher.patch(clone, delta);
  return clone;
}
