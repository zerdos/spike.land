import { Bot } from "@/external/lucide-react";
import type { ICode, ImageData } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";
import type { UIMessage as Message } from "ai";
import { AssistantUIChat } from "./assistant-ui-chat";

interface AssistantUIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  cSess: ICode;
  initialPrompt?: {
    prompt: string;
    images: ImageData[];
  } | null | undefined;
}

export const AssistantUIDrawer: React.FC<AssistantUIDrawerProps> = React.memo(
  ({ isOpen, onClose, isDarkMode, cSess: _cSess, initialPrompt }) => {
    const codeSpace = _cSess.getCodeSpace();
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [savedMessages, setSavedMessages] = useState<Message[]>([]);

    // Load existing messages when drawer opens
    useEffect(() => {
      if (isOpen) {
        const loadMessages = async () => {
          try {
            const response = await fetch(`/live/${codeSpace}/messages`);
            if (response.ok) {
              const data = await response.json();
              if (data.messages && Array.isArray(data.messages)) {
                setSavedMessages(data.messages);
              }
            }
          } catch (error) {
            console.error("Failed to load messages:", error);
          } finally {
            setMessagesLoaded(true);
          }
        };
        
        setMessagesLoaded(false); // Reset to show loading state
        loadMessages();
      }
    }, [isOpen, codeSpace]);


    // Sync dark mode with Assistant UI
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [isDarkMode]);

    return (
      <Drawer.Root
        direction="right"
        open={isOpen}
        modal={false}
        data-testid="assistant-ui-drawer"
      >
        <Drawer.Trigger
          onClick={onClose}
          className={cn(
            "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
            isOpen ? "hidden" : "flex",
            "relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white",
          )}
        >
          <Bot className="h-6 w-6" />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className={cn(
              "fixed inset-y-0 right-0 z-10 outline-none flex",
              "w-full sm:w-[400px] md:w-[512px]",
              isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800",
            )}
            style={{
              "--initial-transform": "translateX(100%)",
            } as React.CSSProperties}
          >
            <div
              className="flex flex-col h-full w-full"
              data-testid="assistant-ui-drawer"
            >
              <Drawer.Title className="sr-only">Chat Assistant</Drawer.Title>
              <Drawer.Description className="sr-only">
                An AI-powered chat assistant to help you with your code.
              </Drawer.Description>

              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Assistant</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Assistant UI Thread */}
              {messagesLoaded ? (
                <AssistantUIChat 
                  key={`${codeSpace}-${savedMessages.length}`}
                  codeSpace={codeSpace} 
                  initialMessages={savedMessages} 
                  initialPrompt={initialPrompt}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-500">Loading messages...</div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  },
);

AssistantUIDrawer.displayName = "AssistantUIDrawer";
