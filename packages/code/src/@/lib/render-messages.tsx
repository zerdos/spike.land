import React, { memo, useCallback, useMemo, useRef } from "react";
import { getPartsStreaming } from "@/lib/get-parts";
import type { ParsingState } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import MarkdownWithReadAloud from "@/external/Markdown";
import { CodeBlock } from "@/components/app/code-block-lazy";
import { Analysis } from "@/components/app/analysis";
import { isDiffContent } from "@/lib/diff-utils";
import { DiffViewer } from "@/components/app/diff-editor";
import { md5 } from "@/lib/md5";
import { extractCodeModification } from "@/lib/chat-utils";

interface CodeProps {
  value: string;
  language: string;
  type: string;
}

const extractDiffContent = (
  rawContent: string,
): { original: string; modified: string } => {
  const content = extractCodeModification(rawContent)[0] || rawContent;
  const [, originalPart = "", modifiedPart = ""] = content.split(
    /<<<<<<< SEARCH|=======|>>>>>>> REPLACE/,
  );
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

    if (trimmedValue.length < 3) {
      return <pre>{trimmedValue}</pre>;
    }
   
    if (trimmedValue.includes(`<react_code_analysis>`)){
    
      const change = trimmedValue.includes(`<change>`)?<h2>{trimmedValue.slice(trimmedValue.indexOf(`<change>`)+8)}</h2>:<></>;
     
      return <><Analysis content={trimmedValue.slice(0,trimmedValue.indexOf("<change>"))} />{change}</>
    }

    if (trimmedValue.includes(`</change>`))
      {
        const suggestion = trimmedValue.includes(`<suggestion>`)?<p>{trimmedValue.slice(trimmedValue.indexOf(`<suggestion>`))}</p>:<></>;
       return <><p>{trimmedValue.slice(0,trimmedValue.indexOf('</change>'))}</p>
       {suggestion}</>
;

      } 

    if (type === "text") {
      return (
        <MarkdownWithReadAloud
          className={cn(
            "mt-3 mb-3 font-sans text-sm leading-normal tracking-wide",
          )}
        >
          {trimmedValue}
        </MarkdownWithReadAloud>
      );
    }

    if (isDiffContent(trimmedValue)) {
      const { original, modified } = extractDiffContent(trimmedValue);
      return (
        <DiffViewer
          original={original}
          modified={modified}
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

export const ChatMessageBlock: React.FC<ChatMessageBlockProps> = memo(
  ({ text, isUser }) => {
    const parsingStateRef = useRef<ParsingState>({
      isInCodeBlock: false,
      accumulatedContent: "",
      isInDiffBlock: false,
      accumulatedDiffContent: "",
    });

    const messageParts = useMemo(() => {
      const { parts, state } = getPartsStreaming(
        text,
        isUser,
        parsingStateRef.current,
      );
      parsingStateRef.current = state;
      return parts;
    }, [text, isUser]);

    return (
      <>
        {messageParts.map((part, index) => (
          <React.Fragment key={`${index}-${md5(part.content)}`}>
            <Code
              value={part.content}
              language={part.language || "plaintext"}
              type={part.type}
            />
          </React.Fragment>
        ))}
      </>
    );
  },
);

ChatMessageBlock.displayName = "ChatMessageBlock";

export default ChatMessageBlock;
