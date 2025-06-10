import type { HandleSendMessageProps } from "@/lib/interfaces";
import type { AgentState } from "./chat-langchain";
import { getHashWithCache } from "./code-processing";
import { createIterativeWorkflowManager } from "./iterative-workflow-manager";
import { createWorkflowWithStringReplace, workflowCache } from "./workflow-creator";

/**
 * Handles sending a message to the workflow with iterative improvements and validation
 */
export async function handleSendMessage(
  { prompt, images, cSess: codeSession }: HandleSendMessageProps,
): Promise<AgentState> {
  const codeSpace = codeSession.getCodeSpace();
  const code = await codeSession.getCode();

  // Get or create workflow for this codeSpace
  const workflow = workflowCache[codeSpace] ||
    await createWorkflowWithStringReplace({
      code: code,
      codeSpace: codeSpace,
      origin: location.origin,
      lastError: "",
      isStreaming: false,
      messages: [],
      hash: getHashWithCache(code),
    }, codeSession);

  // Cache the workflow for future use
  workflowCache[codeSpace] = workflow;

  // Create initial state
  const initialState: AgentState = {
    code: code,
    codeSpace: codeSpace,
    origin: location.origin,
    lastError: "",
    isStreaming: false,
    messages: [],
    hash: getHashWithCache(code),
  };

  // Create iterative workflow manager with configuration
  const iterativeManager = createIterativeWorkflowManager({
    maxIterations: 5, // Allow up to 5 attempts to make code runnable
    maxValidationAttempts: 3,
    requireRunnable: true, // Ensure code is runnable before completing
    enableValidation: true, // Enable code validation
    stopOnFirstSuccess: true, // Stop as soon as code is valid
  });

  console.warn("🚀 Starting iterative workflow execution...");

  // Execute workflow with iterative improvements
  const iterationResult = await iterativeManager.executeWithValidation(
    workflow,
    prompt,
    images || [],
    codeSession,
    initialState,
  );

  // Log iteration summary
  console.warn("📊 Iteration Summary:");
  console.warn(`- Success: ${iterationResult.success ? "✅" : "❌"}`);
  console.warn(`- Iterations: ${iterationResult.iterations}`);
  console.warn(`- Validations: ${iterationResult.validationResults.length}`);
  console.warn(`- Errors: ${iterationResult.errors.length}`);

  if (iterationResult.improvements.length > 0) {
    console.warn(`- Improvements made: ${iterationResult.improvements.length}`);
  }

  // Generate and log detailed summary for debugging
  const summary = iterativeManager.generateIterationSummary(iterationResult);
  console.warn("🔍 Detailed Summary:", summary);

  // If iterations failed but we have a final state, add error information
  if (!iterationResult.success && iterationResult.finalState) {
    const errorSummary = iterationResult.errors.join("; ");
    iterationResult.finalState.lastError =
      `Code validation failed after ${iterationResult.iterations} iterations: ${errorSummary}`;

    // Include validation feedback in the state for the UI
    if (iterationResult.validationResults.length > 0) {
      const lastValidation = iterationResult
        .validationResults[iterationResult.validationResults.length - 1];
      if (lastValidation && lastValidation.errors.length > 0) {
        const validationErrors = lastValidation.errors.slice(0, 3).join("; ");
        iterationResult.finalState.lastError += `. Validation errors: ${validationErrors}`;
      }
    }
  }

  // Log final workflow state
  console.warn("Final workflow state:", {
    success: iterationResult.success,
    hasCode: !!iterationResult.finalState.code,
    codeLength: iterationResult.finalState.code?.length || 0,
    hasError: !!iterationResult.finalState.lastError,
    error: iterationResult.finalState.lastError,
  });

  return iterationResult.finalState;
}
