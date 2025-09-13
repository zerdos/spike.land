export { Thread } from "./thread";
export type { ThreadProps } from "./thread";

export { ThreadList } from "./thread-list";
export type { ThreadListProps, Thread as ThreadType } from "./thread-list";

export { MarkdownText } from "./markdown-text";
export type { MarkdownTextProps } from "./markdown-text";

export { TooltipIconButton } from "./tooltip-icon-button";
export type { TooltipIconButtonProps } from "./tooltip-icon-button";

// Re-export assistant-ui primitives for convenience
export {
  ThreadProvider,
  AssistantRuntimeProvider,
  useThread,
  useThreadRuntime,
  useAssistantRuntime,
  useComposer,
  useMessage,
  useBranchPicker,
  useActionBar,
  useEditComposer,
  useContentPart,
  makeAssistantTool,
  makeAssistantToolUI,
  type ThreadRuntime,
  type AssistantRuntime,
  type ThreadConfig,
  type ThreadRuntimeCore,
  type MessageStatus,
  type Tool,
  type ToolCallContentPart,
} from "@assistant-ui/react";

// Re-export AI SDK adapter
export {
  useAssistantInstructions,
  useAssistantTool,
  useAssistantToolUI,
  fromCoreMessage,
  fromCoreMessages,
  fromLanguageModelTools,
  toLanguageModelMessages,
  toCoreMessage,
  toCoreMessages,
} from "@assistant-ui/react-ai-sdk";