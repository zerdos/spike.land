import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { Message } from "@/lib/interfaces";

const CODE_MODIFICATION_REGEX = /(<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE|```[\s\S]*?=======[\s\S]*?```)/g;
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
    const codeToReplace = extractCodeModification(oldCode);
    const modifications = codeToReplace
      .split(/(?=```[\s\S]*?=======[\s\S]*?```|<<<<<<< SEARCH)/)
      .filter((mod) => mod.includes("======="))
      .map((mod) => mod.replace(/```[\s\S]*?\n|<<<<<<< SEARCH|>>>>>>> REPLACE/g, "").trim());

    return modifications.reduce((acc, modification) => {
      const [search, replace] = modification.split("=======").map(part => part.trim());

      const result = replacePreservingWhitespace(
        acc,
        search,
        replace.split("\n").map((x) => x.trim()).filter((x) => x).join("\n"),
      );

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
