import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { Message } from "@/lib/interfaces";

const CODE_MODIFICATION_REGEX = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
const MODIFICATION_SEPARATOR = ">>>>>>> REPLACE\n\n<<<<<<< SEARCH";
const SEARCH_REPLACE_MARKERS = ["<<<<<<< SEARCH", "=======", ">>>>>>> REPLACE"];

export const extractCodeModification = (response: string): string => {
  return response.match(CODE_MODIFICATION_REGEX)?.join("\n\n") || "";
};

export const loadMessages = (codeSpace: string): Message[] => {
  const key = `chatMessages-${codeSpace}`;
  const rawMessages = JSON.parse(localStorage.getItem(key) || "[]") as Message[];

  // Filter out messages without a role
  const validMessages = rawMessages.filter(m => !!m.role);

  // Remove consecutive messages with the same role
  const uniqueRoleMessages = validMessages.reduce((acc, current, index) => {
    if (index === 0 || current.role !== validMessages[index - 1].role) {
      acc.push(current);
    }
    return acc;
  }, [] as Message[]);

  return uniqueRoleMessages;
};

export const updateSearchReplace = (
  oldCode: string,
  codeNow: string,
  em = extractCodeModification,
): string => {
  if (!oldCode.includes("=======")) {
    return codeNow;
  }

  try {
    const codeBlocks = oldCode.match(/```[\s\S]*?```/g) || [];
    const modifications = codeBlocks
      .map(block => {
        const searchMatch = block.match(/<<<<<<< SEARCH\n([\s\S]*?)(?=\n=======)/);
        const replaceMatch = block.match(/=======\n([\s\S]*?)(?=\n>>>>>>> REPLACE)/);
        if (!searchMatch || !replaceMatch) return null;
        const search = searchMatch[1].trim();
        const replace = replaceMatch[1].trim();
        return { search, replace };
      })
      .filter((mod): mod is { search: string; replace: string } => mod !== null && !!mod.search && !!mod.replace);

    return modifications.reduce((acc, { search, replace }) => {
      return acc.replace(new RegExp(escapeRegExp(search), "g"), replace);
    }, codeNow);
  } catch (error) {
    console.error("Error during code modification:", error);
    return codeNow;
  }
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const extractCodeModification = (response: string): string => {
  const codeBlocks = response.match(/```[\s\S]*?```/g) || [];
  return codeBlocks
    .filter(block => block.includes("<<<<<<< SEARCH") && block.includes(">>>>>>> REPLACE"))
    .join("\n\n");
};
