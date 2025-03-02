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
export function handleWorkflowError(error: unknown): WorkflowError {
  if (error instanceof WorkflowError) {
    if (error.message.includes("Code integrity")) {
      console.error("Code integrity validation failed");
      throw error;
    }
    if (error.message.includes("failed to compile")) {
      console.error("Compilation errors can be fixed with a new modification or by rolling back.");
      throw error;
    }
    console.error("Workflow Error:", error.message, error.context);
    throw error;
  }

  console.error("Unexpected Error:", error);
  if (error instanceof Error) {
    throw new WorkflowError(`Unexpected error: ${error.message}`, {
      context: error.stack,
      originalError: error,
    });
  }
  throw new WorkflowError("Unexpected workflow error", { originalError: error });
}

/**
 * Creates a workflow error with code integrity context
 */
export function createCodeIntegrityError(
  message: string,
  expectedHash: string,
  actualHash: string,
  codeLength: number,
): WorkflowError {
  return new WorkflowError(`${message}`, {
    expectedHash,
    actualHash,
    codeLength,
  });
}

/**
 * Creates a workflow error with compilation context
 */
export function createCompilationError(
  error: string,
  documentHash?: string,
  modifiedCodeHash?: string,
): WorkflowError {
  return new WorkflowError("Compilation failed", {
    error,
    originalHash: documentHash,
    modifiedHash: modifiedCodeHash,
  });
}
