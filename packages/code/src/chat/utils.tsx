import { CodeBlock, programmingLanguages } from "@/external/CodeBlock";
import Markdown from "@/external/Markdown";
import { motion } from "framer-motion";
import React, { Fragment } from "react";

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

export const renderMessage = (text: string, isUser: boolean) => {
  text = text.split("<<<<<<< SEARCH").join(
    "```diff" + `\n<<<<<<< SEARCH`,
  ).split(">>>>>>> REPLACE").join(">>>>>>> REPLACE\n```");

  const cleanedText = cleanMessageText(text, isUser);
  const parts = parseMessageParts(cleanedText);

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part.type === "text"
            ? <Markdown>{part.content}</Markdown>
            : (
              <CodeBlock
                value={part.content}
                language={part.language || "typescript"}
              />
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

    const language = match[1]
      ? programmingLanguages[match[1].toLowerCase()] || match[1].toLowerCase()
      : "plaintext";
    const code = match[2].trim();

    parts.push({
      type: "code",
      language,
      content: code,
    });

    lastIndex = match.index + match[0].length;
  }

  const lastOpenBlockMatch = text.slice(lastIndex).match(
    /```(\w+)?\s*([\s\S]*)/,
  );
  if (lastOpenBlockMatch) {
    parts.push({
      type: "code",
      language: getLanguage(lastOpenBlockMatch[1]),
      content: lastOpenBlockMatch[2].trim(),
      isStreaming: true,
    });
  } else if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
    });
  }

  return parts;
};

const getLanguage = (lang?: string): string => {
  if (!lang) return "plaintext";
  return programmingLanguages[lang.toLowerCase()] || lang.toLowerCase();
};

// const TextPart: React.FC<{ content: string }> = ({ content }) => (
//   <>
//     {content.split("\n").map((line, j) => (
//       <Fragment key={j}>
//         {j > 0 && <br />}
//         <span
//           css={[
//             styles.smallFontWithMaxWidth,
//             css`
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
//             font-size: 16px;
//             line-height: 1.5;
//             letter-spacing: 0.01em;
//           `,
//           ]}
//         >
//           {line}
//         </span>
//       </Fragment>
//     ))}
//   </>
// );

export const mockResponses = [
  "Here's an example code block:\n```tsx\nconst greeting = 'Hello, World!';\nconsole.log(greeting);\n```",
  "Let me explain this function:\n```tsx\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n```",
  "Here's how you can create a React component:\n```tsx\nconst MyComponent: React.FC = () => {\n  return <div>Hello, React!</div>;\n};\n```",
];
