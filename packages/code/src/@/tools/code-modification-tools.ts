import { replaceFirstCodeMod } from "@/lib/chat-utils";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { unknown, z } from "zod";

export const SEARCH = "<<<<<<< SEARCH";
export const REPLACE = ">>>>>>> REPLACE";
export const SEPARATOR = "=======";

// Tools
export const codeModificationTool = tool(
  async (
    { instructions }: { instructions: string; },
  ): Promise<CodeModification> => {
    // If no current file content, return early with helpful error

    const currentCode = await (globalThis as unknown as {
      cSess: { getCode: () => Promise<string>; };
    }).cSess.getCode();
    try {
      if (instructions.length === 0) {
        return {
          code: currentCode,
          error: "Instructions required - provide search/replace blocks",
          // currentFileContent: currentCode,
        };
      }

      const searchIndex = instructions.indexOf(SEARCH);
      const replaceIndex = instructions.indexOf(REPLACE);
      const separatorIndex = instructions.indexOf(SEPARATOR);

      if (searchIndex === -1 || replaceIndex === -1 || separatorIndex === -1) {
        return {
          code: currentCode,
          error:
            "Invalid format. Each block must include <<<<<<< SEARCH, =======, and >>>>>>> REPLACE",
          // currentFileContent: currentCode,
        };
      }

      let retryCount = 0;
      let result = currentCode;
      const maxRetries = 3;

      // Extract all search/replace blocks for error reporting
      const blocks = instructions.split(SEARCH).slice(1);
      const searchBlocks = blocks.map((block) => {
        const [search] = block.split(SEPARATOR);
        return search.trim();
      });

      // For error reporting, track which block we're trying
      let currentBlockIndex = 0;
      const totalBlocks = searchBlocks.length;

      do {
        const newResult = replaceFirstCodeMod(instructions, result);
        if (newResult !== result) {
          result = newResult;
          currentBlockIndex++;
          retryCount = 0;

          // If we've processed all blocks successfully, we're done
          if (currentBlockIndex >= totalBlocks) {
            break;
          }
          continue;
        }
        retryCount++;

        if (retryCount === 1) {
          return {
            code: currentCode,
            error: `Block ${
              currentBlockIndex + 1
            }/${totalBlocks} not found exactly as specified. Compare your SEARCH block with current file content:`,
            retryCount,
            // currentFileContent: currentCode,
            // searchContent: searchBlocks[currentBlockIndex],
            // blockNumber: currentBlockIndex + 1,
            // totalBlocks,
          };
        }
      } while (retryCount < maxRetries);

      if (result === currentCode) {
        return {
          code: currentCode,
          error: `Failed to apply block ${
            currentBlockIndex + 1
          }/${totalBlocks} after ${retryCount} attempts. Verify the search content matches exactly:`,
          retryCount,
          // currentFileContent: currentCode,
          // searchContent: searchBlocks[currentBlockIndex],
          // blockNumber: currentBlockIndex + 1,
          // totalBlocks,
        };
      }

      const res = await (globalThis as unknown as {
        cSess: { setCode: (code: string) => Promise<string | boolean>; };
      }).cSess.setCode(result);

      if (res === false) {
        return {
          code: currentCode,
          error: "Failed to set code in the code session",
          retryCount,
          // currentFileContent: currentCode,
        };
      }
      if (typeof res === "string") {
        return {
          code: res,
          error: "",
          retryCount,
        };
      }

      return result;
    } catch (error) {
      return {
        code: currentCode,
        error: error instanceof Error
          ? error.message
          : "Unknown error in code modification",
        // currentFileContent: currentCode,
      };
    }
  },
  {
    name: "code_modification",
    description:
      `Modifies code by applying search/replace patterns. Uses current file content as base for modifications. Supports multiple search/replace blocks for coordinated changes.

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
    }),
  },
);
