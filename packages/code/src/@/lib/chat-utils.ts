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
      content: (newMessage.content as string).startsWith(lastMessage.content as string) ? newMessage.content as string : lastMessage.content as string + newMessage.content as string,
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
  const content = lines.join("\n").split(SEARCH_REPLACE_MARKERS.SEPARATOR);
  if (content.length >= 2) {
    return formatCodeModification({
      search: content[0].trim(),
      replace: content[1].trim(),
    });
  }

  return null;
}

/**
 * Extracts code modifications from a response string
 */
export const extractCodeModification = (response: string): string[] => {
  const modifications: string[] = [];

  // Extract modifications from regular format
  const regexMatches = response.match(CODE_MODIFICATION_REGEX) || [];
  modifications.push(...regexMatches);

  // Extract modifications from code blocks
  const codeBlockMatches = response.match(/```[\s\S]*?```/g) || [];
  codeBlockMatches.forEach((block) => {
    const modification = parseCodeBlock(block);
    if (modification) {
      modifications.push(modification);
    }
  });

  return modifications;
};

/**
 * Parses a code modification string into search and replace parts
 */
function parseModification(mod: string): CodeModification | null {
  const parts = mod
    .replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "")
    .split(SEARCH_REPLACE_MARKERS.SEPARATOR);

  if (parts.length === 2) {
    return {
      search: parts[0].trim(),
      replace: parts[1].trim(),
    };
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
  try {
    let result = code;
    const modsToApply = applyAll ? modifications : modifications.slice(0, 1);

    modsToApply.forEach((mod) => {
      const parsed = parseModification(mod);
      if (parsed) {
        result = replacePreservingWhitespace(
          result,
          parsed.search,
          parsed.replace,
        );
      }
    });

    return result;
  } catch (error) {
    console.error("Error applying code modifications:", error);
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
