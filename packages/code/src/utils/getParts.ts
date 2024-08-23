export const getParts = (text: string, isUser: boolean) => {
  const countSearch = (text.match(/<<<<<<< SEARCH/g) || []).length;
  const countEqual = (text.match(/=======/g) || []).length;
  const countReplace = (text.match(/>>>>>>> REPLACE/g) || []).length;

  if (countSearch > 0 || countEqual > 0 || countReplace > 0) {
    let extendedText = text;
    if (countSearch !== countEqual) {
      extendedText += "=======\n";
    }
    if (countEqual !== countReplace) {
      extendedText += ">>>>>>> REPLACE\n";
    }
    extendedText = extendedText.split("<<<<<<< SEARCH").join("```diff\n<<<<<<< SEARCH");
    extendedText = extendedText.split(">>>>>>> REPLACE").join(">>>>>>> REPLACE\n```");
    text = extendedText;
  }

  const cleanedText = cleanMessageText(text, isUser);
  const parts = parseMessageParts(cleanedText);
  return parts;
};

export const parseMessageParts = (text: string) => {
  const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
      });
    }

    const language = getLanguage(match[1]);
    const code = match[2].trim();

    parts.push({
      type: "code",
      language,
      content: code,
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const lastPart = text.slice(lastIndex);
    const lastOpenBlockMatch = lastPart.match(/```(\w+)?\s*([\s\S]*)/);
    if (lastOpenBlockMatch && lastOpenBlockMatch.index) {
      if (lastOpenBlockMatch.index > 0) {
        parts.push({
          type: "text",
          content: lastPart.slice(0, lastOpenBlockMatch.index),
        });
      }
      parts.push({
        type: "code",
        language: getLanguage(lastOpenBlockMatch[1]),
        content: lastOpenBlockMatch[2].trim(),
        isStreaming: true,
      });
    } else {
      parts.push({
        type: "text",
        content: lastPart,
      });
    }
  }

  // Merge adjacent text parts
  const mergedParts = [];
  for (const part of parts) {
    if (mergedParts.length > 0 && mergedParts[mergedParts.length - 1].type === "text" && part.type === "text") {
      mergedParts[mergedParts.length - 1].content += part.content;
    } else {
      mergedParts.push(part);
    }
  }

  return mergedParts;
};
// Utility Functions
export const cleanMessageText = (text: string, isUser: boolean): string => {
  if (isUser) {
    return text
      .split("The user's first message follows:")
      .pop()!
      .trim()
      .split("Reminder from the system:")[0]
      .trim();
  }
  return text
    .replace(/<antArtifact.*?>/g, "**```")
    .replace(/<\/antArtifact>/g, "```**");
};

export const getLanguage = (lang?: string): string => {
  if (!lang) return "plaintext";
  const lowercaseLang = lang.toLowerCase();

  // Special handling for specific languages
  if (lowercaseLang === "typescript" || lowercaseLang === "ts") return "typescript";
  if (lowercaseLang === "javascript" || lowercaseLang === "js") return "javascript";
  if (lowercaseLang === "python" || lowercaseLang === "py") return "python";

  return programmingLanguages[lowercaseLang] || lowercaseLang;
};

// Types
export interface LanguageMap {
  [key: string]: string | undefined;
}

// Constants
export const programmingLanguages: LanguageMap = {
  javascript: ".js",
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
  typescript: ".ts",
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
