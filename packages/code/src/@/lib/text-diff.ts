import { ICodeSession, Message } from "@/lib/interfaces";
import { Change, diffChars, diffLines } from "diff";
import { applyPatch, compare, Operation, ReplaceOperation } from "fast-json-patch";

// Extend the Operation type to include our custom diff property
interface StringDiffOperation extends ReplaceOperation<any> {
  _diff?: Change[];
}

export interface ICodeSessionDiff extends Array<Operation | StringDiffOperation> {}

// Threshold for using diff-based approach for string properties
const STRING_DIFF_THRESHOLD = 80;

// Threshold for using line-level diff instead of character-level diff
const LARGE_STRING_THRESHOLD = 10000;

/**
 * Creates a diff for long string properties
 * @param oldStr The original string
 * @param newStr The new string
 * @returns An operation that represents the diff
 */
function createStringDiff(path: string, oldStr: string, newStr: string): StringDiffOperation {
  // If either string is short, just use a regular replace
  if (oldStr.length < STRING_DIFF_THRESHOLD || newStr.length < STRING_DIFF_THRESHOLD) {
    return { op: "replace", path, value: newStr };
  }

  // For very large strings, we need to be extra careful about diff size
  if (oldStr.length > LARGE_STRING_THRESHOLD || newStr.length > LARGE_STRING_THRESHOLD) {
    // Check if the change is small and localized
    const changeSize = Math.abs(newStr.length - oldStr.length);
    const isSmallChange = changeSize < oldStr.length * 0.01; // Change is less than 1% of the string

    if (isSmallChange) {
      // For small changes in large strings, try line-level diff first
      const lineDiff = diffLines(oldStr, newStr);
      const lineDiffSize = JSON.stringify(lineDiff).length;

      // If line diff is smaller than the full string, use it
      if (lineDiffSize < newStr.length * 0.9) { // Ensure it's at least 10% smaller
        return {
          op: "replace",
          path,
          value: newStr,
          _diff: lineDiff,
        } as StringDiffOperation;
      }

      // Otherwise try character-level diff
      const charDiff = diffChars(oldStr, newStr);
      const charDiffSize = JSON.stringify(charDiff).length;

      // If char diff is smaller than the full string, use it
      if (charDiffSize < newStr.length * 0.9) { // Ensure it's at least 10% smaller
        return {
          op: "replace",
          path,
          value: newStr,
          _diff: charDiff,
        } as StringDiffOperation;
      }

      // If neither diff is small enough, fall back to regular replace
      return { op: "replace", path, value: newStr };
    } else {
      // For larger changes, just send the full value
      return { op: "replace", path, value: newStr };
    }
  } else {
    // For moderately sized strings, use character-level diff
    const diff = diffChars(oldStr, newStr);

    // Return a specialized operation that contains the diff
    return {
      op: "replace",
      path,
      value: newStr,
      _diff: diff,
    } as StringDiffOperation;
  }
}

/**
 * Creates an optimized diff between two code sessions
 * Specifically optimizes for message operations and long string properties to reduce patch size
 */
export function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff {
  // Create a copy of the sessions to work with
  const originalCopy = { ...original, messages: [] };
  const revisionCopy = { ...revision, messages: [] };

  // Handle long string properties specifically
  const stringDiffs: StringDiffOperation[] = [];

  // Check each property for long strings
  for (const key of Object.keys(revisionCopy)) {
    const originalValue = (originalCopy as any)[key];
    const revisionValue = (revisionCopy as any)[key];

    // If both are strings and at least one is long
    if (
      typeof originalValue === "string" &&
      typeof revisionValue === "string" &&
      (originalValue.length >= STRING_DIFF_THRESHOLD ||
        revisionValue.length >= STRING_DIFF_THRESHOLD) &&
      originalValue !== revisionValue
    ) {
      // Create a specialized diff for this string property
      stringDiffs.push(createStringDiff(`/${key}`, originalValue, revisionValue));

      // Set both values to the same to prevent standard diff from including this property
      (originalCopy as any)[key] = "PLACEHOLDER_FOR_DIFF";
      (revisionCopy as any)[key] = "PLACEHOLDER_FOR_DIFF";
    }
  }

  // Create a standard diff for non-message and non-long-string changes
  const standardDiff = compare(originalCopy, revisionCopy);

  // Special handling for message operations
  let messageDiff: Operation[] = [];

  if (
    Array.isArray(original.messages) &&
    Array.isArray(revision.messages) &&
    JSON.stringify(original.messages) !== JSON.stringify(revision.messages)
  ) {
    // Case 1: Messages were cleared
    if (revision.messages.length === 0 && original.messages.length > 0) {
      messageDiff = [
        { op: "replace", path: "/messages", value: [] },
      ];
    } // Case 2: A new message was added
    else if (revision.messages.length === original.messages.length + 1) {
      // Verify all previous messages are unchanged
      let allPreviousUnchanged = true;
      for (let i = 0; i < original.messages.length; i++) {
        if (JSON.stringify(original.messages[i]) !== JSON.stringify(revision.messages[i])) {
          allPreviousUnchanged = false;
          break;
        }
      }

      if (allPreviousUnchanged) {
        const newMessage = revision.messages[revision.messages.length - 1];
        messageDiff = [
          { op: "add", path: "/messages/-", value: newMessage },
        ];
      }
    } // Case 3: Last message was updated (likely a chunk was added)
    else if (
      revision.messages.length === original.messages.length &&
      revision.messages.length > 0
    ) {
      // Check if only the last message changed
      let onlyLastChanged = true;
      for (let i = 0; i < original.messages.length - 1; i++) {
        if (JSON.stringify(original.messages[i]) !== JSON.stringify(revision.messages[i])) {
          onlyLastChanged = false;
          break;
        }
      }

      if (onlyLastChanged) {
        const lastOriginalIndex = original.messages.length - 1;
        const lastOriginal = original.messages[lastOriginalIndex];
        const lastRevision = revision.messages[lastOriginalIndex];

        if (
          lastOriginal.id === lastRevision.id &&
          lastOriginal.role === lastRevision.role &&
          lastOriginal.content !== lastRevision.content
        ) {
          // If it's just appending to the content (common for streaming)
          if (
            typeof lastOriginal.content === "string" &&
            typeof lastRevision.content === "string" &&
            lastRevision.content.startsWith(lastOriginal.content)
          ) {
            const appendedContent = lastRevision.content.substring(lastOriginal.content.length);

            // If the appended content is small, use a specialized patch
            if (appendedContent.length < lastOriginal.content.length) {
              messageDiff = [
                {
                  op: "test",
                  path: `/messages/${lastOriginalIndex}/id`,
                  value: lastOriginal.id,
                },
                {
                  op: "test",
                  path: `/messages/${lastOriginalIndex}/role`,
                  value: lastOriginal.role,
                },
                {
                  op: "add",
                  path: `/messages/${lastOriginalIndex}/appendContent`,
                  value: appendedContent,
                },
              ];
            } else {
              // For larger content, replace the whole content
              messageDiff = [
                {
                  op: "replace",
                  path: `/messages/${lastOriginalIndex}/content`,
                  value: lastRevision.content,
                },
              ];
            }
          } else {
            // Otherwise just replace the whole message content
            messageDiff = [
              {
                op: "replace",
                path: `/messages/${lastOriginalIndex}/content`,
                value: lastRevision.content,
              },
            ];
          }
        } else {
          // If other properties changed, replace the whole message
          messageDiff = [
            {
              op: "replace",
              path: `/messages/${lastOriginalIndex}`,
              value: lastRevision,
            },
          ];
        }
      }
    }
  }

  // If we couldn't optimize message operations, use standard diff for messages
  if (
    messageDiff.length === 0 &&
    JSON.stringify(original.messages) !== JSON.stringify(revision.messages)
  ) {
    const messageOnlyDiff = compare(
      { messages: original.messages },
      { messages: revision.messages },
    );
    messageDiff = messageOnlyDiff;
  }

  // Combine standard diff with message diff and string diffs
  return [...standardDiff, ...messageDiff, ...stringDiffs];
}

/**
 * Applies a diff to a code session
 * Handles optimized message operations and string diffs
 */
export function applyDiff(sess: ICodeSession, patch: ICodeSessionDiff): ICodeSession {
  try {
    // Create a copy of the session to work with
    const sessionCopy = JSON.parse(JSON.stringify(sess)) as ICodeSession;
    const standardOperations: Operation[] = [];

    // Process all operations
    for (const op of patch) {
      // Handle string diff operations
      if (op.op === "replace" && (op as StringDiffOperation)._diff) {
        try {
          const path = op.path;
          const pathParts = path.split("/").filter(p => p !== "");

          // Navigate to the target object
          let target = sessionCopy;
          for (let i = 0; i < pathParts.length - 1; i++) {
            target = (target as any)[pathParts[i]];
          }

          // Get the property name
          const propName = pathParts[pathParts.length - 1];

          // Get the current value
          const currentValue = (target as any)[propName];

          if (typeof currentValue === "string") {
            // Apply the character diff using our helper function
            const diff = (op as StringDiffOperation)._diff!;
            let newValue = applyCharDiff(currentValue, diff);

            // If our diff application failed, fall back to the full value
            if (newValue === currentValue || newValue === "") {
              newValue = op.value;
            }

            (target as any)[propName] = newValue;
          } else {
            // If not a string, fall back to standard replace
            (target as any)[propName] = op.value;
          }
        } catch (err) {
          console.warn(`Error processing string diff operation: ${err}`);
          // Fall back to standard replace
          standardOperations.push({
            op: "replace",
            path: op.path,
            value: op.value,
          });
        }
      } // Handle custom appendContent operation
      else if (op.op === "add" && op.path.includes("/appendContent")) {
        try {
          const messagePath = op.path.replace("/appendContent", "");
          const messageIndex = parseInt(messagePath.split("/")[2], 10);

          if (
            Array.isArray(sessionCopy.messages) &&
            messageIndex >= 0 &&
            messageIndex < sessionCopy.messages.length &&
            typeof sessionCopy.messages[messageIndex].content === "string" &&
            typeof op.value === "string"
          ) {
            // Append the content to the existing message
            sessionCopy.messages[messageIndex].content += op.value;
          } else {
            // Skip invalid appendContent operations
            console.warn(`Invalid appendContent operation: ${JSON.stringify(op)}`);
          }
        } catch (err) {
          // Skip any errors in custom operations
          console.warn(`Error processing appendContent operation: ${err}`);
        }
      } else {
        // Add standard operations to be processed by fast-json-patch
        standardOperations.push(op);
      }
    }

    // Apply remaining standard operations if any
    if (standardOperations.length > 0) {
      try {
        return applyPatch(sessionCopy, standardOperations).newDocument;
      } catch (err) {
        console.error("Error applying standard operations:", err);
        // Return a clean copy of the original session without any partial changes
        return JSON.parse(JSON.stringify(sess));
      }
    }

    return sessionCopy;
  } catch (err) {
    console.error("Error applying diff:", err);
    return JSON.parse(JSON.stringify(sess));
  }
}

/**
 * Applies a character diff to a string
 * @param original The original string
 * @param changes The character changes to apply
 * @returns The modified string
 */
function applyCharDiff(original: string, changes: Change[]): string {
  // For very large strings, it's more reliable to just use the full value
  // from the diff operation rather than trying to apply the changes
  if (original.length > 10000) {
    // Find the 'added' change that contains the full modified text
    const fullTextChange = changes.find(c => c.added && c.value.length > original.length / 2);
    if (fullTextChange) {
      return fullTextChange.value;
    }
  }

  let result = "";
  let currentPos = 0;

  for (const change of changes) {
    if (change.added) {
      // Add new content
      result += change.value;
    } else if (!change.removed) {
      // Keep unchanged content
      result += change.value;
      currentPos += change.value.length;
    }
    // Skip removed content
  }

  return result;
}

/**
 * Helper function to find the correct position to insert added content
 * Uses surrounding context to determine the position
 */
function findInsertPosition(text: string, change: Change): number {
  // If this is the first change, insert at the beginning
  if (!change.value) return 0;

  // Look for context before this change
  let contextBefore = "";
  let i = 0;

  // Try to find some context before this change
  while (contextBefore.length < 10 && i < text.length) {
    contextBefore = text.substring(text.length - i - 1, text.length);
    i++;
  }

  // If we have context, try to find it in the text
  if (contextBefore.length > 0) {
    const pos = text.lastIndexOf(contextBefore);
    if (pos !== -1) {
      return pos + contextBefore.length;
    }
  }

  // Default to end of string if we can't find a better position
  return text.length;
}
