import { AssistantUIDrawer } from "@/components/app/assistant-ui-drawer";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { ICode } from "@/lib/interfaces";
import type { ImageData } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";

import { useScreenshot } from "./hooks/useScreenshot";

const ChatInterface: React.FC<{
  isOpen: boolean;
  codeSession: ICode; // Renamed from cSess
  codeSpace: string;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, codeSession }): React.ReactElement => { // Renamed from cSess
  // const [session, setSession] = useState<ICodeSession | null>(null);
  const { isDarkMode, toggleDarkMode: _toggleDarkMode } = useDarkMode();

  const localCodeSpace = codeSession.getCodeSpace(); // Renamed from cSess, used local var to avoid conflict with prop
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${localCodeSpace}`,
    false,
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStreaming) {
      timeoutRef.current = setTimeout(() => {
        setIsStreaming(false);
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isStreaming, setIsStreaming]);

  const [_input, _setInput] = useDictation("");

  const [_editingMessageId, _setEditingMessageId] = useState<string | null>(
    null,
  );
  const [_editInput, _setEditInput] = useState("");

  // State to hold initial prompt data
  const [initialPrompt, setInitialPrompt] = useState<{
    prompt: string;
    images: ImageData[];
  } | null>(null);

  // Removed unused reset functionality since AssistantUI manages its own state

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById("after-last-message")?.scrollIntoView({
          behavior: "instant",
          block: "end",
        });
      });
    }
  }, [isOpen]);

  // Removed unused handlers since AssistantUI manages its own state

  const {
    isScreenshotLoading: _isScreenshotLoading,
    screenshotImage: _screenshotImage,
    handleScreenshotClick: _handleScreenshotClick,
    handleCancelScreenshot: _handleCancelScreenshot,
  } = useScreenshot(localCodeSpace); // Used localCodeSpace

  useEffect(() => {
    if (localCodeSpace.includes("-")) { // Used localCodeSpace
      const maybeKey = localCodeSpace.split("-")[1]; // Used localCodeSpace
      if (maybeKey) {
        const storedData = sessionStorage.getItem(maybeKey);
        if (storedData) {
          try {
            const { prompt, images } = JSON.parse(storedData) as {
              prompt: string;
              images: ImageData[];
            };
            sessionStorage.removeItem(maybeKey);

            // Store the initial prompt data to pass to AssistantUIDrawer
            setInitialPrompt({ prompt, images });
          } catch (error) {
            console.error("Failed to parse stored prompt data:", error);
            sessionStorage.removeItem(maybeKey);
          }
        }
      }
    }
  }, [localCodeSpace]); // Only depend on localCodeSpace

  // Removed unused memoized callbacks since AssistantUI manages its own state

  if (!isOpen) return <></>;

  return (
    <AssistantUIDrawer
      isOpen={isOpen}
      onClose={onClose}
      isDarkMode={isDarkMode}
      cSess={codeSession}
      initialPrompt={initialPrompt}
    />
  );
});

ChatInterface.displayName = "ChatInterface";

export { ChatInterface };
