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
  if (!oldCode.includes("<<<<<<< SEARCH")) {
    return codeNow;
  }

  try {
    const codeToReplace = extractCodeModification(oldCode);
    const modifications = codeToReplace
      .split(MODIFICATION_SEPARATOR)
      .filter((mod) => SEARCH_REPLACE_MARKERS.some((marker) => mod.includes(marker)))
      .map((mod) => mod.replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, ""));

    return modifications.reduce((acc, modification) => {
      const [search, replace] = modification.split("=======");

      const result = replacePreservingWhitespace(
        acc,
        search.trim(),
        replace.split("\n").slice(1).map((x) => x.trim()).filter((x) => x).join(
          "\n",
        ),
      );

      console.table({
        success: result !== acc,
        search: search.trim(),
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
