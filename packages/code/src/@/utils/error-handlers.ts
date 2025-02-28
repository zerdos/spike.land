/**
 * Custom error class for workflow-related errors
 */
export class WorkflowError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "WorkflowError";
  }
}

/**
 * Handle workflow errors with detailed logging and context
 */
export function handleWorkflowError(error: unknown): never {
  if (error instanceof WorkflowError) {
    console.error("Workflow Error:", error.message, error.context);

    // Add more helpful context for specific error types
    if (error.message.includes("Code integrity")) {
      console.error("Code integrity errors may indicate version conflicts. Check document hashes.");
    } else if (error.message.includes("failed to compile")) {
      console.error("Compilation errors can be fixed with a new modification or by rolling back.");
    }

    throw error;
  }

  console.error("Unexpected Error:", error);
  throw new WorkflowError("Unexpected workflow error", {
    originalError: error,
  });
}

/**
 * Creates a workflow error with code integrity context
 */
export function createCodeIntegrityError(message: string, expectedHash: string, actualHash: string, codeLength: number): WorkflowError {
  return new WorkflowError(`Code integrity error: ${message}`, {
    expectedHash,
    actualHash,
    codeLength,
  });
}

/**
 * Creates a workflow error with compilation context
 */
export function createCompilationError(error: string, documentHash?: string, modifiedCodeHash?: string): WorkflowError {
  return new WorkflowError("Compilation failed", {
    error,
    originalHash: documentHash,
    modifiedHash: modifiedCodeHash,
  });
}
