import type { ICodeSession } from "@/lib/interfaces";
import { diffChars, diffLines } from "diff";
import type { Change } from "diff";
import { applyPatch, compare } from "fast-json-patch";
import type { Operation, ReplaceOperation } from "fast-json-patch";
// Import the ICodeSessionDiff type from json-diff to ensure consistency

// Extend the Operation type to include our custom diff property
interface StringDiffOperation extends ReplaceOperation<string> {
  _diff?: Change[];
}

// Define our own array type that will be compatible with Delta
export type ICodeSessionDiff = Array<Operation | StringDiffOperation>;

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

  // Special case 1: Check if we're just appending to the end of a large string
  // This is a common case that can be optimized very efficiently
  if (oldStr.length > STRING_DIFF_THRESHOLD && newStr.startsWith(oldStr)) {
    const appendedContent = newStr.substring(oldStr.length);
    // If the appended content is small (less than 100 chars), create a specialized operation
    if (appendedContent.length < 100) {
      // For large strings, don't include the full string in the diff
      // Instead, create a special operation that only includes the appended content
      if (oldStr.length > LARGE_STRING_THRESHOLD) {
        // Create a minimal diff with just the appended content
        // We'll use a special marker in the value to indicate this is an append operation
        return {
          op: "replace",
          path,
          value: `__APPEND__${appendedContent}`,
          _diff: [
            { value: "", count: 0 }, // Empty unchanged content
            { value: appendedContent, added: true, count: appendedContent.length },
          ],
        } as StringDiffOperation;
      } else {
        // For moderately sized strings, use a regular diff
        const minimalDiff = [
          { value: oldStr, count: oldStr.length },
          { value: appendedContent, added: true, count: appendedContent.length },
        ];

        return {
          op: "replace",
          path,
          value: newStr,
          _diff: minimalDiff,
        } as StringDiffOperation;
      }
    }
  }

  // Special case 2: Check if we're inserting a small amount of content in the middle of a large string
  if (oldStr.length > LARGE_STRING_THRESHOLD && newStr.length > LARGE_STRING_THRESHOLD) {
    // Check if the change is small (less than 100 chars)
    const changeSize = Math.abs(newStr.length - oldStr.length);
    if (changeSize < 100) {
      // Try to find where the insertion happened
      let prefixLength = 0;
      while (
        prefixLength < oldStr.length &&
        prefixLength < newStr.length &&
        oldStr[prefixLength] === newStr[prefixLength]
      ) {
        prefixLength++;
      }

      // If we found a common prefix
      if (prefixLength > 0) {
        // Check if the rest of the string after the insertion is the same
        const oldSuffix = oldStr.substring(prefixLength);
        const newMiddle = newStr.substring(prefixLength);

        if (newMiddle.endsWith(oldSuffix)) {
          // We found an insertion in the middle
          const insertedContent = newMiddle.substring(0, newMiddle.length - oldSuffix.length);

          // Create a specialized operation for insertion
          // For large strings, don't include the full string in the diff
          // Instead, create a special operation that only includes the insertion position and content
          if (oldStr.length > LARGE_STRING_THRESHOLD) {
            return {
              op: "replace",
              path,
              value: `__INSERT__${prefixLength}__${insertedContent}`,
              _diff: [
                { value: "", count: 0 }, // Empty unchanged content
                { value: insertedContent, added: true, count: insertedContent.length },
              ],
            } as StringDiffOperation;
          } else {
            // For moderately sized strings, include more context
            return {
              op: "replace",
              path,
              value: `__INSERT__${prefixLength}__${insertedContent}`,
              _diff: [
                { value: oldStr.substring(0, prefixLength), count: prefixLength },
                { value: insertedContent, added: true, count: insertedContent.length },
                { value: oldSuffix, count: oldSuffix.length },
              ],
            } as StringDiffOperation;
          }
        }
      }
    }
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
    const originalValue = (originalCopy as Record<string, unknown>)[key];
    const revisionValue = (revisionCopy as Record<string, unknown>)[key];

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
      (originalCopy as Record<string, unknown>)[key] = "PLACEHOLDER_FOR_DIFF";
      (revisionCopy as Record<string, unknown>)[key] = "PLACEHOLDER_FOR_DIFF";
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
          let target: Record<string, unknown> = sessionCopy as unknown as Record<string, unknown>;
          for (let i = 0; i < pathParts.length - 1; i++) {
            target = target[pathParts[i]] as Record<string, unknown>;
          }

          // Get the property name
          const propName = pathParts[pathParts.length - 1];

          // Get the current value
          const currentValue = target[propName];

          if (typeof currentValue === "string") {
            // Apply the character diff using our helper function
            const diff = (op as StringDiffOperation)._diff!;
            let newValue = applyCharDiff(currentValue, diff, op.value);

            // If our diff application failed, fall back to the full value
            if (newValue === currentValue || newValue === "") {
              newValue = op.value;
            }

            target[propName] = newValue;
          } else {
            // If not a string, fall back to standard replace
            target[propName] = op.value;
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
function applyCharDiff(original: string, changes: Change[], value?: string): string {
  // Special case 1: Check if this is our optimized append operation
  if (value && typeof value === "string" && value.startsWith("__APPEND__")) {
    // Extract the appended content from the value
    const appendedContent = value.substring("__APPEND__".length);
    // Simply append it to the original string
    return original + appendedContent;
  }

  // Special case 2: Check if this is our optimized insert operation
  if (value && typeof value === "string" && value.startsWith("__INSERT__")) {
    try {
      // Format is __INSERT__[position]__[content]
      const parts = value.split("__");
      if (parts.length >= 3) {
        const position = parseInt(parts[1], 10);
        const insertedContent = parts.slice(2).join("__"); // In case the content itself contains __

        // Insert the content at the specified position
        if (!isNaN(position) && position >= 0 && position <= original.length) {
          return original.substring(0, position) + insertedContent + original.substring(position);
        }
      }
    } catch (err) {
      console.warn("Error parsing insert operation:", err);
      // Fall back to regular diff application
    }
  }

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

  for (const change of changes) {
    if (change.added) {
      // Add new content
      result += change.value;
    } else if (!change.removed) {
      // Keep unchanged content
      result += change.value;
    }
    // Skip removed content
  }

  return result;
}
