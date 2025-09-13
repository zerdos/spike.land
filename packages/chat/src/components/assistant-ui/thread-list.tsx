import {
  MessagePlus,
  Trash2,
  Edit3,
  Archive,
  Star,
  Clock
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { TooltipIconButton } from "./tooltip-icon-button";
import type { FC } from "react";

export interface Thread {
  id: string;
  title: string;
  lastMessage?: string;
  timestamp?: Date;
  isActive?: boolean;
  isPinned?: boolean;
  unreadCount?: number;
}

export interface ThreadListProps {
  threads: Thread[];
  activeThreadId?: string;
  onThreadSelect?: (threadId: string) => void;
  onThreadDelete?: (threadId: string) => void;
  onThreadEdit?: (threadId: string) => void;
  onThreadArchive?: (threadId: string) => void;
  onThreadPin?: (threadId: string) => void;
  onNewThread?: () => void;
  className?: string;
}

export const ThreadList: FC<ThreadListProps> = ({
  threads,
  activeThreadId,
  onThreadSelect,
  onThreadDelete,
  onThreadEdit,
  onThreadArchive,
  onThreadPin,
  onNewThread,
  className,
}) => {
  const formatTimestamp = (date?: Date) => {
    if (!date) return "";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes === 0 ? "Just now" : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background border-r", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <TooltipIconButton
          tooltip="New conversation"
          onClick={onNewThread}
          className="h-8 w-8"
        >
          <MessagePlus className="h-4 w-4" />
        </TooltipIconButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <MessagePlus className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start a new conversation to get started
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={cn(
                  "group relative flex flex-col gap-1 p-4 hover:bg-accent/50 cursor-pointer transition-colors",
                  thread.id === activeThreadId && "bg-accent",
                  thread.isPinned && "bg-accent/20"
                )}
                onClick={() => onThreadSelect?.(thread.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {thread.isPinned && (
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      )}
                      <h3 className="font-medium text-sm truncate">
                        {thread.title}
                      </h3>
                      {thread.unreadCount && thread.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                    {thread.lastMessage && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {thread.lastMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onThreadPin && (
                      <TooltipIconButton
                        tooltip={thread.isPinned ? "Unpin" : "Pin"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onThreadPin(thread.id);
                        }}
                        className="h-6 w-6"
                      >
                        <Star className={cn(
                          "h-3 w-3",
                          thread.isPinned && "fill-current"
                        )} />
                      </TooltipIconButton>
                    )}
                    {onThreadEdit && (
                      <TooltipIconButton
                        tooltip="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onThreadEdit(thread.id);
                        }}
                        className="h-6 w-6"
                      >
                        <Edit3 className="h-3 w-3" />
                      </TooltipIconButton>
                    )}
                    {onThreadArchive && (
                      <TooltipIconButton
                        tooltip="Archive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onThreadArchive(thread.id);
                        }}
                        className="h-6 w-6"
                      >
                        <Archive className="h-3 w-3" />
                      </TooltipIconButton>
                    )}
                    {onThreadDelete && (
                      <TooltipIconButton
                        tooltip="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onThreadDelete(thread.id);
                        }}
                        className="h-6 w-6 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </TooltipIconButton>
                    )}
                  </div>
                </div>

                {thread.timestamp && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimestamp(thread.timestamp)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onNewThread}
        >
          <MessagePlus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>
    </div>
  );
};