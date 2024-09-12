import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { Message } from "@/lib/interfaces";

const CODE_MODIFICATION_REGEX = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
const MODIFICATION_SEPARATOR = ">>>>>>> REPLACE\n\n<<<<<<< SEARCH";
const SEARCH_REPLACE_MARKERS = ["<<<<<<< SEARCH", "=======", ">>>>>>> REPLACE"];

export const extractCodeModification = (response: string): string => {
  const codeBlocks = response.match(/```[\s\S]*?```/g) || [];
  return codeBlocks
    .filter(block => block.includes("<<<<<<< SEARCH") && block.includes(">>>>>>> REPLACE"))
    .map(block => block.replace(/```[\s\S]*?\n/, "").replace(/\n```$/, ""))
    .join("\n\n");
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
    const modifications = em(oldCode)
      .split(MODIFICATION_SEPARATOR)
      .map(block => {
        const [search, replace] = block.split("=======").map(part =>
          part.replace(/(<<<<<<< SEARCH|>>>>>>> REPLACE)/g, "").trim()
        );
        return { search, replace };
      })
      .filter(mod => mod.search && mod.replace);

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
