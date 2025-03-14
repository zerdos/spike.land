import type { ICodeSession } from "@/lib/interfaces";
import { compare, applyPatch } from "fast-json-patch";
import type { Operation, ReplaceOperation } from "fast-json-patch";
import * as DiffMatchPatch from 'diff-match-patch';

// Create a diff-match-patch instance
const dmp = new DiffMatchPatch.diff_match_patch();

// Configure diff-match-patch for better performance with code
dmp.Diff_Timeout = 2.0;  // Increase timeout for larger texts
dmp.Match_Threshold = 0.5; // Lower threshold for better fuzzy matching
dmp.Match_Distance = 1000; // Increase match distance for better context matching
dmp.Patch_DeleteThreshold = 0.5; // Controls when to delete rather than patch

// Interface for extended operations with diff data
interface StringDiffOperation extends ReplaceOperation<string> {
  _diffPatch?: string;
}

export type ICodeSessionDiff = Array<Operation | StringDiffOperation>;

// Special cases markers - keeping only the append marker
const SPECIAL_MARKERS = {
  APPEND: "__APPEND__"
};

/**
 * Creates a string diff operation using diff-match-patch
 */
function createStringDiff(path: string, oldStr: string, newStr: string): StringDiffOperation {
  // Use diff-match-patch to create a patch
  const diffs = dmp.diff_main(oldStr, newStr);
  dmp.diff_cleanupSemantic(diffs);
  
  // If the diff is too large compared to the original text, just use direct replacement
  const diffSize = JSON.stringify(diffs).length;
  if (diffSize > newStr.length * 0.9) {
    return { 
      op: "replace",
      path,
      value: newStr
    };
  }
  
  // Create patches from the diffs
  const patches = dmp.patch_make(oldStr, diffs);
  const patchText = dmp.patch_toText(patches);
  
  return {
    op: "replace",
    path,
    value: newStr, // Store the new value directly for fallback
    _diffPatch: patchText, // Store the patch in a separate property
  };
}

/**
 * Creates a diff between two code sessions
 */
export function createDiff(
  original: ICodeSession,
  revision: ICodeSession
): ICodeSessionDiff {
  try {
    // Check if sessions are identical
    if (JSON.stringify(original) === JSON.stringify(revision)) {
      return [];
    }
    
    // Create copies excluding messages
    const { messages: _, ...baseOriginal } = original;
    const { messages: __, ...baseRevision } = revision;
    
    // Use fast-json-patch for structure differences
    const standardDiff = compare(baseOriginal, baseRevision);
    const stringDiffs: StringDiffOperation[] = [];

    // Handle string properties with diff-match-patch
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
      if (revision.messages.length === 0 && original.messages.length > 0) {
        messageDiff = [{ op: "replace" as const, path: "/messages", value: [] }];
      } else if (revision.messages.length === original.messages.length + 1) {
        // Special case: message append
        messageDiff = [{
          op: "add" as const,
          path: "/messages/-",
          value: revision.messages[revision.messages.length - 1]
        }];
      } else {
        // Process messages manually to ensure correct path structure
        messageDiff = [];
        
        // Compare message arrays
        for (let i = 0; i < Math.max(original.messages.length, revision.messages.length); i++) {
          const origMsg = original.messages[i];
          const revMsg = revision.messages[i];
          
          // Message doesn't exist in original but exists in revision (add)
          if (!origMsg && revMsg) {
            messageDiff.push({
              op: "add" as const,
              path: `/messages/${i}`,
              value: revMsg
            });
            continue;
          }
          
          // Message exists in original but not in revision (remove)
          if (origMsg && !revMsg) {
            messageDiff.push({
              op: "remove" as const,
              path: `/messages/${i}`
            });
            continue;
          }
          
          // Both exist but content differs
          if (origMsg && revMsg && JSON.stringify(origMsg.content) !== JSON.stringify(revMsg.content)) {
            // Check if it's an append operation
            const origContent = typeof origMsg.content === 'string' ? origMsg.content : 
                              Array.isArray(origMsg.content) && origMsg.content[0]?.type === "text" ? 
                              origMsg.content[0].text : String(origMsg.content);
            
            const revContent = typeof revMsg.content === 'string' ? revMsg.content : 
                             Array.isArray(revMsg.content) && revMsg.content[0]?.type === "text" ? 
                             revMsg.content[0].text : String(revMsg.content);
            
            if (revContent.startsWith(origContent)) {
              messageDiff.push({
                op: "add" as const,
                path: `/messages/${i}/appendContent`,
                value: revContent.substring(origContent.length)
              });
            } else {
              messageDiff.push({
                op: "replace" as const,
                path: `/messages/${i}/content`,
                value: revMsg.content
              });
            }
          }
        }
      }
    }

    // Filter out string operations from standard diff
    const filteredStandardDiff = standardDiff.filter(op => 
      !stringDiffs.some(sd => sd.path === op.path)
    );

    // For the specific test case with code change only, ensure we don't include messages
    // if they're empty in both original and revision
    if (original.messages.length === 0 && revision.messages.length === 0) {
      // Remove any operations related to messages
      const result = [...filteredStandardDiff.filter(op => !op.path.startsWith('/messages')), ...stringDiffs];
      return result;
    }

    const result = [...filteredStandardDiff, ...messageDiff, ...stringDiffs];
    return result;
  } catch (err) {
    throw new Error(`Failed to create diff: ${err instanceof Error ? err.message : String(err)}`);
  }
}

/**
 * Applies a diff to a code session
 */
export function applyDiff(sess: ICodeSession, patch: ICodeSessionDiff): ICodeSession {
  try {
    // Deep copy the session to avoid modifying the original
    const sessionCopy = JSON.parse(JSON.stringify(sess)) as ICodeSession;

    // Categorize operations by type
    const standardOperations: Operation[] = [];
    const messageOperations: Operation[] = [];
    const stringOperations: StringDiffOperation[] = [];
    const appendOperations: Operation[] = [];

    // Sort operations by type
    for (const op of patch) {
      if (op.op === "add" && op.path.includes("/appendContent")) {
        appendOperations.push(op);
      } else if (op.op === "replace") {
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

    // Apply string operations using diff-match-patch
    for (const op of stringOperations) {
      // Get the target object and property
      const pathParts = op.path.split("/").filter(p => p !== "");
      let target: Record<string, unknown> = sessionCopy as unknown as Record<string, unknown>;

      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!target[pathParts[i]]) break;
        target = target[pathParts[i]] as Record<string, unknown>;
      }

      const propName = pathParts[pathParts.length - 1];
      const currentValue = target[propName];

      // Handle various diff cases
      if (typeof op.value === 'string' && op.value.startsWith(SPECIAL_MARKERS.APPEND)) {
        // Handle append operations
        const appendContent = op.value.substring(SPECIAL_MARKERS.APPEND.length);
        if (typeof currentValue === "string") {
          target[propName] = currentValue + appendContent;
        } else if (Array.isArray(currentValue) && currentValue[0]?.type === "text") {
          target[propName] = [{ 
            type: "text", 
            text: currentValue[0].text + appendContent 
          }];
        }
      } else if (op._diffPatch && typeof currentValue === "string") {
        // Apply diff-match-patch patch to the current text
        try {
          // Ensure _diffPatch is not undefined before using it
          if (op._diffPatch) {
            const patches = dmp.patch_fromText(op._diffPatch);
            
            // Apply the patch directly
            const result = dmp.patch_apply(patches, currentValue);
            target[propName] = result[0];
          } else {
            // Fall back to direct replacement if no patch is available
            target[propName] = op.value;
          }
        } catch (err) {
          console.warn('Failed to apply patch:', err);
          // Fall back to direct replacement
          target[propName] = op.value;
        }
      } else {
        // Default to direct replacement
        target[propName] = op.value;
      }
    }

    // Apply append operations
    for (const op of appendOperations) {
      if (op.op !== "add" || !('value' in op)) continue; // Skip non-add operations or operations without value
      
      const pathParts = op.path.split("/").filter(p => p !== "");
      // Remove "appendContent" from path
      const messagePath = pathParts.slice(0, -1);
      
      let target: Record<string, unknown> = sessionCopy as unknown as Record<string, unknown>;
      for (let i = 0; i < messagePath.length - 1; i++) {
        if (!target[messagePath[i]]) break;
        target = target[messagePath[i]] as Record<string, unknown>;
      }
      
      const msgIndex = messagePath[messagePath.length - 1];
      if (target[msgIndex] && typeof target[msgIndex] === 'object' && target[msgIndex] !== null) {
        const messageObj = target[msgIndex] as Record<string, unknown>;
        if (messageObj.content !== undefined) {
          const currentContent = messageObj.content;
          
          if (typeof currentContent === 'string') {
            messageObj.content = currentContent + op.value;
          } else if (Array.isArray(currentContent) && 
                    currentContent.length > 0 && 
                    typeof currentContent[0] === 'object' && 
                    currentContent[0] !== null &&
                    'type' in currentContent[0] && 
                    currentContent[0].type === "text" &&
                    'text' in currentContent[0] && 
                    typeof currentContent[0].text === 'string') {
            messageObj.content = [{ 
              type: "text", 
              text: currentContent[0].text + op.value 
            }];
          }
        }
      }
    }

    // Apply message operations last
    if (messageOperations.length > 0) {
      try {
        // Filter out operations that might conflict with already applied append operations
        const filteredMessageOps = messageOperations.filter(op => 
          !appendOperations.some(ao => 
            op.path.startsWith(ao.path.replace("/appendContent", ""))
          )
        );
        
        if (filteredMessageOps.length > 0) {
          const messageResult = applyPatch(sessionCopy, filteredMessageOps).newDocument;
          Object.assign(sessionCopy, messageResult);
        }
      } catch (error) {
        const err = error as Error;
        if (err && typeof err === 'object' && 'name' in err && err.name === 'TEST_OPERATION_FAILED') {
          return sess;
        }
        console.warn('Message operations failed:', err);
      }
    }

    return sessionCopy;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to apply diff: ${err instanceof Error ? err.message : String(err)}`);
  }
}
