import { SEARCH_REPLACE_MARKERS, updateSearchReplace } from "@/lib/chat-utils";
import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import type { CodeModification } from "../chat-langchain";

// Logger function for consistent logging format
function log(
  message: string,
  level: "info" | "warn" | "error" = "info",
  data?: Record<string, unknown>,
): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[replace-in-file][${timestamp}] ${message}`;

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
 * Creates a replace-in-file tool with a provided code session
 * @param cSess The code session to use for file operations
 * @returns A tool for replacing content in files
 */
export const getReplaceInFileTool = (cSess: ICode) =>
  tool(
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
      console.warn("🔄 replaceInFileTool", { path, hash, diff });

      log(`Starting replace operation for file: ${path}`, "info", {
        hash: hash.substring(0, 8),
      });

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
          return createErrorResponse(
            "",
            "Failed to retrieve file content or file is empty",
          );
        }

        // Verify document hash to ensure code integrity
        const currentHash = md5(currentCode);
        log("Verifying file hash integrity");

        if (hash !== currentHash) {
          return createErrorResponse(
            currentCode,
            "Document has been modified since last hash. Please try again with the latest version.",
            {
              currentHash,
              providedHash: hash,
            },
          );
        }

        // Apply the search/replace operations
        log("Applying search/replace operations");
        let modifiedCode = updateSearchReplace(diff, currentCode);

        // If no changes were made, return an error with more detailed information
        if (modifiedCode === currentCode) {
          console.warn("replaceInFileTool - No changes were made to the file");
          console.debug("replaceInFileTool - Diff:", diff);

          // Try to extract the search part for additional debugging
          const searchMatch = diff.match(/<<<<<<< SEARCH\n([\s\S]*?)\n=======/);
          if (searchMatch && searchMatch[1]) {
            const searchPart = searchMatch[1];
            console.debug(
              "replaceInFileTool - Search part length:",
              searchPart.length,
            );
            console.debug(
              "replaceInFileTool - Search part:",
              JSON.stringify(
                searchPart.substring(0, 100) +
                  (searchPart.length > 100 ? "..." : ""),
              ),
            );

            // Check if the search part exists in the current code (exact match)
            const exactMatch = currentCode.includes(searchPart);
            console.debug("replaceInFileTool - Exact match found:", exactMatch);

            // Check if the search part exists in the current code (ignoring whitespace)
            const codeNoWS = currentCode.replace(/\s+/g, "");
            const searchNoWS = searchPart.replace(/\s+/g, "");
            const flexibleMatch = codeNoWS.includes(searchNoWS);
            console.debug(
              "replaceInFileTool - Match ignoring whitespace:",
              flexibleMatch,
            );

            // If there's a flexible match but not an exact match, suggest checking whitespace
            if (flexibleMatch && !exactMatch) {
              return createErrorResponse(
                currentCode,
                `No changes were made to the file. The SEARCH block content was found when ignoring whitespace, but not with exact matching. Check for whitespace, indentation, or line ending differences.`,
              );
            }
          }

          return createErrorResponse(
            currentCode,
            `No changes were made to the file. Please check the SEARCH/REPLACE blocks for exact matching with the file content.`,
          );
        }

        log("Changes detected, updating file");

        // Set the modified code
        console.warn("Modified code:", modifiedCode);

        const success = await cSess.setCode(modifiedCode);

        console.warn("Success:", success);

        if (!success) {
          return createErrorResponse(
            currentCode,
            "Failed to update the file with the modified code.",
          );
        }
        modifiedCode = success as string;

        // Add a longer delay before adding the message chunk to ensure code changes are fully processed
        console.warn(
          "⏳ Waiting for code changes to be fully processed before adding message chunk...",
        );
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Log before adding message chunk
        console.warn(
          "🔍 Before addMessageChunk - Code state:",
          modifiedCode.substring(0, 100) + "...",
        );

        try {
          // Store the current hash before adding message chunk
          const beforeMessageChunkHash = md5(await cSess.getCode());
          console.warn(
            "📊 Hash before addMessageChunk:",
            beforeMessageChunkHash,
          );

          // Add the message chunk
          await cSess.addMessageChunk(diff);
          console.warn("✅ Successfully added message chunk");

          // Verify the code hasn't changed after adding message chunk
          const afterMessageChunkHash = md5(await cSess.getCode());
          console.warn("📊 Hash after addMessageChunk:", afterMessageChunkHash);

          if (beforeMessageChunkHash !== afterMessageChunkHash) {
            console.warn(
              "⚠️ Code hash changed after addMessageChunk! This indicates a potential issue.",
            );
          } else {
            console.warn(
              "✅ Code hash remained the same after addMessageChunk - good!",
            );
          }
        } catch (chunkError) {
          console.error("❌ Error adding message chunk:", chunkError);
          // Continue execution even if adding message chunk fails
        }

        const newHash = md5(modifiedCode);
        log("File successfully updated", "info", {
          oldHash: currentHash.substring(0, 8),
          newHash: newHash.substring(0, 8),
        });

        // Return success response with minimal information to save tokens
        // Include a summary of changes in the error field (which is displayed to the user)
        const bytesChanged = modifiedCode.length - currentCode.length;
        const linesChanged = modifiedCode.split("\n").length -
          currentCode.split("\n").length;

        return {
          // Don't return the full code to save tokens
          code: "", // Empty string instead of full code
          hash: newHash,
          error: `Changes applied successfully: ${
            bytesChanged > 0 ? "+" : ""
          }${bytesChanged} bytes, ${linesChanged > 0 ? "+" : ""}${linesChanged} lines`,
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
      name: "replace_in_file",
      description:
        `Replace sections of content in an existing file using SEARCH/REPLACE blocks that define exact changes to specific parts of the file.
    
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
