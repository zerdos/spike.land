import { replacePreservingWhitespace } from "@src/replacePreservingWhitespace";
import { Message } from "../types/Message";

export const getCodeSpace = (): string => location.pathname.slice(1).split("/")[1];


export const extractCodeModification = (response: string): string => {
  const regex = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
  return response.match(regex)?.join("\n\n") || "";
};

export const loadMessages = (codeSpace: string): Message[] => 
  JSON.parse(localStorage.getItem(`chatMessages-${codeSpace}`) || "[]");

export const updateSearchReplace = (codeeee: string, codeNow: string): string => {
  let starterCode = codeNow;
  if (codeeee.includes("<<<<<<< SEARCH")) {
    try {
      const codeToReplace = extractCodeModification(codeeee);
      const modz = codeToReplace.split(">>>>>>> REPLACE\n\n<<<<<<< SEARCH") || [codeToReplace];

      const modifications = modz
        .filter((mod) => mod.includes("=======") || mod.includes(">>>>>>> REPLACE") || mod.includes("<<<<<<< SEARCH"))
        .map((mod) => mod.split(">>>>>>> REPLACE").join("").split("<<<<<<< SEARCH").join(""));

      modifications.forEach((modification) => {
        const [search, replaced] = modification.split("=======");
        const before = starterCode;
        starterCode = replacePreservingWhitespace(starterCode, search.trim(), replaced);
        console.table({ success: starterCode !== before, search: search.trim(), replaced, before, after: starterCode });
      });
    } catch (error) {
      console.error("Error during code modification:", error);
    }
  }
  return starterCode;
};
