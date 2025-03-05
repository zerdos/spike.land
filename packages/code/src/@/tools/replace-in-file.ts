import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import * as fs from "fs";
import * as path from "path";

/**
 * Interface for replace-in-file tool options
 */
export interface ReplaceInFileOptions {
  path: string;
  search: string;
  replace: string;
  all?: boolean;
}

/**
 * Interface for replace-in-file tool result
 */
export interface ReplaceInFileResult {
  success: boolean;
  path: string;
  replacements: number;
  error?: string;
  hash?: string;
}

/**
 * Parses a diff string into search and replace parts
 * @param diff The diff string
 * @returns An array of search and replace pairs
 */
function parseDiff(diff: string): { search: string; replace: string; }[] {
  const parts: { search: string; replace: string; }[] = [];
  const regex = /<<<<<<< SEARCH\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> REPLACE/g;

  let match;
  while ((match = regex.exec(diff)) !== null) {
    parts.push({
      search: match[1],
      replace: match[2],
    });
  }

  if (parts.length === 0) {
    throw new Error("Malformed diff string");
  }

  return parts;
}

/**
 * Replaces content in a file using a diff string
 * @param filePath The path to the file
 * @param diff The diff string
 * @returns A promise that resolves when the replacement is complete
 */
export async function replaceInFile(filePath: string, diff: string): Promise<void> {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  // Create directories if they don't exist
  try {
    await fs.promises.access(path.dirname(filePath));
  } catch (error) {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  }

  // Read the file content
  const content = await fs.promises.readFile(filePath, "utf8");

  // Parse the diff
  const parts = parseDiff(diff);

  // Apply the replacements
  let newContent = content;

  for (const part of parts) {
    if (!newContent.includes(part.search)) {
      throw new Error("Search content not found");
    }

    newContent = newContent.replace(part.search, part.replace);
  }

  // Write the new content to the file
  await fs.promises.writeFile(filePath, newContent, "utf8");
}

/**
 * Gets the replace-in-file tool for a code session
 * @param cSess The code session
 * @returns The replace-in-file tool function
 */
export function getReplaceInFileTool(cSess: ICode) {
  return async (args: { path: string; diff: string; }): Promise<ReplaceInFileResult> => {
    try {
      // Get the current code
      const currentCode = await cSess.getCode();

      // Perform the replacement
      await replaceInFile(args.path, args.diff);

      // Read the updated file content
      const newContent = await fs.promises.readFile(args.path, "utf8");

      // Update the code session
      await cSess.setCode(newContent);

      return {
        hash: newHash,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        path: args.path,
        replacements: 0,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };
}
