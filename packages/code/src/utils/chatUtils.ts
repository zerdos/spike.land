import { replacePreservingWhitespace } from "@src/replacePreservingWhitespace";
import { Message } from "../types/Message";

const CODE_MODIFICATION_REGEX = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
const MODIFICATION_SEPARATOR = ">>>>>>> REPLACE\n\n<<<<<<< SEARCH";
const SEARCH_REPLACE_MARKERS = ["<<<<<<< SEARCH", "=======", ">>>>>>> REPLACE"];

export const extractCodeModification = (response: string): string => {
  return response.match(CODE_MODIFICATION_REGEX)?.join("\n\n") || "";
};

export const loadMessages = (codeSpace: string): Message[] => {
  const key = `chatMessages-${codeSpace}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const updateSearchReplace = (codeeee: string, codeNow: string, em = extractCodeModification): string => {
  const extractCodeModification = em;
  if (!codeeee.includes("<<<<<<< SEARCH")) {
    return codeNow;
  }

  try {
    const codeToReplace = extractCodeModification(codeeee);
    const modifications = codeToReplace
      .split(MODIFICATION_SEPARATOR)
      .filter(mod => SEARCH_REPLACE_MARKERS.some(marker => mod.includes(marker)))
      .map(mod => mod.replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, ""));

    return modifications.reduce((acc, modification) => {
      const [search, replace] = modification.split("=======");

      const result = replacePreservingWhitespace(
        acc,
        search.trim(),
        replace.split("\n").slice(1).map(x => x.trim()).filter(x => x).join("\n"),
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
