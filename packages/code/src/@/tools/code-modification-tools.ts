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
 * Parses search/replace blocks from instructions with improved handling
 * for edge cases and better performance for large inputs
 */
function parseSearchReplaceBlocks(instructions: string): ParsedBlock[] {
  // Early return for empty instructions
  if (!instructions || instructions.trim().length === 0) {
    return [];
  }

  const blocks: ParsedBlock[] = [];
  const regex = new RegExp(
    `${SEARCH}([\\s\\S]*?)${SEPARATOR}([\\s\\S]*?)${REPLACE}`,
    "g"
  );
  
  let match;
  while ((match = regex.exec(instructions)) !== null) {
    if (match.length === 3) {
      // Validate that search content is not empty
      const search = match[1];
      if (search.trim().length === 0) {
        continue; // Skip empty search blocks
      }
      
      blocks.push({
        search,
        replace: match[2],
        original: match[0],
      });
    }
  }
  
  return blocks;
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
        error: "Code is empty or undefined"
      };
    }
    
    if (!block.search || block.search.trim().length === 0) {
      return {
        result: code,
        success: false,
        error: "Search content cannot be empty"
      };
    }
    
    // More efficient check for existence before replacement
    if (!code.includes(block.search)) {
      // Provide more helpful error message with context
      return { 
        result: code, 
        success: false,
        error: "Search content not found exactly as specified. Check whitespace, indentation, and line endings."
      };
    }
    
    // Replace the first occurrence only
    const result = code.replace(block.search, block.replace);
    
    // Verify the replacement was made
    if (result === code && block.search !== block.replace) {
      return { 
        result, 
        success: false,
        error: "Replacement failed - no changes made despite search content being found"
      };
    }
    
    return { result, success: true };
  } catch (error) {
    return { 
      result: code, 
      success: false,
      error: error instanceof Error ? error.message : "Unknown error applying block"
    };
  }
}

/**
 * Creates an error response with consistent format
 */
function createErrorResponse(
  currentCode: string, 
  errorMessage: string, 
  additionalProps: Record<string, unknown> = {}
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
    { instructions, documentHash }: { instructions: string; documentHash: string; },
  ): Promise<CodeModification> => {
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
          }
        );
      }
    }

    try {
      // Validate instructions
      if (!instructions || instructions.trim().length === 0) {
        return createErrorResponse(
          currentCode,
          "Instructions required - provide search/replace blocks"
        );
      }

      // Parse search/replace blocks
      const blocks = parseSearchReplaceBlocks(instructions);
      
      // Validate that we have at least one valid block
      if (blocks.length === 0) {
        return createErrorResponse(
          currentCode,
          "No valid search/replace blocks found. Each block must include <<<<<<< SEARCH, =======, and >>>>>>> REPLACE with non-empty search content"
        );
      }

      // Apply blocks sequentially
      let modifiedCode = currentCode;
      let currentBlockIndex = 0;
      
      for (const block of blocks) {
        currentBlockIndex++;
        
        // Apply the current block
        const { result, success, error } = applySearchReplaceBlock(modifiedCode, block);
        
        if (!success) {
          // Return detailed error information for debugging
          return createErrorResponse(
            currentCode,
            `Block ${currentBlockIndex}/${blocks.length} failed: ${error}`,
            {
              searchContent: block.search,
              blockNumber: currentBlockIndex,
              totalBlocks: blocks.length,
              failedBlockContent: block.original,
              currentFileContent: modifiedCode, // Return the current state after previous blocks
            }
          );
        }
        
        // Update the code with the successful modification
        modifiedCode = result;
      }

      // If we reach here, all blocks were applied successfully
      const cSess = (globalThis as unknown as {
        cSess: ICode;
      }).cSess;

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
          }
        );
      }
      
      if (res === false) {
        return createErrorResponse(
          currentCode,
          "Failed to set code in the code session. You can try again with a different modification or roll back to a previous documentHash."
        );
      }

      // Calculate the new document hash
      const newDocumentHash = md5(modifiedCode);
      
      // Return success response with the new hash
      return {
        error,
        documentHash: newDocumentHash,
        code: modifiedCode,
      };
    } catch (error) {
      // Handle any unexpected errors
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Unknown error in code modification"
      );
    }
  },
  {
    name: "code_modification",
    description:
      `Optimized code modification tool that efficiently applies search/replace patterns, with special handling for large files. Supports multiple coordinated changes with robust error reporting.

Required format for instructions parameter (can include multiple blocks):
<<<<<<< SEARCH
[exact content to find]
=======
[new content to replace with]
>>>>>>> REPLACE

Critical rules:
1. SEARCH content must match EXACTLY (character-for-character):
   - Match all whitespace, indentation, and line endings
   - Include all relevant context (imports, full function definitions, etc.)
   - Don't truncate or modify the content you're searching for

2. Common mistakes to avoid:
   - Missing imports or context needed for the changes
   - Not including enough surrounding code for unique matches
   - Incorrect indentation or line endings
   - Partial line matches (always include complete lines)

3. When modification fails:
   - Tool indicates which block failed (e.g. "Block 2/3 failed")
   - Returns current file content and failing block content
   - Compare your SEARCH block carefully with the file content
   - Add necessary imports or context
   - Ensure formatting matches exactly

4. Multiple block handling:
   - Blocks are processed in order they appear
   - Each block must match and apply successfully
   - Later blocks operate on the result of earlier blocks
   - If any block fails, the tool reports which one

5. Large file optimization:
   - Uses efficient regex-based parsing to handle large files
   - Processes blocks sequentially to minimize memory usage
   - Provides detailed error information for easier debugging
   - Maintains document hash verification for code integrity
   - Avoids unnecessary retries and loops for better performance

Examples for different code styles:

1. Adding a field to a class:
<<<<<<< SEARCH
class UserManager {
  private users: { id: number; name: string; }[] = [];
}
=======
class UserManager {
  private users: { id: number; name: string; password: string; }[] = [];
}
>>>>>>> REPLACE

2. Modifying a class method:
<<<<<<< SEARCH
  addUser(name: string) {
    const user = { id: this.nextId++, name };
    this.users.push(user);
    return user;
  }
=======
  async addUser(name: string, password: string) {
    const hashedPassword = await hash(password, 10);
    const user = { id: this.nextId++, name, password: hashedPassword };
    this.users.push(user);
    return user;
  }
>>>>>>> REPLACE

3. Adding imports:
<<<<<<< SEARCH
class UserManager {
=======
import { hash } from 'bcrypt';

class UserManager {
>>>>>>> REPLACE

4. Updating interfaces/types:
<<<<<<< SEARCH
interface User {
  id: string;
  name: string;
}
=======
interface User {
  id: string;
  name: string;
  password: string;
}
>>>>>>> REPLACE`,
    schema: z.object({
      instructions: z.string().describe(
        "Search/replace blocks following the required format. Each block must contain <<<<<<< SEARCH, =======, and >>>>>>> REPLACE. SEARCH content must match the file exactly.",
      ),
      documentHash: z.string().describe(
        "MD5 hash of the document being modified. The tool will verify that the document hasn't been modified since the hash was generated.",
      ),
    }),
  },
);
