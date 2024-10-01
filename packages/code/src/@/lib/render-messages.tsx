import React, { memo, useMemo, useCallback } from "react";
import { getParts } from "@/lib/get-parts";
import { cn } from "@/lib/utils";
import Markdown from "@/external/Markdown";
import {CodeBlock} from "@/components/app/code-block-lazy";
import { isDiffContent } from "@/lib/diff-utils";
import { DiffEditor } from "@/components/app/diff-editor-lazy";
import { md5 } from "@/lib/md5";
import { extractCodeModification } from "@/lib/chat-utils";

interface CodeProps {
  value: string;
  language: string;
  type: string;
}

const extractDiffContent = (rawContent: string): { original: string; modified: string } => {
  const content = extractCodeModification(rawContent)[0] || rawContent;
  const [, originalPart = "", modifiedPart = ""] = content.split(/<<<<<<< SEARCH|=======|>>>>>>> REPLACE/);
  return {
    original: originalPart.trim(),
    modified: modifiedPart.trim(),
  };
};

const Code: React.FC<CodeProps> = memo(({ value, language, type }) => {
  const trimmedValue = useMemo(() => value.trim(), [value]);

  const renderContent = useCallback(() => {
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
      const { original, modified } = extractDiffContent(trimmedValue + "\nFoo_Bar_baz_893");
      const o = original.includes('Foo_Bar_baz_893') ? '' : original;
      const m = modified.includes('Foo_Bar_baz_893') ? '' : modified;

      return (
        <DiffEditor
          original={o}
          modified={m}
          language={language}
        />
      );
    }

    return <CodeBlock value={trimmedValue} language={language} />;
  }, [trimmedValue, type, language]);

  return useMemo(() => renderContent(), [renderContent]);
});

Code.displayName = "Code";

interface ChatMessageBlockProps {
  text: string;
  isUser: boolean;
}

export const ChatMessageBlock: React.FC<ChatMessageBlockProps> = memo(({ text, isUser }) => {
  const messageParts = useMemo(() => getParts(text, isUser), [text, isUser]);

  return (
    <>
      {messageParts.map((part, index) => (
        <React.Fragment key={`${index}-${md5(part.content)}`}>
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