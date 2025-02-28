import { updateSearchReplace } from "@/lib/chat-utils";
import { ICode } from "@/lib/interfaces";

import { md5 } from "@/lib/md5";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Constants for search/replace blocks
export const SEARCH = "<<<<<<< SEARCH";
export const REPLACE = ">>>>>>> REPLACE";
export const SEPARATOR = "=======";

/**
 * Parses search/replace blocks from instructions
 * @param instructions The instructions containing search/replace blocks
 * @returns Array of parsed blocks with search and replace content
 */
interface ParsedBlock {
  search: string;
  replace: string;
  original: string;
}


/**
 * Applies a single search/replace block to the code
 * @param code The code to modify
 * @param block The search/replace block to apply
 * @returns The modified code and success status
 */
function applySearchReplaceBlock(code: string, block: ParsedBlock): {
  result: string;
  success: boolean;
  error?: string;
} {
  try {
    // Validate inputs
    if (!code) {
      return {
        result: code,
        success: false,
        error: "Code is empty or undefined",
      };
    }

    if (!block.search || block.search.trim().length === 0) {
      return {
        result: code,
        success: false,
        error: "Search content cannot be empty",
      };
    }

    // More efficient check for existence before replacement
    if (!code.includes(block.search)) {
      // Provide more helpful error message with context
      return {
        result: code,
        success: false,
        error:
          "Search content not found exactly as specified. Check whitespace, indentation, and line endings.",
      };
    }

    // Replace the first occurrence only
    const result = code.replace(block.search, block.replace);

    // Verify the replacement was made
    if (result === code && block.search !== block.replace) {
      return {
        result,
        success: false,
        error: "Replacement failed - no changes made despite search content being found",
      };
    }

    return { result, success: true };
  } catch (error) {
    return {
      result: code,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error applying block",
    };
  }
}

/**
 * Creates an error response with consistent format
 */
function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  additionalProps: Record<string, unknown> = {},
): CodeModification {
  return {
    code: currentCode,
    error: errorMessage,
    currentFileContent: currentCode,
    documentHash: md5(currentCode),
    ...additionalProps,
  };
}

// Optimized code modification tool
export const codeModificationTool = tool(
  async (
    { instructions, documentHash, returnModifiedCode = true }: {
      instructions: string;
      documentHash: string;
      returnModifiedCode?: boolean;
    },
  ): Promise<CodeModification> => {
    const cSess = (globalThis as unknown as {
      cSess: ICode;
    }).cSess;

    // Get current code from the session
    const currentCode = await (globalThis as unknown as {
      cSess: { getCode: () => Promise<string>; };
    }).cSess.getCode();

    // Verify document hash to ensure code integrity
    if (documentHash && typeof documentHash === "string") {
      const currentHash = md5(currentCode);
      if (documentHash !== currentHash) {
        return createErrorResponse(
          currentCode,
          "Document has been modified since last hash. Please try again with the latest version or use a different documentHash to continue from a previous version.",
          {
            currentFileContent: currentCode,
            documentHash: currentHash,
          },
        );
      }
    }

    try {
      // Validate instructions
      if (!instructions || instructions.trim().length === 0) {
        return createErrorResponse(
          currentCode,
          "Instructions required - provide search/replace blocks",
        );
      }


      const modifiedCode = updateSearchReplace(instructions, currentCode)


      if (modifiedCode === currentCode) {
        return createErrorResponse(
          currentCode,
          "No changes made to the code. Check the search content and ensure it matches exactly.",
        );
      }

      // Apply blocks sequentially
      // let modifiedCode = currentCode;
      // let currentBlockIndex = 0;

      // for (const block of blocks) {
      //   currentBlockIndex++;

      //   // Apply the current block
      //   const { result, success, error } = applySearchReplaceBlock(modifiedCode, block);

      //   if (!success) {
      //     // Return detailed error information for debugging
      //     return createErrorResponse(
      //       currentCode,
      //       `Block ${currentBlockIndex}/${blocks.length} failed: ${error}`,
      //       {
      //         searchContent: block.search,
      //         blockNumber: currentBlockIndex,
      //         totalBlocks: blocks.length,
      //         failedBlockContent: block.original,
      //         currentFileContent: modifiedCode, // Return the current state after previous blocks
      //       },
      //     );
      //   }

      //   // Update the code with the successful modification
      //   modifiedCode = result;
      // }

      // If we reach here, all blocks were applied successfully
 
      // Set the modified code in the session
      let error = "";
      let res: string | boolean = false;
      try {
        res = await cSess.setCode(modifiedCode);
      } catch (e) {
        error = e instanceof Error ? e.message : "Unknown error setting code";

        // If compilation fails, inform the AI agent
        return createErrorResponse(
          currentCode,
          `Code modification applied but failed to compile: ${error}. You can fix with another modification or roll back to a previous documentHash.`,
          {
            code: modifiedCode, // Include the modified code even though it failed
            documentHash: md5(currentCode), // Keep the original hash
            modifiedCodeHash: md5(modifiedCode), // Include hash of modified code for reference
          },
        );
      }

      if (res === false) {
        return createErrorResponse(
          currentCode,
          "Failed to set code in the code session. You can try again with a different modification or roll back to a previous documentHash.",
        );
      }

      // Calculate the new document hash
      const newDocumentHash = md5(modifiedCode);

      // Return success response with the new hash
      // If returnModifiedCode is false, don't include the full code to save tokens
      return {
        error,
        documentHash: newDocumentHash,
        code: returnModifiedCode ? modifiedCode : undefined,
      };
    } catch (error) {
      // Handle any unexpected errors
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Unknown error in code modification",
      );
    }
  },
  {
    name: "code_modification",
    description:
      `Optimized code modification tool that efficiently applies search/replace patterns, with special handling for large files. Supports multiple coordinated changes with robust error reporting.

Required format for instructions parameter (can include multiple blocks):
<<<<<<< SEARC
[content to find, whitespaces and indentations can be ignored]
=======
[new content to replace with]
>>>>>>> REPLACE
`,
    schema: z.object({
      instructions: z.string().describe(
        "Search/replace blocks following the required format. Each block must contain <<<<<<< SEARCH, =======, and >>>>>>> REPLACE. SEARCH content must match the file exactly.",
      ),
      documentHash: z.string().describe(
        "MD5 hash of the document being modified. The tool will verify that the document hasn't been modified since the hash was generated.",
      ),
      returnModifiedCode: z.boolean().optional().describe(
        "Whether to return the full modified code in the response. Set to false to save tokens when the full code isn't needed. Defaults to true for backward compatibility.",
      ),
    }),
  },
);
