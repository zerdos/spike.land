import { applyPatch, compare, Operation } from "fast-json-patch";
import { ICodeSession } from "./interfaces";

interface ICodeSessionDiff {
  patch: Operation[];
  originalString: string; // optional validation
}

export function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff {
  // Generate a minimal patch set
  const patch = compare(original, revision);

  // Keep a stringified version for validation
  const originalString = JSON.stringify(original);

  return { patch, originalString };
}

export function applyDiff(
  sess: ICodeSession,
  diff: ICodeSessionDiff,
): ICodeSession {
  const { patch, originalString } = diff;

  // Optional check to ensure 'sess' matches the original
  if (JSON.stringify(sess) !== originalString) {
    throw new Error("Original does not match session");
  }

  // Apply the patch operations
  const { newDocument } = applyPatch(sess, patch);
  return newDocument as ICodeSession;
}
