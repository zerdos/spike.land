import { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

// // Custom error class for better error handling
class CodeModWorkflowError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "CodeModWorkflowError";
  }
}

export const setupAndRun = async (
  prompt: string,
  cSess: ICode,
  options = { returnModifiedCode: false },
) => {
  if (!prompt || typeof prompt !== "string") {
    throw new CodeModWorkflowError("Invalid prompt", { prompt });
  }

  const codeSpace = await cSess.getCodeSpace();
  const channel = new BroadcastChannel(`codeSpace-${codeSpace}-workflow`);

  console.log(`Setting up workflow for code space: ${codeSpace}`);

  const example = async (
    prompt: string,
    cSess: ICode,
    channel: BroadcastChannel,
    options = { returnModifiedCode: false },
  ) => {
    try {
      // Get the code session
      const { createWorkflowWithStringReplace } = await import(
        "@/workers/chat-utils-langchain.worker"
      );
      const session = await cSess.getSession();
      const codeSpace = cSess.getCodeSpace();

      // Generate document hash for code integrity verification
      const initialCode = session.code;
      const initialDocumentHash = md5(initialCode);

      console.log("Starting workflow with code hash:", initialDocumentHash);

      // Create the workflow with initial state and pass returnModifiedCode in the initial state
      // This will be available in the workflow's state and can be used by the code modification tool
      const workflow = await createWorkflowWithStringReplace({
        code: initialCode,
        codeSpace: codeSpace,
        origin: location.origin,
        lastError: "",
        isStreaming: false,
        messages: [], // We'll create the messages properly before invoking
        documentHash: initialDocumentHash,
        // Add returnModifiedCode to the initial state so it can be accessed by the workflow
        returnModifiedCode: options.returnModifiedCode,
      });

      // The workflow will create the system message with code and document hash
      // and add the human message with the user's request
      const result = await workflow.invoke(prompt);

      // Verify the workflow executed successfully
      if (!result) {
        throw new CodeModWorkflowError("Workflow execution failed", {
          prompt,
          initialDocumentHash,
          returnModifiedCode: options.returnModifiedCode,
        });
      }

      // Verify final code integrity
      if (result.code !== initialCode) {
        const finalDocumentHash = result.documentHash || md5(result.code);
        const actualHash = md5(result.code);

        if (finalDocumentHash !== actualHash) {
          throw new CodeModWorkflowError("Code integrity verification failed", {
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
      if (error instanceof CodeModWorkflowError) {
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

  try {
    // Pass the returnModifiedCode option to the example function
    return await example(prompt, cSess, channel, options);
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
// With options:
// setupAndRun("Add error handling to this function", codeSession, { returnModifiedCode: true }).catch(console.error);
