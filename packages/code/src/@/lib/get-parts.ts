import { LanguageMap } from "@/lib/interfaces";

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
  isStreaming?: boolean;
}

const parseMessageParts = (text: string): ChatMessagePart[] => {
  const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g;
  const parts: ChatMessagePart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textContent = text.slice(lastIndex, match.index).trim();
      if (textContent.length > 0) {
        parts.push({ type: "text", content: textContent });
      }
    }

    const language = getLanguage(match[1]);
    const code = match[2].trim();

    parts.push({ type: "code", language, content: code });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const lastPart = text.slice(lastIndex);
    const lastOpenBlockMatch = lastPart.match(/```(\w+)?\s*([\s\S]*)/);
    if (lastOpenBlockMatch && lastOpenBlockMatch.index !== undefined) {
      if (lastOpenBlockMatch.index > 0) {
        const textContent = lastPart.slice(0, lastOpenBlockMatch.index).trim();
        if (textContent.length > 0) {
          parts.push({ type: "text", content: textContent });
        }
      }
      parts.push({
        type: "code",
        language: getLanguage(lastOpenBlockMatch[1]),
        content: lastOpenBlockMatch[2].trim(),
        isStreaming: true,
      });
    } else {
      const textContent = lastPart.trim();
      if (textContent.length > 0) {
        parts.push({ type: "text", content: textContent });
      }
    }
  }

  return parts.map(part =>
    part.type === "text"
      ? {
        ...part,
        content: part.content
          .replace(/<<<<<<< SEARCH/g, "")
          .replace(/>>>>>>> REPLACE/g, "")
          .trim(),
      }
      : part
  );
};

const extendTextWithDiffMarkers = (text: string): string => {
  const countSearch = (text.match(/<<<<<<< SEARCH/g) || []).length;
  const countEqual = (text.match(/=======/g) || []).length;
  const countReplace = (text.match(/>>>>>>> REPLACE/g) || []).length;

  if (countSearch === 0 && countEqual === 0 && countReplace === 0) {
    return text;
  }

  let extendedText = text;

  if (countSearch !== countEqual) {
    extendedText += "=======\n";
  }

  if (countEqual > countReplace) {
    const parts = extendedText.split(/(<<<<<<<\s*SEARCH|=======|>>>>>>>\s*REPLACE)/g);
    let isFirstEqual = true;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].trim() === "<<<<<<< SEARCH") {
        isFirstEqual = true;
      } else if (parts[i].trim() === "=======") {
        if (isFirstEqual) {
          isFirstEqual = false;
        } else {
          parts[i] = ">>>>>>> REPLACE";
        }
      }
    }
    extendedText = parts.join("");
  }

  extendedText = extendedText.replace(/<<<<<<< SEARCH/g, "```diff\n<<<<<<< SEARCH");
  extendedText = extendedText.replace(/>>>>>>> REPLACE/g, ">>>>>>> REPLACE\n```");

  return extendedText;
};

export const getParts = (text: string, isUser: boolean): ChatMessagePart[] => {
  const extendedText = extendTextWithDiffMarkers(text);
  const cleanedText = cleanMessageText(extendedText, isUser);
  return parseMessageParts(cleanedText).filter(part => part.type !== "text" || part.content.length > 0);
};
