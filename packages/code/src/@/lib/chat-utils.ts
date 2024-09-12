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
  const extractCodeModification = em;
  if (!oldCode.includes("=======")) {
    return codeNow;
  }

  try {
    const codeBlocks = oldCode.match(/```[\s\S]*?```/g) || [];
    const modifications = codeBlocks
      .map(block => {
        const parts = block.split("=======");
        if (parts.length < 2) return null;
        const search = parts[0].replace(/^```[\w]*\n/, "").replace(/<<<<<<< SEARCH\n?/, "").trim();
        const replace = parts[parts.length - 1].replace(/>>>>>>> REPLACE\n?```$/, "").trim();
        return { search, replace };
      })
      .filter(mod => mod !== null && mod.search && mod.replace);

    return modifications.reduce((acc, mod) => {
      if (!mod) return acc;
      const { search, replace } = mod;
      const result = acc.replace(new RegExp(escapeRegExp(search), 'g'), replace);

      console.table({
        success: result !== acc,
        search,
        replace,
        before: acc,
        after: result,
      });

      return result;
    }, codeNow);
  } catch (error) {
    console.error("Error during code modification:", error);
    return codeNow;
  }
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
