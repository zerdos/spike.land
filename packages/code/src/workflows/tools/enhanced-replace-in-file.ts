import { SEARCH_REPLACE_MARKERS } from "@/lib/chat-utils";
import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import type { CodeModification } from "../chat-langchain";
import { FileChangeManager } from "./utils/file-change-manager";

// Logger function for consistent logging format
function log(
  message: string,
  level: "info" | "warn" | "error" = "info",
  data?: Record<string, unknown>,
): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[enhanced-replace-in-file][${timestamp}] ${message}`;

  // Use a more distinctive prefix for easier spotting in console
  // Adhere to no-console rule: only use warn and error directly.
  // For 'info' and 'debug' levels, we map them to 'warn' to ensure they are visible
  // during development/debugging without violating the 'no-console' rule (which allows 'warn' and 'error').
  let consoleMethod: "warn" | "error";
  if (level === "error") {
    consoleMethod = "error";
  } else {
    // All other levels (info, warn, debug) will use console.warn
    consoleMethod = "warn";
  }
  // Explicitly use console.warn or console.error to satisfy ESLint
  if (consoleMethod === "error") {
    console.error(`🔄 ${logMessage}`, data || "");
  } else {
    console.warn(`🔄 ${logMessage}`, data || "");
  }
}

/**
 * Creates an error response with consistent format and helpful guidance
 */
function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  additionalProps: Record<string, unknown> = {},
): CodeModification {
  log(errorMessage, "error", additionalProps);

  // Check if the error is related to minor changes or rate limiting
  const isMinorChangeError = errorMessage.includes("minor changes") ||
    errorMessage.includes("trivial") ||
    errorMessage.includes("changes in a short period");

  // Add guidance about stopping unnecessary changes
  const enhancedMessage = isMinorChangeError
    ? `${errorMessage}\n\nIMPORTANT: Only make changes when necessary. If your task is complete, stop making changes.`
    : errorMessage;

  return {
    code: currentCode,
    hash: md5(currentCode),
    error: enhancedMessage,
    ...additionalProps,
  };
}

/**
 * Validates the diff string format and provides detailed error information
 */
function validateDiff(diff: string): { valid: boolean; reason?: string; } {
  if (!diff || typeof diff !== "string") {
    return { valid: false, reason: "Diff is empty or not a string" };
  }

  // Check for basic markers
  if (!diff.includes(SEARCH_REPLACE_MARKERS.SEARCH_START)) {
    return {
      valid: false,
      reason: `Missing '${SEARCH_REPLACE_MARKERS.SEARCH_START}' marker`,
    };
  }

  if (!diff.includes(SEARCH_REPLACE_MARKERS.SEPARATOR)) {
    return {
      valid: false,
      reason: `Missing '${SEARCH_REPLACE_MARKERS.SEPARATOR}' marker`,
    };
  }

  if (!diff.includes(SEARCH_REPLACE_MARKERS.REPLACE_END)) {
    return {
      valid: false,
      reason: `Missing '${SEARCH_REPLACE_MARKERS.REPLACE_END}' marker`,
    };
  }

  // Check for proper sequence and format
  const regex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
  if (!regex.test(diff)) {
    return {
      valid: false,
      reason:
        "Invalid diff format. Ensure each block follows the exact format with newlines after each marker",
    };
  }

  return { valid: true };
}

/**
 * Normalizes the diff string to handle common formatting issues
 */
function normalizeDiff(diff: string): string {
  // Ensure proper newlines after markers
  let normalized = diff
    .replace(/<<<<<<< SEARCH\s*\n/g, "<<<<<<< SEARCH\n")
    .replace(/\n\s*=======\s*\n/g, "\n=======\n")
    .replace(/\n\s*>>>>>>> REPLACE/g, "\n>>>>>>> REPLACE");

  // Fix common whitespace issues in search blocks
  const blocks = normalized.match(
    /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g,
  ) || [];

  for (const block of blocks) {
    const parts = block
      .replace(/<<<<<<< SEARCH\n/, "")
      .replace(/\n>>>>>>> REPLACE/, "")
      .split("\n=======\n");

    if (parts.length === 2) {
      const [search, replace] = parts;
      // Preserve original whitespace in search and replace parts
      const normalizedBlock = `<<<<<<< SEARCH\n${search}\n=======\n${replace}\n>>>>>>> REPLACE`;
      normalized = normalized.replace(block, normalizedBlock);
    }
  }

  return normalized;
}

/**
 * Creates an enhanced replace-in-file tool with a provided code session
 * This version uses the FileChangeManager for improved hash management,
 * smarter SEARCH/REPLACE blocks, atomic change batching, and error recovery
 *
 * @param codeSession The code session to use for file operations
 * @returns A tool for replacing content in files with enhanced capabilities
 */
export const getEnhancedReplaceInFileTool = (codeSession: ICode) => { // Renamed cSess
  // Create a FileChangeManager instance
  const fileChangeManager = new FileChangeManager(codeSession); // Renamed cSess

  return tool(
    async (
      {
        path,
        hash,
        diff,
      }: {
        path: string;
        hash: string;
        diff: string;
      },
    ): Promise<CodeModification> => {
      // Use the local log function for initial logging
      log("enhancedReplaceInFileTool invoked", "warn", { path, hash: hash.substring(0, 8) });

      log(`Starting enhanced replace operation for file: ${path}`, "warn", { // Changed level to warn
        hash: hash.substring(0, 8),
      });

      // Input validation
      if (!path || typeof path !== "string") {
        return createErrorResponse("", "Invalid file path provided", { path });
      }

      if (!hash || typeof hash !== "string") {
        return createErrorResponse("", "Invalid hash provided", { hash });
      }

      // Validate diff format with detailed error information
      const validation = validateDiff(diff);
      if (!validation.valid) {
        return createErrorResponse(
          "",
          `Invalid diff format: ${validation.reason}. Must contain valid SEARCH/REPLACE blocks`,
          {
            diffLength: diff?.length,
            diffSample: diff?.substring(0, 100) +
              (diff?.length > 100 ? "..." : ""),
            reason: validation.reason,
          },
        );
      }

      // Normalize diff to handle common formatting issues
      diff = normalizeDiff(diff);

      // Use the provided code session
      if (!codeSession) { // Renamed cSess
        return createErrorResponse("", "Code session not provided", {});
      }

      try {
        // Get current code from the file
        log("Retrieving current file content");
        const currentCode = await codeSession.getCode(); // Renamed cSess

        if (!currentCode) {
          return createErrorResponse(
            "",
            "Failed to retrieve file content or file is empty",
          );
        }

        // Submit the change using FileChangeManager
        const result = await fileChangeManager.submitChange(path, hash, diff);

        if (!result.success) {
          // If the error is due to hash mismatch but we have a new hash, return it
          if (
            result.hash && result.message.includes("Document has been modified")
          ) {
            return {
              code: currentCode,
              hash: result.hash,
              error: result.message,
            };
          }

          return createErrorResponse(currentCode, result.message);
        }

        // Add a longer delay before adding the message chunk to ensure code changes are fully processed
        log( // Changed console.warn to this._log with appropriate level
          "⏳ Waiting for code changes to be fully processed before adding message chunk...",
          "warn",
        );
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          // Add the message chunk
          await codeSession.addMessageChunk(diff); // Renamed cSess
          log("✅ Successfully added message chunk", "warn"); // Changed console.warn
        } catch (chunkError) {
          console.error("❌ Error adding message chunk:", chunkError); // Kept console.error
          // Continue execution even if adding message chunk fails
        }

        // Check if the message contains warnings about minor changes or rate limiting
        const hasWarnings = result.message.includes("minor changes") ||
          result.message.includes("consecutive minor changes") ||
          result.message.includes("changes in a short period");

        // Return success response with minimal information to save tokens
        // Include a stronger message if warnings were detected
        return {
          // Don't return the full code to save tokens
          code: "", // Empty string instead of full code
          hash: result.hash || md5(await codeSession.getCode()), // Renamed cSess
          error: hasWarnings
            ? `${result.message}\n\nIMPORTANT: Only make changes when necessary. If your task is complete, stop making changes.`
            : result.message,
        };
      } catch (error) {
        log("Unexpected error occurred", "error", {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        });

        let currentCode = "";
        try {
          currentCode = await codeSession.getCode(); // Renamed cSess
        } catch (getCodeError) {
          log("Failed to retrieve code after error", "error", {
            error: getCodeError instanceof Error
              ? getCodeError.message
              : "Unknown error",
          });
        }

        // Handle any unexpected errors
        return createErrorResponse(
          currentCode,
          error instanceof Error
            ? `Error in file replacement: ${error.message}`
            : "Unknown error in file replacement",
          { stack: error instanceof Error ? error.stack : undefined },
        );
      }
    },
    {
      name: "enhanced_replace_in_file",
      description:
        `Enhanced version of replace_in_file with improved hash management, smarter SEARCH/REPLACE blocks, 
atomic change batching, and error recovery.
    
This tool is designed for making targeted changes to specific parts of a file using a diff-like format with SEARCH/REPLACE blocks.

Critical rules:
1. SEARCH content must match the associated file section to find EXACTLY:
   * Match character-for-character including whitespace, indentation, line endings
   * Include all comments, docstrings, etc.
2. SEARCH/REPLACE blocks will ONLY replace the first match occurrence.
   * Include multiple unique SEARCH/REPLACE blocks if you need to make multiple changes.
   * Include *just* enough lines in each SEARCH section to uniquely match each set of lines that need to change.
   * When using multiple SEARCH/REPLACE blocks, list them in the order they appear in the file.
3. Keep SEARCH/REPLACE blocks concise:
   * Break large SEARCH/REPLACE blocks into a series of smaller blocks that each change a small portion of the file.
   * Include just the changing lines, and a few surrounding lines if needed for uniqueness.
   * Do not include long runs of unchanging lines in SEARCH/REPLACE blocks.
   * Each line must be complete. Never truncate lines mid-way through as this can cause matching failures.
4. Special operations:
   * To move code: Use two SEARCH/REPLACE blocks (one to delete from original + one to insert at new location)
   * To delete code: Use empty REPLACE section
   
IMPORTANT: Only make changes when necessary. Avoid making trivial or cosmetic changes that don't meaningfully improve the code.
Multiple minor changes in succession will be rejected to prevent infinite loops. When your task is complete, stop making changes.`,
      schema: z.object({
        path: z.string().describe("The path of the file to modify"),
        hash: z.string().describe(
          "The hash of the file to modify for version control",
        ),
        diff: z.string().describe(
          `One or more SEARCH/REPLACE blocks following this exact format:
\`\`\`
${SEARCH_REPLACE_MARKERS.SEARCH_START}
[exact content to find]
${SEARCH_REPLACE_MARKERS.SEPARATOR}
[new content to replace with]
${SEARCH_REPLACE_MARKERS.REPLACE_END}
\`\`\`
`,
        ),
      }),
    },
  );
};
