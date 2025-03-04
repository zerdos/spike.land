import { ICodeSession, Message } from "@/lib/interfaces";
import { applyPatch, compare, Operation } from "fast-json-patch";

export interface ICodeSessionDiff extends Array<Operation> {}

/**
 * Creates an optimized diff between two code sessions
 * Specifically optimizes for message operations to reduce patch size
 */
export function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff {
  // Create a standard diff for non-message changes
  const standardDiff = compare(
    { ...original, messages: [] },
    { ...revision, messages: [] }
  );
  
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
        { op: "replace", path: "/messages", value: [] }
      ];
    }
    
    // Case 2: A new message was added
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
          { op: "add", path: "/messages/-", value: newMessage }
        ];
      }
    }
    
    // Case 3: Last message was updated (likely a chunk was added)
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
            typeof lastOriginal.content === 'string' &&
            typeof lastRevision.content === 'string' &&
            lastRevision.content.startsWith(lastOriginal.content)
          ) {
            const appendedContent = lastRevision.content.substring(lastOriginal.content.length);
            
            // If the appended content is small, use a specialized patch
            if (appendedContent.length < lastOriginal.content.length) {
              messageDiff = [
                { 
                  op: "test", 
                  path: `/messages/${lastOriginalIndex}/id`, 
                  value: lastOriginal.id 
                },
                { 
                  op: "test", 
                  path: `/messages/${lastOriginalIndex}/role`, 
                  value: lastOriginal.role 
                },
                { 
                  op: "add", 
                  path: `/messages/${lastOriginalIndex}/appendContent`, 
                  value: appendedContent 
                }
              ];
            } else {
              // For larger content, replace the whole content
              messageDiff = [
                { 
                  op: "replace", 
                  path: `/messages/${lastOriginalIndex}/content`, 
                  value: lastRevision.content 
                }
              ];
            }
          } else {
            // Otherwise just replace the whole message content
            messageDiff = [
              { 
                op: "replace", 
                path: `/messages/${lastOriginalIndex}/content`, 
                value: lastRevision.content 
              }
            ];
          }
        } else {
          // If other properties changed, replace the whole message
          messageDiff = [
            { 
              op: "replace", 
              path: `/messages/${lastOriginalIndex}`, 
              value: lastRevision 
            }
          ];
        }
      }
    }
  }
  
  // If we couldn't optimize message operations, use standard diff for messages
  if (messageDiff.length === 0 && 
      JSON.stringify(original.messages) !== JSON.stringify(revision.messages)) {
    const messageOnlyDiff = compare(
      { messages: original.messages },
      { messages: revision.messages }
    );
    messageDiff = messageOnlyDiff;
  }
  
  // Combine standard diff with message diff
  return [...standardDiff, ...messageDiff];
}

/**
 * Applies a diff to a code session
 * Handles optimized message operations
 */
export function applyDiff(
  sess: ICodeSession,
  patch: ICodeSessionDiff,
): ICodeSession {
  // Create a copy of the session to work with
  const sessionCopy = JSON.parse(JSON.stringify(sess)) as ICodeSession;
  
  try {
    // Process custom operations first
    const standardOperations: Operation[] = [];
    
    for (const op of patch) {
      // Handle custom appendContent operation
      if (op.op === "add" && op.path.includes("/appendContent")) {
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
    
    // Apply remaining standard operations
    if (standardOperations.length > 0) {
      return applyPatch(sessionCopy, standardOperations).newDocument;
    }
  } catch (err) {
    console.error("Error applying diff:", err);
    // Return the original session if there's an error
  }
  
  return sessionCopy;
}
