import { replacePreservingWhitespace } from "@/lib/diff-utils";
import type { Message } from "@/lib/interfaces";

interface CodeModification {
  search: string;
  replace: string;
}

const CODE_MODIFICATION_REGEX = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
export const SEARCH_REPLACE_MARKERS = {
  SEARCH_START: "<<<<<<< SEARCH",
  SEPARATOR: "=======",
  REPLACE_END: ">>>>>>> REPLACE",
} as const;

/**
 * Adds or updates a message in the messages array
 * @param messages - The current array of messages
 * @param newMessage - The message to add or update
 * @returns A new array of messages with the new message added or updated
 */
export function messagesPush(
  messages: Message[],
  newMessage: Message,
): Message[] {
  if (!newMessage.role) {
    throw new Error("Message must have a role");
  }

  const messagesCopy = JSON.parse(JSON.stringify(messages)) as Message[];
  const newId = newMessage.id || Date.now().toString();

  if (!messagesCopy.length) {
    return [{ ...newMessage, id: newId }];
  }

  const lastMessage = messagesCopy[messagesCopy.length - 1];

  if (lastMessage.role === newMessage.role && newMessage.role === "assistant") {
    messagesCopy[messagesCopy.length - 1] = {
      ...lastMessage,
      id: newMessage.id,
      content: (newMessage.content as string).startsWith(lastMessage.content as string)
        ? newMessage.content as string
        : lastMessage.content as string + newMessage.content as string,
    };
    return messagesCopy;
  }

  return [...messagesCopy, { ...newMessage, id: newId }];
}

/**
 * Formats code as a section with a title
 */
export const formatCodeAsSection = (
  codeSpace: string,
  code: string,
): string => `
# ${codeSpace}.tsx

\`\`\`tsx
${code}
\`\`\`
`;

/**
 * Formats a code modification into the standard format
 */
function formatCodeModification(mod: CodeModification): string {
  return `<<<<<<< SEARCH
${mod.search}
=======
${mod.replace}
>>>>>>> REPLACE`;
}

/**
 * Parses a string that might represent a diff block into a CodeModification object.
 * Handles fully formed diff blocks or content extracted from other contexts (e.g., markdown).
 */
function parseSingleDiffBlock(blockText: string): CodeModification | null {
  const searchMarker = SEARCH_REPLACE_MARKERS.SEARCH_START;
  const separatorMarker = SEARCH_REPLACE_MARKERS.SEPARATOR;
  const replaceMarker = SEARCH_REPLACE_MARKERS.REPLACE_END;

  let searchText = "";
  let replaceText = "";

  // Regex to capture content within a standard diff block
  const fullBlockRegex = new RegExp(
    // Using non-capturing group for optional newline after SEARCH marker
    // Allowing for optional newline before SEPARATOR and REPLACE_END
    `^${searchMarker}(?:\\n)?([\\s\\S]*?)(?:\\n)?${separatorMarker}(?:\\n)?([\\s\\S]*?)(?:\\n)?${replaceMarker}$`,
  );
  const fullBlockMatch = blockText.match(fullBlockRegex);

  if (fullBlockMatch) {
    searchText = fullBlockMatch[1].trim();
    replaceText = fullBlockMatch[2].trim();
    // Search text cannot be empty, replace text can be empty (for deletions)
    if (searchText) {
      return { search: searchText, replace: replaceText };
    }
  } else {
    // Fallback for content that might be just the inner parts of a diff,
    // or a malformed block. This is more lenient.
    const parts = blockText.split(separatorMarker);
    if (parts.length >= 2) {
      searchText = parts[0]
        .replace(new RegExp(`^${searchMarker}\\n?`), "")
        .trim();
      // For replaceText, take everything after the first separator,
      // and remove a potential trailing replaceMarker.
      replaceText = parts.slice(1).join(separatorMarker)
        .replace(new RegExp(`\\n?${replaceMarker}$`), "")
        .trim();

      if (searchText) {
        return { search: searchText, replace: replaceText };
      }
    }
  }
  return null;
}

/**
 * Extracts code modifications from a response string.
 * AI responses might contain modifications in two primary ways:
 * 1. Standard diff format: Directly embedded `<<<<<<< SEARCH ... ======= ... >>>>>>> REPLACE` blocks.
 * 2. Markdown code blocks: Diff content wrapped within triple backticks (e.g., ```diff ... ```).
 * This function tries to find and parse both, prioritizing direct matches and then
 * attempting to parse content within markdown code blocks.
 * It uses a Set to ensure that identical modification blocks are not added multiple times
 * if they happen to appear in both formats or are repeated.
 */
export const extractCodeModification = (response: string): string[] => {
  // console.warn("extractCodeModification - Response length:", response.length); // Changed to warn, or can be removed if too verbose

  const modifications: string[] = [];
  const seenModifications = new Set<string>(); // To avoid duplicates

  // Strategy 1: Find standard diff blocks directly in the response
  const directMatches = response.match(CODE_MODIFICATION_REGEX) || [];
  for (const match of directMatches) {
    if (!seenModifications.has(match)) {
      modifications.push(match);
      seenModifications.add(match);
    }
  }

  // Strategy 2: Find markdown code blocks and try to parse their content
  // Regex to capture content within ``` ```, optionally with a language tag
  const codeBlockRegex = /```(?:[a-zA-Z0-9\-_]+)?\n([\s\S]*?)\n```/g;
  let markdownMatch;
  while ((markdownMatch = codeBlockRegex.exec(response)) !== null) {
    const blockContent = markdownMatch[1].trim(); // Content within the backticks
    const parsedDiffObject = parseSingleDiffBlock(blockContent);
    if (parsedDiffObject) {
      const formattedModString = formatCodeModification(parsedDiffObject);
      if (!seenModifications.has(formattedModString)) {
        modifications.push(formattedModString);
        seenModifications.add(formattedModString);
      }
    }
  }

  // console.warn( // Changed to warn, or can be removed
  //   "extractCodeModification - Total modifications extracted:",
  //   modifications.length,
  // );
  return modifications;
};

/**
 * Parses a single, well-formed code modification string (e.g., one complete SEARCH/REPLACE block)
 * into its constituent search and replace parts.
 * This function expects the input `mod` to be a string that starts with `<<<<<<< SEARCH`
 * and ends with `>>>>>>> REPLACE`, containing one `=======` separator.
 * It trims whitespace from the extracted search and replace contents.
 */
function parseModification(mod: string): CodeModification | null {
  // These logs are useful for debugging parsing issues, so changed to warn.
  // console.warn("parseModification - Modification length:", mod.length);
  // console.warn(
  //   "parseModification - Contains SEARCH marker:",
  //   mod.includes(SEARCH_REPLACE_MARKERS.SEARCH_START),
  // );
  // console.warn(
  //   "parseModification - Contains SEPARATOR marker:",
  //   mod.includes(SEARCH_REPLACE_MARKERS.SEPARATOR),
  // );
  // console.warn(
  //   "parseModification - Contains REPLACE marker:",
  //   mod.includes(SEARCH_REPLACE_MARKERS.REPLACE_END),
  // );
  // console.warn(
  //   "parseModification - Modification start:",
  //   JSON.stringify(mod.substring(0, 50) + (mod.length > 50 ? "..." : "")),
  // );

  const parts = mod
    .replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "")
    .split(SEARCH_REPLACE_MARKERS.SEPARATOR);

  // console.warn("parseModification - Split parts count:", parts.length); // Useful for debugging

  if (parts.length === 2) {
    const search = parts[0].trim();
    const replace = parts[1].trim();

    // console.warn("parseModification - Search part length:", search.length); // Useful for debugging
    // console.warn("parseModification - Replace part length:", replace.length); // Useful for debugging

    return {
      search,
      replace,
    };
  }

  console.warn(
    "parseModification - Failed to parse modification, parts count:",
    parts.length,
  );
  return null;
}

/**
 * Loads messages from localStorage for a given code space
 */
export const loadMessages = (codeSpace: string): Message[] => {
  if (!codeSpace) {
    throw new Error("Code space must be provided");
  }

  const key = `chatMessages-${codeSpace}`;
  let rawMessages: Message[] = [];

  try {
    rawMessages = JSON.parse(localStorage.getItem(key) || "[]");
  } catch (error) {
    console.error("Error loading messages:", error);
    return [];
  }

  const validMessages = rawMessages.filter((m) => !!m.role);

  return validMessages.reduce((acc, current, index) => {
    if (index === 0 || current.role !== validMessages[index - 1].role) {
      acc.push(current);
    }
    return acc;
  }, [] as Message[]);
};

/**
 * Applies code modifications to the current code
 */
function applyCodeModifications(
  code: string,
  modifications: string[],
  applyAll = true,
): string {
  // console.warn("applyCodeModifications - Code length:", code.length); // Changed to warn
  // console.warn( // Changed to warn
  //   "applyCodeModifications - Modifications count:",
  //   modifications.length,
  // );
  // console.warn("applyCodeModifications - Apply all:", applyAll); // Changed to warn

  // This function iterates through a list of modification strings (each being a
  // complete SEARCH/REPLACE block). For each block, it parses it into
  // search/replace parts and then applies the replacement to the `code`.
  // The `replacePreservingWhitespace` utility is used for the actual replacement,
  // which attempts to be smart about whitespace.
  // If `applyAll` is false, only the first modification in the list is applied.
  // This is useful if the AI provides multiple alternative modifications and only one should be tried.

  try {
    let result = code;
    const modsToApply = applyAll ? modifications : modifications.slice(0, 1);
    // console.warn( // Changed to warn
    //   "applyCodeModifications - Mods to apply count:",
    //   modsToApply.length,
    // );

    modsToApply.forEach((mod, index) => {
      // console.warn( // Changed to warn
      //   `applyCodeModifications - Applying modification ${index + 1}`,
      // );
      const parsed = parseModification(mod);

      if (parsed) {
        // console.warn( // Changed to warn
        //   `applyCodeModifications - Search part ${index + 1} length:`,
        //   parsed.search.length,
        // );
        // console.warn( // Changed to warn
        //  `applyCodeModifications - Replace part ${index + 1} length:`,
        //  parsed.replace.length,
        // );
        // const exactMatch = result.includes(parsed.search);
        // console.warn( // Changed to warn
        //   `applyCodeModifications - Exact match for modification ${index + 1}:`,
        //   exactMatch,
        // );

        result = replacePreservingWhitespace(
          result,
          parsed.search,
          parsed.replace,
        );
        // const changed = beforeLength !== afterLength || result !== code;
        // console.warn( // Changed to warn
        //   `applyCodeModifications - Modification ${index + 1} applied:`,
        //   changed,
        // );
        // console.warn( // Changed to warn
        //   `applyCodeModifications - Length change:`,
        //   afterLength - beforeLength,
        // );
      } else {
        console.warn(
          `applyCodeModifications - Failed to parse modification ${
            index + 1
          }. Modification string: "${mod.substring(0, 100)}..."`,
        );
      }
    });

    // console.warn("applyCodeModifications - Overall changes made:", result !== code); // Changed to warn
    return result;
  } catch (error) {
    // This catch block is a safety net. Errors during parsing or replacement
    // should ideally be handled more gracefully, but if an unexpected error occurs,
    // we log it and return the original code to prevent corruption.
    console.error("Error applying code modifications:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );
    return code;
  }
}

/**
 * Updates code by applying all search/replace modifications
 */
export const updateSearchReplace = (
  instructions: string,
  codeNow: string,
): string => {
  // console.warn( // Changed to warn
  //   "updateSearchReplace - Instructions length:",
  //   instructions.length,
  // );
  // console.warn("updateSearchReplace - Code length:", codeNow.length); // Changed to warn

  const modifications = extractCodeModification(instructions);
  // console.warn( // Changed to warn
  //   "updateSearchReplace - Extracted modifications count:",
  //   modifications.length,
  // );

  if (modifications.length === 0) {
    console.warn(
      "updateSearchReplace - No modifications extracted from instructions",
    );
    // console.warn("updateSearchReplace - Instructions:", instructions); // Changed to warn
    return codeNow;
  }

  // Log each modification
  modifications.forEach((mod, index) => {
    // console.warn( // Changed to warn
    //   `updateSearchReplace - Modification ${index + 1}:`,
    //   mod.substring(0, 100) + (mod.length > 100 ? "..." : ""),
    // );

    // Parse the modification to get search and replace parts
    const parsed = parseModification(mod);
    if (parsed) {
      // console.warn( // Changed to warn
      //   `updateSearchReplace - Search part ${index + 1} length:`,
      //   parsed.search.length,
      // );
      // console.warn( // Changed to warn
      //   `updateSearchReplace - Replace part ${index + 1} length:`,
      //   parsed.replace.length,
      // );

      // const exactMatch = codeNow.includes(parsed.search);
      // console.warn( // Changed to warn
      //   `updateSearchReplace - Exact match for modification ${index + 1}:`,
      //   exactMatch,
      // );

      // const codeNoWS = codeNow.replace(/\s+/g, "");
      // const searchNoWS = parsed.search.replace(/\s+/g, "");
      // console.warn( // Changed to warn
      //   `updateSearchReplace - Match ignoring whitespace for modification ${index + 1}:`,
      //   codeNoWS.includes(searchNoWS),
      // );
    } else {
      console.warn(
        `updateSearchReplace - Failed to parse modification ${index + 1}`,
      );
    }
  });

  const result = applyCodeModifications(codeNow, modifications, true);

  // const changed = result !== codeNow;
  // console.warn("updateSearchReplace - Changes made:", changed); // Changed to warn

  return result;
};

/**
 * Updates code by applying only the first search/replace modification
 */
export const replaceFirstCodeMod = (
  instructions: string,
  codeNow: string,
): string => {
  const modifications = extractCodeModification(instructions);
  return applyCodeModifications(codeNow, modifications, false);
};
