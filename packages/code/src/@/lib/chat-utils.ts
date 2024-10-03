import { replacePreservingWhitespace } from "@/lib/diff-utils";
import type { Message } from "@/lib/interfaces";
import { produce } from "immer";

export function messagesPush(messages: Message[], newMessage: Message): Message[] {
  console.log("Pushing new message", { role: newMessage.role });
  return produce(messages, draft => {
    if (!draft.length) {
      draft.push({ ...newMessage });
      return;
    }
    const lastMessage = draft[draft.length - 1];
    const newId = typeof lastMessage.id === "number" ? String(lastMessage.id + 1) : String(Date.now());
    if (lastMessage.role === newMessage.role) {
      draft[draft.length - 1] = { ...newMessage, id: newId };
    } else {
      draft.push({ ...newMessage, id: newId });
    }
  });
}

const CODE_MODIFICATION_REGEX = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
const SEARCH_REPLACE_MARKERS = ["<<<<<<< SEARCH", "=======", ">>>>>>> REPLACE"];

export const formatCodeAsSection = (codeSpace: string, code: string): string => `
# ${codeSpace}.tsx

\`\`\`tsx
${code}
\`\`\`
`;

export const extractCodeModification = (response: string): string[] => {
  const match = response.match(CODE_MODIFICATION_REGEX) || [];

  const codeBlockMatches = response.match(/```[\s\S]*?```/g);
  if (!codeBlockMatches) return match;

  const myBlocks = codeBlockMatches.filter((block) => SEARCH_REPLACE_MARKERS.some((marker) => block.includes(marker)))
    .map((myBlock) => {
      const block = myBlock.trim().split("<<<<<<< SEARCH").join("=======").split(">>>>>>> REPLACE").join("=======")
        .split("\n");
      block.shift();
      block.pop();

      const parts = block.map(x => x.trim()).filter(x => x).join("\n").split("=======").filter(part =>
        part.trim().length > 0
      );

      if (parts.length < 2) return ``;
      if (parts.length === 2) {
        return `<<<<<<< SEARCH
${parts[0]}
======= 
${parts[1]}
>>>>>>> REPLACE`;
      }
      if (parts.length > 2) {
        return `<<<<<<< SEARCH
${parts[0].trim()}
=======
${parts[1].trim()}
>>>>>>> REPLACE`;
      }
      return ``;
    }).map((block) => block.trim()).filter((block) => block.length > 0);

  return [...match, ...myBlocks];
};

export const loadMessages = (codeSpace: string): Message[] => {
  const key = `chatMessages-${codeSpace}`;
  const rawMessages = JSON.parse(localStorage.getItem(key) || "[]") as Message[];

  const validMessages = rawMessages.filter(m => !!m.role);

  const uniqueRoleMessages = validMessages.reduce((acc, current, index) => {
    if (index === 0 || current.role !== validMessages[index - 1].role) {
      acc.push(current);
    }
    return acc;
  }, [] as Message[]);

  return uniqueRoleMessages;
};

export const updateSearchReplace = (instructions: string, codeNow: string): string => {
  try {
    let replacedCode = codeNow;

    extractCodeModification(instructions).forEach((mod: string) => {
      const [search, replace] = mod.replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "").split("=======");

      if (search && replace) {
        replacedCode = replacePreservingWhitespace(
          replacedCode,
          search.trim(),
          replace.trim(),
        );
      }
    });

    return replacedCode;
  } catch (error) {
    console.error("Error in updateSearchReplace:", error);
    return codeNow;
  }
};

export const replaceFirstCodeMod = (instructions: string, codeNow: string): string => {
  try {
    let replacedCode = codeNow;

    const mods = extractCodeModification(instructions);

    if (mods.length > 0) {
      const [search, replace] = mods[0].replace(/<<<<<<< SEARCH|>>>>>>> REPLACE/g, "").split("=======");

      if (search && replace) {
        replacedCode = replacePreservingWhitespace(
          replacedCode,
          search.trim(),
          replace.trim(),
        );
      }
    }

    return replacedCode;
  } catch (error) {
    console.error("Error in updateSearchReplace:", error);
    return codeNow;
  }
};
