import {
  ActionBarCopy,
  ActionBarEdit,
  ActionBarReload,
  ActionBarRoot,
  ActionBarSpeak,
  ActionBarStopSpeaking,
  AssistantActionBar,
  AssistantMessage,
  AssistantMessageContent,
  BranchPicker,
  BranchPickerCount,
  BranchPickerNext,
  BranchPickerNumber,
  BranchPickerPrevious,
  BranchPickerRoot,
  Composer,
  ComposerAttachment,
  ComposerCancel,
  ComposerInput,
  ComposerSend,
  ContentPartDisplay,
  ContentPartImage,
  ContentPartInProgress,
  ContentPartText,
  EditComposerCancel,
  EditComposerFooter,
  EditComposerInput,
  EditComposerRoot,
  EditComposerSend,
  MessageInProgress,
  MessageRoot,
  type MessageStatus,
  Thread as ThreadPrimitive,
  type ThreadConfig,
  ThreadConfigProvider,
  ThreadEmpty,
  ThreadMessages,
  type ThreadRuntimeCore,
  ThreadScrollToBottom,
  ThreadSuggestion,
  ThreadViewport,
  ThreadWelcome,
  UserActionBar,
  UserMessage,
  UserMessageContent,
} from "@assistant-ui/react";
import {
  AlertCircle,
  ArrowDown,
  Bot,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit3,
  Loader2,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Send,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { MarkdownText } from "./markdown-text";
import { TooltipIconButton } from "./tooltip-icon-button";

export interface ThreadProps {
  runtime?: ThreadRuntimeCore;
  config?: ThreadConfig;
  className?: string;
  welcomeMessage?: ReactNode;
  emptyMessage?: ReactNode;
  placeholder?: string;
  suggestions?: string[];
  showScrollToBottom?: boolean;
  showTimestamps?: boolean;
  allowAttachments?: boolean;
  allowVoice?: boolean;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const MessageStatus: FC<{ status?: MessageStatus; }> = ({ status }) => {
  if (!status) return null;

  const icons = {
    in_progress: <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />,
    complete: <CheckCircle className="h-3 w-3 text-green-500" />,
    error: <AlertCircle className="h-3 w-3 text-destructive" />,
    cancelled: <X className="h-3 w-3 text-muted-foreground" />,
  };

  return <span className="inline-flex items-center">{icons[status]}</span>;
};

export const Thread: FC<ThreadProps> = ({
  _runtime,
  config,
  className,
  welcomeMessage,
  emptyMessage,
  placeholder = "Type a message...",
  suggestions = [],
  showScrollToBottom = true,
  showTimestamps = true,
  allowAttachments = true,
  allowVoice = false,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 50;
    setIsAtBottom(isBottom);
  };

  const threadConfig: ThreadConfig = {
    ...config,
    assistantMessage: {
      components: {
        Text: MarkdownText,
      },
    },
  };

  return (
    <ThreadConfigProvider config={threadConfig}>
      <ThreadPrimitive className={cn("flex flex-col h-full bg-background", className)}>
        <ThreadViewport
          className="flex-1 overflow-y-auto px-4 pt-8 pb-4"
          onScroll={handleScroll}
        >
          <ThreadWelcome>
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative bg-primary/10 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold mb-2">
                {welcomeMessage || "Welcome to Assistant"}
              </h1>
              <p className="text-muted-foreground max-w-md">
                Start a conversation by typing a message below or choose from the suggestions
              </p>
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {suggestions.map((suggestion, idx) => (
                    <ThreadSuggestion
                      key={idx}
                      prompt={suggestion}
                      autoSend
                      className="px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm cursor-pointer transition-colors"
                    >
                      <MessageSquare className="h-3 w-3 mr-2 inline" />
                      {suggestion}
                    </ThreadSuggestion>
                  ))}
                </div>
              )}
            </div>
          </ThreadWelcome>

          <ThreadEmpty>
            <div className="flex flex-col items-center justify-center text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {emptyMessage || "No messages yet. Start the conversation!"}
              </p>
            </div>
          </ThreadEmpty>

          <ThreadMessages>
            <UserMessage>
              <MessageRoot className="flex gap-3 mb-6">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">You</span>
                    {showTimestamps && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    )}
                  </div>
                  <UserMessageContent className="prose prose-neutral dark:prose-invert max-w-none text-sm" />
                  <UserActionBar>
                    <ActionBarRoot className="flex gap-1 mt-2">
                      <TooltipIconButton
                        tooltip="Edit"
                        className="h-6 w-6"
                      >
                        <ActionBarEdit>
                          <Edit3 className="h-3 w-3" />
                        </ActionBarEdit>
                      </TooltipIconButton>
                      <TooltipIconButton
                        tooltip="Copy"
                        className="h-6 w-6"
                      >
                        <ActionBarCopy>
                          <Copy className="h-3 w-3" />
                        </ActionBarCopy>
                      </TooltipIconButton>
                    </ActionBarRoot>
                  </UserActionBar>
                  <EditComposerRoot>
                    <EditComposerInput className="w-full px-3 py-2 text-sm bg-muted rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-ring" />
                    <EditComposerFooter className="flex gap-2 mt-2">
                      <EditComposerCancel>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </EditComposerCancel>
                      <EditComposerSend>
                        <Button size="sm">
                          Save
                        </Button>
                      </EditComposerSend>
                    </EditComposerFooter>
                  </EditComposerRoot>
                </div>
              </MessageRoot>
            </UserMessage>

            <AssistantMessage>
              <MessageRoot className="flex gap-3 mb-6">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Assistant</span>
                    {showTimestamps && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    )}
                    <MessageInProgress>
                      <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    </MessageInProgress>
                  </div>
                  <AssistantMessageContent className="prose prose-neutral dark:prose-invert max-w-none text-sm">
                    <ContentPartText>
                      <MarkdownText />
                    </ContentPartText>
                    <ContentPartImage className="max-w-md rounded-lg overflow-hidden" />
                    <ContentPartDisplay />
                    <ContentPartInProgress>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Thinking...
                      </span>
                    </ContentPartInProgress>
                  </AssistantMessageContent>
                  <BranchPicker>
                    <BranchPickerRoot className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <TooltipIconButton
                        tooltip="Previous"
                        className="h-5 w-5"
                      >
                        <BranchPickerPrevious>
                          <ChevronLeft className="h-3 w-3" />
                        </BranchPickerPrevious>
                      </TooltipIconButton>
                      <span className="px-1">
                        <BranchPickerNumber /> / <BranchPickerCount />
                      </span>
                      <TooltipIconButton
                        tooltip="Next"
                        className="h-5 w-5"
                      >
                        <BranchPickerNext>
                          <ChevronRight className="h-3 w-3" />
                        </BranchPickerNext>
                      </TooltipIconButton>
                    </BranchPickerRoot>
                  </BranchPicker>
                  <AssistantActionBar>
                    <ActionBarRoot className="flex gap-1 mt-2">
                      <TooltipIconButton
                        tooltip="Copy"
                        className="h-6 w-6"
                      >
                        <ActionBarCopy>
                          <Copy className="h-3 w-3" />
                        </ActionBarCopy>
                      </TooltipIconButton>
                      <TooltipIconButton
                        tooltip="Regenerate"
                        className="h-6 w-6"
                      >
                        <ActionBarReload>
                          <RefreshCw className="h-3 w-3" />
                        </ActionBarReload>
                      </TooltipIconButton>
                      {allowVoice && (
                        <>
                          <TooltipIconButton
                            tooltip="Speak"
                            className="h-6 w-6"
                          >
                            <ActionBarSpeak>
                              <Volume2 className="h-3 w-3" />
                            </ActionBarSpeak>
                          </TooltipIconButton>
                          <TooltipIconButton
                            tooltip="Stop speaking"
                            className="h-6 w-6"
                          >
                            <ActionBarStopSpeaking>
                              <VolumeX className="h-3 w-3" />
                            </ActionBarStopSpeaking>
                          </TooltipIconButton>
                        </>
                      )}
                    </ActionBarRoot>
                  </AssistantActionBar>
                </div>
              </MessageRoot>
            </AssistantMessage>
          </ThreadMessages>

          {showScrollToBottom && !isAtBottom && (
            <ThreadScrollToBottom>
              <TooltipIconButton
                tooltip="Scroll to bottom"
                className="fixed bottom-24 right-6 h-8 w-8 rounded-full shadow-lg bg-background border"
              >
                <ArrowDown className="h-4 w-4" />
              </TooltipIconButton>
            </ThreadScrollToBottom>
          )}
        </ThreadViewport>

        <div className="border-t bg-background px-4 py-4">
          <Composer>
            <div className="flex items-end gap-2">
              {allowAttachments && (
                <TooltipIconButton
                  tooltip="Attach file"
                  className="h-8 w-8 mb-1"
                >
                  <ComposerAttachment>
                    <Paperclip className="h-4 w-4" />
                  </ComposerAttachment>
                </TooltipIconButton>
              )}
              <div className="flex-1 relative">
                <ComposerInput
                  placeholder={placeholder}
                  className="w-full px-4 py-3 pr-12 text-sm bg-muted rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-ring resize-none min-h-[48px] max-h-[200px]"
                  autoFocus
                />
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <ComposerCancel>
                    <TooltipIconButton
                      tooltip="Cancel"
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </TooltipIconButton>
                  </ComposerCancel>
                  <ComposerSend>
                    <TooltipIconButton
                      tooltip="Send message"
                      className="h-8 w-8"
                    >
                      <Send className="h-4 w-4" />
                    </TooltipIconButton>
                  </ComposerSend>
                </div>
              </div>
            </div>
          </Composer>
        </div>
      </ThreadPrimitive>
    </ThreadConfigProvider>
  );
};
