import { getBroadcastChannel } from "@/lib/broadcast-channel";
import { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { createAstWorkflow } from "@/workers/ast-langchain-workflow.worker";
import { HumanMessage } from "@langchain/core/messages";

// Custom error class for better error handling
class ExampleError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ExampleError";
  }
}

/**
 * Example usage of the AST-based code workflow that demonstrates AI code modifications
 * with improved error handling and code integrity verification
 */
const example = async (
  userRequest: string,
  cSess: ICode,
  channel: BroadcastChannel,
) => {
  try {
    // Get the code session
    const session = await cSess.getSession();
    const codeSpace = cSess.getCodeSpace();

    // Generate document hash for code integrity verification
    const initialCode = session.code;
    const hash = md5(initialCode);
    const filePath = `/live/${codeSpace}.tsx`;

    console.log("Starting AST workflow with code hash:", hash);

    // Create the workflow with initial state
    const workflow = await createAstWorkflow({
      code: initialCode,
      codeSpace: codeSpace,
      origin: location.origin,
      lastError: "",
      isStreaming: false,
      messages: [], // We'll create the messages properly before invoking
      hash: hash,
      filePath: filePath,
    });

    // Create system message with code and document hash
    // Insert the code into the system prompt within <code></code> tags

    // Create human message with the user's request
    const humanMessage = new HumanMessage(userRequest);

    // The AI system will:
    // 1. Read the current code and verify its integrity using the document hash
    // 2. Analyze the requirement and current code structure using AST
    // 3. Generate response with code modifications using AST operations
    // 4. Verify the integrity of the modified code
    const initialStateWithMessages = {
      code: initialCode,
      lastError: "",
      isStreaming: false,
      debugLogs: [],
      messages: [],
      hash: hash,
      filePath: filePath,
    };

    // Pass the file path as the second parameter
    const result = await workflow.invoke(userRequest, filePath);

    // Verify final code integrity
    if (result.code !== initialCode) {
      const finalHash = result.hash || md5(result.code);
      const actualHash = md5(result.code);

      if (finalHash !== actualHash) {
        throw new ExampleError("Code integrity verification failed", {
          expectedHash: finalHash,
          actualHash,
        });
      }

      console.log("AST code modification successful with integrity verified", {
        hash: hash,
        finalHash: finalHash,
      });
    }

    // Log the result
    console.log("AST workflow result:", {
      userRequest,
      codeChanged: initialCode !== result.code,
      result,
    });

    // Broadcast the result to the channel if needed
    channel.postMessage({
      type: "ast-workflow-result",
      result,
    });

    return result;
  } catch (error) {
    // Enhanced error handling
    if (error instanceof ExampleError) {
      console.error(`AST Example Error: ${error.message}`, error.context);
    } else {
      console.error("Unexpected error in AST example:", error);
    }

    // Broadcast error to the channel
    channel.postMessage({
      type: "ast-workflow-error",
      error: error instanceof Error ? error.message : String(error),
    });

    throw error;
  }
};

/**
 * Sets up and runs the AST workflow example with proper resource management
 */
export const setupAndRunAst = async (prompt: string, cSess: ICode) => {
  if (!prompt || typeof prompt !== "string") {
    throw new ExampleError("Invalid prompt", { prompt });
  }

  const codeSpace = await cSess.getCodeSpace();
  const channel = getBroadcastChannel(codeSpace);

  console.log(`Setting up AST workflow for code space: ${codeSpace}`);

  try {
    return await example(prompt, cSess, channel);
  } catch (error) {
    console.error("AST setup and run failed:", error);
    throw error;
  } finally {
    // Ensure channel is always closed to prevent resource leaks
    channel.close();
    console.log("AST workflow channel closed");
  }
};

// Example usage:
// setupAndRunAst("Add error handling to this function", codeSession).catch(console.error);
