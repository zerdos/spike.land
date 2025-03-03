import { updateSearchReplace } from "@/lib/chat-utils";
import { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

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
    hash: md5(currentCode),  
    error: errorMessage,
    currentFileContent: currentCode,
    ...additionalProps,
  };
}

/**
 * Parses the diff string to extract SEARCH/REPLACE blocks
 */
function parseDiff(diff: string): { search: string; replace: string }[] {
  const blocks: { search: string; replace: string }[] = [];
  const regex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
  
  let match;
  while ((match = regex.exec(diff)) !== null) {
    blocks.push({
      search: match[1],
      replace: match[2],
    });
  }
  
  return blocks;
}

export const replaceInFileTool = tool(
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
    // Get the code session
    const cSess = (globalThis as unknown as { cSess: ICode }).cSess;
    
    try {
      // Get current code from the file
      const currentCode = await cSess.getCode();
      
      // Verify document hash to ensure code integrity
      const currentHash = md5(currentCode);
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
      
      // Parse the diff to extract SEARCH/REPLACE blocks
      // const blocks = parseDiff(diff);
      
      // if (blocks.length === 0) {
      //   return createErrorResponse(
      //     currentCode,
      //     "No valid SEARCH/REPLACE blocks found in the diff. Please check the format.",
      //   );
      // }
      
      // Apply each SEARCH/REPLACE block sequentially
      let modifiedCode = updateSearchReplace(diff, currentCode);
      // const failedBlocks: number[] = [];
      
      // // for (let i = 0; i < blocks.length; i++) {
      //   const { search, replace } = blocks[i];
        
      //   // Skip empty search patterns
      //   if (!search.trim()) {
      //     failedBlocks.push(i);
      //     continue;
      //   }
        
      //   // Apply the replacement
      //   const beforeReplace = modifiedCode;
      //   modifiedCode = modifiedCode.replace(search, replace);
        
      //   // Check if replacement was successful
      //   if (modifiedCode === beforeReplace && search.trim() !== "") {
      //     failedBlocks.push(i);
      //   }
      // }
      
      // If no changes were made, return an error
      if (modifiedCode === currentCode) {
        return createErrorResponse(
          currentCode,
          `No changes were made to the file. Please check the SEARCH/REPLACE blocks.`,
        );
      }
      
      // Set the modified code
      const success = await cSess.setCode(modifiedCode);
      
      if (!success) {
        return createErrorResponse(
          currentCode,
          "Failed to update the file with the modified code.",
        );
      }
      
      // Return success response
      return {
        hash: md5(modifiedCode),
        code: modifiedCode,
        error: "",
      };
    } catch (error) {
      const currentCode = await cSess.getCode();
      // Handle any unexpected errors
      return createErrorResponse(

         currentCode,
        error instanceof Error ? error.message : "Unknown error in file replacement",
        { stack: error instanceof Error ? error.stack : undefined },
      );
    }
  },
  {
    name: "replace_in_file",
    description: `Replace sections of content in an existing file using SEARCH/REPLACE blocks that define exact changes to specific parts of the file.
    
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
<<<<<<< SEARCH
[exact content to find]
=======
[new content to replace with]
>>>>>>> REPLACE`),
    }),
  },
);
