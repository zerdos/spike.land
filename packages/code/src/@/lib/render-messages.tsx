import React, { FC, memo, useMemo } from "react";
import { getParts } from "@/lib/get-parts";
import { md5 } from "@/lib/md5";
import { cn } from "@/lib/utils";
import Markdown from "@/external/Markdown";  
import { DiffEditor } from "@/components/app/diff-editor";
import { CodeBlock } from "@/external/CodeBlock";
import { extractDiffContent, isDiffContent } from "@/lib/diff-utils";

interface CodeProps {
  value: string;
  language: string;
  type: string;
}

const Code: FC<CodeProps> = memo(({ value, language, type }) => {
  const trimmedValue = useMemo(() => value.trim(), [value]);

  if (trimmedValue.length === 0) {
    return null;
  }

  const key = useMemo(() => md5(`${trimmedValue}${language}`), [trimmedValue, language]);

  if (trimmedValue.length < 20) {
    return <pre key={key}>{trimmedValue}</pre>;
  }

  if (type === "text") {
    return (
      <Markdown
        key={key}
        className={cn(
          "mt-3 mb-3 font-sans text-sm leading-normal tracking-wide",
        )}
      >
        {trimmedValue}
      </Markdown>
    );
  }

  if (isDiffContent(trimmedValue)) {
    const { original, modified } = extractDiffContent(trimmedValue);
    return (
      <DiffEditor
        key={key}
        original={original}
        modified={modified}
        language={language}
      />
    );
  }

  return <CodeBlock key={key} value={trimmedValue} language={language} />;
});

Code.displayName = "Code";

interface ChatMessageBlockProps {
  text: string;
  isUser: boolean;
}

export const ChatMessageBlock: FC<ChatMessageBlockProps> = memo(({ text, isUser }) => {
  const messageParts = useMemo(() => getParts(text, isUser), [text, isUser]);

  return (
    <>
      {messageParts.map((part, index) => (
        <React.Fragment key={index}>
          <Code
            value={part.content}
            language={part.language || 'typescript'}
            type={part.type}
          />
        </React.Fragment>
      ))}
    </>
  );
});

ChatMessageBlock.displayName = "ChatMessageBlock";

export default ChatMessageBlock;