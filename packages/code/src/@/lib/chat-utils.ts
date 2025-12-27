import { replacePreservingWhitespace } from "@/lib/diff-utils";
import type { Message, MessageContent, TextPart } from "@/lib/interfaces";

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

function getTextFromMessageContent(content: MessageContent): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .filter((part): part is TextPart => part.type === "text")
      .map((part) => part.text)
      .join("");
  }
  return "";
}
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

  if (
    lastMessage!.role === newMessage.role && newMessage.role === "assistant"
  ) {
    const newMessageText = getTextFromMessageContent(newMessage.content);
    const lastMessageText = getTextFromMessageContent(lastMessage!.content);
    messagesCopy[messagesCopy.length - 1] = {
      ...lastMessage!,
      id: newMessage.id,
      role: lastMessage!.role,
      content: newMessageText.startsWith(lastMessageText)
        ? newMessageText
        : lastMessageText + newMessageText,
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
    const searchContent = fullBlockMatch[1];
    const replaceContentRaw = fullBlockMatch[2];

    // If the raw replace content itself contains more separators,
    // take only the part before the first such internal separator.
    const replaceParts = replaceContentRaw?.split(separatorMarker);
    const finalReplaceContent = replaceParts?.[0];

    const searchText = searchContent?.trim() ?? "";
    const replaceText = finalReplaceContent?.trim() ?? "";

    // Search text cannot be empty, replace text can be empty (for deletions)
    if (searchText) {
      return { search: searchText, replace: replaceText };
    }
  } else {
    // Fallback for content that might be just the inner parts of a diff,
    // or a malformed block. This is more lenient.
    // This handles cases where the content is like "SEARCH_CONTENT ======= REPLACE_CONTENT"
    // potentially with extra "=======" and content afterwards, which should be ignored.
    const parts = blockText.split(separatorMarker);
    if (parts.length >= 2) { // We need at least one separator to define search and replace parts
      // Trim the part first, then check for and remove markers.
      let tempSearch = parts[0]!.trim();
      if (tempSearch.startsWith(searchMarker)) {
        // Remove marker and then trim any leading whitespace from the actual search content.
        tempSearch = tempSearch.substring(searchMarker.length).trimStart();
      }
      searchText = tempSearch;

      // Replace text is the content of the second part (parts[1])
      // Any subsequent parts (from further separators) are ignored.
      // Trim the part first, then check for and remove markers.
      let tempReplace = parts[1]?.trim() ?? "";
      if (tempReplace.endsWith(replaceMarker)) {
        // Remove marker and then trim any trailing whitespace from the actual replace content.
        tempReplace = tempReplace.substring(
          0,
          tempReplace.length - replaceMarker.length,
        ).trimEnd();
      }
      replaceText = tempReplace;

      // Only return a valid object if searchText is not empty. Replace text can be empty (for deletions).
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
  const modifications: string[] = [];
  const seenModifications = new Set<string>(); // To avoid duplicates

  // Strategy 1: Find standard diff blocks directly in the response
  const directMatches = response.match(CODE_MODIFICATION_REGEX) || [];
  for (const match of directMatches) {
    // Parse the direct match to get a canonical form for the 'seen' set
    const parsedDirectMatch = parseSingleDiffBlock(match);
    if (parsedDirectMatch) {
      const canonicalDirectMatch = formatCodeModification(parsedDirectMatch);
      if (!seenModifications.has(canonicalDirectMatch)) {
        modifications.push(match); // Push the original match
        seenModifications.add(canonicalDirectMatch); // Add canonical form to seen set
      }
    } else {
      // Fallback: if parsing fails (shouldn't happen for valid CODE_MODIFICATION_REGEX match),
      // add the raw match to avoid missing it, though de-duplication might be imperfect.
      if (!seenModifications.has(match)) {
        modifications.push(match);
        seenModifications.add(match);
      }
    }
  }

  // Strategy 2: Find markdown code blocks and try to parse their content
  // Regex to capture content within ``` ```, optionally with a language tag.
  // Allows for optional whitespace before the closing ``` via \s*
  const codeBlockRegex = /```(?:[a-zA-Z0-9\-_]+)?\n([\s\S]*?)\n\s*```/g;
  let markdownMatch;
  while ((markdownMatch = codeBlockRegex.exec(response)) !== null) {
    const blockContent = markdownMatch[1]?.trim(); // Content within the backticks
    if (typeof blockContent === "string") {
      const parsedDiffObject = parseSingleDiffBlock(blockContent);
      if (parsedDiffObject) {
        const formattedModString = formatCodeModification(parsedDiffObject);
        if (!seenModifications.has(formattedModString)) {
          modifications.push(formattedModString);
          seenModifications.add(formattedModString);
        }
      }
    }
  }

  return modifications.sort();
};

/**
 * Parses a single, well-formed code modification string (e.g., one complete SEARCH/REPLACE block)
 * into its constituent search and replace parts.
 * This function expects the input `mod` to be a string that starts with `<<<<<<< SEARCH`
 * and ends with `>>>>>>> REPLACE`, containing one `=======` separator.
 * It trims whitespace from the extracted search and replace contents.
 */
function parseModification(mod: string): CodeModification | null {
  const parts = mod
    .replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "")
    .split(SEARCH_REPLACE_MARKERS.SEPARATOR);

  if (parts.length === 2) {
    const search = parts[0]!.trim();
    const replace = parts[1]?.trim() ?? "";

    return {
      search,
      replace,
    };
  }

  if (process.env["NODE_ENV"] !== "test") {
    console.warn(
      "parseModification - Failed to parse modification, parts count:",
      parts.length,
    );
  }
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
    if (index === 0 || current.role !== validMessages[index - 1]!.role) {
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

    modsToApply.forEach((mod, index) => {
      const parsed = parseModification(mod);

      if (parsed) {
        result = replacePreservingWhitespace(
          result,
          parsed.search,
          parsed.replace,
        );
      } else {
        if (process.env["NODE_ENV"] !== "test") {
          console.warn(
            `applyCodeModifications - Failed to parse modification ${
              index + 1
            }. Modification string: "${mod.substring(0, 100)}..."`,
          );
        }
      }
    });

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
  const modifications = extractCodeModification(instructions);

  if (modifications.length === 0) {
    if (process.env["NODE_ENV"] !== "test") {
      console.warn(
        "updateSearchReplace - No modifications extracted from instructions",
      );
    }
    return codeNow;
  }

  // Validate each modification can be parsed
  modifications.forEach((mod, index) => {
    const parsed = parseModification(mod);
    if (!parsed) {
      if (process.env["NODE_ENV"] !== "test") {
        console.warn(
          `updateSearchReplace - Failed to parse modification ${index + 1}`,
        );
      }
    }
  });

  return applyCodeModifications(codeNow, modifications, true);
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
