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

const parseMessageParts = (text: string): ChatMessagePart[] => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const parts: ChatMessagePart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textContent = text.slice(lastIndex, match.index);
      if (textContent.trim()) {
        parts.push({ type: "text", content: textContent.trim() });
      }
    }

    const language = getLanguage(match[1]);
    const code = match[2];

    parts.push({ type: "code", language, content: code });

    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText.trim()) {
      parts.push({ type: "text", content: remainingText.trim() });
    }
  }

  return parts;
};

const extendTextWithDiffMarkers = (text: string): string => {
  return text.replace(/<<<<<<<\s*SEARCH[\s\S]*?>>>>>>> REPLACE/g, (match) => {
    return "```diff\n" + match.trim() + "\n```";
  });
};

export const getParts = (text: string, isUser: boolean): ChatMessagePart[] => {
  const extendedText = extendTextWithDiffMarkers(text);
  const cleanedText = cleanMessageText(extendedText, isUser);
  return parseMessageParts(cleanedText).filter(
    (part) => part.type !== "text" || part.content.length > 0,
  );
};
