import React, { FC, memo, useMemo } from "react";
import { getParts } from "@/lib/get-parts";
import { cn } from "@/lib/utils";
import Markdown from "@/external/Markdown";  

import { CodeBlock } from "@/external/CodeBlock";
import {  isDiffContent } from "@/lib/diff-utils";
import { DiffEditor } from "@/components/app/diff-editor-lazy";

interface CodeProps {
  value: string;
  language: string;
  type: string;
}


export const extractDiffContent = (content: string): { original: string; modified: string } => {
  const original = content.split("=======")[0]?.split("<<<<<<< SEARCH")[1]?.trim() || "";
  const modified = content.split("=======")[1]?.split(">>>>>>> REPLACE")[0]?.trim() || "";

  return {
    original,
    modified,
  };
};

const Code: FC<CodeProps> = memo(({ value, language, type }) => {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return null;
  }


  if (trimmedValue.length < 20) {
    return <pre>{trimmedValue}</pre>;
  }

  if (type === "text") {
    return (
      <Markdown
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
    return ( <DiffEditor
        original={original}
        modified={modified}
        language={language}
      />
    );
  }

  return <CodeBlock value={trimmedValue} language={language} />;
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