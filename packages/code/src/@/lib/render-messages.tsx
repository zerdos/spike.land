import { Analysis } from "@/components/app/analysis";
import { CodeBlock } from "@/components/app/code-block-lazy";
import { DiffViewer } from "@/components/app/diff-editor";
import { Suggestions } from "@/components/app/suggestions";
import MarkdownWithReadAloud from "@/external/Markdown";
import { extractCodeModification } from "@/lib/chat-utils";
import { isDiffContent } from "@/lib/diff-utils";
import { getPartsStreaming } from "@/lib/get-parts";
import type { ParsingState } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { memo, useCallback, useMemo, useRef } from "react";
// Note: The Message type from "ai" package doesn't include tool_calls
// so we extend it here for compatibility
interface MessageWithToolCalls {
  id: string;
  role: "user" | "system" | "assistant" | "tool" | "data";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

interface CodeProps {
  value: string;
  language: string;
  type: string;
  onNewPrompt: (prompt: string) => void;
}

/**
 * Pull the original and modified sections from the diff content if present.
 */
const extractDiffContent = (
  rawContent: string,
): { original: string; modified: string; } => {
  const content = extractCodeModification(rawContent)[0] || rawContent;
  const [, originalPart = "", modifiedPart = ""] = content.split(
    /<<<<<<< SEARCH|=======|>>>>>>> REPLACE/,
  );
  return {
    original: originalPart.trim(),
    modified: modifiedPart.trim(),
  };
};

/**
 * Renders code, diff, suggestions, or analysis.
 * Memoized for performance.
 */
const Code = memo<CodeProps>(({ value, language, type, onNewPrompt }) => {
  const trimmedValue = value.trim();

  const renderContent = useCallback(() => {
    if (!trimmedValue) return null;

    // Very short content: just wrap in <pre>
    if (trimmedValue.length < 3) {
      return <pre>{trimmedValue}</pre>;
    }

    // If analysis is embedded
    if (trimmedValue.includes("<react_code_analysis>")) {
      const analysisCloseTagIndex = trimmedValue.indexOf("</react_code_analysis>") + 22;
      const contentBeforeChange = trimmedValue.slice(
        0,
        trimmedValue.indexOf("<change>"),
      );
      const contentAfterAnalysis = trimmedValue.slice(analysisCloseTagIndex);
      const changeElement = trimmedValue.includes("<change>")
        ? <h2>{contentAfterAnalysis}</h2>
        : null;

      return (
        <>
          <Analysis content={contentBeforeChange} />
          {changeElement}
        </>
      );
    }

    // If suggestions are embedded
    if (trimmedValue.includes("<suggestion>")) {
      const suggestionStart = trimmedValue.indexOf("<suggestion>");
      const suggestionEnd = trimmedValue.lastIndexOf("</suggestion>") + 13;
      const suggestionContent = trimmedValue.slice(
        suggestionStart,
        suggestionEnd,
      );
      const remaining = trimmedValue.slice(suggestionEnd);

      return (
        <>
          <Suggestions
            content={suggestionContent}
            onAction={(s) => onNewPrompt(s.description)}
          />
          {remaining && <div>{remaining}</div>}
        </>
      );
    }

    // If plain text
    if (type === "text") {
      return (
        <MarkdownWithReadAloud className="mt-3 mb-3 font-sans text-sm leading-normal tracking-wide">
          {trimmedValue}
        </MarkdownWithReadAloud>
      );
    }

    // If diff content
    if (isDiffContent(trimmedValue)) {
      const { original, modified } = extractDiffContent(trimmedValue);
      return <DiffViewer original={original} modified={modified} />;
    }

    // Default code block
    return <CodeBlock value={trimmedValue} language={language} title={undefined} />;
  }, [trimmedValue, type, language, onNewPrompt]);

  return useMemo(() => renderContent(), [renderContent]);
});
Code.displayName = "Code";

interface ChatMessageBlockProps {
  text: string;
  isUser: boolean;
  onNewPrompt: (prompt: string) => void;
}

/**
 * Handles parsing the text into parts, then renders each part as <Code />
 * or other relevant blocks.
 */
export const ChatMessageBlock = memo<ChatMessageBlockProps>(
  ({ text, isUser, onNewPrompt }) => {
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
          <Code
            key={`${index}-${md5(part.content)}`}
            value={part.content}
            language={part.language || "plaintext"}
            type={part.type}
            onNewPrompt={onNewPrompt}
          />
        ))}
      </>
    );
  },
);
ChatMessageBlock.displayName = "ChatMessageBlock";

export default ChatMessageBlock;

// Types for message content parts
export interface TextContentPart {
  type: "text";
  text: string;
}

export interface ToolCallContentPart {
  type: "tool-call";
  toolCallId: string;
  toolName: string;
  args: unknown;
  result?: unknown;
}

export type MessageContentPart = TextContentPart | ToolCallContentPart;

/**
 * Renders a message into content parts for display.
 * Handles both text content and tool calls.
 */
export function renderMessage(message: MessageWithToolCalls): MessageContentPart[] {
  const parts: MessageContentPart[] = [];

  // Add text content if present
  if (message.content) {
    parts.push({
      type: "text",
      text: message.content,
    });
  }

  // Add tool calls if present
  if (message.tool_calls && Array.isArray(message.tool_calls)) {
    for (const toolCall of message.tool_calls) {
      let args: unknown = {};
      
      // Try to parse arguments as JSON
      if (toolCall.function.arguments) {
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch (_e) {
          // If parsing fails, use empty object
          args = {};
        }
      }

      parts.push({
        type: "tool-call",
        toolCallId: toolCall.id,
        toolName: toolCall.function.name,
        args,
      });
    }
  }

  return parts;
}
