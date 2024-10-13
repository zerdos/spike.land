import type { LanguageMap } from "@/lib/interfaces";

const programmingLanguages: LanguageMap = {
  javascript: ".js",
  typescript: ".ts",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
};

const getLanguage = (lang?: string): string => {
  if (!lang) return "plaintext";
  const lowercaseLang = lang.toLowerCase();

  if (["typescript", "ts"].includes(lowercaseLang)) return "typescript";
  if (["javascript", "js"].includes(lowercaseLang)) return "javascript";
  if (["python", "py"].includes(lowercaseLang)) return "python";

  return programmingLanguages[lowercaseLang] || lowercaseLang;
};

const cleanMessageText = (text: string, isUser: boolean): string => {
  if (isUser && text.includes("The user's first message follows:")) {
    return text
      .split("The user's first message follows:")
      .pop()!
      .trim()
      .split("Reminder from the system:")[0]
      .trim();
  }
  return text;
};

interface ChatMessagePart {
  type: "text" | "code";
  content: string;
  language?: string;
}
const parseMessageParts = (
  text: string,
  state: ParsingState,
): { parts: ChatMessagePart[]; state: ParsingState; } => {
  const parts: ChatMessagePart[] = [];
  let index = 0;

  while (index < text.length) {
    if (state.isInCodeBlock) {
      const codeBlockEnd = text.indexOf("```", index);
      if (codeBlockEnd === -1) {
        // Incomplete code ChatMessageBlock
        state.accumulatedContent += text.slice(index);
        break;
      } else {
        // Complete code block
        state.accumulatedContent += text.slice(index, codeBlockEnd);
        parts.push({
          type: "code",
          language: getLanguage(state.currentLanguage),
          content: state.accumulatedContent,
        });
        index = codeBlockEnd + 3; // Skip closing ```
        state.isInCodeBlock = false;
        state.currentLanguage = undefined;
        state.accumulatedContent = "";
      }
    } else {
      const codeBlockStart = text.indexOf("```", index);
      if (codeBlockStart === -1) {
        // No more code blocks
        const remainingText = text.slice(index).trim();
        if (remainingText.length > 0) {
          parts.push({ type: "text", content: remainingText });
        }
        break;
      } else {
        // Text before the code block
        const textContent = text.slice(index, codeBlockStart).trim();
        if (textContent.length > 0) {
          parts.push({ type: "text", content: textContent });
        }
        index = codeBlockStart + 3; // Skip ```
        // Get language specifier
        const newlineIndex = text.indexOf("\n", index);
        if (newlineIndex === -1) {
          // Incomplete language specifier
          state.isInCodeBlock = true;
          state.currentLanguage = text.slice(index).trim();
          state.accumulatedContent = "";
          break;
        } else {
          state.currentLanguage = text.slice(index, newlineIndex).trim();
          index = newlineIndex + 1;
          state.isInCodeBlock = true;
          state.accumulatedContent = "";
        }
      }
    }
  }

  return { parts, state };
};

const extendTextWithDiffMarkers = (
  text: string,
  state: ParsingState,
): string => {
  let result = "";
  let index = 0;

  while (index < text.length) {
    if (state.isInDiffBlock) {
      const endIndex = text.indexOf(">>>>>>> REPLACE", index);
      if (endIndex === -1) {
        // Diff block not yet complete
        state.accumulatedDiffContent += text.slice(index);
        break;
      } else {
        // Diff block ends here
        state.accumulatedDiffContent += text.slice(index, endIndex + ">>>>>>> REPLACE".length);
        result += "```diff\n" + state.accumulatedDiffContent.trim() + "\n```";
        state.isInDiffBlock = false;
        state.accumulatedDiffContent = "";
        index = endIndex + ">>>>>>> REPLACE".length;
      }
    } else {
      const startIndex = text.indexOf("<<<<<<< SEARCH", index);
      if (startIndex === -1) {
        // No diff block starts, append the rest
        result += text.slice(index);
        break;
      } else {
        // Append text before the diff block
        result += text.slice(index, startIndex);
        index = startIndex;
        const endIndex = text.indexOf(">>>>>>> REPLACE", index);
        if (endIndex === -1) {
          // Diff block not yet complete
          state.isInDiffBlock = true;
          state.accumulatedDiffContent = text.slice(index);
          break;
        } else {
          // Diff block ends here
          const diffContent = text.slice(index, endIndex + ">>>>>>> REPLACE".length);
          result += "```diff\n" + diffContent.trim() + "\n```";
          index = endIndex + ">>>>>>> REPLACE".length;
        }
      }
    }
  }

  return result;
};

export interface ParsingState {
  isInCodeBlock: boolean;
  currentLanguage?: string;
  accumulatedContent: string;
  isInDiffBlock: boolean;
  accumulatedDiffContent: string;
}

export const getPartsStreaming = (
  text: string,
  isUser: boolean,
  state: ParsingState = {
    isInCodeBlock: false,
    accumulatedContent: "",
    isInDiffBlock: false,
    accumulatedDiffContent: "",
  },
): { parts: ChatMessagePart[]; state: ParsingState; } => {
  const extendedText = extendTextWithDiffMarkers(text, state);
  const cleanedText = cleanMessageText(extendedText, isUser);
  const { parts, state: newState } = parseMessageParts(cleanedText, state);
  return { parts, state: newState };
};
