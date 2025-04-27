import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RefreshCw, X } from "@/external/lucide-react";
import type { ChatHeaderProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

export const ChatHeader: React.FC<ChatHeaderProps> = React.memo(
  ({ isDarkMode, handleResetChat, onClose }) => {
    const headerClassName = useMemo(
      () =>
        cn(
          "p-4 font-bold flex justify-between items-center",
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
        ),
      [isDarkMode]
    );

    return (
      <header className={headerClassName} role="banner">
        <span aria-label="Chat title">AI spike pilot</span>
        <nav className="flex items-center space-x-2" aria-label="Chat controls">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleResetChat}
            aria-label="Reset chat"
            data-testid="reset-chat-button"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </nav>
      </header>
    );
  }
);

ChatHeader.displayName = "ChatHeader";
