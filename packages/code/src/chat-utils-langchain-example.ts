
import { HumanMessage } from "@langchain/core/messages";
import { ICode } from "@/lib/interfaces";
import { getBroadcastChannel } from "@/lib/broadcast-channel";
import { md5 } from "@/lib/md5";

// // Custom error class for better error handling
class AstWorkflowError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "AstWorkflowError";
  }
}

/**
 * Example usage of the chat workflow that demonstrates AI code modifications
 * with improved error handling and code integrity verification
 */
const example = async (
  prompt: string,
  cSess: ICode,
  channel: BroadcastChannel,
) => {
  try {
    // Get the code session
    const { createWorkflowWithStringReplace } = await import("@/workers/chat-utils-langchain.worker");
    const session = await cSess.getSession();
    const codeSpace = cSess.getCodeSpace();
    
    // Generate document hash for code integrity verification
    const initialCode = session.code;
    const initialDocumentHash = md5(initialCode);
    
    console.log("Starting workflow with code hash:", initialDocumentHash);

   
    // Create the workflow with initial state
    const workflow = await createWorkflowWithStringReplace({
      code: initialCode,
      codeSpace: codeSpace,
      lastError: "",
      isStreaming: false,
      debugLogs: [],
      messages: [], // We'll create the messages properly before invoking
      documentHash: initialDocumentHash,
    });

    // The workflow will create the system message with code and document hash
    // and add the human message with the user's request
    const result = await workflow.invoke(prompt)
    
    // Verify the workflow executed successfully
    if (!result) {
      throw new AstWorkflowError("Workflow execution failed", {
        prompt,
        initialDocumentHash,
      });
    }

    // Verify final code integrity
    if (result.code !== initialCode) {
      const finalDocumentHash = result.documentHash || md5(result.code);
      const actualHash = md5(result.code);
      
      if (finalDocumentHash !== actualHash) {
        throw new AstWorkflowError("Code integrity verification failed", {
          expectedHash: finalDocumentHash,
          actualHash,
        });
      }
      
      console.log("Code modification successful with integrity verified", {
        initialHash: initialDocumentHash,
        finalHash: finalDocumentHash,
      });
    }

    // Log the result
    console.log("Workflow result:", {
      prompt,
      codeChanged: initialCode !== result.code,
      result,
    });

    // Broadcast the result to the channel if needed
    channel.postMessage({
      type: "workflow-result",
      result,
    });

    return result;
  } catch (error) {
    // Enhanced error handling
    if (error instanceof AstWorkflowError) {
      console.error(`Example Error: ${error.message}`, error.context);
    } else {
      console.error("Unexpected error in example:", error);
    }
    
    // Broadcast error to the channel
    channel.postMessage({
      type: "workflow-error",
      error: error instanceof Error ? error.message : String(error),
    });
    
    throw error;
  }
};

/**
 * Sets up and runs the example workflow with proper resource management
 */
export const setupAndRun = async (prompt: string, cSess: ICode) => {
  if (!prompt || typeof prompt !== "string") {
    throw new AstWorkflowError("Invalid prompt", { prompt });
  }

  const codeSpace = await cSess.getCodeSpace();
  const channel = getBroadcastChannel(codeSpace);
  
  console.log(`Setting up workflow for code space: ${codeSpace}`);

  try {
    return await example(prompt, cSess, channel);
  } catch (error) {
    console.error("Setup and run failed:", error);
    throw error;
  } finally {
    // Ensure channel is always closed to prevent resource leaks
    channel.close();
    console.log("Workflow channel closed");
  }
};

// Example usage:
// setupAndRun("Add error handling to this function", codeSession).catch(console.error);
