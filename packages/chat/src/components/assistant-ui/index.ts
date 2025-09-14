export { Thread } from "./thread";
export type { ThreadProps } from "./thread";

export { ThreadList } from "./thread-list";
export type { Thread as ThreadType, ThreadListProps } from "./thread-list";

export { MarkdownText } from "./markdown-text";
export type { MarkdownTextProps } from "./markdown-text";

export { TooltipIconButton } from "./tooltip-icon-button";
export type { TooltipIconButtonProps } from "./tooltip-icon-button";

// Re-export assistant-ui primitives for convenience
export {
  type AssistantRuntime,
  AssistantRuntimeProvider,
  makeAssistantTool,
  makeAssistantToolUI,
  type MessageStatus,
  type ThreadConfig,
  ThreadProvider,
  type ThreadRuntime,
  type ThreadRuntimeCore,
  type Tool,
  type ToolCallContentPart,
  useActionBar,
  useAssistantRuntime,
  useBranchPicker,
  useComposer,
  useContentPart,
  useEditComposer,
  useMessage,
  useThread,
  useThreadRuntime,
} from "@assistant-ui/react";

// Re-export AI SDK adapter
export {
  fromCoreMessage,
  fromCoreMessages,
  fromLanguageModelTools,
  toCoreMessage,
  toCoreMessages,
  toLanguageModelMessages,
  useAssistantInstructions,
  useAssistantTool,
  useAssistantToolUI,
} from "@assistant-ui/react-ai-sdk";
