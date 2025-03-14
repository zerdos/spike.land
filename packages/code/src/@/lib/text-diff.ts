import type { ICodeSession } from "@/lib/interfaces";
import { diffChars, diffLines } from "diff";
import type { Change } from "diff";
import { applyPatch, compare } from "fast-json-patch";
import type { Operation, ReplaceOperation } from "fast-json-patch";

interface StringDiffOperation extends ReplaceOperation<string> {
  _diff?: Change[];
}

export type ICodeSessionDiff = Array<Operation | StringDiffOperation>;

const STRING_DIFF_THRESHOLD = 80;
const LARGE_STRING_THRESHOLD = 10000;
const MAX_DIFF_RATIO = 0.05; // Max diff size should be 5% of original

function optimizeStringDiff(oldStr: string, newStr: string): Change[] | null {
  // Check for append operation first (most efficient)
  if (newStr.startsWith(oldStr)) {
    const appendedContent = newStr.substring(oldStr.length);
    if (appendedContent.length < oldStr.length * MAX_DIFF_RATIO) {
      return [{ value: oldStr, added: false, removed: false, count: oldStr.length }];
    }
  }

  // For large strings, try multi-stage optimization
  if (oldStr.length > LARGE_STRING_THRESHOLD || newStr.length > LARGE_STRING_THRESHOLD) {
    // Try line diff first
    const lineDiff = diffLines(oldStr, newStr);
    const lineJson = JSON.stringify(lineDiff);
    if (lineJson.length < Math.min(oldStr.length, newStr.length) * MAX_DIFF_RATIO) {
      return lineDiff;
    }

    // If line diff is too large, try char diff
    const charDiff = diffChars(oldStr, newStr);
    const charJson = JSON.stringify(charDiff);
    if (charJson.length < Math.min(oldStr.length, newStr.length) * MAX_DIFF_RATIO) {
      return charDiff;
    }

    // If both diffs are too large, use direct value
    return null;
  }

  // For smaller strings, use char diff
  const charDiff = diffChars(oldStr, newStr);
  const charJson = JSON.stringify(charDiff);
  return charJson.length < newStr.length * MAX_DIFF_RATIO ? charDiff : null;
}

function createStringDiff(path: string, oldStr: string, newStr: string): StringDiffOperation {
  // For small strings or if strings are very different, use direct replacement
  if (oldStr.length < STRING_DIFF_THRESHOLD || Math.abs(oldStr.length - newStr.length) > oldStr.length * 0.5) {
    return { op: "replace", path, value: newStr };
  }

  // Try to optimize the diff
  const optimizedDiff = optimizeStringDiff(oldStr, newStr);
  if (optimizedDiff) {
    const isAppend = optimizedDiff.length === 1 && !optimizedDiff[0].removed && !optimizedDiff[0].added;
    return {
      op: "replace",
      path,
      value: isAppend ? `__APPEND__${newStr.substring(oldStr.length)}` : newStr,
      _diff: optimizedDiff
    };
  }

  return { op: "replace", path, value: newStr };
}

function normalizeMessageContent(content: unknown): [{ type: "text"; text: string }] {
  if (Array.isArray(content) && content[0]?.type === "text") {
    return [{ type: "text", text: content[0].text }];
  }
  return [{ type: "text", text: String(content) }];
}

export function createDiff(
  original: ICodeSession,
  revision: ICodeSession
): ICodeSessionDiff {
  try {
    // Create copies excluding messages
    const { messages: _, ...baseOriginal } = original;
    const { messages: __, ...baseRevision } = revision;
    
    const standardDiff = compare(baseOriginal, baseRevision);
    const stringDiffs: StringDiffOperation[] = [];

    // Handle string properties
    for (const key of Object.keys(baseRevision)) {
      const originalValue = baseOriginal[key as keyof typeof baseOriginal];
      const revisionValue = baseRevision[key as keyof typeof baseRevision];

      if (
        typeof originalValue === "string" &&
        typeof revisionValue === "string" &&
        originalValue !== revisionValue
      ) {
        stringDiffs.push(createStringDiff(`/${key}`, originalValue, revisionValue));
      }
    }

    // Handle messages separately to maintain structure
    let messageDiff: Operation[] = [];
    if (Array.isArray(original.messages) && Array.isArray(revision.messages)) {
      if (revision.messages.length === 0) {
        messageDiff = [{ op: "replace" as const, path: "/messages", value: [] }];
      } else if (revision.messages.length === original.messages.length + 1) {
        // Special case: message append
        messageDiff = [{
          op: "add" as const,
          path: "/messages/-",
          value: revision.messages[revision.messages.length - 1]
        }];
      } else {
        messageDiff = compare(
          { messages: original.messages },
          { messages: revision.messages }
        );
      }
    }

    // Filter out string operations from standard diff
    const filteredStandardDiff = standardDiff.filter(op => 
      !stringDiffs.some(sd => sd.path === op.path)
    );

    return [...filteredStandardDiff, ...messageDiff, ...stringDiffs];
  } catch (err) {
    throw new Error(`Failed to create diff: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export function applyDiff(sess: ICodeSession, patch: ICodeSessionDiff): ICodeSession {
  try {
    const sessionCopy = JSON.parse(JSON.stringify(sess)) as ICodeSession;

    const standardOperations: Operation[] = [];
    const messageOperations: Operation[] = [];
    const stringOperations: StringDiffOperation[] = [];

    // Sort operations by type
    for (const op of patch) {
      if (op.op === "replace" && (op as StringDiffOperation)._diff) {
        stringOperations.push(op as StringDiffOperation);
      } else if (op.path.startsWith("/messages")) {
        messageOperations.push(op);
      } else {
        standardOperations.push(op);
      }
    }

    // Apply standard operations first
    if (standardOperations.length > 0) {
      try {
        const standardResult = applyPatch(sessionCopy, standardOperations).newDocument;
        Object.assign(sessionCopy, standardResult);
      } catch (err) {
        console.warn('Standard operations failed:', err);
      }
    }

    // Apply string operations
    for (const op of stringOperations) {
      const pathParts = op.path.split("/").filter(p => p !== "");
      let target: any = sessionCopy;

      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!target[pathParts[i]]) break;
        target = target[pathParts[i]] as Record<string, unknown>;
      }

      const propName = pathParts[pathParts.length - 1];
      const currentValue = target[propName];

      if (op.value.startsWith("__APPEND__")) {
        const appendContent = op.value.substring("__APPEND__".length);
        if (typeof currentValue === "string") {
          target[propName] = currentValue + appendContent;
        }
      } else {
        target[propName] = op.value;
      }
    }

    // Apply message operations last
    if (messageOperations.length > 0) {
      try {
        const messageResult = applyPatch(sessionCopy, messageOperations).newDocument;
        // Ensure message content is in correct format
        if (messageResult.messages) {
          messageResult.messages = messageResult.messages.map(msg => ({
            ...msg,
            content: normalizeMessageContent(msg.content)
          }));
        }
        Object.assign(sessionCopy, messageResult);
      } catch (err) {
        if (err && typeof err === 'object' && 'name' in err && err.name === 'TEST_OPERATION_FAILED') {
          return sess;
        }
        console.warn('Message operations failed:', err);
      }
    }

    return sessionCopy;
  } catch (err) {
    throw new Error(`Failed to apply diff: ${err instanceof Error ? err.message : String(err)}`);
  }
}
