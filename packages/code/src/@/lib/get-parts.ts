import type { LanguageMap, ParsingState } from "@/lib/interfaces";

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
  if (isUser) {
    // if there is user prompt, return the content of the user prompt
    // <user_prompt>
    // {{userPrompt}}
    // </user_prompt>
    //

    if (text.includes("<user_prompt>")) {
      const parts = text.split("<user_prompt>");
      const userPrompt = parts[1];
      const userPromptParts = userPrompt?.split("</user_prompt>") || [];
      return userPromptParts[0]!.trim();
    }

    return (text || "")
      .split("The user's first message follows:")
      .pop()
      ?.trim()
      .split("Reminder from the system:")[0] || ""
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
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)(?:```|$)/g;
  const parts: ChatMessagePart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textContent = text.slice(lastIndex, match.index);
      if (textContent.trim().length > 0) {
        parts.push({ type: "text", content: textContent.trim() });
      }
    }

    const language = getLanguage(match[1]!);
    const code = match[2]!;

    parts.push({ type: "code", language, content: code });

    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (state.isInCodeBlock) {
      // Inside an incomplete code block
      state.accumulatedContent += remainingText;
      parts.push({
        type: "code",
        language: getLanguage(state.currentLanguage),
        content: state.accumulatedContent,
      });
    } else if (state.isInDiffBlock) {
      // Inside an incomplete diff block
      state.accumulatedDiffContent += remainingText;
      parts.push({
        type: "code",
        language: "diff",
        content: state.accumulatedDiffContent,
      });
    } else {
      // Regular text
      if (remainingText.trim().length > 0) {
        parts.push({ type: "text", content: remainingText.trim() });
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
        // Wrap the accumulated diff content in a code block without closing it
        result += "```diff\n" + state.accumulatedDiffContent;
        // Do not close the code block; wait for more data
        break;
      } else {
        // Diff block ends here
        state.accumulatedDiffContent += text.slice(
          index,
          endIndex + ">>>>>>> REPLACE".length,
        );
        result += "```diff\n" + state.accumulatedDiffContent + "\n```";
        state.isInDiffBlock = false;
        state.accumulatedDiffContent = "";
        index = endIndex + ">>>>>>> REPLACE".length;
      }
    } else {
      const startIndex = text.indexOf("<<<<<<< SEARCH", index);
      if (startIndex === -1) {
        // No diff block starts; append the rest
        result += text.slice(index);
        break;
      } else {
        // Append text before the diff block
        result += text.slice(index, startIndex);
        index = startIndex;
        // Start of a new diff block
        const endIndex = text.indexOf(">>>>>>> REPLACE", index);
        if (endIndex === -1) {
          // Diff block not yet complete
          state.isInDiffBlock = true;
          state.accumulatedDiffContent = text.slice(index);
          // Wrap the accumulated diff content in a code block without closing it
          result += "```diff\n" + state.accumulatedDiffContent;
          break;
        } else {
          // Diff block ends here

          const diffContent = text.slice(
            index,
            endIndex + ">>>>>>> REPLACE".length,
          );
          result += "```diff\n" + diffContent + "\n```";
          index = endIndex + ">>>>>>> REPLACE".length;
        }
      }
    }
  }

  return result;
};

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
