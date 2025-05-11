import { SEARCH_REPLACE_MARKERS, updateSearchReplace } from "@/lib/chat-utils";
import { replacePreservingWhitespace } from "@/lib/diff-utils";
import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tryCatch } from "@/lib/try-catch";
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
  changeHistory: Array<{
    timestamp: number;
    changeSize: number;
    hash: string;
  }>;
  consecutiveMinorChanges: number;
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
  private maxRetries = 5; // Increased from 3 to 5 for more recovery attempts
  private lastFailedSearches: Record<string, string[]> = {}; // Track failed searches for better error reporting
  private maxConsecutiveMinorChanges = 3; // Maximum number of consecutive minor changes allowed
  private minSignificantChangeSize = 10; // Minimum number of characters changed to be considered significant
  private maxChangesPerHour = 20; // Maximum number of changes allowed per hour to prevent infinite loops

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
    diff: string,
  ): Promise<{ success: boolean; message: string; hash?: string; }> {
    console.log("FileChangeManager.submitChange", {
      path,
      hash: hash.substring(0, 8),
    });

    // Validate inputs
    if (!path || !hash || !diff) {
      return {
        success: false,
        message: "Invalid input: path, hash, and diff are required",
      };
    }

    // Get current file content
    const { data: currentContent, error: getContentError } = await tryCatch(this.codeSession.getCode());

    if (getContentError || !currentContent) {
      return {
        success: false,
        message: `Error retrieving file content: ${
          getContentError instanceof Error ? getContentError.message : String(getContentError)
        }` || "File content is empty",
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
        pendingChanges: [],
        changeHistory: [],
        consecutiveMinorChanges: 0,
      };
    }

    // Verify hash integrity
    if (hash !== currentHash) {
      // Check if the provided hash matches the last successful hash
      if (hash === this.currentState[path].lastSuccessfulHash) {
        console.log(
          "Hash matches last successful hash, proceeding with change",
        );
        // Continue with the last successful hash
      } else {
        // Auto-retry with corrected hash if this is a new attempt
        const pendingChange: PendingChange = {
          path,
          hash: currentHash, // Use current hash instead of provided hash
          diff,
          timestamp: Date.now(),
        };

        this.pendingChanges.push(pendingChange);
        this.currentState[path].pendingChanges.push(pendingChange);

        return {
          success: false,
          message: "Document has been modified since last hash. Retrying with current hash.",
          hash: currentHash,
        };
      }
    }

    // Process the diff to create optimized SEARCH/REPLACE blocks
    const optimizedDiff = this.optimizeSearchReplaceBlocks(
      diff,
      currentContent,
    );

    // Apply the changes
    let modifiedContent = updateSearchReplace(optimizedDiff, currentContent);

    // Check if changes were applied
    if (modifiedContent === currentContent) {
      // Try recovery strategies
      const recoveryResult = await this.attemptRecovery(
        path,
        currentContent,
        diff,
      );
      if (recoveryResult.success && recoveryResult.content) {
        modifiedContent = recoveryResult.content;
      } else {
        return {
          success: false,
          message: recoveryResult.message,
        };
      }
    }

    // Check if the change is significant enough to apply
    const changeSize = Math.abs(modifiedContent.length - currentContent.length);
    const isMinorChange = changeSize < this.minSignificantChangeSize;

    // Check for rate limiting
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    const recentChanges = this.currentState[path]?.changeHistory?.filter(
      (change) => change.timestamp > oneHourAgo,
    ).length || 0;

    // Check if we're exceeding the rate limit
    if (recentChanges >= this.maxChangesPerHour) {
      return {
        success: false,
        message:
          `Too many changes in a short period (${recentChanges} in the last hour). Please wait before making more changes to prevent potential infinite loops.`,
      };
    }

    // Check for consecutive minor changes
    if (isMinorChange) {
      const currentConsecutiveMinorChanges =
        (this.currentState[path]?.consecutiveMinorChanges || 0) + 1;

      if (currentConsecutiveMinorChanges > this.maxConsecutiveMinorChanges) {
        return {
          success: false,
          message:
            `Multiple minor changes detected (${currentConsecutiveMinorChanges} consecutive changes with less than ${this.minSignificantChangeSize} characters modified). The changes appear to be trivial or unnecessary. Please make more substantial changes or stop modifying this file.`,
        };
      }
    }

    // Update the file with modified content
    const { data: setResult, error: setCodeError } = await tryCatch(this.codeSession.setCode(modifiedContent));

    if (setCodeError) {
      return {
        success: false,
        message: `Error updating file: ${setCodeError instanceof Error ? setCodeError.message : String(setCodeError)}`,
      };
    }

    if (!setResult) {
      return {
        success: false,
        message: "Failed to update the file with the modified content (setCode returned no result)",
      };
    }

    // The setCode method might return the updated content as a string
    modifiedContent = typeof setResult === "string" ? setResult : modifiedContent;

    // Update state with new content
    const newHash = md5(modifiedContent);

    // Update change history
    const changeHistory = [
      ...(this.currentState[path]?.changeHistory || []),
      {
        timestamp: Date.now(),
        changeSize,
        hash: newHash,
      },
    ];

    // Update consecutive minor changes counter
    const consecutiveMinorChanges = isMinorChange
      ? (this.currentState[path]?.consecutiveMinorChanges || 0) + 1
      : 0;

    this.currentState[path] = {
      content: modifiedContent,
      hash: newHash,
      lastSuccessfulHash: newHash,
      pendingChanges: [],
      changeHistory,
      consecutiveMinorChanges,
    };

    // Update hash cache
    hashCache.set(modifiedContent, newHash);

    // Clear retry count for this path
    this.retryCount[path] = 0;

    // Calculate change metrics
    const bytesChanged = modifiedContent.length - currentContent.length;
    const linesChanged = modifiedContent.split("\n").length -
      currentContent.split("\n").length;

    // Add a warning about minor changes if needed
    let message = `Changes applied successfully: ${
      bytesChanged > 0 ? "+" : ""
    }${bytesChanged} bytes, ${linesChanged > 0 ? "+" : ""}${linesChanged} lines`;

    if (isMinorChange) {
      message +=
        `\nNote: This change was relatively minor (${changeSize} characters). Consider making more substantial changes or stopping if the task is complete.`;
    }

    if (consecutiveMinorChanges > 1) {
      message +=
        `\nWarning: ${consecutiveMinorChanges} consecutive minor changes detected. Further minor changes may be rejected.`;
    }

    return {
      success: true,
      message,
      hash: newHash,
    };
  }

  /**
   * Optimizes SEARCH/REPLACE blocks for better matching
   * @param diff The original diff string
   * @param currentContent The current file content
   * @returns An optimized diff string
   */
  private optimizeSearchReplaceBlocks(
    diff: string,
    currentContent: string,
  ): string {
    // Extract all SEARCH/REPLACE blocks
    const blocks = this.extractSearchReplaceBlocks(diff);
    if (blocks.length === 0) return diff;

    // Process each block to add context if needed
    const optimizedBlocks = blocks.map((block) => {
      return this.addContextToSearchBlock(block, currentContent);
    });

    // Recombine blocks into a single diff
    return optimizedBlocks.map((block) => {
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
          replace: match[2].trim(),
        });
      }
    }

    return blocks;
  }

  /**
   * Adds context lines to a search block to improve matching with enhanced algorithms
   * @param block The original search/replace block
   * @param content The file content
   * @returns A search/replace block with added context
   */
  private addContextToSearchBlock(
    block: SearchReplaceBlock,
    content: string,
  ): SearchReplaceBlock {
    console.log("Attempting to add context to search block");

    // If the search block already matches exactly, return it unchanged
    if (content.includes(block.search)) {
      console.log("Exact match found, no context needed");
      return block;
    }

    // Try to find the search block with flexible whitespace matching
    const searchNoWS = block.search.replace(/\s+/g, "");
    const contentNoWS = content.replace(/\s+/g, "");

    if (!contentNoWS.includes(searchNoWS)) {
      console.log("No match found even with flexible whitespace matching");

      // Try fuzzy matching as a last resort
      const fuzzyMatch = this.findFuzzyMatch(block.search, content);
      if (fuzzyMatch) {
        console.log("Fuzzy match found, using it for context");
        return {
          search: fuzzyMatch,
          replace: block.replace,
        };
      }

      // If we can't find it even with flexible matching, return unchanged
      return block;
    }

    // Find the approximate location in the content
    const lines = content.split("\n");
    const searchLines = block.search.split("\n");

    // Try multiple strategies to find the best match

    // Strategy 1: Match first and last lines
    if (searchLines.length > 1) {
      const firstSearchLine = searchLines[0].trim();
      const lastSearchLine = searchLines[searchLines.length - 1].trim();

      const firstLineMatches: number[] = [];
      const lastLineMatches: number[] = [];

      for (const [i, line] of lines.entries()) {
        if (line.trim() === firstSearchLine) {
          firstLineMatches.push(i);
        }
        if (line.trim() === lastSearchLine) {
          lastLineMatches.push(i);
        }
      }

      // Find pairs of first/last line matches that are the right distance apart
      for (const firstIdx of firstLineMatches) {
        for (const lastIdx of lastLineMatches) {
          if (lastIdx - firstIdx === searchLines.length - 1) {
            console.log("Found matching first/last lines with correct spacing");

            // Get context before and after
            const contextWindow = 2;
            const startIndex = Math.max(0, firstIdx - contextWindow);
            const endIndex = Math.min(
              lines.length - 1,
              lastIdx + contextWindow,
            );

            // Create new search block with context
            const newSearch = lines.slice(startIndex, endIndex + 1).join("\n");

            // Adjust the replace block to include the context
            const beforeContext = lines.slice(startIndex, firstIdx).join("\n");
            const afterContext = lines.slice(lastIdx + 1, endIndex + 1).join(
              "\n",
            );
            const newReplace = beforeContext + (beforeContext ? "\n" : "") +
              block.replace +
              (afterContext ? "\n" : "") + afterContext;

            return {
              search: newSearch,
              replace: newReplace,
            };
          }
        }
      }
    }

    // Strategy 2: Try to find a unique match for the first line of the search block
    const firstSearchLine = searchLines[0].trim();
    const potentialMatches: number[] = [];

    for (const [i, line] of lines.entries()) {
      if (line.trim() === firstSearchLine) {
        potentialMatches.push(i);
      }
    }

    // If we found exactly one match, add context
    if (potentialMatches.length === 1) {
      console.log("Found unique match for first line");
      const matchIndex = potentialMatches[0];
      const contextWindow = 3; // Increased from 2 to 3 for more context

      // Get context before
      const startIndex = Math.max(0, matchIndex - contextWindow);
      // Get context after
      const endIndex = Math.min(
        lines.length - 1,
        matchIndex + searchLines.length + contextWindow,
      );

      // Create new search block with context
      const newSearch = lines.slice(startIndex, endIndex + 1).join("\n");

      // Adjust the replace block to include the context
      const beforeContext = lines.slice(startIndex, matchIndex).join("\n");
      const afterContext = lines.slice(
        matchIndex + searchLines.length,
        endIndex + 1,
      ).join("\n");
      const newReplace = beforeContext + (beforeContext ? "\n" : "") +
        block.replace +
        (afterContext ? "\n" : "") + afterContext;

      return {
        search: newSearch,
        replace: newReplace,
      };
    }

    // Strategy 3: Try to find the longest common substring
    if (searchLines.length > 1) {
      console.log("Trying longest common substring approach");
      const longestCommonSubstring = this.findLongestCommonSubstring(
        block.search,
        content,
      );
      if (longestCommonSubstring && longestCommonSubstring.length > 20) { // Only use if substantial match
        const startPos = content.indexOf(longestCommonSubstring);
        if (startPos !== -1) {
          // Find line boundaries
          const beforeContent = content.substring(0, startPos);
          const linesBefore = beforeContent.split("\n").length - 1;

          const contextWindow = 3;
          const startLine = Math.max(0, linesBefore - contextWindow);
          const endLine = Math.min(
            lines.length - 1,
            linesBefore + longestCommonSubstring.split("\n").length +
              contextWindow,
          );

          const newSearch = lines.slice(startLine, endLine + 1).join("\n");

          return {
            search: newSearch,
            replace: block.replace,
          };
        }
      }
    }

    // If we couldn't add context with any strategy, return the original block
    console.log(
      "Could not add context with any strategy, returning original block",
    );
    return block;
  }

  /**
   * Finds the longest common substring between two strings
   * @param str1 First string
   * @param str2 Second string
   * @returns The longest common substring or null if none found
   */
  private findLongestCommonSubstring(
    str1: string,
    str2: string,
  ): string | null {
    if (!str1 || !str2) return null;

    // For very long strings, use a simplified approach
    if (str1.length > 10000 || str2.length > 10000) {
      return this.findLongestCommonSubstringSimple(str1, str2);
    }

    const m = str1.length;
    const n = str2.length;
    let maxLength = 0;
    let endIndex = 0;

    // Create a table to store lengths of longest common suffixes
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;

          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endIndex = i;
          }
        }
      }
    }

    if (maxLength === 0) return null;

    return str1.substring(endIndex - maxLength, endIndex);
  }

  /**
   * Simplified version of longest common substring for very long strings
   */
  private findLongestCommonSubstringSimple(
    str1: string,
    str2: string,
  ): string | null {
    // Use line-by-line approach for long strings
    const lines1 = str1.split("\n");
    const _lines2 = str2.split("\n");

    let bestMatch = "";
    let bestLength = 0;

    // Try to find matching lines
    for (const line of lines1) {
      const trimmedLine = line.trim();
      if (trimmedLine.length < 5) continue; // Skip very short lines

      if (str2.includes(trimmedLine) && trimmedLine.length > bestLength) {
        bestMatch = trimmedLine;
        bestLength = trimmedLine.length;
      }
    }

    // Try to find multi-line matches
    for (const [i, line] of lines1.slice(0, -1).entries()) {
      const twoLines = line + "\n" + lines1[i + 1];
      if (str2.includes(twoLines) && twoLines.length > bestLength) {
        bestMatch = twoLines;
        bestLength = twoLines.length;
      }
    }

    return bestLength > 0 ? bestMatch : null;
  }

  /**
   * Finds a fuzzy match for a search string in content
   * @param search The search string
   * @param content The content to search in
   * @returns The best matching substring or null if no good match found
   */
  private findFuzzyMatch(search: string, content: string): string | null {
    // For very short search strings, don't attempt fuzzy matching
    if (search.length < 10) return null;

    const searchLines = search.split("\n");
    const contentLines = content.split("\n");

    // Try to match significant lines (non-empty, not just whitespace or brackets)
    const significantSearchLines = searchLines.filter((line) => {
      const trimmed = line.trim();
      return trimmed.length > 5 && !/^[{}[\]();,]*$/.test(trimmed);
    });

    if (significantSearchLines.length === 0) return null;

    // Find the most unique significant line (least likely to have duplicates)
    let mostUniqueLineIndex = 0;
    let lowestMatchCount = Infinity;

    for (let i = 0; i < significantSearchLines.length; i++) {
      const line = significantSearchLines[i].trim();
      let matchCount = 0;

      for (const contentLine of contentLines) {
        if (contentLine.trim() === line) {
          matchCount++;
        }
      }

      if (matchCount > 0 && matchCount < lowestMatchCount) {
        lowestMatchCount = matchCount;
        mostUniqueLineIndex = i;
      }
    }

    // If we found a unique line, use it to anchor our match
    if (lowestMatchCount < Infinity) {
      const anchorLine = significantSearchLines[mostUniqueLineIndex].trim();

      for (const [i, line] of contentLines.entries()) {
        if (line.trim() === anchorLine) {
          // Found a match for our anchor line
          const contextWindow = 5;
          const startIndex = Math.max(0, i - contextWindow);
          const endIndex = Math.min(contentLines.length - 1, i + contextWindow);

          return contentLines.slice(startIndex, endIndex + 1).join("\n");
        }
      }
    }

    return null;
  }

  /**
   * Attempts to recover from a failed change with enhanced diagnostics and recovery strategies
   * @param path The file path
   * @param content The current file content
   * @param diff The diff that failed to apply
   * @returns A recovery result with success status, message, and possibly modified content
   */
  private async attemptRecovery(
    path: string,
    content: string,
    diff: string,
  ): Promise<{ success: boolean; message: string; content?: string; }> {
    console.log(
      `Attempting recovery for ${path} (attempt ${
        this.retryCount[path] || 0 + 1
      }/${this.maxRetries})`,
    );

    // Increment retry count
    this.retryCount[path] = (this.retryCount[path] || 0) + 1;

    // Initialize failed searches array if needed
    if (!this.lastFailedSearches[path]) {
      this.lastFailedSearches[path] = [];
    }

    // Check if we've exceeded max retries
    if (this.retryCount[path] > this.maxRetries) {
      // Provide detailed error information about what failed
      const failedSearches = this.lastFailedSearches[path];
      let detailedMessage = `Failed to apply changes after ${this.maxRetries} attempts.`;

      if (failedSearches.length > 0) {
        detailedMessage += " The following search blocks could not be matched:\n";
        failedSearches.forEach((search, i) => {
          // Truncate long search blocks for readability
          const truncated = search.length > 100
            ? search.substring(0, 100) + "..."
            : search;
          detailedMessage += `\n${i + 1}. ${truncated}`;
        });
        detailedMessage += "\n\nPlease check these blocks for exact matching.";
      }

      return {
        success: false,
        message: detailedMessage,
      };
    }

    // Extract blocks
    const blocks = this.extractSearchReplaceBlocks(diff);
    if (blocks.length === 0) {
      return {
        success: false,
        message: "No valid SEARCH/REPLACE blocks found in the diff",
      };
    }

    // Track which blocks failed to match for better error reporting
    const failedBlocks: string[] = [];

    // Strategy 1: Try each block individually with flexible whitespace matching
    console.log("Recovery strategy 1: Flexible whitespace matching");
    let modifiedContent = content;
    let anySuccess = false;

    for (const block of blocks) {
      // Try with flexible whitespace matching
      const searchNoWS = block.search.replace(/\s+/g, "");
      const contentNoWS = modifiedContent.replace(/\s+/g, "");

      if (contentNoWS.includes(searchNoWS)) {
        // Found a match with flexible whitespace, try to apply it
        const result = replacePreservingWhitespace(
          modifiedContent,
          block.search,
          block.replace,
        );

        // If the content changed, we had a successful replacement
        if (result !== modifiedContent) {
          console.log(
            "Successfully applied block with flexible whitespace matching",
          );
          modifiedContent = result;
          anySuccess = true;
        } else {
          failedBlocks.push(block.search);
        }
      } else {
        failedBlocks.push(block.search);
      }
    }

    if (anySuccess) {
      return {
        success: true,
        message: "Applied changes with flexible whitespace matching",
        content: modifiedContent,
      };
    }

    // Strategy 2: Try with expanded context
    console.log("Recovery strategy 2: Expanded context matching");
    const expandedBlocks = blocks.map((block) => {
      return this.addContextToSearchBlock(block, content);
    });

    // Apply expanded blocks
    let expandedContent = content;
    let expandedSuccess = false;

    for (const block of expandedBlocks) {
      if (
        block.search !== blocks.find((b) => b.replace === block.replace)?.search
      ) {
        // This block has been expanded with context, try to apply it
        const result = replacePreservingWhitespace(
          expandedContent,
          block.search,
          block.replace,
        );

        if (result !== expandedContent) {
          console.log("Successfully applied block with expanded context");
          expandedContent = result;
          expandedSuccess = true;
        }
      }
    }

    if (expandedSuccess) {
      return {
        success: true,
        message: "Applied changes with expanded context",
        content: expandedContent,
      };
    }

    // Strategy 3: Try semantic matching (matching by code structure rather than exact text)
    console.log("Recovery strategy 3: Semantic matching");
    const semanticResult = this.attemptSemanticMatching(content, blocks);

    if (semanticResult.success && semanticResult.content) {
      return {
        success: true,
        message: "Applied changes with semantic matching",
        content: semanticResult.content,
      };
    }

    // Update the failed searches for better error reporting
    this.lastFailedSearches[path] = failedBlocks;

    // Provide a more detailed error message
    let errorMessage =
      "Failed to apply changes. The SEARCH blocks could not be matched in the file content.";

    // Add specific suggestions based on the content
    if (failedBlocks.length > 0) {
      const firstFailedBlock = failedBlocks[0];
      const firstFailedLines = firstFailedBlock.split("\n");

      if (firstFailedLines.length > 1) {
        // For multi-line blocks, suggest checking indentation and whitespace
        errorMessage +=
          " Check for exact whitespace, indentation, and line endings in multi-line blocks.";
      } else {
        // For single-line blocks, suggest checking for exact character matching
        errorMessage += " Check for exact character-by-character matching in search blocks.";
      }
    }

    return {
      success: false,
      message: errorMessage,
    };
  }

  /**
   * Attempts to match blocks based on code structure rather than exact text
   * @param content The file content
   * @param blocks The search/replace blocks
   * @returns A result with success status and possibly modified content
   */
  private attemptSemanticMatching(
    content: string,
    blocks: SearchReplaceBlock[],
  ): { success: boolean; content?: string; } {
    let modifiedContent = content;
    let anySuccess = false;

    for (const block of blocks) {
      // Try to match by code structure (ignoring comments, whitespace variations)
      const searchLines = block.search.split("\n");
      const contentLines = modifiedContent.split("\n");

      // Extract "significant" parts of each search line (removing comments, normalizing whitespace)
      const significantSearchLines = searchLines.map((line) => {
        // Remove comments
        let significant = line.replace(/\/\/.*$/, "").replace(
          /\/\*.*\*\//g,
          "",
        );
        // Normalize whitespace
        significant = significant.trim().replace(/\s+/g, " ");
        return significant;
      }).filter((line) => line.length > 0);

      // If we don't have any significant lines, skip this block
      if (significantSearchLines.length === 0) continue;

      // Try to find a sequence of lines in the content that match our significant search lines
      // Create an array of possible starting indices
      const possibleStartIndices = Array.from(
        { length: contentLines.length - significantSearchLines.length + 1 },
        (_, i) => i,
      );

      for (const i of possibleStartIndices) {
        let allMatch = true;
        let matchedLines = 0;

        for (const [_j, searchLine] of significantSearchLines.entries()) {
          if (!searchLine) continue; // Skip empty lines

          // Get the significant part of the content line
          const contentLine = contentLines[i + matchedLines];
          const significantContentLine = contentLine
            .replace(/\/\/.*$/, "")
            .replace(/\/\*.*\*\//g, "")
            .trim()
            .replace(/\s+/g, " ");

          if (significantContentLine !== searchLine) {
            allMatch = false;
            break;
          }

          matchedLines++;
        }

        if (allMatch && matchedLines > 0) {
          // Found a semantic match, replace these lines with the replacement
          const replaceLines = block.replace.split("\n");
          const newContentLines = [
            ...contentLines.slice(0, i),
            ...replaceLines,
            ...contentLines.slice(i + matchedLines),
          ];

          modifiedContent = newContentLines.join("\n");
          anySuccess = true;
          break;
        }
      }
    }

    return {
      success: anySuccess,
      content: anySuccess ? modifiedContent : undefined,
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
  batchChanges(
    changes: Array<{ path: string; hash: string; diff: string; }>,
  ): { path: string; hash: string; diff: string; } {
    // Only batch changes for the same file
    const firstChange = changes[0];
    const samePath = changes.every((change) => change.path === firstChange.path);

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
    const batchedDiff = allBlocks.map((block) => {
      return `${SEARCH_REPLACE_MARKERS.SEARCH_START}\n${block.search}\n${SEARCH_REPLACE_MARKERS.SEPARATOR}\n${block.replace}\n${SEARCH_REPLACE_MARKERS.REPLACE_END}`;
    }).join("\n\n");

    return {
      path: firstChange.path,
      hash: firstChange.hash,
      diff: batchedDiff,
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
