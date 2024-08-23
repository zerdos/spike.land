import { css } from "@emotion/react";
import { JSX } from "@emotion/react/jsx-runtime";
import { motion } from "framer-motion";
import React, { Fragment, lazy, memo, Suspense } from "react";

import { md5 } from "@src/md5";
import { extractDiffContent, isDiffContent } from "./diffUtils"; // Assume these functions are implemented elsewhere

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
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

const Markdown = memo(lazy(() => import("@/external/Markdown").then((module) => ({ default: module.default }))));
const CodeBlock = memo(lazy(() => import("@/external/CodeBlock").then((module) => ({ default: module.CodeBlock }))));
const DiffEditor = memo(
  lazy(() => import("../components/DiffEditor").then((module) => ({ default: module.DiffEditor }))),
);

export const TypingIndicator: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="flex space-x-2 items-center p-2">
    <span className="text-sm text-gray-500">AI is typing</span>
    <TypingDots isDarkMode={isDarkMode} />
  </div>
);

const TypingDots: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((dot) => <AnimatedDot key={dot} delay={dot * 0.2} isDarkMode={isDarkMode} />)}
  </div>
);

const AnimatedDot: React.FC<{ delay: number; isDarkMode: boolean }> = ({ delay, isDarkMode }) => (
  <motion.div
    className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-gray-400" : "bg-gray-800"}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
    }}
  />
);

export const ColorModeToggle: React.FC<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}> = ({ isDarkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className={`p-2 rounded-full backdrop-blur-sm ${
      isDarkMode
        ? "bg-gray-800/30 text-yellow-400"
        : "bg-yellow-100/30 text-gray-800"
    } hover:bg-opacity-50 transition-all duration-300`}
  >
    {isDarkMode ? "🌙" : "☀️"}
  </button>
);

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

export const renderMessage = (text: string, isUser: boolean): JSX.Element => {
  const parts = getParts(text, isUser);

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={md5(index + `: ` + part.content)}>
          {part.type === "text"
            ? (
              <Suspense
                fallback={
                  <pre>
             { part.content}</pre>
                }
              >
                <Markdown
                  css={css`
                  margin-top: 12px;
                  margin-bottom: 12px;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                  font-size: 14px;
                  line-height: 1.5;
                  letter-spacing: 0.01em;
                `}
                >
                  {part.content}
                </Markdown>
              </Suspense>
            )
            : (
              renderCode(part.content, part.language || "typescript")
            )}
        </Fragment>
      ))}
    </>
  );
};

const cleanMessageText = (text: string, isUser: boolean): string => {
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

const parseMessageParts = (text: string) => {
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

const getLanguage = (lang?: string): string => {
  if (!lang) return "plaintext";
  const lowercaseLang = lang.toLowerCase();

  // Special handling for specific languages
  if (lowercaseLang === "typescript" || lowercaseLang === "ts") return "typescript";
  if (lowercaseLang === "javascript" || lowercaseLang === "js") return "javascript";
  if (lowercaseLang === "python" || lowercaseLang === "py") return "python";

  if (lowercaseLang in programmingLanguages && programmingLanguages[lowercaseLang]) {
    return programmingLanguages[lowercaseLang];
  }
  return lowercaseLang;
};

export const mockResponses: string[] = [
  "Here's an example code block:\n```tsx\nconst greeting = 'Hello, World!';\nconsole.log(greeting);\n```",
  "Let me explain this function:\n```tsx\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n```",
  "Here's how you can create a React component:\n```tsx\nconst MyComponent: React.FC = () => {\n  return <div>Hello, React!</div>;\n};\n```",
];

export function renderCode(value: string, language: string) {
  console.log("renderCode", value, language);
  const key = md5(value + language);
  if (isDiffContent(value)) {
    const { original, modified } = extractDiffContent(value);
    return (
      <Suspense fallback={<pre>{original}</pre>}>
        <DiffEditor key={key} original={original} modified={modified} language={language} />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<pre>{value}</pre>}>
        <CodeBlock key={key} value={value} language={language} />
      </Suspense>
    );
  }
}
