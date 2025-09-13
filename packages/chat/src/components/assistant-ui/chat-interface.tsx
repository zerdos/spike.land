import { useState } from "react";
import { Thread } from "./thread";
import { ThreadList, type Thread as ThreadType } from "./thread-list";
import { cn } from "../../lib/utils";
// import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Menu } from "lucide-react";
import { TooltipIconButton } from "./tooltip-icon-button";

export interface ChatInterfaceProps {
  className?: string;
  showSidebar?: boolean;
  defaultSidebarSize?: number;
  minSidebarSize?: number;
  maxSidebarSize?: number;
  collapsible?: boolean;
}

// Example usage component that combines Thread and ThreadList
export function ChatInterface({
  className,
  showSidebar = true,
  defaultSidebarSize = 25,
  minSidebarSize = 20,
  maxSidebarSize = 40,
  collapsible = true,
}: ChatInterfaceProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string>("1");

  // Example threads data
  const [threads, setThreads] = useState<ThreadType[]>([
    {
      id: "1",
      title: "Project Planning Discussion",
      lastMessage: "Let's review the timeline for Q1 deliverables",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isPinned: true,
    },
    {
      id: "2",
      title: "Code Review Guidelines",
      lastMessage: "The new PR template looks good",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 3,
    },
    {
      id: "3",
      title: "Technical Architecture",
      lastMessage: "Considering microservices approach",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "4",
      title: "Bug Investigation",
      lastMessage: "Found the root cause in the auth module",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ]);

  const handleNewThread = () => {
    const newThread: ThreadType = {
      id: Date.now().toString(),
      title: "New Conversation",
      timestamp: new Date(),
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
  };

  const handleThreadDelete = (threadId: string) => {
    setThreads(threads.filter(t => t.id !== threadId));
    if (activeThreadId === threadId && threads.length > 1) {
      const remainingThreads = threads.filter(t => t.id !== threadId);
      setActiveThreadId(remainingThreads[0].id);
    }
  };

  const handleThreadPin = (threadId: string) => {
    setThreads(threads.map(t =>
      t.id === threadId ? { ...t, isPinned: !t.isPinned } : t
    ));
  };

  const suggestions = [
    "Help me understand React hooks",
    "Explain TypeScript generics",
    "Best practices for API design",
    "How to optimize performance",
  ];

  if (!showSidebar) {
    return (
      <div className={cn("flex h-full", className)}>
        <Thread
          placeholder="Ask me anything..."
          suggestions={suggestions}
          welcomeMessage="Welcome! How can I help you today?"
          showTimestamps
          allowAttachments
        />
      </div>
    );
  }

  // Install react-resizable-panels if using the sidebar
  // yarn add react-resizable-panels

  return (
    <div className={cn("flex h-full relative", className)}>
      {isSidebarCollapsed && (
        <div className="absolute left-2 top-2 z-10">
          <TooltipIconButton
            tooltip="Show sidebar"
            onClick={() => setIsSidebarCollapsed(false)}
          >
            <Menu className="h-4 w-4" />
          </TooltipIconButton>
        </div>
      )}

      <div className={cn(
        "flex h-full w-full transition-all duration-300",
        isSidebarCollapsed && "pl-12"
      )}>
        <div className={cn(
          "border-r transition-all duration-300",
          isSidebarCollapsed ? "w-0 overflow-hidden" : "w-80"
        )}>
          <ThreadList
            threads={threads}
            activeThreadId={activeThreadId}
            onThreadSelect={setActiveThreadId}
            onThreadDelete={handleThreadDelete}
            onThreadPin={handleThreadPin}
            onNewThread={handleNewThread}
          />
        </div>

        <div className="flex-1 relative">
          {collapsible && !isSidebarCollapsed && (
            <TooltipIconButton
              tooltip="Hide sidebar"
              onClick={() => setIsSidebarCollapsed(true)}
              className="absolute left-2 top-2 z-10"
            >
              <Menu className="h-4 w-4" />
            </TooltipIconButton>
          )}

          <Thread
            key={activeThreadId} // Force re-render when thread changes
            placeholder="Type your message..."
            suggestions={suggestions}
            welcomeMessage={`Thread: ${threads.find(t => t.id === activeThreadId)?.title}`}
            showTimestamps
            allowAttachments
          />
        </div>
      </div>
    </div>
  );
}

// Alternative layout using react-resizable-panels (if installed)
export function ResizableChatInterface({
  className,
  _defaultSidebarSize = 25,
  _minSidebarSize = 20,
  _maxSidebarSize = 40,
}: ChatInterfaceProps) {
  const [activeThreadId, setActiveThreadId] = useState<string>("1");

  const [threads] = useState<ThreadType[]>([
    {
      id: "1",
      title: "General Discussion",
      lastMessage: "Hello! How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const suggestions = [
    "What can you help me with?",
    "Tell me about your capabilities",
    "How do I get started?",
  ];

  // Uncomment this if react-resizable-panels is installed
  /*
  return (
    <PanelGroup direction="horizontal" className={cn("h-full", className)}>
      <Panel defaultSize={defaultSidebarSize} minSize={minSidebarSize} maxSize={maxSidebarSize}>
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          onThreadSelect={setActiveThreadId}
        />
      </Panel>
      <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors" />
      <Panel>
        <Thread
          placeholder="Type your message..."
          suggestions={suggestions}
          showTimestamps
          allowAttachments
        />
      </Panel>
    </PanelGroup>
  );
  */

  // Fallback without resizable panels
  return (
    <div className={cn("flex h-full", className)}>
      <div className="w-80 border-r">
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          onThreadSelect={setActiveThreadId}
        />
      </div>
      <div className="flex-1">
        <Thread
          placeholder="Type your message..."
          suggestions={suggestions}
          showTimestamps
          allowAttachments
        />
      </div>
    </div>
  );
}