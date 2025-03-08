import { SEARCH_REPLACE_MARKERS, updateSearchReplace } from "@/lib/chat-utils";
import { replacePreservingWhitespace } from "@/lib/diff-utils";
import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { getHashWithCache } from "../../code-processing";
import { hashCache } from "../../caching";

interface PendingChange {
  path: string;
  hash: string;
  diff: string;
  timestamp: number;
}

interface FileState {
  content: string;
  hash: string;
  lastSuccessfulHash: string;
  pendingChanges: PendingChange[];
}

interface SearchReplaceBlock {
  search: string;
  replace: string;
}

/**
 * FileChangeManager handles efficient file modifications with improved hash management,
 * smarter SEARCH/REPLACE blocks, atomic change batching, error recovery, and state tracking.
 */
export class FileChangeManager {
  private currentState: Record<string, FileState> = {};
  private pendingChanges: PendingChange[] = [];
  private retryCount: Record<string, number> = {};
  private maxRetries = 3;

  /**
   * Creates a new FileChangeManager instance
   * @param codeSession The code session to use for file operations
   */
  constructor(private codeSession: ICode) {}

  /**
   * Submits a change to be applied to a file
   * @param path The path of the file to modify
   * @param hash The hash of the file to modify for version control
   * @param diff The diff containing SEARCH/REPLACE blocks
   * @returns A promise that resolves to the result of the change
   */
  async submitChange(
    path: string,
    hash: string,
    diff: string
  ): Promise<{ success: boolean; message: string; hash?: string }> {
    console.log("FileChangeManager.submitChange", { path, hash: hash.substring(0, 8) });

    // Validate inputs
    if (!path || !hash || !diff) {
      return { 
        success: false, 
        message: "Invalid input: path, hash, and diff are required" 
      };
    }

    // Get current file content
    let currentContent: string;
    try {
      currentContent = await this.codeSession.getCode();
      if (!currentContent) {
        return { 
          success: false, 
          message: "Failed to retrieve file content or file is empty" 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Error retrieving file content: ${error instanceof Error ? error.message : String(error)}` 
      };
    }

    // Calculate current hash
    const currentHash = md5(currentContent);
    
    // Store file state if not already tracked
    if (!this.currentState[path]) {
      this.currentState[path] = {
        content: currentContent,
        hash: currentHash,
        lastSuccessfulHash: currentHash,
        pendingChanges: []
      };
    }

    // Verify hash integrity
    if (hash !== currentHash) {
      // Check if the provided hash matches the last successful hash
      if (hash === this.currentState[path].lastSuccessfulHash) {
        console.log("Hash matches last successful hash, proceeding with change");
        // Continue with the last successful hash
      } else {
        // Auto-retry with corrected hash if this is a new attempt
        const pendingChange: PendingChange = {
          path,
          hash: currentHash, // Use current hash instead of provided hash
          diff,
          timestamp: Date.now()
        };
        
        this.pendingChanges.push(pendingChange);
        this.currentState[path].pendingChanges.push(pendingChange);
        
        return { 
          success: false, 
          message: "Document has been modified since last hash. Retrying with current hash.",
          hash: currentHash
        };
      }
    }

    // Process the diff to create optimized SEARCH/REPLACE blocks
    const optimizedDiff = this.optimizeSearchReplaceBlocks(diff, currentContent);
    
    // Apply the changes
    let modifiedContent = updateSearchReplace(optimizedDiff, currentContent);
    
    // Check if changes were applied
    if (modifiedContent === currentContent) {
      // Try recovery strategies
      const recoveryResult = await this.attemptRecovery(path, currentContent, diff);
      if (recoveryResult.success && recoveryResult.content) {
        modifiedContent = recoveryResult.content;
      } else {
        return { 
          success: false, 
          message: recoveryResult.message
        };
      }
    }

    // Update the file with modified content
    try {
      const result = await this.codeSession.setCode(modifiedContent);
      if (!result) {
        return { 
          success: false, 
          message: "Failed to update the file with the modified content" 
        };
      }
      
      // The setCode method might return the updated content as a string
      modifiedContent = typeof result === 'string' ? result : modifiedContent;
      
      // Update state with new content
      const newHash = md5(modifiedContent);
      this.currentState[path] = {
        content: modifiedContent,
        hash: newHash,
        lastSuccessfulHash: newHash,
        pendingChanges: []
      };
      
      // Update hash cache
      hashCache.set(modifiedContent, newHash);
      
      // Clear retry count for this path
      this.retryCount[path] = 0;
      
      // Calculate change metrics
      const bytesChanged = modifiedContent.length - currentContent.length;
      const linesChanged = modifiedContent.split("\n").length - currentContent.split("\n").length;
      
      return { 
        success: true, 
        message: `Changes applied successfully: ${bytesChanged > 0 ? "+" : ""}${bytesChanged} bytes, ${linesChanged > 0 ? "+" : ""}${linesChanged} lines`,
        hash: newHash
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Error updating file: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }

  /**
   * Optimizes SEARCH/REPLACE blocks for better matching
   * @param diff The original diff string
   * @param currentContent The current file content
   * @returns An optimized diff string
   */
  private optimizeSearchReplaceBlocks(diff: string, currentContent: string): string {
    // Extract all SEARCH/REPLACE blocks
    const blocks = this.extractSearchReplaceBlocks(diff);
    if (blocks.length === 0) return diff;

    // Process each block to add context if needed
    const optimizedBlocks = blocks.map(block => {
      return this.addContextToSearchBlock(block, currentContent);
    });

    // Recombine blocks into a single diff
    return optimizedBlocks.map(block => {
      return `${SEARCH_REPLACE_MARKERS.SEARCH_START}\n${block.search}\n${SEARCH_REPLACE_MARKERS.SEPARATOR}\n${block.replace}\n${SEARCH_REPLACE_MARKERS.REPLACE_END}`;
    }).join("\n\n");
  }

  /**
   * Extracts SEARCH/REPLACE blocks from a diff string
   * @param diff The diff string
   * @returns An array of SearchReplaceBlock objects
   */
  private extractSearchReplaceBlocks(diff: string): SearchReplaceBlock[] {
    const blocks: SearchReplaceBlock[] = [];
    const regex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
    
    let match;
    while ((match = regex.exec(diff)) !== null) {
      if (match.length >= 3) {
        blocks.push({
          search: match[1].trim(),
          replace: match[2].trim()
        });
      }
    }
    
    return blocks;
  }

  /**
   * Adds context lines to a search block to improve matching
   * @param block The original search/replace block
   * @param content The file content
   * @returns A search/replace block with added context
   */
  private addContextToSearchBlock(block: SearchReplaceBlock, content: string): SearchReplaceBlock {
    // If the search block already matches, return it unchanged
    if (content.includes(block.search)) {
      return block;
    }
    
    // Try to find the search block with flexible whitespace matching
    const searchNoWS = block.search.replace(/\s+/g, "");
    const contentNoWS = content.replace(/\s+/g, "");
    
    if (!contentNoWS.includes(searchNoWS)) {
      // If we can't find it even with flexible matching, return unchanged
      return block;
    }
    
    // Find the approximate location in the content
    const lines = content.split("\n");
    const searchLines = block.search.split("\n");
    
    // Try to find a unique match for the first line of the search block
    const firstSearchLine = searchLines[0].trim();
    const potentialMatches: number[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === firstSearchLine) {
        potentialMatches.push(i);
      }
    }
    
    // If we found exactly one match, add context
    if (potentialMatches.length === 1) {
      const matchIndex = potentialMatches[0];
      const contextWindow = 2; // Number of context lines to add
      
      // Get context before
      const startIndex = Math.max(0, matchIndex - contextWindow);
      // Get context after
      const endIndex = Math.min(lines.length - 1, matchIndex + searchLines.length + contextWindow);
      
      // Create new search block with context
      const newSearch = lines.slice(startIndex, endIndex).join("\n");
      
      // Adjust the replace block to include the context
      const beforeContext = lines.slice(startIndex, matchIndex).join("\n");
      const afterContext = lines.slice(matchIndex + searchLines.length, endIndex).join("\n");
      const newReplace = beforeContext + (beforeContext ? "\n" : "") + 
                         block.replace + 
                         (afterContext ? "\n" : "") + afterContext;
      
      return {
        search: newSearch,
        replace: newReplace
      };
    }
    
    // If we couldn't add context, return the original block
    return block;
  }

  /**
   * Attempts to recover from a failed change
   * @param path The file path
   * @param content The current file content
   * @param diff The diff that failed to apply
   * @returns A recovery result with success status, message, and possibly modified content
   */
  private async attemptRecovery(
    path: string, 
    content: string, 
    diff: string
  ): Promise<{ success: boolean; message: string; content?: string }> {
    // Increment retry count
    this.retryCount[path] = (this.retryCount[path] || 0) + 1;
    
    // Check if we've exceeded max retries
    if (this.retryCount[path] > this.maxRetries) {
      return {
        success: false,
        message: `Failed to apply changes after ${this.maxRetries} attempts. Please check the SEARCH/REPLACE blocks for exact matching.`
      };
    }
    
    // Extract blocks
    const blocks = this.extractSearchReplaceBlocks(diff);
    if (blocks.length === 0) {
      return {
        success: false,
        message: "No valid SEARCH/REPLACE blocks found in the diff"
      };
    }
    
    // Try each block individually with flexible matching
    let modifiedContent = content;
    let anySuccess = false;
    
    for (const block of blocks) {
      // Try with flexible whitespace matching
      const searchNoWS = block.search.replace(/\s+/g, "");
      const contentNoWS = modifiedContent.replace(/\s+/g, "");
      
      if (contentNoWS.includes(searchNoWS)) {
        // Found a match with flexible whitespace, try to apply it
        const result = replacePreservingWhitespace(modifiedContent, block.search, block.replace);
        
        // If the content changed, we had a successful replacement
        if (result !== modifiedContent) {
          modifiedContent = result;
          anySuccess = true;
        }
      }
    }
    
    if (anySuccess) {
      return {
        success: true,
        message: "Applied changes with flexible whitespace matching",
        content: modifiedContent
      };
    }
    
    // Try with expanded context
    const expandedBlocks = blocks.map(block => {
      return this.addContextToSearchBlock(block, content);
    });
    
    // Apply expanded blocks
    let expandedContent = content;
    let expandedSuccess = false;
    
    for (const block of expandedBlocks) {
      if (block.search !== blocks.find(b => b.replace === block.replace)?.search) {
        // This block has been expanded with context, try to apply it
        const result = replacePreservingWhitespace(expandedContent, block.search, block.replace);
        
        if (result !== expandedContent) {
          expandedContent = result;
          expandedSuccess = true;
        }
      }
    }
    
    if (expandedSuccess) {
      return {
        success: true,
        message: "Applied changes with expanded context",
        content: expandedContent
      };
    }
    
    return {
      success: false,
      message: "Failed to apply changes. The SEARCH blocks could not be matched in the file content."
    };
  }

  /**
   * Gets context lines around a specific line number
   * @param content The file content
   * @param lineNum The line number
   * @param window The number of context lines to include before and after
   * @returns The context lines as a string
   */
  getContextLines(content: string, lineNum: number, window = 3): string {
    const lines = content.split("\n");
    const start = Math.max(0, lineNum - window);
    const end = Math.min(lines.length - 1, lineNum + window);
    
    return lines.slice(start, end + 1).join("\n");
  }

  /**
   * Batches related changes into a single atomic operation
   * @param changes An array of changes to batch
   * @returns A single batched change
   */
  batchChanges(changes: { path: string; hash: string; diff: string }[]): { path: string; hash: string; diff: string } {
    // Only batch changes for the same file
    const firstChange = changes[0];
    const samePath = changes.every(change => change.path === firstChange.path);
    
    if (!samePath || changes.length <= 1) {
      return firstChange;
    }
    
    // Extract all blocks
    const allBlocks: SearchReplaceBlock[] = [];
    
    for (const change of changes) {
      const blocks = this.extractSearchReplaceBlocks(change.diff);
      allBlocks.push(...blocks);
    }
    
    // Combine blocks into a single diff
    const batchedDiff = allBlocks.map(block => {
      return `${SEARCH_REPLACE_MARKERS.SEARCH_START}\n${block.search}\n${SEARCH_REPLACE_MARKERS.SEPARATOR}\n${block.replace}\n${SEARCH_REPLACE_MARKERS.REPLACE_END}`;
    }).join("\n\n");
    
    return {
      path: firstChange.path,
      hash: firstChange.hash,
      diff: batchedDiff
    };
  }

  /**
   * Clears all pending changes
   */
  clearPendingChanges(): void {
    this.pendingChanges = [];
    
    // Clear pending changes in file states
    for (const path in this.currentState) {
      this.currentState[path].pendingChanges = [];
    }
  }
}
