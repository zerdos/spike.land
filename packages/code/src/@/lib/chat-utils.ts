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
 * Parses a code block to extract search and replace parts
 */
function parseCodeBlock(block: string): string | null {
  const cleanBlock = block.trim();
  const lines = cleanBlock.split("\n");

  // Remove code fence markers if present
  if (lines[0].includes("```")) {
    lines.shift();
  }
  if (lines[lines.length - 1].includes("```")) {
    lines.pop();
  }

  // Handle standard SEARCH/REPLACE format
  if (cleanBlock.includes(SEARCH_REPLACE_MARKERS.SEARCH_START)) {
    const content = lines.join("\n")
      .replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "")
      .split(SEARCH_REPLACE_MARKERS.SEPARATOR);

    if (content.length === 2) {
      return formatCodeModification({
        search: content[0].trim(),
        replace: content[1].trim(),
      });
    }
    return null;
  }

  // Handle alternative format with multiple separators
  const separatorIndices = [];
  let startIdx = 0;
  const fullContent = lines.join("\n");
  
  while (true) {
    const idx = fullContent.indexOf(SEARCH_REPLACE_MARKERS.SEPARATOR, startIdx);
    if (idx === -1) break;
    separatorIndices.push(idx);
    startIdx = idx + SEARCH_REPLACE_MARKERS.SEPARATOR.length;
  }

  if (separatorIndices.length > 0) {
    const search = fullContent.substring(0, separatorIndices[0]).trim();
    const replace = fullContent.substring(separatorIndices[0] + SEARCH_REPLACE_MARKERS.SEPARATOR.length, separatorIndices[1] || fullContent.length).trim();
    return formatCodeModification({
      search,
      replace,
    });
  }

  return null;
}

/**
 * Extracts code modifications from a response string
 */
export const extractCodeModification = (response: string): string[] => {
  console.debug("extractCodeModification - Response length:", response.length);
  console.debug(
    "extractCodeModification - Contains SEARCH marker:",
    response.includes(SEARCH_REPLACE_MARKERS.SEARCH_START),
  );
  console.debug(
    "extractCodeModification - Contains SEPARATOR marker:",
    response.includes(SEARCH_REPLACE_MARKERS.SEPARATOR),
  );
  console.debug(
    "extractCodeModification - Contains REPLACE marker:",
    response.includes(SEARCH_REPLACE_MARKERS.REPLACE_END),
  );

  const modifications: string[] = [];

  // Extract modifications from regular format
  const regexMatches = response.match(CODE_MODIFICATION_REGEX) || [];
  console.debug("extractCodeModification - Regex matches count:", regexMatches.length);

  if (regexMatches.length > 0 && regexMatches[0]) {
    console.debug(
      "extractCodeModification - First regex match:",
      regexMatches[0].substring(0, 50) + (regexMatches[0].length > 50 ? "..." : ""),
    );
  } else {
    console.debug("extractCodeModification - Regex pattern used:", CODE_MODIFICATION_REGEX);
    console.debug(
      "extractCodeModification - Response sample:",
      response.substring(0, 100) + (response.length > 100 ? "..." : ""),
    );
  }

  modifications.push(...regexMatches);

  // Extract modifications from code blocks
  const codeBlockMatches = response.match(/```[\s\S]*?```/g) || [];
  console.debug("extractCodeModification - Code block matches count:", codeBlockMatches.length);

  codeBlockMatches.forEach((block, index) => {
    console.debug(`extractCodeModification - Code block ${index + 1} length:`, block.length);
    const modification = parseCodeBlock(block);
    if (modification) {
      console.debug(`extractCodeModification - Successfully parsed code block ${index + 1}`);
      modifications.push(modification);
    } else {
      console.warn(`extractCodeModification - Failed to parse code block ${index + 1}`);
      console.debug(
        `extractCodeModification - Code block ${index + 1} content:`,
        block.substring(0, 50) + (block.length > 50 ? "..." : ""),
      );
    }
  });

  console.debug("extractCodeModification - Total modifications extracted:", modifications.length);
  return modifications;
};

/**
 * Parses a code modification string into search and replace parts
 */
function parseModification(mod: string): CodeModification | null {
  console.debug("parseModification - Modification length:", mod.length);
  console.debug(
    "parseModification - Contains SEARCH marker:",
    mod.includes(SEARCH_REPLACE_MARKERS.SEARCH_START),
  );
  console.debug(
    "parseModification - Contains SEPARATOR marker:",
    mod.includes(SEARCH_REPLACE_MARKERS.SEPARATOR),
  );
  console.debug(
    "parseModification - Contains REPLACE marker:",
    mod.includes(SEARCH_REPLACE_MARKERS.REPLACE_END),
  );

  // Log the first few characters to help identify format issues
  console.debug(
    "parseModification - Modification start:",
    JSON.stringify(mod.substring(0, 50) + (mod.length > 50 ? "..." : "")),
  );

  const parts = mod
    .replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "")
    .split(SEARCH_REPLACE_MARKERS.SEPARATOR);

  console.debug("parseModification - Split parts count:", parts.length);

  if (parts.length === 2) {
    const search = parts[0].trim();
    const replace = parts[1].trim();

    console.debug("parseModification - Search part length:", search.length);
    console.debug("parseModification - Replace part length:", replace.length);

    return {
      search,
      replace,
    };
  }

  console.warn("parseModification - Failed to parse modification, parts count:", parts.length);
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
  console.debug("applyCodeModifications - Code length:", code.length);
  console.debug("applyCodeModifications - Modifications count:", modifications.length);
  console.debug("applyCodeModifications - Apply all:", applyAll);

  try {
    let result = code;
    const modsToApply = applyAll ? modifications : modifications.slice(0, 1);
    console.debug("applyCodeModifications - Mods to apply count:", modsToApply.length);

    modsToApply.forEach((mod, index) => {
      console.debug(`applyCodeModifications - Applying modification ${index + 1}`);
      const parsed = parseModification(mod);

      if (parsed) {
        console.debug(
          `applyCodeModifications - Search part ${index + 1} length:`,
          parsed.search.length,
        );
        console.debug(
          `applyCodeModifications - Replace part ${index + 1} length:`,
          parsed.replace.length,
        );

        // Check if search exists in result (exact match)
        const exactMatch = result.includes(parsed.search);
        console.debug(
          `applyCodeModifications - Exact match for modification ${index + 1}:`,
          exactMatch,
        );

        // Apply the modification
        const beforeLength = result.length;
        result = replacePreservingWhitespace(
          result,
          parsed.search,
          parsed.replace,
        );
        const afterLength = result.length;

        // Check if the modification was applied
        const changed = beforeLength !== afterLength || result !== code;
        console.debug(`applyCodeModifications - Modification ${index + 1} applied:`, changed);
        console.debug(`applyCodeModifications - Length change:`, afterLength - beforeLength);
      } else {
        console.warn(`applyCodeModifications - Failed to parse modification ${index + 1}`);
      }
    });

    // Check if any changes were made
    const changed = result !== code;
    console.debug("applyCodeModifications - Overall changes made:", changed);

    return result;
  } catch (error) {
    console.error("Error applying code modifications:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
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
  console.debug("updateSearchReplace - Instructions length:", instructions.length);
  console.debug("updateSearchReplace - Code length:", codeNow.length);

  const modifications = extractCodeModification(instructions);
  console.debug("updateSearchReplace - Extracted modifications count:", modifications.length);

  if (modifications.length === 0) {
    console.warn("updateSearchReplace - No modifications extracted from instructions");
    console.debug("updateSearchReplace - Instructions:", instructions);
    return codeNow;
  }

  // Log each modification
  modifications.forEach((mod, index) => {
    console.debug(
      `updateSearchReplace - Modification ${index + 1}:`,
      mod.substring(0, 100) + (mod.length > 100 ? "..." : ""),
    );

    // Parse the modification to get search and replace parts
    const parsed = parseModification(mod);
    if (parsed) {
      console.debug(`updateSearchReplace - Search part ${index + 1} length:`, parsed.search.length);
      console.debug(
        `updateSearchReplace - Replace part ${index + 1} length:`,
        parsed.replace.length,
      );

      // Check if search exists in code (exact match)
      const exactMatch = codeNow.includes(parsed.search);
      console.debug(`updateSearchReplace - Exact match for modification ${index + 1}:`, exactMatch);

      // Check if search exists in code (ignoring whitespace)
      const codeNoWS = codeNow.replace(/\s+/g, "");
      const searchNoWS = parsed.search.replace(/\s+/g, "");
      console.debug(
        `updateSearchReplace - Match ignoring whitespace for modification ${index + 1}:`,
        codeNoWS.includes(searchNoWS),
      );
    } else {
      console.warn(`updateSearchReplace - Failed to parse modification ${index + 1}`);
    }
  });

  const result = applyCodeModifications(codeNow, modifications, true);

  // Check if any changes were made
  const changed = result !== codeNow;
  console.debug("updateSearchReplace - Changes made:", changed);

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
