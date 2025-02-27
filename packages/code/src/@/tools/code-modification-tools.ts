import { updateSearchReplace } from "@/lib/chat-utils";
import { ICode } from "@/lib/interfaces";

import { md5 } from "@/lib/md5";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const BLOCK_REGEX = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;

function parseBlocks(instructions: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  let match;
  
  while ((match = BLOCK_REGEX.exec(instructions)) !== null) {
    blocks.push({
      search: match[1].trimEnd(),    // Preserve leading whitespace
      replace: match[2],
      original: match[0]
    });
  }
  
  return blocks;
}

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


function applyReplacements(code: string, blocks: ParsedBlock[]): string {
  const lines = code.split('\n');
  let output: string[] = [];
  let currentLine = 0;

  for (const block of blocks) {
    const searchLines = block.search.split('\n');
    const searchLength = searchLines.length;
    let matchIndex = -1;

    // Find the block in the current code
    while (currentLine < lines.length) {
      if (lines[currentLine] === searchLines[0]) {
        let match = true;
        for (let i = 1; i < searchLength; i++) {
          if (lines[currentLine + i] !== searchLines[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          matchIndex = currentLine;
          break;
        }
      }
      currentLine++;
    }

    if (matchIndex === -1) {
      throw new Error(`Search block not found at position ${currentLine}`);
    }

    // Replace the found block
    output = output.concat(lines.slice(0, matchIndex));
    output.push(...block.replace.split('\n'));
    currentLine = matchIndex + searchLength;
  }

  // Add remaining lines after last replacement
  return output.concat(lines.slice(currentLine)).join('\n');
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
      const blocks = parseBlocks(instructions);
      if (blocks.length === 0) {
        return createErrorResponse(currentCode, "No valid blocks found");
      }

      const modifiedCodeA = applyReplacements(currentCode, blocks);
      const modifiedCodeB = updateSearchReplace(instructions, currentCode);

      const modifiedCode = modifiedCodeA === modifiedCodeB ? modifiedCodeA : modifiedCodeB;

      if (modifiedCodeA !== modifiedCodeB) {
        console.warn("Code modification A+B results differ between methods",{
          originalCode: currentCode,
          instructions,
          blocks,
          modifiedCodeA,
          modifiedCodeB
        });
      }

      
      if (modifiedCode === currentCode) {
        return createErrorResponse(currentCode, "No changes detected");
      }
      // Validate instructions
      if (!instructions || instructions.trim().length === 0) {
        return createErrorResponse(
          currentCode,
          "Instructions required - provide search/replace blocks",
        );
      }



      if (modifiedCode === currentCode) {
        return createErrorResponse(
          currentCode,
          "No changes made to the code. Check the search content and ensure it matches exactly.",
        );
      }


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
<<<<<<< SEARCH
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
        "default: false. Set to true to return the modified code in the response. If false, only the documentHash will be returned to save tokens.",
      ),
    }),
  },
);
