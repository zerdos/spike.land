import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { CodeTS } from "../CodeBlock";
import { styles } from "./styles";
import { css } from "@emotion/react";

export const TypingIndicator: React.FC = () => (
  <div className="flex space-x-2 items-center p-2">
    <span className="text-sm text-gray-500">AI is typing</span>
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  </div>
);

export const ColorModeToggle: React.FC<
  { isDarkMode: boolean; toggleDarkMode: () => void }
> = (
  { isDarkMode, toggleDarkMode },
) => (
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
  const cleanedText = isUser
    ? text.split("The user's first message follows:").pop()!.trim().split(
      "Reminder from the system:",
    )[0].trim()
    : text.replace(/<antArtifact.*?>/g, "**```tsx").replace(
      /<\/antArtifact>/g,
      "```**",
    );

  const parts = cleanedText.split("**```tsx");
  if (parts.length > 1) {
    return parts.map((part, index) => {
      if (index === 0) {
        return (
          <pre css={styles.smallFont} key={index}>
            {part}
          </pre>
        );
      }
      const [code, ...rest] = part.split("```**");
      return (
        <Fragment key={index}>
          <CodeTS code={code} />

          {rest.join().trim().split("\n").map((line, j) => (
            <Fragment key={j}>
              <br />
              <span css={styles.smallFontWithMaxWidth}>
                {line}
              </span>
            </Fragment>
          ))}
        </Fragment>
      );
    });
  }
  return cleanedText.split("\n").map((line, j) => (
    <Fragment key={j}>
      <br />
      <span css={styles.smallFontWithMaxWidth}>
        {line}
      </span>
    </Fragment>
  ));
};

export const mockResponses = [
  "Here's an example code block:\n```tsx\nconst greeting = 'Hello, World!';\nconsole.log(greeting);\n```",
  "Let me explain this function:\n```tsx\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n```",
  "Here's how you can create a React component:\n```tsx\nconst MyComponent: React.FC = () => {\n  return <div>Hello, React!</div>;\n};\n```",
];
