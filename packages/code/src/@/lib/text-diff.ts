import { ICodeSession } from "@/lib/interfaces";
import { computeSessionHash } from "@/lib/make-sess";
import { applyPatch, compare, Operation } from "fast-json-patch";

interface ICodeSessionDiff {
  patch: Operation[];
  oldHash: string;
  hashCode: string;
}

export function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff {
  // Generate a minimal patch set
  const patch = compare(original, revision);

  return { oldHash: computeSessionHash(original), hashCode: computeSessionHash(revision), patch };
}

export function applyDiff(
  sess: ICodeSession,
  diff: ICodeSessionDiff,
): ICodeSession {
  const { patch, oldHash } = diff;

  // Optional check to ensure 'sess' matches the original
  if (computeSessionHash(sess) !== oldHash) {
    throw new Error("Original does not match session");
  }

  // Apply the patch operations
  const { newDocument } = applyPatch(sess, patch);
  return newDocument as ICodeSession;
}
