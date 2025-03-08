import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { SEARCH_REPLACE_MARKERS } from "@/lib/chat-utils";
import { FileChangeManager } from "./utils/file-change-manager";
import type { CodeModification } from "../chat-langchain";

// Logger function for consistent logging format
function log(
  message: string,
  level: "info" | "warn" | "error" = "info",
  data?: Record<string, unknown>,
): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[enhanced-replace-in-file][${timestamp}] ${message}`;

  // Use a more distinctive prefix for easier spotting in console
  console[level](`🔄 ${logMessage}`, data || "");

  // Also log to console.debug which might be filtered differently
  console.debug(`DEBUG: ${logMessage}`, data || "");
}

/**
 * Creates an error response with consistent format
 */
function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  additionalProps: Record<string, unknown> = {},
): CodeModification {
  log(errorMessage, "error", additionalProps);
  return {
    code: currentCode,
    hash: md5(currentCode),
    error: errorMessage,
    ...additionalProps,
  };
}

/**
 * Validates the diff string format
 */
function validateDiff(diff: string): boolean {
  if (!diff || typeof diff !== "string") {
    return false;
  }

  const regex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
  return regex.test(diff);
}

/**
 * Creates an enhanced replace-in-file tool with a provided code session
 * This version uses the FileChangeManager for improved hash management,
 * smarter SEARCH/REPLACE blocks, atomic change batching, and error recovery
 * 
 * @param cSess The code session to use for file operations
 * @returns A tool for replacing content in files with enhanced capabilities
 */
export const getEnhancedReplaceInFileTool = (cSess: ICode) => {
  // Create a FileChangeManager instance
  const fileChangeManager = new FileChangeManager(cSess);
  
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
      console.log("🔄 enhancedReplaceInFileTool", { path, hash: hash.substring(0, 8) });

      log(`Starting enhanced replace operation for file: ${path}`, "info", { hash: hash.substring(0, 8) });

      // Input validation
      if (!path || typeof path !== "string") {
        return createErrorResponse("", "Invalid file path provided", { path });
      }

      if (!hash || typeof hash !== "string") {
        return createErrorResponse("", "Invalid hash provided", { hash });
      }

      if (!validateDiff(diff)) {
        return createErrorResponse(
          "",
          "Invalid diff format. Must contain valid SEARCH/REPLACE blocks",
          { diffLength: diff?.length },
        );
      }

      // Use the provided code session
      if (!cSess) {
        return createErrorResponse("", "Code session not provided", {});
      }

      try {
        // Get current code from the file
        log("Retrieving current file content");
        const currentCode = await cSess.getCode();

        if (!currentCode) {
          return createErrorResponse("", "Failed to retrieve file content or file is empty");
        }

        // Submit the change using FileChangeManager
        const result = await fileChangeManager.submitChange(path, hash, diff);
        
        if (!result.success) {
          // If the error is due to hash mismatch but we have a new hash, return it
          if (result.hash && result.message.includes("Document has been modified")) {
            return {
              code: currentCode,
              hash: result.hash,
              error: result.message,
            };
          }
          
          return createErrorResponse(currentCode, result.message);
        }
        
        // Add a longer delay before adding the message chunk to ensure code changes are fully processed
        console.log(
          "⏳ Waiting for code changes to be fully processed before adding message chunk...",
        );
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
          // Add the message chunk
          await cSess.addMessageChunk(diff);
          console.log("✅ Successfully added message chunk");
        } catch (chunkError) {
          console.error("❌ Error adding message chunk:", chunkError);
          // Continue execution even if adding message chunk fails
        }

        // Return success response with minimal information to save tokens
        return {
          // Don't return the full code to save tokens
          code: "", // Empty string instead of full code
          hash: result.hash || md5(await cSess.getCode()),
          error: result.message,
        };
      } catch (error) {
        log("Unexpected error occurred", "error", {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        });

        let currentCode = "";
        try {
          currentCode = await cSess.getCode();
        } catch (getCodeError) {
          log("Failed to retrieve code after error", "error", {
            error: getCodeError instanceof Error ? getCodeError.message : "Unknown error",
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
   * To delete code: Use empty REPLACE section`,
      schema: z.object({
        path: z.string().describe("The path of the file to modify"),
        hash: z.string().describe("The hash of the file to modify for version control"),
        diff: z.string().describe(`One or more SEARCH/REPLACE blocks following this exact format:
\`\`\`
${SEARCH_REPLACE_MARKERS.SEARCH_START}
[exact content to find]
${SEARCH_REPLACE_MARKERS.SEPARATOR}
[new content to replace with]
${SEARCH_REPLACE_MARKERS.REPLACE_END}
\`\`\`
`),
      }),
    },
  );
};
