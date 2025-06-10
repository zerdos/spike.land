/**
 * Error types for better categorization and handling
 */
export enum ErrorType {
  CodeIntegrity = "CODE_INTEGRITY",
  Compilation = "COMPILATION",
  SearchReplace = "SEARCH_REPLACE",
  HashMismatch = "HASH_MISMATCH",
  SchemaValidation = "SCHEMA_VALIDATION",
  ToolExecution = "TOOL_EXECUTION",
  Unexpected = "UNEXPECTED",
}

/**
 * Enhanced custom error class for workflow-related errors
 * with better categorization and recovery suggestions
 */
export class WorkflowError extends Error {
  constructor(
    message: string,
    public readonly errorType: ErrorType = ErrorType.Unexpected,
    public readonly context?: Record<string, unknown>,
    public readonly recoverySuggestion?: string,
  ) {
    super(message);
    this.name = "WorkflowError";
  }

  /**
   * Gets a user-friendly error message with recovery suggestion if available
   */
  getUserFriendlyMessage(): string {
    let message = this.message;

    if (this.recoverySuggestion) {
      message += `\n\nSuggestion: ${this.recoverySuggestion}`;
    }

    return message;
  }
}

/**
 * Handle workflow errors with detailed logging, context, and recovery suggestions
 */
export function handleWorkflowError(error: unknown): WorkflowError {
  if (error instanceof WorkflowError) {
    // Log with appropriate level based on error type
    const logLevel = error.errorType === ErrorType.Unexpected
      ? "error"
      : "warn";

    // Add specific handling based on error type
    switch (error.errorType) {
      case ErrorType.CodeIntegrity:
        console.error(
          "Code integrity validation failed:",
          error.getUserFriendlyMessage(),
        );
        console.error("Context:", JSON.stringify(error.context, null, 2));
        break;

      case ErrorType.Compilation:
        console.error(
          "Compilation errors detected:",
          error.getUserFriendlyMessage(),
        );
        console.error(
          "These can be fixed with a new modification or by rolling back.",
        );
        break;

      case ErrorType.SearchReplace:
        console.warn(
          "Search/Replace pattern failure:",
          error.getUserFriendlyMessage(),
        );
        console.warn(
          "Check for exact whitespace, indentation, and line endings in your patterns.",
        );
        break;

      case ErrorType.HashMismatch:
        console.warn("Hash mismatch detected:", error.getUserFriendlyMessage());
        console.warn(
          "The document may have been modified since the last operation.",
        );
        break;

      case ErrorType.SchemaValidation:
        console.warn(
          "Schema validation error:",
          error.getUserFriendlyMessage(),
        );
        console.warn("Check that your input matches the expected format.");
        break;

      default:
        console[logLevel](
          "Workflow Error:",
          error.getUserFriendlyMessage(),
          error.context,
        );
    }

    throw error;
  }

  // Handle non-WorkflowError errors
  console.error("Unexpected Error:", error);

  if (error instanceof Error) {
    // Create a more detailed workflow error
    return new WorkflowError(
      `Unexpected error: ${error.message}`,
      ErrorType.Unexpected,
      {
        context: error.stack,
        originalError: error,
      },
      "Try simplifying your request or breaking it into smaller steps.",
    );
  }

  // For completely unknown errors
  return new WorkflowError(
    "Unexpected workflow error",
    ErrorType.Unexpected,
    { originalError: error },
    "Try a different approach or simplify your request.",
  );
}

/**
 * Creates a workflow error with enhanced code integrity context
 */
export function createCodeIntegrityError(
  message: string,
  expectedHash: string,
  actualHash: string,
  codeLength: number,
): WorkflowError {
  const hashDiff = expectedHash !== actualHash;
  const recoverySuggestion = hashDiff
    ? "The document has been modified since the last operation. Try again with the current hash."
    : "There may be an issue with the hash calculation. Try refreshing the document.";

  return new WorkflowError(
    `Code integrity error: ${message}`,
    ErrorType.CodeIntegrity,
    {
      expectedHash,
      actualHash,
      hashMismatch: hashDiff,
      codeLength,
      timestamp: new Date().toISOString(),
    },
    recoverySuggestion,
  );
}

/**
 * Creates a workflow error with enhanced compilation context
 */
export function createCompilationError(
  error: string,
  hash?: string,
  modifiedCodeHash?: string,
): WorkflowError {
  // Extract useful information from the error message
  const errorLines = error.split("\n");
  const firstErrorLine = errorLines[0] || "Unknown compilation error";

  // Try to extract line number and error type
  const lineMatch = firstErrorLine.match(/line (\d+)/i);
  const lineNumber = lineMatch && lineMatch[1]
    ? parseInt(lineMatch[1])
    : undefined;

  // Determine error type for better recovery suggestion
  let errorType = "syntax";
  let recoverySuggestion = "Check for syntax errors like missing brackets, semicolons, or typos.";

  if (error.includes("undefined") || error.includes("not defined")) {
    errorType = "reference";
    recoverySuggestion = "Check for undefined variables or missing imports.";
  } else if (error.includes("type") || error.includes("expected")) {
    errorType = "type";
    recoverySuggestion = "Check for type mismatches or incorrect function parameters.";
  }

  return new WorkflowError(
    `Compilation failed: ${firstErrorLine}`,
    ErrorType.Compilation,
    {
      error,
      errorType,
      lineNumber,
      originalHash: hash,
      modifiedHash: modifiedCodeHash,
      timestamp: new Date().toISOString(),
    },
    recoverySuggestion,
  );
}

/**
 * Creates a workflow error for search/replace pattern failures
 */
export function createSearchReplaceError(
  message: string,
  searchPattern: string,
  context?: Record<string, unknown>,
): WorkflowError {
  // Truncate long search patterns for readability
  const truncatedPattern = searchPattern.length > 100
    ? searchPattern.substring(0, 100) + "..."
    : searchPattern;

  // Determine if it's likely a whitespace issue
  const isWhitespaceIssue = searchPattern.includes("\n") ||
    searchPattern.includes("  ") ||
    searchPattern.includes("\t");

  const recoverySuggestion = isWhitespaceIssue
    ? "Check for exact whitespace, indentation, and line endings in your search pattern."
    : "Ensure your search pattern exactly matches the text in the file, including all characters.";

  return new WorkflowError(
    `Search/Replace error: ${message}`,
    ErrorType.SearchReplace,
    {
      searchPattern: truncatedPattern,
      isWhitespaceIssue,
      ...context,
      timestamp: new Date().toISOString(),
    },
    recoverySuggestion,
  );
}

/**
 * Creates a workflow error for hash mismatch issues
 */
export function createHashMismatchError(
  expectedHash: string,
  actualHash: string,
  context?: Record<string, unknown>,
): WorkflowError {
  return new WorkflowError(
    "Hash mismatch! The document has been modified since the last operation.",
    ErrorType.HashMismatch,
    {
      expectedHash,
      actualHash,
      ...context,
      timestamp: new Date().toISOString(),
    },
    "Try again with the current hash value, or refresh the document.",
  );
}

/**
 * Creates a workflow error for schema validation failures
 */
export function createSchemaValidationError(
  message: string,
  schema: string,
  providedValue: unknown,
  context?: Record<string, unknown>,
): WorkflowError {
  return new WorkflowError(
    `Schema validation error: ${message}`,
    ErrorType.SchemaValidation,
    {
      schema,
      providedValue,
      ...context,
      timestamp: new Date().toISOString(),
    },
    "Check that your input matches the expected format and contains all required fields.",
  );
}
